import Post from "@/models/Post"
import { NextResponse } from "next/server"

export async function GET(req: Request, { params }: Params) {
  const { slug } = params

  const post = await Post.findOne({ slug: slug }).populate("user")

  return NextResponse.json(post, { status: 200 })
}

type Params = {
  params: {
    slug: string
  }
}
