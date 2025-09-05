import { getServerSession } from "next-auth"
import { Login, LogOut } from "@/components/login-form"
import prisma from "@/lib/prisma-client"


export default async function Home() {
  const session = await getServerSession()
  const users = await prisma.users.findMany()
  console.log(users)

  return (
    <main className="flex flex-col gap-20 items-center mt-20">
      <h1 className="text-3xl">
        Sistema de gestión empresarial
      </h1>
      <Login />
      <p>{`Email: ${session?.user?.email}`}</p>
      <LogOut />
    </main>
  );
}



