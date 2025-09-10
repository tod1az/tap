"use client"

import { AlertTriangle, FileText, Package, UserCheck, Users } from "lucide-react"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import ItemsManagement from "./items/items-managment"

export default function MainTabs() {

  const [activeModule, setActiveModule] = useState("items")

  return (
    <div className="container mx-auto px-4 py-6">

      <Tabs value={activeModule} onValueChange={setActiveModule} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="items" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Ítems
          </TabsTrigger>
          <TabsTrigger value="employees" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Empleados
          </TabsTrigger>
          <TabsTrigger value="entries" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Entradas
          </TabsTrigger>
          <TabsTrigger value="assigns" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            Asignaciones
          </TabsTrigger>
          <TabsTrigger value="losses" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Mermas
          </TabsTrigger>
        </TabsList>
        <TabsContent value="items" className="space-y-6">
          <ItemsManagement />
        </TabsContent>
        <div className="py-8 text-center text-muted-foreground">
          <p className="text-lg">Página de prueba - Solo navbar, tabs y título</p>
          <p className="text-sm mt-2">Tab activo: {activeModule}</p>
        </div>
      </Tabs>
    </div>
  )
}
