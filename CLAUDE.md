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
- **UI Components**: shadcn/ui components (includes Radix UI primitives)
- **Routing**: React Router v6 with client-side routing
- **State Management**: TanStack Query for server state, React Context for cart
- **Icons**: Lucide React
- **Analytics**: Meta Pixel integration
- **Animations**: Framer Motion
- **Forms**: React Hook Form with Zod validation
- **Payment**: Stripe integration
- **Backend**: Supabase (optional), Shopify Storefront API (optional)
- **Data Layer**: Adapter pattern with feature flag switching

### Project Structure
```
src/
├── adapters/        # Data source adapters (IDataSource, LocalJson, Shopify)
├── assets/          # Images and static assets
├── components/      # React components
│   ├── ui/         # shadcn/ui base components
│   ├── sections/   # Page section components
│   └── [others]    # Custom components (Header, Footer, etc.)
├── context/         # React Context providers (CartContext)
├── data/           # JSON data files (products, collections, etc.)
├── hooks/          # Custom React hooks (useDataSource, useMobile, useToast)
├── integrations/   # External service integrations (Supabase)
├── lib/            # Utility libraries and services
│   ├── shopify/    # Shopify-specific utilities
│   └── [others]    # Utils, types, config, cart service
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
- **Data Source Adapters**: Abstract data layer supporting both local JSON and Shopify backends

### Routing
Uses React Router v6 with routes for:
- Product pages (`/product/:slug`)
- Category pages (`/men`, `/ladies`, `/kids`, etc.)
- Shop sections (`/shop/fw`, `/shop/ss`)
- Commerce flow (`/cart`, `/checkout`, `/checkout/success`)
- Content pages (`/about`, `/blog`, `/community`)

## Environment Variables

### Required for full functionality:
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase public key
- `VITE_FACEBOOK_PIXEL_ID` - Meta Pixel tracking ID

### Feature Flags:
- `VITE_FEATURE_SHOPIFY` - Enable Shopify backend ('true' to enable, defaults to false)

### Shopify Integration (when feature flag enabled):
- `VITE_SHOPIFY_STORE_DOMAIN` - Your Shopify store domain
- `VITE_SHOPIFY_STOREFRONT_TOKEN` - Shopify Storefront API access token

The app works without these variables but with reduced functionality. When Shopify feature flag is disabled, the app uses local JSON data.

## Data Management

### Data Source Architecture
- **Adapter Pattern**: Uses `IDataSource` interface to abstract data layer
- **LocalJsonDataSource**: Default implementation using local JSON files
- **ShopifyDataSource**: Shopify Storefront API implementation
- **Feature Flag Switching**: Automatically switches between sources via `VITE_FEATURE_SHOPIFY`
- **Singleton Pattern**: Single data source instance managed by `getDataSource()`

### Product Data
- Products stored in JSON files in `src/data/` (when using local source)
- Multiple product files: `products.json`, `products-enhanced.json`, `products-complete.json`
- Product schema includes: id, handle, title, price, images, category, badges, inStock
- Shopify integration fetches live product data when enabled

### Cart Management
- **Local Mode**: In-memory cart state via CartContext
- **Shopify Mode**: Server-side cart management via Shopify Cart API
- **Service Layer**: `cartService.ts` provides unified cart operations

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
- Implement data access through adapter pattern (never directly import data sources)

### Component Patterns
- Functional components with TypeScript
- Custom hooks for complex state logic (see `src/hooks/`)
- Error boundaries for robust error handling
- Context providers for global state
- Form validation with React Hook Form + Zod schemas

### Data Layer Patterns
- Use `getDataSource()` for all data operations
- Implement new backends via `IDataSource` interface
- Feature flags control data source selection
- Cart operations go through `cartService.ts`

### Styling
- Tailwind CSS with custom design tokens
- Brand colors via CSS custom properties
- Mobile-first responsive breakpoints
- shadcn/ui component variants for consistency
- Framer Motion for animations and transitions

## Deployment

The project is configured for deployment on:
- Vercel (with vercel.json configuration)
- Netlify
- Other static hosting providers

Static assets are served correctly with the Vite build process.