import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';

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

    // First, get the actual brand UUID from the brands table
    let actualBrandId = leadData.brand_id;
    if (leadData.brand_id === 'veteran-legacy-life') {
      console.log('🔍 Looking up brand for domain:', leadData.domain);
      
      const { data: brandData, error: brandError } = await supabaseAdmin
        .from('brands')
        .select('id, brand_name, domain')
        .eq('domain', leadData.domain)
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
        }
      } else if (brandData) {
        actualBrandId = brandData.id;
        console.log('✅ Found brand ID:', actualBrandId, 'for domain:', brandData.domain);
      }
    }

    // Check if lead already exists by session_id
    const { data: existingLead, error: checkError } = await supabaseAdmin
      .from('leads')
      .select('id, current_step, status')
      .eq('session_id', leadData.session_id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('❌ Error checking existing lead:', checkError);
      throw checkError;
    }

    // Parse date of birth into separate fields for the database
    const birthDate = leadData.date_of_birth ? new Date(leadData.date_of_birth) : null;
    const birthMonth = birthDate ? (birthDate.getMonth() + 1).toString() : '';
    const birthDay = birthDate ? birthDate.getDate().toString() : '';
    const birthYear = birthDate ? birthDate.getFullYear().toString() : '';

    // Map to exact leads table structure from your schema
    const insertData = {
      session_id: leadData.session_id,
      brand_id: actualBrandId,
      domain: leadData.domain,
      current_step: leadData.current_step,
      status: leadData.status,
      
      // Basic Information
      first_name: leadData.first_name || '',
      last_name: leadData.last_name || '',
      email: leadData.email || '',
      phone: leadData.phone || '',
      
      // Demographics
      state: leadData.state || '',
      military_status: leadData.military_status || '',
      branch_of_service: leadData.branch_of_service || '',
      marital_status: leadData.marital_status || '',
      coverage_amount: leadData.coverage_amount || null,
      
      // Birth date components
      birth_month: birthMonth,
      birth_day: birthDay,
      birth_year: birthYear,
      
      // Medical information
      height: leadData.height || '',
      weight: leadData.weight ? parseInt(leadData.weight) : null,
      tobacco_use: leadData.tobacco_use === 'Yes',
      medical_conditions: leadData.medical_conditions || [],
      hospital_care: leadData.hospital_care === 'Yes',
      diabetes_medication: leadData.diabetes_medication === 'Yes',
      
      // Address and beneficiary
      street_address: leadData.street_address || '',
      city: leadData.city || '',
      zip_code: leadData.zip_code || '',
      beneficiary_name: leadData.beneficiary_name || '',
      beneficiary_relationship: leadData.beneficiary_relationship || '',
      va_clinic_name: leadData.va_clinic_name || null,
      primary_doctor: leadData.primary_doctor || null,
      drivers_license: leadData.drivers_license || '',
      license_state: leadData.license_state || leadData.state || '', // Use state if license_state not provided
      
      // Financial information
      ssn: leadData.ssn || '',
      bank_name: leadData.bank_name || '',
      routing_number: leadData.routing_number || '',
      account_number: leadData.account_number || '',
      policy_date: leadData.policy_date || null,
      
      // Tracking and analytics
      last_activity_at: new Date().toISOString(),
      referrer: leadData.referrer || '',
      utm_source: leadData.utm_source || '',
      utm_medium: leadData.utm_medium || '',
      utm_campaign: leadData.utm_campaign || '',
      utm_content: leadData.utm_content || '',
      utm_term: leadData.utm_term || '',
      fbclid: leadData.fbclid || '',
      gclid: leadData.gclid || '',
      ip_address: leadData.ip_address || null,
      user_agent: leadData.user_agent || '',
      
      // Store additional data in form_data JSON field
      form_data: {
        transactional_consent: leadData.transactional_consent || false,
        marketing_consent: leadData.marketing_consent || false,
        exit_intent: leadData.exit_intent || false,
        completed_steps: Array.from({length: leadData.current_step}, (_, i) => i + 1)
      }
    };

    console.log('📤 Prepared insert data:', {
      sessionId: leadData.session_id,
      brandId: actualBrandId,
      currentStep: leadData.current_step,
      fieldsCount: Object.keys(insertData).length
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

    let query = supabaseAdmin.from('leads').select(`
      *,
      brands (brand_name, domain, primary_color)
    `, { count: 'exact' });

    if (sessionId) {
      query = query.eq('session_id', sessionId);
    }
    if (brandId) {
      query = query.eq('brand_id', brandId);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching leads:', error);
      throw error;
    }

    console.log('✅ Leads fetched successfully:', {
      count: data?.length || 0,
      sessionId,
      brandId
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('💥 Error in leads GET API:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 