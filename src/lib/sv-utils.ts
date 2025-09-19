
export const STATUS = {
  pending: "pendiente",
  in_progress: "en progreso",
  completed: "completada",
  overdue: "vencida"
} as const


export const PER_PAGE = 10
export const OFFSET = (pageNumber: string) => (+pageNumber - 1) * PER_PAGE

