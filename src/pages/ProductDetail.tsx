import { useEffect, useState, type KeyboardEvent } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Plus, Minus, Heart, Share2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Product, ProductVariant } from '@/lib/types';
import { trackViewContent } from '@/components/MetaPixel';
import { useToast } from '@/hooks/use-toast';
import { fetchProductByHandle, fetchProducts } from '@/lib/catalog';
import { addToCart as addToCartService } from '@/lib/cartService';
import { formatCurrency } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
// NOTE: non-invasive: use existing local JSON by default; switches when feature flag is true

const ProductDetailSkeleton = () => (
  <div className="min-h-screen py-16">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 animate-pulse">
        <div className="space-y-4">
          <div className="aspect-square rounded-lg bg-muted" />
          <div className="flex space-x-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-20 w-20 rounded-lg bg-muted" />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-8 w-2/3 rounded bg-muted" />
          <div className="h-4 w-1/3 rounded bg-muted" />
          <div className="h-6 w-1/4 rounded bg-muted" />
          <div className="h-12 w-full rounded bg-muted" />
          <div className="h-12 w-full rounded bg-muted" />
          <div className="space-y-2">
            <div className="h-10 w-full rounded bg-muted" />
            <div className="h-10 w-full rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedVariantId, setSelectedVariantId] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!slug) return;

    let alive = true;
    setIsLoadingProduct(true);
    setProduct(null);

    const hydrate = async () => {
      try {
        const matched = await fetchProductByHandle(slug);
        if (alive && matched) {
          setProduct(matched);
          setSelectedImage(0);

          if (matched.variants.length) {
            const firstAvailable = matched.variants.find((variant) => variant.stock > 0) ?? matched.variants[0];
            setSelectedVariantId(firstAvailable.id);
            setSelectedSize(firstAvailable.size ?? 'OS');
          } else {
            setSelectedVariantId('');
            setSelectedSize('OS');
          }

          document.title = `${matched.title} - Fort Maner`;

          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', `${matched.title} - Premium streetwear from Fort Maner. $${matched.price}`);
          }

          trackViewContent(matched.id, 'product', matched.price);
          setIsLoadingProduct(false);
          return;
        }
      } catch (error) {
        console.error('Primary product lookup failed', error);
      }

      try {
        const catalog = await fetchProducts();
        if (!alive) return;
        const fallbackProduct = catalog.find((item) => item.slug === slug || item.handle === slug);
        if (fallbackProduct) {
          setProduct(fallbackProduct);
          setSelectedImage(0);

          if (fallbackProduct.variants.length) {
            const firstAvailable = fallbackProduct.variants.find((variant) => variant.stock > 0) ?? fallbackProduct.variants[0];
            setSelectedVariantId(firstAvailable.id);
            setSelectedSize(firstAvailable.size ?? 'OS');
          } else {
            setSelectedVariantId('');
            setSelectedSize('OS');
          }

          document.title = `${fallbackProduct.title} - Fort Maner`;

          const metaDescription = document.querySelector('meta[name="description"]');
          if (metaDescription) {
            metaDescription.setAttribute('content', `${fallbackProduct.title} - Premium streetwear from Fort Maner. $${fallbackProduct.price}`);
          }

          trackViewContent(fallbackProduct.id, 'product', fallbackProduct.price);
          setIsLoadingProduct(false);
          return;
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Fallback product lookup failed', error);
      }

      setIsLoadingProduct(false);
    };

    hydrate();

    return () => {
      alive = false;
    };
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;

    const variants = product.variants ?? [];
    const activeVariant = variants.find((variant) => variant.id === selectedVariantId);

    try {
      if (activeVariant) {
        await addToCartService(product.id, activeVariant.id, quantity);
        toast({
          title: "Added to cart",
          description: `${product.title} (${activeVariant.size ?? 'OS'}) has been added to your cart.`,
        });
      } else {
        // Fallback to existing cart system
        const variant: ProductVariant = {
          id: `${product.id}-default`,
          sku: product.id.toUpperCase(),
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

  const handleGalleryKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!product?.images.length) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      setSelectedImage((prev) => Math.min(prev + 1, product.images.length - 1));
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setSelectedImage((prev) => Math.max(prev - 1, 0));
    }
  };

  if (isLoadingProduct) {
    return <ProductDetailSkeleton />;
  }

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

  const variants = product.variants ?? [];
  const activeVariant = variants.find((variant) => variant.id === selectedVariantId);
  const isInStock = product.inStock || variants.some((variant) => variant.stock > 0);
  const currentPrice = product.price;
  const comparePrice = product.compareAtPrice;

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <Breadcrumb className="mb-6 text-sm text-muted-foreground">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/shop-all">Shop All</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div
              className="aspect-square overflow-hidden rounded-lg bg-stone-light/5"
              role="group"
              tabIndex={0}
              aria-label="Product gallery"
              onKeyDown={handleGalleryKeyDown}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    aria-pressed={selectedImage === index}
                    aria-label={`${product.title} image ${index + 1}`}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? 'border-brand-black' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} alternate ${index + 1}`}
                      loading="lazy"
                      decoding="async"
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
                <span className="text-2xl font-bold">{formatCurrency(currentPrice)}</span>
                {comparePrice && comparePrice > currentPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatCurrency(comparePrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Size Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Size</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <Button
                        key={variant.id}
                        variant={selectedVariantId === variant.id ? "default" : "outline"}
                        size="sm"
                        disabled={variant.stock <= 0}
                        onClick={() => {
                          setSelectedVariantId(variant.id);
                          setSelectedSize(variant.size ?? 'OS');
                        }}
                        className="min-w-[44px]"
                      >
                        {variant.size}
                        {variant.stock > 0 && variant.stock <= 5 && (
                          <span className="ml-1 text-xs">({variant.stock})</span>
                        )}
                      </Button>
                    ))}
                  </div>
                  {selectedVariantId && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {(() => {
                        const variant = product.variants.find((v) => v.id === selectedVariantId);
                        if (!variant) return '';
                        if (variant.stock <= 0) return 'Out of stock';
                        if (variant.stock <= 5) return `Only ${variant.stock} left`;
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
                disabled={!isInStock || (variants.length > 0 && (!activeVariant || activeVariant.stock <= 0))}
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
