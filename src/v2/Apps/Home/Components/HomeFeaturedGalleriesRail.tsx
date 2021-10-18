import {
  Box,
  Image,
  Spacer,
  EntityHeader,
  Skeleton,
  SkeletonText,
  SkeletonBox,
  Text,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext, useTracking } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { HomeFeaturedGalleriesRail_orderedSet } from "v2/__generated__/HomeFeaturedGalleriesRail_orderedSet.graphql"
import { HomeFeaturedGalleriesRailQuery } from "v2/__generated__/HomeFeaturedGalleriesRailQuery.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { FollowProfileButtonFragmentContainer } from "v2/Components/FollowButton/FollowProfileButton"
import {
  ActionType,
  ClickedGalleryGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Rail } from "v2/Components/Rail"

interface HomeFeaturedGalleriesRailProps {
  orderedSet: HomeFeaturedGalleriesRail_orderedSet
}

const HomeFeaturedGalleriesRail: React.FC<HomeFeaturedGalleriesRailProps> = ({
  orderedSet,
}) => {
  const { trackEvent } = useTracking()
  const { user } = useSystemContext()
  const nodes = extractNodes(orderedSet.orderedItemsConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <Rail
      title="Featured Galleries"
      countLabel={nodes.length}
      viewAllLabel="View All Galleries"
      viewAllHref="/galleries"
      viewAllOnClick={() => {
        const trackingEvent: ClickedGalleryGroup = {
          action: ActionType.clickedGalleryGroup,
          context_module: ContextModule.featuredGalleriesRail,
          context_page_owner_type: OwnerType.home,
          destination_page_owner_type: OwnerType.galleries,
          type: "viewAll",
        }
        trackEvent(trackingEvent)
      }}
      getItems={() => {
        return nodes.map((node, index) => {
          if (node.__typename !== "Profile") {
            return <></>
          }
          return (
            <RouterLink
              to={`/partner${node.href}`}
              textDecoration="none"
              key={index}
              onClick={() => {
                const trackingEvent: ClickedGalleryGroup = {
                  action: ActionType.clickedGalleryGroup,
                  context_module: ContextModule.featuredGalleriesRail,
                  context_page_owner_type: OwnerType.home,
                  destination_page_owner_id: node.internalID,
                  destination_page_owner_slug: node.slug,
                  destination_page_owner_type: OwnerType.galleries,
                  type: "thumbnail",
                }
                trackEvent(trackingEvent)
              }}
            >
              <Box width={325} key={index}>
                <EntityHeader
                  name={node.name!}
                  meta={node.location!}
                  smallVariant
                  FollowButton={
                    <FollowProfileButtonFragmentContainer
                      user={user}
                      profile={node}
                      contextModule={ContextModule.partnerHeader}
                      buttonProps={{
                        size: "small",
                        variant: "secondaryOutline",
                      }}
                      onClick={() => {
                        const trackingEvent: any = {
                          action: node.isFollowed
                            ? ActionType.unfollowedPartner
                            : ActionType.followedPartner,
                          context_module: ContextModule.featuredGalleriesRail,
                          context_owner_type: OwnerType.partner,
                        }
                        trackEvent(trackingEvent)
                      }}
                    />
                  }
                />

                <Spacer mt={1} />

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
                  <Text
                    variant="lg"
                    bg="black10"
                    width={325}
                    height={230}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {node.initials}
                  </Text>
                )}
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
      title="Featured Galleries"
      viewAllLabel="View All Galleries"
      viewAllHref="/galleries"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return (
            <Box width={325} key={i}>
              <SkeletonText variant="lg">Some Gallery</SkeletonText>
              <SkeletonText variant="md">Location</SkeletonText>
              <SkeletonBox width={325} height={230} />
            </Box>
          )
        })
      }}
    />
  </Skeleton>
)

export const HomeFeaturedGalleriesRailFragmentContainer = createFragmentContainer(
  HomeFeaturedGalleriesRail,
  {
    orderedSet: graphql`
      fragment HomeFeaturedGalleriesRail_orderedSet on OrderedSet {
        orderedItemsConnection(first: 20) {
          edges {
            node {
              __typename
              ... on Profile {
                ...FollowProfileButton_profile
                initials
                internalID
                isFollowed
                name
                slug
                href
                location
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
      }
    `,
  }
)

export const HomeFeaturedGalleriesRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeFeaturedGalleriesRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeFeaturedGalleriesRailQuery {
          orderedSet(id: "5638fdfb7261690296000031") {
            ...HomeFeaturedGalleriesRail_orderedSet
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

        if (props.orderedSet) {
          return (
            <HomeFeaturedGalleriesRailFragmentContainer
              orderedSet={props.orderedSet}
            />
          )
        }

        return null
      }}
    />
  )
}
