import { useState, FC } from "react"
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
  GridColumns,
  Column,
} from "@artsy/palette"

import { Form, Formik, FormikHelpers, useFormikContext } from "formik"

import {
  ADDRESS_VALIDATION_SHAPE,
  addressWithFallbackValues,
} from "Apps/Order/Routes/Shipping2/Utils/shippingUtils"
import createLogger from "Utils/logger"
import { useShippingContext } from "Apps/Order/Routes/Shipping2/Hooks/useShippingContext"
import { SavedAddressType } from "Apps/Order/Utils/shippingUtils"
import {
  SavedAddressResult,
  UserAddressAction,
  useUserAddressUpdates,
} from "Apps/Order/Routes/Shipping2/Hooks/useUserAddressUpdates"
import { CountrySelect } from "Components/CountrySelect"

const logger = createLogger("AddressModal2.tsx")

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
  addressModalAction: AddressModalAction | null
}

interface FormValues {
  attributes: {
    name: string
    phoneNumber: string
    isDefault?: boolean
    addressLine1: string
    addressLine2?: string
    city: string
    region?: string
    postalCode?: string
    country: string
  }
  setAsDefault: boolean
}

export const AddressModal: FC<AddressModalProps> = ({
  closeModal,
  addressModalAction,
  onSuccess,
}) => {
  const logger = createLogger("AddressModal2.tsx")
  const shippingContext = useShippingContext()

  const { executeUserAddressAction } = useUserAddressUpdates()

  let initialValues: FormValues

  if (!addressModalAction) {
    initialValues = {
      attributes: {
        isDefault: false,
        ...addressWithFallbackValues({}),
      },
      setAsDefault: false,
    }
  } else {
    const incomingAddress =
      addressModalAction.type === "edit" ? addressModalAction.address : null

    initialValues = {
      attributes: {
        isDefault: incomingAddress?.isDefault ?? false,

        ...addressWithFallbackValues(
          addressModalAction.type === "edit" ? addressModalAction.address : {}
        ),
      },
      setAsDefault: false,
    }
  }

  const handleSubmit = async (
    values: FormValues,
    helpers: FormikHelpers<FormValues>
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
            ...values.attributes,
            internalID: addressModalAction.address.internalID,
          },
          setAsDefault: values.setAsDefault,
        }
        break
      case "create":
        userAddressAction = {
          type: "create",
          address: {
            ...values.attributes,
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

  return (
    <>
      <Formik<FormValues>
        validateOnMount
        validationSchema={validationSchema}
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
        {
          <AddressModalForm
            addressModalAction={addressModalAction}
            onClose={closeModal}
            onDeleteAddress={handleDeleteAddress}
          />
        }
      </Formik>
    </>
  )
}

const AddressModalForm: FC<{
  onClose: () => void
  addressModalAction: AddressModalProps["addressModalAction"]
  onDeleteAddress: (address: SavedAddressType) => Promise<SavedAddressResult>
}> = ({ addressModalAction, onClose, onDeleteAddress }) => {
  const shippingContext = useShippingContext()
  const formikContext = useFormikContext<FormValues>()
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

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

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
  } = formikContext

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

          <GridColumns mt={[1, 2]}>
            <Column span={12}>
              <Input
                title="Full name"
                placeholder="Full name"
                id="name"
                name="attributes.name"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.attributes?.name && errors.attributes?.name}
                value={values.attributes.name || undefined}
              />
            </Column>
            <Column span={12}>
              <CountrySelect
                title="Country"
                data-testid="AddressModalForm_country"
                selected={values.attributes.country}
                onSelect={countryCode => {
                  setFieldValue("attributes.country", countryCode)
                }}
                error={
                  touched.attributes?.country && errors.attributes?.country
                    ? errors.attributes.country
                    : ""
                }
              />
            </Column>
            <Column span={12}>
              <Input
                title="Address Line 1"
                placeholder="Street address"
                name="attributes.addressLine1"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.attributes?.addressLine1 &&
                  errors.attributes?.addressLine1
                }
                value={values.attributes.addressLine1}
              />
            </Column>
            <Column span={12}>
              <Input
                title="Address Line 2"
                placeholder="Apt, floor, suite, etc."
                name="attributes.addressLine2"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.attributes?.addressLine2 &&
                  errors.attributes?.addressLine2
                }
                value={values.attributes.addressLine2 || ""}
              />
            </Column>
            <Column span={12}>
              <Input
                title="City"
                placeholder="City"
                name="attributes.city"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.attributes?.city && errors.attributes?.city}
                value={values.attributes.city}
              />
            </Column>
            <Column span={6}>
              <Input
                title="State, province, or region"
                placeholder="State, province, or region"
                name="attributes.region"
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.attributes?.region && errors.attributes?.region}
                value={values.attributes?.region || ""}
              />
            </Column>
            <Column span={6}>
              <Input
                placeholder={
                  values.attributes.country === "US"
                    ? "ZIP code"
                    : "ZIP/Postal code"
                }
                title={
                  values.attributes.country === "US"
                    ? "ZIP code"
                    : "Postal code"
                }
                name="attributes.postalCode"
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  touched.attributes?.postalCode &&
                  errors.attributes?.postalCode
                }
                value={values.attributes.postalCode || ""}
              />
            </Column>
          </GridColumns>

          <Spacer y={2} />

          <Input
            title="Phone number"
            description="Required for shipping logistics"
            placeholder="Add phone number including country code"
            name="attributes.phoneNumber"
            type="tel"
            onChange={formikContext.handleChange}
            onBlur={formikContext.handleBlur}
            error={
              formikContext.touched.attributes?.phoneNumber &&
              formikContext.errors.attributes?.phoneNumber
            }
            value={formikContext.values.attributes.phoneNumber}
            data-testid="phoneInputWithoutValidationFlag"
          />

          <Spacer y={2} />

          {!formikContext.initialValues.attributes.isDefault && (
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
                onClick={() => setShowDeleteDialog(true)}
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

            <Button size="small" onClick={handleDeleteAddress}>
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
    field: "attributes.phoneNumber",
    message: "Please enter a valid phone number",
  },
  "Validation failed: Phone not a valid phone number": {
    field: "attributes.phoneNumber",
    message: "Please enter a valid phone number",
  },
}

const validationSchema = Yup.object().shape({
  attributes: Yup.object().shape(ADDRESS_VALIDATION_SHAPE),
})

export const GENERIC_FAIL_MESSAGE =
  "Sorry, there has been an issue saving your address. Please try again."

const handleGravityErrors = (
  errors: ReadonlyArray<{ message: string }>,
  helpers: {
    setFieldError: (field: string, message: string) => void
    setStatus: (message: string) => void
  }
) => {
  if (!errors?.length) return

  const userMessage: Record<string, string> | null =
    SERVER_ERROR_MAP[errors[0].message]

  if (userMessage) {
    helpers.setFieldError(
      `attributes.${userMessage.field}`,
      userMessage.message
    )
  } else {
    helpers.setStatus(GENERIC_FAIL_MESSAGE)
  }

  logger.error(errors.map(error => error.message).join(", "))
}
