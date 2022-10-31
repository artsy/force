import { useState } from "react"
import * as React from "react"
import {
  Button,
  Clickable,
  Checkbox,
  Flex,
  Spacer,
  Text,
  Banner,
} from "@artsy/palette"
import {
  SavedAddressType,
  convertShippingAddressToMutationInput,
  FormikAddressType,
} from "Apps/Order/Utils/shippingUtils"
import { Formik, FormikHelpers, FormikProps } from "formik"
import {
  removeEmptyKeys,
  validateAddress,
} from "Apps/Order/Utils/formValidators"
import { updateUserAddress } from "Apps/Order/Mutations/UpdateUserAddress"
import { createUserAddress } from "Apps/Order/Mutations/CreateUserAddress"
import { SavedAddresses_me$data } from "__generated__/SavedAddresses_me.graphql"
import { AddressFormFields } from "Components/Address/AddressFormFields"
import { useSystemContext } from "System/SystemContext"
import { updateUserDefaultAddress } from "Apps/Order/Mutations/UpdateUserDefaultAddress"
import { UpdateUserAddressMutation$data } from "__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import { AddressModalAction } from "Apps/Order/Components/AddressModal"

export interface ModalDetails {
  addressModalTitle: string
  addressModalAction: AddressModalAction
}
export interface Address {
  name: string
  country: string
  postalCode: string
  addressLine1: string
  addressLine2: string
  city: string
  region: string
  phoneNumber: string
}

export const emptyAddress: Address = {
  name: "",
  country: "",
  postalCode: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  region: "",
  phoneNumber: "",
}

export interface AddressFormProps {
  closeModal: () => void
  address?: SavedAddressType
  onSuccess: (
    address?: UpdateUserAddressMutation$data & CreateUserAddressMutation$data
  ) => void
  onDeleteAddress: (addressID: string) => void
  onError: (message: string) => void
  modalDetails?: ModalDetails
  me: SavedAddresses_me$data
  setShowDialog: (showDialog: boolean) => void
}

const SERVER_ERROR_MAP: Record<string, Record<string, string>> = {
  "Validation failed for phone: not a valid phone number": {
    field: "phoneNumber",
    message: "Please enter a valid phone number",
  },
}

export const GENERIC_FAIL_MESSAGE =
  "Sorry there has been an issue saving your address. Please try again."

export const AddressForm: React.FC<AddressFormProps> = ({
  closeModal,
  address,
  onSuccess,
  onError,
  modalDetails,
  me,
  setShowDialog,
}) => {
  const createMutation =
    modalDetails?.addressModalAction === "createUserAddress"

  const validator = (values: any) => {
    const validationResult = validateAddress(values)
    const errors = Object.assign({}, validationResult.errors)
    const errorsTrimmed = removeEmptyKeys(errors)
    return errorsTrimmed
  }

  const { relayEnvironment } = useSystemContext()

  const [createUpdateError, setCreateUpdateError] = useState<string | null>(
    null
  )

  if (!relayEnvironment) return null

  return (
    <Formik
      validateOnMount
      initialValues={createMutation ? { country: "US" } : { ...address }}
      validate={validator}
      onSubmit={(
        values: FormikAddressType,
        actions: FormikHelpers<FormikAddressType>
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
          // update default address only if isDefault changed or new
          // address marked ad default
          if (values?.isDefault && values?.isDefault !== address?.isDefault) {
            updateUserDefaultAddress(
              relayEnvironment,
              savedAddress?.createUserAddress?.userAddressOrErrors
                ?.internalID || address?.internalID,
              () => {
                onSuccess(savedAddress)
              },
              onError
            )
          } else {
            onSuccess && onSuccess(savedAddress)
          }

          setCreateUpdateError(null)
        }
        const addressInput = convertShippingAddressToMutationInput(values)

        if (createMutation) {
          createUserAddress(
            relayEnvironment,
            addressInput,
            handleSuccess,
            handleError,
            me,
            closeModal
          )
        } else {
          if (address?.internalID) {
            updateUserAddress(
              relayEnvironment,
              address.internalID,
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
          <AddressFormFields />
          <Spacer mb={2} />

          {(!address?.isDefault || createMutation) && (
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
          {!createMutation && (
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
  )
}
