import { ModalDialog, Spacer } from "@artsy/palette"
import { EditAlertFormBase } from "../types"
import { SavedSearchAlertEditFormQueryRenderer } from "./SavedSearchAlertEditForm"

export const SavedSearchAlertEditFormMobile: React.FC<EditAlertFormBase> = ({
  editAlertEntity,
  onCloseClick,
  onDeleteClick,
  onCompleted,
}) => {
  return (
    <ModalDialog
      title={`Edit ${editAlertEntity.name}`}
      width="100vw"
      height="100vh"
      m={0}
      onClose={onCloseClick}
    >
      <Spacer mt={4} />
      <SavedSearchAlertEditFormQueryRenderer
        editAlertEntity={editAlertEntity}
        onDeleteClick={onDeleteClick}
        onCompleted={onCompleted}
      />
    </ModalDialog>
  )
}
