import posts from '@/data/blog.json';
import BlogFeed from '@/components/BlogFeed';

export default function BlogPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground mt-2">Community stories and looks from Fort Maner.</p>
        </header>
        <BlogFeed posts={posts} />
      </div>
    </div>
  );
}