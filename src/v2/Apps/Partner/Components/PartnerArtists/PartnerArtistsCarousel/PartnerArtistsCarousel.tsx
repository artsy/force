import * as React from "react"
import { Box, Shelf } from "@artsy/palette"
import { compact } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { PartnerArtistsCarouselRendererQuery } from "v2/__generated__/PartnerArtistsCarouselRendererQuery.graphql"
import { PartnerArtistsCarousel_partner$data } from "v2/__generated__/PartnerArtistsCarousel_partner.graphql"
import { PartnerArtistsCarouselItemFragmentContainer } from "./PartnerArtistsCarouselItem"
import { PartnerArtistsCarouselPlaceholder } from "./PartnerArtistsCarouselPlaceholder"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

const PAGE_SIZE = 20

export interface PartnerArtistsCarouselProps {
  partner: PartnerArtistsCarousel_partner$data
}

export const PartnerArtistsCarousel: React.FC<PartnerArtistsCarouselProps> = ({
  partner,
}) => {
  if (
    !partner ||
    !partner.artistsConnection ||
    !partner.artistsConnection.edges
  ) {
    return null
  }

  const { artistsConnection, slug } = partner
  const artists = compact(artistsConnection.edges)

  return (
    <Shelf alignItems="flex-start">
      {artists.map(artist => (
        <Box maxWidth={320}>
          <PartnerArtistsCarouselItemFragmentContainer
            key={artist.node?.id}
            artist={artist!}
            partnerArtistHref={`/partner/${slug}/artists/${artist.node?.slug}`}
          />
        </Box>
      ))}
    </Shelf>
  )
}

export const PartnerArtistsCarouselFragmentContainer = createFragmentContainer(
  PartnerArtistsCarousel,
  {
    partner: graphql`
      fragment PartnerArtistsCarousel_partner on Partner {
        slug
        artistsConnection(
          first: 20
          hasPublishedArtworks: true
          displayOnPartnerProfile: true
        ) {
          edges {
            counts {
              artworks
            }
            node {
              id
              slug
            }
            ...PartnerArtistsCarouselItem_artist
          }
        }
      }
    `,
  }
)

export const PartnerArtistsCarouselRenderer: React.FC<{
  partnerId: string
}> = ({ partnerId, ...rest }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<PartnerArtistsCarouselRendererQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query PartnerArtistsCarouselRendererQuery($partnerId: String!) {
          partner(id: $partnerId) @principalField {
            ...PartnerArtistsCarousel_partner
          }
        }
      `}
      variables={{ partnerId }}
      placeholder={<PartnerArtistsCarouselPlaceholder count={PAGE_SIZE} />}
      render={({ error, props }) => {
        if (error || !props)
          return <PartnerArtistsCarouselPlaceholder count={PAGE_SIZE} />

        return (
          <PartnerArtistsCarouselFragmentContainer
            {...rest}
            partner={props.partner!}
          />
        )
      }}
    />
  )
}
