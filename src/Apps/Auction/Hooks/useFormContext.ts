import { AuctionFormValues } from "Apps/Auction/Components/Form/Utils/initialValues"
import { useFormikContext } from "formik"

export const useFormContext = () => {
  const context = useFormikContext<AuctionFormValues>()
  return context
}
