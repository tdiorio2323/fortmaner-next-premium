import ig1 from '@/assets/instagram-post-1.jpg';
import ig2 from '@/assets/instagram-post-2.jpg';
import ig3 from '@/assets/instagram-post-3.jpg';

export default function SocialFeed() {
  const posts = [ig1, ig2, ig3, ig2, ig3, ig1];
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-14 md:py-16">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold">Follow Fort Maner</h2>
        <a href="https://www.instagram.com/_fortmaner/" target="_blank" rel="noreferrer" className="text-sm text-neutral-600 hover:text-black">@_fortmaner</a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {posts.map((src, i) => (
          <a key={i} href="https://www.instagram.com/_fortmaner/" target="_blank" rel="noreferrer" className="block group">
            <img src={src} alt="Fort Maner on Instagram" className="aspect-square w-full object-cover rounded-lg border border-neutral-200/60 group-hover:opacity-90 transition" />
          </a>
        ))}
      </div>
    </section>
  );
}

