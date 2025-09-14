import { AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import SearchBar from "@/components/search-bar"
import Pagination from "@/components/pagination"
import NewEmployeeDialog from "@/components/employees/new-employee-dialog"
import NewAssigmentModal from "@/components/employees/new-assigment-modal"
import { Edit, Trash2 } from "lucide-react"
import { getEmployees, getEmployeesCount } from "@/lib/queries/employees"
import { Employee, SearchParams } from "@/lib/types"

type Props = {
  searchParams: SearchParams
}

export default async function EmpleadosPage({ searchParams }: Props) {

  const { q, page } = await searchParams

  const employees = await getEmployees(q, page)
  const employeesCount = await getEmployeesCount(q)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Gestión de Empleados
          <NewEmployeeDialog />
        </CardTitle>
        <CardDescription>Administra empleados y sus asignaciones</CardDescription>
      </CardHeader>
      <CardContent>
        <SearchBar />
        <EmployeesTable employees={employees} />
        <Pagination totalItems={employeesCount} />
      </CardContent>
    </Card>
  )
}

type TableProps = {
  employees: Employee[]
}


function EmployeesTable({ employees }: TableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Rol</TableHead>
            <TableHead>Fecha Ingreso</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">
                {employee.name} {employee.lastname}
              </TableCell>
              <TableCell>{employee.user?.email}</TableCell>
              <TableCell className="capitalize">{employee.user?.role}</TableCell>
              <TableCell>{employee.created_at?.toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <NewAssigmentModal />
                  <Button variant="outline" size="sm" title="Editar empleado">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>

                      <Button variant="outline" size="sm" title="Eliminar empleado">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Se eliminará permanentemente el empleado{" "}
                          <span className="font-semibold">
                            {employee.name} {employee.lastname}
                          </span>{" "}
                          y todas sus asignaciones asociadas.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel >Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Eliminar Empleado
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}


