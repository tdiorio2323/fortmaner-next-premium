import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-stone-bg.jpg';
import FortManerLogo from '@/assets/fort-maner-logo.svg';

const Hero = () => {
  return (
    <section 
      className="relative min-h-[80vh] flex items-center justify-center stone-texture"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-brand-black/40 to-brand-black/60" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="mb-12">
          <img 
            src="/src/assets/fort-maner-logo-main.jpg" 
            alt="Fort Maner" 
            className="h-72 w-auto mx-auto filter brightness-0 invert"
          />
        </div>
        
        {/* CTA */}
        <Button 
          size="lg" 
          className="bg-brand-white text-brand-black hover:bg-brand-white/90 font-semibold px-8 py-4 text-lg luxury-glow group"
        >
          Shop Now
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-brand-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-brand-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;