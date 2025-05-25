import Link from "next/link"
import Image from "next/image"
import { formatDate } from "../lib/utils"
import type { Blog } from "../lib/types"

export function BlogList({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog) => (
        <div key={blog.id} className="border rounded-lg overflow-hidden shadow-md">
          {blog.featuredImage && (
            <div className="relative h-48">
              <Image src={blog.featuredImage || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
            </div>
          )}

          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">
              <Link href={`/blog/${blog.id}`} className="hover:text-blue-600">
                {blog.title}
              </Link>
            </h2>

            <p className="text-gray-600 text-sm mb-3">{formatDate(blog.publishedAt || blog.createdAt)}</p>

            <p className="text-gray-700 mb-4">{blog.excerpt}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags?.map((tag) => (
                <span key={tag} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>

            <Link href={`/blog/${blog.id}`} className="text-blue-600 hover:text-blue-800 font-medium">
              Read more →
            </Link>
          </div>
        </div>
      ))}
    </div>
  )
}
