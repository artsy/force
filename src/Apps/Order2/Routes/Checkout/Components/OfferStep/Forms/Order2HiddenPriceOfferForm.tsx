import { OfferInput } from "Apps/Order/Components/OfferInput"
import type { OfferFormProps } from "Apps/Order2/Routes/Checkout/Components/OfferStep/types"

export const Order2HiddenPriceOfferForm: React.FC<OfferFormProps> = ({
  offerValue,
  formIsDirty,
  onOfferValueChange,
  onOfferOptionSelected,
}) => {
  return (
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
  )
}
