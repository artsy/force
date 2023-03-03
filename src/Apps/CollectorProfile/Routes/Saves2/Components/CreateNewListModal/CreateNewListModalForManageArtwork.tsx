import {
  CreateNewListModal,
  NewAddedList,
} from "Apps/CollectorProfile/Routes/Saves2/Components/CreateNewListModal/CreateNewListModal"
import {
  ListKey,
  ModalKey,
  useManageArtworkForSavesContext,
} from "Components/Artwork/ManageArtworkForSaves"
import { FC } from "react"

export const CreateNewListModalForManageArtwork: FC = () => {
  const { dispatch } = useManageArtworkForSavesContext()

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

  return (
    <CreateNewListModal
      onClose={openSelectListsForArtworkModal}
      onBackClick={openSelectListsForArtworkModal}
      onComplete={onNewListCreated}
    />
  )
}
