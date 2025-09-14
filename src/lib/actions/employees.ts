"use server"

import { revalidatePath } from "next/cache"
import { deleteEmployee } from "../queries/employees"

const PATH = "/dashboard/empleados"

export async function deleteEmployeeAction(id: number) {
  try {
    await deleteEmployee(id)
    revalidatePath(PATH)
  } catch {
    throw Error("Error al eliminar el empleado")
  }
}
