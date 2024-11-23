import { Join, Spacer } from "@artsy/palette"
import { CreditCardInput } from "Components/CreditCardInput"
import { AddressFormValues } from "./AddressForm"
import { useFormContext } from "Apps/Invoice/Hooks/useFormContext"
import { AddressFormFields } from "Components/Address/AddressFormFields"

export const AddressFormWithCreditCard: React.FC<React.PropsWithChildren<
  unknown
>> = () => {
  const {
    setFieldValue,
    setFieldTouched,
    setFieldError,
    errors,
    touched,
  } = useFormContext()

  return (
    <Join separator={<Spacer y={2} />}>
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

      <AddressFormFields<AddressFormValues> />
    </Join>
  )
}
