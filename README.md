# Multi-Brand Legacy Life Insurance Funnel System

A comprehensive, scalable system for managing multiple life insurance brands with specialized funnels for different demographics.

## 🎯 **System Overview**

This system provides:
- **9 Specialized Brands** targeting different demographics
- **Dynamic Funnels** that adapt to each brand's unique messaging
- **Centralized Admin Portal** for managing all leads across brands
- **Unified Database** with brand-specific tracking and analytics
- **Scalable Architecture** ready for additional brands

## 🏢 **Brand Portfolio**

### 1. **Veteran Legacy Life**
- **Target**: Veterans
- **Domain**: veteranlegacylife.com
- **Tagline**: "Honor your service. Secure your legacy."
- **Color**: Navy Blue (#1e3a8a)

### 2. **Startup Legacy Life**
- **Target**: Entrepreneurs, young professionals, founders
- **Domain**: startuplegacylife.com
- **Tagline**: "Build your dream. Secure your legacy."
- **Color**: Green (#059669)

### 3. **Foundation Legacy Life**
- **Target**: New families, first-time homeowners
- **Domain**: foundationlegacylife.com
- **Tagline**: "A future built on security."
- **Color**: Purple (#7c3aed)

### 4. **Trade Legacy Life**
- **Target**: Blue-collar workers, skilled trades
- **Domain**: tradelegacylife.com
- **Tagline**: "For the people who build, fix, and make."
- **Color**: Red (#dc2626)

### 5. **Success Legacy Life**
- **Target**: High-achievers, sales pros, executives
- **Domain**: successlegacylife.com
- **Tagline**: "Protect what you've worked for."
- **Color**: Gold (#f59e0b)

### 6. **Immigrant Legacy Life**
- **Target**: Immigrant families, first-gen Americans
- **Domain**: immigrantlegacylife.com
- **Tagline**: "From sacrifice to security."
- **Color**: Cyan (#0891b2)

### 7. **Responder Legacy Life**
- **Target**: First responders, firefighters, EMTs, police, nurses
- **Domain**: responderlegacylife.com
- **Tagline**: "The ones who save lives deserve theirs secured."
- **Color**: Pink (#be185d)

### 8. **Educator Legacy Life**
- **Target**: Teachers, professors, educators
- **Domain**: educatorlegacylife.com
- **Tagline**: "Secure the future you've been shaping."
- **Color**: Green (#059669)

### 9. **Trader Legacy Life**
- **Target**: Day traders, crypto investors, stock market risk-takers
- **Domain**: traderlegacylife.com
- **Tagline**: "One investment that's never risky."
- **Color**: Dark Gray (#1f2937)

### 10. **Creator Legacy Life**
- **Target**: Content creators, influencers, digital entrepreneurs
- **Domain**: creatorlegacylife.com
- **Tagline**: "Protect the life behind the likes."
- **Color**: Orange (#7c2d12)

## 🏗️ **Architecture**

### **Single Codebase, Multi-Brand Approach**
- **Dynamic Brand Detection**: Routes adapt based on brand ID
- **Shared Components**: Reusable UI components with brand-specific styling
- **Centralized Database**: All leads stored in unified Supabase tables
- **Brand-Specific Customization**: Colors, messaging, and fields adapt per brand

### **Key Features**
- ✅ **Brand-Specific Landing Pages** with unique messaging
- ✅ **Dynamic Color Schemes** for each brand
- ✅ **Custom Form Fields** based on demographic needs
- ✅ **Unified Lead Tracking** across all brands
- ✅ **Centralized Admin Portal** for management
- ✅ **Attribution Tracking** for Facebook ads and campaigns
- ✅ **Email Automation** with brand-specific templates

## 🚀 **Quick Start**

### 1. **Environment Setup**
```bash
# Copy environment variables
cp ../insurance-funnel/.env.local .env.local

# Install dependencies
npm install
```

### 2. **Database Setup**
```bash
# Run migrations to add all brands
npx supabase db push
```

### 3. **Start Development**
```bash
npm run dev
```

### 4. **Access Points**
- **Main Landing**: http://localhost:3000
- **Brand Funnels**: http://localhost:3000/funnel/[brand-id]
- **Admin Portal**: http://localhost:3001 (from admin-portal directory)

## 📊 **URL Structure**

### **Main Landing Page**
```
http://localhost:3000/
```
- Shows all 9 brands with filtering and search
- Each brand card links to its specific funnel

### **Brand-Specific Funnels**
```
http://localhost:3000/funnel/veteran-legacy-life
http://localhost:3000/funnel/startup-legacy-life
http://localhost:3000/funnel/foundation-legacy-life
http://localhost:3000/funnel/trade-legacy-life
http://localhost:3000/funnel/success-legacy-life
http://localhost:3000/funnel/immigrant-legacy-life
http://localhost:3000/funnel/responder-legacy-life
http://localhost:3000/funnel/educator-legacy-life
http://localhost:3000/funnel/trader-legacy-life
http://localhost:3000/funnel/creator-legacy-life
```

## 🎨 **Brand Customization**

### **Adding New Brands**
1. **Update `src/config/brands.ts`**:
   ```typescript
   {
     id: 'new-brand-id',
     domain: 'newbrandlegacylife.com',
     brandName: 'New Brand Legacy Life',
     targetDemographic: 'Target audience description',
     sellingPoint: 'Unique selling proposition',
     tagline: 'Brand tagline',
     primaryColor: '#color-code',
     secondaryColor: '#color-code',
     phone: '(555) 123-XXXX',
     email: 'info@newbrandlegacylife.com',
     companyName: 'New Brand Legacy Life Insurance',
     isActive: true,
     customFields: {
       // Brand-specific form fields
     }
   }
   ```

2. **Add to Database**:
   ```sql
   INSERT INTO public.brands (domain, brand_name, target_demographic, ...)
   VALUES ('newbrandlegacylife.com', 'New Brand Legacy Life', ...);
   ```

### **Custom Form Fields**
Each brand can have unique form fields based on their demographic:

- **Veteran**: Military status, branch of service, VA benefits
- **Startup**: Company stage, funding round, equity compensation
- **Foundation**: Family size, home ownership, children ages
- **Trade**: Trade type, years in trade, union membership
- **Success**: Income level, career stage, performance metrics
- **Immigrant**: Years in US, citizenship status, family back home
- **Responder**: Responder type, years of service, shift schedule
- **Educator**: Education level, years teaching, school type
- **Trader**: Trading type, portfolio size, risk tolerance
- **Creator**: Platform type, follower count, revenue streams

## 📈 **Analytics & Tracking**

### **Lead Scoring System**
- **Email**: +20 points
- **Phone**: +15 points
- **Progress**: +5 points per step
- **Demographic-specific bonuses**: +25 points
- **Recent activity**: +10-20 points

### **Attribution Tracking**
- UTM parameters (source, medium, campaign, content, term)
- Facebook click IDs (fbclid)
- Google click IDs (gclid)
- Referrer tracking
- Landing page tracking

### **Technical Data**
- Device type (mobile/desktop)
- Browser information
- Screen resolution
- IP address
- Timezone
- User agent

## 🔧 **Admin Portal Integration**

### **Unified Dashboard**
- View leads from all brands
- Filter by brand, demographic, or status
- Real-time conversion tracking
- Campaign performance analytics

### **Brand-Specific Views**
- Filter admin portal by specific brand
- Brand-specific lead scoring
- Custom email templates per brand
- Demographic-specific analytics

## 📧 **Email Automation**

### **Brand-Specific Templates**
Each brand has customized email templates:
- **New Lead Notifications** with brand-specific messaging
- **Abandonment Recovery** emails tailored to demographic
- **Application Complete** notifications with brand colors
- **Follow-up Sequences** based on lead score and brand

### **Email Triggers**
- **New Lead**: When qualified lead is created
- **Abandonment**: After 30 minutes of inactivity
- **Application Complete**: When full application is submitted
- **Follow-up**: Based on lead score and engagement

## 🚀 **Deployment Strategy**

### **Option 1: Single Domain with Subdomains**
```
main-domain.com/ (brand selector)
veteran.main-domain.com/ (veteran funnel)
startup.main-domain.com/ (startup funnel)
foundation.main-domain.com/ (foundation funnel)
```

### **Option 2: Separate Domains**
```
veteranlegacylife.com
startuplegacylife.com
foundationlegacylife.com
tradelegacylife.com
successlegacylife.com
immigrantlegacylife.com
responderlegacylife.com
educatorlegacylife.com
traderlegacylife.com
creatorlegacylife.com
```

### **Option 3: Subdirectory Structure**
```
main-domain.com/veteran/
main-domain.com/startup/
main-domain.com/foundation/
```

## 🔒 **Security & Compliance**

### **Data Protection**
- All data encrypted in transit and at rest
- GDPR-compliant data handling
- Secure form submissions
- Privacy policy integration

### **Access Control**
- Admin portal authentication
- Role-based permissions
- Audit logging
- Secure API endpoints

## 📱 **Mobile Optimization**

### **Responsive Design**
- Mobile-first approach
- Touch-friendly interfaces
- Optimized form inputs
- Fast loading times

### **Progressive Web App**
- Offline functionality
- Push notifications
- App-like experience
- Install prompts

## 🔄 **Future Enhancements**

### **Phase 2 Features**
- [ ] **Advanced Analytics Dashboard**
- [ ] **A/B Testing Framework**
- [ ] **Dynamic Content Personalization**
- [ ] **Multi-language Support**
- [ ] **Advanced Lead Scoring AI**
- [ ] **Integration with CRM Systems**
- [ ] **Advanced Email Marketing Automation**
- [ ] **Social Media Integration**
- [ ] **Video Content Integration**
- [ ] **Chatbot Support**

### **Phase 3 Features**
- [ ] **AI-Powered Lead Qualification**
- [ ] **Predictive Analytics**
- [ ] **Advanced Attribution Modeling**
- [ ] **Multi-channel Campaign Management**
- [ ] **Advanced Reporting & Insights**

## 🛠️ **Development Commands**

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run database migrations
npx supabase db push

# Generate types from database
npx supabase gen types typescript --local > src/types/database.ts
```

## 📞 **Support & Maintenance**

### **Monitoring**
- Real-time error tracking
- Performance monitoring
- Uptime monitoring
- Lead conversion tracking

### **Backup & Recovery**
- Automated database backups
- Version control for all code
- Disaster recovery procedures
- Data retention policies

---

**This system provides a complete, scalable solution for managing multiple life insurance brands with specialized funnels, unified tracking, and centralized management.**
