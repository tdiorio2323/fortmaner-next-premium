import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  href: string;
  image: string;
  description?: string;
}

const CategoryCard = ({ title, href, image, description }: CategoryCardProps) => {
  return (
    <Card className="group relative overflow-hidden h-80 border-stone-medium/20 luxury-glow">
      <div className="absolute inset-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-brand-black/20 to-transparent" />
      </div>
      
      <CardContent className="absolute inset-0 p-6 flex flex-col justify-end">
        <div className="text-brand-white">
          <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-red transition-colors">
            {title}
          </h3>
          {description && (
            <p className="text-brand-white/80 mb-4 text-sm">
              {description}
            </p>
          )}
          <Link to={href}>
            <Button 
              variant="outline" 
              className="border-brand-white text-brand-white hover:bg-brand-white hover:text-brand-black group-hover:translate-x-1 transition-all"
            >
              Shop {title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;