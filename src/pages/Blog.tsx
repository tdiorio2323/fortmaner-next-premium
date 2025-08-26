import posts from '@/data/blog.json';
import BlogFeed from '@/components/BlogFeed';

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <BlogFeed posts={posts} />
    </div>
  );
}