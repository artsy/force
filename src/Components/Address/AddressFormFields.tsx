import { ContextModule } from "@artsy/cohesion"
import { Column, GridColumns, Input, PhoneInput, Select } from "@artsy/palette"
import { AddressAutocompleteInput } from "Components/Address/AddressAutocompleteInput"
import {
  type Address,
  basicPhoneValidator,
  isPostalCodeRequired,
  isRegionRequired,
  richPhoneValidators,
  yupAddressValidator,
} from "Components/Address/utils"
import { sortCountriesForCountryInput } from "Components/Address/utils/sortCountriesForCountryInput"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { countries as countryPhoneOptions } from "Utils/countries"
import { useFormikContext } from "formik"
import { useMemo } from "react"

export interface FormikContextWithAddress {
  address: Address
  phoneNumber?: string
  phoneNumberCountryCode?: string
}

type CountryData = (typeof countryPhoneOptions)[number]

interface Props {
  /** Whether to include rich phone number input */
  withPhoneNumber?: boolean
  /* @deprecated - legacy plain-text phone input */
  withLegacyPhoneInput?: boolean
  /** Whether to only include shippable countries */
  shippableCountries?: CountryData[]
}

/**
 * Validation schema for address form fields. Arguments match the
 * <AddressFormFields/> component - e.g. to include phone number validation
 *
 * @example
 * ```tsx
 * const validationSchema = yup.object().shape({
 *  ...addressFormFieldsValidator({ withLegacyPhoneInput: true }),
 *  saveAddress: boolean
 * })
 * // later...
 *
 * <Formik
 *  validationSchema={validationSchema}
 *  {...otherFormikProps}
 * >
 *   <AddressFormFields<AddressFormValues> withLegacyPhoneInput />
 * ```
 */
export const addressFormFieldsValidator = (args: Props = {}) => ({
  address: yupAddressValidator,
  ...(args.withLegacyPhoneInput && basicPhoneValidator),
  ...(args.withPhoneNumber && richPhoneValidators),
})

/**
 * Form fields for collecting address information. This component is intended
 * to be used within a Formik form, and the `Values` interface of that form
 * should fulfill a `FormikContextWithAddress` interface:
 * - the relevant nested `address` object
 * - plus a `phoneNumber` if the `withLegacyPhoneInput` prop is passed
 * For a composable validation schema, see `addressFormFieldsValidator()`.
 *
 * @example
 * ```tsx
 * interface MyFormValues {
 *  address: Address
 *  phoneNumber: string
 *  saveAddress: boolean
 * }
 *
 * <Formik<MyFormValues> {...otherFormikProps}>
 *  <AddressFormFields<MyFormValues> withLegacyPhoneInput />
 *  <SaveAddressCheckbox />
 *
 */
export const AddressFormFields = <V extends FormikContextWithAddress>(
  props: Props,
) => {
  const {
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
    setValues,
    setFieldValue,
  } = useFormikContext<V>()

  const dataTestIdPrefix = "addressFormFields"
  const { shippableCountries } = props

  const countryInputOptions = useMemo(() => {
    return sortCountriesForCountryInput(
      shippableCountries || countryPhoneOptions,
    )
  }, [shippableCountries])

  // Formik types don't understand our specific nested structure
  // so we need to cast these to what we know to be the correct types
  const touchedAddress = touched.address as
    | Partial<Record<keyof V["address"], boolean>>
    | undefined
  const errorsAddress = errors.address as
    | Partial<Record<keyof V["address"], string>>
    | undefined

  const { contextPageOwnerId, contextPageOwnerType } = useAnalyticsContext()

  const autocompleteTrackingValues = {
    contextModule: ContextModule.auctionRegistration,
    contextOwnerType: contextPageOwnerType,
    contextPageOwnerId: contextPageOwnerId || "",
  }

  const phoneInputType = useMemo(() => {
    if (props.withLegacyPhoneInput) {
      return "legacy"
    }
    if (props.withPhoneNumber) {
      return "rich"
    }

    return null
  }, [props.withLegacyPhoneInput, props.withPhoneNumber])

  return (
    <GridColumns data-testid={dataTestIdPrefix}>
      <Column span={12}>
        <Input
          name="address.name"
          id="address.name"
          data-testid={`${dataTestIdPrefix}.name`}
          title="Full name"
          placeholder="Add full name"
          autoComplete="name"
          autoFocus
          value={values.address?.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedAddress?.name && errorsAddress?.name}
          required
        />
      </Column>

      <Column span={12}>
        <Select
          key={`country-select-${values.address?.country || "empty"}`}
          options={countryInputOptions}
          name="address.country"
          id="address.country"
          title="Country"
          data-testid={`${dataTestIdPrefix}.country`}
          value={values.address.country}
          onChange={e => {
            setFieldValue("address.country", e.target.value)
          }}
          onBlur={handleBlur}
          error={touchedAddress?.country && errorsAddress?.country}
          required
        />
      </Column>

      <Column span={12}>
        <AddressAutocompleteInput
          name="address.addressLine1"
          id="address.addressLine1"
          data-testid={`${dataTestIdPrefix}.addressLine1`}
          trackingValues={autocompleteTrackingValues}
          address={{
            country: values.address.country,
          }}
          flip={false}
          required
          disableAutocomplete={values.address.region === "AK"}
          placeholder="Add street address"
          title="Street address"
          value={values.address.addressLine1}
          onChange={handleChange}
          onSelect={option => {
            const selectedAddress = option.address
            setValues({
              ...values,
              address: {
                ...values.address,
                addressLine1: selectedAddress.addressLine1,
                addressLine2: selectedAddress.addressLine2,
                city: selectedAddress.city,
                region: selectedAddress.region,
                postalCode: selectedAddress.postalCode,
                country: selectedAddress.country,
              },
            })
          }}
          error={touchedAddress?.addressLine1 && errorsAddress?.addressLine1}
          onClear={() => {
            setFieldValue("address.addressLine1", "")
          }}
        />
      </Column>

      <Column span={12}>
        <Input
          name="address.addressLine2"
          id="address.addressLine2"
          data-testid={`${dataTestIdPrefix}.addressLine2`}
          title="Apt, floor, suite, etc. (optional)"
          placeholder="Add apartment, floor, suite, etc."
          autoComplete="address-line2"
          value={values.address?.addressLine2}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedAddress?.addressLine2 && errorsAddress?.addressLine2}
        />
      </Column>

      <Column span={12}>
        <Input
          name="address.city"
          id="address.city"
          data-testid={`${dataTestIdPrefix}.city`}
          title="City"
          placeholder="Add city"
          autoComplete="address-level2"
          value={values.address?.city}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedAddress?.city && errorsAddress?.city}
          required
        />
      </Column>

      <Column span={6}>
        <Input
          name="address.region"
          id="address.region"
          data-testid={`${dataTestIdPrefix}.region`}
          title="State, region or province"
          placeholder="Add state, region or province"
          autoComplete="address-level1"
          value={values.address?.region}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedAddress?.region && errorsAddress?.region}
          required={isRegionRequired(values.address.country)}
        />
      </Column>

      <Column span={6}>
        <Input
          name="address.postalCode"
          id="address.postalCode"
          data-testid={`${dataTestIdPrefix}.postalCode`}
          title="ZIP/Postal code"
          placeholder="Add ZIP/Postal code"
          autoComplete="postal-code"
          value={values.address?.postalCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedAddress?.postalCode && errorsAddress?.postalCode}
          required={isPostalCodeRequired(values.address.country)}
        />
      </Column>

      {phoneInputType === "legacy" && (
        <Column span={12}>
          <Input
            name="phoneNumber"
            id="phoneNumber"
            data-testid={`${dataTestIdPrefix}.phoneNumber`}
            title="Phone number"
            type="tel"
            description="Required for shipping logistics"
            placeholder="Add phone number"
            autoComplete="tel"
            value={values.phoneNumber}
            onChange={handleChange}
            onBlur={handleBlur}
            error={
              touched.phoneNumber && (errors.phoneNumber as string | undefined)
            }
            required
          />
        </Column>
      )}
      {phoneInputType === "rich" && (
        <Column span={12}>
          <PhoneInput
            key={`phone-input-${values.phoneNumberCountryCode || "empty"}`}
            // mt required to match spacing for other text inputs
            mt={1}
            name="phoneNumber"
            onChange={handleChange}
            onBlur={handleBlur}
            data-testid={`${dataTestIdPrefix}.phoneNumber`}
            options={countryPhoneOptions}
            onSelect={(option: CountryData): void => {
              setFieldValue("phoneNumberCountryCode", option.value)
            }}
            dropdownValue={values.phoneNumberCountryCode}
            inputValue={values.phoneNumber}
            placeholder="(000) 000 0000"
            error={
              (touched.phoneNumber &&
                (errors.phoneNumber as string | undefined)) ||
              (touched.phoneNumberCountryCode &&
                (errors.phoneNumberCountryCode as string | undefined))
            }
            required
          />
        </Column>
      )}
    </GridColumns>
  )
}
