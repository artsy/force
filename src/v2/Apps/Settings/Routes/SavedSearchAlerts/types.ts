export interface EditAlertEntity {
  id: string
  name: string
  artistIds: string[]
}

export interface EditAlertFormBase {
  editAlertEntity: EditAlertEntity
  onCloseClick: () => void
  onDeleteClick: () => void
  onCompleted: () => void
}
