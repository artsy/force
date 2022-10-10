import { ArtQuizContextProvider } from "Apps/ArtQuiz/ArtQuizContext"
import { ArtQuizWelcome } from "Apps/ArtQuiz/ArtQuizWelcome"
import { useState } from "react"
import { ArtQuizMain } from "./ArtQuizMain"
import { ArtQuizResultsLoader } from "Apps/ArtQuiz/ArtQuizResultsLoader"

export const ArtQuizApp = () => {
  const [startQuiz, setStartQuiz] = useState(false)

  const handleStartQuiz = () => {
    setStartQuiz(true)
  }

  return (
    <ArtQuizContextProvider>
      {/* {startQuiz ? (
        <ArtQuizMain />
      ) : (
        <ArtQuizWelcome onStartQuiz={handleStartQuiz} />
      )} */}
      <ArtQuizResultsLoader/>
    </ArtQuizContextProvider>
  )
}
