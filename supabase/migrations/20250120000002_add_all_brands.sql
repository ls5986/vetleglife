-- Add all brands to the brands table
INSERT INTO public.brands (domain, brand_name, target_demographic, phone, email, company_name, primary_color, secondary_color, is_active) VALUES
-- Veteran Legacy Life (already exists, but ensuring it's there)
('veteranlegacylife.com', 'Veteran Legacy Life', 'Veterans', '(555) 123-4567', 'info@veteranlegacylife.com', 'Veteran Legacy Life Insurance', '#1e3a8a', '#3b82f6', true),

-- Startup Legacy Life
('startuplegacylife.com', 'Startup Legacy Life', 'Entrepreneurs, young professionals, founders', '(555) 123-4568', 'info@startuplegacylife.com', 'Startup Legacy Life Insurance', '#059669', '#10b981', true),

-- Foundation Legacy Life
('foundationlegacylife.com', 'Foundation Legacy Life', 'New families, first-time homeowners, people just starting out with financial planning', '(555) 123-4569', 'info@foundationlegacylife.com', 'Foundation Legacy Life Insurance', '#7c3aed', '#8b5cf6', true),

-- Trade Legacy Life
('tradelegacylife.com', 'Trade Legacy Life', 'Blue-collar workers, skilled trades (HVAC, electricians, mechanics)', '(555) 123-4570', 'info@tradelegacylife.com', 'Trade Legacy Life Insurance', '#dc2626', '#ef4444', true),

-- Success Legacy Life
('successlegacylife.com', 'Success Legacy Life', 'High-achievers, sales pros, executives, ambitious millennials/Gen Z', '(555) 123-4571', 'info@successlegacylife.com', 'Success Legacy Life Insurance', '#f59e0b', '#fbbf24', true),

-- Immigrant Legacy Life
('immigrantlegacylife.com', 'Immigrant Legacy Life', 'Immigrant families, first-gen Americans, communities focused on family security', '(555) 123-4572', 'info@immigrantlegacylife.com', 'Immigrant Legacy Life Insurance', '#0891b2', '#06b6d4', true),

-- Responder Legacy Life
('responderlegacylife.com', 'Responder Legacy Life', 'First responders — firefighters, EMTs, police, nurses', '(555) 123-4573', 'info@responderlegacylife.com', 'Responder Legacy Life Insurance', '#be185d', '#ec4899', true),

-- Educator Legacy Life
('educatorlegacylife.com', 'Educator Legacy Life', 'Teachers, professors, educators, support staff', '(555) 123-4574', 'info@educatorlegacylife.com', 'Educator Legacy Life Insurance', '#059669', '#34d399', true),

-- Trader Legacy Life
('traderlegacylife.com', 'Trader Legacy Life', 'Day traders, crypto investors, stock market risk-takers', '(555) 123-4575', 'info@traderlegacylife.com', 'Trader Legacy Life Insurance', '#1f2937', '#374151', true),

-- Creator Legacy Life
('creatorlegacylife.com', 'Creator Legacy Life', 'Content creators, influencers, digital entrepreneurs', '(555) 123-4576', 'info@creatorlegacylife.com', 'Creator Legacy Life Insurance', '#7c2d12', '#ea580c', true)

ON CONFLICT (domain) DO UPDATE SET 
    brand_name = EXCLUDED.brand_name,
    target_demographic = EXCLUDED.target_demographic,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    company_name = EXCLUDED.company_name,
    primary_color = EXCLUDED.primary_color,
    secondary_color = EXCLUDED.secondary_color,
    is_active = EXCLUDED.is_active; 