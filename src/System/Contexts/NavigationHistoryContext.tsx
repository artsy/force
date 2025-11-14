import { Box, Button, Join, Separator, Stack, Text } from "@artsy/palette"
import { Z } from "Apps/Components/constants"
import { useRouter } from "System/Hooks/useRouter"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export interface NavigationHistoryContextType {
  // Array of paths visited in order of visit
  history: string[]
  addPath: (path: string) => void
  clearHistory: () => void
  previousPath: string | undefined
}

const NavigationHistoryContext = createContext<NavigationHistoryContextType>({
  history: [],
  addPath: () => {},
  clearHistory: () => {},
  previousPath: undefined,
})

/**
 * Provider component for NavigationHistoryContext
 */
export const NavigationHistoryProvider: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  const [history, setHistory] = useState<string[]>([])
  const { match } = useRouter()

  // Track navigation changes
  useEffect(() => {
    if (!match?.location?.pathname) return

    const currentPath = match.location.pathname

    setHistory(prevHistory => {
      // Don't add duplicate consecutive paths
      if (
        prevHistory.length > 0 &&
        prevHistory[prevHistory.length - 1] === currentPath
      ) {
        return prevHistory
      }
      return [...prevHistory, currentPath]
    })
  }, [match?.location?.pathname])

  const addPath = (path: string) => {
    setHistory(prevHistory => {
      // Don't add duplicate consecutive paths
      if (
        prevHistory.length > 0 &&
        prevHistory[prevHistory.length - 1] === path
      ) {
        return prevHistory
      }
      return [...prevHistory, path]
    })
  }

  const clearHistory = () => {
    setHistory([])
  }

  const previousPath = useMemo(() => {
    return history[history.length - 2]
  }, [history])

  return (
    <NavigationHistoryContext.Provider
      value={{
        history,
        addPath,
        clearHistory,
        previousPath,
      }}
    >
      {children}
    </NavigationHistoryContext.Provider>
  )
}

/**
 * Hook to access the navigation history
 */
export const useNavigationHistory = (): NavigationHistoryContextType => {
  const context = useContext(NavigationHistoryContext)

  if (context === undefined) {
    throw new Error(
      "useNavigationHistory must be used within a NavigationHistoryProvider",
    )
  }

  return context
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
