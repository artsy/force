import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react"
import { OwnerType, PageOwnerType } from "@artsy/cohesion"
import { getENV } from "Utils/getENV"
import { useToasts, useUpdateEffect } from "@artsy/palette"
import { camelCase } from "lodash"
import { useRouter } from "System/Router/useRouter"

export interface AnalyticsContextProps {
  contextPageOwnerId?: string
  contextPageOwnerSlug?: string
  contextPageOwnerType?: PageOwnerType
}

const AnalyticsContext = createContext<{
  contextPageOwnerId?: string
  contextPageOwnerSlug?: string
  contextPageOwnerType: PageOwnerType
  isReady: boolean
  isProvided: boolean
}>({
  contextPageOwnerType: (undefined as any) as PageOwnerType,
  isReady: false,
  isProvided: false,
})

export const useAnalyticsContext = () => {
  return useContext(AnalyticsContext)
}

interface AnalyticsContextProviderProps extends AnalyticsContextProps {
  children: ReactNode
}

/**
 * Provides context for analytics tracking events.
 * Pull out properties to pass into tracking calls. If you're setting up a new route that ends in a :slug,
 * you'll need to wrap your app in the `AnalyticsContextProvider` pass in the `internalID` as a `contextPageOwnerId`
 */
export const AnalyticsContextProvider: FC<AnalyticsContextProviderProps> = ({
  contextPageOwnerId,
  contextPageOwnerSlug,
  contextPageOwnerType,
  children,
}) => {
  // We try to infer the context from the route
  // However, we're unable to ever infer the ID, which must be passed explicitly
  const [state, setState] = useState<{
    contextPageOwnerSlug?: string
    contextPageOwnerType?: PageOwnerType
    isReady: boolean
  }>({
    contextPageOwnerSlug: contextPageOwnerSlug,
    contextPageOwnerType: contextPageOwnerType,
    isReady: false,
  })

  const { sendToast } = useToasts()

  const { match } = useRouter()

  // Update context when the route changes
  useEffect(() => {
    const path = match?.location?.pathname

    // Routing context is missing in specs
    if (!path) return

    const contextPageOwnerType = pathToOwnerType(path)
    const [_, _type, contextPageOwnerSlug] = path.split("/")

    // Do not preserve previous state
    setState({
      isReady: true,
      contextPageOwnerSlug: contextPageOwnerSlug,
      contextPageOwnerType: contextPageOwnerType,
    })
  }, [match])

  // Update context if props change
  useUpdateEffect(() => {
    setState(prevState => {
      return {
        ...prevState,
        contextPageOwnerSlug:
          contextPageOwnerSlug || prevState.contextPageOwnerSlug,
        contextPageOwnerType:
          contextPageOwnerType || prevState.contextPageOwnerType,
      }
    })
  }, [contextPageOwnerSlug, contextPageOwnerType])

  useEffect(() => {
    // Warn if the type is missing when in development mode
    if (
      state.isReady &&
      !state.contextPageOwnerType &&
      getENV("NODE_ENV") === "development"
    ) {
      sendToast({
        message: "Invalid `AnalyticsContext`",
        description:
          "Please provide `contextPageOwnerType` to your page using the `AnalyticsContextProvider`",
        ttl: Infinity,
        variant: "error",
      })
    }
  }, [state, sendToast, contextPageOwnerId])

  return (
    <AnalyticsContext.Provider
      value={{
        isProvided: true,
        isReady: state.isReady,
        contextPageOwnerId: contextPageOwnerId,
        contextPageOwnerSlug: state.contextPageOwnerSlug,
        contextPageOwnerType: state.contextPageOwnerType!,
      }}
    >
      {children}
    </AnalyticsContext.Provider>
  )
}

export const pathToOwnerType = (path: string): PageOwnerType => {
  if (path === "/") {
    return OwnerType.home
  }

  const parts = path.split("/")

  // Remove '2' to ensure that show2/fair2/etc are schema compliant
  const type = camelCase(parts[1]).replace("2", "")

  switch (type) {
    // Handle special cases
    case "auction":
      return OwnerType.sale
    case "news":
    case "series":
    case "video":
      return OwnerType.article
    case "artFairs":
      return OwnerType.fairs
    case "settings":
    case "collectorProfile":
      return OwnerType.editProfile
    default:
      return OwnerType[type]
  }
}
