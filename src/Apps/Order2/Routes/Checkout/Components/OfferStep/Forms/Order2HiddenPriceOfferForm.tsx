import { Box, Button, Flex, Spacer, Text, TextArea } from "@artsy/palette"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import type { OfferFormComponentProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"

export const Order2HiddenPriceOfferForm: React.FC<OfferFormComponentProps> = ({
  offerValue,
  offerNoteValue,
  formIsDirty,
  isSubmittingOffer,
  onOfferValueChange,
  onOfferOptionSelected,
  onOfferNoteChange,
  onContinueButtonPressed,
}) => {
  return (
    <Box pb={2} px={[2, 4]}>
      {/* Offer Amount Section */}
      <Flex flexDirection="column">
        <OfferInput
          id="OfferForm_offerValue"
          showError={formIsDirty && offerValue <= 0}
          onChange={onOfferValueChange}
          onBlur={() => {
            if (offerValue > 0) {
              onOfferOptionSelected(offerValue)
            }
          }}
          value={offerValue}
        />
      </Flex>

      <Spacer y={4} />

      {/* Offer Note Section */}
      <Flex flexDirection="column">
        <Text
          variant={["sm-display", "md"]}
          fontWeight={["bold", "normal"]}
          color="mono100"
        >
          Offer note
        </Text>
        <Text variant={["xs", "xs", "sm"]} color="mono100">
          Additional context to help the gallery evaluate your offer.
        </Text>

        <TextArea
          title="Note (recommended)"
          maxLength={1000}
          placeholder="Share what draws you to this work or artist, or add any context about your offer"
          onChange={onOfferNoteChange}
          value={offerNoteValue.value}
        />

        <Spacer y={4} />
        <Button
          variant="primaryBlack"
          width="100%"
          onClick={onContinueButtonPressed}
          loading={isSubmittingOffer}
          disabled={isSubmittingOffer}
        >
          Save and Continue
        </Button>
      </Flex>
    </Box>
  )
}
