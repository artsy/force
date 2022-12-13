import { ArtQuizMain } from "Apps/ArtQuiz/Components/ArtQuizMain"
import { MetaTags } from "Components/MetaTags"
import { FC } from "react"

export const ArtQuizArtworks: FC = () => {
  return (
    <>
      <MetaTags title="Art Taste Quiz | Artsy" />

      <ArtQuizMain />
    </>
  )
}
