import { AuthContextModule } from "@artsy/cohesion"
import { Box, BoxProps } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "System/Router/RouterLink"
import { Metadata_artwork$data } from "__generated__/Metadata_artwork.graphql"
import {
  DetailsFragmentContainer,
  DetailsPlaceholder,
} from "Components/Artwork/Details"
import { useFeatureFlag } from "System/useFeatureFlag"

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
  showHoverDetails?: boolean
  showSaveButton?: boolean
  isMyCollectionArtwork?: boolean
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
      <DetailsFragmentContainer
        includeLinks={false}
        artwork={artwork}
        hideSaleInfo={hideSaleInfo}
        hidePartnerName={hidePartnerName}
        hideArtistName={hideArtistName}
        isHovered={isHovered}
        showHighDemandIcon={isMyCollectionArtwork}
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
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  if (!!disableRouterLinking) {
    return <DisabledLink mt={mt}>{rest.children}</DisabledLink>
  }

  // My collection artwork is a special case. We don't want to link to the standard artwork page,
  // but to a custom my collection artwork page.
  const to = !isMyCollectionArtwork
    ? artwork.href
    : isCollectorProfileEnabled
    ? `/collector-profile/my-collection/artwork/${artwork.internalID}`
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
