import CheckmarkIcon from "@artsy/icons/CheckmarkIcon"
import CloseIcon from "@artsy/icons/CloseIcon"
import { Clickable, type ClickableProps } from "@artsy/palette"
import { type FC, useState } from "react"

export const SettingsEditProfileArtistsYouCollectRemoveButton: FC<
  React.PropsWithChildren<ClickableProps>
> = props => {
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
        <CheckmarkIcon display="block" fill="mono60" />
      )}
    </Clickable>
  )
}
