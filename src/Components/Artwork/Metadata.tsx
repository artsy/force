import {
  DetailsFragmentContainer,
  DetailsPlaceholder,
} from "Components/Artwork/Details/Details"
import { RouterLink } from "System/Components/RouterLink"
import type { AuthContextModule } from "@artsy/cohesion"
import { Box, type BoxProps } from "@artsy/palette"
import type { Metadata_artwork$data } from "__generated__/Metadata_artwork.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

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
  showSubmissionStatus?: boolean
  to?: string | null
  renderSaveButton?: (artworkId: string) => React.ReactNode
}

export const Metadata: React.FC<React.PropsWithChildren<MetadataProps>> = ({
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
  showSubmissionStatus,
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
        showSubmissionStatus={showSubmissionStatus}
        contextModule={contextModule}
        renderSaveButton={renderSaveButton}
      />
    </LinkContainer>
  )
}

const LinkContainer: React.FC<
  React.PropsWithChildren<Omit<MetadataProps, "children">>
> = ({ artwork, disableRouterLinking, mt, to, ...rest }) => {
  if (!!disableRouterLinking) {
    return <DisabledLink mt={mt}>{rest.children}</DisabledLink>
  }

  const enablePrefetch = !artwork.sale?.isOpen

  return (
    <RouterLink
      to={to !== undefined ? to : artwork.href}
      display="block"
      textDecoration="none"
      textAlign="left"
      mt={mt}
      data-testid="metadata-artwork-link"
      enablePrefetch={enablePrefetch}
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
      sale {
        isOpen
      }
    }
  `,
})

type MetadataPlaceholderProps = Pick<
  MetadataProps,
  "hidePartnerName" | "hideArtistName" | "hideSaleInfo"
> &
  BoxProps

export const MetadataPlaceholder: React.FC<
  React.PropsWithChildren<MetadataPlaceholderProps>
> = ({ mt = 1, hidePartnerName, hideArtistName, hideSaleInfo, ...rest }) => {
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
