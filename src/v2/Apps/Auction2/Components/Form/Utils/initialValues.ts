import { FormikHelpers } from "formik"
import { Address, emptyAddress } from "v2/Components/AddressForm"

export interface AuctionFormValues {
  address?: Address
  agreeToTerms: boolean
  creditCard?: string
  selectedBid?: string
}

export const initialValuesForRegistration: Omit<
  AuctionFormValues,
  "selectedBid"
> = {
  address: emptyAddress,
  agreeToTerms: false,
  creditCard: (undefined as unknown) as string,
}

export const initialValuesForBidding: AuctionFormValues = {
  ...initialValuesForRegistration,
  selectedBid: (undefined as unknown) as string,
}

export type AuctionFormHelpers = FormikHelpers<AuctionFormValues>
