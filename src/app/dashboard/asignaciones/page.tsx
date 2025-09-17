import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit } from "lucide-react"
import SearchBar from "@/components/search-bar"
import Pagination from "@/components/pagination"
import { STATUS } from "@/lib/consts"
import { getAssings } from "@/lib/queries/assigments"


export default async function AsignacionesPage() {

  const assigns = await getAssings("", "1", undefined)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Gestión de Asignaciones
        </CardTitle>
        <CardDescription>Administra todas las asignaciones y tareas</CardDescription>
      </CardHeader>
      <CardContent>
        <SearchBar />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Empleado</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assigns.map((assign) => (
                <TableRow key={assign.id}>
                  <TableCell className="font-medium">{assign.title}</TableCell>
                  <TableCell>{`${assign.user.employee?.name} ${assign.user.employee?.lastname}`}</TableCell>
                  <TableCell className="max-w-xs truncate">{assign.description}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`capitalize ${assign.status}`}>
                      {STATUS[assign.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{assign.due_date?.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination totalItems={10} />
      </CardContent>
    </Card>
  )
}
