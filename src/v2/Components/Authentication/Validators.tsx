import Yup from "yup"

export const email = Yup.string()
  .email("Please enter a valid email.")
  .required("Please enter a valid email.")

const name = Yup.string().required("Name is required.")

const password = Yup.string()
  .required("Password required")
  .min(8, "Your password must be at least 8 characters")

const loginPassword = Yup.string().required("Password required")

const otpAttempt = Yup.string().required("Enter a code")

const accepted_terms_of_service = Yup.boolean()
  .required("You must agree to our terms to continue.")
  .oneOf([true])

export const SignUpValidator = Yup.object().shape({
  name,
  email,
  password: Yup.string()
    .required("Password required")
    .min(8, "Password must be at least 8 characters."),
  accepted_terms_of_service,
})

export const ForgotPasswordValidator = Yup.object().shape({ email })

export const LoginValidator = Yup.object().shape({
  email,
  password: Yup.string().required("Password required."),
})

export const MobileSignUpValidator = {
  email: Yup.object().shape({ email, accepted_terms_of_service }),
  name: Yup.object().shape({ name }),
  password: Yup.object().shape({ password }),
}

export const MobileLoginValidator = {
  email: Yup.object().shape({ email }),
  password: Yup.object().shape({ password: loginPassword }),
  otpAttempt: Yup.object().shape({ otp_attempt: otpAttempt }),
}
