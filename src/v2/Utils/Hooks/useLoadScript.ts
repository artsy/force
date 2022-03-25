import { useEffect } from "react"

interface UseLoadScript {
  id: string
  src?: string
  text?: string
  type?: string
  onReady?(): void
}

export const useLoadScript = ({
  id,
  src,
  text,
  type,
  onReady,
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
    if (type) {
      script.type = type
    }

    document.body.appendChild(script)

    return () => {
      const script = document.getElementById(id) as HTMLScriptElement | null
      if (script) {
        document.body.removeChild(script)
      }
    }
  }, [id, onReady, src, text, type])
}
