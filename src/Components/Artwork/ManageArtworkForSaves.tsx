import { useToasts } from "@artsy/palette"
import { BASE_SAVES_PATH } from "Apps/CollectorProfile/constants"
import { ArtworkList } from "Apps/CollectorProfile/Routes/Saves/Components/CreateNewListModal/CreateNewListModal"
import { CreateNewListModalForManageArtwork } from "Apps/CollectorProfile/Routes/Saves/Components/CreateNewListModal/CreateNewListModalForManageArtwork"
import { SelectArtworkListsModalQueryRender } from "Apps/CollectorProfile/Routes/Saves/Components/SelectArtworkListsModal/SelectArtworkListsModal"
import {
  createContext,
  Dispatch,
  FC,
  useContext,
  useReducer,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { useRouter } from "System/Hooks/useRouter"

export enum ModalKey {
  SelectListsForArtwork,
  CreateNewList,
}

type State = {
  currentModalKey: ModalKey
  artwork: ArtworkEntity | null
  addingListIDs: string[]
  removingListIDs: string[]
  recentlyAddedList: ArtworkList | null
}

export enum ListKey {
  AddingListIDs = "addingListIDs",
  RemovingListIDs = "removingListIDs",
}

type Action =
  | { type: "SET_MODAL_KEY"; payload: ModalKey }
  | { type: "SET_RECENTLY_ADDED_LIST"; payload: ArtworkList | null }
  | { type: "SET_ARTWORK"; payload: ArtworkEntity | null }
  | { type: "RESET" }
  | {
      type: "ADD_OR_REMOVE_LIST_ID"
      payload: { listKey: ListKey; listID: string }
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

export interface ManageArtworkForSavesContextState {
  state: State
  savedListId?: string
  isSavedToList: boolean
  dispatch: Dispatch<Action>
  reset: () => void
  onSave: (result: OnSaveResultData) => void
}

interface ProviderProps {
  savedListId?: string
  // Needed for testing purposes
  artwork?: ArtworkEntity
}

export const INITIAL_STATE: State = {
  currentModalKey: ModalKey.SelectListsForArtwork,
  artwork: null,
  addingListIDs: [],
  removingListIDs: [],
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
 * If `savedListId` was passed, it means the user is on the artwork lists page
 * In this case, whether the artwork is saved or not will depend on the local state (not on the status received from backend)
 */
export const ManageArtworkForSavesProvider: FC<ProviderProps> = ({
  children,
  savedListId,
  artwork,
}) => {
  const [isSavedToList, setIsSavedToList] = useState(!!savedListId)
  const [state, dispatch] = useReducer(reducer, {
    ...INITIAL_STATE,
    artwork: artwork ?? null,
  })

  const { t } = useTranslation()
  const { sendToast } = useToasts()
  const { router } = useRouter()

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
        message: t(
          "collectorSaves.manageArtworkForSaves.toasts.addedArtworkToList",
          {
            name: list.name,
          }
        ),
        action: {
          label: t(
            "collectorSaves.manageArtworkForSaves.toasts.viewListButton"
          ),
          onClick: () => {
            navigateToSaveListById(list.id)
          },
        },
      })

      return
    }

    sendToast({
      variant: "success",
      message: t(
        "collectorSaves.manageArtworkForSaves.toasts.addedArtworkToLists",
        {
          count: addedLists.length,
        }
      ),
      action: {
        label: t("collectorSaves.manageArtworkForSaves.toasts.viewSavesButton"),
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
        message: t(
          "collectorSaves.manageArtworkForSaves.toasts.removedArtworkFromList",
          {
            name: list.name,
          }
        ),
      })

      return
    }

    sendToast({
      variant: "message",
      message: t(
        "collectorSaves.manageArtworkForSaves.toasts.removedArtworkFromLists",
        {
          count: removedLists.length,
        }
      ),
    })
  }

  const showChangesSavedToast = () => {
    sendToast({
      variant: "success",
      message: t("collectorSaves.manageArtworkForSaves.toasts.changesSaved"),
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

  const reset = () => {
    dispatch({
      type: "RESET",
    })
  }

  const value: ManageArtworkForSavesContextState = {
    state,
    savedListId,
    isSavedToList,
    dispatch,
    reset,
    onSave,
  }

  const renderModalByKey = () => {
    if (state.currentModalKey === ModalKey.CreateNewList) {
      return <CreateNewListModalForManageArtwork />
    }

    return <SelectArtworkListsModalQueryRender />
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
    case "RESET":
      return INITIAL_STATE
    default:
      return state
  }
}
