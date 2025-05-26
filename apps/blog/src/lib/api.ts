import type { Blog } from "./types"

// Update the default API URL to match typical NestJS port
const API_URL = process.env.API_URL || "http://localhost:4010/api"

export async function fetchBlogs(query = {}): Promise<Blog[]> {
  try {
    const queryString = new URLSearchParams(query as Record<string, string>).toString()
    const url = `${API_URL}/blogs${queryString ? `?${queryString}` : ""}`

    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      console.error(`Failed to fetch blogs: ${response.status} ${response.statusText}`)
      return []
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching blogs:", error)
    // Return empty array instead of throwing to prevent page crash
    return []
  }
}

export async function fetchBlogById(id: string): Promise<Blog | null> {
  try {
    const response = await fetch(`${API_URL}/blogs/${id}`, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      console.error(`Failed to fetch blog: ${response.status} ${response.statusText}`)
      return null
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching blog:", error)
    return null
  }
}

export async function createBlog(blogData: any): Promise<Blog> {

  const response = await fetch(`${API_URL}/blogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to create blog: ${response.status} ${errorText}`)
  }

  return response.json()
}

export async function updateBlog(id: string, blogData: any): Promise<Blog> {
  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to update blog: ${response.status} ${errorText}`)
  }

  return response.json()
}

export async function deleteBlog(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/blogs/${id}`, {
    method: "DELETE",
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Failed to delete blog: ${response.status} ${errorText}`)
  }
}

export async function incrementBlogViewCount(id: string): Promise<void> {
  try {
    await fetch(`${API_URL}/blogs/${id}/view`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    })
  } catch (error) {
    // Silently fail for view count increment
    console.error("Failed to increment view count:", error)
  }
}
