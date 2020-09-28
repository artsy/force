import { Text } from "@artsy/palette"
import { ArtistBio_bio } from "v2/__generated__/ArtistBio_bio.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

export interface ArtistBioProps {
  bio: ArtistBio_bio
  onReadMoreClicked?: () => void
  maxChars?: number
}

export class ArtistBio extends React.Component<ArtistBioProps> {
  render() {
    const { bio } = this.props
    return (
      <Text variant="text">
        <BioSpan
          dangerouslySetInnerHTML={{
            __html: bio.biographyBlurb.text,
          }}
        />
      </Text>
    )
  }
}

export const ArtistBioFragmentContainer = createFragmentContainer(ArtistBio, {
  bio: graphql`
    fragment ArtistBio_bio on Artist {
      biographyBlurb: biographyBlurb(format: HTML, partnerBio: true) {
        text
      }
    }
  `,
})

/*
  Using dangerouslySetInnerHTML in our span adds an inline <p>.
  Here we make sure the inline <p> is formatted properly.
*/
const BioSpan = styled.span`
  > * {
    margin-block-start: 0;
    margin-block-end: 0;
    padding-bottom: 1em;
  }
  > *:last-child {
    display: inline;
  }
`
