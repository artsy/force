import { Column, GridColumns, Input } from "@artsy/palette"
import { CountrySelect } from "Components/CountrySelect"
import { useFormContext } from "Apps/Auction/Hooks/useFormContext"

export const AddressForm = () => {
  const { handleChange, handleBlur, errors, values, touched } = useFormContext()

  return (
    <GridColumns>
      <Column span={12}>
        <Input
          name="address.name"
          title="Full Name"
          placeholder="Enter name"
          autoComplete="name"
          autoFocus
          value={values.address?.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address?.name && errors.address?.name}
          required
        />
      </Column>

      <Column span={6}>
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
          // FIXME: There's extra margin between title and select in palette
          // than the title and select in input. Open PR to palette
          mt={-0.5}
        />
      </Column>

      <Column span={6}>
        <Input
          name="address.postalCode"
          title="Postal Code"
          placeholder="Add postal code"
          autoComplete="postal-code"
          value={values.address?.postalCode}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address?.postalCode && errors.address?.postalCode}
          required
        />
      </Column>

      <Column span={6}>
        <Input
          name="address.addressLine1"
          title="Address Line 1"
          placeholder="Add address"
          autoComplete="address-line1"
          value={values.address?.addressLine1}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address?.addressLine1 && errors.address?.addressLine1}
          required
        />
      </Column>

      <Column span={6}>
        <Input
          name="address.addressLine2"
          title="Address Line 2"
          placeholder="Add address line 2"
          autoComplete="address-line2"
          value={values.address?.addressLine2}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address?.addressLine2 && errors.address?.addressLine2}
        />
      </Column>

      <Column span={6}>
        <Input
          name="address.city"
          title="City"
          placeholder="Enter city"
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
          title="State, Province, or Region"
          placeholder="Add state, province, or region"
          autoComplete="address-level1"
          value={values.address?.region}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address?.region && errors.address?.region}
          required
        />
      </Column>

      <Column span={12}>
        <Input
          name="phoneNumber"
          title="Phone Number"
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
