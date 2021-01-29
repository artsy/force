import React from "react"
import { Button, Input, Modal, Spacer } from "@artsy/palette"
import { SavedAddressType } from "../Utils/shippingAddressUtils"
import { useFormik } from "formik"
import { validateAddress, validatePhoneNumber } from "../Utils/formValidators"
import { CountrySelect } from "v2/Components/CountrySelect"

interface Props {
  show: boolean
  onClose: () => void
  address: SavedAddressType
}

// type AddressAttrubytes = keyof SavedAddressType
// type AddressErrors = Record<AddressAttrubytes, string>

const saveAddress = values => {
  // TODO: call update mutation
  console.log(values)
}

const validateor = (values: any) => {
  const validationResult = validateAddress(values)
  const phoneValidation = validatePhoneNumber(values.phoneNumber)
  return Object.assign({}, validationResult.errors, {
    phoneNumber: phoneValidation.error,
  })
}

export const AddressModal: React.FC<Props> = ({ show, onClose, address }) => {
  const formik = useFormik({
    initialValues: address,
    validate: validateor,
    onSubmit: saveAddress,
  })
  return (
    <Modal title="Edit address" show={show} onClose={onClose}>
      <form onSubmit={formik.handleSubmit}>
        <Input
          name="name"
          title="Full Name"
          onChange={formik.handleChange}
          error={formik.errors.name as string}
          value={formik.values.name}
        />
        <Spacer mb={1} />
        <Input
          name="postalCode"
          title="Postal Code"
          onChange={formik.handleChange}
          error={formik.errors.postalCode as string}
          value={formik.values.postalCode}
        />
        <Spacer mb={1} />
        <Input
          title="Address Line 1"
          name="addressLine1"
          onChange={formik.handleChange}
          error={formik.errors.addressLine as string}
          value={formik.values.addressLine1}
        />
        <Spacer mb={1} />
        <Input
          title="Address Line 2"
          name="addressLine2"
          onChange={formik.handleChange}
          error={formik.errors.addressLine2 as string}
          value={formik.values.addressLine2}
        />
        <Spacer mb={1} />
        <Input
          title="City"
          name="city"
          onChange={formik.handleChange}
          error={formik.errors.city as string}
          value={formik.values.city}
        />
        <Spacer mb={1} />
        <Input
          title="Region"
          name="region"
          onChange={formik.handleChange}
          error={formik.errors.region as string}
          value={formik.values.region}
        />
        <Spacer mb={1} />
        <CountrySelect
          selected={formik.values.country}
          onSelect={countryCode => {
            formik.setFieldValue("country", countryCode)
          }}
          error={formik.errors.country as string}
        />
        <Spacer mb={1} />
        <Input
          title="Phone number"
          name="phoneNumber"
          type="tel"
          onChange={formik.handleChange}
          error={formik.errors.phoneNumber as string}
          value={formik.values.phoneNumber}
        />
        <Button
          type="submit"
          size="large"
          loading={formik.isSubmitting}
          width="100%"
          mt={2}
        >
          Save changes
        </Button>
      </form>
    </Modal>
  )
}
