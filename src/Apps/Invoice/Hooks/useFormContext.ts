import { AddressFormValues } from "Apps/Invoice/Components/AddressForm"
import { useFormikContext } from "formik"

export const useFormContext = () => {
  const context = useFormikContext<AddressFormValues>()
  return context
}
