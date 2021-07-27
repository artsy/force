import { ContextModule, OwnerType } from "@artsy/cohesion"
import { EntityHeader, Image, Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ArtistFollowArtistButton } from "v2/Apps/Artist/Components/ArtistHeader/ArtistFollowArtistButton"
import { AnalyticsSchema, useAnalyticsContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { cropped } from "v2/Utils/resized"
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
        Related artists
      </Text>

      <Shelf alignItems="flex-start" data-test="relatedArtistsRail">
        {nodes.map((node, index) => {
          const artwork = extractNodes(node.filterArtworksConnection)?.[0]
          const image = cropped(artwork.image?.sourceUrl!, {
            width: 325,
            height: 230,
          })

          if (!image) {
            return <></>
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
              <>
                <Image
                  width={325}
                  height={230}
                  src={image.src}
                  srcSet={image.srcSet}
                />
                <Spacer my={1} />

                <EntityHeader
                  width={325}
                  name={node.name!}
                  imageUrl={
                    cropped(node?.image?.sourceUrl!, { width: 50, height: 50 })
                      .src
                  }
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
              </>
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
                        sourceUrl: url(version: ["larger", "large"])
                      }
                    }
                  }
                }
                image {
                  sourceUrl: url(version: "large")
                }
              }
            }
          }
        }
      }
    `,
  }
)
