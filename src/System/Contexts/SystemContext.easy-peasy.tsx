import { createContextStore, Action, action, Thunk, thunk } from "easy-peasy"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import { getENV } from "Utils/getENV"
import { type Metric, getSupportedMetric } from "Utils/metrics"
import { getUser } from "Utils/user"
import type { Router } from "found"
import type { Environment } from "react-relay"

// Import User type from gravity typings
/// <reference path="../../Typings/gravity.d.ts" />

export type UserPreferences = {
  metric: Metric
}

interface FeatureFlags {
  isEnabled: (flag: string) => boolean
  getVariant: (flag: string) => any
}

// Easy-peasy store model interface
interface SystemStoreModel {
  // State
  router: Router | null
  user: User
  featureFlags?: FeatureFlags
  injectedData?: any
  isEigen?: boolean
  isLoggedIn?: boolean
  relayEnvironment: Environment
  searchQuery?: string
  userPreferences?: UserPreferences

  // Actions
  setRouter: Action<SystemStoreModel, Router>
  setUser: Action<SystemStoreModel, User>
  updateRelayEnvironment: Thunk<SystemStoreModel>
}

// Create the context store
export const SystemStore = createContextStore<SystemStoreModel>(
  runtimeModel => {
    const initialUser = getUser(runtimeModel?.user)

    return {
      // State
      router: null,
      user: initialUser,
      featureFlags: runtimeModel?.featureFlags,
      injectedData: runtimeModel?.injectedData,
      isEigen: getENV("EIGEN") || runtimeModel?.isEigen,
      isLoggedIn: !!initialUser,
      relayEnvironment:
        runtimeModel?.relayEnvironment ||
        createRelaySSREnvironment({ user: initialUser }),
      searchQuery: runtimeModel?.searchQuery,
      userPreferences: {
        metric: getSupportedMetric(initialUser?.length_unit_preference),
      },

      // Actions
      setRouter: action((state, payload) => {
        state.router = payload
      }),

      setUser: action((state, payload) => {
        state.user = payload
        state.isLoggedIn = !!payload
        state.userPreferences = {
          metric: getSupportedMetric(payload?.length_unit_preference),
        }
      }),

      updateRelayEnvironment: thunk((actions, _, { getState }) => {
        const state = getState()
        // Create new relay environment with updated user
        const newEnvironment = createRelaySSREnvironment({ user: state.user })
        // Note: We can't directly update relayEnvironment in easy-peasy
        // This would need to be handled by re-mounting the provider
        console.warn("Relay environment update requires provider remount")
      }),
    }
  },
)

// Provider component with backward compatibility
export const SystemContextProvider: React.FC<
  React.PropsWithChildren<Partial<SystemStoreModel>>
> = ({ children, ...props }) => {
  return (
    <SystemStore.Provider runtimeModel={props}>{children}</SystemStore.Provider>
  )
}

// Backward compatible hook
export const useSystemContext = () => {
  const state = SystemStore.useStoreState(state => state)
  const actions = SystemStore.useStoreActions(actions => actions)

  return {
    ...state,
    ...actions,
  }
}

// HOC for backward compatibility
export const withSystemContext = Component => {
  return props => {
    const systemContext = useSystemContext()
    return <Component {...systemContext} {...props} />
  }
}

// Consumer for backward compatibility
export const SystemContextConsumer = ({ children }) => {
  const systemContext = useSystemContext()
  return children(systemContext)
}

// Export original context for migration compatibility
export const SystemContext = SystemStore
