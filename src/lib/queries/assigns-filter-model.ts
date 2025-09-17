import { StatusKey } from "../consts";

export type FilterStatusArgs = StatusKey | "outdate" | undefined


export function statusFilter(status: FilterStatusArgs) {
  const now = Date.now()
  if (status === "outdate") {
    return {
      due_date: {
        lt: String(now)
      }
    }
  }
  return {
    status
  }
}
