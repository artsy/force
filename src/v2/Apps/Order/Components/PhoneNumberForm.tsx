import { Flex } from "@artsy/palette"
import Input from "v2/Components/Input"
import React from "react"

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
}

interface PhoneNumberFormState {
  phoneNumber: string
}

export class PhoneNumberForm extends React.Component<
  PhoneNumberFormProps,
  PhoneNumberFormState
  > {
  state = {
    phoneNumber: this.props.value || emptyPhoneNumber,
  }

  changeEventHandler = () => (ev: React.FormEvent<HTMLInputElement>) => {
    this.onChangeValue(ev.currentTarget.value)
  }

  changeValueHandler = () => (value: string) => {
    this.onChangeValue(value)
  }

  onChangeValue = (value: string) => {
    this.setState({ phoneNumber: value }, () => {
      this.props.onChange(this.state.phoneNumber)
    })
  }

  getError = () => {
    return (this.props.touched && this.props.errors) || ""
  }

  render() {
    return (
      <Flex flexDirection="column" mb={2}>
        <Input
          id="PhoneNumberForm_phoneNumber"
          title="Phone number"
          type="tel"
          description={this.props.label}
          placeholder="Add phone"
          pattern="[^a-z]+"
          value={this.props.value}
          onChange={this.changeEventHandler()}
          error={this.getError()}
          block
        />
      </Flex>
    )
  }
}
