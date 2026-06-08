export const AUTH_ERROR_CODES: Record<string, string> = {
  ALREADY_EXISTS:
    "A user with this email address already exists. Log in to Artsy via email and password and link {provider} in your settings instead.",
  PREVIOUSLY_LINKED_SETTINGS:
    "{provider} account previously linked to Artsy. Log in to your Artsy account via email and password and link {provider} in your settings instead.",
  PREVIOUSLY_LINKED: "{provider} account previously linked to Artsy.",
  IP_BLOCKED: "Your IP address was blocked by {provider}.",
  TWO_FACTOR_AUTHENTICATION_REQUIRED:
    "Please log in with email and password to use two-factor authentication.",
  TWO_FACTOR_AUTHENTICATION_ENABLED:
    "Social account linking is not available while two-factor authentication is enabled on your Artsy account.",
  UNKNOWN: "An unknown error occurred. Please try again.",
}

export const AUTH_PROVIDERS: Record<string, string> = {
  facebook: "Facebook",
  google: "Google",
  apple: "Apple",
}
