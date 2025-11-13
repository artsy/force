import { ArtQuizResultsEmpty } from "Apps/ArtQuiz/Components/ArtQuizResultsEmpty"
import { ArtQuizResultsTabs } from "Apps/ArtQuiz/Components/ArtQuizResultsTabs"
import type { ArtQuizResults_me$data } from "__generated__/ArtQuizResults_me.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface ArtQuizResultsProps {
  me: ArtQuizResults_me$data
}

const ArtQuizResults: FC<React.PropsWithChildren<ArtQuizResultsProps>> = ({
  me,
}) => {
  if (me.quiz.savedArtworks.length > 0) {
    return <ArtQuizResultsTabs />
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
