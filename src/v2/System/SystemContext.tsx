import { Action, action, createContextStore } from "easy-peasy"
import { Router } from "found"
import { Mediator, mediator as baseMediator } from "lib/mediator"
import { Environment } from "relay-runtime"
import { createRelaySSREnvironment } from "./Relay/createRelaySSREnvironment"
import { data as sd } from "sharify"
import React from "react"
import { useSystemContext } from "./useSystemContext"
import createLogger from "redux-logger"

export interface FixMeOneOffProps {
  /** Used to hydrate search queries in Apps/Search */
  searchQuery: string
}

export interface SystemContextProps extends FixMeOneOffProps {
  /** Useful for passing arbitrary data from Force. */
  injectedData: any

  /** Is user viewing site from mobile webview */
  isEigen: boolean

  /** Toggle network request status */
  isFetching: boolean

  /** PubSub hub for communicating with wider force. Avoid if possible! */
  mediator: Mediator | null

  /** Relay environment  */
  relayEnvironment: Environment | null

  /** Current app router instance  */
  router: Router | null

  /** Current logged in user  */
  user: User | null

  setIsEigen: Action<SystemContextProps, boolean>
  setFetching: Action<SystemContextProps, boolean>
  setRouter: Action<SystemContextProps, Router>
  setUser: Action<SystemContextProps, User>
}

const SystemContextStore = createContextStore<SystemContextProps>(
  runtimeModel => ({
    injectedData: null,
    isEigen: runtimeModel!.isEigen,
    isFetching: false,
    mediator: runtimeModel!.mediator,
    relayEnvironment: runtimeModel!.relayEnvironment,
    router: null,
    searchQuery: "",
    user: runtimeModel!.user,

    setIsEigen: action((state, isEigen) => {
      state.isEigen = isEigen
    }),

    setFetching: action((state, isFetching) => {
      state.isFetching = isFetching
    }),

    setRouter: action((state, router) => {
      state.router = router
    }),

    setUser: action((state, user) => {
      state.user = user
    }),
  }),
  {
    middleware: [
      createLogger({
        collapsed: true,
      }),
    ],
  }
)

type SystemContextProviderProps = Partial<
  Pick<
    SystemContextProps,
    "isEigen" | "mediator" | "relayEnvironment" | "searchQuery" | "user"
  >
>

export const SystemContextProvider: React.FC<SystemContextProviderProps> = ({
  children,
  ...props
}) => {
  const isEigen = props.isEigen || sd.EIGEN
  const mediator = props.mediator || baseMediator
  const relayEnvironment =
    props.relayEnvironment ?? createRelaySSREnvironment({ user: props.user })

  return (
    <SystemContextStore.Provider
      runtimeModel={
        {
          isEigen,
          mediator,
          relayEnvironment,
        } as SystemContextProps
      }
    >
      {children}
    </SystemContextStore.Provider>
  )
}

/**
 * WARNING: Deprecated.
 *
 * The following components are *deprecated* and are only here for backwards
 * compatability with older class-based react components.
 */

export const SystemContextConsumer: React.FC<{
  children: (systemContext: SystemContextProviderProps) => JSX.Element | null
}> = ({ children }) => {
  const systemContext = useSystemContext()
  return children(systemContext)
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

export const { useStoreActions, useStoreState } = SystemContextStore
export const _SystemContextProvider = SystemContextStore.Provider
