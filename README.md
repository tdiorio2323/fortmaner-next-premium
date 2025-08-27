# Fort Maner - Premium Streetwear

A luxury streetwear e-commerce site built with React, TypeScript, and Tailwind CSS.

## 🏔️ About Fort Maner

Fort Maner unites the sophistication of high art and eclectic street style to introduce a new, refined aesthetic to the streets. Based in Chicago, we craft premium streetwear that speaks to the urban experience with authenticity and luxury.

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Build Tool**: Vite

## 🎨 Design System

The Fort Maner design system is built around luxury streetwear aesthetics:

- **Colors**: Deep blacks, charcoal greys, stone textures, and signature red accents
- **Typography**: Inter font family for modern, clean readability
- **Effects**: Stone textures, luxury shadows, and smooth transitions
- **Components**: Custom shadcn/ui variants with Fort Maner branding

## 🏗️ Project Structure

```
src/
├── assets/           # Images and static assets
├── components/       # Reusable UI components
│   ├── ui/          # shadcn/ui components
│   ├── Header.tsx   # Navigation header
│   ├── Hero.tsx     # Homepage hero section
│   ├── ProductCard.tsx
│   └── ...
├── data/            # JSON data files
│   ├── products.json
│   ├── collections.json
│   └── promos.json
├── pages/           # Route components
└── styles/          # CSS and design tokens
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm (lockfile included)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd fort-maner
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:8080](http://localhost:8080) in your browser.

### Environment

Copy `.env.example` to `.env` and set values as needed:

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
VITE_FACEBOOK_PIXEL_ID
```

Supabase keys are only required if using Supabase-powered features; the app still runs without them.

## 📦 Build & Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 🛍️ Features

### Current Features
- **Responsive Design**: Mobile-first responsive layout
- **Product Catalog**: Dynamic product display with filtering
- **Hero Section**: Stone-textured background with mountain logo
- **Category Navigation**: Footwear, Clothing, Accessories
- **Instagram Integration**: Social media grid display
- **Announcement Bar**: Promotional messaging with marquee animation
- **SEO Optimized**: Meta tags, semantic HTML, and proper heading structure

### Planned Features
- [ ] Product Detail Pages (PDP)
- [ ] Shopping Cart & Checkout
- [ ] Collection Pages with Filters
- [ ] Search Functionality
- [ ] User Accounts
- [ ] Wishlist/Favorites
- [ ] Size Guide
- [ ] Store Locator

## 🎨 Customization

### Design System

The design system is defined in `src/index.css` with CSS custom properties:

```css
:root {
  --brand-black: 210 11% 4%;
  --brand-charcoal: 214 11% 9%;
  --brand-white: 0 0% 100%;
  --brand-red: 348 83% 51%;
  /* ... */
}
```

### Adding Products

Products are defined in `src/data/products.json`. Each product should have:

```json
{
  "id": "unique-id",
  "handle": "url-slug",
  "title": "Product Name",
  "brand": "Fort Maner",
  "price": 100,
  "images": ["@/assets/product-image.jpg"],
  "category": "clothing|footwear|accessories",
  "badges": ["New", "Best Seller"],
  "inStock": true
}
```

### Image Assets

All images should be:
- Imported as ES6 modules from `src/assets/`
- Optimized for web (WebP recommended)
- High resolution for product photography
- Properly sized for their intended use

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔧 Environment Variables

See `ENV_VARS.md` for details and examples. Never commit real secrets.

## 📈 Performance

- **Image Optimization**: All images are optimized and properly sized
- **Code Splitting**: Route-based code splitting with React Router
- **CSS Optimization**: Tailwind CSS with purging for minimal bundle size
- **Font Loading**: Optimized font loading with font-display: swap

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary to Fort Maner. All rights reserved.

## 🏢 Contact

- **Website**: [fortmaner.shop](https://fortmaner.shop)
- **Instagram**: [@_fortmaner](https://instagram.com/_fortmaner)
- **Email**: info@fortmaner.shop

## 🔗 Deployment

This project is optimized for deployment on:
- **Lovable**: Direct deployment from the platform
- **Vercel**: Zero-config deployment with GitHub integration
- **Netlify**: Static site deployment with form handling

### Custom Domain Setup

To connect your custom domain (fortmaner.shop):

1. In your deployment platform, go to domain settings
2. Add your custom domain
3. Update your DNS settings to point to the platform
4. Enable HTTPS/SSL certificate

---

Built with ❤️ in Chicago by the Fort Maner team.
