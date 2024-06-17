import { useContext } from "react"
import {
  AnalyticsContext,
  AnalyticsInferredContext,
} from "System/Contexts/AnalyticsContext"

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
