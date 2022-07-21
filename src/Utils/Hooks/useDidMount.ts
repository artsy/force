import { useEffect, useState } from "react"

export function useDidMount(defaultMounted = false) {
  const [isMounted, toggleMounted] = useState(defaultMounted)

  useEffect(() => {
    toggleMounted(true)
  }, [])

  return isMounted
}
