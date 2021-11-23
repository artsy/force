import { Address } from "v2/Components/AddressForm"

export interface FormValuesForRegistration {
  address?: Address
  creditCard?: string
  agreeToTerms: boolean
}

export interface FormValuesForBidding extends FormValuesForRegistration {
  selectedBid: string
}

const address: Address = {
  name: "",
  addressLine1: "",
  addressLine2: "",
  country: "US",
  city: "",
  region: "",
  postalCode: "",
  phoneNumber: "",
}

export const initialValuesForRegistration: FormValuesForRegistration = {
  address,
  creditCard: undefined,
  agreeToTerms: false,
}

export const initialValuesForBidding: FormValuesForBidding = {
  ...initialValuesForRegistration,
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  selectedBid: undefined,
}
