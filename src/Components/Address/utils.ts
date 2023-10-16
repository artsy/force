import { validatePhoneNumber } from "Components/PhoneNumberInput"
import * as Yup from "yup"

interface AddressType {
  addressLine1: string
  addressLine2: string | null
  addressLine3: string | null
  city: string
  country: string
  name: string | null
  phoneNumber: string | null
  phoneNumberCountryCode: string | null
  postalCode: string | null
  region: string | null
}

export interface SavedAddressType extends AddressType {
  id: string
  internalID: string
  isDefault: boolean
}

export const EMPTY_ADDRESS = {
  name: "",
  country: "US",
  addressLine1: "",
  addressLine2: "",
  addressLine3: "",
  city: "",
  phoneNumber: "",
  phoneNumberCountryCode: "us",
  postalCode: "",
  region: "",
} as const

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

const usPostalCodeRegexp = /^\d{5}(-\d{4})?$/

export const postalCodeValidator = Yup.string().when("country", {
  is: country => country === "US",
  then: Yup.string()
    .required("ZIP code is required")
    .matches(usPostalCodeRegexp, "Invalid postal code"),
  otherwise: Yup.string().required("Postal code is required"),
})
