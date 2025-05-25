import { notFound } from "next/navigation"
import { fetchBlogById, incrementBlogViewCount } from "../../../lib/api"
import { BlogDetail } from "../../../components/blog-detail"

export default async function BlogPage({ params }: { params: { id: string } }) {
  const blog = await fetchBlogById(params.id)

  if (!blog) {
    notFound()
  }

  // Increment view count (don't await to avoid blocking)
  incrementBlogViewCount(params.id).catch(console.error)

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogDetail blog={blog} />
    </div>
  )
}
