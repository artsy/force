import {
  createContextStore,
  Action,
  action,
  Computed,
  computed,
} from "easy-peasy"
import { Box, Button, Join, Separator, Stack, Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useRouter } from "System/Hooks/useRouter"
import { useEffect, useMemo } from "react"

// Easy-peasy store model interface
interface NavigationHistoryStoreModel {
  // State
  history: string[]

  // Computed
  previousPath: Computed<NavigationHistoryStoreModel, string | undefined>

  // Actions
  addPath: Action<NavigationHistoryStoreModel, string>
  clearHistory: Action<NavigationHistoryStoreModel>
}

// Create the context store
export const NavigationHistoryStore =
  createContextStore<NavigationHistoryStoreModel>(runtimeModel => ({
    // State
    history: runtimeModel?.history || [],

    // Computed
    previousPath: computed(state => {
      return state.history[state.history.length - 2]
    }),

    // Actions
    addPath: action((state, path) => {
      // Don't add duplicate consecutive paths
      if (
        state.history.length > 0 &&
        state.history[state.history.length - 1] === path
      ) {
        return
      }
      state.history.push(path)
    }),

    clearHistory: action(state => {
      state.history = []
    }),
  }))

/**
 * Provider component for NavigationHistoryContext with backward compatibility
 */
export const NavigationHistoryProvider: React.FC<
  React.PropsWithChildren<Partial<NavigationHistoryStoreModel>>
> = ({ children, ...props }) => {
  const { match } = useRouter()
  const addPath = NavigationHistoryStore.useStoreActions(
    actions => actions.addPath,
  )

  // Track navigation changes
  useEffect(() => {
    if (!match?.location?.pathname) return

    const currentPath = match.location.pathname
    addPath(currentPath)
  }, [match?.location?.pathname, addPath])

  return (
    <NavigationHistoryStore.Provider runtimeModel={props}>
      {children}
    </NavigationHistoryStore.Provider>
  )
}

/**
 * Hook to access the navigation history - backward compatible
 */
export interface NavigationHistoryContextType {
  // Array of paths visited in order of visit
  history: string[]
  addPath: (path: string) => void
  clearHistory: () => void
  previousPath: string | undefined
}

export const useNavigationHistory = (): NavigationHistoryContextType => {
  const history = NavigationHistoryStore.useStoreState(state => state.history)
  const previousPath = NavigationHistoryStore.useStoreState(
    state => state.previousPath,
  )
  const actions = NavigationHistoryStore.useStoreActions(actions => actions)

  return {
    history,
    addPath: actions.addPath,
    clearHistory: actions.clearHistory,
    previousPath,
  }
}

/**
 * A debug component that displays the current navigation history
 * This is just for demonstration purposes
 */
export const NavigationHistoryDebug: React.FC = () => {
  const { history, clearHistory } = useNavigationHistory()

  const paths = useMemo(() => {
    return [...history].reverse()
  }, [history])

  return (
    <Box
      position="fixed"
      bottom={2}
      right={2}
      zIndex={Z.toasts}
      bg="mono0"
      p={1}
      border="1px solid"
      borderColor="mono10"
      borderRadius={1}
      maxWidth={300}
      maxHeight={200}
      overflow="auto"
    >
      <Stack gap={1}>
        <Stack
          gap={1}
          flexDirection="row"
          justifyContent="space-between"
          borderBottom="1px solid"
          borderColor="mono10"
          pb={1}
        >
          <Text variant="sm-display">History</Text>

          <Button size="small" variant="secondaryBlack" onClick={clearHistory}>
            Clear
          </Button>
        </Stack>

        {history.length > 0 ? (
          <Box>
            <Join separator={<Separator my={0.5} />}>
              {paths.map((path, index) => (
                <Text key={`${path}-${index}`} variant="xs" color="mono60">
                  <a href={path} target="_blank" rel="noreferrer">
                    {paths.length - index}. {path}
                  </a>
                </Text>
              ))}
            </Join>
          </Box>
        ) : (
          <Text variant="xs" color="mono60">
            Nothing yet
          </Text>
        )}
      </Stack>
    </Box>
  )
}

// Export original context name for migration compatibility
export const NavigationHistoryContext = NavigationHistoryStore
