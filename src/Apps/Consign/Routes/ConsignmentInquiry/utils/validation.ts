import * as yup from "yup"
import { email } from "Components/Authentication/Validators"
import { FormikErrors, yupToFormErrors } from "formik"
import { validatePhoneNumber } from "Components/PhoneNumberInput"

export const consignmentInquiryValidationSchema = yup.object().shape({
  name: yup.string().label("Name").required().trim(),
  email: email.trim(),
  message: yup.string().trim().label("Message").required(),
  // user can choose not to provide a phone number. But if they do, then we must validate
  phoneNumber: yup
    .string()
    .notRequired()
    .test({
      name: "phone-number-is-valid",
      message: "Please enter a valid phone number",
      test: (national, context) => {
        if (!context.parent.phoneNumber) {
          return true
        }
        return validatePhoneNumber({
          national: `${national}`,
          regionCode: `${context.parent.phoneNumberCountryCode}`,
        })
      },
    }),
  phoneNumberCountryCode: yup
    .string()
    .when("phoneNumber", {
      is: true,
      then: schema => schema.required("Phone Number Country Code is required"),
    })
    .notRequired(),
})

export const validate = <T>(values: T, validationSchema: yup.AnySchema) => {
  let errors: FormikErrors<T> = {}

  try {
    validationSchema.validateSync(values, {
      abortEarly: false,
    })
  } catch (error) {
    errors = yupToFormErrors(error)
  }

  return errors
}
