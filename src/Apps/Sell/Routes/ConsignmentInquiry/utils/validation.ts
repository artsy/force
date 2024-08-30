import * as yup from "yup"

import { FormikErrors, yupToFormErrors } from "formik"

export const consignmentInquiryValidationSchema = yup.object().shape({
  name: yup.string().label("Name").required().trim(),
  email: yup
    .string()
    .email("Please enter a valid email.")
    .required("Please enter a valid email.")
    .trim(),
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
