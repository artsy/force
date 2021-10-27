import {
  Box,
  Image,
  Spacer,
  EntityHeader,
  Skeleton,
  SkeletonText,
  SkeletonBox,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext, useTracking } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { HomeTrendingArtistsRail_viewer } from "v2/__generated__/HomeTrendingArtistsRail_viewer.graphql"
import { HomeTrendingArtistsRailQuery } from "v2/__generated__/HomeTrendingArtistsRailQuery.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import {
  ActionType,
  ClickedArtistGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { FollowArtistButtonFragmentContainer } from "v2/Components/FollowButton/FollowArtistButton"
import { Rail } from "v2/Components/Rail"

interface HomeTrendingArtistsRailProps {
  viewer: HomeTrendingArtistsRail_viewer
}

const HomeTrendingArtistsRail: React.FC<HomeTrendingArtistsRailProps> = ({
  viewer,
}) => {
  const { trackEvent } = useTracking()
  const { user } = useSystemContext()
  const nodes = extractNodes(viewer.artistsConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <Rail
      alignItems="flex-start"
      title="Trending Artists on Artsy"
      viewAllLabel="View All Artists"
      viewAllHref="/artists"
      viewAllOnClick={() => {
        const trackingEvent: ClickedArtistGroup = {
          action: ActionType.clickedArtistGroup,
          context_module: ContextModule.trendingArtistsRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.artists,
          type: "viewAll",
        }
        trackEvent(trackingEvent)
      }}
      getItems={() => {
        return nodes.map(node => {
          return (
            <RouterLink
              to={node.href}
              textDecoration="none"
              onClick={() => {
                const trackingEvent: ClickedArtistGroup = {
                  action: ActionType.clickedArtistGroup,
                  context_module: ContextModule.trendingArtistsRail,
                  context_page_owner_type: OwnerType.home,
                  destination_page_owner_id: node.internalID,
                  destination_page_owner_slug: node.slug,
                  destination_page_owner_type: OwnerType.artist,
                  type: "thumbnail",
                }
                trackEvent(trackingEvent)
              }}
            >
              <Box width={325}>
                {node.image?.cropped?.src ? (
                  <Box>
                    <Image
                      src={node.image.cropped.src}
                      srcSet={node.image.cropped.srcSet}
                      width={node.image.cropped.width}
                      height={node.image.cropped.height}
                      alt=""
                      lazyLoad
                    />
                  </Box>
                ) : (
                  <Box bg="black30" width={325} height={230} />
                )}

                <Spacer mt={1} />

                <EntityHeader
                  name={node.name!}
                  meta={node.formattedNationalityAndBirthday!}
                  smallVariant
                  FollowButton={
                    <FollowArtistButtonFragmentContainer
                      user={user}
                      artist={node}
                      contextModule={ContextModule.artistHeader}
                      buttonProps={{
                        size: "small",
                        variant: "secondaryOutline",
                      }}
                      onClick={() => {
                        const trackingEvent: any = {
                          action: node.isFollowed
                            ? ActionType.unfollowedArtist
                            : ActionType.followedArtist,
                          context_module: ContextModule.trendingArtistsRail,
                          context_page_owner_type: OwnerType.home,
                        }
                        trackEvent(trackingEvent)
                      }}
                    />
                  }
                />
              </Box>
            </RouterLink>
          )
        })
      }}
    />
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Trending Artists on Artsy"
      viewAllLabel="View All Artists"
      viewAllHref="/artists"
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

export const HomeTrendingArtistsRailFragmentContainer = createFragmentContainer(
  HomeTrendingArtistsRail,
  {
    viewer: graphql`
      fragment HomeTrendingArtistsRail_viewer on Viewer {
        artistsConnection(sort: TRENDING_DESC, first: 99) {
          edges {
            node {
              ...FollowArtistButton_artist
              internalID
              isFollowed
              name
              slug
              href
              formattedNationalityAndBirthday
              image {
                cropped(width: 325, height: 230) {
                  src
                  srcSet
                  width
                  height
                }
              }
            }
          }
        }
      }
    `,
  }
)

export const HomeTrendingArtistsRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeTrendingArtistsRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeTrendingArtistsRailQuery {
          viewer {
            ...HomeTrendingArtistsRail_viewer
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.viewer) {
          return (
            <HomeTrendingArtistsRailFragmentContainer viewer={props.viewer} />
          )
        }

        return null
      }}
    />
  )
}
