import mongoose, { Schema } from "mongoose"
import User from "./User"

mongoose.connect(process.env.MONGODB_URI as string, {
  serverSelectionTimeoutMS: 5000, // 5 seconds
  socketTimeoutMS: 45000, // 45 seconds
})
mongoose.Promise = global.Promise

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: User,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)

export default Post
