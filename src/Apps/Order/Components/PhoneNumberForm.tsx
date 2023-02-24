import { Flex, Input } from "@artsy/palette"
import { FC } from "react"

export type PhoneNumber = string

export type PhoneNumberError = Partial<PhoneNumber>
export type PhoneNumberTouched = boolean
export type PhoneNumberChangeHandler = (phoneNumber: string) => void

export interface PhoneNumberFormProps {
  onChange: PhoneNumberChangeHandler
  value?: string
  errors: PhoneNumberError
  touched: PhoneNumberTouched
  label: string
}

export const PhoneNumberForm: FC<PhoneNumberFormProps> = ({
  onChange,
  touched,
  errors,
  label,
  value,
}) => {
  const changeEventHandler = () => (ev: React.FormEvent<HTMLInputElement>) => {
    onChange(ev.currentTarget.value)
  }

  const getError = () => {
    return (touched && errors) || ""
  }

  return (
    <Flex flexDirection="column" mb={2}>
      <Input
        id="PhoneNumberForm_phoneNumber"
        title="Phone number"
        type="tel"
        description={label}
        placeholder="Add phone"
        pattern="[^a-z]+"
        value={value}
        onChange={changeEventHandler()}
        error={getError()}
      />
    </Flex>
  )
}
