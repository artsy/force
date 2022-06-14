import { Metadata_artwork } from "v2/__generated__/Metadata_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { DetailsFragmentContainer as Details } from "./Details"
import { BoxProps } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"
import { AuthContextModule } from "@artsy/cohesion"

export interface MetadataProps
  extends BoxProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  artwork: Metadata_artwork
  extended?: boolean
  hidePartnerName?: boolean
  hideArtistName?: boolean
  hideSaleInfo?: boolean
  isHovered?: boolean
  showHoverSaveButton?: boolean
  contextModule?: AuthContextModule
}

export const Metadata: React.FC<MetadataProps> = ({
  extended = true,
  mt = 1,
  artwork,
  hidePartnerName,
  hideArtistName,
  hideSaleInfo,
  isHovered,
  showHoverSaveButton,
  contextModule,
  ...rest
}) => {
  return (
    <RouterLink
      to={artwork.href}
      display="block"
      textDecoration="none"
      textAlign="left"
      mt={mt}
      {...rest}
    >
      <Details
        includeLinks={false}
        artwork={artwork}
        hideSaleInfo={hideSaleInfo}
        hidePartnerName={hidePartnerName}
        hideArtistName={hideArtistName}
        isHovered={isHovered}
        showHoverSaveButton={showHoverSaveButton}
        contextModule={contextModule}
      />
    </RouterLink>
  )
}

export default createFragmentContainer(Metadata, {
  artwork: graphql`
    fragment Metadata_artwork on Artwork {
      ...Details_artwork
      href
    }
  `,
})
