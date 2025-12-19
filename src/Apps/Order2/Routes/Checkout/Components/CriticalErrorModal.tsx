import { Button, Flex, ModalDialog, Text } from "@artsy/palette"
import { useReturnToArtwork } from "Apps/Order2/Routes/Checkout/Hooks/useReturnToArtwork"

export const CriticalErrorModal: React.FC<{
  error: string | null
}> = ({ error }) => {
  const returnToArtwork = useReturnToArtwork()

  if (!error) {
    return null
  }

  const handleClose = () => {
    returnToArtwork()
  }

  const handleReload = () => {
    window.location.reload()
  }

  // Determine if reload should be available based on error type
  let canReload = false

  const title = "Checkout Error"
  let description: string

  switch (error) {
    case "loading_timeout":
      description =
        "There was an error loading your checkout. Please try refreshing the page."
      canReload = true
      break
    case "artwork_version_mismatch":
      description =
        "The artwork has been updated since you started checkout. Please return to the artwork to create a new order."
      break
    default:
      description =
        "There was an error with your checkout. Please return to the artwork and try again."
  }

  return (
    <ModalDialog title={title} width="450px" onClose={handleClose}>
      <Text variant="sm" mb={2}>
        {description}
      </Text>
      <Flex gap={1} justifyContent="flex-end">
        {canReload && (
          <Button variant="secondaryBlack" onClick={handleReload}>
            Reload
          </Button>
        )}
        <Button variant="primaryBlack" onClick={handleClose}>
          Return to Artwork
        </Button>
      </Flex>
    </ModalDialog>
  )
}
