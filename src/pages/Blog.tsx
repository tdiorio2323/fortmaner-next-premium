import { useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';

const Blog = () => {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Blog - Fort Maner | Streetwear Culture & Style';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Read the latest from Fort Maner on streetwear culture, style inspiration, and brand updates. Stay connected with the urban fashion community.');
    }
  }, []);

  const blogPosts = [
    {
      id: 1,
      title: "The Evolution of Chicago Streetwear",
      excerpt: "Exploring how Chicago's urban culture has shaped the streetwear scene and influenced Fort Maner's design philosophy.",
      date: "2024-01-15",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      category: "Culture"
    },
    {
      id: 2,
      title: "Styling Your Fort Maner Hoodie",
      excerpt: "5 ways to style your favorite Fort Maner hoodie for different occasions, from casual to elevated streetwear looks.",
      date: "2024-01-10",
      image: "https://images.unsplash.com/photo-1520975922284-9e0ce9b1b4a0?w=800",
      category: "Style"
    },
    {
      id: 3,
      title: "Behind the Scenes: Our Design Process",
      excerpt: "Take a look behind the curtain at how we create each piece in the Fort Maner collection, from concept to creation.",
      date: "2024-01-05",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7f09?w=800",
      category: "Brand"
    }
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Stay up to date with the latest from Fort Maner. Discover streetwear culture, 
            style inspiration, and behind-the-scenes stories from our Chicago headquarters.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <Card key={post.id} className="group hover:shadow-lg transition-shadow duration-300">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <span className="text-accent-red">{post.category}</span>
                </div>
                <h2 className="text-xl font-bold group-hover:text-accent-red transition-colors">
                  {post.title}
                </h2>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <Button variant="outline" className="group-hover:bg-accent-red group-hover:text-white group-hover:border-accent-red transition-colors">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="text-center mt-16 p-8 bg-muted/20 rounded-lg">
          <h3 className="text-2xl font-bold mb-4">More Stories Coming Soon</h3>
          <p className="text-muted-foreground">
            We're working on bringing you more content about streetwear culture, 
            style tips, and Fort Maner updates. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;