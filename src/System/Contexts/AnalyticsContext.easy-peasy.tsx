import { createContextStore, Computed, computed } from "easy-peasy"
import { OwnerType, type PageOwnerType } from "@artsy/cohesion"
import { getENV } from "Utils/getENV"
import { camelCase } from "lodash"
import { type FC, type ReactNode, createContext, useMemo } from "react"

const SHOW_ANALYTICS_CALLS = getENV("SHOW_ANALYTICS_CALLS")

// Store model interfaces
interface AnalyticsStoreModel {
  contextPageOwnerId?: string
}

interface AnalyticsInferredStoreModel {
  path?: string
  contextPageOwnerType: Computed<AnalyticsInferredStoreModel, PageOwnerType>
  contextPageOwnerSlug: Computed<
    AnalyticsInferredStoreModel,
    string | undefined
  >
}

// Create stores
export const AnalyticsStore = createContextStore<AnalyticsStoreModel>(
  runtimeModel => ({
    contextPageOwnerId: runtimeModel?.contextPageOwnerId,
  }),
)

export const AnalyticsInferredStore =
  createContextStore<AnalyticsInferredStoreModel>(runtimeModel => ({
    path: runtimeModel?.path,

    contextPageOwnerType: computed(state => {
      const [_type] = tokenize(state.path ?? "")

      const ownerType = (
        state.path
          ? pathToOwnerType(state.path) || formatType(_type)
          : "Unknown"
      ) as PageOwnerType

      if (
        !Object.values(OwnerType).includes(ownerType) &&
        SHOW_ANALYTICS_CALLS
      ) {
        console.warn(
          `OwnerType "${ownerType}" is not part of @artsy/cohesion's schema.`,
        )
      }
      return ownerType
    }),

    contextPageOwnerSlug: computed(state => {
      const [, slug] = tokenize(state.path ?? "")
      return slug
    }),
  }))

// Legacy contexts for backward compatibility
export const AnalyticsContext = createContext<{
  contextPageOwnerId?: string
}>({})

export const AnalyticsInferredContext = createContext<{
  contextPageOwnerType: PageOwnerType
  contextPageOwnerSlug?: string
}>({
  contextPageOwnerType: undefined as any as PageOwnerType,
})

// Provider components
interface AnalyticsProps {
  children: ReactNode
  contextPageOwnerId: string
}

export const Analytics: FC<React.PropsWithChildren<AnalyticsProps>> = ({
  contextPageOwnerId,
  children,
}) => {
  return (
    <AnalyticsStore.Provider runtimeModel={{ contextPageOwnerId }}>
      <AnalyticsContext.Provider value={{ contextPageOwnerId }}>
        {children}
      </AnalyticsContext.Provider>
    </AnalyticsStore.Provider>
  )
}

interface AnalyticsContextProviderProps {
  children: ReactNode
  path?: string
}

export const AnalyticsContextProvider: FC<
  React.PropsWithChildren<AnalyticsContextProviderProps>
> = ({ children, path }) => {
  const store = useMemo(() => AnalyticsInferredStore.Provider, [])

  const contextValues = AnalyticsInferredStore.useStoreState(state => ({
    contextPageOwnerType: state.contextPageOwnerType,
    contextPageOwnerSlug: state.contextPageOwnerSlug,
  }))

  return (
    <store runtimeModel={{ path }}>
      <AnalyticsInferredContext.Provider value={contextValues}>
        {children}
      </AnalyticsInferredContext.Provider>
    </store>
  )
}

export const AnalyticsCombinedContextProvider: FC<
  React.PropsWithChildren<AnalyticsProps & AnalyticsContextProviderProps>
> = ({ children, contextPageOwnerId, path }) => {
  return (
    <Analytics contextPageOwnerId={contextPageOwnerId}>
      <AnalyticsContextProvider path={path}>
        {children}
      </AnalyticsContextProvider>
    </Analytics>
  )
}

// Helper functions
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
    case type === "orders" && tab === "checkout":
      return OwnerType.ordersCheckout
    case type === "orders" && tab === "details":
      return OwnerType.ordersDetail
    case type === "collectorProfile" && slug === "saves":
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
