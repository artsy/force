import { createContextStore, Action, action } from "easy-peasy"
import type { EditionSet } from "Apps/Artwork/Components/ArtworkSidebar/ArtworkSidebarEditionSets"

// Store model interface
interface SelectedEditionSetStoreModel {
  // State
  selectedEditionSet: EditionSet

  // Actions
  setSelectedEditionSet: Action<SelectedEditionSetStoreModel, EditionSet>
}

// Create the context store
export const SelectedEditionSetStore =
  createContextStore<SelectedEditionSetStoreModel>(runtimeModel => ({
    // State
    selectedEditionSet: runtimeModel?.selectedEditionSet || null,

    // Actions
    setSelectedEditionSet: action((state, payload) => {
      state.selectedEditionSet = payload
    }),
  }))

// Provider component with backward compatibility
export const SelectedEditionSetProvider: React.FC<
  React.PropsWithChildren<unknown>
> = ({ children }) => {
  return (
    <SelectedEditionSetStore.Provider>
      {children}
    </SelectedEditionSetStore.Provider>
  )
}

// Backward compatible hook
export const useSelectedEditionSetContext = () => {
  const selectedEditionSet = SelectedEditionSetStore.useStoreState(
    state => state.selectedEditionSet,
  )
  const setSelectedEditionSet = SelectedEditionSetStore.useStoreActions(
    actions => actions.setSelectedEditionSet,
  )

  return {
    selectedEditionSet,
    setSelectedEditionSet,
  }
}

// Export alias for migration compatibility
export const SelectedEditionSetContext = SelectedEditionSetStore
