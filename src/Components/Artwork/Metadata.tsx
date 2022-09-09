import { AuthContextModule } from "@artsy/cohesion"
import { Box, BoxProps } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "System/Router/RouterLink"
import { Metadata_artwork } from "__generated__/Metadata_artwork.graphql"
import { DetailsFragmentContainer as Details } from "./Details"

export interface MetadataProps
  extends BoxProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
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
  isMyCollectionArtwork?: boolean
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
  isMyCollectionArtwork = false,
  ...rest
}) => {
  return (
    <LinkContainer
      artwork={artwork}
      mt={mt}
      disableRouterLinking={disableRouterLinking}
      isMyCollectionArtwork={isMyCollectionArtwork}
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

const LinkContainer: React.FC<Omit<MetadataProps, "children">> = ({
  artwork,
  disableRouterLinking,
  mt,
  isMyCollectionArtwork,
  ...rest
}) => {
  if (!!disableRouterLinking) {
    return <DisabledLink mt={mt}>{rest.children}</DisabledLink>
  }

  // My collection artwork is a special case. We don't want to link to the standard artwork page,
  // but to a custom my collection artwork page.
  const to = !isMyCollectionArtwork
    ? artwork.href
    : `/my-collection/artwork/${artwork.internalID}`

  return (
    <RouterLink
      to={to}
      display="block"
      textDecoration="none"
      textAlign="left"
      mt={mt}
      data-testid="metadata-artwork-link"
      {...rest}
    >
      {rest.children}
    </RouterLink>
  )
}

const DisabledLink = styled(Box)`
  display: block;
  text-decoration: none;
  text-align: left;
  cursor: default;
`

export default createFragmentContainer(Metadata, {
  artwork: graphql`
    fragment Metadata_artwork on Artwork {
      ...Details_artwork
      internalID
      href
    }
  `,
})
