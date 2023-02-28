import { ModalDialog, Text } from "@artsy/palette"
import {
  ModalKey,
  useManageListsForArtworkContext,
} from "Apps/CollectorProfile/Routes/Saves2/Components/ManageListsForArtwork/ManageListsForArtworkProvider"
import { SelectListsForArtworkModalQueryRender } from "Apps/CollectorProfile/Routes/Saves2/Components/SelectListsForArtworkModal/SelectListsForArtworkModal"

export const ManageListsForArtworkContent = () => {
  const { state, onClose } = useManageListsForArtworkContext()

  if (state.currentModalKey === ModalKey.SelectListsForArtwork) {
    return <SelectListsForArtworkModalQueryRender />
  }

  return (
    <ModalDialog title="Create a new list" onClose={onClose} m={0}>
      <Text>Create a new list</Text>
    </ModalDialog>
  )
}
