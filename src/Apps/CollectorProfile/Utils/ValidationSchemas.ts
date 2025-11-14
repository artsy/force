import * as Yup from "yup"

export const editProfileVerificationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").trim(),
  bio: Yup.string(),
  locationSelected: Yup.boolean().test(
    "location-selected",
    "Please select a city from the dropdown",
    value => value === true,
  ),
})
