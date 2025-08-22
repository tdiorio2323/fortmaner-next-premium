import { useState } from 'react';

interface AnnouncementBarProps {
  message: string;
  className?: string;
}

const AnnouncementBar = ({ message, className = '' }: AnnouncementBarProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={`relative bg-brand-white text-brand-black py-2 overflow-hidden ${className}`}>
      <div className="flex animate-marquee whitespace-nowrap">
        <span className="mx-4 text-sm font-medium tracking-wide">
          {message}
        </span>
        <span className="mx-4 text-sm font-medium tracking-wide">
          {message}
        </span>
        <span className="mx-4 text-sm font-medium tracking-wide">
          {message}  
        </span>
        <span className="mx-4 text-sm font-medium tracking-wide">
          {message}
        </span>
      </div>
      
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-brand-black/80 hover:text-brand-black"
      >
        ×
      </button>
    </div>
  );
};

export default AnnouncementBar;