import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { MetaPixel } from "./components/MetaPixel";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import ShopFW from "./pages/ShopFW";
import ShopSS from "./pages/ShopSS";
import Capsules from "./pages/Capsules";
import CapsuleDetail from "./pages/CapsuleDetail";
import Kids from "./pages/Kids";
import Men from "./pages/Men";
import Ladies from "./pages/Ladies";
import Hats from "./pages/Hats";
import Lookbook from "./pages/Lookbook";
import Community from "./pages/Community";
import About from "./pages/About";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";

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
          <main className="min-h-screen">
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
              <Route path="/about" element={<About />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/checkout/success" element={<CheckoutSuccess />} />
              <Route path="/account" element={<Account />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
