import { Clickable, ClickableProps } from "@artsy/palette"
import { FC, useState } from "react"
import CloseIcon from "@artsy/icons/CloseIcon"
import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"

export const SettingsEditProfileArtistsYouCollectRemoveButton: FC<ClickableProps> = props => {
  const [hovered, setHovered] = useState(false)

  return (
    <Clickable
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label="Remove artist"
      {...props}
    >
      {hovered ? (
        <CloseIcon display="block" fill="red100" />
      ) : (
        <CheckmarkIcon display="block" fill="black60" />
      )}
    </Clickable>
  )
}
