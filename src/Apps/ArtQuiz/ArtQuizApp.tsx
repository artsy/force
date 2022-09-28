import { ArtQuizContextProvider } from "Apps/ArtQuiz/ArtQuizContext/ArtQuizContext"
import { ArtQuizWelcome } from "Components/ArtQuiz/Views/ArtQuizWelcome"
import { useState } from "react"
import { ArtQuizInterface } from "./ArtQuizInterface/ArtQuizInterface"

export const ArtQuizApp = () => {
  const [startQuiz, setStartQuiz] = useState(false)

  const handleStartQuiz = () => {
    setStartQuiz(true)
  }

  return (
    <ArtQuizContextProvider>
      {startQuiz ? (
        <ArtQuizInterface />
      ) : (
        <ArtQuizWelcome onStartQuiz={handleStartQuiz} />
      )}
    </ArtQuizContextProvider>
  )
}
