import { useState } from "react"
import * as Yup from "yup"
import {
  Button,
  Clickable,
  Checkbox,
  Flex,
  ModalDialog,
  Spacer,
  Text,
  Banner,
  ModalWidth,
} from "@artsy/palette"
import { Formik, FormikHelpers, Form } from "formik"
import { useSystemContext } from "System/SystemContext"
import { SavedAddresses_me$data } from "__generated__/SavedAddresses_me.graphql"
import { UpdateUserAddressMutation$data } from "__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutation$data } from "__generated__/CreateUserAddressMutation.graphql"
import {
  SavedAddressType,
  convertShippingAddressToMutationInput,
} from "Apps/Order/Utils/shippingUtils"
import { updateUserAddress } from "Apps/Order/Mutations/UpdateUserAddress"
import { createUserAddress } from "Apps/Order/Mutations/CreateUserAddress"
import { updateUserDefaultAddress } from "Apps/Order/Mutations/UpdateUserDefaultAddress"
import { AddressModalFields } from "Components/Address/AddressModalFields"
import {
  PhoneNumberInput,
  validatePhoneNumber,
} from "Components/PhoneNumberInput"

export const INITIAL_ADDRESS = {
  name: "",
  country: "US",
  addressLine1: "",
  addressLine2: "",
  city: "",
  phoneNumber: "",
  phoneNumberCountryCode: "us",
  postalCode: "",
  region: "",
  isDefault: false,
}

export const GENERIC_FAIL_MESSAGE =
  "Sorry there has been an issue saving your address. Please try again."

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

export type AddressModalAction = "editUserAddress" | "createUserAddress"

type FormikFormT = SavedAddressType & {
  phoneNumberCountryCode: string
}

const VALIDATION_SCHEMA = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  country: Yup.string().required("Country is required"),
  addressLine1: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  region: Yup.string().required("Region is required"),
  postalCode: Yup.string().required("Postal Code is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .test({
      name: "phone-number-is-valid",
      message: "Please enter a valid phone number",
      test: (national, context) => {
        return validatePhoneNumber({
          national: `${national}`,
          regionCode: `${context.parent.phoneNumberCountryCode}`,
        })
      },
    }),
  phoneNumberCountryCode: Yup.string().required(
    "Phone Number Country Code is required"
  ),
  isDefault: Yup.boolean().optional(),
})

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
  const isCreateMutation =
    modalDetails?.addressModalAction === "createUserAddress"

  const [createUpdateError, setCreateUpdateError] = useState<string | null>(
    null
  )
  const [showDialog, setShowDialog] = useState<boolean>(false)

  const { relayEnvironment } = useSystemContext()
  if (!relayEnvironment) return null

  const handleModalClose = () => {
    closeModal()
    setCreateUpdateError(null)
  }

  const getInitialFormValues = () => {
    if (!address) {
      return INITIAL_ADDRESS
    }

    return {
      ...address,
      phoneNumberCountryCode: address?.country?.toLowerCase() || "us",
    }
  }

  return (
    <>
      {show && (
        <ModalDialog
          title={modalDetails?.addressModalTitle}
          onClose={handleModalClose}
          width={ModalWidth.Wide}
        >
          <Formik
            validateOnMount
            validationSchema={VALIDATION_SCHEMA}
            initialValues={getInitialFormValues()}
            onSubmit={(
              values: FormikFormT,
              actions: FormikHelpers<FormikFormT>
            ) => {
              const handleError = message => {
                setCreateUpdateError(GENERIC_FAIL_MESSAGE)
                actions?.setSubmitting(false)
                onError(message)
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
                  onSuccess(savedAddress)
                }

                setCreateUpdateError(null)
              }

              const addressInput = convertShippingAddressToMutationInput(values)

              if (isCreateMutation) {
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
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              setFieldValue,
              isValid,
              isSubmitting,
              submitForm,
            }) => {
              return (
                <Form>
                  {createUpdateError && (
                    <Banner
                      my={2}
                      data-test="credit-card-error"
                      variant="error"
                    >
                      {createUpdateError}
                    </Banner>
                  )}
                  <AddressModalFields />
                  <Spacer y={2} />
                  <PhoneNumberInput
                    inputProps={{
                      name: "phoneNumber",
                      onBlur: handleBlur,
                      onChange: handleChange,
                      placeholder: "(000) 000 0000",
                      value: values?.phoneNumber || "",
                    }}
                    selectProps={{
                      name: "phoneNumberCountryCode",
                      onBlur: handleBlur,
                      selected: values?.phoneNumberCountryCode,
                      onSelect: value => {
                        setFieldValue("phoneNumberCountryCode", value)
                      },
                    }}
                    required
                    error={touched.phoneNumber && errors.phoneNumber}
                  />

                  <Spacer y={2} />
                  {(!address?.isDefault || isCreateMutation) && (
                    <Checkbox
                      onSelect={selected => {
                        setFieldValue("isDefault", selected)
                      }}
                      selected={values?.isDefault}
                      data-test="setAsDefault"
                    >
                      Set as default
                    </Checkbox>
                  )}
                  {!isCreateMutation && (
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
                    onClick={submitForm}
                    type="submit"
                    variant="primaryBlack"
                    loading={isSubmitting}
                    disabled={!isValid}
                    width="100%"
                    mt={2}
                  >
                    Save
                  </Button>
                </Form>
              )
            }}
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
