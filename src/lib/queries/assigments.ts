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
