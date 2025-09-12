import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"

export async function checkAdmin() {
  const session = await auth()
  if (session?.user?.role != "admin") throw Error("No autorizado")
  return session
}

export async function auth() {
  return await getServerSession(authOptions)
}
