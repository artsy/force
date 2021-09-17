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
  Sup,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { HomeFeaturedGalleriesRail_orderedSet } from "v2/__generated__/HomeFeaturedGalleriesRail_orderedSet.graphql"
import { HomeFeaturedGalleriesRailQuery } from "v2/__generated__/HomeFeaturedGalleriesRailQuery.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { FollowProfileButtonFragmentContainer } from "v2/Components/FollowButton/FollowProfileButton"
import { ContextModule } from "@artsy/cohesion"

interface HomeFeaturedGalleriesRailProps {
  orderedSet: HomeFeaturedGalleriesRail_orderedSet
}

const HomeFeaturedGalleriesRail: React.FC<HomeFeaturedGalleriesRailProps> = ({
  orderedSet,
}) => {
  const { user } = useSystemContext()
  const nodes = extractNodes(orderedSet.orderedItemsConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <HomeFeaturedGalleriesContainer galleriesCount={nodes.length}>
      <Shelf>
        {nodes.map((node, index) => {
          if (node.__typename !== "Profile") {
            return <></>
          }
          return (
            <RouterLink
              to={`/partner${node.href}`}
              textDecoration="none"
              key={index}
            >
              <Box width={325} key={index}>
                <EntityHeader
                  name={node.name!}
                  meta={node.location!}
                  smallVariant
                  FollowButton={
                    <FollowProfileButtonFragmentContainer
                      user={user}
                      profile={node as any}
                      contextModule={ContextModule.partnerHeader}
                      buttonProps={{
                        size: "small",
                        variant: "secondaryOutline",
                      }}
                    />
                  }
                />
                {node.image?.cropped?.src ? (
                  <Box mt={1}>
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
              </Box>
            </RouterLink>
          )
        })}
      </Shelf>
    </HomeFeaturedGalleriesContainer>
  )
}

const HomeFeaturedGalleriesContainer: React.FC<{ galleriesCount: number }> = ({
  children,
  galleriesCount,
}) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="lg">
          Featured Galleries{" "}
          {galleriesCount > 1 && <Sup color="brand">{galleriesCount}</Sup>}
        </Text>

        <Text
          variant="sm"
          as={RouterLink}
          // @ts-ignore
          to="/galleries"
        >
          View All Galleries
        </Text>
      </Flex>

      <Spacer mt={4} />

      {children}
    </>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <HomeFeaturedGalleriesContainer galleriesCount={0}>
      <Shelf>
        {[...new Array(8)].map((_, i) => {
          return (
            <Box width={325} key={i}>
              <SkeletonText variant="lg">Some Gallery</SkeletonText>
              <SkeletonText variant="md">Location</SkeletonText>
              <SkeletonBox width={325} height={230} />
            </Box>
          )
        })}
      </Shelf>
    </HomeFeaturedGalleriesContainer>
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
                internalID
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
