import * as yup from "yup"
import { email } from "v2/Components/Authentication/Validators"

export const artworkDetailsValidationSchema = yup.object().shape({
  artistId: yup
    .string()
    .required(
      "Unfortunately, this artist’s work does not have enough current demand from Artsy collectors to be accepted for consignment."
    ),
  year: yup.string().required().trim(),
  title: yup.string().required().trim(),
  medium: yup
    .string()
    .required()
    .test(
      "isDefault",
      "Medium field not selected",
      medium => medium !== "default"
    ),
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
  editionSize: yup.number().when("rarity", {
    is: "limited edition",
    then: yup.number().required(),
  }),
  height: yup.number().positive().required(),
  width: yup.number().positive().required(),
  depth: yup
    .number()
    .positive()
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? undefined : value
    ),
  units: yup.string().required(),
})

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
