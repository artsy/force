import { email } from "Components/Authentication/Validators"
import { FormikErrors, yupToFormErrors } from "formik"
import * as yup from "yup"

export const contactInformationValidationSchema = yup.object().shape({
  name: yup.string().label("Name").required().trim(),
  email: email.trim(),
  phone: yup
    .object()
    .label("Phone number")
    .test(
      "phone-number",
      "Please enter a valid phone number.",
      value => !value.originalNumber || value.isValid
    ),
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
