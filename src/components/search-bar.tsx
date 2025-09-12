"use client"
import { Search } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFilters } from "@/lib/hooks/useFilters";
import { Input } from "./ui/input";

export default function SearchBar() {

  const [searchTerm, setSearchTerm] = useState("")
  const { setQuery } = useFilters()

  const timeoutRef = useRef<NodeJS.Timeout>(null)

  const debouncedSetQuery = useCallback((value: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      setQuery(value)
    }, 300)
  }, [setQuery])

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value)
    debouncedSetQuery(e.target.value)
  }
  useEffect(() => {
    setSearchTerm("")
  }, [])
  return (
    <div className="flex items-center space-x-2 mb-4">
      <Search className="h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar items por nombre..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="max-w-sm"
      />
    </div>

  )
}
