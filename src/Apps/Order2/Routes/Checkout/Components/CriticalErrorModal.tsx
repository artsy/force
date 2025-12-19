import { Button, Flex, ModalDialog, Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"

// TODO: Tracking

export const CriticalErrorModal: React.FC<{
  error: string | null
}> = ({ error }) => {
  const { artworkPath } = useCheckoutContext()
  const { router } = useRouter()

  if (!error) {
    return null
  }

  const sendToArtworkScreen = () => {
    router.replace(artworkPath)
  }

  const handleReload = () => {
    window.location.reload()
  }

  // Determine if reload should be available based on error type
  let canReload = false

  let title = "Checkout Error"
  let description: string

  switch (error) {
    case "loading_timeout":
      description = "There was an error loading your checkout."
      canReload = true
      break
    case "artwork_version_mismatch":
      title = "Work has been updated"
      description =
        "Something about the work changed since you started checkout. Please review the work before submitting your order."
      break
    case "artwork_not_for_sale":
      title = "Not available"
      description = "Sorry, the work is no longer available."
      break
    default:
      description =
        "There was an error with your checkout. Please return to the artwork and try again."
  }

  return (
    <ModalDialog title={title} width="450px" onClose={sendToArtworkScreen}>
      <Text variant="sm" mb={2}>
        {description}
      </Text>
      <Flex gap={1} justifyContent="center">
        {canReload && (
          <Button variant="secondaryBlack" onClick={handleReload}>
            Reload
          </Button>
        )}
        <RouterLink to={artworkPath}>
          <Button variant="primaryBlack" onClick={sendToArtworkScreen}>
            Return to Artwork
          </Button>
        </RouterLink>
      </Flex>
    </ModalDialog>
  )
}
