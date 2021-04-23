import {
  Box,
  Carousel,
  CarouselCell,
  Text,
  Flex,
  Swiper,
  CarouselProps,
} from "@artsy/palette"
import { flatten } from "lodash"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { useSystemContext } from "v2/Artsy"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"
import { PartnerArtistsCarouselQuery } from "v2/__generated__/PartnerArtistsCarouselQuery.graphql"
import { PartnerArtistsCarousel_partner } from "v2/__generated__/PartnerArtistsCarousel_partner.graphql"
import {
  PartnerArtistsCarouselItemFragmentContainer,
  ResponsiveImage,
} from "./PartnerArtistsCarouselItem"
import { PartnerArtistsCarouselPlaceholder } from "./PartnerArtistsCarouselPlaceholder"

const PAGE_SIZE = 19

const DesktopCarousel: React.FC<
  CarouselProps & { itemsPerViewport: number }
> = ({ children, itemsPerViewport, ...rest }) => {
  return (
    <Carousel
      Cell={React.forwardRef((props, ref) => {
        return (
          <CarouselCell
            display="inline-flex"
            flexGrow={0}
            flexShrink={0}
            style={{
              boxSizing: "initial",
              flexBasis: `calc((100% - ${
                itemsPerViewport - 1
              } * 20px) / ${itemsPerViewport})`,
            }}
            {...props}
            ref={ref as any}
          />
        )
      })}
      {...rest}
    >
      {children}
    </Carousel>
  )
}

export interface PartnerArtistsCarouselProps {
  partner: PartnerArtistsCarousel_partner
}

export interface PartnerArtistsCarouselContainerProps {
  children: (itemsPerViewport: number) => JSX.Element | JSX.Element[]
}

export const PartnerArtistsCarouselContainer: React.FC<PartnerArtistsCarouselContainerProps> = ({
  children,
}) => {
  return (
    <>
      <Media greaterThan="md">
        <DesktopCarousel itemsPerViewport={4}>{children(4)}</DesktopCarousel>
      </Media>
      <Media at="md">
        <DesktopCarousel itemsPerViewport={3}>{children(3)}</DesktopCarousel>
      </Media>
      <Media at="sm">
        <DesktopCarousel itemsPerViewport={2}>{children(2)}</DesktopCarousel>
      </Media>
      <Media at="xs">
        <Swiper>{children(2)}</Swiper>
      </Media>
    </>
  )
}

export const PartnerArtistsCarousel: React.FC<PartnerArtistsCarouselProps> = ({
  partner,
}) => {
  if (!partner || !partner.artists || !partner.artists.edges) {
    return null
  }

  const { artists, slug } = partner

  return (
    <PartnerArtistsCarouselContainer>
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
              <ResponsiveImage>
                <Flex height="100%" alignItems="center" justifyContent="center">
                  <RouterLink to={`/partner2/${slug}/artists`}>
                    <Text>See all artists</Text>
                  </RouterLink>
                </Flex>
              </ResponsiveImage>
            </Box>
          ),
        ])
      }}
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
