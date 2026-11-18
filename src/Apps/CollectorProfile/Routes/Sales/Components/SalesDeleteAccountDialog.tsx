import { Button, Flex, ModalDialog, Text } from "@artsy/palette"

interface SalesDeleteAccountDialogProps {
  isDeleting: boolean
  onCancel: () => void
  onConfirm: () => void
}

export const SalesDeleteAccountDialog: React.FC<
  SalesDeleteAccountDialogProps
> = ({ isDeleting, onCancel, onConfirm }) => {
  // Closing mid-request would hide the outcome of the delete
  const handleClose = () => {
    if (!isDeleting) {
      onCancel()
    }
  }

  return (
    <ModalDialog
      title="Delete payout account?"
      width={440}
      onClose={handleClose}
    >
      <Text variant="sm">
        This closes your Stripe account. You won’t be able to receive payments
        for your sales until you set up a new one.
      </Text>

      <Flex justifyContent="flex-end" gap={1} mt={4}>
        <Button
          variant="secondaryBlack"
          onClick={onCancel}
          disabled={isDeleting}
        >
          Cancel
        </Button>

        <Button onClick={onConfirm} loading={isDeleting}>
          Delete account
        </Button>
      </Flex>
    </ModalDialog>
  )
}
