import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SearchBar from "@/components/search-bar"
import Pagination from "@/components/pagination"
import { getAssings } from "@/lib/queries/assigments"
import StatusFilter from "@/components/assigns/assigns-filter"
import { SearchParams } from "@/lib/types"
import UpdateAssign from "@/components/assigns/update-assign"
import UpdateStatus from "@/components/assigns/update-status-select"

type Props = {
  searchParams: SearchParams
}

export default async function AsignacionesPage({ searchParams }: Props) {


  const { q, page, status } = await searchParams

  const assigns = await getAssings(q, page, status)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Gestión de Asignaciones
        </CardTitle>
        <CardDescription>Administra todas las asignaciones y tareas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <SearchBar item="asignaciones" />
          <StatusFilter />
        </div>
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
                    <UpdateStatus status={assign.status} assign_id={assign.id} />
                  </TableCell>
                  <TableCell>{assign.due_date?.toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <UpdateAssign assign={assign} />
                    </div>
                  </TableCell>
                </TableRow >
              ))
              }
            </TableBody >
          </Table >
        </div >
        <Pagination totalItems={10} />
      </CardContent >
    </Card >
  )
}
