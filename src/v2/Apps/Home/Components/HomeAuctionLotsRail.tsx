import {
  Box,
  Text,
  Flex,
  Spacer,
  Shelf,
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
import { HomeAuctionLotsRail_viewer } from "v2/__generated__/HomeAuctionLotsRail_viewer.graphql"
import { HomeAuctionLotsRailQuery } from "v2/__generated__/HomeAuctionLotsRailQuery.graphql"
import { extractNodes } from "v2/Utils/extractNodes"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"

interface HomeAuctionLotsRailProps {
  viewer: HomeAuctionLotsRail_viewer
}

const HomeAuctionLotsRail: React.FC<HomeAuctionLotsRailProps> = ({
  viewer,
}) => {
  const nodes = extractNodes(viewer.saleArtworksConnection).filter(node => {
    return !node.sale?.isClosed
  })

  if (nodes.length === 0) {
    return null
  }

  return (
    <HomeAuctionLotsRailContainer lotCount={nodes.length}>
      <Shelf>
        {nodes.map((node, index) => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={node}
              key={node.slug}
              // TODO: Add home type to cohesion once we have tracking
              contextModule={null as any}
              hidePartnerName
              lazyLoad
            />
          )
        })}
      </Shelf>
    </HomeAuctionLotsRailContainer>
  )
}

const HomeAuctionLotsRailContainer: React.FC<{ lotCount: number }> = ({
  children,
  lotCount,
}) => {
  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="lg">
          Auction Lots {lotCount > 1 && <Sup color="brand">{lotCount}</Sup>}
        </Text>

        <Text
          variant="sm"
          as={RouterLink}
          // @ts-ignore
          to="/auctions"
        >
          View All Auctions
        </Text>
      </Flex>

      <Spacer mt={4} />

      {children}
    </>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <HomeAuctionLotsRailContainer lotCount={0}>
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
    </HomeAuctionLotsRailContainer>
  </Skeleton>
)

export const HomeAuctionLotsRailFragmentContainer = createFragmentContainer(
  HomeAuctionLotsRail,
  {
    viewer: graphql`
      fragment HomeAuctionLotsRail_viewer on Viewer {
        saleArtworksConnection(first: 50, geneIDs: "highlights-at-auction") {
          edges {
            node {
              ...ShelfArtwork_artwork @arguments(width: 210)
              internalID
              slug
              href
              sale {
                isClosed
              }
            }
          }
        }
      }
    `,
  }
)

export const HomeAuctionLotsRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeAuctionLotsRailQuery>
      environment={relayEnvironment}
      query={graphql`
        query HomeAuctionLotsRailQuery {
          viewer {
            ...HomeAuctionLotsRail_viewer
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
          return <HomeAuctionLotsRailFragmentContainer viewer={props.viewer} />
        }

        return null
      }}
    />
  )
}
