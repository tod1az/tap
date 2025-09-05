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

        if (!credentials) return null
        if (!credentials.email || !credentials.password) return null

        const email = credentials.email
        const password = credentials.password

        const foundUser = await getUserByEmail(email)

        if (!foundUser) return null

        if (email === foundUser.email && compareHashedPassword(password, foundUser.password)) {
          return {
            id: String(foundUser.id),
            name: foundUser.employees !== null ? foundUser.employees.name : "",
            email
          }
        } else {
          throw Error("Not found")
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  }
  ,
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/"
  }
}
