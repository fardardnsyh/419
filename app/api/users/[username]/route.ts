import User from "@/models/User"
import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"

export async function GET(req: Request, { params }: Params) {
  const { username } = params

  const user = await User.findOne({ username: username })
  return NextResponse.json(user, { status: 200 })
}

export async function PATCH(req: any, { params }: Params) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  })

  try {
    const { username } = params

    const formData = await req.formData()
    const data: { [key: string]: string | File } = {}

    formData.forEach((value: FormDataEntryValue, key: string) => {
      data[key] = value
    })

    const newUsername = data.username as string

    const user = await User.findOneAndUpdate(
      { username: username },
      {
        username: newUsername,
      },
      { new: true }
    )

    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    console.log(error)

    return NextResponse.json({ status: 500 })
  }
}

type Params = {
  params: {
    username: string
  }
}
