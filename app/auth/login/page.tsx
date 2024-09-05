"use client"

import { signIn } from "next-auth/react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import { useState } from "react"

export default function LoginPage() {
  const { data: session, status } = useSession()
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  if (status === "loading") {
    return <div>Loading...</div>
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = await signIn("credentials", {
      username,
      password,
      callbackUrl: `${window.location.origin}/posts`,
    })

    if (result?.error) {
      console.error("Sign in failed:", result.error)
    } else {
      console.log("Sign in successful:", result)
    }
  }

  if (!session) {
    return (
      <div className="flex justify-center items-center h-full w-full mt-12">
        <form
          className="flex flex-col items-center gap-8 border-2 shadow-lg rounded-xl p-8 sm:w-1/2"
          onSubmit={handleSubmit}
        >
          <p className="text-5xl font-bold my-2">Login</p>
          <div className="flex flex-col text-left gap-2">
            <label className="text-2xl" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              className="border p-1 rounded-xl text-xl"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </div>
          <div className="flex flex-col text-left gap-2">
            <label className="text-2xl" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              className="border p-1 rounded-xl text-xl"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <p>
            Not got an account?{" "}
            <strong>
              <Link href="/auth/signup">Sign Up</Link>
            </strong>
          </p>
          <button className="p-2 bg-black text-white font-bold text-xl w-fit rounded-xl">
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>You are already signed in</h2>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  )
}
