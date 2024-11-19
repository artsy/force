// import { ContextModule } from "@artsy/cohesion"
import { Column, GridColumns, Input } from "@artsy/palette"
import { useFormContext } from "Apps/Auction/Hooks/useFormContext"
import { AddressAutocompleteInput } from "Components/Address/AddressAutocompleteInput"
import { CountrySelect } from "Components/CountrySelect"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"

export const AddressForm = () => {
  const {
    handleChange,
    handleBlur,
    errors,
    values,
    touched,
    setValues,
    setFieldValue,
  } = useFormContext()

  const { contextPageOwnerId, contextPageOwnerType } = useAnalyticsContext()

  const autocompleteTrackingValues = {
    contextModule: "auctionRegistration" as any,
    // contextModule: ContextModule.auctionRegistration,
    contextOwnerType: contextPageOwnerType,
    contextPageOwnerId: contextPageOwnerId || "",
  }

  return (
    <GridColumns>
      <Column>
        <Input
          name="address.name"
          title="Full Name"
          placeholder="Add full name"
          autoComplete="name"
          autoFocus
          value={values.address?.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address?.name && errors.address?.name}
          required
        />
      </Column>

      <Column>
        <CountrySelect
          name="address.country"
          title="Country"
          // TODO: Accept a value prop in Select
          // @ts-ignore
          value={values.address.country}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address?.country && errors.address?.country}
          required
        />
      </Column>

      <Column>
        <AddressAutocompleteInput
          trackingValues={autocompleteTrackingValues}
          address={{
            country: values.address.country,
          }}
          flip={false}
          required
          disableAutocomplete={values.address.region === "AK"}
          name="address.addressLine1"
          placeholder="Add address"
          title="Address Line 1"
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
          error={touched.address?.addressLine1 && errors.address?.addressLine1}
          onClear={() => {
            setFieldValue("address.addressLine1", "")
          }}
        />
      </Column>

      <Column>
        <Input
          name="address.addressLine2"
          title="Apt, floor, suite, etc. (optional)"
          placeholder="Add apartment, floor, suite, etc."
          autoComplete="address-line2"
          value={values.address?.addressLine2}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address?.addressLine2 && errors.address?.addressLine2}
        />
      </Column>

      <Column>
        <Input
          name="address.city"
          title="City"
          placeholder="Add city"
          autoComplete="address-level2"
          value={values.address?.city}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address?.city && errors.address?.city}
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
          error={touched.address?.region && errors.address?.region}
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
          error={touched.address?.postalCode && errors.address?.postalCode}
          required
        />
      </Column>

      <Column>
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
          error={touched.phoneNumber && errors.phoneNumber}
          required
        />
      </Column>
    </GridColumns>
  )
}
