import { useState } from "react"
import * as React from "react"
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
  PhoneInput,
} from "@artsy/palette"
import {
  SavedAddressType,
  convertShippingAddressToMutationInput,
} from "Apps/Order/Utils/shippingUtils"
import { Formik, FormikHelpers, FormikProps } from "formik"
import {
  removeEmptyKeys,
  validateAddress,
  validatePhoneNumber,
} from "Apps/Order/Utils/formValidators"
import { updateUserAddress } from "Apps/Order/Mutations/UpdateUserAddress"
import { createUserAddress } from "Apps/Order/Mutations/CreateUserAddress"
import { SavedAddresses_me$data } from "__generated__/SavedAddresses_me.graphql"
import { AddressModalFields } from "Components/Address/AddressModalFields"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { updateUserDefaultAddress } from "Apps/Order/Mutations/UpdateUserDefaultAddress"
import { UpdateUserAddressMutation$data } from "__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import { countries } from "Utils/countries"
import { userHasLabFeature } from "Utils/user"

export interface ModalDetails {
  addressModalTitle: string
  addressModalAction: AddressModalAction
}

export interface Props {
  show: boolean
  closeModal: () => void
  address?: SavedAddressType
  onSuccess: (
    address?: UpdateUserAddressMutation$data & CreateUserAddressMutation$data
  ) => void
  onDeleteAddress: (addressID: string) => void
  onError: (message: string) => void
  modalDetails?: ModalDetails
  me: SavedAddresses_me$data
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
  const [_countryCode, setCountryCode] = useState<string>("us")

  const title = modalDetails?.addressModalTitle
  const createMutation =
    modalDetails?.addressModalAction === "createUserAddress"
  const validator = (values: any) => {
    const validationResult = validateAddress(values)
    const phoneValidation = validatePhoneNumber(values.phoneNumber)
    const errors = Object.assign({}, validationResult.errors, {
      phoneNumber: phoneValidation.error,
    })
    const errorsTrimmed = removeEmptyKeys(errors)
    return errorsTrimmed
  }
  const { relayEnvironment, user } = useSystemContext()

  const [createUpdateError, setCreateUpdateError] = useState<string | null>(
    null
  )
  const [showDialog, setShowDialog] = useState<boolean>(false)

  if (!relayEnvironment) return null

  const handleModalClose = () => {
    closeModal()
    setCreateUpdateError(null)
  }

  return (
    <>
      {show && (
        <ModalDialog title={title} onClose={handleModalClose} width={900}>
          <Formik
            validateOnMount
            initialValues={createMutation ? { country: "US" } : { ...address }}
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
                // update default address only if isDefault changed or new
                // address marked ad default
                if (
                  values?.isDefault &&
                  values?.isDefault !== address?.isDefault
                ) {
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
                <AddressModalFields />
                <Spacer y={2} />
                {user &&
                  !userHasLabFeature(user, "Phone Number Validation") && (
                    <Input
                      title="Phone number"
                      description="Required for shipping logistics"
                      placeholder="Add phone number"
                      name="phoneNumber"
                      type="tel"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                      }
                      value={formik.values?.phoneNumber || ""}
                      data-test="phoneInputWithoutValidationFlag"
                    />
                  )}
                {user && userHasLabFeature(user, "Phone Number Validation") && (
                  <PhoneInput
                    options={countries}
                    onSelect={selected => {
                      setCountryCode(selected.value)
                    }}
                    description="Only used for shipping purposes"
                    placeholder="Add phone number"
                    name="phoneNumber"
                    type="tel"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.phoneNumber && formik.errors.phoneNumber
                    }
                    value={formik.values?.phoneNumber ?? ""}
                  />
                )}
                <Spacer y={2} />
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
        </ModalDialog>
      )}
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
                if (address?.internalID) {
                  onDeleteAddress(address.internalID)
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
