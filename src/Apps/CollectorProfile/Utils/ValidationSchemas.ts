import * as Yup from "yup"

export const editProfileVerificationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").trim(),
  bio: Yup.string(),
  locationSelected: Yup.boolean().test(
    "location-selected",
    "Please select a city from the dropdown",
    value => value === true,
  ),
  instagram: Yup.string()
    .nullable()
    .test(
      "instagram-format",
      "Instagram handle can only contain letters, numbers, underscores, and periods",
      value => {
        if (value === null || value === undefined || value === "") return true
        return /^@?[a-zA-Z0-9_.]+$/.test(value)
      },
    ),
  linkedIn: Yup.string()
    .nullable()
    .test(
      "linkedin-format",
      "LinkedIn handle can only contain letters, numbers, and hyphens",
      value => {
        if (value === null || value === undefined || value === "") return true
        return /^[a-zA-Z0-9\-]+$/.test(value)
      },
    ),
})
