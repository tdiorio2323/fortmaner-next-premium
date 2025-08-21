import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingBag, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  handle: string;
  title: string;
  brand: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  badges?: string[];
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discount = product.compareAtPrice 
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0;

  return (
    <Card className="group relative overflow-hidden border-stone-medium/20 bg-card hover:bg-card-dark transition-all duration-300 luxury-glow">
      <div className="aspect-square relative overflow-hidden">
        {/* Product Image */}
        <Link to={`/product/${product.handle}`}>
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        
        {/* Badges */}
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
        
        {/* Discount Badge */}
        {discount > 0 && (
          <Badge className="absolute top-3 right-3 bg-brand-red text-brand-white">
            -{discount}%
          </Badge>
        )}
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 bg-brand-white/90 hover:bg-brand-white text-brand-black"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Quick Add - Shows on hover */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="sm" 
            className="w-full bg-brand-black/90 text-brand-white hover:bg-brand-black border border-brand-white/20"
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4 space-y-2">
        {/* Brand */}
        <p className="text-sm text-muted-foreground font-medium">{product.brand}</p>
        
        {/* Title */}
        <Link to={`/product/${product.handle}`}>
          <h3 className="font-semibold text-base hover:text-brand-red transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="font-bold text-lg">${product.price}</span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.compareAtPrice}
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