import { ArtQuizContextProvider } from "Apps/ArtQuiz/ArtQuizContext/ArtQuizContext"
import { ArtQuizInterface } from "./ArtQuizInterface/ArtQuizInterface"

export const ArtQuizApp = () => {
  return (
    <ArtQuizContextProvider>
      <ArtQuizInterface />
    </ArtQuizContextProvider>
  )
}
