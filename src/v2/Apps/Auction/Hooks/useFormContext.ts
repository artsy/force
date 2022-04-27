import { useFormikContext } from "formik"
import { AuctionFullFormValues } from "v2/Apps/Auction/Components/Form/Utils"

export const useFormContext = () => {
  const context = useFormikContext<AuctionFullFormValues>()
  return context
}
