"use client"
import { Post } from "@/types/types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { BiTrash } from "react-icons/bi"
import { BsThreeDots } from "react-icons/bs"

interface PostOptions {
  post: Post
}

export default function PostOptions({ post }: PostOptions) {
  const router = useRouter()
  const [showDropdown, setShowDropdown] = useState(false)

  async function deletePost(post_id: string) {
    const res = await fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ post_id }),
    })

    if (res.ok) {
      const result = await res.json()
      console.log(result)
      router.push("/posts")
    } else {
      console.error("Failed to create post")
    }
  }

  return (
    <div className="absolute top-0 right-1 cursor-pointer">
      <BsThreeDots
        className="relative"
        onClick={() => setShowDropdown(!showDropdown)}
      />
      {showDropdown === true && (
        <div
          className="absolute top-4 p-2 z-40 left-1/2 transform -translate-x-1/2 bg-gray-100 active:bg-gray-200 rounded-xl border w-44"
          onMouseLeave={() => setShowDropdown(false)}
        >
          <div className="grid place-items-center grid-cols-12">
            <BiTrash className="col-span-1" fill="red" size={24} />
            <p
              className="text-center col-span-11 font-bold"
              onClick={() => deletePost(post._id)}
            >
              Delete Post
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
