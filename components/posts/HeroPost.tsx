import Image from "next/image"
import Link from "next/link"
import DateFormatter from "../shared/DateFormatter"
import { Post } from "@/types/types"

interface HeroPostProps {
  post: Post
}

export default function HeroPost({ post }: HeroPostProps) {
  return (
    <div className="flex flex-col gap-4">
      <Link href={`/posts/${post.slug}`}>
        <Image
          src={post.coverImage}
          width={1400}
          height={400}
          alt="Cover image"
        />
      </Link>
      <div className="flex flex-col sm:grid grid-cols-2 mt-4 gap-4 sm:gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl sm:text-5xl font-bold break-words">
            {post.title}
          </h1>
          <DateFormatter dateString={post.createdAt} />
          {post.user && (
            <Link
              href={`/user/${post.user.username}`}
              className="flex flex-col"
            >
              <p className="text-2xl">
                by {post.user.first_name} {post.user.last_name}
              </p>
            </Link>
          )}
        </div>
        <h2 className="font-light text-lg sm:text-2xl break-words">
          {post.excerpt}
        </h2>
      </div>
    </div>
  )
}
