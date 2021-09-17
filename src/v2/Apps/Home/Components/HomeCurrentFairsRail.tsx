import {
  Box,
  Image,
  Text,
  Flex,
  Spacer,
  Shelf,
  Skeleton,
  SkeletonText,
  SkeletonBox,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { HomeCurrentFairsRail_viewer } from "v2/__generated__/HomeCurrentFairsRail_viewer.graphql"
import { HomeCurrentFairsRailQuery } from "v2/__generated__/HomeCurrentFairsRailQuery.graphql"

interface HomeCurrentFairsRailProps {
  viewer: HomeCurrentFairsRail_viewer
}

const HomeCurrentFairsRail: React.FC<HomeCurrentFairsRailProps> = ({
  viewer,
}) => {
  if (viewer.fairs?.length === 0) {
    return null
  }

  return (
    <HomeCurrentFairsContainer>
      <Shelf alignItems="flex-start">
        {viewer.fairs!.map((fair, index) => {
          if (!fair) {
            return <></>
          }

          return (
            <RouterLink
              to={`/fair${fair.href}`}
              textDecoration="none"
              key={index}
            >
              <Box key={index}>
                {fair.image?.cropped?.src ? (
                  <Image
                    src={fair.image.cropped.src}
                    srcSet={fair.image.cropped.srcSet}
                    width={fair.image.cropped.width}
                    height={fair.image.cropped.height}
                    alt=""
                    lazyLoad
                  />
                ) : (
                  <Box bg="black30" width={440} height={315} />
                )}
              </Box>
              <Text variant="xl" mt={1}>
                {fair?.name}
              </Text>
              <Text variant="lg" color="black60">
                {fair.startAt} - {fair?.endAt}
              </Text>
            </RouterLink>
          )
        })}
      </Shelf>
    </HomeCurrentFairsContainer>
  )
}

const HomeCurrentFairsContainer: React.FC = ({ children }) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="xl">Current Fairs</Text>

        <Text
          variant="sm"
          as={RouterLink}
          // @ts-ignore
          to="/art-fairs"
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
      <Shelf>
        {[...new Array(3)].map((_, i) => {
          return (
            <Box key={i}>
              <SkeletonBox width={440} height={315} />
              <SkeletonText variant="xl" mt={1}>
                Some Gallery
              </SkeletonText>
              <SkeletonText variant="lg">Location</SkeletonText>
            </Box>
          )
        })}
      </Shelf>
    </HomeCurrentFairsContainer>
  </Skeleton>
)

export const HomeCurrentFairsRailFragmentContainer = createFragmentContainer(
  HomeCurrentFairsRail,
  {
    viewer: graphql`
      fragment HomeCurrentFairsRail_viewer on Viewer {
        fairs(
          hasListing: true
          hasFullFeature: true
          sort: START_AT_DESC
          size: 25
          status: RUNNING
        ) {
          internalID
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
            cropped(width: 440, height: 315) {
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

export const HomeCurrentFairsRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeCurrentFairsRailQuery>
      environment={relayEnvironment}
      query={graphql`
        query HomeCurrentFairsRailQuery {
          viewer {
            ...HomeCurrentFairsRail_viewer
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
          return <HomeCurrentFairsRailFragmentContainer viewer={props.viewer} />
        }

        return null
      }}
    />
  )
}
