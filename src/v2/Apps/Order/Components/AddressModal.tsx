import React, { useState } from "react"
import { Button, Input, Modal, Spacer, Text } from "@artsy/palette"
import { SavedAddressType } from "../Utils/shippingAddressUtils"
import { Formik, FormikHelpers, FormikProps } from "formik"
import {
  removeEmptyKeys,
  validateAddress,
  validatePhoneNumber,
} from "../Utils/formValidators"
import { updateUserAddress } from "../Mutations/UpdateUserAddress"
import { createUserAddress } from "v2/Apps/Order/Mutations/CreateUserAddress"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"
import { AddressModalFields } from "v2/Components/Address/AddressModalFields"
import { useSystemContext } from "v2/Artsy/SystemContext"

export interface Props {
  show: boolean
  closeModal: () => void
  address?: SavedAddressType
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
  const { relayEnvironment } = useSystemContext()
  const [createUpdateError, setCreateUpdateError] = useState<string>(null)

  return (
    <Modal title={title} show={show} onClose={closeModal}>
      <Formik
        initialValues={createMutation ? { country: "US" } : address}
        validate={validator}
        onSubmit={(
          values: SavedAddressType,
          actions: FormikHelpers<SavedAddressType>
        ) => {
          createMutation
            ? createUserAddress(
                relayEnvironment,
                values,
                address => {
                  setCreateUpdateError(null)
                  onSuccess && onSuccess(address)
                },
                message => {
                  setCreateUpdateError(message)
                  actions?.setSubmitting(false)
                  onError && onError(message)
                },
                me,
                closeModal
              )
            : updateUserAddress(
                relayEnvironment,
                address.internalID,
                values,
                closeModal,
                address => {
                  setCreateUpdateError(null)
                  onSuccess && onSuccess(address)
                },
                message => {
                  setCreateUpdateError(message)
                  actions?.setSubmitting(false)
                  onError && onError(message)
                }
              )
        }}
      >
        {(formik: FormikProps<SavedAddressType>) => (
          <form onSubmit={formik.handleSubmit}>
            <Text data-test="credit-card-error" color="red" my={2}>
              {createUpdateError}
            </Text>
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
