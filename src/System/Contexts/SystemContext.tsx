import type { Router } from "found"
import { createContext, useState } from "react"
import type { Environment } from "react-relay"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { getUser } from "Utils/user"
import type { FeatureFlags } from "System/Hooks/useFeatureFlag"
import { getSupportedMetric, type Metric } from "Utils/metrics"
import { getENV } from "Utils/getENV"

export type UserPreferences = {
  metric: Metric
}

export interface SystemContextState {
  router: Router | null
  setRouter: (router: Router) => void
  setUser: (user: User) => void
  user: User
}

export interface SystemContextProps extends SystemContextState {
  featureFlags?: FeatureFlags
  injectedData?: any
  isEigen?: boolean
  isLoggedIn?: boolean
  relayEnvironment: Environment
  searchQuery?: string
  userPreferences?: UserPreferences
}

export const SystemContext = createContext<SystemContextProps>(
  {} as unknown as SystemContextProps
)

export const SystemContextProvider: React.FC<
  React.PropsWithChildren<React.PropsWithChildren<Partial<SystemContextProps>>>
> = ({ children, ...props }) => {
  const [router, setRouter] = useState<SystemContextProps["router"]>(null)

  const [user, setUser] = useState<SystemContextProps["user"]>(
    getUser(props.user)
  )

  const relayEnvironment =
    props.relayEnvironment || createRelaySSREnvironment({ user })

  return (
    <SystemContext.Provider
      value={{
        ...props,
        isEigen: getENV("EIGEN") || props.isEigen,
        isLoggedIn: !!user,
        relayEnvironment,
        router,
        setRouter,
        setUser,
        user,
        userPreferences: {
          metric: getSupportedMetric(user?.length_unit_preference),
        },
      }}
    >
      {children}
    </SystemContext.Provider>
  )
}

export const withSystemContext = Component => {
  return props => {
    return (
      <SystemContextConsumer>
        {contextValues => {
          return <Component {...contextValues} {...props} />
        }}
      </SystemContextConsumer>
    )
  }
}

export const SystemContextConsumer = SystemContext.Consumer
