"use client"
import { useRouter } from "next/navigation"
import { useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { User } from "@/types/types"

interface EditProfileFormProps {
  user: User
}

export default function EditProfileForm({ user }: EditProfileFormProps) {
  const { data: session, update } = useSession()
  const router = useRouter()

  const [username, setUsername] = useState<string | undefined>("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData()
    formData.set("username", username || "")

    const res = await fetch(`/api/users/${user.username}`, {
      method: "PATCH",
      body: formData,
    })

    if (res.ok) {
      const result = await res.json()

      await update({ ...session, username: result.username })

      router.push(`/user/${result.username}`)
    } else {
      console.error("Failed to update user")
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-8 border-2 shadow-lg rounded-xl p-8 w-1/2"
    >
      <p className="text-2xl font-bold my-2">Edit Profile</p>
      <div className="flex flex-col text-left gap-2">
        <label className="text-2xl" htmlFor="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          value={username}
          className="border rounded-lg p-1"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <button className="p-2 bg-black text-white font-bold text-xl w-fit rounded-xl">
        Save
      </button>
    </form>
  )
}
