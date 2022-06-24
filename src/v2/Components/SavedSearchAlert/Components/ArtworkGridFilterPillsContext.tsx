import { createContext, FC, useContext } from "react"
import {
  DEFAULT_METRIC,
  Metric,
} from "v2/Components/ArtworkFilter/Utils/metrics"
import { SearchCriteriaAttributes } from "../types"

const ArtworkGridFilterPillsContext = createContext({
  criteria: {},
  metric: DEFAULT_METRIC,
})

interface ArtworkGridFilterPillsContextProviderProps {
  criteria: SearchCriteriaAttributes
  metric: Metric
}

export const ArtworkGridFilterPillsContextProvider: FC<ArtworkGridFilterPillsContextProviderProps> = ({
  criteria,
  metric,
  children,
}) => {
  return (
    <ArtworkGridFilterPillsContext.Provider value={{ criteria, metric }}>
      {children}
    </ArtworkGridFilterPillsContext.Provider>
  )
}

export const useArtworkGridFilterPillsContextContext = () => {
  return useContext(ArtworkGridFilterPillsContext)
}
