import { useState } from "react"
import * as React from "react"
import {
  Button,
  Clickable,
  Checkbox,
  Dialog,
  Flex,
  Modal,
  ModalWidth,
  Spacer,
  Text,
  Banner,
} from "@artsy/palette"
import { convertShippingAddressToMutationInput } from "../Utils/shippingUtils"
import { FormikHelpers, FormikProps, Form } from "formik"

import { AddressForm } from "v2/Components/AddressForm"
import { updateUserAddress } from "../Mutations/UpdateUserAddress"
import { createUserAddress } from "v2/Apps/Order/Mutations/CreateUserAddress"
import { SavedAddresses_me } from "v2/__generated__/SavedAddresses_me.graphql"
import { useSystemContext } from "v2/System/SystemContext"
import { updateUserDefaultAddress } from "../Mutations/UpdateUserDefaultAddress"
import { UpdateUserAddressMutationResponse } from "v2/__generated__/UpdateUserAddressMutation.graphql"
import { CreateUserAddressMutationResponse } from "v2/__generated__/CreateUserAddressMutation.graphql"
import {
  BillingInfo,
  BillingInfoFormValues,
  BillingInfoFormContext,
} from "v2/Components/BillingInfoFormContext"

export interface ModalDetails {
  addressModalTitle: string
  addressModalAction: AddressModalAction
}

export interface Props {
  show: boolean
  closeModal: () => void
  address?: BillingInfo
  onSuccess: (
    address?: UpdateUserAddressMutationResponse &
      CreateUserAddressMutationResponse
  ) => void
  onDeleteAddress: (addressID: string) => void
  onError: (message: string) => void
  modalDetails?: ModalDetails
  me: SavedAddresses_me
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

type BillingInfoPicked = Pick<BillingInfoFormValues, "address">

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
  const { relayEnvironment } = useSystemContext()
  const [createUpdateError, setCreateUpdateError] = useState<string | null>(
    null
  )
  const [showDialog, setShowDialog] = useState<boolean>(false)

  if (!relayEnvironment) return null

  const title = modalDetails?.addressModalTitle
  const createMutation =
    modalDetails?.addressModalAction === "createUserAddress"

  const handleModalClose = () => {
    closeModal()
    setCreateUpdateError(null)
  }

  const onSubmit = (
    values: BillingInfoPicked,
    actions: FormikHelpers<BillingInfoPicked>
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
        values.address.isDefault &&
        values.address.isDefault !== address?.isDefault
      ) {
        updateUserDefaultAddress(
          relayEnvironment,
          savedAddress?.createUserAddress?.userAddressOrErrors?.internalID ||
            address?.internalID,
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
  }

  return (
    <>
      <Modal
        title={title}
        show={show}
        onClose={handleModalClose}
        modalWidth={ModalWidth.Wide}
      >
        <BillingInfoFormContext
          onSubmit={onSubmit}
          initialValues={{ address: { ...address } }} // Spread to avoid immutability issues on changes
          formKeys={["addressWithPhone"]}
        >
          {(formik: FormikProps<BillingInfoPicked>) => (
            <Form>
              {createUpdateError && (
                <Banner my={2} data-test="credit-card-error" variant="error">
                  {createUpdateError}
                </Banner>
              )}
              <AddressForm showPhoneNumberInput={true} />
              <Spacer mb={2} />
              {(!address?.isDefault || createMutation) && (
                <Checkbox
                  onSelect={isSelected =>
                    formik.setFieldValue("address.isDefault", isSelected)
                  }
                  selected={formik.values.address.isDefault}
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
                disabled={!formik.isValid}
                width="100%"
                mt={2}
              >
                Save
              </Button>
            </Form>
          )}
        </BillingInfoFormContext>
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
