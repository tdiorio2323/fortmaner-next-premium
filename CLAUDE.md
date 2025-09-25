# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fort Maner is a premium luxury streetwear e-commerce site built with React 18, TypeScript, Vite, and Tailwind CSS. The project uses shadcn/ui components and focuses on a sophisticated aesthetic combining high art and street style.

## Development Commands

### Core Commands
- `npm run dev` - Start development server on port 8080
- `npm run build` - Production build
- `npm run build:dev` - Development build
- `npm run preview` - Preview production build
- `npm run start` - Start production preview server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with ESLint --fix
- `npm test` - Run tests (currently placeholder)

### Quality Assurance
Always run these commands before committing:
1. `npm run typecheck` - Ensure TypeScript compilation
2. `npm run lint` - Check code style and potential issues

## Architecture

### Tech Stack
- **Build Tool**: Vite with React SWC plugin
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: shadcn/ui components
- **Routing**: React Router v6 with client-side routing
- **State Management**: TanStack Query for server state, React Context for cart
- **Icons**: Lucide React
- **Analytics**: Meta Pixel integration
- **Backend**: Supabase (optional integration)

### Project Structure
```
src/
├── assets/           # Images and static assets
├── components/       # React components
│   ├── ui/          # shadcn/ui base components
│   ├── sections/    # Page section components
│   └── [others]     # Custom components (Header, Footer, etc.)
├── context/         # React Context providers (CartContext)
├── data/           # JSON data files (products, collections, etc.)
├── pages/          # Route components
└── App.tsx         # Main application with routing
```

### Design System
- **Colors**: Brand colors defined in CSS custom properties
- **Typography**: Inter font family
- **Effects**: Stone textures, luxury shadows, smooth transitions
- **Responsive**: Mobile-first approach with Tailwind breakpoints

### Key Components
- **App.tsx**: Main router with global providers and error boundary
- **Header/Footer**: Navigation and site structure
- **CartContext**: Global shopping cart state management
- **ErrorBoundary**: Catches React errors gracefully
- **MetaPixel**: Facebook/Meta analytics tracking

### Routing
Uses React Router v6 with routes for:
- Product pages (`/product/:slug`)
- Category pages (`/men`, `/ladies`, `/kids`, etc.)
- Shop sections (`/shop/fw`, `/shop/ss`)
- Commerce flow (`/cart`, `/checkout`, `/checkout/success`)
- Content pages (`/about`, `/blog`, `/community`)

## Environment Variables

Required for full functionality:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase public key
- `VITE_FACEBOOK_PIXEL_ID` - Meta Pixel tracking ID

The app works without these variables but with reduced functionality.

## Data Management

### Product Data
- Products stored in JSON files in `src/data/`
- Multiple product files: `products.json`, `products-enhanced.json`, `products-complete.json`
- Product schema includes: id, handle, title, price, images, category, badges, inStock

### Static Assets
- All images imported as ES6 modules from `src/assets/`
- Use path alias `@/assets/` for imports
- Background images referenced via public directory

## Development Guidelines

### Code Conventions
- Use TypeScript strict mode
- Import components using `@/` path alias
- Follow existing shadcn/ui patterns for new components
- Use Tailwind classes for styling
- Maintain mobile-first responsive design

### Component Patterns
- Functional components with TypeScript
- Custom hooks for complex state logic
- Error boundaries for robust error handling
- Context providers for global state

### Styling
- Tailwind CSS with custom design tokens
- Brand colors via CSS custom properties
- Mobile-first responsive breakpoints
- shadcn/ui component variants for consistency

## Deployment

The project is configured for deployment on:
- Vercel (with vercel.json configuration)
- Netlify
- Other static hosting providers

Static assets are served correctly with the Vite build process.