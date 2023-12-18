import { validatePhoneNumber } from "Components/PhoneNumberInput"
import * as Yup from "yup"

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
