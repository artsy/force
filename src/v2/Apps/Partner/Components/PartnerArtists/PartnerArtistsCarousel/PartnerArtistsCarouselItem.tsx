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
import { RouterLink } from "v2/System/Router/RouterLink"
import { FollowArtistButtonFragmentContainer } from "v2/Components/FollowButton/FollowArtistButton"
import { PartnerArtistsCarouselItem_artist } from "v2/__generated__/PartnerArtistsCarouselItem_artist.graphql"
import { extractNodes } from "v2/Utils/extractNodes"

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
  const artwork = extractNodes(artist.artworksConnection)

  if (!artist || !artist.node || artwork.length === 0) return null

  return (
    <Box width={[300, "100%"]}>
      <ResponsiveImage>
        <RouterLink to={partnerArtistHref}>
          {artwork[0].image?.cropped && (
            <Image
              src={artwork[0].image.cropped.src}
              srcSet={artwork[0].image.cropped.srcSet}
              width="100%"
              height="100%"
            />
          )}
        </RouterLink>
      </ResponsiveImage>

      <Flex mt={1} justifyContent="space-between">
        <EntityHeader
          imageUrl={artist.node.image?.cropped?.url || ""}
          name={artist.node.name || ""}
          meta={artist.node.formattedNationalityAndBirthday || undefined}
          href={partnerArtistHref}
        />
        <FollowArtistButtonFragmentContainer
          artist={artist.node!}
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
      fragment PartnerArtistsCarouselItem_artist on ArtistPartnerEdge {
        artworksConnection(first: 1) {
          edges {
            node {
              image {
                cropped(height: 200, width: 300) {
                  src
                  srcSet
                }
              }
            }
          }
        }
        node {
          id
          name
          formattedNationalityAndBirthday
          ...FollowArtistButton_artist
          image {
            cropped(width: 100, height: 100) {
              url
            }
          }
        }
      }
    `,
  }
)
