import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discount = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;
  const imageSrc = product.images?.[0] ?? '/placeholder.svg';

  return (
    <Card className="group relative overflow-hidden border-stone-medium/20 bg-card hover:bg-card-dark transition-all duration-300 luxury-glow">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.slug}`} aria-label={`View ${product.title}`}>
          <AspectRatio ratio={4 / 5} className="overflow-hidden">
            <img
              src={imageSrc}
              alt={product.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </AspectRatio>
        </Link>

        {product.badges && product.badges.length > 0 && (
          <div className="absolute top-3 left-3 space-y-1">
            {product.badges.map((badge) => (
              <Badge
                key={badge}
                variant={badge === 'New' ? 'default' : 'secondary'}
                className={badge === 'New' ? 'bg-brand-red text-brand-white' : ''}
              >
                {badge}
              </Badge>
            ))}
          </div>
        )}

        {discount > 0 && (
          <Badge className="absolute top-3 right-3 bg-brand-red text-brand-white">
            -{discount}%
          </Badge>
        )}

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-brand-white/90 text-brand-black hover:bg-brand-white"
            aria-label="Save for later"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="sm"
            className="w-full border border-brand-white/20 bg-brand-black/90 text-brand-white hover:bg-brand-black"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Quick Add
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-2">
        {/* Brand */}
        <p className="text-sm text-muted-foreground font-medium">{product.brand}</p>
        
        {/* Title */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-base hover:text-brand-red transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg">{formatCurrency(product.price)}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatCurrency(product.compareAtPrice)}
            </span>
          )}
        </div>
        
        {/* Stock Status */}
        {!product.inStock && (
          <p className="text-sm text-brand-red font-medium">Out of Stock</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductCard;
