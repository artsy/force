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
  addressLine1: "",
  addressLine2: "",
  city: "",
  country: "US",
  name: "",
  phoneNumber: "",
  postalCode: "",
  region: "",
}

export const initialValuesForRegistration: FormValuesForRegistration = {
  address,
  agreeToTerms: false,
  creditCard: undefined,
}

export const initialValuesForBidding: FormValuesForBidding = {
  ...initialValuesForRegistration,
  selectedBid: undefined,
}
