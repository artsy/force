export const ChangeEvents = {
  accepted_terms_of_service: {
    currentTarget: { checked: true },
    persist: jest.fn(),
    target: {
      checked: true,
      name: "accepted_terms_of_service",
      type: "checkbox",
    },
  },
  email: {
    currentTarget: { value: "email@email.com" },
    persist: jest.fn(),
    target: { name: "email", type: "", value: "email@email.com" },
  },
  invalidOtpAttempt: {
    currentTarget: { value: "111111" },
    persist: jest.fn(),
    target: { name: "otp_attempt", type: "", value: "111111" },
  },
  name: {
    currentTarget: { value: "name" },
    persist: jest.fn(),
    target: { name: "name", type: "", value: "User Name" },
  },
  otpAttempt: {
    currentTarget: { value: "123456" },
    persist: jest.fn(),
    target: { name: "otp_attempt", type: "", value: "123456" },
  },
  password: {
    currentTarget: { value: "password" },
    persist: jest.fn(),
    target: { name: "password", type: "", value: "password" },
  },
}

export const SignupValues = {
  accepted_terms_of_service: true,
  email: "foo@bar.com",
  name: "John Doe",
  password: "password123",
}

export const LoginValues = {
  email: "foo@bar.com",
  password: "password123",
}
