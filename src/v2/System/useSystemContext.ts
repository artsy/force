import { useStoreActions, useStoreState } from "./SystemContext"

/**
 * Custom hook to access SystemContext
 */
export const useSystemContext = () => {
  const systemContext = useStoreState(state => state)
  const actions = useStoreActions(actions => actions)

  return {
    ...systemContext,
    ...actions,
  }
}
