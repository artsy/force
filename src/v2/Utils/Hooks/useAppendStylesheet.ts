import { useEffect } from "react"

interface UseAppendStylesheet {
  id: string
  body: string
}

export const useAppendStylesheet = ({ id, body }: UseAppendStylesheet) => {
  useEffect(() => {
    if (document.getElementById(id)) {
      return
    }

    const css = document.createElement("style")

    css.id = id
    css.setAttribute("type", "text/css")
    css.textContent = body

    document.body.appendChild(css)
  }, [body, id])
}
