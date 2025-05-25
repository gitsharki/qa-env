import Link from "next/link"
import { BlogList } from "../components/blog-list"
import { fetchBlogs } from "../lib/api"

export default async function Home() {
  const blogs = await fetchBlogs()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Link href="/admin/create" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Create New Post
        </Link>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-xl text-gray-600 mb-4">No blog posts found</h2>
          <p className="text-gray-500 mb-6">
            {process.env.NODE_ENV === "development"
              ? "Make sure your NestJS backend is running on the correct port."
              : "Check back later for new posts!"}
          </p>
          <Link href="/admin/create" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            Create Your First Post
          </Link>
        </div>
      ) : (
        <BlogList blogs={blogs} />
      )}
    </main>
  )
}
