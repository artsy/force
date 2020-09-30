import React, { useContext } from "react"
import { PageOwnerType } from "@artsy/cohesion"

export interface AnalyticsContextProps {
  contextPageOwnerId?: string
  contextPageOwnerSlug?: string
  contextPageOwnerType?: PageOwnerType
}

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

export const withAnalyticsContext = Component => {
  return props => {
    return (
      <AnalyticsContext.Consumer>
        {contextValues => {
          return <Component {...contextValues} {...props} />
        }}
      </AnalyticsContext.Consumer>
    )
  }
}
