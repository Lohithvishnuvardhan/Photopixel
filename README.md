# Photo Pixel - E-commerce Platform

A modern e-commerce platform for photography equipment built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- 🔐 **Authentication System** (Supabase)
  - User registration and login
  - Password reset functionality
  - Protected routes
  - User profile management
- 🛍️ **Product Catalog** (Cameras, Lenses, Accessories, Batteries)
- 🛒 Shopping cart functionality
- 💳 Payment processing
- 📦 Order management
- 👤 User profiles
- 📱 Responsive design
- 🔍 Product search
- 🎨 Modern UI with Tailwind CSS
- 🌐 Multi-language support (English, Hindi, Telugu)
- 📧 Email notifications

## Tech Stack

**Frontend:**
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Build Tool**: Vite
- **Authentication**: Supabase Auth

**Backend:**
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
## Getting Started

### Prerequisites

1. Node.js 18+ installed
2. A Supabase account and project

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd photo-pixel-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Copy `.env.example` to `.env` and fill in your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Set up the database**
   - In your Supabase dashboard, go to the SQL Editor
   - Run the database setup scripts (see Database Schema section below)

5. **Start the development server**
   ```bash
   npm run dev
   ```

### Database Schema

The application uses Supabase for authentication and data storage. Here are the main tables you'll need:

```bash
-- Enable Row Level Security
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  name TEXT,
  email TEXT,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policy for profiles
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create policy for orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Create order_items table
CREATE TABLE order_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Production Build

```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment

The project is ready for deployment on:

- ✅ **Vercel**: Recommended for React apps
- ✅ **Netlify**: Great for static sites with forms
- ✅ **Railway**: Good for full-stack apps
- ✅ **Render**: Alternative to Heroku

### Environment Variables for Production:

Make sure to set these environment variables in your deployment platform:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## 📁 Project Structure

```
├── src/                   # React frontend
│   ├── components/        # Reusable components
│   ├── context/          # React contexts (Auth, Language, etc.)
│   ├── pages/            # Page components
│   ├── store/            # Zustand stores
│   ├── utils/            # Utility functions
│   │   └── supabase.ts   # Supabase client configuration
│   └── App.tsx           # Main app component
│
├── public/               # Static assets
└── dist/                # Build output
```

## 🔧 Available Scripts

**Development:**
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🔐 Authentication Features

- **User Registration**: Create new accounts with email verification
- **Login/Logout**: Secure authentication with Supabase
- **Password Reset**: Forgot password functionality with email links
- **Protected Routes**: Automatic redirection for authenticated/unauthenticated users
- **User Profiles**: Manage user information and preferences
- **Session Management**: Automatic token refresh and session persistence

## 🌐 Features

**Product Browsing:**
- Browse cameras, lenses, accessories, and batteries
- Product search and filtering
- Detailed product information
- Real-time inventory updates

**Shopping Experience:**
- Add to cart functionality
- Cart persistence with localStorage
- Secure checkout process
- Order confirmation
- Order history and tracking

**User Management:**
- User registration and authentication
- Profile management
- Order history
- Secure password reset

**User Interface:**
- Responsive design for all devices
- Modern UI with Tailwind CSS
- Smooth animations and transitions
- Professional photography theme

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 🎯 Full-Stack E-commerce Application

This is a complete e-commerce application with:
- ✅ **Authentication**: Secure user management with Supabase
- ✅ **Database**: PostgreSQL database with Supabase
- ✅ **Real-time**: Live updates and notifications
- ✅ **Scalable**: Built for production use
- ✅ **Modern Stack**: Latest React, TypeScript, and Tailwind CSS

Ready for production deployment! 🚀