import prisma from "../prisma-client";
import { PER_PAGE, OFFSET } from "../consts";
import { EditItemFormData, ItemFormData } from "../zod-schemas";

export function getItems(q: string, page: string) {
  const pageNumber = page ?? "1"

  return prisma.items.findMany({
    where: {
      description: {
        contains: q,
        mode: "insensitive"
      }
    },
    skip: OFFSET(pageNumber),
    take: PER_PAGE,
  })
}

export function getItemsCount(q: string) {
  return prisma.items.count({
    where: {
      description: {
        contains: q,
        mode: "insensitive"
      }
    }
  })
}

export function createItem(item: ItemFormData) {
  const { description, stock, price } = item
  return prisma.items.create({
    data: {
      description,
      stock: Number(stock),
      price: Number(price)
    }
  })
}

export function deleteItem(id: number) {
  return prisma.items.delete({
    where: {
      id
    }
  })
}

export function updateItem(item: EditItemFormData) {
  const { id, description, stock, price } = item
  return prisma.items.update({
    where: {
      id
    },
    data: {
      description: description,
      stock: stock ? Number(stock) : undefined,
      price: price ? Number(price) : undefined,

    }
  })
}



