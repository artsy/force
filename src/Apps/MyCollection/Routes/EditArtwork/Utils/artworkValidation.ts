import { FormikErrors, yupToFormErrors } from "formik"
import { trim } from "lodash"
import * as yup from "yup"

export const MyCollectionArtworkDetailsValidationSchema = yup.object().shape({
  artistId: yup
    .string()
    .required(
      "Please select an artist from the list. Other artists cannot be submitted due to limited demand."
    ),
  title: yup
    .string()
    .required("Title is required")
    .test(
      "title",
      "Title should not be empty",
      value => !!value && trim(value) !== ""
    ),
  category: yup.string().required("Medium is required"),
})

export const validateArtwork = <T>(
  values: T,
  validationSchema: yup.AnySchema
) => {
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
