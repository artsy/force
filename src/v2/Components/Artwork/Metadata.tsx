import { Metadata_artwork } from "v2/__generated__/Metadata_artwork.graphql"
import colors from "v2/Assets/Colors"
import { garamond } from "v2/Assets/Fonts"
import StyledTextLink from "v2/Components/TextLink"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { DetailsFragmentContainer as Details } from "./Details"

export interface MetadataProps extends React.HTMLProps<MetadataContainer> {
  artwork: Metadata_artwork
  extended?: boolean
}

export class MetadataContainer extends React.Component<MetadataProps> {
  static defaultProps = {
    extended: true,
  }

  render() {
    const { artwork, className, extended } = this.props

    return (
      <StyledTextLink href={artwork.href}>
        <div className={className}>
          <Details
            includeLinks={false}
            showSaleLine={extended}
            artwork={artwork}
          />
        </div>
      </StyledTextLink>
    )
  }
}

export const Metadata = styled(MetadataContainer)`
  ${garamond("s15")};
  color: ${colors.graySemibold};
  margin-top: 12px;
  text-align: left;
`

export default createFragmentContainer(Metadata, {
  artwork: graphql`
    fragment Metadata_artwork on Artwork {
      ...Details_artwork
      ...Contact_artwork
      href
    }
  `,
})
