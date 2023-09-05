import { FormikHelpers } from "formik"
import { Address, emptyAddress } from "Components/Address/AddressForm"

export interface AuctionFormValues {
  address: Address
  agreeToTerms: boolean
  creditCard?: boolean
  phoneNumber?: string
  selectedBid?: string
}

export const initialValuesForRegistration: Omit<
  AuctionFormValues,
  "selectedBid"
> = {
  address: emptyAddress,
  agreeToTerms: false,
  creditCard: false,
  phoneNumber: "",
}

export const initialValuesForBidding: AuctionFormValues = {
  ...initialValuesForRegistration,
  agreeToTerms: true, // user will have agreed during registration
  selectedBid: (null as unknown) as string,
}

export type AuctionFormHelpers = FormikHelpers<AuctionFormValues>
