import { FormikErrors, yupToFormErrors } from "formik"
import * as yup from "yup"

export const artworkDetailsValidationSchema = yup.object().shape({
  artistId: yup
    .string()
    .required(
      "Please select an artist from the list. Other artists cannot be submitted due to limited demand."
    ),
  year: yup.string().required().trim(),
  title: yup.string().required().trim(),
  materials: yup.string().required().trim(),
  rarity: yup
    .string()
    .required()
    .test(
      "isDefault",
      "Rarity field not selected",
      rarity => rarity !== "default"
    ),
  editionNumber: yup.string().when("rarity", {
    is: "limited edition",
    then: yup.string().required().trim(),
  }),
  editionSize: yup.string().when("rarity", {
    is: "limited edition",
    then: yup.string().required().trim(),
  }),
  height: yup.string().required().trim(),
  width: yup.string().required().trim(),
  depth: yup
    .string()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value
    )
    .trim(),
  units: yup.string().required(),
  provenance: yup.string().required().trim(),
  location: yup
    .object()
    .shape({
      city: yup.string().trim().required("Please select a city from the list"),
      state: yup.string(),
      stateCode: yup.string(),
      postalCode: yup.string(),
      country: yup.string(),
      coordinates: yup.array(yup.number()),
    })
    .required(),
})

export const uploadPhotosValidationSchema = yup.object().shape({
  photos: yup
    .array()
    .min(1)
    .transform(fields => fields.filter(c => !c.errorMessage))
    .of(yup.object().test("photos", value => value.assetId)),
})

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
