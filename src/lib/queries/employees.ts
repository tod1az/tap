import prisma from "../prisma-client";
import { OFFSET, PER_PAGE } from "../consts";

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

export function deleteEmployee(id: number) {
  return prisma.employees.delete({
    where: {
      id
    }
  })
}


