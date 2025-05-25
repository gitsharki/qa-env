import { notFound } from "next/navigation"
import { BlogForm } from "../../../../components/blog-form"
import { fetchBlogById } from "../../../../lib/api"

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const blog = await fetchBlogById(params.id)

  if (!blog) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <BlogForm blog={blog} />
    </div>
  )
}
