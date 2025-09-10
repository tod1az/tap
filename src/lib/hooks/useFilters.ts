import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useFilters() {

  const path = usePathname()
  const params = new URLSearchParams(useSearchParams())
  const router = useRouter()

  function setPage(page: number) {
    params.set("page", String(page))
    router.replace(`${path}?${params.toString()}`)
  }
  function nextPage() {
    const currentPage = params.get("page") ?? 1
    setPage(Number(currentPage) + 1)
  }
  function previousPage() {
    const currentPage = params.get("page") ?? 1
    if (currentPage === 1) return
    setPage(Number(currentPage) - 1)
  }

  function setQuery(query: string) {
    if (query === "") {
      params.delete("q")
    } else {
      params.set("q", query)
    }
    router.replace(`${path}?${params}`)
  }

  useEffect(() => {
    if (params.get("page") === null) {
      params.set("page", "1")
      router.replace(`${path}?${params.toString()}`)
    }
    return () => {
      params.delete("q")
      params.delete("page")
      router.replace(`${path}?${params.toString()}`)
    }
  }, [])

  return {
    setPage,
    nextPage,
    previousPage,
    setQuery
  }

}
