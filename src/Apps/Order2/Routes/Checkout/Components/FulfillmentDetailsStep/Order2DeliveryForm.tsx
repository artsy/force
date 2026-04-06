import { ContextModule } from "@artsy/cohesion"
import { Button, Flex, Spacer } from "@artsy/palette"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { SectionHeading } from "Apps/Order2/Components/SectionHeading"
import { CheckoutStepName } from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutErrorBanner,
  fallbackError,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { SavedAddressOptions } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/SavedAddressOptions/Order2SavedAddressOptions"
import { handleError } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/handleError"
import {
  deliveryAddressValidationSchema,
  findInitialSelectedAddress,
  processSavedAddresses,
  validateAddressFields,
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToErrorBanner } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToErrorBanner"
import { useScrollToFieldErrorOnSubmit } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToFieldErrorOnSubmit"
import { useOrder2CreateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2CreateUserAddressMutation"
import { useOrder2SetOrderDeliveryAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderDeliveryAddressMutation"
import { useOrder2SetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderFulfillmentOptionMutation"
import { getShippableCountries as getShippableCountryData } from "Apps/Order2/Utils/addressUtils"
import {
  AddressFormFields,
  type FormikContextWithAddress,
} from "Components/Address/AddressFormFields"
import { sortCountriesForCountryInput } from "Components/Address/utils/sortCountriesForCountryInput"
import { useInitialLocationValues } from "Components/Address/utils/useInitialLocationValues"
import type { CountryData } from "Utils/countries"
import createLogger from "Utils/logger"
import type { Order2DeliveryForm_me$key } from "__generated__/Order2DeliveryForm_me.graphql"
import type {
  Order2DeliveryForm_order$data,
  Order2DeliveryForm_order$key,
} from "__generated__/Order2DeliveryForm_order.graphql"
import { Form, Formik, type FormikHelpers, useFormikContext } from "formik"
import { useCallback, useEffect, useMemo, useRef } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2DeliveryFormProps {
  order: Order2DeliveryForm_order$key
  me: Order2DeliveryForm_me$key
}

type FulfillmentOption = NonNullable<
  Order2DeliveryForm_order$data["fulfillmentOptions"]
>[number]

const REAL_OPTION_TYPES = [
  "DOMESTIC_FLAT",
  "INTERNATIONAL_FLAT",
  "ARTSY_STANDARD",
  "ARTSY_EXPRESS",
  "ARTSY_WHITE_GLOVE",
]

export const Order2DeliveryForm: React.FC<Order2DeliveryFormProps> = ({
  order,
  me,
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

  const countryInputOptions = useMemo(() => {
    return sortCountriesForCountryInput(shippableCountries)
  }, [shippableCountries])

  const locationBasedInitialValues =
    useInitialLocationValues(countryInputOptions)

  const checkoutContext = useCheckoutContext()
  const {
    setCheckoutMode,
    checkoutTracking,
    setFulfillmentDetailsComplete,
    setAddressLoading,
    setUserAddressMode,
    setSectionErrorMessage,
    messages,
  } = checkoutContext

  const isOfferOrder = orderData.mode === "OFFER"

  const fulfillmentDetailsError =
    messages[CheckoutStepName.FULFILLMENT_DETAILS]?.error

  const setOrderDeliveryAddressMutation =
    useOrder2SetOrderDeliveryAddressMutation()
  const setFulfillmentOptionMutation =
    useOrder2SetOrderFulfillmentOptionMutation()

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

  const initialSelectedAddress = useMemo(() => {
    return findInitialSelectedAddress(processedAddresses, initialValues)
  }, [initialValues, processedAddresses])

  /**
   * Fires updateOrderShippingAddress and updates Relay store with fresh fulfillment options.
   * Returns the real fulfillment options from the response.
   * Silently swallows errors when silent=true (used for reactive/preload mutations).
   */
  const saveAddressToOrder = useCallback(
    async (
      values: FormikContextWithAddress,
      options: { silent?: boolean } = {},
    ): Promise<FulfillmentOption[]> => {
      setAddressLoading(true)
      try {
        const result = await setOrderDeliveryAddressMutation.submitMutation({
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

        const responseOrder = validateAndExtractOrderResponse(
          result.updateOrderShippingAddress?.orderOrError,
        ).order

        const realOptions = (responseOrder.fulfillmentOptions ?? []).filter(o =>
          REAL_OPTION_TYPES.includes(o.type),
        ) as FulfillmentOption[]

        // Proactively set the fulfillment option when there's a single flat-rate
        // choice so the order summary tax total updates without waiting for submit.
        if (realOptions.length === 1) {
          setFulfillmentOptionMutation
            .submitMutation({
              variables: {
                input: {
                  id: orderData.internalID,
                  fulfillmentOption: { type: realOptions[0].type as never },
                },
              },
            })
            .catch(e =>
              logger.error("Error pre-setting fulfillment option:", e),
            )
        }

        return realOptions
      } catch (error) {
        if (!options.silent) throw error
        logger.error("Error saving address to order:", error)
        return []
      } finally {
        setAddressLoading(false)
      }
    },
    [
      orderData.internalID,
      setAddressLoading,
      setOrderDeliveryAddressMutation,
      setFulfillmentOptionMutation,
      logger,
    ],
  )

  // On mount: fire address mutation to preload shipping options, unless quotes are already
  // present for the currently-selected address (e.g. after a page reload or back-navigation).
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally runs once on mount
  useEffect(() => {
    const existingRealOptions = (orderData.fulfillmentOptions ?? []).filter(o =>
      REAL_OPTION_TYPES.includes(o.type),
    )

    // Cheap key-field comparison — country + postalCode + addressLine1 are the fields
    // that determine which shipping quotes are returned.
    const selectedAddressMatchesFulfillmentDetails = (): boolean => {
      const fd = orderData.fulfillmentDetails
      if (!fd) return false
      const addr = hasSavedAddresses
        ? initialSelectedAddress?.address
        : initialValues.address
      if (!addr) return false
      return (
        addr.addressLine1 === (fd.addressLine1 ?? "") &&
        addr.country === (fd.country ?? "") &&
        addr.postalCode === (fd.postalCode ?? "")
      )
    }

    if (
      existingRealOptions.length > 0 &&
      selectedAddressMatchesFulfillmentDetails()
    ) {
      // Quotes are already fresh — unlock the fulfillment step without re-fetching.
      setSectionErrorMessage({
        section: CheckoutStepName.FULFILLMENT_DETAILS,
        error: null,
      })
      setFulfillmentDetailsComplete({})
      return
    }

    if (hasSavedAddresses && initialSelectedAddress) {
      saveAddressToOrder(initialSelectedAddress, { silent: true }).then(
        options => {
          if (options.length > 0) {
            setSectionErrorMessage({
              section: CheckoutStepName.FULFILLMENT_DETAILS,
              error: null,
            })
            setFulfillmentDetailsComplete({})
          }
        },
      )
    } else if (!hasSavedAddresses) {
      // Fire with country only to preload shipping options
      const countryOnlyValues: FormikContextWithAddress = {
        ...blankAddressValuesForUser,
        address: {
          ...blankAddressValuesForUser.address,
          country:
            initialValues.address.country ||
            blankAddressValuesForUser.address.country,
        },
      }
      saveAddressToOrder(countryOnlyValues, { silent: true })
    }
  }, [])

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
        setCheckoutMode("standard")
        checkoutTracking.clickedOrderProgression(
          ContextModule.ordersFulfillment,
        )

        // Save the full address to the order (updates fulfillment options in Relay store)
        await saveAddressToOrder(values)

        await saveAddressToUser(values)

        setSectionErrorMessage({
          section: CheckoutStepName.FULFILLMENT_DETAILS,
          error: null,
        })
        setSectionErrorMessage({
          section: "EXPRESS_CHECKOUT",
          error: null,
        })

        setFulfillmentDetailsComplete({})
        setUserAddressMode(null)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log("[onSubmit] ERROR caught:", error)
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
      }
    },
    [
      checkoutTracking,
      saveAddressToOrder,
      saveAddressToUser,
      setCheckoutMode,
      setFulfillmentDetailsComplete,
      setSectionErrorMessage,
      setUserAddressMode,
    ],
  )

  return (
    <Formik
      initialValues={initialSelectedAddress || initialValues}
      enableReinitialize={true}
      validationSchema={deliveryAddressValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setValues }) => {
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
                newAddressInitialValues={blankAddressValuesForUser}
                availableShippingCountries={
                  orderData.availableShippingCountries
                }
                onSelectAddress={async values => {
                  await setValues(values)
                  const isValid = validateAddressFields(values)
                  const isShippable = (
                    orderData.availableShippingCountries ?? []
                  ).includes(values.address.country)
                  if (!isValid || (!isShippable && !isOfferOrder)) {
                    return
                  }
                  const options = await saveAddressToOrder(values, {
                    silent: true,
                  })
                  if (options.length > 0 || isOfferOrder) {
                    setSectionErrorMessage({
                      section: CheckoutStepName.FULFILLMENT_DETAILS,
                      error: null,
                    })
                    setFulfillmentDetailsComplete({})
                  }
                }}
              />
            ) : (
              <Form noValidate>
                <SectionHeading>Delivery address</SectionHeading>

                <Spacer y={2} />

                <DeliveryFormFields
                  shippableCountries={shippableCountries as any}
                  onCountryChange={values =>
                    saveAddressToOrder(values, { silent: true })
                  }
                />

                <Spacer y={4} />

                <Button type="submit" loading={isSubmitting}>
                  Save address
                </Button>
              </Form>
            )}
          </Flex>
        )
      }}
    </Formik>
  )
}

// ─── Delivery form fields ─────────────────────────────────────────────────────

interface DeliveryFormFieldsProps {
  shippableCountries: CountryData[]
  onCountryChange: (values: FormikContextWithAddress) => void
}

const DeliveryFormFields: React.FC<DeliveryFormFieldsProps> = ({
  shippableCountries,
  onCountryChange,
}) => {
  const formRef = useScrollToFieldErrorOnSubmit()

  return (
    <div ref={formRef}>
      <AddressFormFields
        withPhoneNumber
        shippableCountries={shippableCountries as any}
      />
      <CountryChangeEffect onCountryChange={onCountryChange} />
    </div>
  )
}

interface CountryChangeEffectProps {
  onCountryChange: (values: FormikContextWithAddress) => void
}

const CountryChangeEffect: React.FC<CountryChangeEffectProps> = ({
  onCountryChange,
}) => {
  const { values } = useFormikContext<FormikContextWithAddress>()
  const isFirstRender = useRef(true)
  const prevCountry = useRef(values.address.country)

  // biome-ignore lint/correctness/useExhaustiveDependencies: only react to country changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      prevCountry.current = values.address.country
      return
    }
    if (values.address.country !== prevCountry.current) {
      prevCountry.current = values.address.country
      onCountryChange(values)
    }
  }, [values.address.country])

  return null
}

// ─── Relay fragments ──────────────────────────────────────────────────────────

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
    mode
    availableShippingCountries
    fulfillmentOptions {
      type
      selected
      amount {
        display
      }
    }
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
