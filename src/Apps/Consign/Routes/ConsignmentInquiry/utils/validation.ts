import * as yup from "yup"
import { email } from "Components/Authentication/Validators"
import { FormikErrors, yupToFormErrors } from "formik"

export const consignmentInquiryValidationSchema = yup.object().shape({
  name: yup.string().label("Name").required().trim(),
  email: email.trim(),
  message: yup.string().trim().label("Message").required(),
  phoneNumber: yup.string().notRequired(),
  phoneNumberCountryCode: yup.string().notRequired(),
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
