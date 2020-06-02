import { Metadata_artwork } from "v2/__generated__/Metadata_artwork.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { DetailsFragmentContainer as Details } from "./Details"
import { Box, Link } from "@artsy/palette"

export interface MetadataProps extends React.HTMLProps<Metadata> {
  artwork: Metadata_artwork
  extended?: boolean
  hidePartnerName?: boolean
  hideArtistName?: boolean
  useLighterFont?: boolean
}

export class Metadata extends React.Component<MetadataProps> {
  static defaultProps = {
    extended: true,
  }

  render() {
    const {
      artwork,
      className,
      extended,
      hidePartnerName,
      hideArtistName,
      useLighterFont,
    } = this.props

    return (
      <Link href={artwork.href} underlineBehavior="none">
        <Box mt="12px" textAlign="left" className={className}>
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
