import { useState } from "react"
import { useTimeout } from "Utils/Hooks/useTimeout"

export const useReady = ({ delay }: { delay: number }) => {
  const [ready, setReady] = useState(false)

  useTimeout({ callback: () => setReady(true), delay })

  return { ready }
}
