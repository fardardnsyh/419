import PostList from "@/components/posts/PostList"
import { getCurrentUser } from "@/lib/session"
import Link from "next/link"
import { HiArrowLeft } from "react-icons/hi"

const getUser = async (username: string) => {
  try {
    const res = await fetch(`${process.env.BASE_URL}/api/users/${username}`)

    if (!res.ok) {
      throw new Error("Failed to fetch topic")
    }

    return res.json()
  } catch (error) {
    console.log(error)
  }
}

const getUserPosts = async (user_id: string) => {
  try {
    const res = await fetch(
      `${process.env.BASE_URL}/api/posts/byuser/${user_id}`
    )

    if (!res.ok) {
      throw new Error("Failed to fetch topic")
    }

    return res.json()
  } catch (error) {
    console.log(error)
  }
}

export default async function UserPage({ params }: Params) {
  const currentUser = await getCurrentUser()
  const user = await getUser(params.username)
  console.log(user)

  const userPosts = await getUserPosts(user._id)

  return (
    <>
      <Link
        href={"/posts"}
        className="flex items-center gap-4 cursor-pointer mt-12 mb-4"
      >
        <HiArrowLeft size={24} />
        <p className="text-xl">Go back</p>
      </Link>
      <div className="flex flex-col sm:grid grid-cols-12 gap-4 mb-4">
        <div className="flex flex-col items-center col-span-3 border rounded-xl shadow-md h-fit p-2">
          <p className="text-xl font-bold">
            {user.first_name} {user.last_name}
          </p>
          <p>@{user.username}</p>
          <p className="mt-4">{userPosts.length} posts</p>
          {currentUser?.id === user?._id && (
            <Link href={`/user/${user.username}/edit`}>
              <p className="mt-4 font-bold text-white bg-black p-2 rounded-xl mx-2 cursor-pointer w-fit">
                Edit Profile
              </p>
            </Link>
          )}
        </div>
        <div className="col-span-9 border rounded-xl shadow-md h-fit p-2">
          <h2 className="font-semibold text-2xl mb-4">
            {user.first_name}&apos;s Blog Posts
          </h2>
          {userPosts.length ? (
            <PostList posts={userPosts} />
          ) : (
            <div className="flex flex-col gap-4 items-center">
              <p className="text-3xl font-bold">You have no posts!</p>
              <Link
                href="/posts/new"
                className="font-bold text-white bg-black p-2 rounded-xl mx-2 cursor-pointer w-fit"
              >
                Create a Post
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

type Params = {
  params: {
    username: string
  }
}
