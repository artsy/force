import { Join, Spacer, Text } from "@artsy/palette"
import { CreditCardInput } from "v2/Components/CreditCardInput"
import { useFormContext } from "v2/Apps/Auction2/Hooks/useFormContext"
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
    <Join separator={<Spacer my={2} />}>
      <Text variant="md">
        Please enter your credit card information below. The name on your Artsy
        account must match the name on the card, and a valid credit card is
        required in order to bid.
      </Text>

      <Text variant="md">
        Registration is free. Artsy will never charge this card without your
        permission, and you are not required to use this card to pay if you win.
      </Text>

      <Text variant="md">Credit Card</Text>

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
