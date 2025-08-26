import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Heart, Share2 } from 'lucide-react';
import { UGCPost } from '@/lib/types';
import ugcData from '@/data/ugc.json';

const Lookbook = () => {
  const [posts, setPosts] = useState<UGCPost[]>([]);

  useEffect(() => {
    document.title = 'Lookbook - Fort Maner | People Wearing Our Streetwear';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'See how real people style Fort Maner streetwear. User-generated content and street style inspiration from our community.');
    }

    // Load approved UGC posts
    const approvedPosts = ugcData.filter(post => post.approved);
    setPosts(approvedPosts);
  }, []);

  const handleProductClick = (productId: string) => {
    // Navigate to product page
    window.location.href = `/product/${productId}`;
  };

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">People Wearing</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real people, real style. See how our community rocks Fort Maner streetwear 
            in the streets of Chicago and beyond. Tag us @fortmaner for a chance to be featured.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="group overflow-hidden border-stone-medium/20 luxury-glow">
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={post.mediaUrl}
                  alt={`@${post.author} wearing Fort Maner`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay with product links */}
                <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    {post.productIds.map((productId, index) => (
                      <Button
                        key={productId}
                        variant="outline"
                        size="sm"
                        className="bg-brand-white/10 border-brand-white/30 text-brand-white hover:bg-brand-white hover:text-brand-black"
                        onClick={() => handleProductClick(productId)}
                      >
                        Shop This Look
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-sm">@{post.author}</p>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      {post.platform === 'ig' ? 'Instagram' : 'Facebook'}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {post.caption}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold mb-2">Be the First</h3>
            <p className="text-muted-foreground text-lg mb-6">
              Share your Fort Maner look and inspire the community.
            </p>
            <Button variant="black">
              Tag Us @fortmaner
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 text-center p-8 bg-stone-light/5 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">Get Featured</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Share your Fort Maner style on Instagram or Facebook and tag us @fortmaner. 
            The best looks get featured in our lookbook.
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="black">
              Share on Instagram
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline">
              Share on Facebook
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lookbook;