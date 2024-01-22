import * as React from "react"
import { ModalDialog, Clickable, Text, Box } from "@artsy/palette"
import { useState } from "react"

interface ConditionInfoModalProps {
  onClose: () => void
}

export const ConditionInfoModal: React.FC<ConditionInfoModalProps> = ({
  onClose,
}) => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <Clickable
        onClick={() => {
          setShowModal(true)
        }}
      >
        <Text> Condition </Text>
      </Clickable>

      {showModal && (
        <ModalDialog onClose={() => setShowModal(false)}>
          <Text>
            <Box>Condition Definitions</Box>
            <Box>
              {" "}
              Excellent Condition: No signs of age or wear, undulation
              associated with hinging. Work may be unsealed in original
              packaging. Very Good Condition: Overall very good condition, minor
              signs of wear or age such as light handling creases, scuffing,
              foxing, discoloration, buckling, and pinholes. Also includes works
              that have been previously restored. Good Condition: Overall good
              condition but with noticeable wear or age such as hard creases,
              scratches, indentations, water damage (associated buckling),
              foxing, discoloration, attenuation, material loss and tearing. May
              require the attention of a conservator. Fair Condition: Overall
              fair condition with significant wear and age that requires the
              attention of a conservator.{" "}
            </Box>
          </Text>
        </ModalDialog>
      )}
    </>
  )
}
