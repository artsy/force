import CloseIcon from "@artsy/icons/CloseIcon"
import { RouterLink } from "System/Components/RouterLink"
import type { FC } from "react"
import { closeArtAssistant } from "Apps/ArtAssistant/utils/closeArtAssistant"

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
      onClick={closeArtAssistant}
    >
      <CloseIcon aria-hidden />
    </RouterLink>
  )
}
