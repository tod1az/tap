import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SearchBar from "@/components/search-bar"
import Pagination from "@/components/pagination"
import { getAssignsByUser, getAssignsByUserCount, getAssings, getAssingsCount } from "@/lib/queries/assigments"
import StatusFilter from "@/components/assigns/assigns-filter"
import { SearchParams } from "@/lib/types"
import UpdateAssign from "@/components/assigns/update-assign"
import UpdateStatus from "@/components/assigns/update-status-select"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"

type Props = {
  searchParams: SearchParams
}

export default async function AsignacionesPage({ searchParams }: Props) {

  const session = await getServerSession(authOptions)

  const { q, page, status } = await searchParams

  const assigns = session?.user?.role === "admin"
    ? await getAssings(q, page, status)
    : await getAssignsByUser(q, page, status, Number(session?.user?.id))

  const assignsCount = session?.user?.role === "admin"
    ? await getAssingsCount(q, status)
    : await getAssignsByUserCount(q, status, Number(session?.user?.id))

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
                {session?.user?.role === "admin" && <TableHead className="text-right">Acciones</TableHead>}
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
                  {
                    session?.user?.role === "admin" &&
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <UpdateAssign assign={assign} />
                      </div>
                    </TableCell>
                  }
                </TableRow >
              ))
              }
            </TableBody >
          </Table >
        </div >
        <Pagination totalItems={assignsCount} />
      </CardContent >
    </Card >
  )
}
