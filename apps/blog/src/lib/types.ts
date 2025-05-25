export interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  featuredImage?: string
  published: boolean
  publishedAt?: string
  tags: string[]
  viewCount: number
  createdAt: string
  updatedAt: string
}
