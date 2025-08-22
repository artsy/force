import { ContextModule } from "@artsy/cohesion"
import { Button, Flex, Spacer, Text } from "@artsy/palette"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import {
  CheckoutErrorBanner,
  MailtoOrderSupport,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { SavedAddressOptions } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/SavedAddressOptions/Order2SavedAddressOptions"
import { handleError } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/handleError"
import {
  deliveryAddressValidationSchema,
  findInitialSelectedAddress,
  processSavedAddresses,
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"

import { useOrder2SetOrderDeliveryAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderDeliveryAddressMutation"
import { useOrder2UnsetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UnsetOrderFulfillmentOptionMutation"
import { getShippableCountries as getShippableCountryData } from "Apps/Order2/Utils/addressUtils"
import {
  AddressFormFields,
  type FormikContextWithAddress,
} from "Components/Address/AddressFormFields"
import { sortCountriesForCountryInput } from "Components/Address/utils/sortCountriesForCountryInput"
import { useInitialLocationValues } from "Components/Address/utils/useInitialLocationValues"
import type { Order2DeliveryForm_me$key } from "__generated__/Order2DeliveryForm_me.graphql"
import type { Order2DeliveryForm_order$key } from "__generated__/Order2DeliveryForm_order.graphql"
import { Formik, type FormikHelpers } from "formik"
import { useCallback, useMemo } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2DeliveryFormProps {
  order: Order2DeliveryForm_order$key
  me: Order2DeliveryForm_me$key
}

export const Order2DeliveryForm: React.FC<Order2DeliveryFormProps> = ({
  order,
  me,
}) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const meData = useFragment(ME_FRAGMENT, me)

  const { addressConnection } = meData

  const shippableCountries = getShippableCountryData(
    orderData.availableShippingCountries,
  )

  // Get country options for locationBasedInitialValues
  const countryInputOptions = useMemo(() => {
    return sortCountriesForCountryInput(shippableCountries)
  }, [shippableCountries])

  // Get initial values based on user location if no existing fulfillment details
  const locationBasedInitialValues =
    useInitialLocationValues(countryInputOptions)

  const checkoutContext = useCheckoutContext()

  const {
    setCheckoutMode,
    checkoutTracking,
    setFulfillmentDetailsComplete,
    setUserAddressMode,
  } = checkoutContext

  const updateShippingAddressMutation =
    useOrder2SetOrderDeliveryAddressMutation()
  const unsetOrderFulfillmentOption =
    useOrder2UnsetOrderFulfillmentOptionMutation()

  const blankAddressValuesForUser: FormikContextWithAddress = useMemo(
    () => ({
      address: {
        name: "",
        country: locationBasedInitialValues.selectedCountry || "",
        postalCode: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        region: "",
      },
      phoneNumber: "",
      phoneNumberCountryCode:
        locationBasedInitialValues.phoneNumberCountryCode || "",
    }),
    [locationBasedInitialValues],
  )

  const initialValues: FormikContextWithAddress = useMemo(
    () => ({
      address: {
        name:
          orderData.fulfillmentDetails?.name ||
          blankAddressValuesForUser.address.name,
        country:
          orderData.fulfillmentDetails?.country ||
          blankAddressValuesForUser.address.country,
        postalCode:
          orderData.fulfillmentDetails?.postalCode ||
          blankAddressValuesForUser.address.postalCode,
        addressLine1:
          orderData.fulfillmentDetails?.addressLine1 ||
          blankAddressValuesForUser.address.addressLine1,
        addressLine2:
          orderData.fulfillmentDetails?.addressLine2 ||
          blankAddressValuesForUser.address.addressLine2,
        city:
          orderData.fulfillmentDetails?.city ||
          blankAddressValuesForUser.address.city,
        region:
          orderData.fulfillmentDetails?.region ||
          blankAddressValuesForUser.address.region,
      },
      phoneNumber:
        orderData.fulfillmentDetails?.phoneNumber?.originalNumber ||
        blankAddressValuesForUser.phoneNumber,
      phoneNumberCountryCode:
        orderData.fulfillmentDetails?.phoneNumber?.regionCode ||
        blankAddressValuesForUser.phoneNumberCountryCode,
    }),
    [orderData, blankAddressValuesForUser],
  )

  const processedAddresses = useMemo(() => {
    return processSavedAddresses(
      addressConnection,
      orderData.availableShippingCountries,
    )
  }, [addressConnection, orderData.availableShippingCountries])

  const hasSavedAddresses = processedAddresses.length > 0

  const initialSelectedAddress = useMemo(() => {
    return findInitialSelectedAddress(processedAddresses, initialValues)
  }, [initialValues, processedAddresses])

  const onSubmit = useCallback(
    async (
      values: FormikContextWithAddress,
      formikHelpers: FormikHelpers<FormikContextWithAddress>,
    ) => {
      try {
        setCheckoutMode("standard")
        checkoutTracking.clickedOrderProgression(
          ContextModule.ordersFulfillment,
        )

        if (orderData.selectedFulfillmentOption?.type) {
          // Unset the current fulfillment option if it exists
          const unsetFulfillmentOptionResult =
            await unsetOrderFulfillmentOption.submitMutation({
              variables: {
                input: {
                  id: orderData.internalID,
                },
              },
            })
          validateAndExtractOrderResponse(
            unsetFulfillmentOptionResult.unsetOrderFulfillmentOption
              ?.orderOrError,
          )
        }

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
        setUserAddressMode(null)
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
      unsetOrderFulfillmentOption,
      orderData.selectedFulfillmentOption?.type,
      setCheckoutMode,
      setUserAddressMode,
    ],
  )
  return (
    <>
      <Spacer y={2} />

      <Formik
        initialValues={initialSelectedAddress || initialValues}
        enableReinitialize={true}
        validationSchema={deliveryAddressValidationSchema}
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
            {hasSavedAddresses ? (
              <SavedAddressOptions
                savedAddresses={processedAddresses}
                initialSelectedAddress={initialSelectedAddress}
                newAddressInitialValues={blankAddressValuesForUser}
                onSelectAddress={async values => {
                  await formikContext.setValues(values)
                }}
              />
            ) : (
              <>
                <Text
                  fontWeight={["bold", "normal"]}
                  color="mono100"
                  variant={["sm-display", "md"]}
                >
                  Delivery address
                </Text>
                <AddressFormFields
                  withPhoneNumber
                  shippableCountries={shippableCountries}
                />
                <Spacer y={4} />
                <Button
                  type="submit"
                  loading={formikContext.isSubmitting}
                  onClick={() => formikContext.handleSubmit()}
                >
                  {/* TODO: This would not apply for flat shipping */}
                  See Shipping Methods
                </Button>
              </>
            )}
          </Flex>
        )}
      </Formik>
    </>
  )
}

const ME_FRAGMENT = graphql`
  fragment Order2DeliveryForm_me on Me {
    addressConnection(first: 20) {
      edges {
        node {
          internalID
          addressLine1
          addressLine2
          city
          region
          postalCode
          country
          name
          phoneNumber
          phoneNumberCountryCode
        }
      }
    }
  }
`

const ORDER_FRAGMENT = graphql`
  fragment Order2DeliveryForm_order on Order {
    internalID
    selectedFulfillmentOption {
      type
    }
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
        originalNumber
        regionCode
        countryCode
      }
    }
  }
`
