import {
  Box,
  Shelf,
  Skeleton,
  SkeletonText,
  SkeletonBox,
  Spacer,
} from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { HomeRecentlyViewedRail_homePage } from "v2/__generated__/HomeRecentlyViewedRail_homePage.graphql"
import { HomeRecentlyViewedRailQuery } from "v2/__generated__/HomeRecentlyViewedRailQuery.graphql"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"

interface HomeRecentlyViewedRailProps {
  homePage: HomeRecentlyViewedRail_homePage
}

const HomeRecentlyViewedRail: React.FC<HomeRecentlyViewedRailProps> = ({
  homePage,
}) => {
  const results = homePage.artworkModule?.results
  if (!results || results?.length === 0) {
    return null
  }

  return (
    <Shelf>
      {results.map((artwork, index) => {
        return (
          <ShelfArtworkFragmentContainer
            artwork={artwork!}
            key={index}
            // TODO: Add home type to cohesion once we have tracking
            contextModule={null as any}
            hidePartnerName
            lazyLoad
          />
        )
      })}
    </Shelf>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Shelf>
      {[...new Array(8)].map((_, i) => {
        return (
          <Box width={200} key={i}>
            <SkeletonBox width={200} height={[200, 300, 250, 275][i % 4]} />

            <Spacer mt={1} />

            <SkeletonText variant="md">Artist Name</SkeletonText>
            <SkeletonText variant="md">Artwork Title</SkeletonText>
            <SkeletonText variant="xs">Partner</SkeletonText>
            <SkeletonText variant="xs">Price</SkeletonText>
          </Box>
        )
      })}
    </Shelf>
  </Skeleton>
)

export const HomeRecentlyViewedRailFragmentContainer = createFragmentContainer(
  HomeRecentlyViewedRail,
  {
    homePage: graphql`
      fragment HomeRecentlyViewedRail_homePage on HomePage {
        artworkModule(key: RECENTLY_VIEWED_WORKS) {
          results {
            ...ShelfArtwork_artwork @arguments(width: 210)
          }
        }
      }
    `,
  }
)

export const HomeRecentlyViewedRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeRecentlyViewedRailQuery>
      environment={relayEnvironment}
      query={graphql`
        query HomeRecentlyViewedRailQuery {
          homePage {
            ...HomeRecentlyViewedRail_homePage
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

        if (props.homePage) {
          return (
            <HomeRecentlyViewedRailFragmentContainer
              homePage={props.homePage}
            />
          )
        }

        return null
      }}
    />
  )
}
