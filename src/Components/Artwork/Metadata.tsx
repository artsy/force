import { AuthContextModule } from "@artsy/cohesion"
import { Box, BoxProps } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Router/RouterLink"
import { Metadata_artwork } from "__generated__/Metadata_artwork.graphql"
import { DetailsFragmentContainer as Details } from "./Details"

export interface MetadataProps extends BoxProps {
  artwork: Metadata_artwork
  extended?: boolean
  contextModule?: AuthContextModule
  disableRouterLinking?: boolean
  hidePartnerName?: boolean
  hideArtistName?: boolean
  hideSaleInfo?: boolean
  isHovered?: boolean
  showHoverDetails?: boolean
  showSaveButton?: boolean
}

export const Metadata: React.FC<MetadataProps> = ({
  artwork,
  contextModule,
  disableRouterLinking,
  extended = true,
  hidePartnerName,
  hideArtistName,
  hideSaleInfo,
  isHovered,
  mt = 1,
  showHoverDetails,
  showSaveButton,
  ...rest
}) => {
  const LinkContainer = disableRouterLinking ? Box : RouterLink

  return (
    <LinkContainer
      to={disableRouterLinking ? null : artwork.href}
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
        showHoverDetails={showHoverDetails}
        showSaveButton={showSaveButton}
        contextModule={contextModule}
      />
    </LinkContainer>
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
