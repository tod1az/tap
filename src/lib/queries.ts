import prisma from "./prisma-client";

export function getAllItems() {
  return prisma.items.findMany({
    take: 10
  })
}

export function getItemsCount() {
  return prisma.items.count()
}

