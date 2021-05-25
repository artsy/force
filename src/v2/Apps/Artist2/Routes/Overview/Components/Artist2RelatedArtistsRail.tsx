import { ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, EntityHeader, Image, Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { AnalyticsSchema, useAnalyticsContext } from "v2/Artsy"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { FollowArtistButtonFragmentContainer } from "v2/Components/FollowButton/FollowArtistButton"
import { extractNodes } from "v2/Utils/extractNodes"
import { Artist2RelatedArtistsRail_artist } from "v2/__generated__/Artist2RelatedArtistsRail_artist.graphql"

interface Artist2RelatedArtistsRailProps {
  artist: Artist2RelatedArtistsRail_artist
}

const Artist2RelatedArtistsRail: React.FC<Artist2RelatedArtistsRailProps> = ({
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
      <Text variant="lg" my={4}>
        Related Artists
      </Text>

      <Shelf alignItems="flex-start">
        {nodes.map((node, index) => {
          const artworkImage = extractNodes(node.filterArtworksConnection)[0]
            .image

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
              <Box
                minWidth={artworkImage?.resized?.width}
                minHeight={artworkImage?.resized?.height}
              >
                <Image
                  width={artworkImage?.resized?.width}
                  height={artworkImage?.resized?.height}
                  src={artworkImage?.resized?.src!}
                  srcSet={artworkImage?.resized?.srcSet}
                  style={{ objectFit: "contain" }}
                  lazyLoad
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
                    <FollowArtistButtonFragmentContainer
                      artist={artist}
                      contextModule={ContextModule.featuredArtistsRail}
                      buttonProps={{
                        size: "small",
                        variant: "secondaryOutline",
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

export const Artist2RelatedArtistsRailFragmentContainer = createFragmentContainer(
  Artist2RelatedArtistsRail,
  {
    artist: graphql`
      fragment Artist2RelatedArtistsRail_artist on Artist {
        ...FollowArtistButton_artist
        name
        href
        related {
          artistsConnection(kind: MAIN, first: 20) {
            edges {
              node {
                name
                href
                internalID
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
