import React from "react"
import { Button, Input, Modal, Spacer, Text } from "@artsy/palette"
import { SavedAddressType } from "../Utils/shippingAddressUtils"
import { Formik, FormikProps } from "formik"
import {
  removeEmptyKeys,
  validateAddress,
  validatePhoneNumber,
} from "../Utils/formValidators"
import { CommitMutation } from "../Utils/commitMutation"
import { updateUserAddress } from "../Mutations/UpdateUserAddress"
import { createUserAddress } from "v2/Apps/Order/Mutations/CreateUserAddress"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"
import { AddressModalFields } from "v2/Components/Address/AddressModalFields"

interface Props {
  show: boolean
  closeModal: () => void
  address?: SavedAddressType
  commitMutation: CommitMutation
  onSuccess: (address) => void
  onError: (message: string) => void
  modalDetails?: {
    addressModalTitle: string
    addressModalAction: AddressModalAction
  }
  me?: SavedAddresses_me
}

export type AddressModalAction = "editUserAddress" | "createUserAddress"

export const AddressModal: React.FC<Props> = ({
  show,
  closeModal,
  address,
  commitMutation,
  onSuccess,
  onError,
  modalDetails,
  me,
}) => {
  const title = modalDetails?.addressModalTitle
  const createMutation = modalDetails.addressModalAction === "createUserAddress"

  const validator = (values: any) => {
    const validationResult = validateAddress(values)
    const phoneValidation = validatePhoneNumber(values.phoneNumber)
    const errors = Object.assign({}, validationResult.errors, {
      phoneNumber: phoneValidation.error,
    })
    const errorsTrimmed = removeEmptyKeys(errors)
    return errorsTrimmed
  }

  return (
    <Modal title={title} show={show} onClose={closeModal}>
      <Formik
        initialValues={createMutation ? { country: "US" } : address}
        validate={validator}
        onSubmit={values => {
          createMutation
            ? createUserAddress(
                commitMutation,
                values,
                onSuccess,
                onError,
                me,
                closeModal
              )
            : updateUserAddress(
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
            <Text color="black60" mb={1}>
              All fields marked * are mandatory
            </Text>
            <AddressModalFields />
            <Spacer mb={1} />
            <Input
              title="Phone number *"
              name="phoneNumber"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.phoneNumber && formik.errors.phoneNumber}
              value={formik.values?.phoneNumber}
            />
            <Button
              type="submit"
              size="large"
              loading={formik.isSubmitting}
              disabled={Object.keys(formik.errors).length > 0}
              width="100%"
              mt={2}
            >
              Save changes
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  )
}
