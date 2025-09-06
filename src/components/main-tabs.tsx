"use client"

import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs"
import { AlertTriangle, BarChart3, FileText, Package, Search, Users } from "lucide-react"
import { useState } from "react"

export default function MainTabs() {

  const [activeModule, setActiveModule] = useState("dashboard")

  return (
    <div className="container mx-auto px-4 py-6">
      <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="entradas" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Entradas
          </TabsTrigger>
          <TabsTrigger value="asignaciones" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Asignaciones
          </TabsTrigger>
          <TabsTrigger value="consultas" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Consultas
          </TabsTrigger>
          <TabsTrigger value="reportes" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reportes
          </TabsTrigger>
          <TabsTrigger value="mermas" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Mermas
          </TabsTrigger>
        </TabsList>

        <div className="py-8 text-center text-muted-foreground">
          <p className="text-lg">Página de prueba - Solo navbar, tabs y título</p>
          <p className="text-sm mt-2">Tab activo: {activeModule}</p>
        </div>
      </Tabs>
    </div>

  )
}
