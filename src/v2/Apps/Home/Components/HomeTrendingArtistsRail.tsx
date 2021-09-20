import {
  Box,
  Image,
  Text,
  Flex,
  Spacer,
  Shelf,
  EntityHeader,
  Skeleton,
  SkeletonText,
  SkeletonBox,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { HomeTrendingArtistsRail_viewer } from "v2/__generated__/HomeTrendingArtistsRail_viewer.graphql"
import { HomeTrendingArtistsRailQuery } from "v2/__generated__/HomeTrendingArtistsRailQuery.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { ContextModule } from "@artsy/cohesion"
import { FollowArtistButtonFragmentContainer } from "v2/Components/FollowButton/FollowArtistButton"

interface HomeTrendingArtistsRailProps {
  viewer: HomeTrendingArtistsRail_viewer
}

const HomeTrendingArtistsRail: React.FC<HomeTrendingArtistsRailProps> = ({
  viewer,
}) => {
  const { user } = useSystemContext()
  const nodes = extractNodes(viewer.artistsConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <HomeTrendingArtistsRailContainer>
      <Shelf alignItems="flex-start">
        {nodes.map((node, index) => {
          return (
            <RouterLink
              to={`/partner${node.href}`}
              textDecoration="none"
              key={index}
            >
              <Box width={325} key={index}>
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
                      artist={node as any}
                      contextModule={ContextModule.artistHeader}
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
    </HomeTrendingArtistsRailContainer>
  )
}

const HomeTrendingArtistsRailContainer: React.FC = ({ children }) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="lg">Trending Artists on Artsy</Text>

        <Text
          variant="sm"
          as={RouterLink}
          // @ts-ignore
          to="/artists"
        >
          View All Artists
        </Text>
      </Flex>

      <Spacer mt={4} />

      {children}
    </>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <HomeTrendingArtistsRailContainer>
      <Shelf>
        {[...new Array(8)].map((_, i) => {
          return (
            <Box width={325} key={i}>
              <SkeletonBox width={325} height={230} />
              <SkeletonText variant="lg">Some Artist</SkeletonText>
              <SkeletonText variant="md">Location</SkeletonText>
            </Box>
          )
        })}
      </Shelf>
    </HomeTrendingArtistsRailContainer>
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
