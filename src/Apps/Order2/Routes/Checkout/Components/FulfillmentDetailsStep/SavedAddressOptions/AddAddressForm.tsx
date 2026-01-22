import { Button, Spacer, Text } from "@artsy/palette"
import { deliveryAddressValidationSchema } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToFieldErrorOnSubmit } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToFieldErrorOnSubmit"
import { useOrder2CreateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2CreateUserAddressMutation"
import { useOrder2UpdateUserDefaultAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateUserDefaultAddressMutation"
import {
  AddressFormFields,
  type FormikContextWithAddress,
} from "Components/Address/AddressFormFields"
import createLogger from "Utils/logger"
import { Form, Formik } from "formik"

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
  const updateUserDefaultAddress = useOrder2UpdateUserDefaultAddressMutation()
  const { setUserAddressMode } = useCheckoutContext()

  const handleSetAsDefault = async (addressID: string) => {
    await updateUserDefaultAddress.submitMutation({
      variables: {
        input: {
          userAddressID: addressID,
        },
      },
    })
  }

  const handleSubmit = async (values: FormikContextWithAddress) => {
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

      const newAddressID =
        result.createUserAddress?.userAddressOrErrors?.internalID

      if (newAddressID) {
        if (values.setAsDefault) {
          await handleSetAsDefault(newAddressID)
        }

        await onSaveAddress(values, newAddressID)
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
  }

  return (
    <Formik<FormikContextWithAddress>
      initialValues={initialValues}
      validationSchema={deliveryAddressValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => {
        return (
          <Form noValidate>
            <Text
              fontWeight={["bold", "bold", "normal"]}
              color="mono100"
              variant={["sm-display", "sm-display", "md"]}
            >
              Add address
            </Text>

            <Spacer y={2} />

            <AddAddressFormFields />

            <Spacer y={4} />

            <Button width="100%" type="submit" loading={isSubmitting}>
              Save Address
            </Button>

            <Spacer y={1} />

            <Button
              width="100%"
              variant="secondaryBlack"
              type="button"
              onClick={() => setUserAddressMode(null)}
            >
              Cancel
            </Button>
          </Form>
        )
      }}
    </Formik>
  )
}

const AddAddressFormFields: React.FC = () => {
  const formRef = useScrollToFieldErrorOnSubmit()

  return (
    <div ref={formRef}>
      <AddressFormFields withPhoneNumber withSetAsDefault />
    </div>
  )
}
