import { useEffect } from "react"

const URL_REGEX = /^\/collector-profile\/saves2\/?([a-zA-Z0-9\-]+)?$/

interface Options {
  onChanged: (id: string | null) => void
}

export const useSavesHistoryEntity = ({ onChanged }: Options) => {
  useEffect(() => {
    const listener = () => {
      const pathname = window.location.pathname ?? ""
      const matches = pathname.match(URL_REGEX)

      if (matches === null) {
        return
      }

      onChanged(matches[1])
    }

    window.addEventListener("popstate", listener)

    return () => {
      window.removeEventListener("popstate", listener)
    }
  }, [onChanged])
}
