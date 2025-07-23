import { createContextStore, Action, action } from "easy-peasy"
import {
  type CareerHighlightKindWithPromo,
  useCareerHighlightConfig,
} from "Apps/Settings/Routes/Insights/Components/CareerHighlights/CareerHighlightsModal/config"
import { createContext, useContext } from "react"

// Note: This context wraps useCareerHighlightConfig hook
// The store mainly passes through values from the hook
// We create a minimal store for consistency with the migration

// Easy-peasy store model interface
interface CareerHighlightsStoriesStoreModel {
  // State (minimal - most state comes from useCareerHighlightConfig hook)
}

// Create the context store
export const CareerHighlightsStoriesStore =
  createContextStore<CareerHighlightsStoriesStoreModel>(() => ({}))

interface ContextType {
  back(): void
  current: CareerHighlightKindWithPromo | (string & {})
  next(): void
  onClose(): void
  dotPosition: number
  total: number
}

// Legacy context for backward compatibility
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

export const CareerHighlightsStoriesProvider: React.FC<
  React.PropsWithChildren<CareerHighlightsStoriesProviderProps>
> = ({ children, onClose, careerHighlights, pageIndex }) => {
  const { back, current, index, next, total } = useCareerHighlightConfig({
    availableCareerHighlights: careerHighlights,
    onClose,
    pageIndex,
  })

  return (
    <CareerHighlightsStoriesStore.Provider>
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
    </CareerHighlightsStoriesStore.Provider>
  )
}

// Backward compatible hook
export const useCareerHighlightsStoriesContext = () => {
  return useContext(CareerHighlightsStoriesContext)
}
