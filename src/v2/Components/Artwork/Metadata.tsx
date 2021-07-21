import { Metadata_artwork } from "v2/__generated__/Metadata_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { DetailsFragmentContainer as Details } from "./Details"
import { BoxProps } from "@artsy/palette"
import { RouterLink } from "v2/System/Router/RouterLink"

export interface MetadataProps
  extends BoxProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  artwork: Metadata_artwork
  extended?: boolean
  hidePartnerName?: boolean
  hideArtistName?: boolean
  hideSaleInfo?: boolean
}

export const Metadata: React.FC<MetadataProps> = ({
  extended = true,
  mt = 1,
  artwork,
  hidePartnerName,
  hideArtistName,
  hideSaleInfo,
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
      />
    </RouterLink>
  )
}

export default createFragmentContainer(Metadata, {
  artwork: graphql`
    fragment Metadata_artwork on Artwork {
      ...Details_artwork
      ...Contact_artwork
      href
    }
  `,
})
