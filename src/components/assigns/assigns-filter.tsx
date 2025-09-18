"use client"
import { Filter, X } from "lucide-react"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useFilters } from "@/lib/hooks/useFilters"
import { STATUS, StatusKey } from "@/lib/consts"

export default function StatusFilter() {

  const searchParams = useSearchParams()
  const statusFilter = searchParams.get("status") ?? undefined
  const [selectedStatus, setSelectedStatus] = useState(statusFilter)
  const { setStatus } = useFilters()

  function handleStatusFilterChange(value: StatusKey | "all") {
    setSelectedStatus(value)
    if (value === "all") setStatus()
    else setStatus(value)
  }

  function clearFilter() {
    setStatus()
    setSelectedStatus("all")
  }

  return (
    <div className="flex items-center space-x-2">
      <Filter className="h-4 w-4 text-muted-foreground" />
      <Select value={selectedStatus} onValueChange={handleStatusFilterChange}>
        <SelectTrigger className="w-48 capitalize">
          <SelectValue placeholder="Todos los estados" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos los estados</SelectItem>
          {
            Object.entries(STATUS).map(([key, value]) => (
              <SelectItem className="capitalize" value={key} key={key} >{value}</SelectItem>
            ))
          }
        </SelectContent>
      </Select>
      {statusFilter !== "all" && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearFilter}
          className="flex items-center space-x-1 bg-transparent"
        >
          <X className="h-3 w-3" />
          <span>Limpiar</span>
        </Button>
      )}
    </div>
  )
}
