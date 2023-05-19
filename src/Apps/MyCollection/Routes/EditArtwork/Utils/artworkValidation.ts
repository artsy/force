import { trim } from "lodash"
import * as yup from "yup"

export const MyCollectionArtworkDetailsValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Title is required")
    .test(
      "title",
      "Title should not be empty",
      value => !!value && trim(value) !== ""
    ),
  artistName: yup
    .string()
    .required("Artist name is required")
    .test(
      "artist",
      "Artist name should not be empty",
      value => !!value && trim(value) !== ""
    ),
  category: yup.string().required("Medium is required"),
  newPhotos: yup
    .array()
    .transform(fields => fields.filter(c => !c.errorMessage))
    .of(yup.object().test("newPhotos", value => value.url)),
})

export const MyCollectionArtworkDetailsValidationSchemaWithoutPersonalArtist = yup
  .object()
  .shape({
    artistId: yup
      .string()
      .required(
        "Please select from the list of artists in the Artsy database."
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
    newPhotos: yup
      .array()
      .transform(fields => fields.filter(c => !c.errorMessage))
      .of(yup.object().test("newPhotos", value => value.url)),
  })
