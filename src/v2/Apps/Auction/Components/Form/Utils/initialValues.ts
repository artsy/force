import { FormikHelpers } from "formik"
import { Address, emptyAddress } from "v2/Components/AddressForm"

export interface AuctionFormValues {
  address: Address
  agreeToTerms: boolean
  creditCard?: boolean
  selectedBid?: string
}

export const initialValuesForRegistration: Omit<
  AuctionFormValues,
  "selectedBid"
> = {
  address: emptyAddress,
  agreeToTerms: false,
  creditCard: false,
}

export const initialValuesForBidding: AuctionFormValues = {
  ...initialValuesForRegistration,
  agreeToTerms: true, // user will have agreed during registration
  selectedBid: (null as unknown) as string,
}

export type AuctionFormHelpers = FormikHelpers<AuctionFormValues>
