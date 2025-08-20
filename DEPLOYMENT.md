# Multi-Brand Funnel Deployment Guide

## 🚀 **Quick Deployment**

### **Option 1: Vercel (Recommended)**

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Multi-brand funnel system"
   git remote add origin https://github.com/yourusername/multi-brand-funnel.git
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
     NEXTAUTH_SECRET=your_nextauth_secret
     NEXTAUTH_URL=https://your-domain.vercel.app
     ADMIN_EMAIL=admin@veteranlegacylife.com
     RESEND_API_KEY=your_resend_api_key
     ```

3. **Deploy**:
   - Vercel will automatically deploy on push to main
   - Your site will be available at `https://your-domain.vercel.app`

### **Option 2: Netlify**

1. **Build Command**: `npm run build`
2. **Publish Directory**: `.next`
3. **Environment Variables**: Same as Vercel

### **Option 3: Self-Hosted**

1. **Build the Application**:
   ```bash
   npm run build
   npm start
   ```

2. **Use PM2 for Production**:
   ```bash
   npm install -g pm2
   pm2 start npm --name "multi-brand-funnel" -- start
   pm2 save
   pm2 startup
   ```

## 🌐 **Domain Configuration**

### **Option 1: Single Domain with Subdomains**

Configure your DNS to point all subdomains to your hosting provider:

```
main-domain.com → Main landing page
veteran.main-domain.com → Veteran funnel
startup.main-domain.com → Startup funnel
foundation.main-domain.com → Foundation funnel
trade.main-domain.com → Trade funnel
success.main-domain.com → Success funnel
immigrant.main-domain.com → Immigrant funnel
responder.main-domain.com → Responder funnel
educator.main-domain.com → Educator funnel
trader.main-domain.com → Trader funnel
creator.main-domain.com → Creator funnel
```

### **Option 2: Separate Domains**

Purchase and configure each domain separately:

- veteranlegacylife.com
- startuplegacylife.com
- foundationlegacylife.com
- tradelegacylife.com
- successlegacylife.com
- immigrantlegacylife.com
- responderlegacylife.com
- educatorlegacylife.com
- traderlegacylife.com
- creatorlegacylife.com

### **Option 3: Subdirectory Structure**

Use a single domain with subdirectories:

```
main-domain.com/ → Main landing
main-domain.com/veteran/ → Veteran funnel
main-domain.com/startup/ → Startup funnel
main-domain.com/foundation/ → Foundation funnel
```

## 🔧 **Database Setup**

### **1. Run Migrations**
```bash
# Install Supabase CLI
npm install -g supabase

# Initialize Supabase
supabase init

# Link to your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

### **2. Add All Brands**
The migration `20250120000002_add_all_brands.sql` will automatically add all 9 brands to your database.

### **3. Verify Setup**
Check that all brands are in your `brands` table:
```sql
SELECT * FROM brands WHERE is_active = true;
```

## 📧 **Email Configuration**

### **1. Resend Setup**
1. Create account at [resend.com](https://resend.com)
2. Get your API key
3. Add to environment variables: `RESEND_API_KEY=your_key`

### **2. Email Templates**
Each brand has customized email templates:
- New lead notifications
- Abandonment recovery
- Application complete
- Follow-up sequences

### **3. Test Email Delivery**
```bash
# Test email sending
curl -X POST https://your-domain.vercel.app/api/send-lead-notification \
  -H "Content-Type: application/json" \
  -d '{"leadId": "test-lead-id"}'
```

## 🔒 **Security Configuration**

### **1. Environment Variables**
Never commit sensitive data:
```bash
# .env.local (not in git)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=https://your-domain.vercel.app
ADMIN_EMAIL=admin@veteranlegacylife.com
RESEND_API_KEY=your_resend_api_key
```

### **2. Supabase RLS Policies**
Ensure Row Level Security is enabled:
```sql
-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';
```

### **3. CORS Configuration**
Configure CORS for your domains:
```sql
-- Add your domains to allowed origins
INSERT INTO auth.config (key, value) 
VALUES ('site_url', 'https://your-domain.vercel.app');
```

## 📊 **Analytics Setup**

### **1. Google Analytics**
Add Google Analytics to each brand:
```typescript
// In src/config/brands.ts
{
  googleAnalyticsId: 'GA_MEASUREMENT_ID'
}
```

### **2. Facebook Pixel**
Add Facebook Pixel IDs:
```typescript
// In src/config/brands.ts
{
  facebookPixelId: 'FB_PIXEL_ID'
}
```

### **3. Custom Tracking**
The system automatically tracks:
- UTM parameters
- Facebook click IDs
- Google click IDs
- Device information
- User behavior

## 🔄 **Monitoring & Maintenance**

### **1. Health Checks**
Set up monitoring for:
- Database connectivity
- Email delivery
- Lead creation
- Form submissions

### **2. Error Tracking**
Integrate with:
- Sentry for error tracking
- LogRocket for session replay
- Google Analytics for user behavior

### **3. Performance Monitoring**
Monitor:
- Page load times
- Form completion rates
- Lead conversion rates
- Email open/click rates

## 🚀 **Scaling Considerations**

### **1. Database Optimization**
- Add indexes for frequently queried columns
- Monitor query performance
- Set up database backups

### **2. CDN Configuration**
- Use Vercel's edge network
- Configure image optimization
- Enable caching headers

### **3. Rate Limiting**
- Implement rate limiting for form submissions
- Add CAPTCHA for spam protection
- Monitor for suspicious activity

## 📱 **Mobile Optimization**

### **1. PWA Configuration**
Add to `next.config.js`:
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // your existing config
});
```

### **2. Mobile Testing**
Test on:
- iOS Safari
- Android Chrome
- Various screen sizes
- Different network conditions

## 🔧 **Troubleshooting**

### **Common Issues**

1. **Build Failures**:
   ```bash
   # Clear cache
   rm -rf .next
   npm run build
   ```

2. **Database Connection**:
   ```bash
   # Test connection
   npx supabase status
   ```

3. **Email Not Sending**:
   - Check Resend API key
   - Verify email templates
   - Check spam filters

4. **Lead Not Saving**:
   - Check Supabase permissions
   - Verify RLS policies
   - Check network connectivity

### **Support**
- Check Supabase dashboard for database issues
- Monitor Vercel logs for deployment problems
- Review browser console for client-side errors

## 📈 **Post-Deployment Checklist**

- [ ] All brands are accessible
- [ ] Forms are submitting correctly
- [ ] Emails are being sent
- [ ] Admin portal is working
- [ ] Analytics are tracking
- [ ] Mobile experience is optimized
- [ ] Security measures are in place
- [ ] Monitoring is configured
- [ ] Backups are scheduled
- [ ] Documentation is updated

---

**Your multi-brand funnel system is now ready for production! 🎉** 