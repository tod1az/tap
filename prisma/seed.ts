import { hashPassword } from "@/app/api/auth/[...nextauth]/utils";
import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma-client";

const employeesData: Prisma.employeesCreateInput[] = [

  {
    name: "Ana",
    lastname: "Martínez",
    user: {
      create: { email: 'ana@empresa.com', role: 'user', password: hashPassword('Anamartinez') }
    }
  },
  {
    name: "Pedro",
    lastname: "García",
    user: {
      create: { email: 'pedro@empresa.com', role: 'admin', password: hashPassword('Pedrogarcia') }
    }
  },
  {
    name: "Laura",
    lastname: "Rodríguez",
    user: {
      create: { email: 'laura@empresa.com', role: 'user', password: hashPassword('Laurarodriguez') }
    }
  },
  {
    name: "Diego",
    lastname: "Fernández",
    user: {
      create: { email: 'diego@empresa.com', role: 'user', password: hashPassword('Diegofernandez') }
    }
  },
  {
    name: "Carmen",
    lastname: "Sánchez",
    user: {
      create: { email: 'carmen@empresa.com', role: 'user', password: hashPassword('Carmensanchez') }
    }
  },
  {
    name: "Roberto",
    lastname: "Torres",
    user: {
      create: { email: 'roberto@empresa.com', role: 'admin', password: hashPassword('Robertotorres') }
    }
  },
  {
    name: "Patricia",
    lastname: "Ramírez",
    user: {
      create: { email: 'patricia@empresa.com', role: 'user', password: hashPassword('Patriciaramirez') }
    }
  },
  {
    name: "Miguel",
    lastname: "Vargas",
    user: {
      create: { email: 'miguel@empresa.com', role: 'user', password: hashPassword('Miguelvargas') }
    }
  },
  {
    name: "Elena",
    lastname: "Castro",
    user: {
      create: { email: 'elena@empresa.com', role: 'user', password: hashPassword('Elenacastro') }
    }
  },
  {
    name: "Fernando",
    lastname: "Morales",
    user: {
      create: { email: 'fernando@empresa.com', role: 'user', password: hashPassword('Fernandomorales') }
    }
  },
  {
    name: "Lucía",
    lastname: "Herrera",
    user: {
      create: { email: 'lucia@empresa.com', role: 'admin', password: hashPassword('Luciaherrera') }
    }
  },
  {
    name: "Andrés",
    lastname: "Silva",
    user: {
      create: { email: 'andres@empresa.com', role: 'user', password: hashPassword('Andressilva') }
    }
  },
  {
    name: "Valeria",
    lastname: "Mendoza",
    user: {
      create: { email: 'valeria@empresa.com', role: 'user', password: hashPassword('Valeriamendoza') }
    }
  },
  {
    name: "Javier",
    lastname: "Rojas",
    user: {
      create: { email: 'javier@empresa.com', role: 'user', password: hashPassword('Javierrojas') }
    }
  },
  {
    name: "Sofía",
    lastname: "Ortega",
    user: {
      create: { email: 'sofia@empresa.com', role: 'user', password: hashPassword('Sofiaortega') }
    }
  },
  {
    name: "Alejandro",
    lastname: "Jiménez",
    user: {
      create: { email: 'alejandro@empresa.com', role: 'user', password: hashPassword('Alejandrojimenez') }
    }
  },
  {
    name: "Isabella",
    lastname: "Cruz",
    user: {
      create: { email: 'isabella@empresa.com', role: 'admin', password: hashPassword('Isabellacruz') }
    }
  },
  {
    name: "Ricardo",
    lastname: "Vega",
    user: {
      create: { email: 'ricardo@empresa.com', role: 'user', password: hashPassword('Ricardovega') }
    }
  },
  {
    name: "Natalia",
    lastname: "Campos",
    user: {
      create: { email: 'natalia@empresa.com', role: 'user', password: hashPassword('Nataliacampos') }
    }
  },
  {
    name: "Sebastián",
    lastname: "Paredes",
    user: {
      create: { email: 'sebastian@empresa.com', role: 'user', password: hashPassword('Sebastianparedes') }
    }
  }
]

const itemsData: Prisma.itemsCreateInput[] = [
  { description: 'Llave inglesa', price: 1250, stock: 40 },
  { description: 'Sierra eléctrica', price: 15999, stock: 15 },
  { description: 'Nivel de burbuja', price: 899, stock: 60 },
  { description: 'Metro de medir', price: 599, stock: 80 },
  { description: 'Alicate universal', price: 1199, stock: 45 },
  { description: 'Pistola de calor', price: 7850, stock: 20 },
  { description: 'Tornillos 1/4"', price: 299, stock: 200 },
  { description: 'Clavos 2"', price: 199, stock: 500 },
  { description: 'Pegamento industrial', price: 450, stock: 75 },
  { description: 'Cinta métrica', price: 750, stock: 35 },
  { description: 'Escuadra de metal', price: 650, stock: 25 },
  { description: 'Gafas de seguridad', price: 399, stock: 90 },
  { description: 'Guantes de trabajo', price: 299, stock: 120 },
  { description: 'Cascos de seguridad', price: 899, stock: 40 },
  { description: 'Escalera plegable', price: 12999, stock: 10 },
  { description: 'Candado de seguridad', price: 799, stock: 30 },
  { description: 'Linterna LED', price: 999, stock: 55 },
  { description: 'Cable eléctrico 12AWG', price: 1599, stock: 100 },
  { description: 'Interruptor simple', price: 350, stock: 150 },
  { description: 'Enchufe doble', price: 450, stock: 85 }
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

