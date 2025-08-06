import { useEffect } from "react"

type UseLoadScript = {
  id: string
  onReady?(): void
  removeOnUnmount?: boolean
} & ({ src: string } | { text: string })

export const useLoadScript = ({
  id,
  onReady,
  removeOnUnmount = false,
  ...rest
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

    if ("src" in rest) {
      script.src = rest.src
    }

    if ("text" in rest) {
      script.text = rest.text
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
  }, [id, onReady, removeOnUnmount, rest])
}
