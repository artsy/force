enum ModalKey {
  SelectListsForArtwork,
  CreateNewList,
}

export enum ListKey {
  AddingListIDs = "addingListIDs",
  RemovingListIDs = "removingListIDs",
}

type State = {
  currentModalKey: ModalKey
  addingListIDs: string[]
  removingListIDs: string[]
  preselectedListIDs: string[]
  selectedIds: string[]
}

type Action =
  | { type: "SET_MODAL_KEY"; payload: { key: ModalKey } }
  | { type: "SET_PRESELECTED_LIST_IDS"; payload: { ids: string[] } }
  | {
      type: "ADD_OR_REMOVE_LIST_ID"
      payload: { listKey: ListKey; listID: string }
    }

export const INITIAL_STATE: State = {
  currentModalKey: ModalKey.SelectListsForArtwork,
  addingListIDs: [],
  removingListIDs: [],
  preselectedListIDs: [],
  selectedIds: [],
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_MODAL_KEY":
      return { ...state, currentModalKey: action.payload.key }
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
      return { ...state, preselectedListIDs: action.payload.ids }
    default:
      return state
  }
}
