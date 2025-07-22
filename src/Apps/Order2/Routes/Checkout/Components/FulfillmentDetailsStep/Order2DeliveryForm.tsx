import { ContextModule } from "@artsy/cohesion"
import { Button, Flex, Spacer, Text } from "@artsy/palette"
import {
  CheckoutError,
  validateAndExtractOrderResponse,
} from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import {
  CheckoutErrorBanner,
  type CheckoutErrorBannerProps,
  MailtoOrderSupport,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { handleError } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/handleError"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"

import { useOrder2UpdateShippingAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UpdateShippingAddressMutation"
import { getShippableCountries } from "Apps/Order2/Utils/getShippableCountries"
import {
  AddressFormFields,
  type FormikContextWithAddress,
  addressFormFieldsValidator,
} from "Components/Address/AddressFormFields"
import type { Order2DeliveryForm_order$key } from "__generated__/Order2DeliveryForm_order.graphql"
import { Formik, type FormikHelpers } from "formik"
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

  const fulfillmentDetails = orderData.fulfillmentDetails || {
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    postalCode: "",
    country: "",
    name: "",
    phoneNumber: {
      countryCode: "",
      originalNumber: "",
    },
  }
  const initialValues: FormikContextWithAddress = {
    address: {
      name: fulfillmentDetails.name || "",
      country: fulfillmentDetails.country || "",
      postalCode: fulfillmentDetails.postalCode || "",
      addressLine1: fulfillmentDetails.addressLine1 || "",
      addressLine2: fulfillmentDetails.addressLine2 || "",
      city: fulfillmentDetails.city || "",
      region: fulfillmentDetails.region || "",
    },
    phoneNumber: fulfillmentDetails.phoneNumber?.originalNumber || "",
    phoneNumberCountryCode: fulfillmentDetails.phoneNumber?.countryCode || "",
  }

  const onSubmit = useCallback(
    async (
      values: FormikContextWithAddress,
      formikHelpers: FormikHelpers<FormikContextWithAddress>,
    ) => {
      try {
        checkoutTracking.clickedOrderProgression(
          ContextModule.ordersFulfillment,
        )
        const input = {
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
        }

        const updateShippingAddressResult =
          await updateShippingAddressMutation.submitMutation({
            variables: {
              input,
            },
          })

        validateAndExtractOrderResponse(
          updateShippingAddressResult.updateOrderShippingAddress?.orderOrError,
        ).order

        formikHelpers.setStatus({ errorBanner: null })
        setFulfillmentDetailsComplete({}) // TODO: Clean up signature
      } catch (error) {
        handleError(error, formikHelpers, {
          title: "An error occurred",
          message: (
            <>
              Something went wrong while updating your delivery address. Please
              try again or contact <MailtoOrderSupport />.
            </>
          ),
        })
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
            {formikContext.status?.errorBanner && (
              <>
                <CheckoutErrorBanner error={formikContext.status.errorBanner} />
                <Spacer y={2} />
              </>
            )}
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
    fulfillmentDetails {
      addressLine1
      addressLine2
      city
      region
      postalCode
      country
      name
      phoneNumber {
        countryCode
        originalNumber
      }
    }
  }
`
