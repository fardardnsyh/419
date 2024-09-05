import type { NextAuthOptions } from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "@/lib/db"
import { MongoClient } from "mongodb"
import { compare } from "bcryptjs"

async function connectToDatabase() {
  if (process.env.MONGODB_URI) {
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    console.log("connected!!")
    return client
  } else {
    console.log("failed to connect")
    return null
  }
}

export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username:",
          type: "username",
          placeholder: "your-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const client = await connectToDatabase()

        const usersCollection = client?.db().collection("users")

        const user = await usersCollection?.findOne({
          username: credentials?.username,
        })

        if (!user) {
          return null
        }

        const passwordCorrect = await compare(
          credentials?.password || "",
          user.password
        )

        if (!passwordCorrect) {
          return null
        }

        return {
          id: user._id.toString(),
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
        session.user.username = token.username as string
        session.user.first_name = token.first_name as string
        session.user.last_name = token.last_name as string
      }
      return session
    },
    async jwt({ token, trigger, user, session }) {
      if (trigger === "update" && session?.username) {
        token.username = session.username
      }

      if (user) {
        token.sub = user.id
        token.username = user.username
        token.first_name = user.first_name
        token.last_name = user.last_name
      }
      return token
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
