"use client"

import { AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight, UserPlus, Loader2 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import SearchBar from "@/components/search-bar"
import Pagination from "@/components/pagination"
import NewEmployeeDialog from "@/components/employees/new-employee-dialog"
import NewAssigmentModal from "@/components/employees/new-assigment-modal"

interface Employee {
  id: string
  nombre: string
  apellido: string
  email: string
  fechaIngreso: string
}

interface Assignment {
  id: string
  empleadoId: string
  titulo: string
  descripcion: string
  fechaAsignacion: string
  fechaVencimiento: string
  prioridad: "alta" | "media" | "baja"
  estado: "pendiente" | "en_progreso" | "completada"
}

export default function EmpleadosPage() {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "1",
      nombre: "Juan",
      apellido: "Pérez",
      email: "juan.perez@empresa.com",
      fechaIngreso: "2023-01-15",
    },
    {
      id: "2",
      nombre: "María",
      apellido: "González",
      email: "maria.gonzalez@empresa.com",
      fechaIngreso: "2022-08-20",
    },
    {
      id: "3",
      nombre: "Carlos",
      apellido: "Rodríguez",
      email: "carlos.rodriguez@empresa.com",
      fechaIngreso: "2023-03-10",
    },
    {
      id: "4",
      nombre: "Ana",
      apellido: "López",
      email: "ana.lopez@empresa.com",
      fechaIngreso: "2023-05-22",
    },
    {
      id: "5",
      nombre: "Luis",
      apellido: "Martínez",
      email: "luis.martinez@empresa.com",
      fechaIngreso: "2022-11-08",
    },
    {
      id: "6",
      nombre: "Carmen",
      apellido: "Ruiz",
      email: "carmen.ruiz@empresa.com",
      fechaIngreso: "2023-07-14",
    },
    {
      id: "7",
      nombre: "Pedro",
      apellido: "Sánchez",
      email: "pedro.sanchez@empresa.com",
      fechaIngreso: "2023-02-28",
    },
    {
      id: "8",
      nombre: "Laura",
      apellido: "Torres",
      email: "laura.torres@empresa.com",
      fechaIngreso: "2022-12-05",
    },
    {
      id: "9",
      nombre: "Miguel",
      apellido: "Herrera",
      email: "miguel.herrera@empresa.com",
      fechaIngreso: "2023-04-18",
    },
    {
      id: "10",
      nombre: "Sofia",
      apellido: "Morales",
      email: "sofia.morales@empresa.com",
      fechaIngreso: "2023-06-30",
    },
    {
      id: "11",
      nombre: "Diego",
      apellido: "Castro",
      email: "diego.castro@empresa.com",
      fechaIngreso: "2023-08-12",
    },
  ])

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      empleadoId: "1",
      titulo: "Desarrollo de API REST",
      descripcion: "Implementar endpoints para el módulo de usuarios",
      fechaAsignacion: "2024-01-10",
      fechaVencimiento: "2024-01-25",
      prioridad: "alta",
      estado: "en_progreso",
    },
    {
      id: "2",
      empleadoId: "1",
      titulo: "Revisión de código",
      descripcion: "Revisar pull requests del equipo",
      fechaAsignacion: "2024-01-08",
      fechaVencimiento: "2024-01-15",
      prioridad: "media",
      estado: "completada",
    },
    {
      id: "3",
      empleadoId: "2",
      titulo: "Presentación Q1",
      descripcion: "Preparar presentación de resultados del primer trimestre",
      fechaAsignacion: "2024-01-05",
      fechaVencimiento: "2024-01-20",
      prioridad: "alta",
      estado: "pendiente",
    },
  ])

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [selectedEmployeeForAssignment, setSelectedEmployeeForAssignment] = useState<Employee | null>(null)
  const [isAddingAssignment, setIsAddingAssignment] = useState(false)
  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const itemsPerPage = 10

  const [newEmployee, setNewEmployee] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fechaIngreso: "",
  })

  const [newAssignment, setNewAssignment] = useState({
    titulo: "",
    descripcion: "",
    fechaVencimiento: "",
    prioridad: "media" as const,
  })

  const handleAddEmployee = () => {
    const employee: Employee = {
      id: Date.now().toString(),
      ...newEmployee,
    }
    setEmployees([...employees, employee])
    setNewEmployee({
      nombre: "",
      apellido: "",
      email: "",
      fechaIngreso: "",
    })
    setIsAddModalOpen(false)
  }

  const handleDeleteEmployee = async (employee: Employee) => {
    setIsDeleting(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setEmployees(employees.filter((e) => e.id !== employee.id))
    setAssignments(assignments.filter((a) => a.empleadoId !== employee.id))
    setDeleteEmployee(null)
    setIsDeleting(false)
  }

  const handleViewAssignments = (employee: Employee) => {
    setSelectedEmployee(employee)
    setIsAssignmentsModalOpen(true)
  }

  const handleAddAssignmentToEmployee = (employee: Employee) => {
    setSelectedEmployeeForAssignment(employee)
    setIsAddAssignmentModalOpen(true)
  }

  const handleCreateAssignment = async () => {
    if (!selectedEmployeeForAssignment) return

    setIsAddingAssignment(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const assignment: Assignment = {
      id: Date.now().toString(),
      empleadoId: selectedEmployeeForAssignment.id,
      fechaAsignacion: new Date().toISOString().split("T")[0],
      estado: "pendiente",
      ...newAssignment,
    }
    setAssignments([...assignments, assignment])
    setNewAssignment({
      titulo: "",
      descripcion: "",
      fechaVencimiento: "",
      prioridad: "media",
    })
    setIsAddingAssignment(false)
    setIsAddAssignmentModalOpen(false)
    setSelectedEmployeeForAssignment(null)
  }

  const getEmployeeAssignments = (employeeId: string) => {
    return assignments.filter((assignment) => assignment.empleadoId === employeeId)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "bg-red-100 text-red-800 border-red-200"
      case "media":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "baja":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completada":
        return "bg-green-100 text-green-800 border-green-200"
      case "en_progreso":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "pendiente":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }


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
        <Pagination totalItems={20} />
      </CardContent>
    </Card>
  )
}


function EmployeesTable({ employees }: any) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre Completo</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Fecha Ingreso</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">
                {employee.nombre} {employee.apellido}
              </TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{new Date(employee.fechaIngreso).toLocaleDateString()}</TableCell>
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
                            {employee.nombre} {employee.apellido}
                          </span>{" "}
                          y todas sus asignaciones asociadas.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel >Cancelar</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => console.log("dummy")}
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


