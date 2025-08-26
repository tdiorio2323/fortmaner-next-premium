import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CreditCard, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { trackInitiateCheckout } from '@/components/MetaPixel';
import { useToast } from '@/hooks/use-toast';

const Checkout = () => {
  const { state } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    document.title = 'Checkout - Fort Maner';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Complete your Fort Maner streetwear purchase with secure checkout.');
    }

    // Track Meta Pixel InitiateCheckout
    if (state.items.length > 0) {
      trackInitiateCheckout(
        state.total,
        'USD',
        state.items.map(item => item.productId)
      );
    }
  }, [state]);

  const handleStripeCheckout = async () => {
    setIsLoading(true);
    
    try {
      // Here you would integrate with Stripe Checkout
      // For now, we'll simulate the process
      toast({
        title: "Redirecting to payment...",
        description: "You'll be redirected to Stripe Checkout shortly.",
      });
      
      // In a real implementation, you would:
      // 1. Create a Stripe checkout session via API
      // 2. Redirect to Stripe Checkout
      // 3. Handle success/cancel redirects
      
      // Simulated redirect to success page
      setTimeout(() => {
        window.location.href = '/checkout/success?session_id=sim_session_123';
      }, 2000);
      
    } catch (error) {
      console.error('Checkout error:', error);
      toast({
        title: "Checkout failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-8">
              Add some items to your cart before checking out.
            </p>
            <Button variant="black" onClick={() => window.location.href = '/shop/fw'}>
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = state.total;
  const shipping = subtotal >= 100 ? 0 : 9.99;
  const tax = subtotal * 0.08875; // Example tax rate
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.items.map((item) => {
                    const itemPrice = item.variant.price || item.product.price;
                    return (
                      <div key={`${item.productId}-${item.variantId}`} className="flex space-x-4">
                        <div className="w-16 h-16 rounded-lg overflow-hidden bg-stone-light/5">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                          {(item.variant.color !== 'Default' || item.variant.size !== 'One Size') && (
                            <p className="text-sm text-muted-foreground">
                              {item.variant.color} / {item.variant.size}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(itemPrice * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    );
                  })}
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Payment */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-8 border-2 border-dashed border-muted rounded-lg">
                    <CreditCard className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Secure Checkout with Stripe</h3>
                    <p className="text-muted-foreground mb-6">
                      Complete your purchase with our secure payment processor.
                    </p>
                    
                    <Button
                      variant="black"
                      size="lg"
                      className="w-full"
                      onClick={handleStripeCheckout}
                      disabled={isLoading}
                    >
                      {isLoading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
                      <CreditCard className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="text-xs text-muted-foreground text-center">
                    <p>
                      Your payment information is secure and encrypted. 
                      Fort Maner does not store your credit card details.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Security Notice */}
              <Card className="mt-4">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>🔒</span>
                    <span>Secured by Stripe • SSL Encrypted • PCI Compliant</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;