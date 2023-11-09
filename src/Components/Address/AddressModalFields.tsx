import * as React from "react"
import { Column, GridColumns, Input } from "@artsy/palette"
import { useFormikContext } from "formik"
import { SavedAddressType } from "Apps/Order/Utils/shippingUtils"
import { CountrySelect } from "Components/CountrySelect"

export const AddressModalFields: React.FC = () => {
  const {
    values,
    touched,
    handleBlur,
    handleChange,
    errors,
    setFieldValue,
  } = useFormikContext<SavedAddressType>()

  return (
    <GridColumns mt={[1, 2]}>
      <Column span={12}>
        <Input
          title="Full name"
          placeholder="Full name"
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.name && errors.name}
          value={values?.name || undefined}
        />
      </Column>
      <Column span={12}>
        <CountrySelect
          title="Country"
          selected={values?.country}
          onSelect={countryCode => {
            setFieldValue("country", countryCode)
          }}
          error={touched.country && errors.country ? errors.country : ""}
        />
      </Column>
      <Column span={12}>
        <Input
          title="Address Line 1"
          placeholder="Street address"
          name="addressLine1"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.addressLine1 && errors.addressLine1}
          value={values?.addressLine1}
        />
      </Column>
      <Column span={12}>
        <Input
          title="Address Line 2"
          placeholder="Apt, floor, suite, etc. (optional)"
          name="addressLine2"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.addressLine2 && errors.addressLine2}
          value={values?.addressLine2 || ""}
        />
      </Column>
      <Column span={12}>
        <Input
          title="City"
          placeholder="City"
          name="city"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.city && errors.city}
          value={values?.city}
        />
      </Column>
      <Column span={6}>
        <Input
          title="State, province, or region"
          placeholder="State, province, or region"
          name="region"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.region && errors.region}
          value={values?.region || ""}
        />
      </Column>
      <Column span={6}>
        <Input
          title="Postal Code"
          placeholder="ZIP/Postal code"
          name="postalCode"
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.postalCode && errors.postalCode}
          value={values?.postalCode || ""}
        />
      </Column>
    </GridColumns>
  )
}
