import { useShippingContext } from "Apps/Order/Routes/Shipping/Hooks/useShippingContext"
import {
  type SavedAddressResult,
  type UserAddressAction,
  useUserAddressUpdates,
} from "Apps/Order/Routes/Shipping/Hooks/useUserAddressUpdates"
import type { SavedAddressType } from "Apps/Order/Routes/Shipping/Utils/shippingUtils"
import { addressWithFallbackValues } from "Apps/Order/Routes/Shipping/Utils/shippingUtils"
import {
  AddressFormFields,
  addressFormFieldsValidator,
  type FormikContextWithAddress,
} from "Components/Address/AddressFormFields"
import createLogger from "Utils/logger"
import {
  Banner,
  Button,
  Checkbox,
  Clickable,
  Flex,
  ModalDialog,
  Spacer,
  Text,
} from "@artsy/palette"
import { Form, Formik, type FormikHelpers, useFormikContext } from "formik"
import { type FC, useEffect, useState } from "react"
import * as Yup from "yup"

const logger = createLogger("AddressModal.tsx")

/**
 * Modal type to be rendered. the `address` property is used
 * when the modal is in edit mode as the starting values.
 */
export type AddressModalAction =
  | { type: "create" }
  | { type: "edit"; address: SavedAddressType }

export interface AddressModalProps {
  closeModal: () => void
  onSuccess: (address: SavedAddressType) => void
  addressModalAction: AddressModalAction
}

interface FormValues extends FormikContextWithAddress {
  phoneNumber: string
  address: {
    name: string
    isDefault?: boolean
    addressLine1: string
    addressLine2: string
    city: string
    region: string
    postalCode: string
    country: string
  }
  setAsDefault: boolean
}

export const AddressModal: FC<React.PropsWithChildren<AddressModalProps>> = ({
  closeModal,
  addressModalAction,
  onSuccess,
}) => {
  const logger = createLogger("AddressModal.tsx")
  const shippingContext = useShippingContext()

  const { executeUserAddressAction } = useUserAddressUpdates()

  const incomingAddress =
    addressModalAction.type === "edit" ? addressModalAction.address : null

  const initialValues: FormValues = {
    phoneNumber: incomingAddress?.phoneNumber ?? "",
    address: {
      isDefault: incomingAddress?.isDefault ?? false,

      ...addressWithFallbackValues(
        addressModalAction.type === "edit"
          ? addressModalAction.address
          : {
              country: shippingContext.orderData.shipsFrom,
            },
      ),
      name: incomingAddress?.name || shippingContext.meData.name || "",
    },
    setAsDefault: false,
  }

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>,
  ) => {
    if (!addressModalAction) {
      return
    }

    let userAddressAction: UserAddressAction
    switch (addressModalAction.type) {
      case "edit":
        userAddressAction = {
          type: "edit",
          address: {
            ...values.address,
            phoneNumber: values.phoneNumber,
            internalID: addressModalAction.address.internalID,
          },
          setAsDefault: values.setAsDefault,
        }
        break
      case "create":
        userAddressAction = {
          type: "create",
          address: {
            ...values.address,
            phoneNumber: values.phoneNumber,
          },
          setAsDefault: values.setAsDefault,
        }
        break
      default:
        throw new Error("Invalid address modal action")
    }

    try {
      shippingContext.actions.setIsPerformingOperation(true)
      const result = await executeUserAddressAction(userAddressAction)

      if (result.errors) {
        handleGravityErrors(result.errors, helpers)
        closeModal()
        return
      }
      onSuccess(result.data)
      closeModal()
    } catch (error) {
      logger.error(error)

      helpers.setStatus(GENERIC_FAIL_MESSAGE)
    } finally {
      shippingContext.actions.setIsPerformingOperation(false)
    }
  }

  const handleDeleteAddress = async (address: SavedAddressType) => {
    return await executeUserAddressAction({
      type: "delete",
      address: address,
    })
  }

  useEffect(() => {
    console.time("AddressModal")
  }, [])
  return (
    <Formik<FormValues>
      validateOnMount
      validationSchema={validationSchema}
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <AddressModalForm
        addressModalAction={addressModalAction}
        onClose={closeModal}
        onDeleteAddress={handleDeleteAddress}
      />
    </Formik>
  )
}

const AddressModalForm: FC<
  React.PropsWithChildren<{
    onClose: () => void
    addressModalAction: AddressModalProps["addressModalAction"]
    onDeleteAddress: (address: SavedAddressType) => Promise<SavedAddressResult>
  }>
> = ({ addressModalAction, onClose, onDeleteAddress }) => {
  const shippingContext = useShippingContext()
  const formikContext = useFormikContext<FormValues>()
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

  const { errors, setFieldTouched } = formikContext

  const attributeErrorFieldsForEdit =
    addressModalAction.type === "edit" ? Object.keys(errors.address || {}) : []

  // Touch fields that have errors on edit
  useEffect(() => {
    if (attributeErrorFieldsForEdit.length > 0) {
      attributeErrorFieldsForEdit.forEach(field => {
        setFieldTouched(`attributes.${field}`, true)
      })
    }
  }, [attributeErrorFieldsForEdit.length])

  if (!addressModalAction) {
    return null
  }

  const handleDeleteAddress = async () => {
    if (addressModalAction?.type === "edit") {
      try {
        shippingContext.actions.setIsPerformingOperation(true)
        await onDeleteAddress(addressModalAction.address)
      } catch (error) {
        logger.error(error)
      } finally {
        shippingContext.actions.setIsPerformingOperation(false)
        setShowDeleteDialog(false)
        onClose()
      }
    }
  }

  const handleModalClose = () => {
    formikContext.resetForm()
    onClose()
  }

  const title =
    addressModalAction.type === "create" ? "Add address" : "Edit address"

  return (
    <>
      <ModalDialog title={title} onClose={handleModalClose} width={900}>
        <Form data-testid="AddressModal">
          {formikContext.status && (
            <Banner my={2} data-testid="form-banner-error" variant="error">
              {formikContext.status}
            </Banner>
          )}

          <AddressFormFields<FormValues> withLegacyPhoneInput />

          <Spacer y={2} />

          {!formikContext.initialValues.address.isDefault && (
            <Checkbox
              onSelect={selected => {
                formikContext.setFieldValue("setAsDefault", selected)
              }}
              selected={formikContext.values.setAsDefault}
              data-testid="setAsDefault"
            >
              Set as default
            </Checkbox>
          )}

          {addressModalAction.type === "edit" && (
            <Flex mt={2} flexDirection="column" alignItems="center">
              <Clickable
                data-testid="deleteButton"
                onClick={() => {
                  setShowDeleteDialog(true)
                }}
              >
                <Text variant="xs" color="red100">
                  Delete address
                </Text>
              </Clickable>
            </Flex>
          )}

          <Button
            data-testid="saveButton"
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
          data-testid="deleteAddressDialog"
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

            <Button
              size="small"
              loading={shippingContext.state.isPerformingOperation || undefined}
              onClick={handleDeleteAddress}
            >
              Delete
            </Button>
          </Flex>
        </ModalDialog>
      )}
    </>
  )
}

// two different error messages for the same error?
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

const validationSchema = Yup.object().shape(
  addressFormFieldsValidator({ withLegacyPhoneInput: true }),
)

export const GENERIC_FAIL_MESSAGE =
  "Sorry, there has been an issue saving your address. Please try again."

const handleGravityErrors = (
  errors: ReadonlyArray<{ message: string }>,
  helpers: {
    setFieldError: (field: string, message: string) => void
    setStatus: (message: string) => void
  },
) => {
  if (!errors?.length) return

  const userMessage: Record<string, string> | null =
    SERVER_ERROR_MAP[errors[0].message]

  if (userMessage) {
    helpers.setFieldError(userMessage.field, userMessage.message)
  } else {
    helpers.setStatus(GENERIC_FAIL_MESSAGE)
  }

  logger.error(errors.map(error => error.message).join(", "))
}
