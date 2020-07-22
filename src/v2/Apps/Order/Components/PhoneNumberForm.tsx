import { Flex } from "@artsy/palette"
import Input from "v2/Components/Input"
import React, { useState } from "react"

export type PhoneNumber = string

export type PhoneNumberError = Partial<PhoneNumber>
export type PhoneNumberTouched = boolean
export type PhoneNumberChangeHandler = (phoneNumber: string) => void

export const emptyPhoneNumber: string = ""

export interface PhoneNumberFormProps {
  onChange: PhoneNumberChangeHandler
  value?: string
  errors: PhoneNumberError
  touched: PhoneNumberTouched
  label: string
  id: string
}

export const PhoneNumberForm: React.FC<PhoneNumberFormProps> = ({
  errors,
  id,
  label,
  onChange,
  touched,
  value,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(
    value || emptyPhoneNumber
  )

  const changeEventHandler = () => (ev: React.FormEvent<HTMLInputElement>) => {
    onChangeValue(ev.currentTarget.value)
  }

  const onChangeValue = (value: string) => {
    setPhoneNumber(value)
    onChange(phoneNumber)
  }

  const getError = () => {
    return (touched && errors) || ""
  }

  return (
    <Flex flexDirection="column" mb={2}>
      <Input
        id={id}
        title="Phone number"
        type="tel"
        description={label}
        placeholder="Add phone"
        pattern="[^a-z]+"
        value={value}
        onChange={changeEventHandler()}
        error={getError()}
        block
      />
    </Flex>
  )
}
