import { Join, Skeleton, Spacer } from "@artsy/palette"
import {
  ArtQuizRecommendedArtistFragmentContainer,
  ArtQuizRecommendedArtistPlaceholder,
} from "Apps/ArtQuiz/Components/ArtQuizRecommendedArtist"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import type { ArtQuizRecommendedArtistsQuery } from "__generated__/ArtQuizRecommendedArtistsQuery.graphql"
import type { ArtQuizRecommendedArtists_me$data } from "__generated__/ArtQuizRecommendedArtists_me.graphql"
import { compact, uniq } from "lodash"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtQuizRecommendedArtistsProps {
  me: ArtQuizRecommendedArtists_me$data
}

const ArtQuizRecommendedArtists: FC<
  React.PropsWithChildren<ArtQuizRecommendedArtistsProps>
> = ({ me }) => {
  const likedArtists = compact(
    uniq(me.quiz.savedArtworks.map(artwork => artwork.artist)),
  )

  return (
    <Join separator={<Spacer y={4} />}>
      {likedArtists.map(artist => {
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

const ArtQuizRecommendedArtistsFragmentContainer = createFragmentContainer(
  ArtQuizRecommendedArtists,
  {
    me: graphql`
      fragment ArtQuizRecommendedArtists_me on Me {
        quiz {
          savedArtworks {
            isSaved
            artist(shallow: true) {
              ...ArtQuizRecommendedArtist_artist
              internalID
            }
          }
        }
      }
    `,
  },
)

const ArtQuizRecommendedArtistsPlaceholder = () => {
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

export const ArtQuizRecommendedArtistsQueryRenderer = () => {
  return (
    <SystemQueryRenderer<ArtQuizRecommendedArtistsQuery>
      placeholder={<ArtQuizRecommendedArtistsPlaceholder />}
      query={graphql`
        query ArtQuizRecommendedArtistsQuery {
          me {
            ...ArtQuizRecommendedArtists_me
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props || !props.me) {
          return <ArtQuizRecommendedArtistsPlaceholder />
        }

        return <ArtQuizRecommendedArtistsFragmentContainer me={props.me} />
      }}
    />
  )
}
