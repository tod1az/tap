"use server"

import { revalidatePath } from "next/cache"
import { createEmployee, deleteEmployee } from "../queries/employees"
import { checkAdmin } from "./utils"
import { EmployeeFormData, employeeSchema } from "../zod-schemas"

const PATH = "/dashboard/empleados"

export async function createEmployeeAction(data: EmployeeFormData) {
  try {
    employeeSchema.parse(data)
    await checkAdmin()
    await createEmployee(data)
    revalidatePath(PATH)
  } catch (err) {

    if (err instanceof Error) {
      console.log(err.message)
    }
    throw Error("Error al crear el empleado")
  }
}

export async function deleteEmployeeAction(id: number) {
  try {
    await checkAdmin()
    await deleteEmployee(id)
    revalidatePath(PATH)
  } catch {
    throw Error("Error al eliminar el empleado")
  }
}
