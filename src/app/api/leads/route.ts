import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';
import { sendCompletionEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { leadData } = body;

    console.log('🚀 LEAD API CALLED:', {
      timestamp: new Date().toISOString(),
      sessionId: leadData.session_id,
      brandId: leadData.brand_id,
      currentStep: leadData.current_step,
      stepName: leadData.step_name || `Step ${leadData.current_step}`,
      hasEmail: !!leadData.email,
      hasPhone: !!leadData.phone,
      exitIntent: leadData.exit_intent
    });

    const supabaseAdmin = createSupabaseAdmin();

    // Test database connection first
    console.log('🔍 Testing database connection...');
    
    try {
      const { data: testData, error: testError } = await supabaseAdmin
        .from('leads')
        .select('count')
        .limit(1);
      
      if (testError) {
        console.error('❌ Database connection test failed:', testError);
        throw new Error(`Database connection failed: ${testError.message}`);
      }
      console.log('✅ Database connection successful');
    } catch (dbTestError) {
      console.error('❌ Database test error:', dbTestError);
      throw dbTestError;
    }

    // First, get the actual brand UUID from the brands table
    let actualBrandId = leadData.brand_id;
    
    // Look up the brand by name/slug to get the actual UUID
    try {
      console.log('🔍 Looking up brand for:', leadData.brand_id);
      
      // Try to find brand by converting slug to domain format
      const brandSlug = leadData.brand_id;
      const domainLookup = brandSlug.replace(/-/g, '') + '.com';
      
      console.log('🔍 Looking for domain:', domainLookup);
      
      const { data: brandData, error: brandError } = await supabaseAdmin
        .from('brands')
        .select('id, brand_name, domain')
        .or(`domain.eq.${domainLookup},brand_name.ilike.%${brandSlug}%`)
        .eq('is_active', true)
        .single();
      
      if (brandError) {
        console.error('❌ Error fetching brand:', brandError);
        // Try to find any active brand as fallback
        const { data: fallbackBrand, error: fallbackError } = await supabaseAdmin
          .from('brands')
          .select('id, brand_name, domain')
          .eq('is_active', true)
          .limit(1)
          .single();
        
        if (fallbackBrand) {
          actualBrandId = fallbackBrand.id;
          console.log('✅ Using fallback brand:', fallbackBrand.brand_name, fallbackBrand.id);
        } else {
          console.error('❌ No fallback brand found:', fallbackError);
          throw new Error('No active brands found in database');
        }
      } else if (brandData) {
        actualBrandId = brandData.id;
        console.log('✅ Found brand ID:', actualBrandId, 'for brand:', brandData.brand_name);
      }
    } catch (brandLookupError) {
      console.error('❌ Brand lookup error:', brandLookupError);
      throw new Error(`Failed to find brand: ${brandLookupError instanceof Error ? brandLookupError.message : 'Unknown error'}`);
    }

    // Check if lead already exists by session_id
    let existingLead = null;
    try {
      const { data: checkData, error: checkError } = await supabaseAdmin
        .from('leads')
        .select('id, current_step, status')
        .eq('session_id', leadData.session_id)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        console.error('❌ Error checking existing lead:', checkError);
        throw checkError;
      }
      existingLead = checkData;
    } catch (checkError) {
      console.error('❌ Lead check error:', checkError);
      existingLead = null;
    }

    // Start with ONLY the absolute essential fields
    const insertData: any = {
      session_id: leadData.session_id,
      brand_id: actualBrandId,
      current_step: leadData.current_step,
      status: leadData.status
    };

    // Only add the most basic fields if they exist and have values
    if (leadData.first_name && leadData.first_name.trim()) insertData.first_name = leadData.first_name;
    if (leadData.last_name && leadData.last_name.trim()) insertData.last_name = leadData.last_name;
    if (leadData.email && leadData.email.trim()) insertData.email = leadData.email;
    if (leadData.phone && leadData.phone.trim()) insertData.phone = leadData.phone;
    if (leadData.state && leadData.state.trim()) insertData.state = leadData.state;
    if (leadData.military_status && leadData.military_status.trim()) insertData.military_status = leadData.military_status;
    if (leadData.branch_of_service && leadData.branch_of_service.trim()) insertData.branch_of_service = leadData.branch_of_service;
    if (leadData.marital_status && leadData.marital_status.trim()) insertData.marital_status = leadData.marital_status;
    if (leadData.coverage_amount) insertData.coverage_amount = leadData.coverage_amount;
    if (leadData.exit_intent !== undefined) insertData.exit_intent = leadData.exit_intent;
    if (leadData.user_agent) insertData.user_agent = leadData.user_agent;
    if (leadData.referrer) insertData.referrer = leadData.referrer;
    if (leadData.utm_source) insertData.utm_source = leadData.utm_source;
    if (leadData.utm_campaign) insertData.utm_campaign = leadData.utm_campaign;

    // Store all the detailed data in form_data JSON field
    insertData.form_data = {
      // Birth date
      date_of_birth: leadData.date_of_birth || '',
      
      // Medical information
      height: leadData.height || '',
      weight: leadData.weight || '',
      tobacco_use: leadData.tobacco_use || '',
      medical_conditions: leadData.medical_conditions || [],
      hospital_care: leadData.hospital_care || '',
      diabetes_medication: leadData.diabetes_medication || '',
      
      // Address and beneficiary
      street_address: leadData.street_address || '',
      city: leadData.city || '',
      zip_code: leadData.zip_code || '',
      beneficiary_name: leadData.beneficiary_name || '',
      beneficiary_relationship: leadData.beneficiary_relationship || '',
      drivers_license: leadData.drivers_license || '',
      
      // Financial information
      ssn: leadData.ssn || '',
      bank_name: leadData.bank_name || '',
      routing_number: leadData.routing_number || '',
      account_number: leadData.account_number || '',
      policy_date: leadData.policy_date || '',
      
      // Consent and tracking
      transactional_consent: leadData.transactional_consent || false,
      marketing_consent: leadData.marketing_consent || false,
      exit_intent: leadData.exit_intent || false,
      completed_steps: Array.from({length: leadData.current_step}, (_, i) => i + 1),
      
      // UTM tracking
      utm_source: leadData.utm_source || '',
      utm_campaign: leadData.utm_campaign || '',
      
      // User tracking
      user_agent: leadData.user_agent || '',
      referrer: leadData.referrer || ''
    };

    console.log('📤 Prepared insert data:', {
      sessionId: leadData.session_id,
      brandId: actualBrandId,
      currentStep: leadData.current_step,
      essentialFields: Object.keys(insertData).filter(key => key !== 'form_data'),
      formDataKeys: Object.keys(insertData.form_data)
    });

    let result;
    if (existingLead) {
      console.log('📝 UPDATING existing lead:', {
        sessionId: leadData.session_id,
        oldStep: existingLead.current_step,
        newStep: leadData.current_step,
        oldStatus: existingLead.status
      });

      // Update existing lead
      const { data, error } = await supabaseAdmin
        .from('leads')
        .update({
          ...insertData,
          updated_at: new Date().toISOString()
        })
        .eq('session_id', leadData.session_id)
        .select()
        .single();

      if (error) {
        console.error('❌ Error updating lead:', error);
        throw error;
      }
      result = data;
    } else {
      console.log('🆕 CREATING new lead:', {
        sessionId: leadData.session_id,
        brandId: actualBrandId,
        currentStep: leadData.current_step
      });

      // Create new lead
      const { data, error } = await supabaseAdmin
        .from('leads')
        .insert({
          ...insertData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('❌ Error creating lead:', error);
        throw error;
      }
      result = data;
    }

    console.log('✅ Lead operation successful:', {
      sessionId: leadData.session_id,
      operation: existingLead ? 'UPDATE' : 'CREATE',
      currentStep: result.current_step,
      status: result.status
    });

    // If lead marked completed, attempt to send email
    if (result.status && String(result.status).toLowerCase() === 'completed' && result.email) {
      try {
        const { data: brand } = await supabaseAdmin
          .from('brands')
          .select('brand_name, domain, primary_color')
          .eq('id', result.brand_id)
          .single();
        await sendCompletionEmail({ toEmail: result.email, lead: result, brand });
      } catch (e) {
        console.warn('Completion email send skipped/failed', e);
      }
    }

    return NextResponse.json({
      success: true,
      data: result,
      operation: existingLead ? 'updated' : 'created'
    });
  } catch (error) {
    console.error('💥 CRITICAL ERROR in leads API:', {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('session_id');
    const brandId = searchParams.get('brand_id');

    console.log('🔍 LEAD API GET called:', {
      timestamp: new Date().toISOString(),
      sessionId,
      brandId
    });

    const supabaseAdmin = createSupabaseAdmin();

    let query = supabaseAdmin.from('leads').select('*', { count: 'exact' });

    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }
    if (brandId) {
      query = query.eq('brand_id', brandId);
    }

    const { data: leadsRaw, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching leads:', error);
      throw error;
    }

    console.log('✅ Leads fetched successfully:', {
      count: leadsRaw?.length || 0,
      sessionId,
      brandId
    });

    // Attach brand info
    const { data: brands } = await supabaseAdmin
      .from('brands')
      .select('*')
      .eq('is_active', true);
    const brandMap = new Map((brands || []).map((b: any) => [b.id, b]));
    const leads = (leadsRaw || []).map((lead: any) => ({
      ...lead,
      brands: brandMap.has(lead.brand_id)
        ? {
            brand_name: brandMap.get(lead.brand_id)!.brand_name,
            domain: brandMap.get(lead.brand_id)!.domain,
            primary_color: brandMap.get(lead.brand_id)!.primary_color,
          }
        : null,
    }));

    return NextResponse.json({ success: true, data: leads });
  } catch (error) {
    console.error('💥 Error in leads GET API:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 