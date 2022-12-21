import * as Yup from "yup"

export const editProfileVerificationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  bio: Yup.string(),
})
