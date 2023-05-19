import { createContext, useContext } from "react"
import { PageOwnerType } from "@artsy/cohesion"

export interface AnalyticsContextProps {
  contextPageOwnerId?: string
  contextPageOwnerSlug?: string
  contextPageOwnerType?: PageOwnerType
}

export const AnalyticsContext = createContext<{
  contextPageOwnerId?: string
  contextPageOwnerSlug?: string
  contextPageOwnerType?: PageOwnerType
  children?: any
}>({})

export const useAnalyticsContext = () => {
  const analyticsContext = useContext(AnalyticsContext)
  return analyticsContext
}
