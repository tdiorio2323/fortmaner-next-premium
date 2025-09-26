import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { MetaPixel } from "./components/MetaPixel";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import ErrorBoundary from "./components/ErrorBoundary";

// Lazy load non-critical pages for better performance
const ShopFW = lazy(() => import("./pages/ShopFW"));
const ShopSS = lazy(() => import("./pages/ShopSS"));
const Capsules = lazy(() => import("./pages/Capsules"));
const CapsuleDetail = lazy(() => import("./pages/CapsuleDetail"));
const Kids = lazy(() => import("./pages/Kids"));
const Men = lazy(() => import("./pages/Men"));
const Ladies = lazy(() => import("./pages/Ladies"));
const Hats = lazy(() => import("./pages/Hats"));
const Lookbook = lazy(() => import("./pages/Lookbook"));
const Community = lazy(() => import("./pages/Community"));
const Accessories = lazy(() => import("./pages/Accessories"));
const About = lazy(() => import("./pages/About"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const Blog = lazy(() => import("./pages/Blog"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const Account = lazy(() => import("./pages/Account"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Contact = lazy(() => import('./pages/Contact'));
const SizeGuide = lazy(() => import('./pages/SizeGuide'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Returns = lazy(() => import('./pages/Returns'));
const Privacy = lazy(() => import('./pages/Privacy'));

// Loading component for suspense fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <MetaPixel pixelId={import.meta.env.VITE_FACEBOOK_PIXEL_ID || ''} />
          <Header />
          {/* Global fixed background layer (reliable on iOS) */}
          <div
            className="fixed inset-0 -z-10 bg-[url('/brick-bg.jpg')] bg-no-repeat bg-cover bg-center"
            aria-hidden
          />
          <ErrorBoundary>
          <main className="min-h-screen">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/shop/fw" element={<ShopFW />} />
                <Route path="/shop/ss" element={<ShopSS />} />
                <Route path="/shop/capsules" element={<Capsules />} />
                <Route path="/shop/capsules/:capsule" element={<CapsuleDetail />} />
                <Route path="/kids" element={<Kids />} />
                <Route path="/men" element={<Men />} />
                <Route path="/ladies" element={<Ladies />} />
                <Route path="/hats" element={<Hats />} />
                <Route path="/lookbook" element={<Lookbook />} />
                <Route path="/community" element={<Community />} />
                <Route path="/accessories" element={<Accessories />} />
                <Route path="/about" element={<About />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/product/:slug" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout/success" element={<CheckoutSuccess />} />
                <Route path="/account" element={<Account />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/size-guide" element={<SizeGuide />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="/privacy" element={<Privacy />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          </ErrorBoundary>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
