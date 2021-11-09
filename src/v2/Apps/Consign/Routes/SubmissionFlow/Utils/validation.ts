import * as yup from "yup"
import { email } from "v2/Components/Authentication/Validators"

export const artworkDetailsValidationSchema = yup.object().shape({
  artistId: yup
    .string()
    .required(
      "Unfortunately, we currently do not have enough demand for this artist’s work to be consigned."
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
  provenance: yup.string().trim(),
})

/*
this validation currently not in use until we find a workaround
formik is checking whether errorMessage found for a photo under the hood
and invalidates form submission if errorMessage exists

The check is currently moved to UploadPhotos.tsx's Button directly
*/
export const uploadPhotosValidationSchema = yup.object().shape({
  photos: yup
    .array()
    .min(1)
    .of(
      yup.object().shape({
        s3Key: yup.string().required(),
      })
    ),
})

export const contactInformationValidationSchema = yup.object().shape({
  name: yup.string().label("Name").required(),
  email,
  phone: yup.string().label("Phone number").required(),
})
