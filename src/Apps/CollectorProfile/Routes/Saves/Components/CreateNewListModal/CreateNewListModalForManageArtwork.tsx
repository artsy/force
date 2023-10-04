import {
  CreateNewListModal,
  ArtworkList,
} from "Apps/CollectorProfile/Routes/Saves/Components/CreateNewListModal/CreateNewListModal"
import {
  ListKey,
  ModalKey,
  useManageArtworkForSavesContext,
} from "Components/Artwork/ManageArtworkForSaves"
import { FC } from "react"

export const CreateNewListModalForManageArtwork: FC = () => {
  const { state, dispatch } = useManageArtworkForSavesContext()
  const artwork = state.artwork!

  const openSelectListsForArtworkModal = () => {
    dispatch({
      type: "SET_MODAL_KEY",
      payload: ModalKey.SelectListsForArtwork,
    })
  }

  const onNewListCreated = (payload: ArtworkList) => {
    dispatch({
      type: "SET_RECENTLY_ADDED_LIST",
      payload,
    })
    dispatch({
      type: "ADD_OR_REMOVE_LIST_ID",
      payload: {
        listKey: ListKey.AddingListIDs,
        listID: payload.internalID,
      },
    })
    openSelectListsForArtworkModal()
  }

  return (
    <CreateNewListModal
      onClose={openSelectListsForArtworkModal}
      onBackClick={openSelectListsForArtworkModal}
      onComplete={onNewListCreated}
      artwork={{
        title: artwork.title,
        year: artwork.year,
        artistNames: artwork.artistNames,
        imageURL: artwork.imageURL,
      }}
    />
  )
}
