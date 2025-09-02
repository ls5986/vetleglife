-- Create comprehensive leads table with all required fields
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- Session & Tracking
    session_id TEXT NOT NULL,
    status TEXT DEFAULT 'Partial',
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    current_step INTEGER DEFAULT 1,
    step_name TEXT,
    form_type TEXT DEFAULT 'Partial',
    
    -- Basic Information
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    phone TEXT,
    date_of_birth DATE,
    
    -- Consent
    transactional_consent BOOLEAN DEFAULT FALSE,
    marketing_consent BOOLEAN DEFAULT FALSE,
    
    -- Demographics
    state TEXT,
    military_status TEXT,
    branch_of_service TEXT,
    marital_status TEXT,
    
    -- Coverage & Health
    coverage_amount TEXT,
    tobacco_use TEXT,
    medical_conditions TEXT[],
    height TEXT,
    weight TEXT,
    hospital_care TEXT,
    diabetes_medication TEXT,
    
    -- Address
    street_address TEXT,
    city TEXT,
    application_state TEXT,
    zip_code TEXT,
    
    -- Additional Fields
    beneficiaries TEXT,
    va_number TEXT,
    service_connected TEXT,
    ssn TEXT,
    driver_license TEXT,
    
    -- Banking (if needed)
    bank_name TEXT,
    routing_number TEXT,
    account_number TEXT,
    
    -- Quote Information
    policy_date DATE,
    quote_coverage TEXT,
    quote_premium TEXT,
    quote_age INTEGER,
    quote_gender TEXT,
    quote_type TEXT,
    
    -- Marketing & Analytics
    user_agent TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    
    -- Email Tracking
    partial_email_sent BOOLEAN DEFAULT FALSE,
    completed_email_sent BOOLEAN DEFAULT FALSE,
    
    -- Brand & Session
    brand_id TEXT REFERENCES public.brands(id),
    exit_intent BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_session_id ON public.leads(session_id);
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_brand_id ON public.leads(brand_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_leads_updated_at 
    BEFORE UPDATE ON public.leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for testing
INSERT INTO public.leads (
    session_id, 
    status, 
    first_name, 
    last_name, 
    email, 
    phone, 
    date_of_birth, 
    state, 
    military_status, 
    branch_of_service, 
    marital_status, 
    coverage_amount, 
    tobacco_use, 
    medical_conditions, 
    height, 
    weight, 
    current_step, 
    step_name, 
    brand_id
) VALUES 
(
    'session_1755579185634_6w14ry3n8',
    'Partial',
    '',
    '',
    '',
    '',
    '2002-07-07',
    'AK',
    'Active Duty',
    'Marines',
    'Divorced',
    '$10,000',
    '',
    ARRAY['None'],
    '',
    '',
    6,
    'Birthday',
    'veteran-legacy-life'
),
(
    'session_1756748263753_it4umt9ys',
    'Partial',
    'Michael',
    'Alfieri',
    'malfieri05@gmail.com',
    '5037645097',
    '1970-05-01',
    'OR',
    'Veteran',
    'Army',
    'Single',
    '$10,000',
    'No',
    ARRAY['None'],
    '5''4"',
    '100',
    18,
    'Application Step 2',
    'veteran-legacy-life'
);
