import { Box, Button, Flex, Spacer, Text, TextArea } from "@artsy/palette"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import type { OfferFormComponentProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"

interface Order2HiddenPriceOfferFormProps extends OfferFormComponentProps {}

export const Order2HiddenPriceOfferForm: React.FC<
  Order2HiddenPriceOfferFormProps
> = ({
  offerValue,
  offerNoteValue,
  formIsDirty,
  isSubmittingOffer,
  onOfferValueChange,
  onOfferNoteChange,
  onOfferInputFocus,
  onContinueButtonPressed,
}) => {
  return (
    <>
      {/* Offer Amount Section */}

      <Flex flexDirection="column">
        <OfferInput
          id="OfferForm_offerValue"
          showError={formIsDirty && offerValue <= 0}
          onChange={onOfferValueChange}
          onFocus={onOfferInputFocus}
          value={offerValue}
        />
      </Flex>

      <Spacer y={2} />

      {/* Offer Note Section */}
      <Box py={2} px={[2, 4]}>
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
    </>
  )
}
