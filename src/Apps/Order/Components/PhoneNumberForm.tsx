import { FC, useState, useEffect, ChangeEvent } from "react"
import { Flex } from "@artsy/palette"
import {
  PhoneNumberInput,
  validatePhoneNumber,
} from "Components/PhoneNumberInput"

const PHONE_NUMBER_ERROR_MESSAGE = "Please enter a valid phone number"

export interface PhoneNumberFormProps {
  phoneNumber: string
  setPhoneNumber: (phone: string) => void
  phoneNumberCountryCode: string
  setPhoneNumberCountryCode: (code: string) => void
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

  const handlePhoneNumberValidation = async (phone: string, code: string) => {
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
          value: phoneNumber,
        }}
        selectProps={{
          name: "phoneNumberCountryCode",
          selected: phoneNumberCountryCode,
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
