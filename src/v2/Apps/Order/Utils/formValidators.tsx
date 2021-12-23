import { isEmpty } from "lodash"

export const validatePresence = (value: string | null): string | null => {
  if (!value || isEmpty(value.trim())) {
    return "This field is required"
  }
  return null
}

export const validatePhoneNumber = (phoneNumber: string) => {
  let error = validatePresence(phoneNumber)
  error =
    !error && !/[^a-z]+/.test(phoneNumber)
      ? "Please enter a valid phone number"
      : error
  const hasError = error !== null

  return {
    error,
    hasError,
  }
}
