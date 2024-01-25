import { ModalDialog, Text, Spacer, Button } from "@artsy/palette"

interface ConditionInfoModalProps {
  onClose: () => void
}

export const ConditionInfoModal: React.FC<ConditionInfoModalProps> = ({
  onClose,
}) => {
  return (
    <>
      <ModalDialog title="Condition Definitions" onClose={onClose}>
        <Text variant="sm" fontWeight="bold">
          Excellent Condition:
        </Text>
        <Text>
          No signs of age or wear, undulation associated with hinging. Work may
          be unsealed in original packaging.
        </Text>
        <Spacer y={2} />
        <Text fontWeight="bold">Very Good Condition:</Text>
        <Text>
          Overall very good condition, minor signs of wear or age such as light
          handling creases, scuffing, foxing, discoloration, buckling, and
          pinholes. Also includes works that have been previously restored.
        </Text>
        <Spacer y={2} />
        <Text fontWeight="bold">Good Condition:</Text>
        <Text>
          Overall good condition but with noticeable wear or age such as hard
          creases, scratches, indentations, water damage (associated buckling),
          foxing, discoloration, attenuation, material loss and tearing. May
          require the attention of a conservator.
        </Text>
        <Spacer y={2} />
        <Text fontWeight="bold">Fair Condition:</Text>
        <Text>
          Overall fair condition with significant wear and age that requires the
          attention of a conservator.
        </Text>
        <Spacer y={2} />
        <Button width="100%" onClick={onClose}>
          Ok
        </Button>
      </ModalDialog>
    </>
  )
}
