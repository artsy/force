import * as Yup from "yup"

export const editProfileVerificationSchema = Yup.object().shape({
  photo: Yup.string(),
  name: Yup.string().required("Name is required"),
  bio: Yup.string(),
})
