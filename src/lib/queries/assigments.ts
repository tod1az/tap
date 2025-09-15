import { OFFSET, PER_PAGE, StatusKey } from "../consts";
import prisma from "../prisma-client";
import { CreateAssignsParameters } from "../types";


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



export function getAssings(q: string, page: string, status?: StatusKey) {
  const now = Date.now()
  return prisma.assigns.findMany({
    where: {
      OR: [
        {
          title: {
            contains: q,
            mode: "insensitive"
          }
        },
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

      ]
    },
    skip: OFFSET(page),
    take: PER_PAGE
  })
}
