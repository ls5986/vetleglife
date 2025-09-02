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

    // Prepare data for existing leads table structure
    const insertData = {
      session_id: leadData.session_id,
      brand_id: leadData.brand_id,
      current_step: leadData.current_step,
      status: leadData.status,
      
      // Basic Information (existing fields)
      first_name: leadData.first_name || '',
      last_name: leadData.last_name || '',
      email: leadData.email || '',
      phone: leadData.phone || '',
      
      // Demographics (existing fields)
      military_status: leadData.military_status || '',
      branch_of_service: leadData.branch_of_service || '',
      coverage_amount: leadData.coverage_amount || 0,
      
      // Additional fields (will be stored in existing columns or added as needed)
      lead_score: 0,
      lead_grade: 'C',
      last_activity_at: new Date().toISOString(),
      
      // Marketing & Analytics
      utm_source: leadData.utm_source || '',
      utm_campaign: leadData.utm_campaign || '',
      
      // Store additional data in a JSON field if available, or use existing columns
      additional_data: {
        state: leadData.state,
        marital_status: leadData.marital_status,
        date_of_birth: leadData.date_of_birth,
        tobacco_use: leadData.tobacco_use,
        medical_conditions: leadData.medical_conditions,
        height: leadData.height,
        weight: leadData.weight,
        hospital_care: leadData.hospital_care,
        diabetes_medication: leadData.diabetes_medication,
        street_address: leadData.street_address,
        city: leadData.city,
        zip_code: leadData.zip_code,
        beneficiary_name: leadData.beneficiary_name,
        beneficiary_relationship: leadData.beneficiary_relationship,
        drivers_license: leadData.drivers_license,
        ssn: leadData.ssn,
        bank_name: leadData.bank_name,
        routing_number: leadData.routing_number,
        account_number: leadData.account_number,
        policy_date: leadData.policy_date,
        transactional_consent: leadData.transactional_consent,
        marketing_consent: leadData.marketing_consent,
        exit_intent: leadData.exit_intent,
        user_agent: leadData.user_agent,
        referrer: leadData.referrer
      }
    };

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
        brandId: leadData.brand_id,
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