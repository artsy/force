import { useEffect } from "react"

interface UseLoadScript {
  id: string
  src: string
  onReady?(): void
}

export const useLoadScript = ({ id, src, onReady }: UseLoadScript) => {
  useEffect(() => {
    if (document.getElementById(id)) {
      onReady?.()
      return
    }

    const script = document.createElement("script")

    script.id = id
    script.async = true
    script.src = src
    script.onload = () => onReady?.()

    document.body.appendChild(script)
  }, [id, onReady, src])
}
