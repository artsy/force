import {
  CareerHighlightKindWithPromo,
  useCareerHighlightConfig,
} from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/config"
import { createContext, useContext } from "react"

interface ContextType {
  back(): void
  current: CareerHighlightKindWithPromo | (string & {})
  next(): void
  onClose(): void
  dotPosition: number
  total: number
}

const CareerHighlightsStoriesContext = createContext<ContextType>({
  back: () => {},
  current: "",
  next: () => {},
  onClose: () => {},
  dotPosition: 0,
  total: 0,
})

interface CareerHighlightsStoriesProviderProps {
  onClose(): void
  careerHighlights: CareerHighlightKindWithPromo[]
  pageIndex?: number
}

export const CareerHighlightsStoriesProvider: React.FC<CareerHighlightsStoriesProviderProps> = ({
  children,
  onClose,
  careerHighlights,
  pageIndex,
}) => {
  const { back, current, index, next, total } = useCareerHighlightConfig({
    availableCareerHighlights: careerHighlights,
    onClose,
    pageIndex,
  })

  return (
    <CareerHighlightsStoriesContext.Provider
      value={{
        back,
        current,
        next,
        onClose,
        dotPosition: index(),
        total: total(),
      }}
    >
      {children}
    </CareerHighlightsStoriesContext.Provider>
  )
}

export const useCareerHighlightsStoriesContext = () => {
  return useContext(CareerHighlightsStoriesContext)
}
