import { AddressFormValues } from "Apps/Invoice/Components/AddressFormWithCreditCard"
import { useFormikContext } from "formik"

export const useFormContext = () => {
  const context = useFormikContext<AddressFormValues>()
  return context
}
