import type { AuctionFormValues } from "Apps/Auction/Components/Form/Utils/initialValues"
import { useFormikContext } from "formik"

export const useAuctionFormContext = () => {
  const context = useFormikContext<AuctionFormValues>()
  return context
}
