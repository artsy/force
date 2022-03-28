import { createContext, useContext, useEffect, useState } from "react"
import { PageOwnerType } from "@artsy/cohesion"
import { useRouter } from "../Router/useRouter"
import { getContextPageFromClient } from "lib/getContextPage"

export interface AnalyticsContextProps {
  contextPageOwnerId?: string
  contextPageOwnerSlug?: string
  contextPageOwnerType?: PageOwnerType
}

const AnalyticsContext = createContext<{
  contextPageOwnerId?: string
  contextPageOwnerSlug?: string
  contextPageOwnerType?: PageOwnerType
  children?: any
}>({})

export const AnalyticsContextProvider = ({ children, ...props }) => {
  const [analyticsValues, setAnalyticsValues] = useState(props.value)
  const router = useRouter()
  //Random
  useEffect(() => {
    console.log("router.match.location", router.match?.location?.pathname)
    const contextPageFromClient = getContextPageFromClient()
    // console.log("!!!", contextPageFromClient)
    setAnalyticsValues(contextPageFromClient)
  }, [router.match?.location?.pathname])
  console.log("ANALYTICS VALUES", props.value, analyticsValues)

  return (
    <AnalyticsContext.Provider value={analyticsValues}>
      {children}
    </AnalyticsContext.Provider>
  )
}

export const useAnalyticsContext = () => {
  const analyticsContext = useContext(AnalyticsContext) ?? {}
  console.log("Analytics Context", analyticsContext)
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
