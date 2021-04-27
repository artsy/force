import React from "react"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { PartnerArtistItem_artist } from "v2/__generated__/PartnerArtistItem_artist.graphql"
import { Text } from "@artsy/palette"
import { ScrollIntoViewProps } from "v2/Utils/scrollHelpers"
import { ScrollIntoView } from "v2/Utils"

const Name = styled(Text).attrs({ py: 0.5 })`
  display: inline-block;
  vertical-align: top;
  width: 100%;
`

export interface PartnerArtistItemProps {
  artist: PartnerArtistItem_artist
  hasPublishedArtworks: boolean
  partnerSlug: string
  scrollTo: ScrollIntoViewProps
}

export const PartnerArtistItem: React.FC<PartnerArtistItemProps> = ({
  artist: { name, slug },
  hasPublishedArtworks,
  partnerSlug,
  scrollTo,
}) => {
  return hasPublishedArtworks ? (
    <ScrollIntoView {...scrollTo}>
      <RouterLink noUnderline to={`/partner2/${partnerSlug}/artists/${slug}`}>
        <Name color="black100">{name}</Name>
      </RouterLink>
    </ScrollIntoView>
  ) : (
    <Name color="black60">{name}</Name>
  )
}

export const PartnerArtistItemFragmentContainer = createFragmentContainer(
  PartnerArtistItem,
  {
    artist: graphql`
      fragment PartnerArtistItem_artist on Artist {
        name
        slug
      }
    `,
  }
)
