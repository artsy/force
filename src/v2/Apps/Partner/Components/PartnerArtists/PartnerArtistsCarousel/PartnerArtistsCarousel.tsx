import {
  Box,
  Carousel,
  CarouselCell,
  CarouselRail,
  Text,
  Flex,
  media,
  Swiper,
  themeProps,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import styled from "styled-components"
import { useSystemContext } from "v2/Artsy"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { useMatchMedia } from "v2/Utils/Hooks/useMatchMedia"
import { Media } from "v2/Utils/Responsive"
import { PartnerArtistsCarouselQuery } from "v2/__generated__/PartnerArtistsCarouselQuery.graphql"
import { PartnerArtistsCarousel_partner } from "v2/__generated__/PartnerArtistsCarousel_partner.graphql"
import {
  PartnerArtistsCarouselItemFragmentContainer,
  ResponsiveImage,
} from "./PartnerArtistsCarouselItem"
import { PartnerArtistsCarouselPlaceholder } from "./PartnerArtistsCarouselPlaceholder"

const ArtistCarouselRail = styled(CarouselRail)`
  li {
    // 4 items per viewport
    flex-basis: calc((100% - 3 * 20px) / 4);
    flex-grow: 0;
    flex-shrink: 0;
    box-sizing: initial;
  }

  ${media.lg`
    li {
      // 3 items per viewport
      flex-basis: calc((100% - 2 * 20px) / 3);
    }
  `};

  ${media.md`
    li {
      // 2 items per viewport
      flex-basis: calc((100% - 20px) / 2);
    }
  `};
`

const PAGE_SIZE = 19

export interface PartnerArtistsCarouselProps {
  partner: PartnerArtistsCarousel_partner
}

export const PartnerArtistsCarouselContainer: React.FC = ({ children }) => {
  return (
    <>
      <Media greaterThan="xs">
        <Carousel
          Rail={props => {
            return <ArtistCarouselRail {...props} />
          }}
          Cell={React.forwardRef((props, ref) => {
            return (
              <CarouselCell {...props} ref={ref as any} display="inline-flex" />
            )
          })}
        >
          {children as JSX.Element}
        </Carousel>
      </Media>
      <Media at="xs">
        <Swiper>{children as JSX.Element}</Swiper>
      </Media>
    </>
  )
}

export const PartnerArtistsCarousel: React.FC<PartnerArtistsCarouselProps> = ({
  partner,
}) => {
  const xs = useMatchMedia(themeProps.mediaQueries.xs)
  const sm = useMatchMedia(themeProps.mediaQueries.sm)
  const md = useMatchMedia(themeProps.mediaQueries.md)

  if (!partner || !partner.artists || !partner.artists.edges) {
    return null
  }

  const { artists, slug } = partner

  const hasMoreArtists =
    ((xs || sm) && artists.edges.length > 2) ||
    (md && artists.edges.length > 3) ||
    artists.edges.length > 4

  return (
    <PartnerArtistsCarouselContainer>
      {artists.edges
        .filter(e => e.isDisplayOnPartnerProfile && e.counts.artworks > 0)
        .map(edge => {
          return (
            <PartnerArtistsCarouselItemFragmentContainer
              key={edge.node.id}
              artist={edge.node}
              partnerArtistHref={`/partner2/${slug}/artists/${edge.node.slug}`}
            />
          )
        })}

      {hasMoreArtists && (
        <Box width={[300, "100%"]} key="see-all-artists-button">
          <ResponsiveImage>
            <Flex height="100%" alignItems="center" justifyContent="center">
              <RouterLink to={`/partner2/${slug}/artists`}>
                <Text>See all artists</Text>
              </RouterLink>
            </Flex>
          </ResponsiveImage>
        </Box>
      )}
    </PartnerArtistsCarouselContainer>
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
