import { Post } from "@/types/types"
import PostCard from "./PostCard"

interface PostListProps {
  posts: Post[]
}

export default function PostList({ posts }: PostListProps) {
  return (
    <>
      {posts.map((post: any) => (
        <PostCard post={post} key={post._id} />
      ))}
    </>
  )
}
