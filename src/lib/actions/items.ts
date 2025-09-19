"use server"

import { revalidatePath } from "next/cache"
import { createItem, deleteItem, updateItem } from "../queries/items"
import { EditItemFormData, EditItemSchema, ItemFormData, itemSchema } from "../zod-schemas"
import { checkAdmin } from "./utils"

const ITEMS_PATH = "/dashboard/items"

export async function createItemAction(item: ItemFormData) {

  await checkAdmin()

  try {
    itemSchema.parse(item)
    await createItem(item)
    revalidatePath(ITEMS_PATH)
  } catch (err) {
    console.log(err)
    throw Error("Error al crear el ítem")
  }
}

export async function updateItemAction(item: EditItemFormData) {
  await checkAdmin()

  try {
    EditItemSchema.parse(item)
    await updateItem(item)
    revalidatePath(ITEMS_PATH)
  } catch (err) {
    console.log(err)
    throw Error("Error al crear el ítem")
  }

}

export async function deleteItemAction(id: number) {
  await checkAdmin()
  await deleteItem(id)
  revalidatePath(ITEMS_PATH)
}



