import { Button, Flex, ModalDialog, Spacer, Text } from "@artsy/palette"
import { useRouter } from "System/Router/useRouter"

export const ConsignmentInquiryFormAbandonEditModal: React.FC<{
  show: boolean
  onClose: () => void
}> = ({ show, onClose }) => {
  const { router } = useRouter()

  if (!show) {
    return null
  }

  return (
    <ModalDialog onClose={onClose} title="Leave without sending message?">
      <Flex pb={2} flexDirection="column" alignItems={["stretch", "center"]}>
        <Text>
          Your message to the Sell with Artsy specialists will not been sent.
        </Text>

        <Spacer y={2} />

        <Button
          variant="primaryBlack"
          onClick={() => {
            router.go(-2)
          }}
          width="100%"
          data-testid="get-in-touch-leave-button"
        >
          Leave Without Sending
        </Button>

        <Spacer y={1} />

        <Button
          variant="primaryWhite"
          onClick={onClose}
          width="100%"
          data-testid="get-in-touch-continue-button"
          borderColor="black100"
        >
          Continue Editing Message
        </Button>
      </Flex>
      <Spacer y={4} />
    </ModalDialog>
  )
}
