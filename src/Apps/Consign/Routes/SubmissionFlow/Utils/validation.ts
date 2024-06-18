import { getFeatureVariant } from "System/Hooks/useFeatureFlag"
import { FormikErrors, yupToFormErrors } from "formik"
import * as yup from "yup"

export const artworkDetailsValidationSchema = yup.object().shape({
  artistId: yup
    .string()
    .required(
      "Please select an artist from the list. Other artists cannot be submitted due to limited demand."
    ),
  year: yup.string().trim(),
  title: yup.string().required("Please enter the title").trim(),
  materials: yup.string().trim(),
  rarity: yup
    .string()
    .test("isDefault", "", rarity => rarity !== "default")
    .nullable(),
  editionNumber: yup.string().when("rarity", {
    is: "limited edition",
    then: yup.string().trim(),
  }),
  editionSize: yup.string().when("rarity", {
    is: "limited edition",
    then: yup.string().trim(),
  }),
  height: getFeatureVariant("onyx_swa-dimensions-are-optional")
    ? yup.string().trim()
    : yup.string().required("Please enter the height").trim(),
  width: getFeatureVariant("onyx_swa-dimensions-are-optional")
    ? yup.string().trim()
    : yup.string().required("Please enter the width").trim(),
  depth: yup
    .string()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value
    )
    .trim(),
  units: yup.string(),
  provenance: yup.string().trim(),
  location: yup.object().shape({
    city: yup.string().trim(),
    state: yup.string(),
    stateCode: yup.string(),
    postalCode: yup.string(),
    country: yup.string(),
    coordinates: yup.array(yup.number()),
  }),
  category: yup
    .string()
    .required("Please select a medium")
    .test("isDefault", "", category => category !== "default"),
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
