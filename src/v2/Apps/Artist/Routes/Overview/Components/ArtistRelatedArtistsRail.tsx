import { ContextModule, OwnerType } from "@artsy/cohesion"
import {
  Box,
  EntityHeader,
  Image,
  Skeleton,
  SkeletonBox,
  SkeletonText,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { FollowArtistButtonFragmentContainer } from "v2/Components/FollowButton/FollowArtistButton"
import { Rail } from "v2/Components/Rail"
import {
  AnalyticsSchema,
  useAnalyticsContext,
  useSystemContext,
} from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistRelatedArtistsRail_artist$data } from "v2/__generated__/ArtistRelatedArtistsRail_artist.graphql"
import { ArtistRelatedArtistsRailQuery } from "v2/__generated__/ArtistRelatedArtistsRailQuery.graphql"

interface ArtistRelatedArtistsRailProps {
  artist: ArtistRelatedArtistsRail_artist$data
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
    <Box data-test="relatedArtistsRail">
      <Rail
        title="Related Artists"
        alignItems="flex-start"
        getItems={() => {
          return nodes.map((node, index) => {
            const artworkImage = extractNodes(
              node.filterArtworksConnection
            )?.[0]?.image

            if (!artworkImage) {
              return null as any
            }

            return (
              <React.Fragment key={index}>
                <RouterLink
                  to={node.href}
                  display="block"
                  textDecoration="none"
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
                  <Image
                    width={325}
                    maxHeight={230}
                    height={230}
                    src={artworkImage?.cropped?.src}
                    srcSet={artworkImage?.cropped?.srcSet}
                    lazyLoad
                    alt=""
                  />
                </RouterLink>

                <EntityHeader
                  mt={1}
                  width={325}
                  name={node.name!}
                  imageUrl={node?.image?.cropped?.url}
                  href={`/artist/${node.slug}`}
                  meta={
                    node.nationality && node.birthday
                      ? `${node.nationality}, b. ${node.birthday}`
                      : undefined
                  }
                  FollowButton={
                    <FollowArtistButtonFragmentContainer
                      artist={node}
                      contextModule={ContextModule.featuredArtistsRail}
                      buttonProps={{
                        size: "small",
                        variant: "secondaryOutline",
                        width: null,
                      }}
                    />
                  }
                />
              </React.Fragment>
            )
          })
        }}
      />
    </Box>
  )
}

export const ArtistRelatedArtistsRailFragmentContainer = createFragmentContainer(
  ArtistRelatedArtistsRail,
  {
    artist: graphql`
      fragment ArtistRelatedArtistsRail_artist on Artist {
        name
        href
        related {
          artistsConnection(kind: MAIN, first: 20) {
            edges {
              node {
                ...FollowArtistButton_artist
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
                        cropped(width: 325, height: 230) {
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
                  cropped(width: 50, height: 50) {
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

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Related Artists"
      viewAllLabel="View All Articles"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return (
            <Box width={325} key={i}>
              <SkeletonBox width={325} height={230} />
              <SkeletonText variant="lg">Some Artist</SkeletonText>
              <SkeletonText variant="md">Location</SkeletonText>
            </Box>
          )
        })
      }}
    />
  </Skeleton>
)

export const ArtistRelatedArtistsRailQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="ArtistRelatedArtistsRailQueryRenderer">
      <SystemQueryRenderer<ArtistRelatedArtistsRailQuery>
        lazyLoad
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query ArtistRelatedArtistsRailQuery($slug: String!) {
            artist(id: $slug) {
              ...ArtistRelatedArtistsRail_artist
            }
          }
        `}
        render={({ error, props }) => {
          if (error) {
            console.error(error)
            return null
          }
          if (!props) {
            return PLACEHOLDER
          }
          if (props.artist) {
            return (
              <ArtistRelatedArtistsRailFragmentContainer
                artist={props.artist}
              />
            )
          }
        }}
      />
    </Box>
  )
}
