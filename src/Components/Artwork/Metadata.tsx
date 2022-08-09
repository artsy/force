import { Metadata_artwork } from "__generated__/Metadata_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { DetailsFragmentContainer as Details } from "./Details"
import { Box, BoxProps } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { AuthContextModule } from "@artsy/cohesion"
import styled from "styled-components"

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
  return (
    <LinkContainer
      artwork={artwork}
      mt={mt}
      disableRouterLinking={disableRouterLinking}
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
  ...rest
}) => {
  if (!!disableRouterLinking) {
    return <DisabledLink mt={mt}>{rest.children}</DisabledLink>
  }
  return (
    <RouterLink
      to={artwork.href}
      display="block"
      textDecoration="none"
      textAlign="left"
      mt={mt}
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
      href
    }
  `,
})
