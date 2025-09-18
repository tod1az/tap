import { OFFSET, PER_PAGE } from "../consts";
import prisma from "../prisma-client";
import { CreateAssignsParameters } from "../types";
import { statusFilter } from "./assigns-filter-model";
import { Data } from "../actions/assignments";
import { Status } from "@/generated/prisma";
import { UpdateAssignForm } from "../zod-schemas";


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
export function getAssignsByUserCount(q: string, status: string, id?: number) {
  const currentStatus = status ?? undefined
  const query = q ?? ""
  return prisma.assigns.count({
    where: {
      AND: [
        {
          user: {
            id
          }
        },
        statusFilter(currentStatus)
      ]
      ,
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
            employee: {
              name: {
                contains: query,
                mode: "insensitive"
              }
            }
          }
        },
        {
          user: {
            employee: {
              lastname: {
                contains: query,
                mode: "insensitive"
              }
            }
          }
        },
      ]
      ,
    },
  })
}

export function getAssignsByUser(q: string, page: string, status: string, id?: number) {
  const currentStatus = status ?? undefined
  const query = q ?? ""
  const currentPage = page ?? "1"
  return prisma.assigns.findMany({
    where: {
      AND: [
        {
          user: {
            id
          }
        },
        statusFilter(currentStatus)
      ]
      ,
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
            employee: {
              name: {
                contains: query,
                mode: "insensitive"
              }
            }
          }
        },
        {
          user: {
            employee: {
              lastname: {
                contains: query,
                mode: "insensitive"
              }
            }
          }
        },
      ]
      ,
    },
    select: {
      id: true,
      title: true,
      description: true,
      due_date: true,
      status: true,
      user: {
        select: {
          id: true,
          employee: {
            select: {
              name: true,
              lastname: true
            }
          }
        }
      }
    },
    skip: OFFSET(currentPage),
    take: PER_PAGE
  })
}

export function getAssings(q: string, page: string, status: string) {
  const currentStatus = status ?? undefined
  const query = q ?? ""
  const currentPage = page ?? "1"
  return prisma.assigns.findMany({
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
                employee: {
                  name: {
                    contains: query,
                    mode: "insensitive"
                  }
                }
              }
            },
            {
              user: {
                employee: {
                  lastname: {
                    contains: query,
                    mode: "insensitive"
                  }
                }
              }
            },
          ]
        },
        statusFilter(currentStatus)
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
          id: true,
          employee: {
            select: {
              name: true,
              lastname: true
            }
          }
        }
      }
    },
    skip: OFFSET(currentPage),
    take: PER_PAGE
  })
}

export function getAssingsCount(q: string, status: string) {
  const currentStatus = status ?? undefined
  const query = q ?? ""
  return prisma.assigns.count({
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
                employee: {
                  name: {
                    contains: query,
                    mode: "insensitive"
                  }
                }
              }
            },
            {
              user: {
                employee: {
                  lastname: {
                    contains: query,
                    mode: "insensitive"
                  }
                }
              }
            },
          ]
        },
        statusFilter(currentStatus)
      ]
    },
  })
}


export function updateAssign(data: UpdateAssignForm & { assign_id: number }) {

  const { title, description, status } = data

  return prisma.assigns.update({
    where: {
      id: data.assign_id
    },
    data: {
      title: title ?? undefined,
      description: description ?? undefined,
      status: status === "all" ? undefined : status as Status
    }
  })

}

export function updateStatusAssign(data: Data) {

  const { assign_id, status } = data

  return prisma.assigns.update({
    where: {
      id: assign_id
    },
    data: {
      status: status as Exclude<Status, "overdue">
    }
  })

}
