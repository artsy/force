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
      m={0}
      dialogProps={{
        width: "100%",
        height: "100%",
      }}
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
