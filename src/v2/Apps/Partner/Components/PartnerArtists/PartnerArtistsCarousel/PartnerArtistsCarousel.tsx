import React from "react"
import { Box, Text, Flex } from "@artsy/palette"
import { flatten } from "lodash"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { PartnerArtistsCarouselQuery } from "v2/__generated__/PartnerArtistsCarouselQuery.graphql"
import { PartnerArtistsCarousel_partner } from "v2/__generated__/PartnerArtistsCarousel_partner.graphql"
import {
  PartnerArtistsCarouselItemFragmentContainer,
  ResponsiveImage,
} from "./PartnerArtistsCarouselItem"
import { PartnerArtistsCarouselPlaceholder } from "./PartnerArtistsCarouselPlaceholder"
import { Carousel } from "../../Carousel"
import { ScrollToPartnerHeader } from "../../ScrollToPartnerHeader"

const PAGE_SIZE = 19

export interface PartnerArtistsCarouselProps {
  partner: PartnerArtistsCarousel_partner
}

export const PartnerArtistsCarousel: React.FC<PartnerArtistsCarouselProps> = ({
  partner,
}) => {
  if (!partner || !partner.artists || !partner.artists.edges) {
    return null
  }

  const { artists, slug } = partner

  return (
    <Carousel>
      {itemsPerViewport => {
        return flatten([
          artists.edges
            .filter(e => e.isDisplayOnPartnerProfile && e.counts.artworks > 0)
            .map(edge => {
              return (
                <PartnerArtistsCarouselItemFragmentContainer
                  key={edge.node.id}
                  artist={edge.node}
                  partnerArtistHref={`/partner2/${slug}/artists/${edge.node.slug}`}
                />
              )
            }),
          artists.edges.length > itemsPerViewport && (
            <Box width={[300, "100%"]}>
              <ScrollToPartnerHeader>
                <RouterLink to={`/partner2/${slug}/artists`}>
                  <ResponsiveImage>
                    <Flex
                      height="100%"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text style={{ textDecoration: "underline" }}>
                        See all artists
                      </Text>
                    </Flex>
                  </ResponsiveImage>
                </RouterLink>
              </ScrollToPartnerHeader>
            </Box>
          ),
        ])
      }}
    </Carousel>
  )
}

export const PARTNER_ARTISTS_CAROUSEL_QUERY = graphql`
  query PartnerArtistsCarouselQuery(
    $partnerId: String!
    $first: Int!
    $after: String
  ) {
    partner(id: $partnerId) @principalField {
      ...PartnerArtistsCarousel_partner @arguments(first: $first, after: $after)
    }
  }
`

export const PartnerArtistsCarouselFragmentContainer = createFragmentContainer(
  PartnerArtistsCarousel,
  {
    partner: graphql`
      fragment PartnerArtistsCarousel_partner on Partner
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 19 }
          after: { type: "String" }
        ) {
        slug
        artists: artistsConnection(first: $first, after: $after)
          @connection(key: "PartnerArtistsCarousel_artists") {
          edges {
            isDisplayOnPartnerProfile
            counts {
              artworks
            }
            node {
              id
              slug
              ...PartnerArtistsCarouselItem_artist
            }
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
    <QueryRenderer<PartnerArtistsCarouselQuery>
      environment={relayEnvironment}
      query={graphql`
        query PartnerArtistsCarouselRendererQuery($partnerId: String!) {
          partner(id: $partnerId) @principalField {
            ...PartnerArtistsCarousel_partner
          }
        }
      `}
      variables={{ partnerId, first: PAGE_SIZE, after: undefined }}
      render={({ error, props }) => {
        if (error || !props)
          return <PartnerArtistsCarouselPlaceholder count={PAGE_SIZE} />

        return <PartnerArtistsCarouselFragmentContainer {...rest} {...props} />
      }}
    />
  )
}
