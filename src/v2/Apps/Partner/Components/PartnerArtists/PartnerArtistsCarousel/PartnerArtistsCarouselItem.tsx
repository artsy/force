import * as React from "react"
import { Image, EntityHeader, Flex } from "@artsy/palette"
import { ContextModule } from "@artsy/cohesion"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { FollowArtistButtonFragmentContainer } from "v2/Components/FollowButton/FollowArtistButton"
import { PartnerArtistsCarouselItem_artist$data } from "v2/__generated__/PartnerArtistsCarouselItem_artist.graphql"
import { extractNodes } from "v2/Utils/extractNodes"

export interface PartnerArtistsCarouselItemProps {
  artist: PartnerArtistsCarouselItem_artist$data
  partnerArtistHref: string
}

export const PartnerArtistsCarouselItem: React.FC<PartnerArtistsCarouselItemProps> = ({
  artist,
  partnerArtistHref,
}) => {
  const artwork = extractNodes(artist.artworksConnection)

  if (!artist || !artist.node || artwork.length === 0) return null

  return (
    <>
      <RouterLink to={partnerArtistHref}>
        <Image
          lazyLoad
          width={artwork[0].image?.cropped?.width ?? 320}
          height={artwork[0].image?.cropped?.height ?? 240}
          src={artwork[0].image?.cropped?.src}
          srcSet={artwork[0].image?.cropped?.srcSet}
        />
      </RouterLink>

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
          }}
        />
      </Flex>
    </>
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
                cropped(width: 320, height: 240) {
                  src
                  srcSet
                  height
                  width
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
