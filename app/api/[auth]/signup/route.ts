import User from "@/models/User"
import { NextResponse } from "next/server"
import { hash } from "bcryptjs"

export const POST = async (req: Request) => {
  try {
    const { username, password, first_name, last_name } = await req.json()

    const hashedPassword = await hash(password.trim(), 10)

    await User.create({
      username: username.trim(),
      first_name:
        first_name.trim().charAt(0).toUpperCase() +
        first_name.trim().slice(1).toLowerCase(),
      last_name:
        last_name.trim().charAt(0).toUpperCase() +
        last_name.trim().slice(1).toLowerCase(),
      password: hashedPassword,
    })

    return NextResponse.json({ message: "User Created" }, { status: 200 })
  } catch (error) {
    console.error("Error creating user: ", error)
    return NextResponse.json({ message: "User failed" }, { status: 500 })
  }
}
