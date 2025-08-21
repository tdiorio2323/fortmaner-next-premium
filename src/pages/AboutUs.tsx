import { useEffect } from 'react';
import { MapPin, Clock, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutUs = () => {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'About Us - Fort Maner | Chicago Luxury Streetwear';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Fort Maner\'s story, our Chicago roots, and our commitment to luxury streetwear. Discover what makes our brand unique in urban fashion.');
    }
  }, []);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Fort Maner</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Born in Chicago, Fort Maner represents the intersection of luxury and streetwear. 
            We create premium urban fashion that speaks to the authentic spirit of the city.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Fort Maner was founded with a simple vision: to bridge the gap between luxury fashion 
                and authentic streetwear. Our name draws inspiration from the fortress-like architecture 
                of Chicago and the manor houses that represent timeless elegance.
              </p>
              <p>
                Every piece in our collection is carefully crafted to embody the resilience and 
                sophistication of our hometown. From our signature mountain logo to our premium 
                materials, we ensure that each item tells a story of quality and authenticity.
              </p>
              <p>
                We believe that streetwear should be more than just fashion—it should be a statement 
                of who you are and where you come from. That's why every Fort Maner piece is designed 
                to last, both in style and construction.
              </p>
            </div>
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800"
              alt="Chicago skyline"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Quality First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We use only premium materials and construction techniques to ensure 
                  every piece meets our high standards for durability and comfort.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Authentic Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our designs are inspired by real street culture and urban life, 
                  never following trends but setting them with authentic style.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Community Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We're committed to supporting our local Chicago community and 
                  building connections with streetwear enthusiasts worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-muted/20 rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Visit Our Store</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="h-8 w-8 mb-2 text-accent-red" />
              <h3 className="font-semibold mb-1">Address</h3>
              <p className="text-muted-foreground text-sm">2819 W Harrison</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="h-8 w-8 mb-2 text-accent-red" />
              <h3 className="font-semibold mb-1">Phone</h3>
              <p className="text-muted-foreground text-sm">773-801-0498</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="h-8 w-8 mb-2 text-accent-red" />
              <h3 className="font-semibold mb-1">Email</h3>
              <p className="text-muted-foreground text-sm">fortmanerwes@yahoo.com</p>
            </div>
            <div className="flex flex-col items-center">
              <Clock className="h-8 w-8 mb-2 text-accent-red" />
              <h3 className="font-semibold mb-1">Hours</h3>
              <p className="text-muted-foreground text-sm">Mon-Sat 10AM-8PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;