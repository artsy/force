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
} from "@artsy/palette"

import { Form, useFormikContext } from "formik"
import { AddressModalFields } from "Components/Address/AddressModalFields"

import { FulfillmentValues } from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import createLogger from "Utils/logger"
import { useDeleteSavedAddress } from "Apps/Order/Routes/Shipping2/Mutations/useDeleteSavedAddress"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"

export interface AddressModalProps {
  closeModal: () => void
  onSuccess: (addressID: string) => void
}

export const AddressModal: React.FC<AddressModalProps> = ({ closeModal }) => {
  const logger = createLogger("AddressModal2.tsx")
  const shippingContext = useShippingContext()
  const formikContext = useFormikContext<FulfillmentValues>()

  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

  const deleteSavedAddress = useDeleteSavedAddress().submitMutation

  const addressModalAction = shippingContext.state.addressModalAction

  if (!addressModalAction) {
    return null
  }

  const savedAddress =
    (addressModalAction.type === "edit" &&
      shippingContext.meData.addressList.find(
        a => a.internalID === addressModalAction.addressID
      )) ||
    undefined

  const handleDeleteAddress = async () => {
    if (addressModalAction?.type === "edit") {
      try {
        shippingContext.actions.setIsPerformingOperation(true)
        setShowDeleteDialog(false)
        closeModal()
        await deleteSavedAddress({
          variables: { input: { userAddressID: addressModalAction.addressID } },
        })
      } catch (error) {
        logger.error(error)
      } finally {
        shippingContext.actions.setIsPerformingOperation(false)
      }
    }
  }

  const title =
    addressModalAction.type === "create" ? "Add address" : "Edit address"

  const handleModalClose = () => {
    closeModal()
    formikContext.setStatus({
      ...formikContext.status,
      gravityAddressError: null,
    })
  }

  return (
    <>
      <ModalDialog title={title} onClose={handleModalClose} width={900}>
        <Form>
          {formikContext.status.gravityAddressError && (
            <Banner my={2} data-testid="form-banner-error" variant="error">
              {formikContext.status.gravityAddressError}
            </Banner>
          )}

          <AddressModalFields />

          <Spacer y={2} />

          <Input
            title="Phone number"
            description="Required for shipping logistics"
            placeholder="Add phone number"
            name="attributes.phoneNumber"
            type="tel"
            onChange={formikContext.handleChange}
            onBlur={formikContext.handleBlur}
            error={
              formikContext.touched?.attributes?.phoneNumber &&
              formikContext.errors?.attributes?.phoneNumber
            }
            value={formikContext.values.attributes.phoneNumber || ""}
            data-test="phoneInputWithoutValidationFlag"
          />

          <Spacer y={2} />

          {!savedAddress?.isDefault && (
            <Checkbox
              onSelect={selected => {
                formikContext.setFieldValue(
                  "meta.setAddressAsDefault",
                  selected
                )
              }}
              selected={formikContext.values.meta.setAddressAsDefault}
              data-test="setAsDefault"
            >
              Set as default
            </Checkbox>
          )}

          {addressModalAction.type === "edit" && (
            <Flex mt={2} flexDirection="column" alignItems="center">
              <Clickable
                data-test="deleteButton"
                onClick={() => setShowDeleteDialog(true)}
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
            loading={formikContext.isSubmitting || undefined}
            disabled={Object.keys(formikContext.errors).length > 0}
            width="100%"
            mt={2}
          >
            Save
          </Button>
        </Form>
      </ModalDialog>

      {showDeleteDialog && (
        <ModalDialog
          data-test="deleteAddressDialog"
          title="Delete address?"
          onClose={() => setShowDeleteDialog(false)}
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
              onClick={() => setShowDeleteDialog(false)}
            >
              Cancel
            </Button>

            <Spacer x={1} />

            <Button size="small" onClick={handleDeleteAddress}>
              Delete
            </Button>
          </Flex>
        </ModalDialog>
      )}
    </>
  )
}
