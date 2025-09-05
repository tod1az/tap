import { hashPassword } from "@/app/api/auth/[...nextauth]/utils";
import { Prisma } from "@/generated/prisma";
import prisma from "@/lib/prisma-client";

const employeesData: Prisma.employeesCreateInput[] = [
  {
    name: "Juan",
    lastname: "Perez",
    users: {
      create: [{ email: 'juan@empresa.com', role: 'admin', password: hashPassword('Juanperez') }]
    }
  },
  {
    name: "María",
    lastname: "González",
    users: {
      create: [{ email: 'maria@empresa.com', role: 'user', password: hashPassword('Mariagonzalez'), }]
    }
  },
  {
    name: "Carlos",
    lastname: "López",
    users: {
      create: [{ email: 'carlos@empresa.com', role: 'user', password: hashPassword('Carloslopez'), }]
    }
  },
]

const itemsData: Prisma.itemsCreateInput[] = [
  { description: 'Martillo', price: 1599, stock: 50 },
  { description: 'Destornillador', price: 850, stock: 100 },
  { description: 'Taladro', price: 8999, stock: 25 }
]

export async function main() {
  for (const u of employeesData) {
    await prisma.employees.create({ data: u })
  }
  for (const u of itemsData) {
    await prisma.items.create({ data: u })
  }
}
main()

