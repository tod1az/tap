import prisma from "@/lib/prisma-client";

export async function getUserByEmail(email: string) {
  return prisma.users.findUnique({
    where: {
      email: email
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
      employee: {
        select: {
          name: true,
          lastname: true
        }
      }
    }
  })
}
