# CampusClaim Authentication System

## Overview

The authentication system for CampusClaim is now fully implemented with:

- ✅ Email/password authentication using NextAuth
- ✅ MongoDB user storage with Mongoose
- ✅ Role-based access control (User/Admin)
- ✅ Secure password hashing with bcrypt
- ✅ Session management
- ✅ Protected routes
- ✅ Responsive UI with shadcn/ui components

## Setup Instructions

### 1. Environment Variables

Update your `.env.local` file with the following variables:

```env
# MongoDB
MONGODB_URI="mongodb+srv://hpviradiya05:Heet0111v@@cluster0.ewlxwda.mongodb.net/campusclaim?retryWrites=true&w=majority&appName=Cluster0"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"

# Vercel Blob Storage
BLOB_READ_WRITE_TOKEN="vercel_blob_rw_bEbWj7kJpPM7nM5y_IqrJTgDdUOMQCheIGknQutAFu8AdkS"
```

**Important:** Generate a secure NEXTAUTH_SECRET for production:

```bash
openssl rand -base64 32
```

### 2. Install Dependencies

Dependencies have been installed:

- `bcryptjs` - Password hashing
- `@types/bcryptjs` - TypeScript types
- `next-auth` - Authentication (already installed)
- `mongoose` - MongoDB ODM (already installed)

### 3. Run the Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## File Structure

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── [...nextauth]/route.ts    # NextAuth API handler
│   │       └── register/route.ts         # User registration endpoint
│   ├── auth/
│   │   ├── signin/page.tsx               # Sign in page
│   │   ├── signup/page.tsx               # Sign up page
│   │   └── error/page.tsx                # Auth error page
│   ├── dashboard/
│   │   ├── layout.tsx                    # Dashboard layout with nav
│   │   └── page.tsx                      # Dashboard home
│   ├── layout.tsx                        # Root layout with providers
│   └── page.tsx                          # Landing page
├── components/
│   ├── auth/
│   │   ├── auth-form.tsx                 # Reusable auth form component
│   │   └── user-nav.tsx                  # User navigation dropdown
│   └── providers/
│       └── session-provider.tsx          # NextAuth session provider
├── lib/
│   ├── auth.ts                           # NextAuth configuration
│   ├── mongodb.ts                        # MongoDB connection
│   └── session.ts                        # Session utilities
├── models/
│   └── User.ts                           # User Mongoose model
└── types/
    └── next-auth.d.ts                    # NextAuth TypeScript types
```

## Features

### User Registration

- Navigate to `/auth/signup`
- Enter name, email, and password (min 6 characters)
- Automatic sign-in after successful registration
- Redirects to dashboard

### User Sign In

- Navigate to `/auth/signin`
- Enter email and password
- Session persists for 30 days
- Redirects to dashboard

### Protected Dashboard

- Accessible at `/dashboard`
- Requires authentication
- Shows user statistics and activity
- User navigation with profile dropdown

### User Navigation

- Avatar with user initials
- Dropdown menu with:
  - User info (name, email, role)
  - Dashboard link
  - Settings link
  - Admin panel (for admin users)
  - Sign out

## API Endpoints

### POST `/api/auth/register`

Register a new user

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@campus.edu",
  "password": "password123"
}
```

**Response (201):**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "...",
    "name": "John Doe",
    "email": "john@campus.edu",
    "role": "user"
  }
}
```

### POST `/api/auth/signin`

Sign in (handled by NextAuth)

### POST `/api/auth/signout`

Sign out (handled by NextAuth)

## User Model

```typescript
interface IUser {
  name: string;
  email: string;
  password: string; // Hashed
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}
```

## Session Utilities

```typescript
// Get current user (server-side)
import { getCurrentUser } from "@/lib/session";
const user = await getCurrentUser();

// Require authentication
import { requireAuth } from "@/lib/session";
const user = await requireAuth(); // Throws if not authenticated

// Require admin role
import { requireAdmin } from "@/lib/session";
const admin = await requireAdmin(); // Throws if not admin
```

## Client-Side Session

```typescript
'use client';
import { useSession } from 'next-auth/react';

function Component() {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'unauthenticated') return <div>Not signed in</div>;

  return <div>Welcome {session.user.name}</div>;
}
```

## Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ Secure session management with JWT
- ✅ HTTP-only cookies
- ✅ CSRF protection (NextAuth built-in)
- ✅ Input validation on client and server
- ✅ Email uniqueness enforcement
- ✅ Role-based access control

## Next Steps

1. **Create Admin User**: Manually update a user's role to 'admin' in MongoDB
2. **Add Email Verification**: Implement email verification flow
3. **Password Reset**: Add forgot password functionality
4. **OAuth Providers**: Add Google/GitHub sign-in
5. **Rate Limiting**: Implement rate limiting for auth endpoints
6. **2FA**: Add two-factor authentication

## Testing

### Test User Registration

1. Go to `/auth/signup`
2. Fill in the form
3. Submit and verify redirect to dashboard

### Test User Sign In

1. Go to `/auth/signin`
2. Use registered credentials
3. Verify dashboard access

### Test Protected Routes

1. Sign out
2. Try to access `/dashboard`
3. Should redirect to sign-in page

## Troubleshooting

### MongoDB Connection Issues

- Verify MONGODB_URI is correct
- Check network access in MongoDB Atlas
- Ensure IP whitelist includes your IP

### NextAuth Errors

- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### Build Errors

- Run `npm install --legacy-peer-deps` if peer dependency issues
- Ensure all environment variables are set
- Check TypeScript errors with `npm run build`

## Production Checklist

- [ ] Generate secure NEXTAUTH_SECRET
- [ ] Update NEXTAUTH_URL to production domain
- [ ] Enable MongoDB Atlas IP whitelist for production
- [ ] Set up proper error logging
- [ ] Implement rate limiting
- [ ] Add email verification
- [ ] Set up monitoring and alerts
- [ ] Review and test all auth flows
- [ ] Enable HTTPS only
- [ ] Configure proper CORS settings
