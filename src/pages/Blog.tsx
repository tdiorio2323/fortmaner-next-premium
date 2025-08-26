import posts from '@/data/blog.json';
import BlogFeed from '@/components/BlogFeed';

export default function BlogPage() {
  return (
    <div className="w-full py-12">
      <h1 className="text-4xl font-bold mb-6 pl-8">Blog</h1>
      <BlogFeed posts={posts} />
    </div>
  );
}