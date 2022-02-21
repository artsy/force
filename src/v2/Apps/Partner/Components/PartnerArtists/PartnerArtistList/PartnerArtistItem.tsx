import * as React from "react"
import styled from "styled-components"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { PartnerArtistItem_artist$data } from "v2/__generated__/PartnerArtistItem_artist.graphql"
import { Text } from "@artsy/palette"
import { ScrollIntoViewProps } from "v2/Utils/scrollHelpers"
import { ScrollIntoView } from "v2/Utils"

const Name = styled(Text).attrs({ py: 0.5 })`
  display: inline-block;
  vertical-align: top;
  width: 100%;
`

export interface PartnerArtistItemProps {
  artist: PartnerArtistItem_artist$data
  hasPublishedArtworks: boolean
  partnerSlug: string
  scrollTo: ScrollIntoViewProps
  displayFullPartnerPage: boolean
}

export const PartnerArtistItem: React.FC<PartnerArtistItemProps> = ({
  artist: { name, slug, href },
  hasPublishedArtworks,
  partnerSlug,
  scrollTo,
  displayFullPartnerPage,
}) => {
  const artistHref = displayFullPartnerPage
    ? // TODO: Use partner.href instead after page migration
      `/partner/${partnerSlug}/artists/${slug}`
    : href || `/artists/${slug}`

  return hasPublishedArtworks ? (
    <ScrollIntoView {...scrollTo}>
      <RouterLink noUnderline to={artistHref}>
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
        href
      }
    `,
  }
)
