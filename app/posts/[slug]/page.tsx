import { HiArrowLeft } from "react-icons/hi"
import Image from "next/image"
import PostBody from "@/components/posts/PostBody"
import markdownToHtml from "@/lib/markdownToHtml"
import Link from "next/link"

const getPost = async (slug: string) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/posts/${slug}`)

    if (!res.ok) {
      throw new Error("Failed to fetch topic")
    }

    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default async function PostPage({ params }: Params) {
  const post = await getPost(params.slug)
  const content = await markdownToHtml(post.content)
  return (
    <main className="mt-12">
      <Link
        href={"/posts"}
        className="flex items-center gap-4 cursor-pointer mb-4"
      >
        <HiArrowLeft size={24} />
        <p className="text-xl">Go back</p>
      </Link>
      <article>
        <h1 className="text-5xl font-bold mb-4">{post && post.title}</h1>
        {post.user && (
          <Link href={`/user/${post.user.username}`} className="text-xl">
            <p className="text-xl">
              by {post.user.first_name} {post.user.last_name}
            </p>
          </Link>
        )}
        <Image
          className="mt-4"
          src={post.coverImage}
          width={1300}
          height={1}
          alt="Cover image"
        />
        {content && <PostBody content={content} />}
      </article>
    </main>
  )
}

type Params = {
  params: {
    slug: string
  }
}
