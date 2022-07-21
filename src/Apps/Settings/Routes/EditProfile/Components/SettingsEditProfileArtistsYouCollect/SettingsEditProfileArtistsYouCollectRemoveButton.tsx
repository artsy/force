import { CheckIcon, Clickable, ClickableProps, CloseIcon } from "@artsy/palette"
import { FC, useState } from "react"

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
        <CheckIcon display="block" fill="black60" />
      )}
    </Clickable>
  )
}
