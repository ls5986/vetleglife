-- Fix brands table structure and add all brands with proper UUIDs
-- First, drop the existing brands table if it exists
DROP TABLE IF EXISTS public.brands CASCADE;

-- Create the brands table with proper structure
CREATE TABLE public.brands (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    domain TEXT UNIQUE NOT NULL,
    brand_name TEXT NOT NULL,
    target_demographic TEXT,
    selling_point TEXT,
    tagline TEXT,
    primary_color TEXT,
    secondary_color TEXT,
    phone TEXT,
    email TEXT,
    company_name TEXT,
    logo_url TEXT,
    facebook_pixel_id TEXT,
    google_analytics_id TEXT,
    is_active BOOLEAN DEFAULT true,
    custom_fields JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert all brands with proper UUIDs
INSERT INTO public.brands (id, domain, brand_name, target_demographic, selling_point, tagline, primary_color, secondary_color, phone, email, company_name, is_active, custom_fields) VALUES
-- Veteran Legacy Life
('550e8400-e29b-41d4-a716-446655440001', 'veteranlegacylife.com', 'Veteran Legacy Life', 'Veterans & Active Service Members', 'Exclusive 2025 life insurance benefits for veterans, active service members, and their families. Get whole life, term life, and IUL coverage with living benefits.', 'You May Qualify for New Life Insurance Benefits in 2025', '#2563eb', '#3b6eea', '1-800-VET-INSURANCE', 'info@veteranlegacylife.com', 'Veteran Legacy Life Insurance', true, '{"militaryStatus": true, "branchOfService": true, "vaBenefits": true}'),

-- Responder Legacy Life
('550e8400-e29b-41d4-a716-446655440002', 'responderlegacylife.com', 'Responder Legacy Life', 'First responders — firefighters, EMTs, police, nurses', 'You protect and serve every day. Let us protect your family with a plan that never takes a day off.', 'The ones who save lives deserve theirs secured.', '#be185d', '#ec4899', '(555) 123-4568', 'info@responderlegacylife.com', 'Responder Legacy Life Insurance', true, '{"responderType": true, "lineOfDutyRisk": true}'),

-- Educator Legacy Life
('550e8400-e29b-41d4-a716-446655440003', 'educatorlegacylife.com', 'Educator Legacy Life', 'Teachers, professors, educators, support staff', 'You''ve dedicated your life to teaching others. Now we''ll help you protect your own legacy.', 'Secure the future you''ve been shaping.', '#059669', '#34d399', '(555) 123-4568', 'info@educatorlegacylife.com', 'Educator Legacy Life Insurance', true, '{"educatorRole": true, "schoolSafetyConcerns": true}'),

-- Creator Legacy Life
('550e8400-e29b-41d4-a716-446655440004', 'creatorlegacylife.com', 'Creator Legacy Life', 'Content creators, influencers, digital entrepreneurs', 'You create content every day — but what about your financial future? Turn your hustle into a lasting legacy.', 'Protect the life behind the likes.', '#7c2d12', '#ea580c', '(555) 123-4568', 'info@creatorlegacylife.com', 'Creator Legacy Life Insurance', true, '{"platformType": true, "followerCount": true}'),

-- Startup Legacy Life
('550e8400-e29b-41d4-a716-446655440005', 'startuplegacylife.com', 'Startup Legacy Life', 'Startup founders, entrepreneurs, business owners', 'You take risks every day building your company — your financial future doesn''t need to be one of them.', 'Build your dream. Secure your legacy.', '#059669', '#10b981', '(555) 123-4568', 'info@startuplegacylife.com', 'Startup Legacy Life Insurance', true, '{"companyStage": true, "fundingRound": true}'),

-- Foundation Legacy Life
('550e8400-e29b-41d4-a716-446655440006', 'foundationlegacylife.com', 'Foundation Legacy Life', 'Families, first-time homeowners, new parents', 'Create a solid financial foundation that protects your family''s future and builds generational wealth.', 'Build your foundation. Secure your family.', '#9333ea', '#a855f7', '(555) 123-4568', 'info@foundationlegacylife.com', 'Foundation Legacy Life Insurance', true, '{"familySize": true, "homeOwnership": true}'),

-- Trade Legacy Life
('550e8400-e29b-41d4-a716-446655440007', 'tradelegacylife.com', 'Trade Legacy Life', 'Skilled tradespeople, blue-collar workers, craftsmen', 'Skilled tradespeople deserve skilled protection. Our trade-focused life insurance plans understand your unique needs.', 'Master your trade. Secure your future.', '#ea580c', '#f97316', '(555) 123-4568', 'info@tradelegacylife.com', 'Trade Legacy Life Insurance', true, '{"tradeType": true, "yearsInTrade": true}'),

-- Success Legacy Life
('550e8400-e29b-41d4-a716-446655440008', 'successlegacylife.com', 'Success Legacy Life', 'High achievers, professionals, executives', 'Your success story deserves a happy ending. Protect your achievements and build lasting wealth.', 'Protect your success. Build your legacy.', '#0891b2', '#0e7490', '(555) 123-4568', 'info@successlegacylife.com', 'Success Legacy Life Insurance', true, '{"incomeLevel": true, "careerStage": true}'),

-- Immigrant Legacy Life
('550e8400-e29b-41d4-a716-446655440009', 'immigrantlegacylife.com', 'Immigrant Legacy Life', 'Immigrants, new Americans, international families', 'Your American dream deserves American protection. Build your future with confidence.', 'Dream American. Protect American.', '#dc2626', '#ef4444', '(555) 123-4568', 'info@immigrantlegacylife.com', 'Immigrant Legacy Life Insurance', true, '{"yearsInUS": true, "citizenshipStatus": true}'),

-- Trader Legacy Life
('550e8400-e29b-41d4-a716-446655440010', 'traderlegacylife.com', 'Trader Legacy Life', 'Active traders, investors, financial professionals', 'You manage risk for a living. Let us help you manage the risk to your family''s future.', 'Trade with confidence. Protect your legacy.', '#16a34a', '#22c55e', '(555) 123-4568', 'info@traderlegacylife.com', 'Trader Legacy Life Insurance', true, '{"tradingType": true, "portfolioSize": true}');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_brands_domain ON public.brands(domain);
CREATE INDEX IF NOT EXISTS idx_brands_brand_name ON public.brands(brand_name);
CREATE INDEX IF NOT EXISTS idx_brands_is_active ON public.brands(is_active);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_brands_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_brands_updated_at BEFORE UPDATE ON public.brands
    FOR EACH ROW EXECUTE FUNCTION update_brands_updated_at_column();
