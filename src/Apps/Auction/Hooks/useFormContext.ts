import { useFormikContext } from "formik"
import { AuctionFormValues } from "Apps/Auction/Components/Form/Utils"

export const useFormContext = () => {
  const context = useFormikContext<AuctionFormValues>()
  return context
}
