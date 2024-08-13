import { ModalDialog, Text, Spacer, Button, Join } from "@artsy/palette"

interface ConditionInfoModalProps {
  onClose: () => void
}

export const ConditionInfoModal: React.FC<ConditionInfoModalProps> = ({
  onClose,
}) => {
  return (
    <ModalDialog
      title="Condition Definitions"
      width={["100%", 600]}
      onClose={onClose}
      footer={
        <Button onClick={onClose} width="100%">
          OK
        </Button>
      }
    >
      <Join separator={<Spacer y={2} />}>
        <Text>
          <Text variant="sm" fontWeight="bold">
            Excellent Condition:
          </Text>
          No signs of age or wear, undulation associated with hinging. Work may
          be unsealed in original packaging.
        </Text>
        <Text>
          <Text fontWeight="bold">Very Good Condition:</Text>
          Overall very good condition, minor signs of wear or age such as light
          handling creases, scuffing, foxing, discoloration, buckling, and
          pinholes. Also includes works that have been previously restored.
        </Text>

        <Text>
          <Text fontWeight="bold">Good Condition:</Text>
          Overall good condition but with noticeable wear or age such as hard
          creases, scratches, indentations, water damage (associated buckling),
          foxing, discoloration, attenuation, material loss and tearing. May
          require the attention of a conservator.
        </Text>

        <Text>
          <Text fontWeight="bold">Fair Condition:</Text>
          Overall fair condition with significant wear and age that requires the
          attention of a conservator.
        </Text>
      </Join>
    </ModalDialog>
  )
}
