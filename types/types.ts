export interface User {
  _id: string
  username: string
  first_name: string
  last_name: string
  createdAt: string
}

export interface Post {
  _id: string
  title: string
  content: string
  excerpt: string
  coverImage: string
  slug: string
  user?: User
  createdAt: string
}
