import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { state, updateQuantity, removeFromCart } = useCart();

  useEffect(() => {
    document.title = `Cart (${state.itemCount}) - Fort Maner`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Review your Fort Maner streetwear selections and proceed to checkout.');
    }
  }, [state.itemCount]);

  const handleQuantityChange = (productId: string, variantId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId, variantId);
    } else {
      updateQuantity(productId, variantId, newQuantity);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="mb-8">
              <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
              <p className="text-muted-foreground">
                Add some Fort Maner streetwear to get started.
              </p>
            </div>
            
            <Link to="/shop/fw">
              <Button variant="black" size="lg">
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart ({state.itemCount} items)</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {state.items.map((item) => {
                const itemPrice = item.variant.price || item.product.price;
                const itemTotal = itemPrice * item.quantity;
                
                return (
                  <Card key={`${item.productId}-${item.variantId}`}>
                    <CardContent className="p-6">
                      <div className="flex space-x-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-stone-light/5">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-lg">{item.product.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.product.brand}</p>
                              {(item.variant.color !== 'Default' || item.variant.size !== 'One Size') && (
                                <p className="text-sm text-muted-foreground">
                                  {item.variant.color} / {item.variant.size}
                                </p>
                              )}
                            </div>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.productId, item.variantId)}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.productId, item.variantId, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="text-sm font-medium w-8 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleQuantityChange(item.productId, item.variantId, item.quantity + 1)}
                                disabled={item.quantity >= 10}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                            
                            {/* Price */}
                            <div className="text-right">
                              <p className="font-semibold">${itemTotal.toFixed(2)}</p>
                              {item.quantity > 1 && (
                                <p className="text-xs text-muted-foreground">
                                  ${itemPrice.toFixed(2)} each
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${state.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{state.total >= 100 ? 'Free' : '$9.99'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>Calculated at checkout</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${(state.total + (state.total >= 100 ? 0 : 9.99)).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-3">
                    <Link to="/checkout">
                      <Button variant="black" size="lg" className="w-full">
                        Proceed to Checkout
                      </Button>
                    </Link>
                    
                    <Link to="/shop/fw">
                      <Button variant="outline" size="lg" className="w-full">
                        Continue Shopping
                      </Button>
                    </Link>
                  </div>
                  
                  {state.total < 100 && (
                    <div className="mt-4 p-3 bg-muted/30 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">
                        Add ${(100 - state.total).toFixed(2)} more for free shipping
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;