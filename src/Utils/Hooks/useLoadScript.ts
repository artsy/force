import { captureException } from "@sentry/browser"
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
    script.onerror = () => {
      captureException(new Error(`Script load failed: ${id}`), {
        tags: { source: "script_load_failure" },
        extra: { scriptId: id, src: script.src },
      })
    }

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
