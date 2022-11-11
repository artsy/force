import { ArtQuizWelcome } from "Apps/ArtQuiz/ArtQuizWelcome"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtQuizMainFragmentContainer } from "./ArtQuizMain"
import { ArtQuizApp_viewer$data } from "__generated__/ArtQuizApp_viewer.graphql"

interface ArtQuizAppProps {
  viewer: ArtQuizApp_viewer$data
}

export const ArtQuizApp: FC<ArtQuizAppProps> = ({ viewer }) => {
  const [startQuiz, setStartQuiz] = useState(false)

  const handleStartQuiz = () => {
    setStartQuiz(true)
  }

  return (
    <>
      {startQuiz ? (
        <ArtQuizMainFragmentContainer quiz={viewer.quizConnection} />
      ) : (
        <ArtQuizWelcome onStartQuiz={handleStartQuiz} />
      )}
    </>
  )
}

export const ArtQuizAppFragmentContainer = createFragmentContainer(ArtQuizApp, {
  viewer: graphql`
    fragment ArtQuizApp_viewer on Viewer {
      quizConnection {
        completedAt
        ...ArtQuizMain_quiz
      }
    }
  `,
})
