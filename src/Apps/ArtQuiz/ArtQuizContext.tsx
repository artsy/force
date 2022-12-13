import { createContext, FC, useContext } from "react"
import { useRouter } from "System/Router/useRouter"
import { useCursor } from "use-cursor"

const ArtQuizContext = createContext<{
  index: number
  onNext(): void
  onPrevious(): void
  total: number
}>({
  index: 0,
  onNext: () => {},
  onPrevious: () => {},
  total: 0,
})

export const ArtQuizContextProvider: FC = ({ children }) => {
  const total = 10

  const { router } = useRouter()

  const { handleNext, handlePrev, index } = useCursor({ max: total })

  const onPrevious = () => {
    if (index === 0) {
      router.push("/art-quiz/welcome")

      return
    }

    handlePrev()
  }

  const onNext = () => {
    if (index === total - 1) {
      router.push("/art-quiz/results")

      return
    }

    handleNext()
  }

  return (
    <ArtQuizContext.Provider value={{ index, onNext, onPrevious, total }}>
      {children}
    </ArtQuizContext.Provider>
  )
}

export const useArtQuizContext = () => {
  return useContext(ArtQuizContext)
}
