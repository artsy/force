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
import { AddressModalFields } from "Components/Address/AddressModalFields"

import {
  ADDRESS_VALIDATION_SHAPE,
  SavedAddressType,
} from "Apps/Order/Utils/shippingUtils"
import { addressWithFallbackValues } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import { useCreateSavedAddressMutation$data } from "__generated__/useCreateSavedAddressMutation.graphql"
import { useUpdateSavedAddressMutation$data } from "__generated__/useUpdateSavedAddressMutation.graphql"
import createLogger from "Utils/logger"
import { useCreateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useCreateSavedAddress"
import { useDeleteSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useDeleteSavedAddress"
import { useUpdateSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useUpdateSavedAddress"
import { useUpdateUserDefaultAddress } from "Apps/Order/Routes/Shipping2/Mutations/useUpdateUserDefaultAddress"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"

export interface AddressModalProps {
  closeModal: () => void
  onSuccess: (addressID: string) => void
  modalAction: AddressModalAction | null
}

export const AddressModal: React.FC<AddressModalProps> = ({
  closeModal,
  onSuccess,
  modalAction,
}) => {
  const logger = createLogger("AddressModal2.tsx")

  const [createUpdateError, setCreateUpdateError] = useState<string | null>(
    null
  )
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const shippingContext = useShippingContext()

  const createSavedAddress = useCreateSavedAddress().submitMutation
  const deleteSavedAddress = useDeleteSavedAddress().submitMutation
  const updateSavedAddress = useUpdateSavedAddress().submitMutation
  const updateUserDefaultAddress = useUpdateUserDefaultAddress().submitMutation

  if (!modalAction) {
    return null
  }

  const title = (modalAction && MODAL_TITLE_MAP[modalAction.type]) || ""

  const initialAddress =
    modalAction.type === "editUserAddress"
      ? modalAction.address
      : {
          // TODO: Instead of using ShippingContext, initialValues could be a shippingUtils function
          country: shippingContext.orderData.shipsFrom,
          internalID: undefined,
          isDefault: false,
        }

  const handleModalClose = () => {
    closeModal()
    setCreateUpdateError(null)
  }

  const handleErrors = (
    errors: ReadonlyArray<{ message: string }>,
    formikHelpers
  ) => {
    if (!errors?.length) return

    const userMessage: Record<string, string> | null =
      SERVER_ERROR_MAP[errors[0].message]

    if (userMessage) {
      formikHelpers.setFieldError(userMessage.field, userMessage.message)
    } else {
      setCreateUpdateError(GENERIC_FAIL_MESSAGE)
    }

    formikHelpers?.setSubmitting(false)
    logger.error(errors.map(error => error.message).join(", "))
  }

  const handleDeleteAddress = async (addressID: string) => {
    try {
      return deleteSavedAddress({
        variables: {
          input: { userAddressID: addressID },
        },
      })
    } catch (error) {
      logger.error(error)
    }
  }

  const handleMutationPayload = (
    payload:
      | useUpdateSavedAddressMutation$data["updateUserAddress"]
      | useCreateSavedAddressMutation$data["createUserAddress"]
  ):
    | { data: SavedAddressType; errors: null }
    | { data: null; errors: ReadonlyArray<{ message: string }> } => {
    const addressOrErrors = payload?.userAddressOrErrors

    if (addressOrErrors?.__typename === "Errors") {
      return {
        errors: addressOrErrors.errors,
        data: null,
      }
    }
    return {
      errors: null,
      data: addressOrErrors as SavedAddressType,
    }
  }

  const handleSubmit = async (
    values: SavedAddressType,
    helpers: FormikHelpers<SavedAddressType>
  ) => {
    const addressInput = addressWithFallbackValues(values)

    let operation: () => Promise<ReturnType<typeof handleMutationPayload>>

    try {
      shippingContext.actions.setIsPerformingOperation(true)

      if (modalAction.type === "createUserAddress") {
        operation = async () => {
          const result = await createSavedAddress({
            variables: {
              input: { attributes: addressInput },
            },
          })

          return handleMutationPayload(result.createUserAddress)
        }
      } else {
        operation = async () => {
          const result = await updateSavedAddress({
            variables: {
              input: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                userAddressID: initialAddress.internalID!,
                attributes: addressInput,
              },
            },
          })

          return handleMutationPayload(result.updateUserAddress)
        }
      }

      const { data, errors } = await operation()

      if (errors) {
        handleErrors(errors, helpers)
        return
      }

      const savedAddressID = data?.internalID

      if (
        !!savedAddressID &&
        values?.isDefault &&
        values?.isDefault !== initialAddress?.isDefault
      ) {
        const updateAddressResult = await updateUserDefaultAddress({
          variables: {
            input: { userAddressID: savedAddressID },
          },
        })

        const updateAddressPayload =
          updateAddressResult.updateUserDefaultAddress?.userAddressOrErrors

        if (updateAddressPayload?.__typename === "Errors") {
          logger.error(
            updateAddressPayload.errors.map(error => error.message).join(", ")
          )

          return
        }
      }

      onSuccess(savedAddressID)
      setCreateUpdateError(null)
      closeModal()
    } catch (error) {
      handleErrors([error], helpers)
    } finally {
      shippingContext.actions.setIsPerformingOperation(false)
    }
  }

  if (createUpdateError) {
    logger.log({ createUpdateError })
  }

  return (
    <>
      <ModalDialog title={title} onClose={handleModalClose} width={900}>
        <Formik
          validateOnMount
          initialValues={initialAddress}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik: FormikProps<SavedAddressType>) => (
            <form onSubmit={formik.handleSubmit}>
              {createUpdateError && (
                <Banner my={2} data-testid="form-banner-error" variant="error">
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
  "Sorry, there has been an issue saving your address. Please try again."

const validationSchema = Yup.object().shape(ADDRESS_VALIDATION_SHAPE)
