import React, { useContext } from "react"
import { PageOwnerType } from "@artsy/cohesion"

export const AnalyticsContext = React.createContext<{
  contextPageOwnerId?: string
  contextPageOwnerSlug?: string
  contextPageOwnerType?: PageOwnerType
  children?: any
}>({})

export const useAnalyticsContext = () => {
  const analyticsContext = useContext(AnalyticsContext)
  return analyticsContext
}
