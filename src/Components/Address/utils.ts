import { validatePhoneNumber } from "Components/PhoneNumberInput"
import type { CreateTokenCardData } from "@stripe/stripe-js"
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

export const basicPhoneValidator = Yup.string()
  .required("Phone number is required")
  .matches(/^[+\-\(\)\d\s]+$/, "Please enter a valid phone number")

export const yupPhoneValidator = Yup.string()
  .required("Phone Number is required")
  .test({
    name: "phone-number-is-valid",
    message: "Please enter a valid phone number",
    test: (national, context) => {
      return validatePhoneNumber({
        national: `${national}`,
        regionCode: `${context.parent.phoneNumberCountryCode}`,
      })
    },
  })

const usPostalCodeRegexp = /^[0-9]{5}(?:-[0-9]{4})?$/
const caPostalCodeRegexp = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/

export const postalCodeValidator = Yup.string().when("country", {
  is: country => country === "US",
  then: Yup.string()
    .required("ZIP code is required")
    .matches(usPostalCodeRegexp, "Invalid postal code"),
  otherwise: Yup.string().when("country", {
    is: country => country === "CA",
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
    then: Yup.string().required("State is required"),
    otherwise: Yup.string(),
  }),
  country: Yup.string().required("Country is required"),
})
