"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import { useFilters } from "@/lib/hooks/useFilters"
import { useSearchParams } from "next/navigation"

type Props = {
  totalItems: number
}

export default function Pagination({ totalItems }: Props) {

  const params = useSearchParams()
  const itemsPerPage = 10
  const currentPage = Number(params.get("page")) ?? 1

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const { nextPage, previousPage, setPage } = useFilters()

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>

        <div className="flex items-center space-x-1">
          {Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => setPage(page)}
              className="w-8 h-8 p-0"
            >
              {page}
            </Button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>

  )
}
