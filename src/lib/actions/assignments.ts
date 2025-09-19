"use server"

import { revalidatePath } from "next/cache";
import { createAssigment, updateAssign, updateStatusAssign } from "../queries/assigments";
import { CreateAssignsParameters } from "../types";
import { assignmentSchema, UpdateAssignForm, updateAssignSchema } from "../zod-schemas";
import { checkAdmin, checkUser } from "./utils";

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

export async function updateAssignAdminAction(data: UpdateAssignForm & { assign_id: number }) {

  const { description, title, status } = data
  try {
    await checkAdmin()
    updateAssignSchema.parse({ description, title, status })
    await updateAssign({ description, title, status, assign_id: data.assign_id })
    revalidatePath("/dashboard/asignaciones")
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
    throw Error("Error editando la asignación")
  }
}

export type Data = {
  status: string
  assign_id: number
  user_id: string
}

export async function updateAssignUserAction(data: Data) {
  const { user_id, status, assign_id } = data
  try {
    await checkUser(user_id)
    await updateStatusAssign({ assign_id, status, user_id })
    revalidatePath("/dashboard/asignaciones")
  } catch (err) {
    if (err instanceof Error) console.log(err.message)
    throw Error("Error editando la asignación")
  }
}

