import { Router } from "found"
import React, { SFC, useContext, useState } from "react"
import { data as sd } from "sharify"
import { Environment } from "relay-runtime"

import { createRelaySSREnvironment } from "v2/Artsy/Relay/createRelaySSREnvironment"
import { getUser } from "v2/Utils/user"
import { Mediator, mediator } from "lib/mediator"

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
  router: Router
  setRouter: (router: Router) => void

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
   * A PubSub hub, which should only be used for communicating with Force.
   */
  mediator?: Mediator

  /**
   * FIXME: Ask alloy how to pass one-off props like this in from force
   */
  notificationCount?: number

  /**
   * A configured environment object that can be used for any Relay operations
   * that need an environment object.
   *
   * If none is provided to the `SystemContextProvider` then one is created,
   * using the `user` if available.
   */
  relayEnvironment?: Environment

  /**
   * The current search query.
   * FIXME: Move this to a more appropriate place
   */
  searchQuery?: string

  /**
   * Useful for passing arbitrary data from Force.
   */
  injectedData?: any
}

export const SystemContext = React.createContext<SystemContextProps>({})

/**
 * Creates a new Context.Provider with a user and Relay environment, or defaults
 * if not passed in as props.
 */
export const SystemContextProvider: SFC<SystemContextProps> = ({
  children,
  ...props
}) => {
  const [isFetching, setFetching] = useState(false)
  const [router, setRouter] = useState(null)
  const [user, setUser] = useState(getUser(props.user))

  const relayEnvironment =
    props.relayEnvironment || createRelaySSREnvironment({ user })
  const providerValues = {
    ...props,
    isFetching,
    mediator: props.mediator || mediator,
    setFetching,
    router,
    setRouter,
    relayEnvironment,
    user,
    setUser,
    isEigen: sd.EIGEN,
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

/**
 * Custom hook to access SystemContext
 */
export const useSystemContext = () => {
  const systemContext = useContext(SystemContext)
  return systemContext
}
