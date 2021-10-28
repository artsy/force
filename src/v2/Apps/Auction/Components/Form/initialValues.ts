import { SavedAddressType } from "v2/Apps/Order/Utils/shippingUtils"
import { Address } from "v2/Components/AddressForm"
import { BillingInfoFormValues } from "./formValidation"

export interface BillingInfoWithTerms {
  address?: SavedAddressType | Address
  creditCard?: string
  agreeToTerms: boolean
}

export interface BillingInfoWithBid extends BillingInfoWithTerms {
  selectedBid: string
}

export interface BillingInfo {
  address?: Address | SavedAddressType
  isDefault?: boolean
  internalID?: string
}

export const initAddress: Omit<Address, "phoneNumber"> | SavedAddressType = {
  name: "",
  addressLine1: "",
  addressLine2: "",
  country: "US",
  city: "",
  region: "",
  postalCode: "",
  isDefault: false,
}

export const initAddressWithPhone: Address | SavedAddressType = {
  ...initAddress,
  phoneNumber: "",
}

export const initBillingInfoWithTerms: Pick<
  BillingInfoFormValues,
  "address" | "agreeToTerms" | "creditCard"
> = {
  address: initAddressWithPhone,
  creditCard: undefined,
  agreeToTerms: false,
}

export const initBillingInfoWithBid: Pick<
  BillingInfoFormValues,
  "address" | "agreeToTerms" | "creditCard" | "selectedBid"
> = {
  ...initBillingInfoWithTerms,
  selectedBid: undefined,
}
