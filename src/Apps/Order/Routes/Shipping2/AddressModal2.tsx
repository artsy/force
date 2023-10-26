import { useState } from "react"
import * as React from "react"
import * as Yup from "yup"
import {
  Button,
  Clickable,
  Checkbox,
  Flex,
  Input,
  ModalDialog,
  Spacer,
  Text,
  Banner,
} from "@artsy/palette"

import { Formik, FormikHelpers, FormikProps } from "formik"
import { updateUserAddress } from "Apps/Order/Mutations/UpdateUserAddress"
import { createUserAddress } from "Apps/Order/Mutations/CreateUserAddress"
import { AddressModalFields } from "Components/Address/AddressModalFields"
import { useSystemContext } from "System/SystemContext"
import { updateUserDefaultAddress } from "Apps/Order/Mutations/UpdateUserDefaultAddress"
import { UpdateUserAddressMutation$data } from "__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"

import { ADDRESS_VALIDATION_SHAPE } from "Apps/Order/Routes/Shipping2/FulfillmentDetails"
import { SavedAddresses2_me$data } from "__generated__/SavedAddresses2_me.graphql"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/ShippingContext"
import { SavedAddressType } from "Apps/Order/Utils/shippingUtils"
import { addressWithFallbackValues } from "Apps/Order/Routes/Shipping2/shippingUtils"
import { deleteUserAddress } from "Apps/Order/Mutations/DeleteUserAddress"

type CreateOrUpdateAddressPayload =
  | NonNullable<
      CreateUserAddressMutation$data["createUserAddress"]
    >["userAddressOrErrors"]
  | NonNullable<
      UpdateUserAddressMutation$data["updateUserAddress"]
    >["userAddressOrErrors"]

export enum AddressModalActionType {
  EDIT_USER_ADDRESS = "editUserAddress",
  CREATE_USER_ADDRESS = "createUserAddress",
}

export type AddressModalAction =
  | {
      type: AddressModalActionType.CREATE_USER_ADDRESS
    }
  | {
      type: AddressModalActionType.EDIT_USER_ADDRESS
      address: SavedAddressType
    }

export interface Props {
  closeModal: () => void
  onSuccess: (addressID: string) => Promise<void>
  onDeleteAddress: () => Promise<void>
  onError: (message: string) => void
  modalAction: AddressModalAction | null
  me: SavedAddresses2_me$data
}

const MODAL_TITLE_MAP: Record<AddressModalActionType, string> = {
  createUserAddress: "Add address",
  editUserAddress: "Edit address",
}

const SERVER_ERROR_MAP: Record<string, Record<string, string>> = {
  "Validation failed for phone: not a valid phone number": {
    field: "phoneNumber",
    message: "Please enter a valid phone number",
  },
  "Validation failed: Phone not a valid phone number": {
    field: "phoneNumber",
    message: "Please enter a valid phone number",
  },
}

export const GENERIC_FAIL_MESSAGE =
  "Sorry there has been an issue saving your address. Please try again."

const validationSchema = Yup.object().shape(ADDRESS_VALIDATION_SHAPE)

export const AddressModal: React.FC<Props> = ({
  closeModal,
  onSuccess,
  onDeleteAddress,
  onError,
  modalAction,
  me,
}) => {
  const { relayEnvironment } = useSystemContext()

  const [createUpdateError, setCreateUpdateError] = useState<string | null>(
    null
  )
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const shippingContext = useShippingContext()
  if (!relayEnvironment) return null
  if (!modalAction) return null

  const title = (modalAction && MODAL_TITLE_MAP[modalAction.type]) || ""
  const initialAddress =
    modalAction.type === "editUserAddress"
      ? modalAction.address
      : {
          country: shippingContext.savedOrderData.shipsFrom,
          internalID: undefined,
          isDefault: false,
        }

  const handleModalClose = () => {
    closeModal()
    setCreateUpdateError(null)
  }

  const handleDeleteAddress = async (addressID: string) => {
    return deleteUserAddress(
      relayEnvironment!,
      addressID,
      onDeleteAddress,
      onError
    )
  }

  return (
    <>
      <ModalDialog title={title} onClose={handleModalClose} width={900}>
        <Formik
          validateOnMount
          initialValues={initialAddress}
          validationSchema={validationSchema}
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

            const handleSuccess = (
              savedAddress:
                | CreateUserAddressMutation$data
                | UpdateUserAddressMutation$data
            ) => {
              const genericPayloadType = savedAddress as any
              const payload: CreateOrUpdateAddressPayload = (
                genericPayloadType?.createUserAddress ||
                genericPayloadType.updateUserAddress
              )?.userAddressOrErrors
              const savedAddressID = payload.internalID!
              // update default address only if isDefault changed or new
              // address marked ad default
              if (
                savedAddressID &&
                values?.isDefault &&
                values?.isDefault !==
                  (initialAddress as SavedAddressType)?.isDefault
              ) {
                updateUserDefaultAddress(
                  relayEnvironment,
                  payload.internalID,
                  () => {
                    onSuccess(savedAddressID)
                  },
                  onError
                )
              } else {
                onSuccess(savedAddressID)
              }

              setCreateUpdateError(null)
            }
            const addressInput = addressWithFallbackValues(values)
            if (modalAction.type === "createUserAddress") {
              createUserAddress(
                relayEnvironment,
                addressInput,
                handleSuccess,
                handleError,
                me,
                closeModal
              )
            } else {
              if (modalAction.type === "editUserAddress") {
                updateUserAddress(
                  relayEnvironment,
                  initialAddress.internalID!,
                  addressInput,
                  closeModal,
                  handleSuccess,
                  handleError
                )
              }
            }
          }}
        >
          {(formik: FormikProps<SavedAddressType>) => (
            <form onSubmit={formik.handleSubmit}>
              {createUpdateError && (
                <Banner my={2} data-test="credit-card-error" variant="error">
                  {createUpdateError}
                </Banner>
              )}
              <AddressModalFields />
              <Spacer y={2} />
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
                data-test="phoneInputWithoutValidationFlag"
              />

              <Spacer y={2} />
              {!initialAddress?.isDefault && (
                <Checkbox
                  onSelect={selected => {
                    formik.setFieldValue("isDefault", selected)
                  }}
                  selected={formik.values?.isDefault}
                  data-test="setAsDefault"
                >
                  Set as default
                </Checkbox>
              )}
              {modalAction.type === "editUserAddress" && (
                <Flex mt={2} flexDirection="column" alignItems="center">
                  <Clickable
                    data-test="deleteButton"
                    onClick={() => setShowDialog(true)}
                  >
                    <Text variant="xs" color="red100">
                      Delete address
                    </Text>
                  </Clickable>
                </Flex>
              )}
              <Button
                data-test="saveButton"
                type="submit"
                variant="primaryBlack"
                loading={formik.isSubmitting || undefined}
                disabled={Object.keys(formik.errors).length > 0}
                width="100%"
                mt={2}
              >
                Save
              </Button>
            </form>
          )}
        </Formik>
      </ModalDialog>

      {showDialog && (
        <ModalDialog
          data-test="deleteAddressDialog"
          title="Delete address?"
          onClose={() => setShowDialog(false)}
          width="350px"
        >
          <Text variant="xs">
            This will remove this address from your saved addressess.
          </Text>
          <Spacer y={2} />
          <Flex justifyContent="flex-end">
            <Button
              variant="secondaryNeutral"
              size="small"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </Button>
            <Spacer x={1} />
            <Button
              size="small"
              onClick={() => {
                setShowDialog(false)
                closeModal()
                if (initialAddress.internalID) {
                  handleDeleteAddress(initialAddress.internalID)
                }
              }}
            >
              Delete
            </Button>
          </Flex>
        </ModalDialog>
      )}
    </>
  )
}
