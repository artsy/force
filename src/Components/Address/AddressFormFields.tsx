import { ContextModule } from "@artsy/cohesion"
import { Column, GridColumns, Input } from "@artsy/palette"
import { AddressAutocompleteInput } from "Components/Address/AddressAutocompleteInput"
import { Address } from "Components/Address/utils"
import { CountrySelect } from "Components/CountrySelect"
import { useFormikContext } from "formik"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

interface FormikContextWithAddress {
  address: Address
  phoneNumber: string
}

export const AddressFormFields = <V extends FormikContextWithAddress>() => {
  const {
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
    setValues,
    setFieldValue,
  } = useFormikContext<V>()

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

  return (
    <GridColumns>
      <Column span={12}>
        <Input
          name="address.name"
          title="Full Name"
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
        <CountrySelect
          name="address.country"
          title="Country"
          // TODO: Accept a value prop in Select
          // @ts-ignore
          value={values.address.country}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedAddress?.country && errorsAddress?.country}
          required
        />
      </Column>

      <Column span={12}>
        <AddressAutocompleteInput
          trackingValues={autocompleteTrackingValues}
          address={{
            country: values.address.country,
          }}
          flip={false}
          required
          disableAutocomplete={values.address.region === "AK"}
          name="address.addressLine1"
          placeholder="Add street address"
          title="Street address"
          value={values.address.addressLine1}
          onChange={handleChange}
          onBlur={handleBlur}
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
          title="State, region or province"
          placeholder="Add state, region or province"
          autoComplete="address-level1"
          value={values.address?.region}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedAddress?.region && errorsAddress?.region}
          required
        />
      </Column>

      <Column span={6}>
        <Input
          name="address.postalCode"
          title="ZIP/Postal code"
          placeholder="Add ZIP/Postal code"
          autoComplete="postal-code"
          value={values.address?.postalCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedAddress?.postalCode && errorsAddress?.postalCode}
          required
        />
      </Column>

      <Column span={12}>
        <Input
          name="phoneNumber"
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
    </GridColumns>
  )
}
