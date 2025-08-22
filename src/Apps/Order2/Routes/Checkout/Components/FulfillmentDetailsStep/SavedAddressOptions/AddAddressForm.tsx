import { Button, Spacer, Text } from "@artsy/palette"
import { deliveryAddressValidationSchema } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2CreateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2CreateUserAddressMutation"
import {
  AddressFormFields,
  type FormikContextWithAddress,
} from "Components/Address/AddressFormFields"
import createLogger from "Utils/logger"
import { Formik } from "formik"

const logger = createLogger("AddAddressForm")

interface AddAddressFormProps {
  initialValues: FormikContextWithAddress
  onSaveAddress: (
    values: FormikContextWithAddress,
    addressID: string,
  ) => Promise<void>
}
export const AddAddressForm = ({
  onSaveAddress,

  initialValues,
}: AddAddressFormProps) => {
  const createUserAddress = useOrder2CreateUserAddressMutation()
  const { setUserAddressMode } = useCheckoutContext()

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={deliveryAddressValidationSchema}
      onSubmit={async (values: FormikContextWithAddress) => {
        try {
          const result = await createUserAddress.submitMutation({
            variables: {
              input: {
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

          if (result.createUserAddress?.userAddressOrErrors?.internalID) {
            await onSaveAddress(
              values,
              result.createUserAddress?.userAddressOrErrors.internalID,
            )
            return
          }

          if (result.createUserAddress?.userAddressOrErrors?.errors) {
            throw new Error(
              `Failed to create address: ${JSON.stringify(
                result.createUserAddress.userAddressOrErrors.errors,
              )}`,
            )
          }
          throw new Error("Failed to create address: Unknown error")
        } catch (error) {
          logger.error("Error creating address:", error)
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
            Add address
          </Text>{" "}
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
        </>
      )}
    </Formik>
  )
}
