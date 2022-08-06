import { Metadata_artwork } from "__generated__/Metadata_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { DetailsFragmentContainer as Details } from "./Details"
import { BoxProps } from "@artsy/palette"
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
  const LinkContainer = disableRouterLinking ? DisabledLink : RouterLink

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

const DisabledLink = styled(RouterLink)`
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
