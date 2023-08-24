import { FC, ReactNode, createContext, useContext, useMemo } from "react"
import { OwnerType, PageOwnerType } from "@artsy/cohesion"
import { camelCase } from "lodash"

const AnalyticsContext = createContext<{
  contextPageOwnerId?: string
}>({})

const AnalyticsInferredContext = createContext<{
  contextPageOwnerType: PageOwnerType
  contextPageOwnerSlug?: string
}>({
  contextPageOwnerType: (undefined as any) as PageOwnerType,
})

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

interface AnalyticsProps {
  children: ReactNode
  contextPageOwnerId: string
}

/**
 * Wrap entity pages (/example/:slug) with this component to provide the internalID
 */
export const Analytics: FC<AnalyticsProps> = ({
  contextPageOwnerId,
  children,
}) => {
  return (
    <AnalyticsContext.Provider value={{ contextPageOwnerId }}>
      {children}
    </AnalyticsContext.Provider>
  )
}

interface AnalyticsContextProviderProps {
  children: ReactNode
  path?: string
}

/**
 * Wraps `AppShell` and updates on route changes.
 * Pulls out the `contextPageOwnerType` and `contextPageOwnerSlug` from the route.
 */
export const AnalyticsContextProvider: FC<AnalyticsContextProviderProps> = ({
  children,
  path,
}) => {
  const [_type, contextPageOwnerSlug] = useMemo(() => tokenize(path ?? ""), [
    path,
  ])

  const contextPageOwnerType = useMemo(() => {
    return (path
      ? pathToOwnerType(path) || formatType(_type) // Fallback for unsupported routes
      : "Unknown") as PageOwnerType
  }, [_type, path])

  return (
    <AnalyticsInferredContext.Provider
      value={{ contextPageOwnerType, contextPageOwnerSlug }}
    >
      {children}
    </AnalyticsInferredContext.Provider>
  )
}

export const AnalyticsCombinedContextProvider: FC<
  AnalyticsProps & AnalyticsContextProviderProps
> = ({ children, contextPageOwnerId, path }) => {
  return (
    <Analytics contextPageOwnerId={contextPageOwnerId}>
      <AnalyticsContextProvider path={path}>
        {children}
      </AnalyticsContextProvider>
    </Analytics>
  )
}

export const tokenize = (path: string) => {
  const slice = path.startsWith("/") ? 1 : 0
  return path.slice(slice).split("/")
}

export const formatType = (part: string): string => {
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
