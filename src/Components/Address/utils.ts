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

const usPostalCodeRegexp = /^\d{5}(-\d{4})?$/

export const postalCodeValidator = Yup.string().when("country", {
  is: country => country === "US",
  then: Yup.string()
    .required("ZIP code is required")
    .matches(usPostalCodeRegexp, "Invalid postal code"),
  otherwise: Yup.string().required("Postal code is required"),
})
