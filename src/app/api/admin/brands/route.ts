import { NextResponse } from 'next/server';
import { createSupabaseAdmin } from '@/lib/supabase';

export async function GET(request: Request) {
  try {
    console.log('🔍 ADMIN API - Fetching brands:', {
      timestamp: new Date().toISOString()
    });

    const supabaseAdmin = createSupabaseAdmin();

    const { data, error } = await supabaseAdmin
      .from('brands')
      .select('*')
      .eq('is_active', true)
      .order('brand_name');

    if (error) {
      console.error('❌ Error fetching brands in admin API:', error);
      throw error;
    }

    console.log('✅ Admin API - Brands fetched successfully:', {
      count: data?.length || 0
    });

    return NextResponse.json({ 
      success: true, 
      data: data || []
    });
  } catch (error) {
    console.error('💥 Error in admin brands API:', error);
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
