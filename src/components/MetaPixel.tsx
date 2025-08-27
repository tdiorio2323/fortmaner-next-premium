import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface MetaPixelProps {
  pixelId: string;
}

export const MetaPixel: React.FC<MetaPixelProps> = ({ pixelId }) => {
  const location = useLocation();

  // Initialize Meta Pixel
  useEffect(() => {
    if (!pixelId || typeof window === 'undefined') return;

    // Meta Pixel base code
    (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function() {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    (window as any).fbq('init', pixelId);
    (window as any).fbq('track', 'PageView');
  }, [pixelId]);

  // Track page views on route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [location.pathname]);

  return null;
};

// Utility functions for tracking specific events
export const trackPurchase = (value: number, currency = 'USD', contentIds?: string[]) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'Purchase', {
      value,
      currency,
      content_ids: contentIds,
      content_type: 'product'
    });
  }
};

export const trackViewContent = (contentId: string, contentType = 'product', value?: number) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'ViewContent', {
      content_ids: [contentId],
      content_type: contentType,
      value
    });
  }
};

export const trackInitiateCheckout = (value: number, currency = 'USD', contentIds?: string[]) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', 'InitiateCheckout', {
      value,
      currency,
      content_ids: contentIds,
      content_type: 'product'
    });
  }
};