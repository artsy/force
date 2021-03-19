import React from "react"
import { Input, Spacer, Text } from "@artsy/palette"
import { useFormikContext } from "formik"
import { SavedAddressType } from "v2/Apps/Order/Utils/shippingAddressUtils"
import { CountrySelect } from "../CountrySelect"

export const AddressModalFields: React.FC = props => {
  const {
    values,
    touched,
    handleBlur,
    handleChange,
    errors,
    setFieldValue,
  } = useFormikContext<SavedAddressType>()
  return (
    <>
      <Input
        id="name"
        name="name"
        type="text"
        title="Full Name *"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && errors.name}
        value={values?.name}
      />
      <Spacer mb={1} />
      <Input
        name="postalCode"
        title="Postal Code *"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.postalCode && errors.postalCode}
        value={values?.postalCode}
      />
      <Spacer mb={1} />
      <Input
        title="Address Line 1 *"
        name="addressLine1"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.addressLine1 && errors.addressLine1}
        value={values?.addressLine1}
      />
      <Spacer mb={1} />
      <Input
        title="Address Line 2"
        name="addressLine2"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.addressLine2 && errors.addressLine2}
        value={values?.addressLine2}
      />
      <Spacer mb={1} />
      <Input
        title="City *"
        name="city"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.city && errors.city}
        value={values?.city}
      />
      <Spacer mb={1} />
      <Input
        title="Region *"
        name="region"
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.region && errors.region}
        value={values?.region}
      />
      <Spacer mb={1} />
      <Text>Country *</Text>
      <CountrySelect
        selected={values?.country}
        onSelect={countryCode => {
          setFieldValue("country", countryCode)
        }}
        error={touched.country && errors.country}
      />
    </>
  )
}
