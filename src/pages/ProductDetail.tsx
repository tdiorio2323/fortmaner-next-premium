import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plus, Minus, Heart, Share2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product, ProductVariant } from '@/lib/types';
import { trackViewContent } from '@/components/MetaPixel';
import { useToast } from '@/hooks/use-toast';
import rawProducts from '@/data/products-complete.json';
import { normalizeProduct } from '@/lib/normalize';
import { getDataSource } from '@/lib/datasource';
import { addToCart as addToCartService } from '@/lib/cartService';
// NOTE: non-invasive: use existing local JSON by default; switches when feature flag is true

const PRODUCTS = (rawProducts as any[]).map(normalizeProduct);

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [adapterProduct, setAdapterProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!slug) return;

    let alive = true;
    const ds = getDataSource();

    // Try adapter first, fallback to existing behavior
    ds.getProductByHandle(slug).then((p) => {
      if (!alive) return;
      if (p) {
        // Store both adapter product and converted product
        setAdapterProduct(p);

        // Convert adapter product to existing Product interface
        const adaptedProduct = {
          id: p.id,
          slug: p.handle,
          handle: p.handle,
          title: p.title,
          description: p.description || '',
          price: p.price || 0,
          images: p.images || [],
          inStock: p.variants?.some(v => v.inStock) || true,
          badges: p.tags || [],
          brand: 'Fort Maner',
        };
        setProduct(adaptedProduct as Product);

        // Set default selections
        if (adaptedProduct.images?.length > 0) setSelectedImage(0);

        // Set default variant selection
        if (p.variants && p.variants.length > 0) {
          const firstAvailable = p.variants.find(v => v.inStock) || p.variants[0];
          setSelectedSize(firstAvailable.size);
          setSelectedVariantId(firstAvailable.id);
        }

        document.title = `${adaptedProduct.title} - Fort Maner`;

        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', `${adaptedProduct.title} - Premium streetwear from Fort Maner. $${adaptedProduct.price}`);
        }

        // Track Meta Pixel ViewContent
        trackViewContent(adaptedProduct.id, 'product', adaptedProduct.price);
      } else {
        // Fallback: existing behavior
        const foundProduct = PRODUCTS.find(p => p.slug === slug || p.handle === slug);
        if (foundProduct) {
          setProduct(foundProduct);

          // Set default selections
          if (foundProduct.images?.length > 0) setSelectedImage(0);

          document.title = `${foundProduct.title} - Fort Maner`;

          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', `${foundProduct.title} - Premium streetwear from Fort Maner. $${foundProduct.price}`);
          }

          // Track Meta Pixel ViewContent
          trackViewContent(foundProduct.id, 'product', foundProduct.price);
        }
      }
    }).catch(console.error);

    return () => { alive = false; };
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      // Use cart service if we have adapter product data
      if (adapterProduct && selectedVariantId) {
        await addToCartService(product.id, selectedVariantId, quantity);
        toast({
          title: "Added to cart",
          description: `${product.title} (${selectedSize}) has been added to your cart.`,
        });
      } else {
        // Fallback to existing cart system
        const variant: ProductVariant = {
          id: `${product.id}-default`,
          sku: product.id.toUpperCase(),
          color: selectedColor || 'Default',
          size: selectedSize || 'One Size',
          stock: 10 // Default stock
        };

        addToCart(product, variant, quantity);

        toast({
          title: "Added to cart",
          description: `${product.title} has been added to your cart.`,
        });
      }
    } catch (error) {
      console.error('Add to cart failed:', error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">The requested product could not be found.</p>
        </div>
      </div>
    );
  }

  const isInStock = product.inStock;
  const currentPrice = product.price;
  const comparePrice = product.compareAtPrice;

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-stone-light/5">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-brand-black' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                {product.badges?.map((badge, index) => (
                  <Badge key={index} variant="secondary">{badge}</Badge>
                ))}
                {!isInStock && <Badge variant="destructive">Out of Stock</Badge>}
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-sm text-muted-foreground mb-4">{product.brand}</p>
              
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-2xl font-bold">${currentPrice}</span>
                {comparePrice && comparePrice > currentPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${comparePrice}
                  </span>
                )}
              </div>
            </div>

            {/* Size Selector */}
            {adapterProduct?.variants && adapterProduct.variants.length > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {adapterProduct.variants.map((variant: any) => (
                      <Button
                        key={variant.id}
                        variant={selectedVariantId === variant.id ? "default" : "outline"}
                        size="sm"
                        disabled={!variant.inStock}
                        onClick={() => {
                          setSelectedVariantId(variant.id);
                          setSelectedSize(variant.size);
                        }}
                        className="min-w-[44px]"
                      >
                        {variant.size}
                        {variant.stockLevel && variant.stockLevel <= 5 && (
                          <span className="ml-1 text-xs">({variant.stockLevel})</span>
                        )}
                      </Button>
                    ))}
                  </div>
                  {selectedVariantId && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {(() => {
                        const variant = adapterProduct.variants.find((v: any) => v.id === selectedVariantId);
                        if (!variant) return '';
                        if (!variant.inStock) return 'Out of stock';
                        if (variant.stockLevel && variant.stockLevel <= 5) return `Only ${variant.stockLevel} left`;
                        return 'In stock';
                      })()}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={quantity >= 10}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-3">
              <Button
                className="w-full"
                size="lg"
                onClick={handleAddToCart}
                disabled={!isInStock}
                variant="default"
              >
                {isInStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="outline" size="lg" className="flex-1">
                  <Heart className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Product Details Accordion */}
            <Accordion type="single" collapsible className="mt-8">
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground">
                    {product.description || 'Premium Fort Maner streetwear crafted with attention to detail and quality materials.'}
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="care">
                <AccordionTrigger>Fabric & Care</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-muted-foreground">
                    <p>• Machine wash cold with like colors</p>
                    <p>• Tumble dry low heat or hang to dry</p>
                    <p>• Do not bleach or iron directly on design</p>
                    <p>• Premium cotton blend construction</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-muted-foreground">
                    <p>• Free shipping on orders over $100</p>
                    <p>• Standard shipping: 5-7 business days</p>
                    <p>• Express shipping: 2-3 business days</p>
                    <p>• 30-day return policy</p>
                    <p>• Items must be unworn with tags attached</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;