import { Button, Flex, Spacer, Text } from "@artsy/palette"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import {
  AddressFormFields,
  addressFormFieldsValidator,
} from "Components/Address/AddressFormFields"
import { Formik, type FormikHelpers, type FormikValues } from "formik"
import type * as React from "react"
import * as yup from "yup"

interface Order2DeliveryFormProps {
  order: any
}

const validationSchema = yup
  .object()
  .shape(addressFormFieldsValidator({ withPhoneNumber: true }))

export const Order2DeliveryForm: React.FC<Order2DeliveryFormProps> = () => {
  const { setCheckoutMode } = useCheckoutContext()

  // Placeholders
  const initialValues = {
    address: {
      name: "",
      country: "",
      postalCode: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      region: "",
    },
    phoneNumber: "",
    phoneNumberCountryCode: "",
  }
  const onSubmit = (
    values: FormikValues,
    formikHelpers: FormikHelpers<FormikValues>,
  ) => {}
  return (
    <>
      <Text fontWeight="bold" color="mono100" variant="sm-display">
        Delivery address
      </Text>
      <Spacer y={2} />
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {formikContext => (
          <Flex flexDirection={"column"} mb={2}>
            <AddressFormFields withPhoneNumber />
            <Spacer y={4} />
            <Button
              type="submit"
              onClick={() => {
                setCheckoutMode("standard")
                formikContext.handleSubmit()
              }}
            >
              See Shipping Methods
            </Button>
          </Flex>
        )}
      </Formik>
    </>
  )
}
