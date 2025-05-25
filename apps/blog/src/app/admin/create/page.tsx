import { BlogForm } from "../../../components/blog-form"

export default function CreateBlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>
      <BlogForm />
    </div>
  )
}
