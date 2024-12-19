import {
  AnalyticsContext,
  AnalyticsInferredContext,
} from "System/Contexts/AnalyticsContext"
import { useContext } from "react"

/**
 * Pull out the contextPageOwner props for use in shared components
 */
export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext)
  const inferredContext = useContext(AnalyticsInferredContext)

  return {
    ...context,
    ...inferredContext,
  }
}
