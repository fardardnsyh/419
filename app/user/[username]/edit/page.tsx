import { getCurrentUser } from "@/lib/session"
import { redirect } from "next/navigation"

import EditProfileForm from "@/components/forms/EditProfileForm"
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

export default async function EditUserPage({ params }: Params) {
  const currentUser = await getCurrentUser()
  const user = await getUser(params.username)

  if (currentUser?.id !== user?._id) {
    redirect("/")
  }

  return (
    <>
      <Link
        href={`/user/${user.username}`}
        className="flex items-center gap-4 cursor-pointer mt-12 mb-4"
      >
        <HiArrowLeft size={24} />
        <p className="text-xl">Go back</p>
      </Link>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <EditProfileForm user={user} />
      </div>
    </>
  )
}

type Params = {
  params: {
    username: string
  }
}
