import { ModalDialog, Button, Join, Spacer } from "@artsy/palette"
import { Formik } from "formik"
import { SavedSearchAlertEditQueryRenderer } from "./SavedSearchEditAlert"
import { EditFormProps } from "../types"

export const SavedSearchEditFormMobile: React.FC<EditFormProps> = ({
  initialValues,
  editAlertEntity,
  onSubmit,
  onCloseClick,
  onDeleteClick,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      onSubmit={onSubmit}
    >
      {({ isSubmitting, handleSubmit }) => (
        <ModalDialog
          title={editAlertEntity.name}
          onClose={onCloseClick}
          footer={
            <Join separator={<Spacer mt={1} />}>
              <Button
                loading={isSubmitting}
                width="100%"
                onClick={() => handleSubmit()}
              >
                Save Alert
              </Button>
              <Button
                variant="secondaryOutline"
                width="100%"
                onClick={onDeleteClick}
              >
                Delete Alert
              </Button>
            </Join>
          }
        >
          <SavedSearchAlertEditQueryRenderer
            id={editAlertEntity.id}
            artistId={editAlertEntity.artistId}
          />
        </ModalDialog>
      )}
    </Formik>
  )
}
