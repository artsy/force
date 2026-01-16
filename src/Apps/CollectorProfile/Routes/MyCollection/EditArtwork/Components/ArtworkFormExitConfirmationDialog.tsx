import { Button, ModalDialog, Text } from "@artsy/palette"

interface ConfirmationModalProps {
  isEditing?: boolean
  onClose: () => void
  onLeave: () => void
}
export const ArtworkFormExitConfirmationDialog: React.FC<
  React.PropsWithChildren<ConfirmationModalProps>
> = ({ isEditing, onClose, onLeave }) => {
  return (
    <ModalDialog
      title="Leave without saving?"
      onClose={onClose}
      width={["100%", 600]}
      footer={
        <>
          <Button onClick={onLeave} width="100%" data-testid="leave-button">
            Leave Without Saving
          </Button>
          <Button
            onClick={onClose}
            variant="secondaryNeutral"
            mt={2}
            width="100%"
          >
            {isEditing ? "Continue Editing" : "Continue Uploading Artwork"}
          </Button>
        </>
      }
    >
      <Text>Changes you have made so far will not be saved.</Text>
    </ModalDialog>
  )
}
