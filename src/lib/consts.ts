import { AlertTriangle, FileText, Package, UserCheck, Users } from "lucide-react"

export const navigationItems = [
  { href: "/dashboard/items", label: "Items", icon: Package },
  { href: "/dashboard/empleados", label: "Empleados", icon: Users },
  { href: "/dashboard/entradas", label: "Entradas", icon: FileText },
  { href: "/dashboard/asignaciones", label: "Asignaciones", icon: UserCheck },
  { href: "/dashboard/mermas", label: "Mermas", icon: AlertTriangle },
] as const

