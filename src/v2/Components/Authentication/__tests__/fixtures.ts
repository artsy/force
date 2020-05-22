export const ChangeEvents = {
  email: {
    currentTarget: { value: "email@email.com" },
    persist: jest.fn(),
    target: { type: "", name: "email", value: "email@email.com" },
  },
  password: {
    currentTarget: { value: "password" },
    persist: jest.fn(),
    target: { type: "", name: "password", value: "password" },
  },
  otpAttempt: {
    currentTarget: { value: "123456" },
    persist: jest.fn(),
    target: { type: "", name: "otp_attempt", value: "123456" },
  },
  invalidOtpAttempt: {
    currentTarget: { value: "111111" },
    persist: jest.fn(),
    target: { type: "", name: "otp_attempt", value: "111111" },
  },
  accepted_terms_of_service: {
    currentTarget: { checked: true },
    persist: jest.fn(),
    target: {
      type: "checkbox",
      name: "accepted_terms_of_service",
      checked: true,
    },
  },
  name: {
    currentTarget: { value: "name" },
    persist: jest.fn(),
    target: { type: "", name: "name", value: "User Name" },
  },
}

export const SignupValues = {
  email: "foo@bar.com",
  password: "password123",
  name: "John Doe",
  accepted_terms_of_service: true,
}

export const LoginValues = {
  email: "foo@bar.com",
  password: "password123",
}
