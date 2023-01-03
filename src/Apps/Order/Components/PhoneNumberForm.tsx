import { FC, useState, useEffect, ChangeEvent } from "react"
import { Flex } from "@artsy/palette"
import {
  PhoneNumberInput,
  validatePhoneNumber,
} from "Components/PhoneNumberInput"

const PHONE_NUMBER_ERROR_MESSAGE = "Please enter a valid phone number"

export interface PhoneNumberFormProps {
  phoneNumber: string | null
  setPhoneNumber: (phone: string | null) => void
  phoneNumberCountryCode: string | null
  setPhoneNumberCountryCode: (code: string | null) => void
  onPhoneNumberValidation: (isValid: boolean) => void
}

export const PhoneNumberForm: FC<PhoneNumberFormProps> = ({
  phoneNumber,
  setPhoneNumber,
  phoneNumberCountryCode,
  setPhoneNumberCountryCode,
  onPhoneNumberValidation,
}) => {
  useEffect(() => {
    handlePhoneNumberValidation(phoneNumber, phoneNumberCountryCode)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [phoneNumberError, setPhoneNumberError] = useState<string | undefined>()

  const handlePhoneNumberValidation = async (
    phone: string | null,
    code: string | null
  ) => {
    if (phone === null || code === null) return

    const isValid = await validatePhoneNumber({
      national: phone,
      regionCode: code,
    })
    onPhoneNumberValidation(isValid)

    if (!isValid) {
      setPhoneNumberError(PHONE_NUMBER_ERROR_MESSAGE)
      return
    }
    setPhoneNumberError(undefined)
  }

  const handlePhoneNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const phone = e.target.value
    setPhoneNumber(phone)
    handlePhoneNumberValidation(phone, phoneNumberCountryCode)
  }

  const handlePhoneNumberCountryCodeChange = (countryCode: string) => {
    setPhoneNumberCountryCode(countryCode)
    handlePhoneNumberValidation(phoneNumber, countryCode)
  }

  return (
    <Flex flexDirection="column" mb={2}>
      <PhoneNumberInput
        inputProps={{
          name: "phoneNumber",
          onChange: value => handlePhoneNumberChange(value),
          placeholder: "(000) 000 0000",
          value: phoneNumber || "",
        }}
        selectProps={{
          name: "phoneNumberCountryCode",
          selected: phoneNumberCountryCode || undefined,
          onSelect: value => {
            handlePhoneNumberCountryCodeChange(value)
          },
        }}
        required
        error={phoneNumberError}
      />
    </Flex>
  )
}
