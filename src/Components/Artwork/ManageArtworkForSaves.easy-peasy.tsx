import { createContextStore, Action, action, Thunk, thunk } from "easy-peasy"
import { useToasts } from "@artsy/palette"
import type { ArtworkList } from "Apps/CollectorProfile/Routes/Saves/Components/CreateNewListModal/CreateNewListModal"
import { CreateNewListModalForManageArtwork } from "Apps/CollectorProfile/Routes/Saves/Components/CreateNewListModal/CreateNewListModalForManageArtwork"
import { SelectArtworkListsModalQueryRender } from "Apps/CollectorProfile/Routes/Saves/Components/SelectArtworkListsModal/SelectArtworkListsModal"
import { BASE_SAVES_PATH } from "Apps/CollectorProfile/constants"
import { useState } from "react"
import { useRouter } from "System/Hooks/useRouter"

export enum ModalKey {
  SelectListsForArtwork = 0,
  CreateNewList = 1,
}

export enum ListKey {
  AddingListIDs = "addingListIDs",
  RemovingListIDs = "removingListIDs",
}

export interface ArtworkEntity {
  id: string
  internalID: string
  title: string
  year: string | null
  artistNames: string | null
  imageURL: string | null
}

export interface ResultListEntity {
  id: string
  name: string
}

export interface OnSaveResultData {
  selectedLists: ResultListEntity[]
  removedLists: ResultListEntity[]
  addedLists: ResultListEntity[]
}

// Easy-peasy store model interface
interface ManageArtworkForSavesStoreModel {
  // State
  currentModalKey: ModalKey
  artwork: ArtworkEntity | null
  addingListIDs: string[]
  removingListIDs: string[]
  recentlyAddedList: ArtworkList | null

  // Actions
  setModalKey: Action<ManageArtworkForSavesStoreModel, ModalKey>
  setRecentlyAddedList: Action<
    ManageArtworkForSavesStoreModel,
    ArtworkList | null
  >
  setArtwork: Action<ManageArtworkForSavesStoreModel, ArtworkEntity | null>
  addOrRemoveListId: Action<
    ManageArtworkForSavesStoreModel,
    { listKey: ListKey; listID: string }
  >
  reset: Action<ManageArtworkForSavesStoreModel>
}

export const INITIAL_STATE = {
  currentModalKey: ModalKey.SelectListsForArtwork,
  artwork: null,
  addingListIDs: [],
  removingListIDs: [],
  recentlyAddedList: null,
}

// Create the context store
export const ManageArtworkForSavesStore =
  createContextStore<ManageArtworkForSavesStoreModel>(runtimeModel => ({
    // State
    currentModalKey:
      runtimeModel?.currentModalKey || INITIAL_STATE.currentModalKey,
    artwork: runtimeModel?.artwork || INITIAL_STATE.artwork,
    addingListIDs: runtimeModel?.addingListIDs || INITIAL_STATE.addingListIDs,
    removingListIDs:
      runtimeModel?.removingListIDs || INITIAL_STATE.removingListIDs,
    recentlyAddedList:
      runtimeModel?.recentlyAddedList || INITIAL_STATE.recentlyAddedList,

    // Actions
    setModalKey: action((state, payload) => {
      state.currentModalKey = payload
    }),

    setRecentlyAddedList: action((state, payload) => {
      state.recentlyAddedList = payload
    }),

    setArtwork: action((state, payload) => {
      state.artwork = payload
    }),

    addOrRemoveListId: action((state, { listKey, listID }) => {
      const ids = state[listKey]

      if (ids.includes(listID)) {
        state[listKey] = ids.filter(id => id !== listID)
      } else {
        state[listKey] = [...ids, listID]
      }
    }),

    reset: action(state => {
      state.currentModalKey = INITIAL_STATE.currentModalKey
      state.artwork = INITIAL_STATE.artwork
      state.addingListIDs = INITIAL_STATE.addingListIDs
      state.removingListIDs = INITIAL_STATE.removingListIDs
      state.recentlyAddedList = INITIAL_STATE.recentlyAddedList
    }),
  }))

interface ProviderProps {
  savedListId?: string
  // Needed for testing purposes
  artwork?: ArtworkEntity
}

/**
 * Provider component with backward compatibility
 * If `savedListId` was passed, it means the user is on the artwork lists page
 * In this case, whether the artwork is saved or not will depend on the local state (not on the status received from backend)
 */
export const ManageArtworkForSavesProvider: React.FC<
  React.PropsWithChildren<ProviderProps>
> = ({ children, savedListId, artwork }) => {
  const [isSavedToList, setIsSavedToList] = useState(!!savedListId)
  const { sendToast } = useToasts()
  const { router } = useRouter()
  const state = ManageArtworkForSavesStore.useStoreState(state => state)
  const actions = ManageArtworkForSavesStore.useStoreActions(actions => actions)

  const navigateToSaveListById = (listId: string) => {
    router.push(`${BASE_SAVES_PATH}/${listId}`)
  }

  const navigateToSaves = () => {
    router.push(BASE_SAVES_PATH)
  }

  const showToastForAddedLists = (addedLists: ResultListEntity[]) => {
    if (addedLists.length === 1) {
      const list = addedLists[0]

      sendToast({
        variant: "success",
        message: `Added to ${list.name} list`,
        action: {
          label: "View List",
          onClick: () => {
            navigateToSaveListById(list.id)
          },
        },
      })

      return
    }

    sendToast({
      variant: "success",
      message: `Added to ${addedLists.length} lists`,
      action: {
        label: "View Saves",
        onClick: () => {
          navigateToSaves()
        },
      },
    })
  }

  const showToastForRemovedLists = (removedLists: ResultListEntity[]) => {
    if (removedLists.length === 1) {
      const list = removedLists[0]

      sendToast({
        variant: "message",
        message: `Removed from ${list.name}`,
      })

      return
    }

    sendToast({
      variant: "message",
      message: `Removed from ${removedLists.length} lists`,
    })
  }

  const showChangesSavedToast = () => {
    sendToast({
      variant: "success",
      message: "Changes saved",
    })
  }

  const onSave = (result: OnSaveResultData) => {
    const { selectedLists, addedLists, removedLists } = result

    if (savedListId) {
      const isSaved = selectedLists.find(list => list.id === savedListId)

      showChangesSavedToast()
      setIsSavedToList(!!isSaved)

      return
    }

    if (addedLists.length > 0 && removedLists.length > 0) {
      showChangesSavedToast()
      return
    }

    if (addedLists.length > 0) {
      showToastForAddedLists(addedLists)
    }

    if (removedLists.length > 0) {
      showToastForRemovedLists(removedLists)
    }
  }

  const renderModalByKey = () => {
    if (state.currentModalKey === ModalKey.CreateNewList) {
      return <CreateNewListModalForManageArtwork />
    }

    return <SelectArtworkListsModalQueryRender />
  }

  return (
    <ManageArtworkForSavesStore.Provider
      runtimeModel={{ ...state, artwork: artwork || state.artwork }}
    >
      <ManageArtworkForSavesContext.Provider
        value={{
          state,
          savedListId,
          isSavedToList,
          dispatch: (action: any) => {
            switch (action.type) {
              case "SET_MODAL_KEY":
                actions.setModalKey(action.payload)
                break
              case "SET_RECENTLY_ADDED_LIST":
                actions.setRecentlyAddedList(action.payload)
                break
              case "SET_ARTWORK":
                actions.setArtwork(action.payload)
                break
              case "ADD_OR_REMOVE_LIST_ID":
                actions.addOrRemoveListId(action.payload)
                break
              case "RESET":
                actions.reset()
                break
            }
          },
          reset: actions.reset,
          onSave,
        }}
      >
        {children}
        {!!state.artwork && renderModalByKey()}
      </ManageArtworkForSavesContext.Provider>
    </ManageArtworkForSavesStore.Provider>
  )
}

// Backward compatibility context
export interface ManageArtworkForSavesContextState {
  state: ReturnType<typeof ManageArtworkForSavesStore.useStoreState>
  savedListId?: string
  isSavedToList: boolean
  dispatch: (action: any) => void
  reset: () => void
  onSave: (result: OnSaveResultData) => void
}

const ManageArtworkForSavesContext =
  createContext<ManageArtworkForSavesContextState>(
    null as unknown as ManageArtworkForSavesContextState,
  )

// Backward compatible hook
export const useManageArtworkForSavesContext = () => {
  return useContext(ManageArtworkForSavesContext)
}

// Export original context name for migration compatibility
export const ManageArtworkForSaves = ManageArtworkForSavesStore
