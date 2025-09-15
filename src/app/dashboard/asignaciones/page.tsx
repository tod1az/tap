import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2 } from "lucide-react"
import SearchBar from "@/components/search-bar"
import Pagination from "@/components/pagination"
import { STATUS, StatusKey } from "@/lib/consts"

interface Assignment {
  id: string
  empleadoId: string
  empleadoNombre: string
  titulo: string
  descripcion: string
  fechaAsignacion: string
  fechaVencimiento: string
  prioridad: "alta" | "media" | "baja"
  estado: StatusKey
}

export default function AsignacionesPage() {
  const assignments: Assignment[] = [
    {
      id: "1",
      empleadoId: "1",
      empleadoNombre: "Juan Pérez",
      titulo: "Desarrollo de API REST",
      descripcion: "Implementar endpoints para el módulo de usuarios",
      fechaAsignacion: "2024-01-10",
      fechaVencimiento: "2024-01-25",
      prioridad: "alta",

      estado: "in_progress",
    },
    {
      id: "2",
      empleadoId: "1",
      empleadoNombre: "Juan Pérez",
      titulo: "Revisión de código",
      descripcion: "Revisar pull requests del equipo",
      fechaAsignacion: "2024-01-08",
      fechaVencimiento: "2024-01-15",
      prioridad: "media",
      estado: "completed",
    },
    {
      id: "3",
      empleadoId: "2",
      empleadoNombre: "María González",
      titulo: "Presentación Q1",
      descripcion: "Preparar presentación de resultados del primer trimestre",
      fechaAsignacion: "2024-01-05",
      fechaVencimiento: "2024-01-20",
      prioridad: "alta",
      estado: "pending",
    },
  ]

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
              {assignments.map((assignment) => (
                <TableRow key={assignment.id}>
                  <TableCell className="font-medium">{assignment.titulo}</TableCell>
                  <TableCell>{assignment.empleadoNombre}</TableCell>
                  <TableCell className="max-w-xs truncate">{assignment.descripcion}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`capitalize ${assignment.estado}`}>
                      {STATUS[assignment.estado]}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(assignment.fechaVencimiento).toLocaleDateString()}</TableCell>
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
