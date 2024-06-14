import { AuthContextModule } from "@artsy/cohesion"
import { Box, BoxProps } from "@artsy/palette"
import {
  DetailsFragmentContainer,
  DetailsPlaceholder,
} from "Components/Artwork/Details"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "System/Components/RouterLink"
import { Metadata_artwork$data } from "__generated__/Metadata_artwork.graphql"

export interface MetadataProps
  extends BoxProps,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  artwork: Metadata_artwork$data
  contextModule?: AuthContextModule
  disableRouterLinking?: boolean
  hidePartnerName?: boolean
  hideArtistName?: boolean
  hideSaleInfo?: boolean
  isHovered?: boolean
  showHighDemandIcon?: boolean
  showHoverDetails?: boolean
  showSaveButton?: boolean
  to?: string | null
  renderSaveButton?: (artworkId: string) => React.ReactNode
}

export const Metadata: React.FC<MetadataProps> = ({
  artwork,
  contextModule,
  disableRouterLinking,
  hidePartnerName,
  hideArtistName,
  hideSaleInfo,
  isHovered,
  mt = 1,
  showHighDemandIcon = false,
  showHoverDetails,
  showSaveButton,
  renderSaveButton,
  ...rest
}) => {
  return (
    <LinkContainer
      artwork={artwork}
      mt={mt}
      disableRouterLinking={disableRouterLinking}
      {...rest}
    >
      <DetailsFragmentContainer
        includeLinks={false}
        artwork={artwork}
        hideSaleInfo={hideSaleInfo}
        hidePartnerName={hidePartnerName}
        hideArtistName={hideArtistName}
        isHovered={isHovered}
        showHighDemandIcon={showHighDemandIcon}
        showHoverDetails={showHoverDetails}
        showSaveButton={showSaveButton}
        contextModule={contextModule}
        renderSaveButton={renderSaveButton}
      />
    </LinkContainer>
  )
}

const LinkContainer: React.FC<Omit<MetadataProps, "children">> = ({
  artwork,
  disableRouterLinking,
  mt,
  to,
  ...rest
}) => {
  if (!!disableRouterLinking) {
    return <DisabledLink mt={mt}>{rest.children}</DisabledLink>
  }

  return (
    <RouterLink
      to={to !== undefined ? to : artwork.href}
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

type MetadataPlaceholderProps = Pick<
  MetadataProps,
  "hidePartnerName" | "hideArtistName" | "hideSaleInfo"
> &
  BoxProps

export const MetadataPlaceholder: React.FC<MetadataPlaceholderProps> = ({
  mt = 1,
  hidePartnerName,
  hideArtistName,
  hideSaleInfo,
  ...rest
}) => {
  return (
    <Box mt={mt} {...rest}>
      <DetailsPlaceholder
        hidePartnerName={hidePartnerName}
        hideArtistName={hideArtistName}
        hideSaleInfo={hideSaleInfo}
      />
    </Box>
  )
}
