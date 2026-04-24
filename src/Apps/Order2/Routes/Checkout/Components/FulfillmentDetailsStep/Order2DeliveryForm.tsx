import { ContextModule } from "@artsy/cohesion"
import { Button, Flex, Spacer } from "@artsy/palette"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutErrorBanner,
  fallbackError,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { SELECTABLE_TYPES } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/utils"
import { SavedAddressOptions } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/SavedAddressOptions/Order2SavedAddressOptions"
import { handleError } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/handleError"
import {
  deliveryAddressValidationSchema,
  findInitialSelectedAddress,
  processSavedAddresses,
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToErrorBanner } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToErrorBanner"
import { useScrollToFieldErrorOnSubmit } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToFieldErrorOnSubmit"
import { useSelectDeliveryOption } from "Apps/Order2/Routes/Checkout/Hooks/useSelectDeliveryOption"
import { useOrder2CreateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2CreateUserAddressMutation"
import { useOrder2SetOrderDeliveryAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderDeliveryAddressMutation"
import { useOrder2UnsetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UnsetOrderFulfillmentOptionMutation"
import { getShippableCountries as getShippableCountryData } from "Apps/Order2/Utils/addressUtils"
import { LocalCheckoutError } from "Apps/Order2/Utils/errors"
import {
  AddressFormFields,
  type FormikContextWithAddress,
} from "Components/Address/AddressFormFields"
import { sortCountriesForCountryInput } from "Components/Address/utils/sortCountriesForCountryInput"
import { useInitialLocationValues } from "Components/Address/utils/useInitialLocationValues"
import type { CountryData } from "Utils/countries"
import createLogger from "Utils/logger"
import type { Order2DeliveryForm_me$key } from "__generated__/Order2DeliveryForm_me.graphql"
import type { Order2DeliveryForm_order$key } from "__generated__/Order2DeliveryForm_order.graphql"
import { Form, Formik, type FormikHelpers } from "formik"
import { useCallback, useMemo, useRef } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2DeliveryFormProps {
  order: Order2DeliveryForm_order$key
  me: Order2DeliveryForm_me$key
  hasFulfillmentDetails: boolean
}

export const Order2DeliveryForm: React.FC<Order2DeliveryFormProps> = ({
  order,
  me,
  hasFulfillmentDetails,
}) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const meData = useFragment(ME_FRAGMENT, me)
  const createUserAddress = useOrder2CreateUserAddressMutation()
  const logger = createLogger("Order2DeliveryForm")

  const { addressConnection } = meData

  const shippableCountries = getShippableCountryData(
    orderData.availableShippingCountries,
  )

  const errorBannerRef = useScrollToErrorBanner(
    CheckoutStepName.FULFILLMENT_DETAILS,
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
    completeStep,
    setUserAddressMode,
    setSectionErrorMessage,
    setIsFulfillmentDetailsSaving,
    messages,
    setInitialAutoSaveComplete,
    isInitialAutoSaveComplete,
  } = checkoutContext

  const fulfillmentDetailsError =
    messages[CheckoutStepName.FULFILLMENT_DETAILS]?.error

  const setOrderDeliveryAddressMutation =
    useOrder2SetOrderDeliveryAddressMutation()
  const unsetOrderFulfillmentOption =
    useOrder2UnsetOrderFulfillmentOptionMutation()
  const { selectDeliveryOption } = useSelectDeliveryOption()

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
      setAsDefault: false,
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

  // Treat pickup fulfillment as "no delivery address saved" so the initial
  // auto-submit effect re-fires when switching back to the delivery tab.
  const hasDeliveryAddress =
    hasFulfillmentDetails &&
    orderData.selectedFulfillmentOption?.type !== "PICKUP"

  // Track whether we previously had saved addresses so that when the last one
  // is deleted we can show a blank form instead of pre-filling from the stale
  // fulfillmentDetails still on the order.
  const hadSavedAddressesRef = useRef(hasSavedAddresses)
  const deletedLastAddress = hadSavedAddressesRef.current && !hasSavedAddresses
  hadSavedAddressesRef.current = hasSavedAddresses

  const initialSelectedAddress = useMemo(() => {
    return findInitialSelectedAddress(processedAddresses, initialValues)
  }, [initialValues, processedAddresses])

  const saveAddressToUser = useCallback(
    async (values: FormikContextWithAddress) => {
      try {
        await createUserAddress.submitMutation({
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
      } catch (error) {
        logger.error("Error saving address to user profile:", error)
      }
    },
    [createUserAddress, logger],
  )

  const onSubmit = useCallback(
    async (
      values: FormikContextWithAddress,
      formikHelpers: FormikHelpers<FormikContextWithAddress>,
    ) => {
      try {
        setIsFulfillmentDetailsSaving(true)
        setCheckoutMode("standard")

        // Unset the current fulfillment option if it exists
        if (orderData.selectedFulfillmentOption?.type) {
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

        const setOrderDeliveryAddressResult =
          await setOrderDeliveryAddressMutation.submitMutation({
            variables: {
              input,
            },
          })

        const newOrder = validateAndExtractOrderResponse(
          setOrderDeliveryAddressResult.updateOrderShippingAddress
            ?.orderOrError,
        ).order

        const isMissingShippingOption = newOrder.fulfillmentOptions.every(
          option => ["PICKUP", "SHIPPING_TBD"].includes(option.type),
        )

        if (isMissingShippingOption && orderData?.mode !== "OFFER") {
          throw new LocalCheckoutError("no_shipping_options")
        }

        setSectionErrorMessage({
          section: CheckoutStepName.FULFILLMENT_DETAILS,
          error: null,
        })

        setSectionErrorMessage({
          section: "EXPRESS_CHECKOUT",
          error: null,
        })

        if (!hasSavedAddresses) {
          await saveAddressToUser(values)
        }

        // Always select a delivery option after saving the address — re-using the
        // previously selected type if still available, otherwise the first option.
        // For new-address users with a single option, also auto-advance.
        const selectable = newOrder.fulfillmentOptions.filter(o =>
          SELECTABLE_TYPES.includes(o.type),
        )
        if (selectable.length > 0) {
          const previousType = orderData.selectedFulfillmentOption?.type
          const typeToSelect =
            (previousType &&
              selectable.find(o => o.type === previousType)?.type) ??
            selectable[0].type
          const success = await selectDeliveryOption(
            orderData.internalID,
            typeToSelect,
          )
          if (success && selectable.length === 1 && !hasSavedAddresses) {
            completeStep(CheckoutStepName.DELIVERY_OPTION)
          }
        }
        setUserAddressMode(null)
      } catch (error) {
        handleError(
          error,
          formikHelpers,
          fallbackError("updating your delivery address", error?.code),
          error =>
            setSectionErrorMessage({
              section: CheckoutStepName.FULFILLMENT_DETAILS,
              error,
            }),
        )
      } finally {
        setIsFulfillmentDetailsSaving(false)
        if (!isInitialAutoSaveComplete) {
          setInitialAutoSaveComplete()
        }
      }
    },
    [
      hasSavedAddresses,
      orderData.internalID,
      orderData.selectedFulfillmentOption?.type,
      orderData?.mode,
      saveAddressToUser,
      setCheckoutMode,
      setIsFulfillmentDetailsSaving,
      selectDeliveryOption,
      completeStep,
      setSectionErrorMessage,
      setUserAddressMode,
      unsetOrderFulfillmentOption,
      setOrderDeliveryAddressMutation,
      isInitialAutoSaveComplete,
      setInitialAutoSaveComplete,
    ],
  )
  return (
    <Formik
      initialValues={
        deletedLastAddress
          ? blankAddressValuesForUser
          : initialSelectedAddress || initialValues
      }
      enableReinitialize={true}
      validationSchema={deliveryAddressValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setValues, status, submitForm }) => {
        return (
          <Flex flexDirection={"column"} mb={2}>
            {fulfillmentDetailsError && (
              <>
                <CheckoutErrorBanner
                  ref={errorBannerRef}
                  error={fulfillmentDetailsError}
                  analytics={{ flow: "User setting shipping address" }}
                />
                <Spacer y={2} />
              </>
            )}

            {hasSavedAddresses ? (
              <SavedAddressOptions
                savedAddresses={processedAddresses}
                initialSelectedAddress={initialSelectedAddress}
                hasDeliveryAddress={hasDeliveryAddress}
                newAddressInitialValues={blankAddressValuesForUser}
                availableShippingCountries={
                  orderData.availableShippingCountries
                }
                onSelectAddress={async values => {
                  await setValues(values)
                  await submitForm()
                }}
              />
            ) : (
              <Form noValidate>
                <SectionHeading>Delivery address</SectionHeading>

                <Spacer y={2} />

                <DeliveryFormFields
                  shippableCountries={shippableCountries as any}
                />

                <Spacer y={4} />

                <Button
                  type="submit"
                  loading={isSubmitting}
                  disabled={!!status?.errorBanner}
                  onClick={() => {
                    // tracked separately from onSubmit — fires on click regardless of validation
                    checkoutTracking.clickedOrderProgression(
                      ContextModule.ordersFulfillment,
                    )
                  }}
                  width="100%"
                >
                  Save and Continue
                </Button>
              </Form>
            )}
          </Flex>
        )
      }}
    </Formik>
  )
}

interface DeliveryFormFieldsProps {
  shippableCountries: CountryData[]
}

const DeliveryFormFields: React.FC<DeliveryFormFieldsProps> = ({
  shippableCountries,
}) => {
  const formRef = useScrollToFieldErrorOnSubmit()

  return (
    <div ref={formRef}>
      <AddressFormFields
        withPhoneNumber
        syncPhoneCountryCode
        shippableCountries={shippableCountries as any}
      />
    </div>
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
          phoneNumberParsed {
            display(format: INTERNATIONAL)
            isValid
          }
          isDefault
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
    mode
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
