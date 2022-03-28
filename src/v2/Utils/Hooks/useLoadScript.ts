import { useEffect } from "react"

interface UseLoadScript {
  id: string
  src?: string
  onReady?(): void
  removeOnUnmount?: boolean
  text?: string
}

export const useLoadScript = ({
  id,
  src,
  text,
  onReady,
  removeOnUnmount = false,
}: UseLoadScript) => {
  useEffect(() => {
    if (document.getElementById(id)) {
      onReady?.()
      return
    }

    const script = document.createElement("script")

    script.id = id
    script.async = true
    script.onload = () => onReady?.()

    if (src) {
      script.src = src
    }
    if (text) {
      script.text = text
    }

    document.body.appendChild(script)

    return () => {
      if (removeOnUnmount) {
        const script = document.getElementById(id)
        if (script) {
          document.body.removeChild(script)
        }
      }
    }
  }, [id, onReady, src, text, removeOnUnmount])
}
