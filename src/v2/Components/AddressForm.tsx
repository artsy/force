import { Flex, Join, Text, Spacer, Input } from "@artsy/palette"
import { CountrySelect } from "v2/Components/CountrySelect"
import * as React from "react"
import { TwoColumnSplit } from "../Apps/Order/Components/TwoColumnLayout"
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
    <Join separator={<Spacer mb={2} />}>
      <Flex flexDirection="column">
        <Input
          id="AddressForm_name"
          placeholder="Add full name"
          title={billing ? "Name on card" : "Full name"}
          autoCorrect="off"
          value={address.name}
          onChange={changeEventHandler("name")}
          error={getError("name")}
        />
      </Flex>

      <TwoColumnSplit>
        <Flex flexDirection="column" pb={1}>
          <Text
            mb={0.5}
            variant="xs"
            color="black100"
            textTransform="uppercase"
          >
            Country
          </Text>
          <CountrySelect
            selected={
              lockCountryToOrigin || (lockCountriesToEU && !address.country)
                ? shippingCountry
                : address.country
            }
            onSelect={changeValueHandler("country")}
            disabled={lockCountryToOrigin}
            euShippingOnly={lockCountriesToEU}
          />
          {(lockCountryToOrigin || lockCountriesToEU) && (
            <>
              <Spacer m={0.5} />
              <Text variant="xs" color="black60">
                {lockCountriesToEU
                  ? "Continental Europe shipping only."
                  : "Domestic shipping only."}
              </Text>
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
            onChange={changeEventHandler("postalCode")}
            error={getError("postalCode")}
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
            onChange={changeEventHandler("addressLine1")}
            error={getError("addressLine1")}
          />
        </Flex>

        <Flex flexDirection="column">
          <Input
            id="AddressForm_addressLine2"
            placeholder="Add apt, floor, suite, etc."
            title="Address line 2 (optional)"
            value={address.addressLine2}
            onChange={changeEventHandler("addressLine2")}
            error={getError("addressLine2")}
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
            onChange={changeEventHandler("city")}
            error={getError("city")}
          />
        </Flex>

        <Flex flexDirection="column">
          <Input
            id="AddressForm_region"
            placeholder="Add State, province, or region"
            title="State, province, or region"
            autoCorrect="off"
            value={address.region}
            onChange={changeEventHandler("region")}
            error={getError("region")}
          />
        </Flex>
      </TwoColumnSplit>
      {showPhoneNumberInput && (
        <>
          <Flex flexDirection="column">
            <Input
              id="AddressForm_phoneNumber"
              title="Phone number"
              type="tel"
              description={phoneNumberInputDescription()}
              placeholder="Add phone"
              pattern="[^a-z]+"
              value={address.phoneNumber}
              onChange={changeEventHandler("phoneNumber")}
              error={getError("phoneNumber")}
            />
          </Flex>
          <Spacer mb={2} />
        </>
      )}
    </Join>
  )
}
