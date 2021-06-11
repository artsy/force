import { ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, EntityHeader, Image, Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ArtistFollowArtistButton } from "v2/Apps/Artist/Components/ArtistHeader/ArtistFollowArtistButton"
import { AnalyticsSchema, useAnalyticsContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistRelatedArtistsRail_artist } from "v2/__generated__/ArtistRelatedArtistsRail_artist.graphql"

interface ArtistRelatedArtistsRailProps {
  artist: ArtistRelatedArtistsRail_artist
}

const ArtistRelatedArtistsRail: React.FC<ArtistRelatedArtistsRailProps> = ({
  artist,
}) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const nodes = extractNodes(artist?.related?.artistsConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <>
      <Text variant="lg" mb={4} as="h2">
        Related Artists
      </Text>

      <Shelf alignItems="flex-start" data-test="relatedArtistsRail">
        {nodes.map((node, index) => {
          const artworkImage = extractNodes(node.filterArtworksConnection)?.[0]
            ?.image

          if (!artworkImage) {
            return null as any
          }

          return (
            <RouterLink
              to={node.href!}
              key={index}
              noUnderline
              onClick={() => {
                tracking.trackEvent({
                  action_type: AnalyticsSchema.ActionType.Click,
                  contextModule: ContextModule.relatedArtistsRail,
                  contextPageOwnerId,
                  contextPageOwnerSlug,
                  contextPageOwnerType,
                  destination_path: node.href,
                  destinationPageOwnerId: node.internalID,
                  destinationPageOwnerSlug: node.slug,
                  destinationPageOwnerType: OwnerType.artwork,
                  horizontalSlidePosition: index + 1,
                  type: "thumbnail",
                })
              }}
            >
              <Box>
                <Image
                  width={325}
                  maxHeight={230}
                  height={230}
                  src={artworkImage?.resized?.src!}
                  srcSet={artworkImage?.resized?.srcSet}
                  style={{ objectFit: "cover" }}
                />
                <Spacer my={1} />

                <EntityHeader
                  width={325}
                  name={node.name!}
                  imageUrl={node?.image?.resized?.url}
                  href={`/artist/${node.slug}`}
                  meta={
                    node.nationality && node.birthday
                      ? `${node.nationality}, b. ${node.birthday}`
                      : undefined
                  }
                  FollowButton={
                    <ArtistFollowArtistButton
                      artist={{
                        internalID: node.internalID,
                        slug: node.slug,
                        name: node.name,
                        isFollowed: node.isFollowed,
                        " $refType": "ArtistFollowArtistButton_artist",
                      }}
                      contextModule={ContextModule.featuredArtistsRail}
                      buttonProps={{
                        size: "small",
                        variant: "secondaryOutline",
                        width: null,
                      }}
                    />
                  }
                />
              </Box>
            </RouterLink>
          )
        })}
      </Shelf>
    </>
  )
}

export const ArtistRelatedArtistsRailFragmentContainer = createFragmentContainer(
  ArtistRelatedArtistsRail,
  {
    artist: graphql`
      fragment ArtistRelatedArtistsRail_artist on Artist {
        ...ArtistFollowArtistButton_artist
        name
        href
        related {
          artistsConnection(kind: MAIN, first: 20) {
            edges {
              node {
                name
                href
                internalID
                isFollowed
                slug
                nationality
                birthday
                filterArtworksConnection(
                  sort: "-weighted_iconicity"
                  first: 1
                ) {
                  edges {
                    node {
                      internalID
                      slug

                      image {
                        resized(width: 325, height: 230) {
                          width
                          height
                          src
                          srcSet
                        }
                      }
                    }
                  }
                }

                image {
                  resized(width: 50, height: 50) {
                    url
                  }
                }
              }
            }
          }
        }
      }
    `,
  }
)
