import {
  ActionType,
  type ClickedFairGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import {
  Column,
  Flex,
  GridColumns,
  Image,
  ResponsiveBox,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
  Text,
} from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { HomeCurrentFairsQuery } from "__generated__/HomeCurrentFairsQuery.graphql"
import type { HomeCurrentFairs_viewer$data } from "__generated__/HomeCurrentFairs_viewer.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface HomeCurrentFairsProps {
  viewer: HomeCurrentFairs_viewer$data
}

const HomeCurrentFairs: React.FC<
  React.PropsWithChildren<HomeCurrentFairsProps>
> = ({ viewer }) => {
  const { trackEvent } = useTracking()

  if (!viewer.fairs?.length) {
    return null
  }

  return (
    <HomeCurrentFairsContainer>
      <GridColumns gridRowGap={4}>
        {viewer.fairs.map((fair, index) => {
          if (!fair) return null

          return (
            <Column key={index} span={[6, 4]}>
              <RouterLink
                to={fair.href}
                textDecoration="none"
                display="block"
                onClick={() => {
                  const trackingEvent: ClickedFairGroup = {
                    action: ActionType.clickedFairGroup,
                    context_module: ContextModule.fairRail,
                    context_page_owner_type: OwnerType.home,
                    destination_page_owner_id: fair.internalID,
                    destination_page_owner_slug: fair.slug,
                    destination_page_owner_type: OwnerType.fair,
                    type: "thumbnail",
                  }
                  trackEvent(trackingEvent)
                }}
              >
                {fair.image?.cropped?.src && (
                  <ResponsiveBox
                    aspectWidth={fair.image.cropped.width}
                    aspectHeight={fair.image.cropped.height}
                    maxWidth="100%"
                  >
                    <Image
                      width="100%"
                      height="100%"
                      src={fair.image.cropped.src}
                      srcSet={fair.image.cropped.srcSet}
                      style={{ display: "block" }}
                      alt=""
                      lazyLoad
                    />
                  </ResponsiveBox>
                )}

                <Text variant="lg-display" overflowEllipsis mt={1}>
                  {fair.name}
                </Text>

                <Text variant="sm-display" color="mono60">
                  {fair.exhibitionPeriod}
                </Text>
              </RouterLink>
            </Column>
          )
        })}
      </GridColumns>
    </HomeCurrentFairsContainer>
  )
}

const HomeCurrentFairsContainer: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const { trackEvent } = useTracking()
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="lg">Current Fairs & Events</Text>

        <Text
          variant="sm"
          textAlign="right"
          as={RouterLink}
          // @ts-ignore
          to="/art-fairs"
          onClick={() => {
            const trackingEvent: ClickedFairGroup = {
              action: ActionType.clickedFairGroup,
              context_module: ContextModule.fairRail,
              context_page_owner_type: OwnerType.home,
              destination_page_owner_type: OwnerType.fairs,
              type: "viewAll",
            }
            trackEvent(trackingEvent)
          }}
        >
          View All Fairs & Events
        </Text>
      </Flex>

      <Spacer y={4} />

      {children}
    </>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <HomeCurrentFairsContainer>
      <GridColumns>
        {[...new Array(6)].map((_, i) => {
          return (
            <Column key={i} span={[6, 4]}>
              <ResponsiveBox aspectWidth={4} aspectHeight={3} maxWidth="100%">
                <SkeletonBox width="100%" height="100%" />
              </ResponsiveBox>

              <SkeletonText variant={["lg-display", "xl"]} mt={1}>
                Name of Fair 0000
              </SkeletonText>

              <SkeletonText variant={["sm-display", "lg-display"]}>
                Jan 00th – Jan 00th 0000
              </SkeletonText>
            </Column>
          )
        })}
      </GridColumns>
    </HomeCurrentFairsContainer>
  </Skeleton>
)

export const HomeCurrentFairsFragmentContainer = createFragmentContainer(
  HomeCurrentFairs,
  {
    viewer: graphql`
      fragment HomeCurrentFairs_viewer on Viewer {
        fairs(
          hasListing: true
          hasFullFeature: true
          sort: START_AT_DESC
          size: 25
          status: RUNNING
        ) {
          internalID
          slug
          bannerSize
          isPublished
          profile {
            isPublished
          }
          href
          name
          startAt(format: "MMM Do")
          endAt(format: "MMM Do YYYY")
          exhibitionPeriod
          bannerSize
          image {
            # 4:3 aspect ratio
            cropped(
              width: 600
              height: 450
              version: ["wide", "large_rectangle"]
            ) {
              src
              srcSet
              width
              height
            }
          }
        }
      }
    `,
  },
)

export const HomeCurrentFairsQueryRenderer: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeCurrentFairsQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeCurrentFairsQuery {
          viewer {
            ...HomeCurrentFairs_viewer
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
          return <HomeCurrentFairsFragmentContainer viewer={props.viewer} />
        }

        return null
      }}
    />
  )
}
