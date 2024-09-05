import mongoose, { Schema } from "mongoose"

mongoose.connect(process.env.MONGODB_URI as string)
mongoose.Promise = global.Promise

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
