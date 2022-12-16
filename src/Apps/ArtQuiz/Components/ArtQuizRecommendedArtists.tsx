import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { ArtQuizRecommendedArtists_me$data } from "__generated__/ArtQuizRecommendedArtists_me.graphql"
import { ArtQuizRecommendedArtistsQuery } from "__generated__/ArtQuizRecommendedArtistsQuery.graphql"
import { compact, uniq } from "lodash"
import {
  ArtQuizRecommendedArtistFragmentContainer,
  ArtQuizRecommendedArtistPlaceholder,
} from "Apps/ArtQuiz/Components/ArtQuizRecommendedArtist"
import { Join, Skeleton, Spacer } from "@artsy/palette"

interface ArtQuizRecommendedArtistsProps {
  me: ArtQuizRecommendedArtists_me$data
}

const ArtQuizRecommendedArtists: FC<ArtQuizRecommendedArtistsProps> = ({
  me,
}) => {
  const likedArtists = compact(
    uniq(me.quiz.savedArtworks.map(artwork => artwork.artist))
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
            artist {
              ...ArtQuizRecommendedArtist_artist
              internalID
            }
          }
        }
      }
    `,
  }
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
