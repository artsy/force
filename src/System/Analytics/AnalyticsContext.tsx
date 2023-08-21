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
import { useToasts } from "@artsy/palette"
import { camelCase } from "lodash"
import { useRouter } from "System/Router/useRouter"

// FIXME: Remove this
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

interface AnalyticsContextProviderProps {
  children: ReactNode
  contextPageOwnerId?: string
  /**
   * Avoid setting these and rather let us infer them.
   * If missing `contextPageOwnerType`, add it to special cases in `pathToOwnerType`
   * Provided here for the use of this context in specs
   */
  __contextPageOwnerSlug__?: string
  __contextPageOwnerType__?: PageOwnerType
  debug?: boolean
}

/**
 * Provides context for analytics tracking events.
 * Pull out properties to pass into tracking calls. If you're setting up a new route that ends in a :slug,
 * you'll need to wrap your app in the `AnalyticsContextProvider` pass in the `internalID` as a `contextPageOwnerId`
 */
export const AnalyticsContextProvider: FC<AnalyticsContextProviderProps> = ({
  contextPageOwnerId,
  __contextPageOwnerSlug__,
  __contextPageOwnerType__,
  children,
  debug = false,
}) => {
  // We try to infer the context from the route
  // However, we're unable to ever infer the ID, which must be passed explicitly
  const [state, setState] = useState<{
    contextPageOwnerSlug?: string
    contextPageOwnerType?: PageOwnerType
    isReady: boolean
  }>({
    contextPageOwnerSlug: __contextPageOwnerSlug__,
    contextPageOwnerType: __contextPageOwnerType__,
    isReady: false,
  })

  const { sendToast } = useToasts()

  const { match } = useRouter()

  const path = match?.location?.pathname

  // An unfortunate workaround for the fact that some routes rely on the previous
  // behavior of just giving up and returning _something_ and casting it as a valid
  // `PageOwnerType`. We will still warn on these routes and hopefully they are
  // replaced, one-by-one.
  const parts = tokenize(path || "")
  const fallback = formatType(parts[0]) as PageOwnerType

  // Update context when the route changes
  useEffect(() => {
    // Routing context is typically missing in specs
    if (!path) return

    const contextPageOwnerType = pathToOwnerType(path)
    const [_type, contextPageOwnerSlug] = tokenize(path)

    // Do not preserve previous state
    setState({
      isReady: true,
      contextPageOwnerSlug: contextPageOwnerSlug,
      contextPageOwnerType: contextPageOwnerType,
    })
  }, [path])

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
          "Please provide a special-case for your page in the `pathToOwnerType` function",
        ttl: Infinity,
        variant: "error",
      })
    }
  }, [state, sendToast, contextPageOwnerId])

  const value = {
    isProvided: true,
    isReady: state.isReady,
    contextPageOwnerId: contextPageOwnerId,
    contextPageOwnerSlug: state.contextPageOwnerSlug,
    contextPageOwnerType: state.contextPageOwnerType || fallback,
  }

  return (
    <AnalyticsContext.Provider value={value}>
      {debug && <pre>{JSON.stringify(value, null, 2)}</pre>}

      {children}
    </AnalyticsContext.Provider>
  )
}

const tokenize = (path: string) => {
  const slice = path.startsWith("/") ? 1 : 0
  return path.slice(slice).split("/")
}

const formatType = (part: string): string => {
  return camelCase(part).replace("2", "")
}

export const pathToOwnerType = (path: string): PageOwnerType => {
  if (path === "/") {
    return OwnerType.home
  }

  const [_type, slug, tab] = tokenize(path)

  // Remove '2' to ensure that show2/fair2/etc are schema compliant
  const type = formatType(_type)

  switch (true) {
    // Handle special cases
    case type === "orders" && tab === "shipping":
      return OwnerType.ordersShipping
    case type === "orders" && tab === "payment":
      return OwnerType.ordersPayment
    case type === "orders" && tab === "review":
      return OwnerType.ordersReview
    case type === "collectorProfile" && slug === "saves":
      // Why is this somehow different from OwnerType.savesAndFollows?
      // Why aren't there other cases for collector-profile routes?
      return OwnerType.saves
    case type === "auction":
      return OwnerType.sale
    case type === "news":
    case type === "series":
    case type === "video":
      return OwnerType.article
    case type === "artFairs":
      return OwnerType.fairs
    case type === "settings":
    case type === "collectorProfile":
      return OwnerType.editProfile
    default:
      return OwnerType[type]
  }
}
