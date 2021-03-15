import React from "react"
import { Button, Input, Spacer, Text } from "@artsy/palette"
import { FormikProps } from "formik"
import { SavedAddressType } from "v2/Apps/Order/Utils/shippingAddressUtils"
import { CountrySelect } from "../CountrySelect"

interface Props {
  formik: FormikProps<SavedAddressType>
}

export const AddressModalFields: React.FC<Props> = props => {
  const { formik } = props
  return (
    <>
      <Input
        id="name"
        name="name"
        type="text"
        title="Full Name *"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
        value={formik.values?.name}
      />
      <Spacer mb={1} />
      <Input
        name="postalCode"
        title="Postal Code *"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.postalCode && formik.errors.postalCode}
        value={formik.values?.postalCode}
      />
      <Spacer mb={1} />
      <Input
        title="Address Line 1 *"
        name="addressLine1"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.addressLine1 && formik.errors.addressLine1}
        value={formik.values?.addressLine1}
      />
      <Spacer mb={1} />
      <Input
        title="Address Line 2"
        name="addressLine2"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.addressLine2 && formik.errors.addressLine2}
        value={formik.values?.addressLine2}
      />
      <Spacer mb={1} />
      <Input
        title="City *"
        name="city"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.city && formik.errors.city}
        value={formik.values?.city}
      />
      <Spacer mb={1} />
      <Input
        title="Region *"
        name="region"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.region && formik.errors.region}
        value={formik.values?.region}
      />
      <Spacer mb={1} />
      <Text>Country *</Text>
      <CountrySelect
        selected={formik.values?.country}
        onSelect={countryCode => {
          formik.setFieldValue("country", countryCode)
        }}
        error={formik.touched.country && formik.errors.country}
      />
    </>
  )
}
