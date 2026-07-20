import type { CreateTokenCardData } from "@stripe/stripe-js"
import { ErrorWithMetadata, sendErrorToService } from "Utils/errors"
import type { utilsValidatePhoneNumberQuery } from "__generated__/utilsValidatePhoneNumberQuery.graphql"
import { debounce } from "lodash"
import { fetchQuery, graphql } from "react-relay"
import type { Environment } from "relay-runtime"
import * as Yup from "yup"

export interface Address {
  name: string
  country: string
  postalCode: string
  addressLine1: string
  addressLine2: string
  city: string
  region: string
  phoneNumber?: string
}

export const emptyAddress: Address = {
  name: "",
  country: "",
  postalCode: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  phoneNumber: "",
}

type PhoneNumber = {
  national: string
  regionCode: string
}

// Cap how long we wait on the validation query. Without this a hung request
// leaves the validation promise unresolved, which stalls Formik and can block
// form submission indefinitely. On timeout we fail open (see below).
export const PHONE_VALIDATION_TIMEOUT_MS = 5000

// Sentinel used to distinguish a timed-out request (which we report to Sentry)
// from a request that merely returned no data.
const TIMED_OUT = Symbol("phoneValidationTimedOut")

const phoneValidator = debounce(
  async (
    { national, regionCode }: PhoneNumber,
    resolve: (value: boolean) => void,
    relayEnvironment: Environment,
  ) => {
    if (!national || national.length < 5 || !regionCode) {
      return resolve(false)
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined

    try {
      const response = await Promise.race([
        fetchQuery<utilsValidatePhoneNumberQuery>(
          relayEnvironment,
          graphql`
            query utilsValidatePhoneNumberQuery(
              $phoneNumber: String!
              $regionCode: String
            ) {
              phoneNumber(phoneNumber: $phoneNumber, regionCode: $regionCode) {
                isValid
              }
            }
          `,
          { phoneNumber: national, regionCode },
        ).toPromise(),
        new Promise<typeof TIMED_OUT>(timeoutResolve => {
          timeoutId = setTimeout(() => {
            timeoutResolve(TIMED_OUT)
          }, PHONE_VALIDATION_TIMEOUT_MS)
        }),
      ])

      if (response === TIMED_OUT) {
        // Surface hung requests in Sentry for visibility, then fail open so a
        // slow or hung request can't block form submission.
        sendErrorToService(
          new ErrorWithMetadata("Phone number validation timed out", {
            regionCode,
            timeoutMs: PHONE_VALIDATION_TIMEOUT_MS,
          }),
        )

        return resolve(true)
      }

      if (!response?.phoneNumber) {
        // Assume the phone number is valid if we can't validate it.
        return resolve(true)
      }

      return resolve(!!response.phoneNumber.isValid)
    } catch (err) {
      console.error(err)

      // Assume the phone number is valid if we can't validate it
      return resolve(true)
    } finally {
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId)
      }
    }
  },
  200,
)

/**
 * Validates a phone number using GraphQL API
 * @param phoneNumber Object with national number and region code
 * @param relayEnvironment Relay environment used to run the validation query.
 *   Injected by the caller (e.g. via `useRelayEnvironment()`) so tests can
 *   supply a mock environment instead of hitting the network.
 * @returns Promise that resolves to boolean indicating if phone number is valid
 */
export const validatePhoneNumber = (
  phoneNumber: PhoneNumber,
  relayEnvironment: Environment,
): Promise<boolean> => {
  return new Promise(resolve => {
    phoneValidator(phoneNumber, resolve, relayEnvironment)
  })
}

export const toStripeAddress = (address: Address): CreateTokenCardData => {
  return {
    name: address.name,
    address_line1: address.addressLine1,
    address_line2: address.addressLine2,
    address_country: address.country,
    address_city: address.city,
    address_state: address.region,
    address_zip: address.postalCode,
  }
}

export const basicPhoneValidator = {
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(/^[+\-\(\)\d\s]+$/, "Please enter a valid phone number"),
}

export const handlePhoneNumberChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setFieldValue: (field: string, value: string) => void,
): void => {
  setFieldValue("phoneNumber", e.target.value.replace(/[a-zA-Z]/g, ""))
}

/**
 * Builds the rich phone-number Yup validators, closing over the Relay
 * environment used to run the async validation query. Callers obtain the
 * environment from React context (`useRelayEnvironment()`) and build the schema
 * in-component (typically memoized), which keeps validation testable with a
 * mock environment.
 */
export const getRichPhoneValidators = (relayEnvironment: Environment) => ({
  phoneNumber: Yup.string()
    .matches(/^[^a-zA-Z]*$/, "Please enter a valid phone number")
    .test({
      name: "phone-number-is-valid",
      message: "Please enter a valid phone number",
      test: (national, context) => {
        if (!national || national.length === 0) {
          return true
        }
        return validatePhoneNumber(
          {
            national: `${national}`,
            regionCode: `${context.parent.phoneNumberCountryCode}`,
          },
          relayEnvironment,
        )
      },
    }),
  phoneNumberCountryCode: Yup.string(),
})

export const phoneInitialValuesFromMe = (
  mePhoneNumber:
    | {
        display?: string | null
        originalNumber?: string | null
        regionCode?: string | null
      }
    | null
    | undefined,
): { phoneNumber: string; phoneNumberCountryCode: string } => {
  return {
    phoneNumber: mePhoneNumber?.display ?? mePhoneNumber?.originalNumber ?? "",
    phoneNumberCountryCode: mePhoneNumber?.regionCode ?? "us",
  }
}

export const getRichRequiredPhoneValidators = (
  relayEnvironment: Environment,
) => {
  const richPhoneValidators = getRichPhoneValidators(relayEnvironment)

  return {
    phoneNumber: richPhoneValidators.phoneNumber.required(
      "Phone number is required",
    ),
    phoneNumberCountryCode: richPhoneValidators.phoneNumberCountryCode.required(
      "Phone number country code is required",
    ),
  }
}

const usPostalCodeRegexp = /^[0-9]{5}(?:-[0-9]{4})?$/
const caPostalCodeRegexp = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/

// These functions should match the required behavior in the yup validation schema
// below
export const isPostalCodeRequired = (alpha2Country?: string): boolean => {
  if (!alpha2Country) {
    return false
  }
  const country = alpha2Country.toUpperCase()
  return country === "US" || country === "CA"
}

export const isRegionRequired = (alpha2Country?: string): boolean => {
  if (!alpha2Country) {
    return false
  }
  const country = alpha2Country.toUpperCase()
  return country === "US" || country === "CA"
}

export const postalCodeValidator = Yup.string().when("country", {
  is: country => country === "US",
  // biome-ignore lint/suspicious/noThenProperty: part of the Yup API
  then: Yup.string()
    .required("ZIP code is required")
    .matches(usPostalCodeRegexp, "Invalid postal code"),
  otherwise: Yup.string().when("country", {
    is: country => country === "CA",
    // biome-ignore lint/suspicious/noThenProperty: this is part of the Yup API
    then: Yup.string()
      .required("Postal code is required")
      .matches(caPostalCodeRegexp, "Invalid postal code"),
    otherwise: Yup.string(),
  }),
})

export const yupAddressValidator = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  addressLine1: Yup.string().required("Street address is required"),
  addressLine2: Yup.string().nullable(),
  city: Yup.string().required("City is required"),
  postalCode: postalCodeValidator,
  region: Yup.string().when("country", {
    is: country => ["US", "CA"].includes(country),
    // biome-ignore lint/suspicious/noThenProperty: this is part of the Yup API
    then: Yup.string().required("State is required"),
    otherwise: Yup.string(),
  }),
  country: Yup.string().required("Country is required"),
})
