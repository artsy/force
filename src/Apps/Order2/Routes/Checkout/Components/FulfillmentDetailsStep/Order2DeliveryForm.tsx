import { ContextModule } from "@artsy/cohesion"
import InfoIcon from "@artsy/icons/InfoIcon"
import {
  Button,
  Clickable,
  Flex,
  Radio,
  RadioGroup,
  Skeleton,
  SkeletonBox,
  Spacer,
  Text,
  Tooltip,
} from "@artsy/palette"
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
} from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/utils"
import {
  deliveryOptionLabel,
  deliveryOptionTimeEstimate,
} from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/utils"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useScrollToErrorBanner } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToErrorBanner"
import { useScrollToFieldErrorOnSubmit } from "Apps/Order2/Routes/Checkout/Hooks/useScrollToFieldErrorOnSubmit"
import { useOrder2CreateUserAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2CreateUserAddressMutation"
import { useOrder2SetOrderDeliveryAddressMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderDeliveryAddressMutation"
import { useOrder2SetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderFulfillmentOptionMutation"
import { useOrder2UnsetOrderFulfillmentOptionMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2UnsetOrderFulfillmentOptionMutation"
import { getShippableCountries as getShippableCountryData } from "Apps/Order2/Utils/addressUtils"
import { LocalCheckoutError } from "Apps/Order2/Utils/errors"
import { BUYER_GUARANTEE_URL } from "Apps/Order2/constants"
import {
  AddressFormFields,
  type FormikContextWithAddress,
} from "Components/Address/AddressFormFields"
import { sortCountriesForCountryInput } from "Components/Address/utils/sortCountriesForCountryInput"
import { useInitialLocationValues } from "Components/Address/utils/useInitialLocationValues"
import { RouterLink } from "System/Components/RouterLink"
import type { CountryData } from "Utils/countries"
import createLogger from "Utils/logger"
import type { Order2DeliveryForm_me$key } from "__generated__/Order2DeliveryForm_me.graphql"
import type {
  Order2DeliveryForm_order$data,
  Order2DeliveryForm_order$key,
} from "__generated__/Order2DeliveryForm_order.graphql"
import { Form, Formik, type FormikHelpers, useFormikContext } from "formik"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { graphql, useFragment } from "react-relay"

interface Order2DeliveryFormProps {
  order: Order2DeliveryForm_order$key
  me: Order2DeliveryForm_me$key
}

type FulfillmentOption = NonNullable<
  Order2DeliveryForm_order$data["fulfillmentOptions"]
>[number]

const FLAT_SHIPPING_TYPES = ["DOMESTIC_FLAT", "INTERNATIONAL_FLAT"]
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
    setUserAddressMode,
    setSectionErrorMessage,
    messages,
  } = checkoutContext

  const isOfferOrder = orderData.mode === "OFFER"

  const fulfillmentDetailsError =
    messages[CheckoutStepName.FULFILLMENT_DETAILS]?.error

  const setOrderDeliveryAddressMutation =
    useOrder2SetOrderDeliveryAddressMutation()
  const unsetOrderFulfillmentOption =
    useOrder2UnsetOrderFulfillmentOptionMutation()
  const setFulfillmentOptionMutation =
    useOrder2SetOrderFulfillmentOptionMutation()

  // Auto-selected option derived synchronously from Relay fragment data.
  // This ensures the button is enabled on first render without needing a useEffect.
  const autoSelectedFulfillmentOption = useMemo(() => {
    const existingOptions = orderData.fulfillmentOptions ?? []
    const realOptions = existingOptions.filter(o =>
      REAL_OPTION_TYPES.includes(o.type),
    )
    return (
      realOptions.find(o => o.selected) ??
      (realOptions.length === 1 ? realOptions[0] : null) ??
      null
    )
  }, [orderData.fulfillmentOptions])

  // Explicit user selection overrides auto-selection; null means "use auto"
  const [userSelectedFulfillmentOption, setUserSelectedFulfillmentOption] =
    useState<FulfillmentOption | null>(null)

  const selectedFulfillmentOption =
    userSelectedFulfillmentOption ?? autoSelectedFulfillmentOption

  const selectedFulfillmentOptionRef = useRef<FulfillmentOption | null>(null)
  selectedFulfillmentOptionRef.current = selectedFulfillmentOption

  const [isAddressMutating, setIsAddressMutating] = useState(false)

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
   * Fires updateOrderShippingAddress and updates shipping option state.
   * Returns the real fulfillment options from the response.
   * Silently swallows errors (used for reactive/preload mutations).
   */
  const saveAddressToOrder = useCallback(
    async (
      values: FormikContextWithAddress,
      options: { silent?: boolean } = {},
    ): Promise<FulfillmentOption[]> => {
      setIsAddressMutating(true)
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

        // If user had explicitly selected an option that is no longer available,
        // clear the user selection so auto-selection can take over from Relay data.
        const existingSelection = selectedFulfillmentOptionRef.current
        const existingStillAvailable =
          existingSelection &&
          realOptions.some(o => o.type === existingSelection.type)

        if (!existingStillAvailable) {
          setUserSelectedFulfillmentOption(null)
        }

        return realOptions
      } catch (error) {
        if (!options.silent) throw error
        logger.error("Error saving address to order:", error)
        return []
      } finally {
        setIsAddressMutating(false)
      }
    },
    [orderData.internalID, setOrderDeliveryAddressMutation, logger],
  )

  // On mount: fire address mutation to preload shipping options
  // Skip if we already have real fulfillment options (e.g. from a previous step or page reload)
  // biome-ignore lint/correctness/useExhaustiveDependencies: intentionally runs once on mount
  useEffect(() => {
    const existingRealOptions = (orderData.fulfillmentOptions ?? []).filter(o =>
      REAL_OPTION_TYPES.includes(o.type),
    )
    // eslint-disable-next-line no-console
    console.log(
      "[onMountEffect] fulfillmentOptions:",
      JSON.stringify(orderData.fulfillmentOptions),
      "existingRealOptions:",
      existingRealOptions.length,
    )
    if (existingRealOptions.length > 0) return

    if (hasSavedAddresses && initialSelectedAddress) {
      saveAddressToOrder(initialSelectedAddress, { silent: true })
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

        // Unset the current fulfillment option if it exists
        if (orderData.selectedFulfillmentOption?.type) {
          const unsetResult = await unsetOrderFulfillmentOption.submitMutation({
            variables: {
              input: {
                id: orderData.internalID,
              },
            },
          })
          validateAndExtractOrderResponse(
            unsetResult.unsetOrderFulfillmentOption?.orderOrError,
          )
        }

        // Save the full address (ensures ARTA gets accurate quotes)
        const realOptions = await saveAddressToOrder(values)
        // eslint-disable-next-line no-console
        console.log(
          "[onSubmit] realOptions:",
          realOptions,
          "isOfferOrder:",
          isOfferOrder,
        )

        const isMissingShippingOption =
          realOptions.length === 0 ||
          realOptions.every(o => ["PICKUP", "SHIPPING_TBD"].includes(o.type))

        if (isMissingShippingOption && !isOfferOrder) {
          throw new LocalCheckoutError("no_shipping_options")
        }

        // Use the user-selected option if it's still available in the new results,
        // otherwise fall back to auto-selection. This handles the case where the
        // server returns different options after an address change (e.g. ARTA → flat rate).
        const currentSelection = selectedFulfillmentOptionRef.current
        const currentSelectionStillValid =
          currentSelection != null &&
          realOptions.some(o => o.type === currentSelection.type)

        const optionToSave =
          (currentSelectionStillValid ? currentSelection : null) ??
          (realOptions.length === 1 ? realOptions[0] : null)

        if (!optionToSave && !isOfferOrder) {
          throw new LocalCheckoutError("no_shipping_options")
        }

        if (optionToSave) {
          const setFulfillmentResult =
            await setFulfillmentOptionMutation.submitMutation({
              variables: {
                input: {
                  id: orderData.internalID,
                  fulfillmentOption: {
                    // Relay generates FulfillmentOptionTypeEnum for reads and
                    // FulfillmentOptionInputEnum for mutation inputs — they are
                    // structurally identical so we cast here.
                    type: optionToSave.type as never,
                  },
                },
              },
            })
          validateAndExtractOrderResponse(
            setFulfillmentResult.setOrderFulfillmentOption?.orderOrError,
          )
        }

        if (!hasSavedAddresses) {
          await saveAddressToUser(values)
        }

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
      hasSavedAddresses,
      isOfferOrder,
      orderData.internalID,
      orderData.selectedFulfillmentOption?.type,
      saveAddressToOrder,
      saveAddressToUser,
      setCheckoutMode,
      setFulfillmentDetailsComplete,
      setFulfillmentOptionMutation,
      setSectionErrorMessage,
      setUserAddressMode,
      unsetOrderFulfillmentOption,
    ],
  )

  // Disable the button only when the user must actively choose between multiple
  // shipping options (e.g. ARTA quotes) and hasn't done so yet.
  // Single flat-rate options are auto-selected so the button stays enabled.
  // We do NOT gate on isAddressMutating here — that state is surfaced via the
  // loading spinner and the button stays clickable so form validation can run.
  const realOptionsForCanSubmit = (orderData.fulfillmentOptions ?? []).filter(
    o => REAL_OPTION_TYPES.includes(o.type),
  )
  const requiresExplicitSelection =
    realOptionsForCanSubmit.length > 1 && !selectedFulfillmentOption
  const canSubmit = !requiresExplicitSelection

  return (
    <Formik
      initialValues={initialSelectedAddress || initialValues}
      enableReinitialize={true}
      validationSchema={deliveryAddressValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setValues, handleSubmit }) => {
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
                  await saveAddressToOrder(values, { silent: true })
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
              </Form>
            )}

            <Spacer y={2} />

            <ShippingMethodSection
              fulfillmentOptions={orderData.fulfillmentOptions ?? []}
              isLoading={isAddressMutating}
              selectedOption={selectedFulfillmentOption}
              onSelectOption={setUserSelectedFulfillmentOption}
              shippingOrigin={orderData.shippingOrigin}
            />

            <Spacer y={4} />

            <Button
              type="button"
              loading={isSubmitting}
              disabled={!canSubmit}
              onClick={() => handleSubmit()}
            >
              Continue to Payment
            </Button>
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

// ─── Shipping method section ──────────────────────────────────────────────────

interface ShippingMethodSectionProps {
  fulfillmentOptions: readonly FulfillmentOption[]
  isLoading: boolean
  selectedOption: FulfillmentOption | null
  onSelectOption: (option: FulfillmentOption) => void
  shippingOrigin?: string | null
}

const ShippingMethodSection: React.FC<ShippingMethodSectionProps> = ({
  fulfillmentOptions,
  isLoading,
  selectedOption,
  onSelectOption,
  shippingOrigin,
}) => {
  const { checkoutTracking } = useCheckoutContext()
  const realOptions = fulfillmentOptions.filter(o =>
    REAL_OPTION_TYPES.includes(o.type),
  )

  return (
    <Flex flexDirection="column">
      <Flex alignItems="center">
        <SectionHeading>Shipping method</SectionHeading>

        <Tooltip
          variant="defaultDark"
          placement="top"
          width={250}
          pointer={true}
          content={
            <Text variant="xs">
              Shipping options depend on location and artwork size.
              International orders or works in shows may take longer.
            </Text>
          }
        >
          <Clickable aria-label="Shipping information" ml={0.5}>
            <InfoIcon />
          </Clickable>
        </Tooltip>
      </Flex>

      <Spacer y={1} />

      {shippingOrigin && (
        <Text variant="xs" color="mono60">
          Ships from {shippingOrigin}
        </Text>
      )}

      <Text variant="xs" color="mono60">
        All options are protected against damage and loss with{" "}
        <RouterLink inline target="_blank" to={BUYER_GUARANTEE_URL}>
          Artsy&rsquo;s Buyer Guarantee
        </RouterLink>
        .
      </Text>

      <Spacer y={2} />

      {isLoading ? (
        <ShippingMethodSkeleton />
      ) : realOptions.length === 0 ? (
        <Text variant="sm" color="mono60">
          Methods vary based on location and artwork size
        </Text>
      ) : realOptions.length === 1 ? (
        <SingleShippingOption option={realOptions[0]} />
      ) : (
        <MultipleShippingOptions
          options={realOptions}
          selectedOption={selectedOption}
          onSelectOption={option => {
            onSelectOption(option)
            checkoutTracking.clickedSelectShippingOption(option.type)
          }}
        />
      )}
    </Flex>
  )
}

const ShippingMethodSkeleton: React.FC = () => {
  return (
    <Skeleton>
      <Flex flexDirection="column" gap={1}>
        {[0, 1, 2].map(i => (
          <SkeletonBox key={i} height="52px" width="100%" />
        ))}
      </Flex>
    </Skeleton>
  )
}

interface SingleShippingOptionProps {
  option: FulfillmentOption
}

const SingleShippingOption: React.FC<SingleShippingOptionProps> = ({
  option,
}) => {
  const label = deliveryOptionLabel(option.type)
  const timeEstimate = deliveryOptionTimeEstimate(option.type)
  const [prefix, timeRange] = timeEstimate || []
  const isFlat = FLAT_SHIPPING_TYPES.includes(option.type)

  return (
    <Flex flexDirection="column">
      <Flex justifyContent="space-between">
        <Text variant="sm-display" color="mono100">
          {label}
        </Text>
        {!isFlat && (
          <Text variant="sm" color="mono100">
            {option.amount?.display}
          </Text>
        )}
      </Flex>
      {timeEstimate && (
        <Text variant="sm" color="mono60">
          {prefix} <strong>{timeRange}</strong>
        </Text>
      )}
    </Flex>
  )
}

interface MultipleShippingOptionsProps {
  options: readonly FulfillmentOption[]
  selectedOption: FulfillmentOption | null
  onSelectOption: (option: FulfillmentOption) => void
}

const MultipleShippingOptions: React.FC<MultipleShippingOptionsProps> = ({
  options,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <RadioGroup
      flexDirection="column"
      defaultValue={selectedOption ?? undefined}
      onSelect={option => {
        onSelectOption(option as FulfillmentOption)
      }}
    >
      {options.map(option => {
        const label = deliveryOptionLabel(option.type)
        const timeEstimate = deliveryOptionTimeEstimate(option.type)
        const [prefix, timeRange] = timeEstimate || []
        const isSelected = selectedOption?.type === option.type

        return (
          <Radio
            key={option.type}
            flex={1}
            backgroundColor={isSelected ? "mono5" : "mono0"}
            p={1}
            label={
              <Flex justifyContent="space-between" width="100%">
                <Text variant="sm-display">{label}</Text>
                <Text variant="sm">{option.amount?.display}</Text>
              </Flex>
            }
            value={option}
          >
            <Flex width="100%">
              <Flex flexDirection="column">
                {timeEstimate && (
                  <Text variant="sm" color={isSelected ? "mono100" : "mono60"}>
                    {prefix} <strong>{timeRange}</strong>
                  </Text>
                )}

                {option.type === "ARTSY_WHITE_GLOVE" && isSelected && (
                  <Text variant="sm" color={isSelected ? "mono100" : "mono60"}>
                    This service includes custom packing, transportation on a
                    fine art shuttle, and in-home delivery.
                  </Text>
                )}
              </Flex>
            </Flex>
          </Radio>
        )
      })}
    </RadioGroup>
  )
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
    selectedFulfillmentOption {
      type
    }
    mode
    availableShippingCountries
    shippingOrigin
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
