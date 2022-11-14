import { ArtQuizWelcome } from "Apps/ArtQuiz/ArtQuizWelcome"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtQuizMainFragmentContainer } from "./ArtQuizMain"
import { ArtQuizApp_quiz$data } from "__generated__/ArtQuizApp_quiz.graphql"

interface ArtQuizAppProps {
  quiz: ArtQuizApp_quiz$data
}

export const ArtQuizApp: FC<ArtQuizAppProps> = ({ quiz }) => {
  const [startQuiz, setStartQuiz] = useState(false)

  const handleStartQuiz = () => {
    setStartQuiz(true)
  }

  return (
    <>
      {/* {startQuiz ? (
        <ArtQuizMainFragmentContainer quiz={quiz} />
      ) : (
        <ArtQuizWelcome onStartQuiz={handleStartQuiz} />
      )} */}
    </>
  )
}

export const ArtQuizAppFragmentContainer = createFragmentContainer(ArtQuizApp, {
  quiz: graphql`
    fragment ArtQuizApp_quiz on Quiz {
      ...ArtQuizMain_quiz
    }
  `,
})
