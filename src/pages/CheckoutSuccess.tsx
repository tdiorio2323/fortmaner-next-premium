import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { trackPurchase } from '@/components/MetaPixel';

const CheckoutSuccess = () => {
  const { clearCart } = useCart();
  const [orderTotal, setOrderTotal] = useState<number>(0);
  const [orderNumber, setOrderNumber] = useState<string>('');

  useEffect(() => {
    document.title = 'Order Confirmed - Fort Maner';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Your Fort Maner order has been confirmed. Thank you for your purchase!');
    }

    // Get session details from URL parameters (in real implementation, you'd verify with Stripe)
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');
    
    if (sessionId) {
      // In a real implementation, you would:
      // 1. Verify the session with Stripe
      // 2. Get the actual order total and details
      // 3. Clear the cart only after successful verification
      
      // For simulation, we'll use mock data
      const mockOrderTotal = 159.98;
      const mockOrderNumber = `FM-${Date.now().toString().slice(-6)}`;
      
      setOrderTotal(mockOrderTotal);
      setOrderNumber(mockOrderNumber);
      
      // Track Meta Pixel Purchase event
      trackPurchase(mockOrderTotal, 'USD', ['product-1', 'product-2']);
      
      // Clear the cart
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground text-lg">
              Thank you for your Fort Maner purchase.
            </p>
          </div>

          {/* Order Details */}
          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-xl font-semibold mb-2">Order #{orderNumber}</h2>
                  <p className="text-2xl font-bold">${orderTotal.toFixed(2)}</p>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex items-center justify-center space-x-2 text-muted-foreground">
                    <Package className="h-5 w-5" />
                    <span>Estimated delivery: 5-7 business days</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    You'll receive an email confirmation with tracking information once your order ships.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* What's Next */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">What's Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Card>
                <CardContent className="p-4 text-center">
                  <Package className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <h4 className="font-medium mb-1">Order Processing</h4>
                  <p className="text-sm text-muted-foreground">
                    We'll prepare and ship your order within 1-2 business days.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                  <h4 className="font-medium mb-1">Email Updates</h4>
                  <p className="text-sm text-muted-foreground">
                    Track your order status and delivery updates via email.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/account">
                <Button variant="black" size="lg">
                  View Order Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Link to="/shop/fw">
                <Button variant="outline" size="lg">
                  Continue Shopping
                </Button>
              </Link>
            </div>
            
            <div className="flex justify-center space-x-6 text-sm">
              <Link to="/lookbook" className="text-muted-foreground hover:text-foreground">
                Share Your Look
              </Link>
              <Link to="/community" className="text-muted-foreground hover:text-foreground">
                Join Community
              </Link>
            </div>
          </div>

          {/* Social Share */}
          <div className="mt-12 p-6 bg-muted/30 rounded-lg">
            <h4 className="font-semibold mb-3">Share Your Fort Maner Style</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Tag us @fortmaner in your posts for a chance to be featured in our lookbook!
            </p>
            <div className="flex justify-center space-x-4">
              <Button variant="outline" size="sm">
                Share on Instagram
              </Button>
              <Button variant="outline" size="sm">
                Share on Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;