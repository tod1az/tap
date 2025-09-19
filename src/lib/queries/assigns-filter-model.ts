
import { $Enums } from "@/generated/prisma/client"

export type StatusKey = keyof (typeof $Enums.Status)

export function statusFilter(status?: string) {
  if (!status) return {}
  const now = Date.now()
  if (status === "overdue") {
    return {
      due_date: {
        lt: new Date(now)
      }
    }
  }
  return {
    status: status as StatusKey
  }
}
