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
  isShippable: boolean
  isValid: boolean
  internalID: string
  isDefault: boolean
  phoneNumberParsed?: { display: string | null | undefined } | null
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

export const validateAddressFields = (
  values: FormikContextWithAddress,
): boolean => {
  return (
    !!values.address.name &&
    !!values.address.country &&
    !!values.address.addressLine1 &&
    !!values.address.city &&
    !!values.phoneNumber &&
    !!values.phoneNumberCountryCode
  )
}

export const processSavedAddresses = (
  addresses: Order2DeliveryForm_me$data["addressConnection"],
  availableShippingCountries: readonly string[],
): ProcessedUserAddress[] => {
  const meAddresses = extractNodes(addresses)
  const processedAddresses = meAddresses.map(address => {
    const normalizedAddress = normalizeAddress(address)
    const isShippable = availableShippingCountries.includes(
      normalizedAddress.address.country,
    )

    const isValid = validateAddressFields(normalizedAddress)

    return {
      ...normalizedAddress,
      isShippable,
      isValid,
      internalID: address.internalID,
      isDefault: address.isDefault,
      phoneNumberParsed: address.phoneNumberParsed,
    }
  })
  return sortAddressesByPriority(processedAddresses)
}

export const sortAddressesByPriority = (addresses: ProcessedUserAddress[]) => {
  return [...addresses].sort((a, b) => {
    const aUsable = a.isShippable && a.isValid
    const bUsable = b.isShippable && b.isValid

    if (a.isDefault && aUsable && !(b.isDefault && bUsable)) return -1
    if (b.isDefault && bUsable && !(a.isDefault && aUsable)) return 1

    if (aUsable && !bUsable) return -1
    if (!aUsable && bUsable) return 1

    return 0
  })
}

export const findInitialSelectedAddress = (
  processedAddresses: ProcessedUserAddress[],
  initialValues: FormikContextWithAddress,
): ProcessedUserAddress | undefined => {
  // First, try to find an address that matches the order's fulfillment details
  const matchingAddress = processedAddresses.find(processedAddress => {
    return (
      initialValues.address.name === processedAddress.address.name &&
      initialValues.address.country === processedAddress.address.country &&
      initialValues.address.postalCode === processedAddress.address.postalCode &&
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
  })

  if (matchingAddress) {
    return matchingAddress
  }

  // If there's only one saved address, auto-select it regardless of validity
  if (processedAddresses.length === 1) {
    return processedAddresses[0]
  }

  // Otherwise, find the first valid and shippable address
  return processedAddresses.find(
    processedAddress =>
      processedAddress.isShippable && processedAddress.isValid,
  )
}

export const deliveryAddressValidationSchema = yup
  .object()
  .shape(addressFormFieldsValidator({ withPhoneNumber: true }))
