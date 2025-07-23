import { createContextStore, Action, action } from "easy-peasy"

/**
 * Used to configure internal details of the Artwork Grid / Brick without
 * needing to pass props all the way through the artwork filter on down.
 */
interface ArtworkGridContextProps {
  /**
   * If its an auction artwork, no need to show bid badge, and show lot number
   */
  isAuctionArtwork?: boolean

  hideLotLabel?: boolean

  saveOnlyToDefaultList?: boolean

  hideSignals?: boolean

  signals?: { [id: string]: string[] }

  updateSignals?: (id: string, newSignals: string[]) => void
}

// Store model interface
interface ArtworkGridStoreModel {
  // State
  isAuctionArtwork: boolean
  hideLotLabel: boolean
  saveOnlyToDefaultList: boolean
  hideSignals: boolean
  signals: { [id: string]: string[] }

  // Actions
  updateSignals: Action<
    ArtworkGridStoreModel,
    { id: string; newSignals: string[] }
  >
  setConfig: Action<ArtworkGridStoreModel, Partial<ArtworkGridContextProps>>
}

// Create the context store
export const ArtworkGridStore = createContextStore<ArtworkGridStoreModel>(
  runtimeModel => ({
    // State
    isAuctionArtwork: runtimeModel?.isAuctionArtwork || false,
    hideLotLabel: runtimeModel?.hideLotLabel || false,
    saveOnlyToDefaultList: runtimeModel?.saveOnlyToDefaultList || false,
    hideSignals: runtimeModel?.hideSignals || false,
    signals: runtimeModel?.signals || {},

    // Actions
    updateSignals: action((state, { id, newSignals }) => {
      state.signals[id] = newSignals
    }),

    setConfig: action((state, payload) => {
      Object.assign(state, payload)
    }),
  }),
)

// Provider component
export const ArtworkGridContextProvider: React.FC<
  React.PropsWithChildren<ArtworkGridContextProps>
> = ({ children, ...rest }) => {
  return (
    <ArtworkGridStore.Provider runtimeModel={rest}>
      {children}
    </ArtworkGridStore.Provider>
  )
}

// Backward compatible hook
export const useArtworkGridContext = () => {
  const state = ArtworkGridStore.useStoreState(state => state)
  const { updateSignals } = ArtworkGridStore.useStoreActions(actions => actions)

  // Wrap updateSignals to match original API
  const update = (id: string, newSignals: string[]) => {
    updateSignals({ id, newSignals })
  }

  return {
    isAuctionArtwork: state.isAuctionArtwork,
    hideLotLabel: state.hideLotLabel,
    saveOnlyToDefaultList: state.saveOnlyToDefaultList,
    hideSignals: state.hideSignals,
    signals: state.signals,
    updateSignals: update,
  }
}

// HOC for backward compatibility
export const withArtworkGridContext = <T,>(
  Component: React.ComponentType<React.PropsWithChildren<T>>,
) => {
  return (props: T) => {
    const contextValues = useArtworkGridContext()
    return <Component {...contextValues} {...props} />
  }
}

// Export alias for migration compatibility
export const ArtworkGridContext = ArtworkGridStore
