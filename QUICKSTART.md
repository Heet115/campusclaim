# CampusClaim Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install --legacy-peer-deps
```

### Step 2: Verify Environment Variables

Check that `.env.local` exists with:

```env
MONGODB_URI="mongodb+srv://hpviradiya05:Heet0111v@@cluster0.ewlxwda.mongodb.net/campusclaim?retryWrites=true&w=majority&appName=Cluster0"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_bEbWj7kJpPM7nM5y_IqrJTgDdUOMQCheIGknQutAFu8AdkS"
```

### Step 3: Start Development Server

```bash
npm run dev
```

### Step 4: Test the Application

#### 🏠 Landing Page

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the CampusClaim landing page
3. Click "Get Started" or "Sign In"

#### 📝 Create an Account

1. Navigate to [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup)
2. Fill in the form:
   - **Name:** Your Full Name
   - **Email:** your.email@campus.edu
   - **Password:** At least 6 characters
3. Click "Create Account"
4. You'll be automatically signed in and redirected to the dashboard

#### 🔐 Sign In

1. Navigate to [http://localhost:3000/auth/signin](http://localhost:3000/auth/signin)
2. Enter your credentials
3. Click "Sign In"
4. You'll be redirected to the dashboard

#### 📊 Dashboard

1. After signing in, you'll see your dashboard at [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
2. View your statistics (currently showing 0s)
3. Click on your avatar in the top-right corner
4. Explore the dropdown menu:
   - View your profile info
   - Access settings
   - Sign out

#### 🚪 Sign Out

1. Click your avatar in the top-right
2. Click "Sign Out"
3. You'll be redirected to the landing page

## ✅ Verification Checklist

- [ ] Landing page loads correctly
- [ ] Can navigate to sign up page
- [ ] Can create a new account
- [ ] Automatically signed in after registration
- [ ] Redirected to dashboard
- [ ] Dashboard shows user name
- [ ] User navigation dropdown works
- [ ] Can sign out
- [ ] Can sign in with existing account
- [ ] Protected routes redirect to sign in when not authenticated

## 🎨 UI Features to Test

### Theme Switching

- The app supports light and dark modes
- Theme follows system preference by default
- Toggle theme using system settings

### Responsive Design

- Resize browser window
- Test on mobile viewport (DevTools)
- Verify layout adapts properly

### Form Validation

- Try submitting empty forms
- Try password less than 6 characters
- Try registering with existing email
- Verify error messages display

## 🐛 Common Issues

### MongoDB Connection Error

**Problem:** Can't connect to MongoDB

**Solution:**

1. Verify MONGODB_URI in `.env.local`
2. Check MongoDB Atlas network access
3. Ensure IP address is whitelisted

### NextAuth Error

**Problem:** Authentication not working

**Solution:**

1. Verify NEXTAUTH_SECRET is set
2. Check NEXTAUTH_URL matches your domain
3. Clear browser cookies
4. Restart dev server

### Build Errors

**Problem:** TypeScript or build errors

**Solution:**

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
npm install --legacy-peer-deps

# Rebuild
npm run build
```

### Port Already in Use

**Problem:** Port 3000 is already in use

**Solution:**

```bash
# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- -p 3001
```

## 📱 Test on Different Devices

### Desktop

- Chrome, Firefox, Safari, Edge
- Test at 1920x1080, 1366x768

### Tablet

- iPad (768x1024)
- Android tablet (800x1280)

### Mobile

- iPhone (375x667, 414x896)
- Android (360x640, 412x915)

## 🔍 What to Look For

### Performance

- Page loads quickly
- No layout shifts
- Smooth animations
- Fast form submissions

### Accessibility

- Keyboard navigation works
- Focus indicators visible
- Form labels present
- Error messages clear

### Security

- Passwords are hidden
- Can't access dashboard when signed out
- Session persists across page refreshes
- Sign out works properly

## 🎯 Next Steps After Testing

Once authentication is working:

1. **Create an Admin User**
   - Sign up normally
   - Manually update role in MongoDB to 'admin'
   - Test admin features

2. **Test Edge Cases**
   - Very long names/emails
   - Special characters in password
   - Multiple sign-in attempts
   - Session expiration

3. **Start Building Next Features**
   - See [NEXT_STEPS.md](./NEXT_STEPS.md)
   - Begin with Item Management
   - Then Image Upload
   - Then Search & Filter

## 💡 Tips

- Keep the dev server running while developing
- Use browser DevTools for debugging
- Check console for errors
- Test in incognito mode for fresh sessions
- Use MongoDB Compass to view database

## 📚 Additional Resources

- [AUTH_SETUP.md](./AUTH_SETUP.md) - Detailed auth documentation
- [NEXT_STEPS.md](./NEXT_STEPS.md) - Development roadmap
- [Next.js Docs](https://nextjs.org/docs)
- [NextAuth Docs](https://next-auth.js.org)
- [MongoDB Docs](https://docs.mongodb.com)

## 🎉 Success!

If you can:

1. ✅ Create an account
2. ✅ Sign in
3. ✅ View dashboard
4. ✅ Sign out

**Congratulations!** Your authentication system is working perfectly. You're ready to build the next features!

---

**Need Help?** Check the troubleshooting section or review the documentation files.
