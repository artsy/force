import { useFormikContext } from "formik"
import { AuctionFormValues } from "v2/Apps/Auction2/Components/Form/Utils"

export const useFormContext = () => {
  const context = useFormikContext<AuctionFormValues>()
  return context
}
