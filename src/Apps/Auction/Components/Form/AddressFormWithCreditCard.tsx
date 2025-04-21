import { Join, Spacer, Text } from "@artsy/palette"
import type { AuctionFormValues } from "Apps/Auction/Components/Form/Utils/initialValues"
import { useAuctionFormContext } from "Apps/Auction/Hooks/useAuctionFormContext"
import { AddressFormFields } from "Components/Address/AddressFormFields"
import { CreditCardInput } from "Components/CreditCardInput"

export const AddressFormWithCreditCard: React.FC<
  React.PropsWithChildren<unknown>
> = () => {
  const { setFieldValue, setFieldTouched, setFieldError, errors, touched } =
    useAuctionFormContext()

  return (
    <Join separator={<Spacer y={2} />}>
      <Text variant="sm-display">
        Registration is free. A valid credit card is required in order to bid.
        Please enter your credit card information below. The name on your Artsy
        account must match the name on the card.
      </Text>

      <Text variant="sm-display">Credit Card</Text>

      <CreditCardInput
        error={touched.creditCard && errors.creditCard}
        onChange={event => {
          setFieldTouched("creditCard", true)

          if (event.error?.message) {
            setFieldValue("creditCard", false)
            setFieldError("creditCard", event.error?.message)
            return
          }
          if (!event.complete) {
            setFieldValue("creditCard", false)
            return
          }
          if (event.complete) {
            setFieldValue("creditCard", true)
            return
          }
        }}
        required
      />

      <AddressFormFields<AuctionFormValues> withLegacyPhoneInput />
    </Join>
  )
}
