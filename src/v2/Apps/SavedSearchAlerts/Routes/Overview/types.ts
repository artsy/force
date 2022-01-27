import { SavedSearchAleftFormValues } from "v2/Components/SavedSearchAlert/SavedSearchAlertModel"

export interface EditAlertEntity {
  id: string
  name: string
  artistId: string
}

export interface EditFormProps {
  initialValues: SavedSearchAleftFormValues
  editAlertEntity: EditAlertEntity
  onSubmit: (values: SavedSearchAleftFormValues) => void
  onCloseClick: () => void
  onDeleteClick: () => void
}
