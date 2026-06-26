import { Box, type BoxProps } from "@artsy/palette"
import type { ContextModule, OwnerType } from "@artsy/cohesion"
import type * as React from "react"
import { useArtworkItemImpressionTracking } from "Components/RailImpression/useArtworkItemImpressionTracking"

interface ArtworkItemImpressionProps {
  artworkID: string
  contextModule: ContextModule
  contextScreen: OwnerType
  disabled?: boolean
  display?: BoxProps["display"]
  position: number
  width?: BoxProps["width"]
}

export const ArtworkItemImpression: React.FC<
  React.PropsWithChildren<ArtworkItemImpressionProps>
> = ({
  artworkID,
  children,
  contextModule,
  contextScreen,
  disabled,
  display,
  position,
  width,
}) => {
  const { itemImpressionRef } = useArtworkItemImpressionTracking({
    contextModule,
    contextScreen,
    disabled,
    itemID: artworkID,
    position,
  })

  return (
    <Box
      ref={itemImpressionRef}
      display={display}
      width={width}
      data-testid="ArtworkItemImpression"
    >
      {children}
    </Box>
  )
}
