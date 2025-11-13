import { FormikOfferInput } from "Apps/Order2/Routes/Checkout/Components/OfferStep/Components/FormikOfferInput"
import type { OfferFormProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"

export const Order2HiddenPriceOfferForm: React.FC<OfferFormProps> = () => {
  return <FormikOfferInput name="offerValue" />
}
