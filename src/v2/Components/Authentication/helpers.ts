import { helpersEmailQuery } from "v2/__generated__/helpersEmailQuery.graphql"
import { graphql } from "react-relay"
import { fetchQuery } from "relay-runtime"

export const handleSubmit = (
  url: string,
  csrf: string,
  redirectTo?: string
) => async (values, formikBag) => {
  try {
    const data = await sendAuthData(url, { _csrf: csrf, ...values })
    if (data.success) {
      if (redirectTo) {
        document.location.pathname = redirectTo
      }
    } else {
      formikBag.setStatus(data)
    }
  } catch (err) {
    formikBag.setStatus(err)
  }
}

export async function sendAuthData(
  url: string,
  values: { [key: string]: any; _csrf: string }
) {
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
    method: "POST",
    credentials: "same-origin",
    body: JSON.stringify(values),
  })
  const data = await res.json()
  return data
}

export const checkEmail = ({
  relayEnvironment,
  values,
  actions,
  shouldExist,
}) => {
  const query = graphql`
    query helpersEmailQuery($email: String!) {
      user(email: $email) {
        userAlreadyExists
      }
    }
  `
  return fetchQuery<helpersEmailQuery>(relayEnvironment, query, {
    email: values.email,
  })
    .toPromise()
    .then((data: any) => {
      if (data.user && data.user.userAlreadyExists) {
        if (shouldExist) {
          return true
        } else {
          actions.setFieldError("email", "Email already exists.")
          actions.setSubmitting(false)
          return false
        }
      } else {
        if (shouldExist) {
          actions.setFieldError("email", "Email does not exist.")
          actions.setSubmitting(false)
          return false
        } else {
          return true
        }
      }
    })
}

export const isOtpError = (errorMessage: string): boolean => {
  const otpErrorMessages = [
    "missing two-factor authentication code",
    "missing on-demand authentication code",
  ]

  return otpErrorMessages.includes(errorMessage)
}

export const isMissingOnDemandOtpError = (errorMessage: string): boolean => {
  const missingOnDemandOtpError = "missing on-demand authentication code"

  return errorMessage === missingOnDemandOtpError
}
