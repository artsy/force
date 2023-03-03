import {
  CreateNewListModal,
  NewAddedList,
} from "Apps/CollectorProfile/Routes/Saves2/Components/CreateNewListModal"
import { SelectListsForArtworkModalQueryRender } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkModal"
import { createContext, Dispatch, FC, useContext, useReducer } from "react"

export enum ModalKey {
  SelectListsForArtwork,
  CreateNewList,
}

type State = {
  currentModalKey: ModalKey
  artwork: ArtworkEntity | null
  isSavedToList: boolean
  addingListIDs: string[]
  removingListIDs: string[]
  preselectedListIDs: string[]
  selectedIds: string[]
  recentlyAddedList: NewAddedList | null
}

export enum ListKey {
  AddingListIDs = "addingListIDs",
  RemovingListIDs = "removingListIDs",
}

type Action =
  | { type: "SET_MODAL_KEY"; payload: ModalKey }
  | { type: "SET_PRESELECTED_LIST_IDS"; payload: string[] }
  | { type: "SET_IS_SAVED_TO_LIST"; payload: boolean }
  | { type: "SET_RECENTLY_ADDED_LIST"; payload: NewAddedList | null }
  | { type: "SET_ARTWORK"; payload: ArtworkEntity | null }
  | {
      type: "ADD_OR_REMOVE_LIST_ID"
      payload: { listKey: ListKey; listID: string }
    }

interface ArtworkEntity {
  id: string
  title: string
  imageURL: string | null
}

export interface ManageArtworkForSavesContextState {
  state: State
  savedListId?: string
  dispatch: Dispatch<Action>
  onSave: (collectionIds: string[]) => void
}

interface ProviderProps {
  savedListId?: string
  artwork?: ArtworkEntity
}

export const INITIAL_STATE: State = {
  currentModalKey: ModalKey.SelectListsForArtwork,
  artwork: null,
  // TODO: Dynamicaly pass it
  isSavedToList: false,
  addingListIDs: [],
  removingListIDs: [],
  preselectedListIDs: [],
  selectedIds: [],
  recentlyAddedList: null,
}

export const ManageArtworkForSaves = createContext<
  ManageArtworkForSavesContextState
>((null as unknown) as ManageArtworkForSavesContextState)

export const useManageArtworkForSavesContext = () => {
  return useContext(ManageArtworkForSaves)
}

/**
 *
 * If `savedListId` was passed, it means the user is on a saved artwork list page
 * In this case, whether the artwork is saved or not will depend on the local state (not on the status received from backend)
 *
 * https://artsy.net/collector-profile/saves2
 */
export const ManageArtworkForSavesProvider: FC<ProviderProps> = ({
  children,
  savedListId,
  artwork,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...INITIAL_STATE,
    artwork: artwork ?? null,
    isSavedToList: !!savedListId,
  })

  const onSave = (listIds: string[]) => {
    if (savedListId) {
      dispatch({
        type: "SET_IS_SAVED_TO_LIST",
        payload: listIds.includes(savedListId),
      })
    }
  }

  const value: ManageArtworkForSavesContextState = {
    state,
    savedListId,
    dispatch,
    onSave,
  }

  const openSelectListsForArtworkModal = () => {
    dispatch({
      type: "SET_MODAL_KEY",
      payload: ModalKey.SelectListsForArtwork,
    })
  }

  const onNewListCreated = (payload: NewAddedList) => {
    dispatch({
      type: "SET_RECENTLY_ADDED_LIST",
      payload,
    })
    dispatch({
      type: "ADD_OR_REMOVE_LIST_ID",
      payload: {
        listKey: ListKey.AddingListIDs,
        listID: payload.id,
      },
    })
    openSelectListsForArtworkModal()
  }

  const renderModalByKey = () => {
    if (state.currentModalKey === ModalKey.CreateNewList) {
      return (
        <CreateNewListModal
          onClose={openSelectListsForArtworkModal}
          onBackClick={openSelectListsForArtworkModal}
          onComplete={onNewListCreated}
        />
      )
    }

    return <SelectListsForArtworkModalQueryRender />
  }

  return (
    <ManageArtworkForSaves.Provider value={value}>
      {children}
      {!!state.artwork && renderModalByKey()}
    </ManageArtworkForSaves.Provider>
  )
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_MODAL_KEY":
      return {
        ...state,
        currentModalKey: action.payload,
      }
    case "ADD_OR_REMOVE_LIST_ID":
      const { listID, listKey } = action.payload
      const ids = state[action.payload.listKey]

      if (ids.includes(listID)) {
        return {
          ...state,
          [listKey]: ids.filter(id => id !== listID),
        }
      }

      return {
        ...state,
        [listKey]: [...ids, listID],
      }
    case "SET_PRESELECTED_LIST_IDS":
      return {
        ...state,
        preselectedListIDs: action.payload,
      }
    case "SET_IS_SAVED_TO_LIST":
      return {
        ...state,
        isSavedToList: action.payload,
      }
    case "SET_RECENTLY_ADDED_LIST":
      return {
        ...state,
        recentlyAddedList: action.payload,
      }
    case "SET_ARTWORK":
      return {
        ...state,
        artwork: action.payload,
      }
    default:
      return state
  }
}
