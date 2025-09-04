import {
  Button,
  Clickable,
  Flex,
  Message,
  ModalDialog,
  Spacer,
  Text,
} from "@artsy/palette"
import {
  type ProcessedUserAddress,
  deliveryAddressValidationSchema,
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2DeleteUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2DeleteUserAddressMutation"
import { useOrder2UpdateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateUserAddressMutation"
import {
  AddressFormFields,
  type FormikContextWithAddress,
} from "Components/Address/AddressFormFields"
import createLogger from "Utils/logger"
import { Formik } from "formik"
import { useState } from "react"

const logger = createLogger("UpdateAddressForm")

const getDeleteErrorMessage = (
  error: { code?: string; message: string } | string,
): { title: string; message: string } => {
  const errorCode = typeof error === "object" ? error?.code : undefined
  const errorMessage = typeof error === "object" ? error.message : error

  if (
    errorCode === "address_not_found" ||
    errorCode === "not_found" ||
    errorMessage.includes("Cannot return null for non-nullable field")
  ) {
    return {
      title: "Address already deleted",
      message: "Please refresh the page.",
    }
  }

  return { title: "An error occurred", message: "Please try again later." }
}

interface UpdateAddressFormProps {
  address: ProcessedUserAddress
  onSaveAddress: (
    values: FormikContextWithAddress,
    addressID: string,
  ) => Promise<void>
  onDeleteAddress?: (addressID: string) => Promise<void>
}
export const UpdateAddressForm = ({
  onSaveAddress,
  onDeleteAddress,
  address,
}: UpdateAddressFormProps) => {
  const updateUserAddress = useOrder2UpdateUserAddressMutation()
  const deleteUserAddress = useOrder2DeleteUserAddressMutation()
  const { setUserAddressMode } = useCheckoutContext()
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<{
    title: string
    message: string
  } | null>(null)

  const handleDeleteAddress = async () => {
    setIsDeleting(true)
    setDeleteError(null)
    try {
      const result = await deleteUserAddress.submitMutation({
        variables: {
          input: {
            userAddressID: address.internalID,
          },
        },
      })

      const addressOrErrors = result.deleteUserAddress?.userAddressOrErrors

      if (addressOrErrors?.__typename === "Errors") {
        const firstError = addressOrErrors.errors?.[0]
        const errorInfo = getDeleteErrorMessage(
          firstError
            ? { code: firstError.code, message: firstError.message }
            : "",
        )
        setDeleteError(errorInfo)
        logger.error("Error deleting address:", addressOrErrors.errors)
        return
      }

      if (onDeleteAddress) {
        await onDeleteAddress(address.internalID)
      }
      setShowDeleteDialog(false)
      setUserAddressMode(null)
    } catch (error) {
      logger.error("Error deleting address:", error)
      const errorMessage =
        error?.[0]?.message || error?.message || String(error)
      setDeleteError(getDeleteErrorMessage(errorMessage))
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Formik
      initialValues={address}
      validationSchema={deliveryAddressValidationSchema}
      onSubmit={async (values: FormikContextWithAddress) => {
        try {
          const result = await updateUserAddress.submitMutation({
            variables: {
              input: {
                userAddressID: address.internalID,
                attributes: {
                  name: values.address.name,
                  addressLine1: values.address.addressLine1,
                  addressLine2: values.address.addressLine2,
                  city: values.address.city,
                  region: values.address.region,
                  postalCode: values.address.postalCode,
                  country: values.address.country,
                  phoneNumber: values.phoneNumber,
                  phoneNumberCountryCode: values.phoneNumberCountryCode,
                },
              },
            },
          })

          if (result.updateUserAddress?.userAddressOrErrors?.internalID) {
            await onSaveAddress(
              values,
              result.updateUserAddress?.userAddressOrErrors.internalID,
            )
            return
          }

          if (result.updateUserAddress?.userAddressOrErrors?.errors) {
            throw new Error(
              `Failed to update address: ${JSON.stringify(
                result.updateUserAddress.userAddressOrErrors.errors,
              )}`,
            )
          }
          throw new Error("Failed to update address: Unknown error")
        } catch (error) {
          logger.error("Error updating address:", error)
        }
      }}
    >
      {({ isSubmitting, handleSubmit }) => (
        <>
          <Text
            fontWeight={["bold", "normal"]}
            color="mono100"
            variant={["sm-display", "md"]}
          >
            Edit address
          </Text>
          <Spacer y={2} />
          <AddressFormFields withPhoneNumber />
          <Spacer y={4} />
          <Button
            width="100%"
            type="submit"
            loading={isSubmitting}
            onClick={() => handleSubmit()}
          >
            Save Address
          </Button>
          <Spacer y={1} />
          <Button
            width="100%"
            variant="secondaryBlack"
            onClick={() => setUserAddressMode(null)}
          >
            Cancel
          </Button>
          <Spacer y={2} />
          <Flex justifyContent="center">
            <Clickable onClick={() => setShowDeleteDialog(true)}>
              <Text variant="xs" color="red100">
                Delete address
              </Text>
            </Clickable>
          </Flex>
          {showDeleteDialog && (
            <ModalDialog
              title="Delete address?"
              onClose={() => {
                setShowDeleteDialog(false)
                setDeleteError(null)
              }}
              width="450px"
            >
              {deleteError && (
                <>
                  <Message variant="error" title={deleteError.title}>
                    {deleteError.message}
                  </Message>
                  <Spacer y={2} />
                </>
              )}
              <Text variant="xs">
                This will remove this address from your saved addresses.
              </Text>
              <Spacer y={2} />
              <Flex justifyContent="flex-end">
                <Button
                  variant="secondaryNeutral"
                  size="small"
                  onClick={() => {
                    setShowDeleteDialog(false)
                    setDeleteError(null)
                  }}
                >
                  Cancel
                </Button>
                <Spacer x={1} />
                <Button
                  size="small"
                  loading={isDeleting}
                  onClick={handleDeleteAddress}
                >
                  Delete
                </Button>
              </Flex>
            </ModalDialog>
          )}
        </>
      )}
    </Formik>
  )
}
