import { ArtQuizResultsLoader } from "Apps/ArtQuiz/Components/ArtQuizResultsLoader"
import { ArtQuizResultsTabs } from "Apps/ArtQuiz/Components/ArtQuizResultsTabs"
import { MetaTags } from "Components/MetaTags"
import { FC, useState } from "react"

export const ArtQuizResults: FC = () => {
  const [loading, setLoading] = useState(true)

  const handleReady = () => {
    setLoading(false)
  }

  return (
    <>
      <MetaTags title="Art Taste Quiz | Artsy" />

      {loading ? (
        <ArtQuizResultsLoader onReady={handleReady} />
      ) : (
        <ArtQuizResultsTabs />
      )}
    </>
  )
}
