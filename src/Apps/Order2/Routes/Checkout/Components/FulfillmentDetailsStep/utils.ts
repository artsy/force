import {
  type FormikContextWithAddress,
  addressFormFieldsValidator,
} from "Components/Address/AddressFormFields"
import { COUNTRY_CODE_TO_COUNTRY_NAME } from "Components/CountrySelect"
import { extractNodes } from "Utils/extractNodes"
import type { ExtractNodeType } from "Utils/typeSupport"
import type { Order2DeliveryForm_me$data } from "__generated__/Order2DeliveryForm_me.graphql"
import * as yup from "yup"

type MeAddresses = ExtractNodeType<
  NonNullable<Order2DeliveryForm_me$data>["addressConnection"]
>
type GravityAddress = ReturnType<typeof extractNodes<MeAddresses>>[number]

export type ProcessedUserAddress = FormikContextWithAddress & {
  isValid: boolean
  internalID: string
}

export const normalizeAddress = (
  address: GravityAddress,
): FormikContextWithAddress => {
  return {
    phoneNumber: address.phoneNumber || "",
    phoneNumberCountryCode: address.phoneNumberCountryCode || "",
    address: {
      name: address.name || "",
      country: address.country.toUpperCase() || "",
      postalCode: address.postalCode || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      city: address.city || "",
      region: address.region || "",
    },
  }
}

export const countryNameFromAlpha2 = (country: string): string => {
  return COUNTRY_CODE_TO_COUNTRY_NAME[country.toUpperCase()] || country
}

export const processSavedAddresses = (
  addresses: Order2DeliveryForm_me$data["addressConnection"],
  availableShippingCountries: readonly string[],
): ProcessedUserAddress[] => {
  const meAddresses = extractNodes(addresses)
  const processedAddresses = meAddresses.map(address => {
    const normalizedAddress = normalizeAddress(address)
    const isValid = availableShippingCountries.includes(
      normalizedAddress.address.country,
    )
    return { ...normalizedAddress, isValid, internalID: address.internalID }
  })
  return processedAddresses
}

export const findInitialSelectedAddress = (
  processedAddresses: ProcessedUserAddress[],
  initialValues: FormikContextWithAddress,
): ProcessedUserAddress | undefined => {
  return (
    processedAddresses.find(processedAddress => {
      return (
        initialValues.address.name === processedAddress.address.name &&
        initialValues.address.country === processedAddress.address.country &&
        initialValues.address.postalCode ===
          processedAddress.address.postalCode &&
        initialValues.address.addressLine1 ===
          processedAddress.address.addressLine1 &&
        initialValues.address.addressLine2 ===
          processedAddress.address.addressLine2 &&
        initialValues.address.city === processedAddress.address.city &&
        initialValues.address.region === processedAddress.address.region &&
        initialValues.phoneNumber === processedAddress.phoneNumber &&
        initialValues.phoneNumberCountryCode ===
          processedAddress.phoneNumberCountryCode
      )
    }) || processedAddresses.find(processedAddress => processedAddress.isValid)
  )
}

export const deliveryAddressValidationSchema = yup
  .object()
  .shape(addressFormFieldsValidator({ withPhoneNumber: true }))
