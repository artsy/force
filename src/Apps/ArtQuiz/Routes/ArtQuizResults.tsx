import { ArtQuizResultsEmpty } from "Apps/ArtQuiz/Components/ArtQuizResultsEmpty"
import { ArtQuizResultsTabs } from "Apps/ArtQuiz/Components/ArtQuizResultsTabs"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtQuizResults_me$data } from "__generated__/ArtQuizResults_me.graphql"

interface ArtQuizResultsProps {
  me: ArtQuizResults_me$data
}

const ArtQuizResults: FC<ArtQuizResultsProps> = ({ me }) => {
  const savedQuizArtworksCount = me.quiz.savedArtworks.length
  const hasSavedArtworks = savedQuizArtworksCount > 0

  if (hasSavedArtworks) {
    return (
      <ArtQuizResultsTabs savedQuizArtworksCount={savedQuizArtworksCount} />
    )
  }

  return <ArtQuizResultsEmpty />
}

export const ArtQuizResultsFragmentContainer = createFragmentContainer(
  ArtQuizResults,
  {
    me: graphql`
      fragment ArtQuizResults_me on Me {
        quiz {
          savedArtworks {
            __typename
          }
        }
      }
    `,
  }
)
