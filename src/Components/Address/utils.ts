import { validatePhoneNumber } from "Components/PhoneNumberInput"
import * as Yup from "yup"

export interface AddressType {
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
    .required("Postal code is required")
    .matches(usPostalCodeRegexp, "Invalid postal code"),
  otherwise: Yup.string().required(),
})

export const getYupAddressSchema = ({
  simplePhoneValidation = false,
} = {}): Yup.ObjectSchema<any, any> => {
  const phoneNumberRegex = /^[+\-\d]*$/g
  const phoneValidator = simplePhoneValidation
    ? Yup.string()
        .required("Phone number is required")
        .matches(phoneNumberRegex, "Invalid phone number")
    : yupPhoneValidator

  return Yup.object().shape({
    name: Yup.string().required("Name is required"),
    country: Yup.string().required("Country is required"),
    addressLine1: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    region: Yup.string().required("Region is required"),
    postalCode: postalCodeValidator,
    phoneNumber: phoneValidator,
    phoneNumberCountryCode: Yup.string().required(
      "Phone Number Country Code is required"
    ),
  })
}
