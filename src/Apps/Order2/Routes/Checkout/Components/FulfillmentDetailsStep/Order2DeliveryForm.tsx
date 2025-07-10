import { ContextModule } from "@artsy/cohesion"
import { Button, Flex, Spacer, Text } from "@artsy/palette"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"

import { useOrder2UpdateShippingAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateShippingAddressMutation"
import { getShippableCountries } from "Apps/Order2/Utils/getShippableCountries"
import {
  AddressFormFields,
  type FormikContextWithAddress,
  addressFormFieldsValidator,
} from "Components/Address/AddressFormFields"
import type { Order2DeliveryForm_order$key } from "__generated__/Order2DeliveryForm_order.graphql"
import { Formik } from "formik"
import type * as React from "react"
import { useCallback } from "react"
import { graphql, useFragment } from "react-relay"
import * as yup from "yup"

interface Order2DeliveryFormProps {
  order: Order2DeliveryForm_order$key
}

const validationSchema = yup
  .object()
  .shape(addressFormFieldsValidator({ withPhoneNumber: true }))

export const Order2DeliveryForm: React.FC<Order2DeliveryFormProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)

  const shippableCountries = getShippableCountries(
    orderData.availableShippingCountries,
  )

  const checkoutContext = useCheckoutContext()

  const { setCheckoutMode, checkoutTracking, setFulfillmentDetailsComplete } =
    checkoutContext
  const updateShippingAddressMutation = useOrder2UpdateShippingAddressMutation()

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
  const onSubmit = useCallback(
    async (values: FormikContextWithAddress) => {
      try {
        checkoutTracking.clickedOrderProgression(
          ContextModule.ordersFulfillment,
        )
        console.log("**", values)
        const updateShippingAddressResult =
          await updateShippingAddressMutation.submitMutation({
            variables: {
              input: {
                id: orderData.internalID,
                buyerPhoneNumber: values.phoneNumber,
                buyerPhoneNumberCountryCode: values.phoneNumberCountryCode,
                shippingAddressLine1: values.address.addressLine1,
                shippingAddressLine2: values.address.addressLine2,
                shippingCity: values.address.city,
                shippingRegion: values.address.region,
                shippingPostalCode: values.address.postalCode,
                shippingCountry: values.address.country,
                shippingName: values.address.name,
              },
            },
          })

        validateAndExtractOrderResponse(
          updateShippingAddressResult.updateOrderShippingAddress?.orderOrError,
        ).order

        setFulfillmentDetailsComplete({}) // TODO: Clean up signature
      } catch (error) {
        console.error("Error submitting delivery form:", error)
      }
    },
    [
      checkoutTracking,
      orderData.internalID,
      updateShippingAddressMutation,
      setFulfillmentDetailsComplete,
    ],
  )
  return (
    <>
      <Text
        fontWeight={["bold", "normal"]}
        color="mono100"
        variant={["sm-display", "md"]}
      >
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
            <AddressFormFields
              withPhoneNumber
              shippableCountries={shippableCountries}
            />
            <Spacer y={4} />
            <Button
              type="submit"
              loading={formikContext.isSubmitting}
              onClick={() => {
                setCheckoutMode("standard")
                formikContext.handleSubmit()
              }}
            >
              {/* TODO: This would not apply for flat shipping */}
              See Shipping Methods
            </Button>
          </Flex>
        )}
      </Formik>
    </>
  )
}

const FRAGMENT = graphql`
  fragment Order2DeliveryForm_order on Order {
    internalID
    availableShippingCountries
  }
`
