export interface EditAlertEntity {
  id: string
  name: string | undefined
  artistIds: string[]
}

export interface EditAlertFormBase {
  editAlertEntity: EditAlertEntity
  onCloseClick: () => void
  onDeleteClick: () => void
  onCompleted: () => void
}
