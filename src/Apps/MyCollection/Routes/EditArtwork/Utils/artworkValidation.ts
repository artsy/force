import { FormikErrors, yupToFormErrors } from "formik"
import { trim } from "lodash"
import * as yup from "yup"

export const MyCollectionArtworkDetailsValidationSchema = yup.object().shape({
  artistId: yup
    .string()
    .required("Please select from the list of artists in the Artsy database."),
  title: yup
    .string()
    .required("Title is required")
    .test(
      "title",
      "Title should not be empty",
      value => !!value && trim(value) !== ""
    ),
  category: yup.string().required("Medium is required"),
  newPhotos: yup
    .array()
    .transform(fields => fields.filter(c => !c.errorMessage))
    .of(yup.object().test("newPhotos", value => value.url)),
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
