import { FormikHelpers } from "formik"
import { Address, emptyAddress } from "v2/Components/AddressForm"
import { PhoneNumber } from "v2/Components/PhoneNumberInput"

export interface AuctionFullFormValues {
  address: Address
  agreeToTerms: boolean
  creditCard?: boolean
  selectedBid?: string
}

export interface AuctionPhoneFormValues {
  phoneNumber: PhoneNumber
  // phoneNumber: string
}

export const initialValuesForRegistration: Omit<
  AuctionFullFormValues,
  "selectedBid"
> = {
  address: emptyAddress,
  agreeToTerms: false,
  creditCard: false,
}

export const initialValuesForBidding: AuctionFullFormValues = {
  ...initialValuesForRegistration,
  agreeToTerms: true, // user will have agreed during registration
  selectedBid: (null as unknown) as string,
}

export type AuctionFullFormHelpers = FormikHelpers<AuctionFullFormValues>
export type AuctionPhoneFormHelpers = FormikHelpers<AuctionPhoneFormValues>
