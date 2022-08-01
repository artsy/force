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
  hidePartnerName?: boolean
  hideArtistName?: boolean
  hideSaleInfo?: boolean
  isHovered?: boolean
  showHoverDetails?: boolean
  disableRouterLinking?: boolean
  showSaveButton?: boolean
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
  showHoverDetails,
  showSaveButton,
  contextModule,
  disableRouterLinking,
  ...rest
}) => {
  const [linkTo, setLinkTo] = React.useState(artwork.href)

  React.useEffect(() => {
    if (!!disableRouterLinking) {
      setLinkTo(window.location.href)
    } else {
      if (linkTo !== artwork.href) {
        setLinkTo(artwork.href)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disableRouterLinking])

  const LinkContainer = disableRouterLinking ? DisabledLink : RouterLink

  return (
    <LinkContainer
      to={linkTo}
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
  cursor: not-allowed;
`

export default createFragmentContainer(Metadata, {
  artwork: graphql`
    fragment Metadata_artwork on Artwork {
      ...Details_artwork
      href
    }
  `,
})
