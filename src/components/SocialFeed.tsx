import { useEffect } from 'react';
import ig1 from '@/assets/instagram-post-1.jpg';
import ig2 from '@/assets/instagram-post-2.jpg';
import ig3 from '@/assets/instagram-post-3.jpg';

// Optional: add specific Instagram post URLs to embed without using an API.
// Example format: 'https://www.instagram.com/p/POST_ID/'
const postUrls: string[] = [];

export default function SocialFeed() {
  // Load Instagram embed script when we have post URLs
  useEffect(() => {
    if (postUrls.length === 0 || typeof window === 'undefined') return;
    const scriptId = 'ig-embed-script';
    const existing = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!existing) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.instagram.com/embed.js';
      s.id = scriptId;
      document.body.appendChild(s);
      s.onload = () => (window as any).instgrm?.Embeds?.process();
    } else {
      (window as any).instgrm?.Embeds?.process?.();
    }
  }, []);

  // Fallback static grid (no API) using local images
  const fallback = [ig1, ig2, ig3, ig2, ig3, ig1];

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14 md:py-16">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Follow Fort Maner</h2>
        <a href="https://www.instagram.com/_fortmaner/" target="_blank" rel="noreferrer" className="text-sm text-neutral-600 hover:text-black">@_fortmaner</a>
      </div>

      {postUrls.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {postUrls.map((url) => (
            <blockquote
              key={url}
              className="instagram-media"
              data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
              data-instgrm-version="14"
              style={{ background: '#fff', border: 0, borderRadius: 12, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', padding: 0 }}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {fallback.map((src, i) => (
            <a key={i} href="https://www.instagram.com/_fortmaner/" target="_blank" rel="noreferrer" className="block group">
              <img src={src} alt="Fort Maner on Instagram" className="aspect-square w-full object-cover rounded-lg border border-neutral-200/60 group-hover:opacity-90 transition" />
            </a>
          ))}
        </div>
      )}
    </section>
  );
}
