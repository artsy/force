import {
  Banner,
  Button,
  Clickable,
  Flex,
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
  const [deleteError, setDeleteError] = useState<string | null>(null)

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
        const errorMessages = addressOrErrors.errors
          .map(error => error.message)
          .join(", ")
        setDeleteError(errorMessages)
        logger.error("Error deleting address:", errorMessages)
        return
      }

      if (onDeleteAddress) {
        await onDeleteAddress(address.internalID)
      }
      setShowDeleteDialog(false)
      setUserAddressMode(null)
    } catch (error) {
      logger.error("Error deleting address:", error)
      setDeleteError(
        "Sorry, there has been an issue deleting your address. Please try again.",
      )
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
              width="350px"
            >
              {deleteError && (
                <>
                  <Banner variant="error" mb={2}>
                    {deleteError}
                  </Banner>
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
