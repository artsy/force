import { Metadata_artwork } from "v2/__generated__/Metadata_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { DetailsFragmentContainer as Details } from "./Details"
import { Box, BoxProps, Link } from "@artsy/palette"

export interface MetadataProps extends BoxProps {
  artwork: Metadata_artwork
  extended?: boolean
  hidePartnerName?: boolean
  hideArtistName?: boolean
  useLighterFont?: boolean
  className?: string
}

export class Metadata extends React.Component<MetadataProps> {
  static defaultProps = {
    extended: true,
    mt: "12px",
  }

  render() {
    const {
      artwork,
      className,
      extended,
      hidePartnerName,
      hideArtistName,
      useLighterFont,
      ...boxProps
    } = this.props

    return (
      <Link href={artwork.href} underlineBehavior="none">
        <Box textAlign="left" className={className} {...(boxProps as any)}>
          <Details
            includeLinks={false}
            showSaleLine={extended}
            artwork={artwork}
            hidePartnerName={hidePartnerName}
            hideArtistName={hideArtistName}
            useLighterFont={useLighterFont}
          />
        </Box>
      </Link>
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
