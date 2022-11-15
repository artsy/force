import * as Yup from "yup"

export const email = Yup.string()
  .email("Please enter a valid email.")
  .required("Please enter a valid email.")

export const name = Yup.string().trim().required("Name is required.")

export const password = Yup.string()
  .required("Password required")
  .min(8, "Your password must be at least 8 characters.")
  .matches(/\d{1}/, "Your password must have at least 1 digit.")
  .matches(/[a-z]{1}/, "Your password must have at least 1 lowercase letter.")
  .matches(/[A-Z]{1}/, "Your password must have at least 1 uppercase letter.")

export const loginPassword = Yup.string().required("Password required")

const otpAttempt = Yup.string().required("Enter a code")

const accepted_terms_of_service = Yup.boolean()
  .required("You must agree to our terms to continue.")
  .oneOf([true])

export const SignUpValidator = Yup.object().shape({
  accepted_terms_of_service,
  email,
  name,
  password,
})

export const ForgotPasswordValidator = Yup.object().shape({ email })

export const LoginValidator = Yup.object().shape({
  email,
  password: Yup.string().required("Password required."),
})

export const MobileSignUpValidator = {
  email: Yup.object().shape({ accepted_terms_of_service, email }),
  name: Yup.object().shape({ name }),
  password: Yup.object().shape({ password }),
}

export const MobileLoginValidator = {
  email: Yup.object().shape({ email }),
  otpAttempt: Yup.object().shape({ otp_attempt: otpAttempt }),
  password: Yup.object().shape({ password: loginPassword }),
}

export const ChangeUserInformationValidator = Yup.object().shape({
  email,
  name,
})
