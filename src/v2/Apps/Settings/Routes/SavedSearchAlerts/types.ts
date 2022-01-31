export interface EditAlertEntity {
  id: string
  name: string
  artistId: string
}

export interface EditFormProps {
  editAlertEntity: EditAlertEntity
  onCloseClick: () => void
  onDeleteClick: () => void
  onCompleted: () => void
}
