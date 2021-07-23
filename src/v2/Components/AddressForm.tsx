import { Flex, Join, Sans, Serif, Spacer, Input } from "@artsy/palette"
import { CountrySelect } from "v2/Components/CountrySelect"
import React from "react"
import { TwoColumnSplit } from "../Apps/Order/Components/TwoColumnLayout"

export interface Address {
  name: string
  country: string
  postalCode: string
  addressLine1: string
  addressLine2: string
  city: string
  region: string
  phoneNumber: string
}

export type AddressErrors = Partial<Address>
export type AddressTouched = Partial<{ [T in keyof Address]: boolean }>
export type AddressChangeHandler = (
  address: Address,
  key: keyof Address
) => void

export const emptyAddress: Address = Object.freeze({
  name: "",
  country: "",
  postalCode: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  phoneNumber: "",
})
export interface AddressFormProps {
  onChange: AddressChangeHandler
  value?: Partial<Address>
  billing?: boolean
  domesticOnly?: boolean
  euOrigin?: boolean
  showPhoneNumberInput?: boolean
  shippingCountry?: string
  errors: AddressErrors
  touched: AddressTouched
}

interface AddressFormState {
  address: Address
}

export class AddressForm extends React.Component<
  AddressFormProps,
  AddressFormState
> {
  state = {
    address: {
      ...emptyAddress,
      ...this.props.value,
    },
  }

  changeEventHandler = (key: keyof Address) => (
    ev: React.FormEvent<HTMLInputElement>
  ) => {
    this.onChangeValue(key, ev.currentTarget.value)
  }

  changeValueHandler = (key: keyof Address) => (value: string) => {
    this.onChangeValue(key, value)
  }

  onChangeValue = (key: keyof Address, value: string) => {
    this.setState({ address: { ...this.state.address, [key]: value } }, () => {
      this.props.onChange(this.state.address, key)
    })
  }

  getError = (key: keyof Address): string => {
    return (
      (this.props.touched &&
        this.props.touched[key] &&
        this.props.errors &&
        this.props.errors[key]) ||
      ""
    )
  }

  phoneNumberInputDescription = (): string | undefined => {
    if (this.props.billing && this.props.showPhoneNumberInput) {
      return
    } else {
      return "Required for shipping logistics"
    }
  }

  render() {
    const onlyLocalShipping = !this.props.billing && !!this.props.domesticOnly
    const lockCountryToOrigin = onlyLocalShipping && !this.props.euOrigin
    const lockCountriesToEU = onlyLocalShipping && this.props.euOrigin

    const { address } = this.state

    return (
      <Join separator={<Spacer mb={2} />}>
        <Flex flexDirection="column">
          <Input
            id="AddressForm_name"
            placeholder="Add full name"
            title={this.props.billing ? "Name on card" : "Full name"}
            autoCorrect="off"
            value={address.name}
            onChange={this.changeEventHandler("name")}
            error={this.getError("name")}
          />
        </Flex>

        <TwoColumnSplit>
          <Flex flexDirection="column" pb={1}>
            <Serif mb={1} size="3t" color="black100" lineHeight="1.1em">
              Country
            </Serif>
            <CountrySelect
              selected={
                lockCountryToOrigin ||
                (lockCountriesToEU && !this.state.address.country)
                  ? this.props.shippingCountry
                  : this.state.address.country
              }
              onSelect={this.changeValueHandler("country")}
              disabled={lockCountryToOrigin}
              euShippingOnly={lockCountriesToEU}
            />
            {(lockCountryToOrigin || lockCountriesToEU) && (
              <>
                <Spacer m={0.5} />
                <Sans size="2" color="black60">
                  {lockCountriesToEU
                    ? "Continental Europe shipping only."
                    : "Domestic shipping only."}
                </Sans>
              </>
            )}
          </Flex>

          <Flex flexDirection="column">
            <Input
              id="AddressForm_postalCode"
              placeholder="Add postal code"
              title="Postal code"
              autoCapitalize="characters"
              autoCorrect="off"
              value={address.postalCode}
              onChange={this.changeEventHandler("postalCode")}
              error={this.getError("postalCode")}
            />
          </Flex>
        </TwoColumnSplit>
        <TwoColumnSplit>
          <Flex flexDirection="column">
            <Input
              id="AddressForm_addressLine1"
              placeholder="Add street address"
              title="Address line 1"
              value={address.addressLine1}
              onChange={this.changeEventHandler("addressLine1")}
              error={this.getError("addressLine1")}
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              id="AddressForm_addressLine2"
              placeholder="Add apt, floor, suite, etc."
              title="Address line 2 (optional)"
              value={address.addressLine2}
              onChange={this.changeEventHandler("addressLine2")}
              error={this.getError("addressLine2")}
            />
          </Flex>
        </TwoColumnSplit>
        <TwoColumnSplit>
          <Flex flexDirection="column">
            <Input
              id="AddressForm_city"
              placeholder="Add city"
              title="City"
              value={address.city}
              onChange={this.changeEventHandler("city")}
              error={this.getError("city")}
            />
          </Flex>

          <Flex flexDirection="column">
            <Input
              id="AddressForm_region"
              placeholder="Add State, province, or region"
              title="State, province, or region"
              autoCorrect="off"
              value={address.region}
              onChange={this.changeEventHandler("region")}
              error={this.getError("region")}
            />
          </Flex>
        </TwoColumnSplit>
        {this.props.showPhoneNumberInput && (
          <>
            <Flex flexDirection="column">
              <Input
                id="AddressForm_phoneNumber"
                title="Phone number"
                type="tel"
                description={this.phoneNumberInputDescription()}
                placeholder="Add phone"
                pattern="[^a-z]+"
                value={address.phoneNumber}
                onChange={this.changeEventHandler("phoneNumber")}
                error={this.getError("phoneNumber")}
              />
            </Flex>
            <Spacer mb={2} />
          </>
        )}
      </Join>
    )
  }
}
