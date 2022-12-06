import { Join, Spacer, Text } from "@artsy/palette"
import { CreditCardInput } from "Components/CreditCardInput"
import { useFormContext } from "Apps/Auction/Hooks/useFormContext"
import { AddressForm } from "./AddressForm"

export const AddressFormWithCreditCard: React.FC = () => {
  const {
    setFieldValue,
    setFieldTouched,
    setFieldError,
    errors,
    touched,
  } = useFormContext()

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

      <AddressForm />
    </Join>
  )
}
