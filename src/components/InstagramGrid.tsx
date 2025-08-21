import { Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import instagramPost1 from '@/assets/instagram-post-1.jpg';
import instagramPost2 from '@/assets/instagram-post-2.jpg';
import instagramPost3 from '@/assets/instagram-post-3.jpg';
import mountainHoodie from '@/assets/mountain-hoodie-black.jpg';
import jaguarTee from '@/assets/jaguar-tee-black.jpg';
import stoneRunners from '@/assets/stone-runners-black.jpg';

const InstagramGrid = () => {
  const handle = "_FORTMANER";
  
  const posts = [
    {
      id: "1",
      image: instagramPost1,
      alt: "Fort Maner streetwear styling"
    },
    {
      id: "2", 
      image: instagramPost2,
      alt: "Chicago store front"
    },
    {
      id: "3",
      image: instagramPost3, 
      alt: "Premium sneaker detail"
    },
    {
      id: "4",
      image: mountainHoodie,
      alt: "Mountain hoodie lifestyle"
    },
    {
      id: "5",
      image: jaguarTee,
      alt: "Fort Maner accessories flat lay"
    },
    {
      id: "6",
      image: stoneRunners,
      alt: "Street style inspiration"
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Instagram className="h-8 w-8 mx-auto mb-4 text-brand-black" />
          <h2 className="text-3xl font-bold mb-2">Follow Us On Instagram</h2>
          <p className="text-muted-foreground mb-6">@{handle}</p>
          <Button 
            variant="outline" 
            className="border-brand-black text-brand-black hover:bg-brand-black hover:text-brand-white"
          >
            Follow @{handle}
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {posts.slice(0, 6).map((post) => (
            <div 
              key={post.id}
              className="aspect-square group relative overflow-hidden rounded-lg border border-stone-medium/20 luxury-glow"
            >
              <img
                src={post.image}
                alt={post.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-brand-black/0 group-hover:bg-brand-black/20 transition-colors duration-300 flex items-center justify-center">
                <Instagram className="h-6 w-6 text-brand-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGrid;