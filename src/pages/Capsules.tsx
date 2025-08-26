import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import whiteBrickWall from '@/assets/white-brick-wall.jpg';

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
      name: "S/S '25 Capsule",
      slug: 'skull-head',
      description: "Shop out Spring and Summer 2025 Collection Below",
      image: '/lovable-uploads/ed1df015-08be-4feb-b376-31b0f848b269.png',
      available: true
    },
    {
      name: "Fort Maner Classics",
      slug: 'triangle',
      description: "Click below to shop our entire collection",
      image: '/lovable-uploads/9a433ac6-ed28-4904-aee9-083c80bcd123.png',
      available: true
    },
    {
      name: "Women's Yoga Set",
      slug: 'logo',
      description: 'Premium activewear collection designed for movement and style',
      image: '/lovable-uploads/08eda4a5-b70d-4b5d-97e7-eb010302d354.png',
      available: true
    }
  ];

  return (
    <div className="min-h-screen py-16 relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${whiteBrickWall})` }}
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">SHOP ALL COLLECTIONS</h1>
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