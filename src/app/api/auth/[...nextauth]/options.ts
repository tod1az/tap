import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { CustomAuthUser } from "./types";
import { compareHashedPassword } from "./utils";
import { getUserByEmail } from "./auth-queries";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {}
      },
      async authorize(credentials): Promise<CustomAuthUser | null> {

        if (!credentials) throw Error("Missing data")
        if (!credentials.email || !credentials.password) throw Error("Missing data")

        const email = credentials.email
        const password = credentials.password

        const foundUser = await getUserByEmail(email)

        if (!foundUser) throw Error("Not found")

        if (email === foundUser.email && compareHashedPassword(password, foundUser.password)) {
          return {
            id: String(foundUser.id),
            name: foundUser.employees !== null ? foundUser.employees.name : "",
            email,
            role: foundUser.role
          }
        } else {
          throw Error("Not found")
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ user, token }) {
      if (user) {
        if (user.email) {
          const foundUser = await getUserByEmail(user.email)
          token.email = foundUser?.email
          token.name = foundUser?.employees?.name
          token.lastName = foundUser?.employees?.lastname
          token.role = foundUser?.role
          token.id = foundUser?.id
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role as string
        session.user.id = token.id as string
      }
      return session
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  }
  ,
  pages: {

    signOut: "/login",
    error: "/login"
  }
}
