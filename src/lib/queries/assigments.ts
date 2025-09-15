import { OFFSET, PER_PAGE, StatusKey } from "../consts";
import prisma from "../prisma-client";
import { CreateAssignsParameters } from "../types";

const assings = prisma.assigns

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

export function getAssings(q: string, page: string, status: string) {
  const currentStatus = status ?? undefined
  const query = q ?? ""
  return assings.findMany({
    where: {
      AND: [
        {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive"
              }
            },
            {
              description: {
                contains: query,
                mode: "insensitive"
              }
            },
            {
              user: {
                OR: [
                  {
                    employee: {
                      name: {
                        contains: query,
                        mode: "insensitive"
                      }
                    }
                  },
                  {
                    employee: {
                      lastname: {
                        contains: query,
                        mode: "insensitive"
                      }
                    }
                  }
                ]
              }
            },
          ]
        },
        {
          status: currentStatus as StatusKey
        }
      ]
    },
    skip: OFFSET(page),
    take: PER_PAGE
  })
}
