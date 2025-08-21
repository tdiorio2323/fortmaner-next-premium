import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface BannerProps {
  title: string;
  subtitle: string;
  cta: string;
  image?: string;
  onCtaClick?: () => void;
}

const Banner = ({ title, subtitle, cta, image, onCtaClick }: BannerProps) => {
  return (
    <section 
      className="relative py-20 stone-texture overflow-hidden"
      style={image ? {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/80 via-brand-black/60 to-brand-black/80" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-6xl font-bold text-brand-white mb-4 tracking-wide">
          {title}
        </h2>
        <p className="text-xl md:text-2xl text-brand-white/90 mb-8 font-light">
          {subtitle}
        </p>
        <Button 
          size="lg"
          variant="black"
          onClick={onCtaClick}
          className="font-semibold px-8 py-4 text-lg luxury-glow group"
        >
          {cta}
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </section>
  );
};

export default Banner;