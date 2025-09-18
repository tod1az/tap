import { OFFSET, PER_PAGE } from "../consts";
import prisma from "../prisma-client";
import { CreateAssignsParameters } from "../types";
import { FilterStatusArgs, statusFilter } from "./assigns-filter-model";


export function createAssigment(data: CreateAssignsParameters) {
  const { title, description, dueDate, userId } = data
  return prisma.assigns.create({
    data: {
      title,
      description,
      due_date: new Date(dueDate),
      user_id: userId
    }
  })
}

<<<<<<< HEAD


export function getAssings(q: string, page: string, status?: StatusKey) {
  const now = Date.now()
  return prisma.assigns.findMany({
=======
export function getAssings(q: string, page: string, status: FilterStatusArgs) {
  const currentStatus: FilterStatusArgs = status ?? undefined
  const query = q ?? ""
  return assings.findMany({
>>>>>>> refs/remotes/origin/main
    where: {
      OR: [
        {
          title: {
            contains: q,
            mode: "insensitive"
          }
        },
<<<<<<< HEAD
        {
          description: {
            contains: q,
            mode: "insensitive"
          }
        },
        {
          user: {
            employee: {
              name: {
                contains: q,
                mode: "insensitive"
              }
            }
          }
        },
        {
          user: {
            employee: {
              lastname: {
                contains: q,
                mode: "insensitive"
              }
            }
          }
        },

=======
        statusFilter(currentStatus)
>>>>>>> refs/remotes/origin/main
      ]
    },
    select: {
      id: true,
      title: true,
      description: true,
      due_date: true,
      status: true,
      user: {
        select: {
          employee: {
            select: {
              name: true,
              lastname: true
            }
          }
        }
      }
    },
    skip: OFFSET(page),
    take: PER_PAGE
  })
}
