import type { CreateTokenCardData } from "@stripe/stripe-js"
import { createRelaySSREnvironment } from "System/Relay/createRelaySSREnvironment"
import type { utilsValidatePhoneNumberQuery } from "__generated__/utilsValidatePhoneNumberQuery.graphql"
import debounce from "lodash/debounce"
import { useCallback, useEffect, useState } from "react"
import { fetchQuery, graphql } from "react-relay"
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

const relayEnvironment = createRelaySSREnvironment()

type PhoneNumber = {
  national: string
  regionCode: string
}

const phoneValidator = debounce(
  async (
    { national, regionCode }: PhoneNumber,
    resolve: (value: boolean) => void,
  ) => {
    if (!national || national.length < 5 || !regionCode) {
      return resolve(false)
    }

    try {
      const response = await fetchQuery<utilsValidatePhoneNumberQuery>(
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
      ).toPromise()

      if (!response?.phoneNumber) {
        // Assume the phone number is valid if we can't validate it
        return resolve(true)
      }

      return resolve(!!response.phoneNumber.isValid)
    } catch (err) {
      console.error(err)

      // Assume the phone number is valid if we can't validate it
      return resolve(true)
    }
  },
  200,
)

/**
 * Validates a phone number using GraphQL API
 * @param phoneNumber Object with national number and region code
 * @returns Promise that resolves to boolean indicating if phone number is valid
 */
export const validatePhoneNumber = (
  phoneNumber: PhoneNumber,
): Promise<boolean> => {
  return new Promise(resolve => {
    phoneValidator(phoneNumber, resolve)
  })
}

/**
 * React hook for phone number validation
 * @param national The national phone number
 * @param regionCode The region/country code
 * @returns Boolean indicating if phone number is valid
 */
export const useValidatePhoneNumber = ({
  national,
  regionCode,
}: PhoneNumber) => {
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true)

  const validate = useCallback(async () => {
    const isValid = await validatePhoneNumber({
      national,
      regionCode,
    })

    setIsPhoneNumberValid(isValid)
  }, [national, regionCode])

  useEffect(() => {
    validate()
  }, [validate])

  return isPhoneNumberValid
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

export const richPhoneValidators = {
  phoneNumber: Yup.string().test({
    name: "phone-number-is-valid",
    message: "Please enter a valid phone number",
    test: (national, context) => {
      if (!national || national.length === 0) {
        return true
      }
      return validatePhoneNumber({
        national: `${national}`,
        regionCode: `${context.parent.phoneNumberCountryCode}`,
      })
    },
  }),
  phoneNumberCountryCode: Yup.string(),
}

export const richRequiredPhoneValidators = {
  phoneNumber: richPhoneValidators.phoneNumber.required(
    "Phone number is required",
  ),
  phoneNumberCountryCode: richPhoneValidators.phoneNumberCountryCode.required(
    "Phone number country code is required",
  ),
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
  then: Yup.string()
    .required("ZIP code is required")
    .matches(usPostalCodeRegexp, "Invalid postal code"),
  otherwise: Yup.string().when("country", {
    is: country => country === "CA",
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
    then: Yup.string().required("State is required"),
    otherwise: Yup.string(),
  }),
  country: Yup.string().required("Country is required"),
})
