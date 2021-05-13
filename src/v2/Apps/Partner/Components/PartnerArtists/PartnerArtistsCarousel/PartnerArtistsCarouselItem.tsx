import React from "react"
import styled from "styled-components"
import {
  Box,
  ResponsiveBox,
  Image,
  EntityHeader,
  Flex,
  space,
} from "@artsy/palette"
import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { FollowArtistButtonFragmentContainer } from "v2/Components/FollowButton/FollowArtistButton"
import { PartnerArtistsCarouselItem_artist } from "v2/__generated__/PartnerArtistsCarouselItem_artist.graphql"

export const ResponsiveImage = styled(ResponsiveBox).attrs({
  aspectWidth: 3,
  aspectHeight: 2,
  maxWidth: "100%",
  maxHeight: "100%",
  width: "100%",
  bg: "black10",
})<any>``

export interface PartnerArtistsCarouselItemProps {
  artist: PartnerArtistsCarouselItem_artist
  partnerArtistHref: string
}

export const PartnerArtistsCarouselItem: React.FC<PartnerArtistsCarouselItemProps> = ({
  artist,
  partnerArtistHref,
}) => {
  // @ts-expect-error STRICT_NULL_CHECK
  if (!artist || artist.filterArtworksConnection.edges.length === 0) return null

  // @ts-expect-error STRICT_NULL_CHECK
  const artwork = artist.filterArtworksConnection.edges[0].node

  return (
    <Box width={[300, "100%"]}>
      <ResponsiveImage>
        <RouterLink to={partnerArtistHref}>
          <Image
            // @ts-expect-error STRICT_NULL_CHECK
            src={artwork.image.cropped.src}
            // @ts-expect-error STRICT_NULL_CHECK
            srcSet={artwork.image.cropped.srcSet}
            width="100%"
            height="100%"
          />
        </RouterLink>
      </ResponsiveImage>

      <Flex mt={1} justifyContent="space-between">
        <EntityHeader
          // @ts-expect-error STRICT_NULL_CHECK
          imageUrl={artist.image.cropped.url || ""}
          // @ts-expect-error STRICT_NULL_CHECK
          name={artist.name}
          // @ts-expect-error STRICT_NULL_CHECK
          meta={artist.formattedNationalityAndBirthday}
          href={partnerArtistHref}
        />
        <FollowArtistButtonFragmentContainer
          artist={artist}
          contextModule={ContextModule.recommendedArtistsRail}
          buttonProps={{
            variant: "secondaryOutline",
            size: "small",
            width: [space(5), space(3)],
          }}
        />
      </Flex>
    </Box>
  )
}

export const PartnerArtistsCarouselItemFragmentContainer = createFragmentContainer(
  PartnerArtistsCarouselItem,
  {
    artist: graphql`
      fragment PartnerArtistsCarouselItem_artist on Artist {
        id
        name
        formattedNationalityAndBirthday
        ...FollowArtistButton_artist
        image {
          cropped(width: 100, height: 100) {
            url
          }
        }
        filterArtworksConnection(first: 1, partnerIDs: [$partnerId]) {
          edges {
            node {
              id
              image {
                cropped(height: 200, width: 300) {
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    `,
  }
)
