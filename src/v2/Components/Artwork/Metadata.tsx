import { Metadata_artwork } from "v2/__generated__/Metadata_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { DetailsFragmentContainer as Details } from "./Details"
import { Box, BoxProps } from "@artsy/palette"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

export interface MetadataProps extends BoxProps {
  artwork: Metadata_artwork
  extended?: boolean
  hidePartnerName?: boolean
  hideArtistName?: boolean
  hideSaleInfo?: boolean
  className?: string
}

export class Metadata extends React.Component<MetadataProps> {
  static defaultProps = {
    extended: true,
    mt: 1,
  }

  render() {
    const {
      artwork,
      className,
      extended,
      hidePartnerName,
      hideArtistName,
      hideSaleInfo,
      ...boxProps
    } = this.props

    return (
      // @ts-expect-error STRICT_NULL_CHECK
      <RouterLink to={artwork.href} noUnderline>
        <Box textAlign="left" className={className} {...(boxProps as any)}>
          <Details
            includeLinks={false}
            artwork={artwork}
            hideSaleInfo={hideSaleInfo}
            hidePartnerName={hidePartnerName}
            hideArtistName={hideArtistName}
          />
        </Box>
      </RouterLink>
    )
  }
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
