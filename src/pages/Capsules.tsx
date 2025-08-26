import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Capsules = () => {
  useEffect(() => {
    document.title = 'Capsule Collections - Fort Maner | Limited Edition Streetwear';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Explore Fort Maner\'s exclusive capsule collections. Limited edition streetwear drops including Jogging Suit, Skull Head, and Triangle collections.');
    }
  }, []);

  const capsules = [
    {
      name: 'Jogging Suit',
      slug: 'jogging-suit',
      description: 'Premium matching sets for the modern streetwear enthusiast',
      image: '/lovable-uploads/28c2b9f0-895f-472a-b2dc-19d51b3c3614.png',
      available: true
    },
    {
      name: 'Skull Head',
      slug: 'skull-head',
      description: 'Bold graphic collection featuring signature skull artwork',
      image: '/images/capsules/skull-head-hero.jpg',
      available: true
    },
    {
      name: 'Triangle',
      slug: 'triangle',
      description: 'Geometric minimalism meets street culture',
      image: '/images/capsules/triangle-hero.jpg',
      available: true
    },
    {
      name: 'Logo',
      slug: 'logo',
      description: 'Classic Fort Maner branding in timeless designs',
      image: '/images/capsules/logo-hero.jpg',
      available: true
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Capsule Collections</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Limited edition drops that define our brand. Each capsule tells a unique story 
            through carefully curated pieces that embody Fort Maner's streetwear aesthetic.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {capsules.map((capsule) => (
            <Card key={capsule.slug} className="group relative overflow-hidden h-80 border-stone-medium/20 luxury-glow">
              <div className="absolute inset-0">
                <img
                  src={capsule.image}
                  alt={capsule.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 via-brand-black/20 to-transparent" />
              </div>
              
              <CardContent className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="text-brand-white">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-red transition-colors">
                    {capsule.name}
                  </h3>
                  <p className="text-brand-white/80 mb-4 text-sm">
                    {capsule.description}
                  </p>
                  {capsule.available ? (
                    <Link to={`/shop/capsules/${capsule.slug}`}>
                      <Button 
                        variant="black"
                        className="group-hover:translate-x-1 transition-all"
                      >
                        Shop Collection
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Button variant="secondary" disabled>
                      Coming Soon
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Capsules;