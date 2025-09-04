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

    // First, get the actual brand UUID and domain from the brands table
    let actualBrandId = leadData.brand_id;
    let brandDomain: string | undefined = leadData.domain;
    
    // Look up the brand by name/slug to get the actual UUID
    try {
      console.log('🔍 Looking up brand for:', leadData.brand_id);
      const brandSlug = leadData.brand_id;
      const domainLookup = brandSlug.replace(/-/g, '') + '.com';
      console.log('🔍 Looking for domain:', domainLookup);
      const { data: brandData } = await supabaseAdmin
        .from('brands')
        .select('id, brand_name, domain')
        .eq('domain', domainLookup)
        .eq('is_active', true)
        .single();
      if (brandData?.id) {
        actualBrandId = brandData.id;
        brandDomain = brandData.domain || brandDomain;
        console.log('✅ Found brand ID:', actualBrandId, 'for brand:', brandData.brand_name);
    } else {
        console.warn('⚠️ Brand not found by domain; using provided brand_id as-is');
        actualBrandId = leadData.brand_id;
        brandDomain = brandDomain || domainLookup;
      }
    } catch (brandLookupError) {
      console.warn('⚠️ Brand lookup failed; using provided brand_id as-is');
      actualBrandId = leadData.brand_id;
      brandDomain = brandDomain || 'unknown.local';
    }

    // Check if lead already exists by session_id
    let existingLead: any = null;
    try {
      const { data: checkData, error: checkError } = await supabaseAdmin
        .from('leads')
        .select('id, current_step, status, form_data')
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
    // Normalize status to match DB check constraint (e.g., 'Partial' | 'Completed' | 'Started')
    // Map client status to server-allowed statuses
    const clientStatus = String(leadData.status || '').toLowerCase();
    let normalizedStatus: 'active' | 'abandoned' | 'converted' = 'active';
    // DB constraint supports: active | contacted | converted | abandoned
    if (clientStatus === 'completed') normalizedStatus = 'converted';
    else if (clientStatus === 'incomplete') normalizedStatus = 'abandoned';
    else if (clientStatus === 'partial') normalizedStatus = 'active';

    const insertData: any = {
      session_id: leadData.session_id,
      brand_id: actualBrandId,
      domain: brandDomain,
      current_step: leadData.current_step,
      status: normalizedStatus
    };

    // Collect JSON extras to persist separately (avoid schema mismatches on upsert)
    let jsonExtras: Record<string, any> = { client_status: clientStatus || null };

    // Safe field mappings commonly present in the leads table
    if (typeof leadData.first_name === 'string' && leadData.first_name.trim()) insertData.first_name = leadData.first_name.trim();
    if (typeof leadData.last_name === 'string' && leadData.last_name.trim()) insertData.last_name = leadData.last_name.trim();
    if (typeof leadData.email === 'string' && leadData.email.trim()) insertData.email = leadData.email.trim();
    if (typeof leadData.phone === 'string' && leadData.phone.trim()) insertData.phone = leadData.phone.trim();
    if (typeof leadData.state === 'string' && leadData.state.trim()) insertData.state = leadData.state.trim();
    // Move optional fields into JSON to avoid remote schema mismatches
    const additionalExtras: Record<string, any> = {};
    if (typeof leadData.military_status === 'string' && leadData.military_status.trim()) additionalExtras.military_status = leadData.military_status.trim();
    if (typeof leadData.branch_of_service === 'string' && leadData.branch_of_service.trim()) additionalExtras.branch_of_service = leadData.branch_of_service.trim();
    if (typeof leadData.marital_status === 'string' && leadData.marital_status.trim()) additionalExtras.marital_status = leadData.marital_status.trim();
    if (leadData.date_of_birth) additionalExtras.date_of_birth = leadData.date_of_birth;
    if (leadData.coverage_amount !== undefined && leadData.coverage_amount !== null) {
      const numericCoverage = Number(String(leadData.coverage_amount).toString().replace(/[^\d.]/g, '')) || null;
      if (numericCoverage !== null) additionalExtras.coverage_amount = numericCoverage;
    }
    // Application + medical + tracking fields
    const passthroughKeys: string[] = [
      'height','weight','tobacco_use','medical_conditions','hospital_care','diabetes_medication',
      'street_address','city','zip_code','beneficiary_name','beneficiary_relationship',
      'drivers_license','ssn','bank_name','routing_number','account_number','policy_date',
      'transactional_consent','marketing_consent','exit_intent','utm_source','utm_campaign',
      'user_agent','referrer'
    ];
    for (const key of passthroughKeys) {
      if (leadData[key] !== undefined && leadData[key] !== null && leadData[key] !== '') {
        additionalExtras[key] = leadData[key];
      }
    }
    // If quoteData blob provided, persist under quote
    if (leadData.quoteData && typeof leadData.quoteData === 'object') {
      additionalExtras.quote = leadData.quoteData;
    }
    jsonExtras = { ...jsonExtras, ...additionalExtras };

    console.log('📤 Prepared insert data:', {
      sessionId: leadData.session_id,
      brandId: actualBrandId,
      currentStep: leadData.current_step,
      essentialFields: Object.keys(insertData),
    });

    // Merge form_data with any existing data so we upsert once
    const existingFormDataForMerge = (existingLead as any)?.form_data || {};
    const mergedFormData = { ...existingFormDataForMerge, ...jsonExtras };

    // Single upsert to avoid duplicate session_id races
    const { data: result, error: upsertError } = await supabaseAdmin
      .from('leads')
      .upsert({
        ...insertData,
        form_data: mergedFormData
      }, { onConflict: 'session_id' })
      .select()
      .single();

    if (upsertError) {
      console.error('❌ Error upserting lead:', upsertError);
      throw upsertError;
    }

    console.log('✅ Lead operation successful:', {
      sessionId: leadData.session_id,
      operation: existingLead ? 'UPDATE' : 'UPSERT',
      currentStep: result.current_step,
      status: result.status
    });

    // (form_data is already merged in the upsert)

    // If lead marked completed, attempt to send emails (client + rep)
    const isCompletion = ['converted', 'completed'].includes(String(result.status || '').toLowerCase()) || Number(leadData.current_step) >= 18;
    let emailDebug: any = null;
    if (isCompletion) {
      try {
        const { data: brand } = await supabaseAdmin
          .from('brands')
          .select('brand_name, domain, primary_color, email')
          .eq('id', result.brand_id)
          .single();

        // Idempotency: check if completion emails already sent
        const existingFormDataForEmail = (result as any).form_data || {};
        const priorEvents: any[] = Array.isArray(existingFormDataForEmail.emails)
          ? existingFormDataForEmail.emails
          : [];
        const clientAlreadySent = priorEvents.some((e: any) => e?.type === 'completion' && e?.client?.status === 'sent');
        const repAlreadySent = priorEvents.some((e: any) => e?.type === 'completion' && e?.rep?.status === 'sent');

        // Client email (if we have their email)
        let clientEmailStatus: 'sent' | 'skipped' | 'failed' = 'skipped';
        let clientEmailMeta: any = null;
        if (result.email) {
          if (clientAlreadySent) {
            clientEmailStatus = 'skipped';
            clientEmailMeta = { reason: 'already_sent' };
          } else {
            const fromAddr = process.env.SENDER_EMAIL || undefined; // if unset, email.ts will use safe default
            const resp = await sendCompletionEmail({ toEmail: result.email, lead: result, brand, fromOverride: fromAddr });
            clientEmailStatus = (resp as any)?.error ? 'failed' : (resp as any)?.skipped ? 'skipped' : 'sent';
            clientEmailMeta = (resp as any)?._meta || null;
          }
          console.log('📧 Client completion email result:', {
            status: clientEmailStatus,
            to: result.email,
            meta: clientEmailMeta
          });
        }

        // Rep/Admin email (from env or brand email or default)
        const repEmail = process.env.ADMIN_EMAIL || brand?.email || 'malfieri05@gmail.com';
        let repEmailStatus: 'sent' | 'skipped' | 'failed' = 'skipped';
        let repEmailMeta: any = null;
        if (repEmail) {
          if (repAlreadySent) {
            repEmailStatus = 'skipped';
            repEmailMeta = { reason: 'already_sent' };
          } else {
            const fromAddr2 = process.env.SENDER_EMAIL || undefined;
            const resp = await sendCompletionEmail({ toEmail: repEmail, lead: result, brand, fromOverride: fromAddr2 });
            repEmailStatus = (resp as any)?.error ? 'failed' : (resp as any)?.skipped ? 'skipped' : 'sent';
            repEmailMeta = (resp as any)?._meta || null;
          }
          console.log('📧 Rep completion email result:', {
            status: repEmailStatus,
            to: repEmail,
            meta: repEmailMeta
          });
        }

        // Track in form_data.emails array with upsert behavior
        const existingFormData = (result as any).form_data || {};
        const emailEvents = Array.isArray(existingFormData.emails) ? existingFormData.emails : [];
        const lastCompletionIdx = [...emailEvents]
          .map((e: any, idx: number) => ({ e, idx }))
          .reverse()
          .find((x: any) => x.e?.type === 'completion')?.idx ?? -1;
        if (lastCompletionIdx !== -1) {
          const last = emailEvents[lastCompletionIdx] || {};
          const merged = {
            ...last,
            type: 'completion',
            at: new Date().toISOString(),
            client: clientEmailStatus !== 'skipped' ? { status: clientEmailStatus, meta: clientEmailMeta } : (last.client || { status: 'skipped' }),
            rep: repEmailStatus !== 'skipped' ? { status: repEmailStatus, meta: repEmailMeta } : (last.rep || { status: 'skipped' })
          };
          emailEvents[lastCompletionIdx] = merged;
        } else {
          emailEvents.push({
            type: 'completion',
            at: new Date().toISOString(),
            client: { status: clientEmailStatus, meta: clientEmailMeta },
            rep: { status: repEmailStatus, meta: repEmailMeta },
          });
        }
        const { data: _tracked } = await supabaseAdmin
          .from('leads')
          .update({ form_data: { ...existingFormData, emails: emailEvents } })
          .eq('id', result.id)
          .select('id')
          .single();

        emailDebug = {
          attempted: true,
          client: { to: result.email, status: clientEmailStatus, meta: clientEmailMeta },
          rep: { to: repEmail, status: repEmailStatus, meta: repEmailMeta },
        };
      } catch (e) {
        console.warn('Completion email send skipped/failed', e);
        emailDebug = { attempted: true, error: (e as any)?.message || 'unknown' };
      }
    }

    return NextResponse.json({
      success: true,
      data: result,
      operation: existingLead ? 'updated' : 'created',
      email_debug: isCompletion ? emailDebug : null
    });
  } catch (error) {
    const message = (error && typeof error === 'object' && 'message' in (error as any))
      ? (error as any).message
      : JSON.stringify(error);
    console.error('💥 CRITICAL ERROR in leads API:', message, error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
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