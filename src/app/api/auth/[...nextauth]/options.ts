import prisma from "@/lib/prisma-client";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt"
import NextAuth, { DefaultSession, User } from 'next-auth';

export interface CustomAuthUser extends User {
  id: string;
  email: string
  name: string
}

declare module 'next-auth' {
  interface Session {
    user?: CustomAuthUser & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: CustomAuthUser;
  }
}

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
        //query db for this user 
        const foundUser = await prisma.users.findUnique({
          where: {
            email: email
          },
          select: {
            id: true,
            email: true,
            password: true,
            employees: {
              select: {
                name: true,
              }
            }
          }
        })
        if (!foundUser) return null

        // TODO: implement hashing a validation for the passwords

        if (email === foundUser.email && password === foundUser.password) {
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
