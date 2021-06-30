import React, { useState } from "react"
import {
  Button,
  Clickable,
  Checkbox,
  Dialog,
  Flex,
  Input,
  Modal,
  ModalWidth,
  Spacer,
  Text,
} from "@artsy/palette"
import { SavedAddressType } from "../Utils/shippingUtils"
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
import { useSystemContext } from "v2/System/SystemContext"
import { updateUserDefaultAddress } from "../Mutations/UpdateUserDefaultAddress"
export interface Props {
  show: boolean
  closeModal: () => void
  address?: SavedAddressType
  onSuccess: (address) => void
  onDeleteAddress: (addressID: string) => void
  onError: (message: string) => void
  modalDetails?: {
    addressModalTitle: string
    addressModalAction: AddressModalAction
  }
  me?: SavedAddresses_me
}

const SERVER_ERROR_MAP: Record<string, Record<string, string>> = {
  "Validation failed for phone: not a valid phone number": {
    field: "phoneNumber",
    message: "Please enter a valid phone number",
  },
}

export const GENERIC_FAIL_MESSAGE =
  "Sorry there has been an issue saving your address. Please try again."

export type AddressModalAction = "editUserAddress" | "createUserAddress"

export const AddressModal: React.FC<Props> = ({
  show,
  closeModal,
  address,
  onSuccess,
  onDeleteAddress,
  onError,
  modalDetails,
  me,
}) => {
  const title = modalDetails?.addressModalTitle
  // @ts-expect-error STRICT_NULL_CHECK
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
  // @ts-expect-error STRICT_NULL_CHECK
  const [createUpdateError, setCreateUpdateError] = useState<string>(null)
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const [isDefault, setIsDefault] = useState<boolean>(false)
  return (
    <>
      <Modal
        title={title}
        show={show}
        onClose={closeModal}
        modalWidth={ModalWidth.Wide}
      >
        <Formik
          initialValues={createMutation ? { country: "US" } : address}
          validate={validator}
          onSubmit={(
            values: SavedAddressType,
            actions: FormikHelpers<SavedAddressType>
          ) => {
            const handleError = message => {
              const userMessage: Record<string, string> | null =
                SERVER_ERROR_MAP[message]
              if (userMessage) {
                actions.setFieldError(userMessage.field, userMessage.message)
              } else {
                setCreateUpdateError(GENERIC_FAIL_MESSAGE)
              }
              actions?.setSubmitting(false)
              onError && onError(message)
            }

            const handleSuccess = savedAddress => {
              if (isDefault) {
                updateUserDefaultAddress(
                  // @ts-expect-error STRICT_NULL_CHECK
                  relayEnvironment,
                  savedAddress?.createUserAddress?.userAddressOrErrors
                    ?.internalID || address.internalID,
                  onSuccess,
                  onError
                )
              } else {
                onSuccess && onSuccess(savedAddress)
              }
              // @ts-expect-error STRICT_NULL_CHECK
              setCreateUpdateError(null)
            }

            createMutation
              ? createUserAddress(
                  // @ts-expect-error STRICT_NULL_CHECK
                  relayEnvironment,
                  values,
                  handleSuccess,
                  handleError,
                  me,
                  closeModal
                )
              : updateUserAddress(
                  // @ts-expect-error STRICT_NULL_CHECK
                  relayEnvironment,
                  address?.internalID,
                  values,
                  closeModal,
                  handleSuccess,
                  handleError
                )
          }}
        >
          {(formik: FormikProps<SavedAddressType>) => (
            <form onSubmit={formik.handleSubmit}>
              <Text data-test="credit-card-error" color="red" my={2}>
                {createUpdateError}
              </Text>
              <AddressModalFields />
              <Spacer mb={2} />
              <Input
                title="Phone number"
                description="Required for shipping logistics"
                placeholder="Add phone number"
                name="phoneNumber"
                type="tel"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phoneNumber && formik.errors.phoneNumber}
                value={formik.values?.phoneNumber || ""}
              />
              <Spacer mb={2} />
              {(!address?.isDefault || createMutation) && (
                <Checkbox
                  onSelect={selected => {
                    formik.setFieldValue("isDefault", selected)
                    setIsDefault(selected)
                  }}
                  selected={formik.values?.isDefault}
                  data-test="setAsDefault"
                >
                  Set as default
                </Checkbox>
              )}
              {!createMutation && (
                <Flex mt={2} flexDirection="column" alignItems="center">
                  <Clickable onClick={() => setShowDialog(true)}>
                    <Text
                      data-test="deleteButton"
                      variant="text"
                      color="red100"
                    >
                      Delete address
                    </Text>
                  </Clickable>
                </Flex>
              )}
              <Button
                data-test="saveButton"
                type="submit"
                size="large"
                loading={formik.isSubmitting}
                disabled={Object.keys(formik.errors).length > 0}
                width="100%"
                mt={2}
              >
                Save
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
      <Dialog
        title="Delete address?"
        detail="This will remove this address from your saved addresses."
        show={showDialog}
        primaryCta={{
          action: () => {
            setShowDialog(false)
            closeModal()

            if (address?.internalID) {
              onDeleteAddress(address.internalID)
            }
          },
          text: "Delete",
        }}
        secondaryCta={{
          action: () => {
            setShowDialog(false)
          },
          text: "Cancel",
        }}
        onClose={() => setShowDialog(false)}
      />
    </>
  )
}
