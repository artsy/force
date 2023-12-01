import { Router } from "found"
import { createContext, FC, useMemo, useState } from "react"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import { Environment } from "react-relay"

import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { getUser } from "Utils/user"
import { FeatureFlags } from "./useFeatureFlag"
import { UserPreferences } from "Server/middleware/userPreferencesMiddleware"

export * from "./useSystemContext"

/**
 * FIXME: Use a proper state management library. Ran into problems with useReducer
 * leading to an infinite loop.
 */
export type SystemContextState = Partial<{
  /**
   * Toggle for setting global fetch state, typically set in RenderStatus
   */
  isFetching: boolean
  setFetching: (isFetching: boolean) => void

  /**
   * The current router instance
   */
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
  /**
   * Is the user opening a Reaction page from the mobile app
   */
  isEigen?: boolean

  /**
   * A configured environment object that can be used for any Relay operations
   * that need an environment object.
   *
   * If none is provided to the `SystemContextProvider` then one is created,
   * using the `user` if available.
   */
  relayEnvironment: Environment

  /**
   * The current search query.
   * FIXME: Move this to a more appropriate place
   */
  searchQuery?: string

  /**
   * Useful for passing arbitrary data from Force.
   */
  injectedData?: any

  /** Is there a logged in user? */
  isLoggedIn?: boolean

  /** FeatureFlags */
  featureFlags?: FeatureFlags

  /** User Preferences */
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
