import { OwnerType, type ContextModule } from "@artsy/cohesion"
import type * as React from "react"
import { ArtworkItemImpression } from "Components/RailImpression/ArtworkItemImpression"

interface HomeArtworkItemImpressionProps {
  artworkID: string
  contextModule: ContextModule
  disabled?: boolean
  position: number
}

export const HomeArtworkItemImpression: React.FC<
  React.PropsWithChildren<HomeArtworkItemImpressionProps>
> = props => {
  return (
    <ArtworkItemImpression
      artworkID={props.artworkID}
      contextModule={props.contextModule}
      contextScreen={OwnerType.home}
      disabled={props.disabled}
      display="inline-flex"
      position={props.position}
    >
      {props.children}
    </ArtworkItemImpression>
  )
}
