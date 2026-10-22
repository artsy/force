import CloseIcon from "@artsy/icons/CloseIcon"
import { RouterLink } from "System/Components/RouterLink"
import type { FC } from "react"

export const ArtAssistantCloseButton: FC = () => {
  return (
    <RouterLink
      to="/"
      aria-label="Close Art Assistant"
      display="flex"
      alignItems="center"
      justifyContent="center"
      width={44}
      height={44}
      onClick={event => {
        // Farce's index counts in-app navigation; history.length also counts about:blank.
        const index = window.history.state?.index
        if (typeof index !== "number" || index <= 0) return
        event.preventDefault()
        window.history.back()
      }}
    >
      <CloseIcon aria-hidden />
    </RouterLink>
  )
}
