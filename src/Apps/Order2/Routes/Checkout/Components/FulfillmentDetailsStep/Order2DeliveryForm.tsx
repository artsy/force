import { ContextModule } from "@artsy/cohesion"
import {
  BorderedRadio,
  Button,
  Clickable,
  Flex,
  RadioGroup,
  Spacer,
  Text,
} from "@artsy/palette"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import {
  CheckoutErrorBanner,
  MailtoOrderSupport,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { handleError } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/handleError"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"

import { useOrder2SetOrderDeliveryAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderDeliveryAddressMutation"
import { useOrder2UnsetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UnsetOrderFulfillmentOptionMutation"
import {
  formatPhoneNumber,
  getShippableCountries as getShippableCountryData,
} from "Apps/Order2/Utils/addressUtils"
import {
  AddressFormFields,
  type FormikContextWithAddress,
  addressFormFieldsValidator,
} from "Components/Address/AddressFormFields"
import { sortCountriesForCountryInput } from "Components/Address/utils/sortCountriesForCountryInput"
import { useInitialLocationValues } from "Components/Address/utils/useInitialLocationValues"
import { extractNodes } from "Utils/extractNodes"
import type {
  Order2DeliveryForm_me$data,
  Order2DeliveryForm_me$key,
} from "__generated__/Order2DeliveryForm_me.graphql"
import type { Order2DeliveryForm_order$key } from "__generated__/Order2DeliveryForm_order.graphql"
import { Formik, type FormikHelpers, useFormikContext } from "formik"
import { useCallback, useMemo, useState } from "react"
import { graphql, useFragment } from "react-relay"
import styled from "styled-components"
import * as yup from "yup"

interface Order2DeliveryFormProps {
  order: Order2DeliveryForm_order$key
  me: Order2DeliveryForm_me$key
}

const validationSchema = yup
  .object()
  .shape(addressFormFieldsValidator({ withPhoneNumber: true }))

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

  const { setCheckoutMode, checkoutTracking, setFulfillmentDetailsComplete } =
    checkoutContext
  const updateShippingAddressMutation =
    useOrder2SetOrderDeliveryAddressMutation()
  const unsetOrderFulfillmentOption =
    useOrder2UnsetOrderFulfillmentOptionMutation()

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

  const initialBlankValues: FormikContextWithAddress = useMemo(
    () => ({
      address: {
        name: fulfillmentDetails.name || "",
        country:
          fulfillmentDetails.country ||
          locationBasedInitialValues.selectedCountry ||
          "",
        postalCode: fulfillmentDetails.postalCode || "",
        addressLine1: fulfillmentDetails.addressLine1 || "",
        addressLine2: fulfillmentDetails.addressLine2 || "",
        city: fulfillmentDetails.city || "",
        region: fulfillmentDetails.region || "",
      },
      phoneNumber: fulfillmentDetails.phoneNumber?.originalNumber || "",
      phoneNumberCountryCode:
        fulfillmentDetails.phoneNumber?.countryCode ||
        locationBasedInitialValues.phoneNumberCountryCode ||
        "",
    }),
    [fulfillmentDetails, locationBasedInitialValues],
  )

  const processedAddresses = useMemo(() => {
    return processSavedAddresses(
      addressConnection,
      orderData.availableShippingCountries,
    )
  }, [addressConnection, orderData.availableShippingCountries])
  const hasSavedAddresses = processedAddresses.length > 0

  const initialSelectedAddress = useMemo(() => {
    return findInitialSelectedAddress(processedAddresses, initialBlankValues)
  }, [initialBlankValues, processedAddresses])

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
        initialValues={initialSelectedAddress || initialBlankValues}
        enableReinitialize={true}
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
            {hasSavedAddresses ? (
              <SavedAddressOptions
                savedAddresses={processedAddresses}
                initialSelectedAddress={initialSelectedAddress}
              />
            ) : (
              <AddressFormFields
                withPhoneNumber
                shippableCountries={shippableCountries}
              />
            )}
            <Spacer y={4} />
            <Button
              type="submit"
              loading={formikContext.isSubmitting}
              onClick={() => formikContext.handleSubmit()}
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

interface SavedAddressOptionsProps {
  savedAddresses: ProcessedAddress[]
  initialSelectedAddress?: ProcessedAddress
}
const SavedAddressOptions = ({
  savedAddresses,
  initialSelectedAddress,
}: SavedAddressOptionsProps) => {
  const formikContext = useFormikContext<FormikContextWithAddress>()

  const [selectedAddressID, setSelectedAddressID] = useState(
    initialSelectedAddress?.internalID || "",
  )

  return (
    <Flex flexDirection="column">
      <RadioGroup
        defaultValue={initialSelectedAddress}
        onSelect={(processedAddress: ProcessedAddress) => {
          formikContext.setValues(processedAddress)
          setSelectedAddressID(processedAddress.internalID)
          // TODO: Somehow handle validation errors that won't be visible on a saved address
        }}
      >
        {savedAddresses.map(processedAddress => {
          const { address, isValid, internalID } = processedAddress
          const isSelected = selectedAddressID === internalID
          const backgroundColor = isSelected ? "mono5" : "mono0"
          const textColor = isSelected ? "mono100" : "mono60"
          return (
            <UnBorderedRadio
              width="100%"
              backgroundColor={backgroundColor}
              key={internalID}
              value={processedAddress}
              flex={0}
              disabled={!isValid}
              alignSelf="center"
              label={
                <Flex flexDirection="column" width="100%" ml={1}>
                  <Flex justifyContent="space-between">
                    {address.name && (
                      <Text variant="sm-display" color={textColor}>
                        {address.name}
                      </Text>
                    )}
                    <Clickable onClick={e => e.stopPropagation()}>
                      <Text variant="xs" fontWeight="normal" color={textColor}>
                        Edit
                      </Text>
                    </Clickable>
                  </Flex>
                  {address.addressLine1 && (
                    <Text variant="xs" fontWeight="normal" color={textColor}>
                      {address.addressLine1}
                    </Text>
                  )}
                  {address.addressLine2 && (
                    <Text variant="xs" fontWeight="normal" color={textColor}>
                      {address.addressLine2}
                    </Text>
                  )}
                  {(address.city || address.region || address.postalCode) && (
                    <Text variant="xs" fontWeight="normal" color={textColor}>
                      {[address.city, address.region, address.postalCode]
                        .filter(Boolean)
                        .join(", ")}
                    </Text>
                  )}
                  {address.country && (
                    <Text variant="xs" fontWeight="normal" color={textColor}>
                      {address.country.toLocaleUpperCase()}
                    </Text>
                  )}

                  {address.phoneNumber && (
                    <Text variant="xs" fontWeight="normal" color={textColor}>
                      {formatPhoneNumber(address)}
                    </Text>
                  )}
                </Flex>
              }
            />
          )
        })}
      </RadioGroup>
    </Flex>
  )
}

const UnBorderedRadio = styled(BorderedRadio)`
  border: 0;
`

const ME_FRAGMENT = graphql`
  fragment Order2DeliveryForm_me on Me {
    addressConnection {
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
        countryCode
        originalNumber
      }
    }
  }
`

type MeAddresses = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<Order2DeliveryForm_me$data>
        >["addressConnection"]
      >["edges"]
    >[number]
  >["node"]
>
type GravityAddress = ReturnType<typeof extractNodes<MeAddresses>>[number]

type ProcessedAddress = FormikContextWithAddress & {
  isValid: boolean
  internalID: string
}

const normalizeAddress = (
  address: GravityAddress,
): FormikContextWithAddress => {
  return {
    phoneNumber: address.phoneNumber || "",
    phoneNumberCountryCode: address.phoneNumberCountryCode || "",
    address: {
      name: address.name || "",
      country: address.country.toUpperCase() || "",
      postalCode: address.postalCode || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      city: address.city || "",
      region: address.region || "",
    },
  }
}

const processSavedAddresses = (
  addresses: Order2DeliveryForm_me$data["addressConnection"],
  availableShippingCountries: readonly string[],
): ProcessedAddress[] => {
  const meAddresses = extractNodes(addresses)
  const processedAddresses = meAddresses.map(address => {
    const normalizedAddress = normalizeAddress(address)
    const isValid = availableShippingCountries.includes(
      normalizedAddress.address.country,
    )
    return { ...normalizedAddress, isValid, internalID: address.internalID }
  })
  return processedAddresses
}

const findInitialSelectedAddress = (
  processedAddresses: ProcessedAddress[],
  initialValues: FormikContextWithAddress,
): ProcessedAddress | undefined => {
  return (
    processedAddresses.find(processedAddress => {
      return (
        initialValues.address.name === processedAddress.address.name &&
        initialValues.address.country === processedAddress.address.country &&
        initialValues.address.postalCode ===
          processedAddress.address.postalCode &&
        initialValues.address.addressLine1 ===
          processedAddress.address.addressLine1 &&
        initialValues.address.addressLine2 ===
          processedAddress.address.addressLine2 &&
        initialValues.address.city === processedAddress.address.city &&
        initialValues.address.region === processedAddress.address.region &&
        initialValues.phoneNumber === processedAddress.phoneNumber &&
        initialValues.phoneNumberCountryCode ===
          processedAddress.phoneNumberCountryCode
      )
    }) || processedAddresses.find(processedAddress => processedAddress.isValid)
  )
}
