import { Join, Spacer, Text } from "@artsy/palette"
import {
  AddressErrors,
  AddressForm,
  AddressTouched,
} from "v2/Components/AddressForm"
import { CreditCardInput } from "v2/Components/CreditCardInput"
import { useFormContext } from "v2/Apps/Auction2/Hooks/useFormContext"

export const AddressFormWithCreditCard: React.FC = () => {
  const {
    setFieldValue,
    setFieldError,
    errors,
    values,
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
        error={errors.creditCard as string}
        onChange={({ error }) => setFieldError("creditCard", error?.message)}
      />

      <AddressForm
        value={values.address}
        onChange={address => {
          setFieldValue("address", address)
        }}
        errors={errors.address as AddressErrors}
        touched={touched.address as AddressTouched}
        billing
        showPhoneNumberInput
      />
    </Join>
  )
}
