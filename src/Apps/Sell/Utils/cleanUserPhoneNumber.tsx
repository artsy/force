import { countries } from "Apps/Sell/Utils/countries"
import { getCountryIso2FromPhoneNumber } from "Apps/Sell/Utils/getCountryIso2FromPhoneNumber"

export function cleanUserPhoneNumber(value: string) {
  let countryCode = getCountryIso2FromPhoneNumber(value) ?? ""

  // replace non-digits
  let phoneNumber = value.replace(/[^+\d]/g, "").trim()

  const dialCode = countries.find(c => c.iso2 === countryCode)?.dialCode

  // remove country code if present
  if (dialCode && phoneNumber.startsWith("+" + dialCode)) {
    phoneNumber = phoneNumber.slice(dialCode.length + 1).trim()
  }

  return { countryCode, phoneNumber }
}
