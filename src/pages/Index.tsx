import { useEffect } from 'react';
import Hero from '@/components/Hero';
import AnnouncementBar from '@/components/AnnouncementBar';
import FeaturedProducts from '@/components/FeaturedProducts';
import CategoryCard from '@/components/CategoryCard';
import Banner from '@/components/Banner';
import InstagramGrid from '@/components/InstagramGrid';
import promosData from '@/data/promos.json';
import footwearImage from '@/assets/footwear-category.jpg';
import clothingImage from '@/assets/clothing-category.jpg';
import accessoriesImage from '@/assets/accessories-category.jpg';

const Index = () => {
  useEffect(() => {
    // Set page title and meta description
    document.title = 'Fort Maner - Luxury Streetwear | Premium Urban Fashion';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Discover Fort Maner\'s luxury streetwear collection. Premium hoodies, tees, sneakers and accessories that unite sophistication with street style.');
    }
  }, []);

  const categories = [
    {
      title: 'Footwear',
      href: '/footwear',
      image: footwearImage,
      description: 'Premium sneakers and athletic wear'
    },
    {
      title: 'Clothing',
      href: '/clothing', 
      image: clothingImage,
      description: 'Luxury streetwear essentials'
    },
    {
      title: 'Accessories',
      href: '/accessories',
      image: accessoriesImage,
      description: 'Complete your urban look'
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Announcement Bar */}
      <AnnouncementBar message={promosData.shipping.text} />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Featured Products */}
      <FeaturedProducts />
      
      {/* Banner Section */}
      <Banner
        title={promosData.banner.title}
        subtitle={promosData.banner.subtitle}
        cta={promosData.banner.cta}
        onCtaClick={() => {
          // Navigate to shop or specific collection
          window.location.href = '/shop';
        }}
      />
      
      {/* Shop by Category */}
      <section className="py-16 bg-stone-light/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop By Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our curated collections of premium streetwear, from statement footwear to essential accessories.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                href={category.href}
                image={category.image}
                description={category.description}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Instagram Section */}
      <InstagramGrid />
    </div>
  );
};

export default Index;