import { Router } from "found"
import { createContext, FC, useMemo, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import { Environment } from "react-relay"

import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { getUser } from "Utils/user"
import { UserPreferences } from "Server/middleware/userPreferencesMiddleware"
import { FeatureFlags } from "System/Hooks/useFeatureFlag"

/**
 * FIXME: Use a proper state management library. Ran into problems with useReducer
 * leading to an infinite loop.
 */
export type SystemContextState = Partial<{
  isFetching: boolean
  setFetching: (isFetching: boolean) => void
  router: Router | null
  setRouter: (router?: Router) => void

  /**
   * The currently signed-in user.
   *
   * Unless explicitely set to `null`, this will default to use the `USER_ID`
   * and `USER_ACCESS_TOKEN` environment variables if available.
   */
  user: User
  setUser: (user: User) => void
}>

/**
 * Globally accessible SystemContext values for use in Artsy apps
 */
export interface SystemContextProps extends SystemContextState {
  isEigen?: boolean
  relayEnvironment: Environment
  injectedData?: any
  isLoggedIn?: boolean
  featureFlags?: FeatureFlags
  searchQuery?: string
  userPreferences?: UserPreferences
}

export const SystemContext = createContext<SystemContextProps>(
  ({} as unknown) as SystemContextProps
)

export let setRouteFetching

/**
 * Creates a new Context.Provider with a user and Relay environment, or defaults
 * if not passed in as props.
 */
export const SystemContextProvider: FC<Partial<SystemContextProps>> = ({
  children,
  ...props
}) => {
  const [isFetching, setFetching] = useState<boolean>(false)
  const [router, setRouter] = useState<SystemContextProps["router"]>(null)
  const [user, setUser] = useState<SystemContextProps["user"]>(
    getUser(props.user)
  )

  // Globally export the fetch toggle so that we can access it from the router's
  // loadingIndicatorMiddleware actions
  setRouteFetching = useMemo(() => setFetching, [setFetching])

  const relayEnvironment =
    props.relayEnvironment || createRelaySSREnvironment({ user })

  const providerValues = {
    ...props,
    isFetching,
    setFetching,
    router,
    setRouter,
    relayEnvironment,
    user,
    setUser,
    isEigen: sd.EIGEN || props.isEigen,
    isLoggedIn: !!user,
  }

  return (
    <SystemContext.Provider value={providerValues}>
      {children}
    </SystemContext.Provider>
  )
}

export const SystemContextConsumer = SystemContext.Consumer

/**
 * A HOC utility function for injecting renderProps into a component.
 */
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
