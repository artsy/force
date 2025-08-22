import { Button, Spacer, Text } from "@artsy/palette"
import {
  type ProcessedUserAddress,
  deliveryAddressValidationSchema,
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2UpdateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateUserAddressMutation"
import {
  AddressFormFields,
  type FormikContextWithAddress,
} from "Components/Address/AddressFormFields"
import createLogger from "Utils/logger"
import { Formik } from "formik"

const logger = createLogger("UpdateAddressForm")

interface UpdateAddressFormProps {
  address: ProcessedUserAddress
  onSaveAddress: (
    values: FormikContextWithAddress,
    addressID: string,
  ) => Promise<void>
}
export const UpdateAddressForm = ({
  onSaveAddress,

  address,
}: UpdateAddressFormProps) => {
  const updateUserAddress = useOrder2UpdateUserAddressMutation()
  const { setUserAddressMode } = useCheckoutContext()

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
        </>
      )}
    </Formik>
  )
}
