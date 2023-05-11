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
  Select,
  Box,
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
import { useSystemContext } from "System/SystemContext"
import { updateUserDefaultAddress } from "Apps/Order/Mutations/UpdateUserDefaultAddress"
import { UpdateUserAddressMutation$data } from "__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import { countries } from "Utils/countries"
import { userHasLabFeature } from "Utils/user"

export interface Props {
  show: boolean
  title: string
  addressAction: string
  cancelForm: () => void
  address?: SavedAddressType
  onSuccess: (
    address?: UpdateUserAddressMutation$data & CreateUserAddressMutation$data
  ) => void
  onDeleteAddress: (addressID: string) => void
  onError: (message: string) => void
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
  title,
  addressAction,
  cancelForm,
  address,
  onSuccess,
  onDeleteAddress,
  onError,
  me,
}) => {
  const [_countryCode, setCountryCode] = useState("us")

  const createMutation = addressAction === "createUserAddress"
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
  const [showDialog, setShowDialog] = useState(false)

  if (!relayEnvironment) return null

  const handleCancelClick = () => {
    cancelForm()
    setCreateUpdateError(null)
  }

  return (
    <>
      {show && (
        <>
          <Text variant="lg-display">{title}</Text>
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
                  cancelForm
                )
              } else {
                if (address?.internalID) {
                  updateUserAddress(
                    relayEnvironment,
                    address.internalID,
                    addressInput,
                    cancelForm,
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
                  <Flex>
                    <Box style={{ maxWidth: "35%" }}>
                      <Select
                        title="Phone number"
                        description="Only used for shipping purposes"
                        options={countries}
                        onSelect={cc => {
                          setCountryCode(cc)
                        }}
                        style={{
                          letterSpacing: "1px",
                          borderRight: "none",
                        }}
                        data-test="countryDropdown"
                      />
                    </Box>
                    <Flex
                      flexDirection="column"
                      style={{
                        width: "100%",
                      }}
                    >
                      <Box height="100%"></Box>
                      <Input
                        title=""
                        description=""
                        placeholder={"Add phone number"}
                        name="phoneNumber"
                        type="tel"
                        onChange={formik.handleChange}
                        onBlur={e => {
                          formik.handleBlur
                        }}
                        error={
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                        }
                        value={formik.values?.phoneNumber ?? ""}
                        style={{ borderLeft: "none" }}
                      />
                    </Flex>
                  </Flex>
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
                <Flex justifyContent="space-between" mt={2}>
                  <Button
                    onClick={handleCancelClick}
                    variant="secondaryBlack"
                    width="50%"
                    mr={1}
                  >
                    Cancel
                  </Button>
                  <Button
                    data-test="saveButton"
                    type="submit"
                    variant="primaryBlack"
                    loading={formik.isSubmitting}
                    disabled={Object.keys(formik.errors).length > 0}
                    width="50%"
                  >
                    Save and Continue
                  </Button>
                </Flex>
              </form>
            )}
          </Formik>
        </>
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
                cancelForm()
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
