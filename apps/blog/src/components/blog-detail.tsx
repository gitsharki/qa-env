import Image from "next/image"
import Link from "next/link"
import { formatDate } from "../lib/utils"
import type { Blog } from "../lib/types"

export function BlogDetail({ blog }: { blog: Blog }) {
  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          ← Back to all posts
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

      <div className="flex items-center text-gray-600 mb-6">
        <span>{formatDate(blog.publishedAt || blog.createdAt)}</span>
        <span className="mx-2">•</span>
        <span>{blog.viewCount} views</span>
      </div>

      {blog.featuredImage && (
        <div className="relative h-96 mb-8">
          <Image
            src={blog.featuredImage || "/placeholder.svg"}
            alt={blog.title}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-8">
        {blog.tags?.map((tag) => (
          <span key={tag} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>

      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />

      <div className="mt-8 pt-6 border-t">
        <Link
          href={`/admin/edit/${blog.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-4"
        >
          Edit Post
        </Link>
      </div>
    </article>
  )
}
