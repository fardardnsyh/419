import DateFormatter from "../shared/DateFormatter"
import { getCurrentUser } from "@/lib/session"
import PostOptions from "./PostOptions"
import { Post } from "@/types/types"
import Link from "next/link"

interface PostCardProps {
  post: Post
}

export default async function PostCard({ post }: PostCardProps) {
  const currentUser = await getCurrentUser()
  return (
    <div className="relative flex flex-col p-2">
      {post.user && post.user._id === currentUser?.id && (
        <PostOptions post={post} />
      )}
      <div>
        <Link href={`/posts/${post.slug}`}>
          <img src={post.coverImage} className="w-full" />
        </Link>
        <div className="flex flex-col gap-4 mt-4">
          <Link href={`/post/${post.slug}`}>
            <h1 className="text-2xl">{post.title}</h1>
          </Link>
          <DateFormatter dateString={post.createdAt} />

          <p className="break-words">{post.excerpt}</p>
          {post.user && (
            <Link
              href={`/user/${post.user.username}`}
              className="flex flex-col"
            >
              <p>
                by {post.user.first_name} {post.user.last_name}
              </p>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
