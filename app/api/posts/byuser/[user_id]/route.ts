import Post from "@/models/Post"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: Params) {
  const { user_id } = params

  const post = await Post.find({ user: user_id }).populate("user")
  return NextResponse.json(post, { status: 200 })
}

type Params = {
  params: {
    user_id: string
  }
}
