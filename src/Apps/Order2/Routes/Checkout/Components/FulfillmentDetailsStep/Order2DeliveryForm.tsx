import { ContextModule } from "@artsy/cohesion"
import { Button, Flex, Spacer, Text } from "@artsy/palette"
import type { AddressFormValues } from "Apps/Invoice/Components/AddressFormWithCreditCard"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2SetFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetFulfillmentOptionMutation"
import { useOrder2UpdateShippingAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateShippingAddressMutation"
import {
  AddressFormFields,
  addressFormFieldsValidator,
} from "Components/Address/AddressFormFields"
import createLogger from "Utils/logger"
import type { Order2DeliveryForm_order$key } from "__generated__/Order2DeliveryForm_order.graphql"
import { Formik, type FormikHelpers, type FormikValues } from "formik"
import type * as React from "react"
import { useCallback } from "react"
import { graphql, useFragment } from "react-relay"
import * as yup from "yup"

interface Order2DeliveryFormProps {
  order: Order2DeliveryForm_order$key
}

const logger = createLogger("Order2DeliveryForm.tsx")
const validationSchema = yup
  .object()
  .shape(addressFormFieldsValidator({ withPhoneNumber: true }))

export const Order2DeliveryForm: React.FC<Order2DeliveryFormProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)

  const checkoutContext = useCheckoutContext()

  const { setCheckoutMode, checkoutTracking, setFulfillmentDetailsComplete } =
    checkoutContext
  const updateShippingAddressMutation = useOrder2UpdateShippingAddressMutation()
  const setFulfillmentOptionMutation = useOrder2SetFulfillmentOptionMutation()

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
    async (
      values: AddressFormValues,
      formikHelpers: FormikHelpers<FormikValues>,
    ) => {
      try {
        checkoutTracking.clickedOrderProgression(
          ContextModule.ordersFulfillment,
        )
        const updateShippingAddressResult =
          await updateShippingAddressMutation.submitMutation({
            variables: {
              input: {
                id: orderData.internalID,
                buyerPhoneNumber: values.address.phoneNumber,
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
        const updateShippingAddressOrder = validateAndExtractOrderResponse(
          updateShippingAddressResult.updateOrderShippingAddress?.orderOrError,
        ).order

        // By this point the order should have a proper shipping option
        // DOMESTIC_FLAT or INTERNATIONAL_FLAT: flat shipping, save it right away
        // SHIPPING_TBD: artsy shipping, user will be presented
        // with options on the next step
        const fulfillmentOptions = updateShippingAddressOrder.fulfillmentOptions

        const flatShippingOption =
          fulfillmentOptions.find(
            option =>
              option.type === "DOMESTIC_FLAT" ||
              option.type === "INTERNATIONAL_FLAT",
          ) ?? null

        const isFlatShipping = !!flatShippingOption

        if (!isFlatShipping) {
          const artsyShippingOption = fulfillmentOptions.find(
            option => option.type === "SHIPPING_TBD",
          )
          logger.warn("hopefully artsy shipping...", !!artsyShippingOption)
          return
        }

        const setFulfillmentOptionResult =
          await setFulfillmentOptionMutation.submitMutation({
            variables: {
              input: {
                id: orderData.internalID,
                fulfillmentOption: {
                  type: flatShippingOption.type as
                    | "DOMESTIC_FLAT"
                    | "INTERNATIONAL_FLAT",
                },
              },
            },
          })

        validateAndExtractOrderResponse(
          setFulfillmentOptionResult.setOrderFulfillmentOption?.orderOrError,
        ).order

        setFulfillmentDetailsComplete({ isFlatShipping })
      } catch (error) {
        console.error("Error submitting delivery form:", error)
      }
    },
    [
      checkoutTracking,
      orderData.internalID,
      updateShippingAddressMutation,
      setFulfillmentOptionMutation,
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
            <AddressFormFields withPhoneNumber />
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
  }
`
