import {
  Column,
  GridColumns,
  Text,
  Spacer,
  Input,
  AutocompleteInput,
} from "@artsy/palette"
import { CountrySelect } from "Components/CountrySelect"
import * as React from "react"
import { CreateTokenCardData } from "@stripe/stripe-js"
import { isEqual } from "lodash"
import {
  AddressAutocompleteSuggestion,
  useAddressAutocomplete,
} from "Components/Address/useAddressAutocomplete"
import { useTracking } from "react-tracking"
import {
  ActionType,
  ContextModule,
  EditedAutocompletedAddress,
  OwnerType,
  SelectedItemFromAddressAutoCompletion,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

const ENABLE_SECONDARY_SUGGESTIONS = false

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
  const addressFromProp = { ...emptyAddress, ...value }
  const [address, setAddress] = React.useState(addressFromProp)
  const [prevValue, setPrevValue] = React.useState(value)
  const { trackEvent } = useTracking()
  const { contextPageOwnerId } = useAnalyticsContext()
  const [selectedAddressOption, setSelectedAddressOption] = React.useState<{
    option: string
    edited: boolean
  }>({
    option: "",
    edited: false,
  })

  const {
    autocompleteOptions,
    fetchForAutocomplete,
    fetchSecondarySuggestions,
    ...autocomplete
  } = useAddressAutocomplete(address, {
    enableSecondarySuggestions: ENABLE_SECONDARY_SUGGESTIONS,
  })

  if (!isEqual(value, prevValue)) {
    setPrevValue(value)
    setAddress(addressFromProp)
  }

  const [key, setKey] = React.useState<keyof Address>()

  const changeEventHandler = (key: keyof Address) => (
    ev: React.FormEvent<HTMLInputElement>
  ) => {
    const shouldFetch = autocomplete.enabled && key === "addressLine1"
    if (shouldFetch) {
      fetchForAutocomplete({ search: ev.currentTarget.value })
    }
    setKey(key)
    onChangeValue(key, ev.currentTarget.value)

    if (
      selectedAddressOption.option &&
      !selectedAddressOption.edited &&
      key !== "name" &&
      key !== "phoneNumber"
    ) {
      trackAutoCompleteEdit(key)
      setSelectedAddressOption({ ...selectedAddressOption, edited: true })
    }
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

  /* TODO: Make this work with autocomplete input */
  const autocompleteRef = React.createRef<HTMLInputElement>()

  const trackAutoCompleteEdit = field => {
    const event: EditedAutocompletedAddress = {
      action: ActionType.editedAutocompletedAddress,
      context_module: ContextModule.ordersShipping,
      context_owner_type: OwnerType.ordersShipping,
      context_owner_id: contextPageOwnerId,
      field: field,
    }

    trackEvent(event)
  }

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
          data-testid="AddressForm_name"
        />
      </Column>

      <Column span={12}>
        <CountrySelect
          title="Country"
          id="country-select"
          tabIndex={tabIndex}
          selected={
            lockCountryToOrigin || (lockCountriesToEU && !value?.country)
              ? shippingCountry
              : value?.country
          }
          onSelect={changeValueHandler("country")}
          disabled={lockCountryToOrigin}
          euShippingOnly={lockCountriesToEU}
          data-testid="AddressForm_country"
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
        {/* Render the autocomplete optimistically to avoid an SSR mismatch */}
        {!billing && (!autocomplete.loaded || autocomplete.enabled) ? (
          <AutocompleteInput<AddressAutocompleteSuggestion>
            tabIndex={tabIndex}
            loading={!autocomplete.loaded}
            flip={false}
            id="AddressForm_addressLine1"
            placeholder="Street address"
            title="Address line 1"
            value={value?.addressLine1}
            onChange={changeEventHandler("addressLine1")}
            options={autocompleteOptions}
            onClear={() => {
              onChangeValue("addressLine1", "")
              fetchForAutocomplete({ search: "" })
            }}
            onSelect={option => {
              Object.entries(option.address).forEach(([key, value]) => {
                changeValueHandler(key as keyof Address)(value)
              })

              setSelectedAddressOption({ option: option.value, edited: false })

              const event: SelectedItemFromAddressAutoCompletion = {
                action: ActionType.selectedItemFromAddressAutoCompletion,
                context_module: ContextModule.ordersShipping,
                context_owner_type: OwnerType.ordersShipping,
                context_owner_id: contextPageOwnerId,
                input: value?.addressLine1 || "",
                item: option.value,
              }

              trackEvent(event)
            }}
            error={getError("addressLine1")}
            data-testid="AddressForm_addressLine1"
            forwardRef={autocompleteRef}
          />
        ) : (
          <Input
            tabIndex={tabIndex}
            id="AddressForm_addressLine1"
            placeholder="Street address"
            title="Address line 1"
            value={value?.addressLine1}
            onChange={changeEventHandler("addressLine1")}
            error={getError("addressLine1")}
            data-testid="AddressForm_addressLine1"
          />
        )}
      </Column>
      <Column span={12}>
        <Input
          tabIndex={tabIndex}
          id="AddressForm_addressLine2"
          placeholder="Apt, floor, suite, etc."
          title="Address line 2 (optional)"
          value={value?.addressLine2 || ""}
          onChange={changeEventHandler("addressLine2")}
          error={getError("addressLine2")}
          data-testid="AddressForm_addressLine2"
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
          data-testid="AddressForm_city"
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
          data-testid="AddressForm_region"
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
          data-testid="AddressForm_postalCode"
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
              data-testid="AddressForm_phoneNumber"
            />
          </Column>
          <Spacer y={2} />
        </>
      )}
    </GridColumns>
  )
}
