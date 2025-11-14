import {
  ArtQuizRecommendedArtistFragmentContainer,
  ArtQuizRecommendedArtistPlaceholder,
} from "Apps/ArtQuiz/Components/ArtQuizRecommendedArtist"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { Join, Skeleton, Spacer } from "@artsy/palette"
import type { ArtQuizTrendingArtists_viewer$data } from "__generated__/ArtQuizTrendingArtists_viewer.graphql"
import type { ArtQuizTrendingArtistsQuery } from "__generated__/ArtQuizTrendingArtistsQuery.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtQuizTrendingArtistsProps {
  viewer: ArtQuizTrendingArtists_viewer$data
}

const ArtQuizTrendingArtists: FC<
  React.PropsWithChildren<ArtQuizTrendingArtistsProps>
> = ({ viewer }) => {
  const artists = extractNodes(viewer.curatedTrendingArtists)

  return (
    <Join separator={<Spacer y={4} />}>
      {artists.map(artist => {
        return (
          <ArtQuizRecommendedArtistFragmentContainer
            key={artist.internalID}
            artist={artist}
          />
        )
      })}
    </Join>
  )
}

const ArtQuizTrendingArtistsFragmentContainer = createFragmentContainer(
  ArtQuizTrendingArtists,
  {
    viewer: graphql`
      fragment ArtQuizTrendingArtists_viewer on Viewer {
        curatedTrendingArtists(first: 16) {
          edges {
            node {
              ...ArtQuizRecommendedArtist_artist
              internalID
            }
          }
        }
      }
    `,
  },
)

const ArtQuizTrendingArtistsPlaceholder = () => {
  return (
    <Skeleton>
      <Join separator={<Spacer y={4} />}>
        {[...new Array(3)].map((_, i) => {
          return <ArtQuizRecommendedArtistPlaceholder key={i} />
        })}
      </Join>
    </Skeleton>
  )
}

export const ArtQuizTrendingArtistsQueryRenderer = () => {
  return (
    <SystemQueryRenderer<ArtQuizTrendingArtistsQuery>
      placeholder={<ArtQuizTrendingArtistsPlaceholder />}
      query={graphql`
        query ArtQuizTrendingArtistsQuery {
          viewer {
            ...ArtQuizTrendingArtists_viewer
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.viewer) {
          return <ArtQuizTrendingArtistsPlaceholder />
        }

        return <ArtQuizTrendingArtistsFragmentContainer viewer={props.viewer} />
      }}
    />
  )
}
