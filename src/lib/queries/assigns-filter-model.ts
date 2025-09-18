import { StatusKey } from "../consts";

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
