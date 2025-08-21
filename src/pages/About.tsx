import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'About Us - Fort Maner | Luxury Streetwear Brand';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Learn about Fort Maner\'s journey in luxury streetwear. Uniting sophistication with street style since our Chicago beginnings.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">About Fort Maner</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Uniting the sophistication of high art and eclectic street style to introduce a new, refined aesthetic to the streets.
            </p>
          </div>

          {/* Story */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Born in the heart of Chicago, Fort Maner emerged from a vision to bridge the gap between luxury fashion and authentic street culture. Our founders recognized that the modern urbanite demanded more than just clothing—they needed pieces that spoke to their sophisticated taste while honoring their street roots.
                </p>
                <p>
                  Every Fort Maner piece is meticulously crafted to embody this philosophy. From our signature mountain logo that represents the peaks we aim to reach, to the premium materials we source, we never compromise on quality or authenticity.
                </p>
                <p>
                  Today, Fort Maner stands as a testament to what happens when passion meets precision, when street meets sophistication, and when local craftsmanship meets global vision.
                </p>
              </div>
            </div>
            <div className="stone-texture rounded-lg h-96 flex items-center justify-center">
              <div className="text-center text-brand-white">
                <h3 className="text-2xl font-bold mb-2">Chicago Born</h3>
                <p className="text-brand-white/80">Since 2019</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6">
              <h3 className="text-xl font-bold mb-4">Premium Quality</h3>
              <p className="text-muted-foreground">
                Every piece is crafted with the finest materials and attention to detail that luxury demands.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-bold mb-4">Street Authentic</h3>
              <p className="text-muted-foreground">
                Rooted in genuine street culture, our designs speak to the urban experience with authenticity.
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-bold mb-4">Chicago Proud</h3>
              <p className="text-muted-foreground">
                Proudly designed and curated in Chicago, bringing Midwest values to global streetwear.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;