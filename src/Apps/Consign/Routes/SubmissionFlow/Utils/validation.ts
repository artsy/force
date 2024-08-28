import { FormikErrors, yupToFormErrors } from "formik"
import * as yup from "yup"

export const contactInformationValidationSchema = yup.object().shape({
  name: yup.string().label("Name").required().trim(),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter a valid email.")
    .trim(),
  phoneNumber: yup.string().required("Phone Number is required"),
  phoneNumberCountryCode: yup
    .string()
    .required("Phone Number Country Code is required"),
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
