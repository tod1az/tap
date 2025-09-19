"use server"

import { revalidatePath } from "next/cache"
import { createEntrie, createEntry, createItem, createLoss, deleteItem, updateItem } from "../queries/items"
import { EditItemFormData, EditItemSchema, ItemFormData, itemSchema } from "../zod-schemas"
import { auth, checkAdmin } from "./utils"

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

export async function createItemEntryAction(data: { stock: number, item_id: number, price: number }) {

  try {
    console.log(data)
    await createEntry(data)
    revalidatePath(ITEMS_PATH)
    revalidatePath("/dashboard/entradas")
  } catch (err) {
    throw Error("Error al crear la entrada")
  }
}

export async function createItemLossAction(data: { stock: number, item_id: number }) {

  const session = await auth()
  try {
    if (!session) throw Error("Unauthorized")
    await createLoss({ ...data, user_id: Number(session?.user?.id) })
    revalidatePath(ITEMS_PATH)
    revalidatePath("/dashboard/entradas")
  } catch (err) {
    throw Error("Error al registrar la merma")
  }
}




