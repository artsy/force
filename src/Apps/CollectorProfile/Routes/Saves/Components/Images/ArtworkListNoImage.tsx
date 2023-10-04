import { FlexProps } from "@artsy/palette"
import { ArtworkListImageBorder } from "Apps/CollectorProfile/Routes/Saves/Components/Images/ArtworkListImageBorder"
import { FC } from "react"
import NoArtIcon from "@artsy/icons/NoArtIcon"

const NO_ICON_SIZE = 18

export const ArtworkListNoImage: FC<FlexProps> = props => {
  return (
    <ArtworkListImageBorder
      bg="black5"
      aria-label="Image placeholder"
      {...props}
    >
      <NoArtIcon width={NO_ICON_SIZE} height={NO_ICON_SIZE} fill="black60" />
    </ArtworkListImageBorder>
  )
}
