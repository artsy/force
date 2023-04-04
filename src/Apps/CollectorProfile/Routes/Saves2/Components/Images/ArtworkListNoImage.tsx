import { FlexProps, NoArtworkIcon } from "@artsy/palette"
import { ArtworkListImageBorder } from "Apps/CollectorProfile/Routes/Saves2/Components/Images/ArtworkListImageBorder"
import { FC } from "react"

const NO_ICON_SIZE = 18

export const ArtworkListNoImage: FC<FlexProps> = props => {
  return (
    <ArtworkListImageBorder
      bg="black5"
      aria-label="Image placeholder"
      {...props}
    >
      <NoArtworkIcon
        width={NO_ICON_SIZE}
        height={NO_ICON_SIZE}
        fill="black60"
      />
    </ArtworkListImageBorder>
  )
}
