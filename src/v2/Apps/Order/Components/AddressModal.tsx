import React from "react"
import { Button, Input, Modal, Spacer } from "@artsy/palette"
import { SavedAddressType } from "../Utils/shippingAddressUtils"
import { Formik, FormikProps } from "formik"
import {
  removeEmptyKeys,
  validateAddress,
  validatePhoneNumber,
} from "../Utils/formValidators"
import { CountrySelect } from "v2/Components/CountrySelect"
import { CommitMutation } from "../Utils/commitMutation"
import { updateUserAddress } from "../Mutations/shippingMutations"

interface Props {
  show: boolean
  closeModal: () => void
  address: SavedAddressType
  commitMutation: CommitMutation
  onSuccess: (address) => void
  onError: (message: string) => void
}

const validator = (values: any) => {
  const validationResult = validateAddress(values)
  const phoneValidation = validatePhoneNumber(values.phoneNumber)
  const errors = Object.assign({}, validationResult.errors, {
    phoneNumber: phoneValidation.error,
  })
  const errorsTrimmed = removeEmptyKeys(errors)
  return errorsTrimmed
}

export const AddressModal: React.FC<Props> = ({
  show,
  closeModal,
  address,
  commitMutation,
  onSuccess,
  onError,
}) => {
  return (
    <Modal title="Edit address" show={show} onClose={closeModal}>
      <Formik
        initialValues={address}
        validate={validator}
        onSubmit={values => {
          updateUserAddress(
            commitMutation,
            address.internalID,
            values,
            closeModal,
            onSuccess,
            onError
          )
        }}
      >
        {(formik: FormikProps<SavedAddressType>) => (
          <form onSubmit={formik.handleSubmit}>
            <Input
              id="name"
              name="name"
              type="text"
              title="Full Name"
              onChange={formik.handleChange}
              error={formik.errors.name}
              value={formik.values.name}
            />
            <Spacer mb={1} />
            <Input
              name="postalCode"
              title="Postal Code"
              onChange={formik.handleChange}
              error={formik.errors.postalCode}
              value={formik.values.postalCode}
            />
            <Spacer mb={1} />
            <Input
              title="Address Line 1"
              name="addressLine1"
              onChange={formik.handleChange}
              error={formik.errors.addressLine1}
              value={formik.values.addressLine1}
            />
            <Spacer mb={1} />
            <Input
              title="Address Line 2"
              name="addressLine2"
              onChange={formik.handleChange}
              error={formik.errors.addressLine2}
              value={formik.values.addressLine2}
            />
            <Spacer mb={1} />
            <Input
              title="City"
              name="city"
              onChange={formik.handleChange}
              error={formik.errors.city}
              value={formik.values.city}
            />
            <Spacer mb={1} />
            <Input
              title="Region"
              name="region"
              onChange={formik.handleChange}
              error={formik.errors.region}
              value={formik.values.region}
            />
            <Spacer mb={1} />
            <CountrySelect
              selected={formik.values.country}
              onSelect={countryCode => {
                formik.setFieldValue("country", countryCode)
              }}
              error={formik.errors.country}
            />
            <Spacer mb={1} />
            <Input
              title="Phone number"
              name="phoneNumber"
              type="tel"
              onChange={formik.handleChange}
              error={formik.errors.phoneNumber}
              value={formik.values.phoneNumber}
            />
            <Button
              type="submit"
              size="large"
              loading={formik.isSubmitting}
              disabled={Object.keys(formik.errors).length > 0}
              width="100%"
              mt={2}
              onClick={() => formik.handleSubmit()}
            >
              Save changes
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  )
}
