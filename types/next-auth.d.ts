import NextAuth, { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      username: string
      first_name: string
      last_name: string
    } & DefaultSession["user"]
  }

  interface User extends DefaultUser {
    id: string
    username: string
    first_name: string
    last_name: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string
    username: string
    first_name: string
    last_name: string
  }
}
