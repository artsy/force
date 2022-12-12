import { Button, ModalDialog, Text } from "@artsy/palette"

interface ConfirmationModalProps {
  onClose: () => void
  handleDelete: () => void
}

export const ConfirmationModalDelete: React.FC<ConfirmationModalProps> = ({
  onClose,
  handleDelete,
}) => {
  return (
    <ModalDialog
      title="Delete this artwork?"
      onClose={onClose}
      width={["100%", 600]}
      footer={
        <>
          <Button
            onClick={handleDelete}
            width="100%"
            data-testid="submit-delete-button"
          >
            Delete Artwork
          </Button>
          <Button
            onClick={onClose}
            variant="secondaryNeutral"
            mt={2}
            width="100%"
          >
            Keep Artwork
          </Button>
        </>
      }
    >
      <Text>This artwork will be removed from My Collection.</Text>
    </ModalDialog>
  )
}
