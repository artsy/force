import { Address } from "v2/Components/AddressForm"

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

export const initialValuesForRegistration = {
  address,
  creditCard: undefined,
  agreeToTerms: false,
}

// TODO: Could we consolicate these two sets of `initialValues`?
export const initialValuesForBidding = {
  address,
  agreeToTerms: false,
}
