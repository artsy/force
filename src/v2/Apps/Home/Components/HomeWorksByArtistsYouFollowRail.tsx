import { Box, Shelf, Skeleton, SkeletonText, SkeletonBox } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { HomeWorksByArtistsYouFollowRail_homePage } from "v2/__generated__/HomeWorksByArtistsYouFollowRail_homePage.graphql"
import { HomeWorksByArtistsYouFollowRailQuery } from "v2/__generated__/HomeWorksByArtistsYouFollowRailQuery.graphql"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"

interface HomeWorksByArtistsYouFollowRailProps {
  homePage: HomeWorksByArtistsYouFollowRail_homePage
}

const HomeWorksByArtistsYouFollowRail: React.FC<HomeWorksByArtistsYouFollowRailProps> = ({
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
          <Box width={325} key={i}>
            <SkeletonBox width={325} height={230} />
            <SkeletonText variant="lg">Some Artist</SkeletonText>
            <SkeletonText variant="md">Location</SkeletonText>
          </Box>
        )
      })}
    </Shelf>
  </Skeleton>
)

export const HomeWorksByArtistsYouFollowRailFragmentContainer = createFragmentContainer(
  HomeWorksByArtistsYouFollowRail,
  {
    homePage: graphql`
      fragment HomeWorksByArtistsYouFollowRail_homePage on HomePage {
        artworkModule(key: FOLLOWED_ARTISTS) {
          results {
            ...ShelfArtwork_artwork @arguments(width: 210)
          }
        }
      }
    `,
  }
)

export const HomeWorksByArtistsYouFollowRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeWorksByArtistsYouFollowRailQuery>
      environment={relayEnvironment}
      query={graphql`
        query HomeWorksByArtistsYouFollowRailQuery {
          homePage {
            ...HomeWorksByArtistsYouFollowRail_homePage
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
            <HomeWorksByArtistsYouFollowRailFragmentContainer
              homePage={props.homePage}
            />
          )
        }

        return null
      }}
    />
  )
}
