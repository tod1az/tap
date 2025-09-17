import { AlertTriangle, FileText, Package, UserCheck, Users } from "lucide-react"
import { $Enums } from "@/generated/prisma"

export const navigationItems = [
  { href: "/dashboard/items", label: "Items", icon: Package },
  { href: "/dashboard/empleados", label: "Empleados", icon: Users },
  { href: "/dashboard/entradas", label: "Entradas", icon: FileText },
  { href: "/dashboard/asignaciones", label: "Asignaciones", icon: UserCheck },
  { href: "/dashboard/mermas", label: "Mermas", icon: AlertTriangle },
] as const


export const STATUS = {
  [$Enums.Status.pending]: "pendiente",
  [$Enums.Status.in_progress]: "en progreso",
  [$Enums.Status.completed]: "completada"
} as const

export type StatusKey = (keyof typeof $Enums.Status)

export const PER_PAGE = 10
export const OFFSET = (pageNumber: string) => (+pageNumber - 1) * PER_PAGE
