import Post from "@/models/Post"
import { NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { Readable } from "stream"
import { getCurrentUser } from "@/lib/session"

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

export async function GET() {
  try {
    const posts = await Post.find({})
      .populate("user")
      .sort({ createdAt: -1 })
      .exec()

    return NextResponse.json(posts, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Error", err }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    const formData = await req.formData()
    const data: { [key: string]: string | File } = {}

    formData.forEach((value: FormDataEntryValue, key: string) => {
      data[key] = value
    })

    const title = data.title as string
    const content = data.content as string
    const coverImage = data.coverImage as File

    let user_id = ""

    const user = await getCurrentUser()

    if (user) {
      user_id = user.id
    }

    let imageUrl = ""

    if (coverImage) {
      const buffer = Buffer.from(await coverImage.arrayBuffer())

      const uploadStream = async (buffer: Buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result)
            } else {
              reject(error)
            }
          })

          Readable.from(buffer).pipe(stream)
        })
      }

      const result: any = await uploadStream(buffer)
      imageUrl = result.secure_url
    }

    if (user) {
      await Post.create({
        title: title,
        slug: title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-"),
        excerpt: content.slice(0, 124).trim() + "...",
        content: content,
        coverImage: imageUrl,
        user: user_id,
      })
    } else {
      await Post.create({
        title: title,
        slug: title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-"),
        excerpt: content.slice(0, 124).trim() + "...",
        content: content,
        coverImage: imageUrl,
      })
    }

    return NextResponse.json({ message: "Post Created" }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Post failed" }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { post_id } = await req.json()
    const post = await Post.findByIdAndDelete(post_id)

    return NextResponse.json(post, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: "Error", err }, { status: 500 })
  }
}
