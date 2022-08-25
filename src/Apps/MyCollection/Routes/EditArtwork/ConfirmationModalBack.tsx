import { Button, ModalDialog, Text } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"

interface ConfirmationModalProps {
  onClose: () => void
  handleSubmit: string
  isEditing: boolean
}
export const ConfirmationModalBack: React.FC<ConfirmationModalProps> = ({
  onClose,
  isEditing,
  handleSubmit,
}) => {
  return (
    <ModalDialog
      title="Leave without saving?"
      onClose={onClose}
      width={["100%", 600]}
      footer={
        <>
          <Button
            // @ts-ignore
            as={RouterLink}
            to={handleSubmit}
            width="100%"
            data-testid="leave-button"
          >
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
      <Text>
        {isEditing
          ? "Changes you have made so far will not be saved."
          : "Your artwork will not be added to My Collection."}
      </Text>
    </ModalDialog>
  )
}
