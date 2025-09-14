"use server"

import { revalidatePath } from "next/cache";
import { createAssigment } from "../queries/assigments";
import { CreateAssignsParameters } from "../types";
import { assignmentSchema } from "../zod-schemas";
import { checkAdmin } from "./utils";

const PATH = "/dashboard/empleados"

export async function createAssignAction(data: CreateAssignsParameters) {
  const { description, title, dueDate } = data
  try {
    await checkAdmin()
    assignmentSchema.parse({ description, title, dueDate })
    await createAssigment(data)
    revalidatePath(PATH)
  } catch (err) {
    throw Error("Error creando la asignación")
  }
}

