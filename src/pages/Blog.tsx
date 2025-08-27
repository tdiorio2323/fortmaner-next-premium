import posts from '@/data/blog.json';
import BlogFeed from '@/components/BlogFeed';

export default function BlogPage() {
  // Add 'href' property to each post
  const postsWithHref = posts.map(post => ({
    ...post,
    href: `/blog/${post.id}`,
  }));

  return (
    <div className="w-full">
      {/* Blog hero */}
      <section className="relative w-full h-64 md:h-96 overflow-hidden">
        <img src="/blog-hero.jpg" alt="Fort Maner Blog" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <h1 className="text-white font-bold text-5xl md:text-8xl tracking-tight">Blog</h1>
        </div>
      </section>

      <div className="py-10">
        <BlogFeed posts={postsWithHref} />
      </div>
    </div>
  );
}
