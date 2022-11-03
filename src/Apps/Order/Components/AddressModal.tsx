import { useState } from "react"
import * as React from "react"
import {
  Button,
  Clickable,
  Checkbox,
  Flex,
  ModalDialog,
  ModalWidth,
  Spacer,
  Text,
  Banner,
} from "@artsy/palette"
import {
  FormikAddressType,
  SavedAddressType,
  convertShippingAddressToMutationInput,
} from "Apps/Order/Utils/shippingUtils"
import { Formik, FormikHelpers, FormikProps } from "formik"
import {
  removeEmptyKeys,
  validateAddress,
} from "Apps/Order/Utils/formValidators"
import { updateUserAddress } from "Apps/Order/Mutations/UpdateUserAddress"
import { createUserAddress } from "Apps/Order/Mutations/CreateUserAddress"
import { SavedAddresses_me$data } from "__generated__/SavedAddresses_me.graphql"
import { AddressModalFields } from "Components/Address/AddressModalFields"
import { useSystemContext } from "System/SystemContext"
import { updateUserDefaultAddress } from "Apps/Order/Mutations/UpdateUserDefaultAddress"
import { UpdateUserAddressMutation$data } from "__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import { PhoneNumberInput } from "Components/PhoneNumberInput/PhoneNumberInput"
import { getPhoneNumberInformation } from "Apps/Consign/Routes/SubmissionFlow/Utils/phoneNumberUtils"

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
  const createMutation =
    modalDetails?.addressModalAction === "createUserAddress"

  const validator = (values: any) => {
    const validationResult = validateAddress(values)

    const errors = Object.assign({}, validationResult.errors, {
      phoneNumber:
        !values.phone.national || values.phone.isValid
          ? null
          : "Please provide a valid phone number",
    })
    const errorsTrimmed = removeEmptyKeys(errors)
    return errorsTrimmed
  }

  const { relayEnvironment } = useSystemContext()

  const [createUpdateError, setCreateUpdateError] = useState<string | null>(
    null
  )
  const [showDialog, setShowDialog] = useState<boolean>(false)

  if (!relayEnvironment) return null

  const handleModalClose = () => {
    closeModal()
    setCreateUpdateError(null)
  }

  const getInitialFormikValues = () => {
    const initialPhoneValues = {
      isValid: false,
      national: "",
      regionCode: "",
    }

    return createMutation
      ? { country: "US", phone: initialPhoneValues }
      : {
          ...address,
          phone: {
            isValid: address?.phoneNumber && address?.country,
            national: address?.phoneNumber || "",
            regionCode: address?.country.toLowerCase() || "",
          },
        }
  }

  return (
    <>
      {show && (
        <ModalDialog
          title={title}
          onClose={handleModalClose}
          width={ModalWidth.Wide}
        >
          <Formik
            validateOnMount
            initialValues={getInitialFormikValues()}
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
            {(formik: FormikProps<FormikAddressType>) => (
              <form onSubmit={formik.handleSubmit}>
                {createUpdateError && (
                  <Banner my={2} data-test="credit-card-error" variant="error">
                    {createUpdateError}
                  </Banner>
                )}
                <AddressModalFields />
                <Spacer mb={2} />

                <PhoneNumberInput
                  mt={4}
                  phoneNumber={formik.values?.phone}
                  onChange={async (region, number) => {
                    if (region && number && relayEnvironment) {
                      const phoneInformation = await getPhoneNumberInformation(
                        number,
                        relayEnvironment,
                        region
                      )
                      formik.setFieldValue("phone", phoneInformation)
                      return
                    }
                  }}
                  inputProps={{
                    maxLength: 256,
                    placeholder: "(000) 000 0000",
                  }}
                  error={formik.errors?.phoneNumber}
                />

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
                  disabled={
                    Object.keys(formik.errors).length > 0 ||
                    !formik.values.phone?.isValid
                  }
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
          title="Delete address?"
          onClose={() => setShowDialog(false)}
          width="350px"
        >
          <Text variant="xs">
            This will remove this address from your saved addressess.
          </Text>
          <Spacer mb={2} />
          <Flex justifyContent="flex-end">
            <Button
              variant="secondaryNeutral"
              size="small"
              onClick={() => setShowDialog(false)}
            >
              Cancel
            </Button>
            <Spacer mr={1} />
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
