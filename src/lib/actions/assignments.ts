"use server"

import { revalidatePath } from "next/cache";
import { createAssigment } from "../queries/assigments";
import { CreateAssignsParameters } from "../types";
import { assignmentSchema } from "../zod-schemas";
import { checkAdmin } from "./utils";

export async function createAssignAction(data: CreateAssignsParameters) {
  const { description, title, dueDate } = data
  try {
    await checkAdmin()
    assignmentSchema.parse({ description, title, dueDate })
    await createAssigment(data)
    revalidatePath("/dashboard/empleados")
  } catch (err) {
    console.log(err)
    throw Error("Error creando la asignación")
  }
}

