export const formatErrorMessage = (error: Error) => {
  switch (error.message) {
    case "invalid two-factor authentication code":
      return "The code you entered is invalid. Please try again."

    case "invalid email or password":
      return "The email or password you entered is invalid. Please try again."

    case "account locked, try again in a few minutes":
      return "Your account has been locked. Please try again in a few minutes."

    case "User Already Exists":
      return "An account with this email already exists."

    case `Unexpected token '<', "<!DOCTYPE "... is not valid JSON`:
    case `Unexpected token '<', "<html> <"... is not valid JSON`:
      return "An error occurred. Please try again."

    default:
      return error.message
  }
}
