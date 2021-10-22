import {
  Box,
  Image,
  Text,
  Flex,
  Spacer,
  Skeleton,
  SkeletonText,
  SkeletonBox,
  ResponsiveBox,
} from "@artsy/palette"
import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext, useTracking } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { HomeCurrentFairs_viewer } from "v2/__generated__/HomeCurrentFairs_viewer.graphql"
import { HomeCurrentFairsQuery } from "v2/__generated__/HomeCurrentFairsQuery.graphql"
import {
  ActionType,
  ClickedFairGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { Masonry } from "v2/Components/Masonry"

interface HomeCurrentFairsProps {
  viewer: HomeCurrentFairs_viewer
}

const HomeCurrentFairs: React.FC<HomeCurrentFairsProps> = ({ viewer }) => {
  const { trackEvent } = useTracking()

  if (viewer.fairs?.length === 0) {
    return null
  }

  return (
    <HomeCurrentFairsContainer>
      <Masonry columnCount={[2, 2, 3]}>
        {viewer.fairs!.map((fair, index) => {
          if (!fair) {
            return <></>
          }

          return (
            <RouterLink
              to={fair.href}
              key={index}
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
              <Box>
                {fair.image?.cropped?.src && (
                  <ResponsiveBox
                    aspectWidth={fair.image.cropped.width}
                    aspectHeight={fair.image.cropped.height}
                    maxWidth="100%"
                    display="block"
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
              </Box>
              <Text variant="xl" mt={1}>
                {fair?.name}
              </Text>
              <Text variant="lg" color="black60">
                {fair.startAt} - {fair?.endAt}
              </Text>

              <Spacer mb={2} />
            </RouterLink>
          )
        })}
      </Masonry>
    </HomeCurrentFairsContainer>
  )
}

const HomeCurrentFairsContainer: React.FC = ({ children }) => {
  const { trackEvent } = useTracking()
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="xl">Current Fairs</Text>

        <Text
          variant="sm"
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
          View All Fairs
        </Text>
      </Flex>

      <Spacer mt={4} />

      {children}
    </>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <HomeCurrentFairsContainer>
      <Masonry columnCount={[2, 2, 3]}>
        {[...new Array(3)].map((_, i) => {
          return (
            <Box key={i}>
              <ResponsiveBox
                aspectWidth={540}
                aspectHeight={415}
                maxWidth="100%"
                display="block"
              >
                <SkeletonBox width="100%" height="100%" />
              </ResponsiveBox>
              <SkeletonText variant="xl" mt={1}>
                Some Gallery
              </SkeletonText>
              <SkeletonText variant="lg">Location</SkeletonText>
            </Box>
          )
        })}
      </Masonry>
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
          bannerSize
          image {
            cropped(width: 540, height: 415) {
              src
              srcSet
              width
              height
            }
          }
        }
      }
    `,
  }
)

export const HomeCurrentFairsQueryRenderer: React.FC = () => {
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
