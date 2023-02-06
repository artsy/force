import { useCallback, useEffect, useState } from "react"

interface UseGeometry {
  selector: string
  delay: number
}

export const useGeometry = ({ selector, delay = 0 }: UseGeometry) => {
  const [geometry, setGeometry] = useState<DOMRect | null>(null)

  const queryGeometry = useCallback(() => {
    return setTimeout(() => {
      if (!selector) {
        setGeometry(null)

        return
      }

      try {
        const element = document.querySelector(selector)

        if (!element) {
          setGeometry(null)

          return
        }

        setGeometry(element.getBoundingClientRect())
      } catch (error) {
        console.error(error)
        return
      }
    }, delay)
  }, [delay, selector])

  useEffect(() => {
    const timeout = queryGeometry()

    window.addEventListener("resize", queryGeometry, { passive: true })
    document.addEventListener("scroll", queryGeometry, { passive: true })

    return () => {
      clearTimeout(timeout)

      window.removeEventListener("resize", queryGeometry)
      document.removeEventListener("scroll", queryGeometry)
    }
  }, [queryGeometry])

  return { geometry, queryGeometry }
}
