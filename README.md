# CampusClaim

**Smart Lost & Found Portal for Campuses**

CampusClaim is a full-stack web application designed to digitize the lost-and-found process within campus environments. It replaces manual notice boards and fragmented communication with a centralized digital system.

## 🚀 Current Status

### ✅ Completed Features

- **Authentication System**
  - User registration with email/password
  - Secure login with NextAuth
  - Session management (30-day sessions)
  - Role-based access control (User/Admin)
  - Password hashing with bcrypt
  - Protected routes
  - Responsive auth UI

- **User Dashboard**
  - Welcome screen with user stats
  - User navigation with profile dropdown
  - Theme switching (light/dark mode)
  - Responsive layout

- **Landing Page**
  - Modern hero section
  - Feature highlights
  - Call-to-action buttons

## 🛠️ Tech Stack

- **Frontend:** Next.js 16.1.6, React 19.2.3, TypeScript 5
- **Backend:** Next.js API Routes
- **Database:** MongoDB Atlas with Mongoose
- **Authentication:** NextAuth 4.24.13
- **Styling:** Tailwind CSS 4, shadcn/ui
- **File Storage:** Vercel Blob Storage
- **Deployment:** Vercel

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd campusclaim
   ```

2. **Install dependencies**

   ```bash
   npm install --legacy-peer-deps
   ```

3. **Set up environment variables**

   Create a `.env.local` file:

   ```env
   # MongoDB
   MONGODB_URI="your-mongodb-connection-string"

   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key"

   # Vercel Blob Storage
   BLOB_READ_WRITE_TOKEN="your-blob-token"
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Documentation

- **[AUTH_SETUP.md](./AUTH_SETUP.md)** - Complete authentication system documentation
- **[NEXT_STEPS.md](./NEXT_STEPS.md)** - Development roadmap and next features
- **[.kiro/steering/](./kiro/steering/)** - Project guidelines and conventions

## 🎯 Core Features (Planned)

### For Users

- Report lost items with descriptions, images, and location
- Report found items to help others
- Search and filter through lost/found records
- Submit ownership claims with proof
- Track claim status (Pending/Approved/Rejected)

### For Administrators

- Review and verify claim requests
- Approve or reject claims
- Remove spam or invalid entries
- Monitor system statistics
- Manage users and items

## 🏗️ Project Structure

```
campusclaim/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── api/          # API routes
│   │   ├── auth/         # Authentication pages
│   │   ├── dashboard/    # User dashboard
│   │   └── layout.tsx    # Root layout
│   ├── components/
│   │   ├── auth/         # Auth components
│   │   ├── layout/       # Layout components
│   │   ├── providers/    # Context providers
│   │   └── ui/           # shadcn/ui components
│   ├── lib/              # Utilities
│   ├── models/           # Mongoose models
│   └── types/            # TypeScript types
├── public/               # Static assets
└── .kiro/                # AI steering rules
```

## 🔐 Security Features

- Password hashing with bcrypt (10 salt rounds)
- Secure session management with JWT
- HTTP-only cookies
- CSRF protection
- Input validation (client & server)
- Email uniqueness enforcement
- Role-based authorization

## 🎨 UI/UX Features

- Responsive design (mobile-first)
- Dark mode support
- Loading states
- Error handling
- Toast notifications
- Accessible components (shadcn/ui)
- Smooth animations

## 📱 Responsive Design

Optimized for:

- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1440px+)

## 🧪 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

### Code Style

- TypeScript strict mode enabled
- ESLint for code quality
- Prettier for formatting (recommended)
- Path aliases (@/components, @/lib, etc.)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production

```env
MONGODB_URI=<production-mongodb-uri>
NEXTAUTH_URL=<production-url>
NEXTAUTH_SECRET=<secure-random-string>
BLOB_READ_WRITE_TOKEN=<vercel-blob-token>
```

## 📋 Next Development Phase

1. **Item Management** - CRUD operations for lost/found items
2. **Image Upload** - Vercel Blob integration
3. **Search & Filter** - Advanced search functionality
4. **Claims System** - Ownership claim workflow
5. **Admin Panel** - Management dashboard

See [NEXT_STEPS.md](./NEXT_STEPS.md) for detailed roadmap.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Team

Developed for campus communities to streamline lost and found processes.

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Status:** 🟢 Active Development

**Version:** 0.1.0

**Last Updated:** February 2026
