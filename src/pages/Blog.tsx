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
      {/* Blog hero (image only, no overlay text) */}
      <section className="relative w-full h-64 md:h-96 overflow-hidden">
        <img src="/blog-hero.jpg" alt="Fort Maner Blog" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30" aria-hidden />
      </section>

      <div className="py-10 px-6 md:px-10">
        <BlogFeed posts={postsWithHref} />
      </div>

      {/* Full-width feature image below post */}
      <section className="w-full">
        <img
          src="/blog-skateboards.png"
          alt="Fort Maner Skateboards"
          className="w-full h-auto"
        />
      </section>
    </div>
  );
}
