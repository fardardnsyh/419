import PostList from "@/components/posts/PostList"
import HeroPost from "@/components/posts/HeroPost"
import Link from "next/link"

const getPosts = async () => {
  const res = await fetch(`${process.env.BASE_URL}/api/posts`, {
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error("Failed to fetch topic")
  }

  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()

  return (
    <main className="flex min-h-screen flex-col mt-6 p-2 sm:p-4">
      <Link
        href={"/posts/new"}
        className="bg-gray-100 font-bold cursor-pointer w-fit mb-4"
      >
        <p className="text-right p-2 rounded-xl">Create Post</p>
      </Link>
      {posts && (
        <>
          {posts && <HeroPost post={posts[0]} />}
          <p className="text-5xl font-bold my-20">More posts</p>
          <section className="grid grid-cols-2 gap-4 mb-12">
            {posts.length > 1 && <PostList posts={posts.slice(1)} />}
          </section>
        </>
      )}
    </main>
  )
}
