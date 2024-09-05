"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

export default function NewPost() {
  const router = useRouter()

  const [title, setTitle] = useState<string | undefined>("")
  const [coverImage, setCoverImage] = useState<File | null>(null)
  const [content, setContent] = useState<string | undefined>("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData()
    if (coverImage) {
      formData.append("coverImage", coverImage)
    }
    formData.set("title", title || "")
    formData.set("content", content || "")

    const res = await fetch(`/api/posts`, {
      method: "POST",
      body: formData,
    })

    if (res.ok) {
      const result = await res.json()
      console.log(result)
      router.refresh()
      router.push("/posts")
    } else {
      console.error("Failed to create post")
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCoverImage(e.target.files[0])
    }
  }

  return (
    <>
      <span onClick={() => router.push("/posts")}>Go back</span>
      <div className="flex flex-col mt-12 border-2 rounded-xl p-4 shadow-lg">
        <form
          className="flex flex-col gap-4 w-full"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="flex flex-col gap-2">
            <label className="text-2xl">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              className="border rounded-lg p-1"
              placeholder="e.g My First Post"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-2xl">Cover Image</label>
            <input
              id="cover-image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border rounded-lg p-1"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-6">
              <label className="text-2xl">Content</label>
              <p>
                Please write your content in <strong>Markdown</strong>. Unsure?
                Read about it{" "}
                <a href="/posts/how-to-write-in-markdown">
                  <strong>here</strong>
                </a>
                !
              </p>
            </div>
            <textarea
              id="content"
              value={content}
              className="border h-[200px] rounded-lg p-1"
              placeholder="Define the content of your post"
              onChange={(e) => setContent(e.target.value)}
              style={{ height: "200px", resize: "none" }}
              required
            />
          </div>
          <button className="bg-blue-500 text-white text-center p-2 font-bold text-2xl w-fit">
            Send
          </button>
        </form>
      </div>
    </>
  )
}
