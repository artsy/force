import { Action, action } from "easy-peasy"
import { Router } from "found"
import { Mediator } from "lib/mediator"
import { Environment } from "relay-runtime"

export interface SystemModel {
  /** Useful for passing arbitrary data from Force. */
  injectedData?: any

  /**
   * The current search query.
   * FIXME: Move this to a more appropriate place
   */
  searchQuery: string

  /** Is user viewing site from mobile webview */
  isEigen: boolean

  /** Toggle network request status */
  isFetching: boolean

  /** PubSub hub for communicating with wider force. Avoid if possible! */
  mediator: Mediator | null

  /** FIXME: This should be removed */
  notificationCount: number | null

  /** Relay environment  */
  relayEnvironment: Environment | null

  /** Current app router instance  */
  router: Router | null

  /** Current logged in user  */
  user: User | null

  setFetching: Action<SystemModel, boolean>
  setRouter: Action<SystemModel, Router>
  setUser: Action<SystemModel, User>
}

export const systemModel: SystemModel = {
  injectedData: null,
  isEigen: false,
  isFetching: false,
  mediator: null,
  notificationCount: null,
  relayEnvironment: null,
  router: null,
  searchQuery: "",
  user: null,

  setFetching: action((state, isFetching) => {
    state.isFetching = isFetching
  }),

  setRouter: action((state, router) => {
    state.router = router
  }),

  setUser: action((state, user) => {
    state.user = user
  }),
}
