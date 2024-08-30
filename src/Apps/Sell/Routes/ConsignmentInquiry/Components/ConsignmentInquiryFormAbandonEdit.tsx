import { Button, Flex, ModalDialog, Spacer, Text } from "@artsy/palette"
import { useRouter } from "System/Hooks/useRouter"

export const ConsignmentInquiryFormAbandonEditModal: React.FC<{
  onClose: () => void
}> = ({ onClose }) => {
  const { router } = useRouter()
  return (
    <ModalDialog onClose={onClose} title="Leave without sending message?">
      <Flex pb={2} flexDirection="column" alignItems={["stretch", "center"]}>
        <Text>
          Your message to the Sell with Artsy specialists will not be sent.
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
    </ModalDialog>
  )
}
