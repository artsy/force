import type { CreateTokenCardData } from "@stripe/stripe-js"
import { validatePhoneNumber } from "Components/PhoneNumberInput"
import * as Yup from "yup"

export interface Address {
  name: string
  country: string
  postalCode: string
  addressLine1: string
  addressLine2: string
  city: string
  region: string
  phoneNumber?: string
}

export const emptyAddress: Address = {
  name: "",
  country: "",
  postalCode: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  phoneNumber: "",
}

export const toStripeAddress = (address: Address): CreateTokenCardData => {
  return {
    name: address.name,
    address_line1: address.addressLine1,
    address_line2: address.addressLine2,
    address_country: address.country,
    address_city: address.city,
    address_state: address.region,
    address_zip: address.postalCode,
  }
}

export const basicPhoneValidator = {
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[+\-\(\)\d\s]+$/, "Please enter a valid phone number"),
}

export const richPhoneValidators = {
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .test({
      name: "phone-number-is-valid",
      message: "Please enter a valid phone number",
      test: (national, context) => {
        return validatePhoneNumber({
          national: `${national}`,
          regionCode: `${context.parent.phoneNumberCountryCode}`,
        })
      },
    }),
  phoneNumberCountryCode: Yup.string().required(
    "Phone number country code is required",
  ),
}

const usPostalCodeRegexp = /^[0-9]{5}(?:-[0-9]{4})?$/
const caPostalCodeRegexp = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/

// These functions should match the required behavior in the yup validation schema
// below
export const isPostalCodeRequired = (alpha2Country?: string): boolean => {
  if (!alpha2Country) {
    return false
  }
  const country = alpha2Country.toUpperCase()
  return country === "US" || country === "CA"
}

export const isRegionRequired = (alpha2Country?: string): boolean => {
  if (!alpha2Country) {
    return false
  }
  const country = alpha2Country.toUpperCase()
  return country === "US" || country === "CA"
}

export const postalCodeValidator = Yup.string().when("country", {
  is: country => country === "US",
  // biome-ignore lint/suspicious/noThenProperty: part of the Yup API
  then: Yup.string()
    .required("ZIP code is required")
    .matches(usPostalCodeRegexp, "Invalid postal code"),
  otherwise: Yup.string().when("country", {
    is: country => country === "CA",
    // biome-ignore lint/suspicious/noThenProperty: this is part of the Yup API
    then: Yup.string()
      .required("Postal code is required")
      .matches(caPostalCodeRegexp, "Invalid postal code"),
    otherwise: Yup.string(),
  }),
})

export const yupAddressValidator = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  addressLine1: Yup.string().required("Street address is required"),
  addressLine2: Yup.string().nullable(),
  city: Yup.string().required("City is required"),
  postalCode: postalCodeValidator,
  region: Yup.string().when("country", {
    is: country => ["US", "CA"].includes(country),
    // biome-ignore lint/suspicious/noThenProperty: this is part of the Yup API
    then: Yup.string().required("State is required"),
    otherwise: Yup.string(),
  }),
  country: Yup.string().required("Country is required"),
})
