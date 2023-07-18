import { Column, GridColumns, Text, Spacer, Input } from "@artsy/palette"
import { CountrySelect } from "Components/CountrySelect"
import * as React from "react"
import { CreateTokenCardData } from "@stripe/stripe-js"

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

export type AddressErrors = Partial<Address>
export type AddressTouched = Partial<{ [T in keyof Address]: boolean }>
export type AddressChangeHandler = (
  address: Address,
  key: keyof Address
) => void

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
export interface AddressFormProps {
  onChange: AddressChangeHandler
  value?: Partial<Address>
  billing?: boolean
  domesticOnly?: boolean
  euOrigin?: boolean
  showPhoneNumberInput?: boolean
  isCollapsed?: boolean
  shippingCountry?: string
  errors: AddressErrors
  touched: AddressTouched
  tabIndex?: number
}

export const AddressForm: React.FC<AddressFormProps> = ({
  onChange,
  value,
  billing,
  domesticOnly,
  euOrigin,
  showPhoneNumberInput,
  shippingCountry,
  errors,
  touched,
  tabIndex,
}) => {
  const [address, setAddress] = React.useState({ ...emptyAddress, ...value })
  const [key, setKey] = React.useState<keyof Address>()

  const changeEventHandler = (key: keyof Address) => (
    ev: React.FormEvent<HTMLInputElement>
  ) => {
    setKey(key)
    onChangeValue(key, ev.currentTarget.value)
  }

  const changeValueHandler = (key: keyof Address) => (value: string) => {
    setKey(key)
    onChangeValue(key, value)
  }

  React.useEffect(() => {
    if (key) {
      onChange(address, key)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address, key])

  const onChangeValue = (key: keyof Address, value: string) => {
    setAddress(prevAddress => ({ ...prevAddress, [key]: value }))
  }

  const getError = React.useCallback(
    (key: keyof Address) => {
      return (touched && touched[key] && errors && errors[key]) || ""
    },
    [errors, touched]
  )

  const phoneNumberInputDescription = (): string | undefined => {
    if (billing && showPhoneNumberInput) {
      return
    } else {
      return "Required for shipping logistics"
    }
  }

  const onlyLocalShipping = !billing && !!domesticOnly
  const lockCountryToOrigin = onlyLocalShipping && !euOrigin
  const lockCountriesToEU = onlyLocalShipping && euOrigin

  return (
    <GridColumns>
      <Column span={12}>
        <Input
          tabIndex={tabIndex}
          id="AddressForm_name"
          placeholder="Full name"
          title={billing ? "Name on card" : "Full name"}
          autoCorrect="off"
          value={value?.name}
          onChange={changeEventHandler("name")}
          error={getError("name")}
          data-test="AddressForm_name"
        />
      </Column>

      <Column span={12}>
        <Text mb={0.5} variant="xs" color="black100">
          Country
        </Text>
        <CountrySelect
          tabIndex={tabIndex}
          selected={
            lockCountryToOrigin || (lockCountriesToEU && !value?.country)
              ? shippingCountry
              : value?.country
          }
          onSelect={changeValueHandler("country")}
          disabled={lockCountryToOrigin}
          euShippingOnly={lockCountriesToEU}
          data-test="AddressForm_country"
        />
        {(lockCountryToOrigin || lockCountriesToEU) && (
          <>
            <Spacer x={0.5} y={0.5} />
            <Text variant="xs" color="black60">
              {lockCountriesToEU
                ? "Continental Europe shipping only."
                : "Domestic shipping only."}
            </Text>
          </>
        )}
      </Column>
      <Column span={12}>
        <Input
          tabIndex={tabIndex}
          id="AddressForm_addressLine1"
          placeholder="Street address"
          title="Address line 1"
          value={value?.addressLine1}
          onChange={changeEventHandler("addressLine1")}
          error={getError("addressLine1")}
          data-test="AddressForm_addressLine1"
        />
      </Column>
      <Column span={12}>
        <Input
          tabIndex={tabIndex}
          id="AddressForm_addressLine2"
          placeholder="Apt, floor, suite, etc."
          title="Address line 2 (optional)"
          value={value?.addressLine2}
          onChange={changeEventHandler("addressLine2")}
          error={getError("addressLine2")}
          data-test="AddressForm_addressLine2"
        />
      </Column>
      <Column span={12}>
        <Input
          tabIndex={tabIndex}
          id="AddressForm_city"
          placeholder="City"
          title="City"
          value={value?.city}
          onChange={changeEventHandler("city")}
          error={getError("city")}
          data-test="AddressForm_city"
        />
      </Column>
      <Column span={6}>
        <Input
          tabIndex={tabIndex}
          id="AddressForm_region"
          placeholder="State, province, or region"
          title="State, province, or region"
          autoCorrect="off"
          value={value?.region}
          onChange={changeEventHandler("region")}
          error={getError("region")}
          data-test="AddressForm_region"
        />
      </Column>
      <Column span={6}>
        <Input
          tabIndex={tabIndex}
          id="AddressForm_postalCode"
          placeholder="ZIP/postal code"
          title="Postal code"
          autoCapitalize="characters"
          autoCorrect="off"
          value={value?.postalCode}
          onChange={changeEventHandler("postalCode")}
          error={getError("postalCode")}
          data-test="AddressForm_postalCode"
        />
      </Column>

      {showPhoneNumberInput && (
        <>
          <Column span={12}>
            <Input
              tabIndex={tabIndex}
              id="AddressForm_phoneNumber"
              title="Phone number"
              type="tel"
              description={phoneNumberInputDescription()}
              placeholder="Add phone"
              pattern="[^a-z]+"
              value={value?.phoneNumber}
              onChange={changeEventHandler("phoneNumber")}
              error={getError("phoneNumber")}
              data-test="AddressForm_phoneNumber"
            />
          </Column>
          <Spacer y={2} />
        </>
      )}
    </GridColumns>
  )
}
