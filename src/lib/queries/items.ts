import prisma from "../prisma-client";
import { PER_PAGE, OFFSET } from "../sv-utils";
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



export async function createEntry({ item_id, stock, price }: { item_id: number, stock: number, price: number }) {

  await prisma.items.update({
    where: {
      id: item_id
    },
    data: {
      stock: {
        increment: stock
      }
    }
  })

  return prisma.stockentries.create({
    data: {
      stock,
      item_id,
      price
    }
  })
}

export async function createLoss({ user_id, stock, item_id }: { user_id: number, stock: number, item_id: number }) {
  await prisma.items.update({
    where: {
      id: item_id
    },
    data: {
      stock: {
        decrement: stock
      }
    }
  })
  return prisma.itemloss.create({
    data: {
      item_id,
      stock,
      user_id
    }
  })
}

export async function getItemLoss(q: string, page: string) {
  const query = q ?? ""
  const checkedPage = page ?? "1"
  return prisma.itemloss.findMany({
    where: {
      item: {
        description: {
          contains: query,
          mode: "insensitive"
        }
      }
    },
    select: {
      id: true,
      created_at: true,
      stock: true,
      item: {
        select: {
          price: true,
          description: true
        }
      }
    },
    skip: OFFSET(checkedPage),
    take: PER_PAGE
  })

}
export async function getItemLossCount(q: string) {
  const query = q ?? ""
  return prisma.itemloss.count({
    where: {
      item: {
        description: {
          contains: query,
          mode: "insensitive"
        }
      }
    },
  })

}

export async function getEntries(q: string, page: string) {
  const query = q ?? ""
  const checkedPage = page ?? "1"
  return prisma.stockentries.findMany({
    where: {
      item: {
        description: {
          contains: query,
          mode: "insensitive"
        }
      }
    },
    select: {
      id: true,
      created_at: true,
      item: {
        select: {
          description: true
        }
      },
      stock: true,
      price: true

    },
    skip: OFFSET(checkedPage),
    take: PER_PAGE
  })
}
export async function getEntriesCount(q: string) {
  const query = q ?? ""
  return prisma.stockentries.count({
    where: {
      item: {
        description: {
          contains: query,
          mode: "insensitive"
        }
      }
    },
  })
}


