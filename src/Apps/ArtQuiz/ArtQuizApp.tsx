import { ArtQuizContextProvider } from "Apps/ArtQuiz/ArtQuizContext"
import { ArtQuizInterface } from "Apps/ArtQuiz/ArtQuizInterface"

export const ArtQuizApp = () => {
  return (
    <ArtQuizContextProvider>
      <ArtQuizInterface />
    </ArtQuizContextProvider>
  )
}
