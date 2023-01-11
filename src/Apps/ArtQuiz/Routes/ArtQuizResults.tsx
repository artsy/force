import { ArtQuizResultsEmpty } from "Apps/ArtQuiz/Components/ArtQuizResultsEmpty"
import { ArtQuizResultsLoader } from "Apps/ArtQuiz/Components/ArtQuizResultsLoader"
import { ArtQuizResultsTabs } from "Apps/ArtQuiz/Components/ArtQuizResultsTabs"
import { FC, useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useMode } from "Utils/Hooks/useMode"
import { ArtQuizResults_me$data } from "__generated__/ArtQuizResults_me.graphql"

interface ArtQuizResultsProps {
  me: ArtQuizResults_me$data
}

const ArtQuizResults: FC<ArtQuizResultsProps> = ({ me }) => {
  const savedQuizArtworksTotal = useMemo(() => me.quiz.savedArtworks.length, [
    me.quiz.savedArtworks,
  ])
  const hasSavedArtworks = savedQuizArtworksTotal > 0

  const [mode, setMode] = useMode<"Empty" | "Loading" | "Ready">(
    hasSavedArtworks ? "Loading" : "Empty"
  )

  const handleReady = () => {
    setMode("Ready")
  }

  switch (mode) {
    case "Empty":
      return <ArtQuizResultsEmpty />

    case "Loading":
      return <ArtQuizResultsLoader onReady={handleReady} />

    case "Ready":
      return (
        <ArtQuizResultsTabs savedQuizArtworksTotal={savedQuizArtworksTotal} />
      )
  }
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
