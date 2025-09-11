"use client"
import clsx from "clsx"
import { AlertTriangle, FileText, Package, UserCheck, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function DashboardHeader() {

  const navigationItems = [
    { href: "/dashboard/items", label: "Items", icon: Package },
    { href: "/dashboard/empleados", label: "Empleados", icon: Users },
    { href: "/dashboard/entradas", label: "Entradas", icon: FileText },
    { href: "/dashboard/asignaciones", label: "Asignaciones", icon: UserCheck },
    { href: "/dashboard/mermas", label: "Mermas", icon: AlertTriangle },
  ]

  const path = usePathname()

  function pathSelected(href: string) {
    return path === href
  }

  return (<nav className="border-b bg-muted/30">
    <div className="container mx-auto px-4">
      <div className="flex space-x-0">
        {navigationItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2  transition-all duration-200",
                pathSelected(item.href)
                  ? "text-foreground bg-muted/50 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-transparent hover:border-primary/20"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </div>
    </div>
  </nav>)

}
