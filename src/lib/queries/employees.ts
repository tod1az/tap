import prisma from "../prisma-client";
import { OFFSET, PER_PAGE } from "../consts";
import { hashPassword } from "@/app/api/auth/[...nextauth]/utils";
import { EmployeeFormData, UpdateEmployeeData } from "../zod-schemas";

export function getEmployees(q: string, page: string) {
  const pageNumber = page ?? "1"
  const query = q ?? ""
  return prisma.employees.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive"
          }
        },
        {
          lastname: {
            contains: query,
            mode: "insensitive"
          }
        }
      ]
    },
    skip: OFFSET(pageNumber),
    take: PER_PAGE,
    select: {
      id: true,
      name: true,
      lastname: true,
      created_at: true,
      user: {
        select: {
          email: true,
          role: true
        }
      }
    },
  })
}

export function getEmployeesCount(q: string) {
  const query = q ?? ""
  return prisma.employees.count({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive"
          }
        },
        {
          lastname: {
            contains: query,
            mode: "insensitive"
          }
        }
      ]
    },
  })
}

export function createEmployee(data: EmployeeFormData) {

  const { name, lastname, email } = data

  const password = hashPassword(`${name}${lastname}`)

  return prisma.employees.create({
    data: {
      name,
      lastname,
      user: {
        create: { email, password }
      }
    },
  })
}


export function updateEmployee(data: UpdateEmployeeData) {
  const { id, name, lastname, email, password, role } = data
  return prisma.employees.update({
    where: {
      id
    },
    data: {
      name,
      lastname,
      user: {
        update: {
          data: {
            email,
            password: password ? hashPassword(password) : undefined,
            role
          }
        }
      }
    }
  })
}

export function deleteEmployee(id: number) {
  return prisma.employees.delete({
    where: {
      id
    }
  })
}


