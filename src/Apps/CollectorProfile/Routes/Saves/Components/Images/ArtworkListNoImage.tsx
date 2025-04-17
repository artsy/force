import NoArtIcon from "@artsy/icons/NoArtIcon"
import type { FlexProps } from "@artsy/palette"
import { ArtworkListImageBorder } from "Apps/CollectorProfile/Routes/Saves/Components/Images/ArtworkListImageBorder"
import type { FC } from "react"

const NO_ICON_SIZE = 18

export const ArtworkListNoImage: FC<
  React.PropsWithChildren<FlexProps>
> = props => {
  return (
    <ArtworkListImageBorder
      bg="mono5"
      aria-label="Image placeholder"
      {...props}
    >
      <NoArtIcon width={NO_ICON_SIZE} height={NO_ICON_SIZE} fill="mono60" />
    </ArtworkListImageBorder>
  )
}
