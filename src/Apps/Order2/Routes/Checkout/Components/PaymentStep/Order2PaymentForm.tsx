import { ContextModule } from "@artsy/cohesion"
import InstitutionIcon from "@artsy/icons/InstitutionIcon"
import InfoIcon from "@artsy/icons/InfoIcon"
import LockIcon from "@artsy/icons/LockIcon"
import ReceiptIcon from "@artsy/icons/ReceiptIcon"
import {
  Box,
  Button,
  Checkbox,
  Clickable,
  Flex,
  Radio,
  RadioGroup,
  Spacer,
  Text,
  Tooltip,
  useTheme,
} from "@artsy/palette"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import type {
  StripeElementsOptions,
  StripeElementsUpdateOptions,
  StripePaymentElementChangeEvent,
  StripePaymentElementOptions,
} from "@stripe/stripe-js"
import { Collapse } from "Apps/Order/Components/Collapse"
import { validateAndExtractOrderResponse } from "Apps/Order/Components/ExpressCheckout/Util/mutationHandling"
import { useSetPayment } from "Apps/Order/Mutations/useSetPayment"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import {
  CheckoutErrorBanner,
  MailtoOrderSupport,
} from "Apps/Order2/Routes/Checkout/Components/CheckoutErrorBanner"
import { useCheckoutContext } from "Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext"
import { useOrder2SetOrderPaymentMutation } from "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderPaymentMutation"
import { fetchAndSetConfirmationToken } from "Apps/Order2/Utils/confirmationTokenUtils"
import { preventHardReload } from "Apps/Order2/Utils/navigationGuards"
import {
  AddressFormFields,
  type FormikContextWithAddress,
  addressFormFieldsValidator,
} from "Components/Address/AddressFormFields"
import { type Address, emptyAddress } from "Components/Address/utils"
import { CreateBankDebitSetupForOrder } from "Components/BankDebitForm/Mutations/CreateBankDebitSetupForOrder"
import { type Brand, BrandCreditCardIcon } from "Components/BrandCreditCardIcon"
import { FadeInBox } from "Components/FadeInBox"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { getENV } from "Utils/getENV"
import createLogger from "Utils/logger"
import type {
  Order2PaymentForm_me$data,
  Order2PaymentForm_me$key,
} from "__generated__/Order2PaymentForm_me.graphql"
import type {
  Order2PaymentForm_order$data,
  Order2PaymentForm_order$key,
} from "__generated__/Order2PaymentForm_order.graphql"
import { Formik } from "formik"
import { isEqual } from "lodash"
import type React from "react"
import { useEffect, useState } from "react"
import { graphql, useFragment, useRelayEnvironment } from "react-relay"
import { data as sd } from "sharify"
import * as yup from "yup"

const logger = createLogger("Order2PaymentForm")
const defaultErrorMessage = (
  <>
    Something went wrong. Please try again or contact <MailtoOrderSupport />.
  </>
)

const defaultBillingAddress = {
  ...emptyAddress,
  country: "US",
}

interface Order2PaymentFormProps {
  order: Order2PaymentForm_order$key
  me: Order2PaymentForm_me$key
}

export const Order2PaymentForm: React.FC<Order2PaymentFormProps> = ({
  order,
  me,
}) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const meData = useFragment(ME_FRAGMENT, me)
  const stripe = useStripe()
  const { itemsTotal, seller } = orderData

  if (!itemsTotal) {
    throw new Error("itemsTotal is required")
  }

  const orderOptions: StripeElementsUpdateOptions = {
    amount: itemsTotal.minor,
    currency: itemsTotal.currencyCode.toLowerCase(),
    onBehalfOf: seller?.merchantAccount?.externalId,
  }

  const { theme } = useTheme()

  const options: StripeElementsOptions = {
    mode: "payment",
    appearance: {
      variables: {
        accordionItemSpacing: "10px",
        fontFamily: theme.fonts.sans,
        colorPrimary: theme.colors.mono100, // accordion is selected
        colorTextSecondary: theme.colors.mono100, // accordion is not selected
      },
      rules: {
        ".AccordionItem": {
          lineHeight: "26px",
          fontSize: "16px",
          fontWeight: "normal",
          border: "none",
          backgroundColor: theme.colors.mono5,
        },
        ".AccordionItem--selected": {
          lineHeight: "26px",
          fontSize: "16px",
          fontWeight: "bold",
          border: "1px solid #E7E7E7", // mono10
        },
      },
    },
    ...orderOptions,
  }

  return (
    <Elements stripe={stripe} options={options}>
      <PaymentFormContent order={orderData} me={meData} />
    </Elements>
  )
}

interface PaymentFormContentProps {
  order: Order2PaymentForm_order$data
  me: Order2PaymentForm_me$data
}
const PaymentFormContent: React.FC<PaymentFormContentProps> = ({
  order,
  me,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const environment = useRelayEnvironment()
  const setPaymentMutation = useOrder2SetOrderPaymentMutation()
  // TODO: Update from legacy commerceSetPayment mutation
  const legacySetPaymentMutation = useSetPayment()
  const createBankDebitSetupForOrder = CreateBankDebitSetupForOrder()

  const {
    setConfirmationToken,
    checkoutTracking,
    setSavedPaymentMethod,
    setPaymentComplete,
    setSavePaymentMethod,
    savePaymentMethod,
    steps,
    activeFulfillmentDetailsTab,
  } = useCheckoutContext()

  const [isSubmittingToStripe, setIsSubmittingToStripe] = useState(false)
  const [errorMessage, setErrorMessage] = useState<JSX.Element | string | null>(
    null,
  )
  const [subtitleErrorMessage, setSubtitleErrorMessage] = useState<
    string | null
  >(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    null | "saved" | "stripe-card" | "wire" | "stripe-ach" | "stripe-sepa"
  >(null)
  const [selectedSavedPaymentMethod, setSelectedSavedPaymentMethod] = useState<
    any | null
  >(null)
  const [billingAddressSameAsShipping, setBillingAddressSameAsShipping] =
    useState(true)
  const [billingFormValues, setBillingFormValues] =
    useState<FormikContextWithAddress>(() => ({
      address: defaultBillingAddress,
    }))

  const isSelectedPaymentMethodStripe = selectedPaymentMethod?.match(/^stripe/)
  const savedCreditCards = extractNodes(me.creditCards)
  const hasSavedCreditCards = savedCreditCards.length > 0
  const savedBankAccounts = extractNodes(me.bankAccounts)
  const allowedSavedBankAccounts = savedBankAccounts.filter(bankAccount =>
    order.availablePaymentMethods?.includes(bankAccount.type),
  )
  const hasSavedBankAccounts = allowedSavedBankAccounts.length > 0

  const stepIsActive =
    steps?.find(step => step.name === CheckoutStepName.PAYMENT)?.state ===
    CheckoutStepState.ACTIVE
  const [hasActivatedPaymentStep, setHasActivatedPaymentStep] = useState(false)
  const [wireEmailSubject, setWireEmailSubject] = useState<string | null>(null)
  const [wireEmailBody, setWireEmailBody] = useState<string | null>(null)

  // one-time event after step becomes active and credit cards have loaded if
  // the user has any saved credit cards available
  useEffect(() => {
    if (stepIsActive && !hasActivatedPaymentStep) {
      if (hasSavedCreditCards) {
        checkoutTracking.savedPaymentMethodViewed(["CREDIT_CARD"])
      }
      setHasActivatedPaymentStep(true)
    }
  }, [
    stepIsActive,
    hasActivatedPaymentStep,
    hasSavedCreditCards,
    checkoutTracking,
  ])

  // biome-ignore lint/correctness/useExhaustiveDependencies: one-time effect to default to saved payment method if available
  useEffect(() => {
    if (hasSavedCreditCards || hasSavedBankAccounts) {
      setSelectedPaymentMethod("saved")
      return
    }
  }, [environment])

  if (!(stripe && elements)) {
    return null
  }

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: "accordion",
      spacedAccordionItems: true,
      defaultCollapsed: true,
      radios: false,
    },
    wallets: {
      applePay: "never",
      googlePay: "never",
    },
    business: { name: "Artsy" },
  }

  const onChange = (event: StripePaymentElementChangeEvent) => {
    const { elementType, collapsed, value } = event
    logger.warn("PaymentElement onChange event", { event })

    if (elementType !== "payment" || collapsed) {
      return
    }

    switch (value.type) {
      case "card":
        handleCardPaymentSelect()
        break
      case "sepa_debit":
        handleBankDebitSelect("sepa_debit", "stripe-sepa")
        break
      case "us_bank_account":
        handleBankDebitSelect("us_bank_account", "stripe-ach")
        break
    }
  }

  const handleCardPaymentSelect = () => {
    elements.update({
      captureMethod: "manual",
      setupFutureUsage: "off_session",
      mode: "payment",
    })

    if (selectedPaymentMethod !== "stripe-card") {
      trackPaymentMethodSelection("CREDIT_CARD")
    }

    setSelectedPaymentMethod("stripe-card")
  }

  const handleBankDebitSelect = (
    paymentType: "sepa_debit" | "us_bank_account",
    methodType: "stripe-sepa" | "stripe-ach",
  ) => {
    elements.update({
      captureMethod: "automatic",
      setupFutureUsage: null,
      mode: "setup",
      payment_method_types: [paymentType],
      // @ts-ignore Stripe type issue
      paymentMethodOptions: {
        us_bank_account: { verification_method: "instant" },
      },
    })

    if (selectedPaymentMethod !== methodType) {
      const trackingMethod =
        paymentType === "sepa_debit" ? "SEPA_DEBIT" : "US_BANK_ACCOUNT"
      trackPaymentMethodSelection(trackingMethod)
    }

    setSelectedPaymentMethod(methodType)
  }

  const trackPaymentMethodSelection = (
    paymentMethod:
      | "CREDIT_CARD"
      | "SAVED_CREDIT_CARD"
      | "WIRE_TRANSFER"
      | "US_BANK_ACCOUNT"
      | "SEPA_DEBIT",
  ) => {
    checkoutTracking.clickedPaymentMethod({
      paymentMethod,
      amountMinor: order.itemsTotal?.minor,
      currency: order.itemsTotal?.currencyCode ?? "",
    })
  }

  const onClickSavedPaymentMethods = () => {
    trackPaymentMethodSelection("SAVED_CREDIT_CARD")
    setErrorMessage(null)
    setSelectedPaymentMethod("saved")
    elements?.getElement("payment")?.collapse()
  }

  const onClickWirePaymentMethods = () => {
    trackPaymentMethodSelection("WIRE_TRANSFER")
    setErrorMessage(null)
    setSelectedPaymentMethod("wire")
    setWireEmailSubject(`Wire transfer inquiry (CODE #${order.code})`)
    const artworkInfo =
      order.lineItems[0]?.artwork?.artworkMeta?.share?.slice(10) // Removing "Check out " from the share metadata
    const artworkUrl = sd.APP_URL + order.lineItems[0]?.artwork?.href
    setWireEmailBody(
      `Hello%2C%0D%0AI'm interested in paying by wire transfer and would like some assistance.%0D%0A${artworkInfo} on Artsy: ${artworkUrl}`,
    )
    elements?.getElement("payment")?.collapse()
  }

  const needsBillingAddress = () => {
    if (selectedPaymentMethod !== "stripe-card") return false
    if (activeFulfillmentDetailsTab === "PICKUP") return true
    return !billingAddressSameAsShipping
  }

  const getBillingAddress = (): Address => {
    // For pickup orders, always use the billing form values
    if (activeFulfillmentDetailsTab === "PICKUP") {
      return billingFormValues.address
    }

    // For shipping orders, use shipping address if same as shipping is selected
    if (billingAddressSameAsShipping && order.fulfillmentDetails) {
      return {
        name: order.fulfillmentDetails.name ?? "",
        addressLine1: order.fulfillmentDetails.addressLine1 ?? "",
        addressLine2: order.fulfillmentDetails.addressLine2 ?? "",
        city: order.fulfillmentDetails.city ?? "",
        region: order.fulfillmentDetails.region ?? "",
        postalCode: order.fulfillmentDetails.postalCode ?? "",
        country: order.fulfillmentDetails.country ?? "",
      }
    }

    return billingFormValues.address
  }

  const handleBillingAddressSameAsShippingChange = (selected: boolean) => {
    setBillingAddressSameAsShipping(selected)
    if (!selected) {
      setBillingFormValues({
        address: defaultBillingAddress,
      })
    }
  }

  const getPaymentMethodFromSavedPayment = (savedPaymentMethod: any) => {
    if (savedPaymentMethod?.__typename === "CreditCard") {
      return "CREDIT_CARD"
    }
    if (savedPaymentMethod?.type === "US_BANK_ACCOUNT") {
      return "US_BANK_ACCOUNT"
    }
    if (savedPaymentMethod?.type === "SEPA_DEBIT") {
      return "SEPA_DEBIT"
    }
    throw new Error(
      "Could not determine mutation payment method from saved payment method chosen.",
    )
  }

  const handleBankDebitSetup = async (
    paymentMethod: "US_BANK_ACCOUNT" | "SEPA_DEBIT",
    confirmationToken: { id: string },
  ) => {
    const updateOrderPaymentMethodResult =
      await setPaymentMutation.submitMutation({
        variables: {
          input: {
            id: order.internalID,
            paymentMethod,
            stripeConfirmationToken: confirmationToken.id,
          },
        },
      })

    validateAndExtractOrderResponse(
      updateOrderPaymentMethodResult.updateOrder?.orderOrError,
    )

    // Creating a SetupIntent
    const bankDebitSetupResult =
      await createBankDebitSetupForOrder.submitMutation({
        variables: { input: { id: order.internalID } },
      })

    if (
      bankDebitSetupResult.commerceCreateBankDebitSetupForOrder?.actionOrError
        .__typename === "CommerceOrderRequiresAction"
    ) {
      const return_url = `${getENV("APP_URL")}/orders2/${
        order.internalID
      }/checkout?save_bank_account=${savePaymentMethod}&confirmation_token=${confirmationToken.id}`
      window.removeEventListener("beforeunload", preventHardReload)

      // This will redirect to Stripe for bank verification, no code after this will execute
      // src/Apps/Order2/Routes/Checkout/Hooks/useStripePaymentBySetupIntentId.tsx will handle the post redirect logic
      const { error } = await stripe.confirmSetup({
        elements,
        clientSecret:
          bankDebitSetupResult.commerceCreateBankDebitSetupForOrder
            ?.actionOrError?.actionData?.clientSecret,
        confirmParams: {
          return_url,
        },
      })

      if (error) {
        handleError({ message: defaultErrorMessage })
      }
    }
  }

  const handleError = (error: { message?: string | JSX.Element }) => {
    setErrorMessage(error.message || defaultErrorMessage)
    setIsSubmittingToStripe(false)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    if (!selectedPaymentMethod) {
      setSubtitleErrorMessage("Select a payment method")
      return
    }

    if (needsBillingAddress()) {
      const billingAddr = getBillingAddress()
      if (!billingAddr.name || !billingAddr.addressLine1 || !billingAddr.city) {
        setSubtitleErrorMessage(
          "Please fill in required billing address fields",
        )
        return
      }
    }

    checkoutTracking.clickedOrderProgression(ContextModule.ordersPayment)

    if (isSelectedPaymentMethodStripe) {
      setIsSubmittingToStripe(true)

      const { error: submitError } = await elements.submit()
      if (submitError) {
        logger.error(submitError)
        handleError(submitError)
        return
      }

      const billingAddress = getBillingAddress()
      const { error, confirmationToken } = await stripe.createConfirmationToken(
        {
          elements,
          ...(selectedPaymentMethod === "stripe-card" && {
            params: {
              payment_method_data: {
                billing_details: {
                  name: billingAddress.name,
                  address: {
                    line1: billingAddress.addressLine1,
                    line2: billingAddress.addressLine2,
                    city: billingAddress.city,
                    state: billingAddress.region,
                    postal_code: billingAddress.postalCode,
                    country: billingAddress.country,
                  },
                },
              },
            },
          }),
        },
      )

      if (error) {
        logger.error(error)
        handleError(error)
        return
      }

      const response = await fetchAndSetConfirmationToken(
        confirmationToken.id,
        environment,
        setConfirmationToken,
      )

      setSavePaymentMethod(savePaymentMethod)

      if (!response) {
        handleError({ message: defaultErrorMessage })
        return
      }

      if (selectedPaymentMethod === "stripe-card") {
        try {
          const updateOrderPaymentMethodResult =
            await setPaymentMutation.submitMutation({
              variables: {
                input: {
                  id: order.internalID,
                  paymentMethod: "CREDIT_CARD",
                  stripeConfirmationToken: confirmationToken.id,
                },
              },
            })

          validateAndExtractOrderResponse(
            updateOrderPaymentMethodResult.updateOrder?.orderOrError,
          )
        } catch (error) {
          logger.error("Error while updating order payment method", error)
          handleError({ message: defaultErrorMessage })
        } finally {
          setPaymentComplete()
          setIsSubmittingToStripe(false)
        }
      } else if (selectedPaymentMethod === "stripe-ach") {
        try {
          await handleBankDebitSetup("US_BANK_ACCOUNT", confirmationToken)
        } catch (error) {
          handleError({ message: defaultErrorMessage })
        }
      } else if (selectedPaymentMethod === "stripe-sepa") {
        try {
          await handleBankDebitSetup("SEPA_DEBIT", confirmationToken)
        } catch (error) {
          handleError({ message: defaultErrorMessage })
        }
      }
    }

    if (selectedPaymentMethod === "wire") {
      setIsSubmittingToStripe(true)

      try {
        const result = await legacySetPaymentMutation.submitMutation({
          variables: {
            input: {
              id: order.internalID,
              paymentMethod: "WIRE_TRANSFER",
            },
          },
        })

        if (
          result?.commerceSetPayment?.orderOrError?.error ||
          !result?.commerceSetPayment?.orderOrError?.order
        ) {
          throw (
            result?.commerceSetPayment?.orderOrError.error ||
            new Error("Failed to set payment method")
          )
        }
      } catch (error) {
        logger.error("Error while updating order payment method", error)
        handleError({ message: defaultErrorMessage })
      } finally {
        setIsSubmittingToStripe(false)
        // Resets for the PaymentCompletedView
        setSavedPaymentMethod({ savedPaymentMethod: null })
        setConfirmationToken({ confirmationToken: null })
        setPaymentComplete()
      }
    }

    if (selectedPaymentMethod === "saved") {
      if (!selectedSavedPaymentMethod) {
        setSubtitleErrorMessage("Select a saved payment method")
        return
      }

      setIsSubmittingToStripe(true)

      try {
        const paymentMethod = getPaymentMethodFromSavedPayment(
          selectedSavedPaymentMethod,
        )
        const result = await legacySetPaymentMutation.submitMutation({
          variables: {
            input: {
              id: order.internalID,
              paymentMethod: paymentMethod,
              paymentMethodId: selectedSavedPaymentMethod?.internalID,
              // Note: paymentMethodId is not supported in updateOrder mutation
              // Saved credit card functionality may need a different approach
            },
          },
        })

        if (
          result?.commerceSetPayment?.orderOrError?.error ||
          !result?.commerceSetPayment?.orderOrError?.order
        ) {
          throw (
            result?.commerceSetPayment?.orderOrError.error ||
            new Error("Failed to set payment method")
          )
        }
      } catch (error) {
        logger.error("Error while updating order payment method", error)
        handleError({ message: defaultErrorMessage })
      } finally {
        setIsSubmittingToStripe(false)
        setSavedPaymentMethod({
          savedPaymentMethod: selectedSavedPaymentMethod,
        })
        setPaymentComplete()
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {subtitleErrorMessage && !selectedPaymentMethod && (
        <Text variant="xs" color="red100" mb={2}>
          {subtitleErrorMessage}
        </Text>
      )}
      {/* Stripe error messages are displayed within the Payment Element, so we don't need to handle them here. */}
      {errorMessage && !isSelectedPaymentMethodStripe && (
        <>
          <Spacer y={2} />
          <CheckoutErrorBanner error={{ message: errorMessage }} />
          <Spacer y={2} />
        </>
      )}
      <Spacer y={2} />
      {(hasSavedCreditCards || hasSavedBankAccounts) && (
        <FadeInBox>
          <Box
            backgroundColor="mono5"
            borderRadius="5px"
            padding="1rem"
            marginBottom="10px"
            style={{ cursor: "pointer" }}
            onClick={onClickSavedPaymentMethods}
          >
            <Flex alignItems="center">
              <LockIcon fill="mono100" />
              {/* Spacer has to be 31px to match Stripe's spacing */}
              <Spacer x="31px" />
              <Text
                variant="sm"
                color="mono100"
                fontWeight={
                  selectedPaymentMethod === "saved" ? "bold" : "normal"
                }
              >
                Saved payments
              </Text>
            </Flex>
            <Collapse open={selectedPaymentMethod === "saved"}>
              <Text variant="sm" ml="50px">
                Select a saved payment method or add a new one.
              </Text>
              <Box ml="50px">
                <RadioGroup
                  defaultValue={selectedSavedPaymentMethod}
                  onSelect={val => {
                    setSelectedSavedPaymentMethod(val)
                  }}
                >
                  {[...savedCreditCards, ...allowedSavedBankAccounts].map(
                    paymentMethod => (
                      <Radio
                        key={paymentMethod.internalID}
                        value={paymentMethod}
                        pb="15px"
                        pt="15px"
                        label={
                          <Flex>
                            {paymentMethod.__typename === "CreditCard" ? (
                              <>
                                <BrandCreditCardIcon
                                  type={paymentMethod.brand as Brand}
                                  width="24px"
                                  height="24px"
                                  mr={1}
                                />
                                <Text variant="sm">
                                  •••• {paymentMethod.lastDigits}
                                </Text>
                              </>
                            ) : (
                              <>
                                <InstitutionIcon
                                  fill="mono100"
                                  width={["18px", "26px"]}
                                  height={["18px", "26px"]}
                                  mr={1}
                                />
                                <Text
                                  variant={["xs", "sm-display"]}
                                  mt={["0px", "3px"]}
                                >
                                  Bank account •••• {paymentMethod.last4}
                                </Text>
                              </>
                            )}
                          </Flex>
                        }
                      />
                    ),
                  )}
                </RadioGroup>
              </Box>
            </Collapse>
          </Box>
        </FadeInBox>
      )}
      <PaymentElement options={paymentElementOptions} onChange={onChange} />
      <Spacer y={1} />
      {order.availablePaymentMethods?.includes("WIRE_TRANSFER") && (
        <FadeInBox>
          <Box
            backgroundColor="mono5"
            borderRadius="5px"
            padding="1rem"
            marginBottom="10px"
            style={{ cursor: "pointer" }}
            onClick={onClickWirePaymentMethods}
            data-testid={"PaymentFormWire"}
          >
            <Flex alignItems="center">
              <ReceiptIcon fill="mono100" />
              {/* Spacer has to be 31px to match Stripe's spacing */}
              <Spacer x="31px" />
              <Text
                variant="sm"
                color="mono100"
                fontWeight={
                  selectedPaymentMethod === "wire" ? "bold" : "normal"
                }
              >
                Wire Transfer
              </Text>
            </Flex>
            <Collapse open={selectedPaymentMethod === "wire"}>
              <Text color="mono100" variant="sm" ml="50px" mb={1}>
                To pay by wire transfer, complete checkout and a member of the
                Artsy team will contact you with next steps by email.
              </Text>
              <Text color="mono100" variant="sm" ml="50px" mb={1}>
                Please inform your bank that you will be responsible for all
                wire transfer fees.
              </Text>
              <Text color="mono100" variant="sm" ml="50px">
                You can contact{" "}
                <RouterLink
                  inline
                  to={`mailto:orders@artsy.net?subject=${wireEmailSubject}&body=${wireEmailBody}`}
                >
                  orders@artsy.net
                </RouterLink>{" "}
                with any questions.
              </Text>
            </Collapse>
          </Box>
        </FadeInBox>
      )}

      <Collapse
        open={selectedPaymentMethod === "stripe-card"}
        data-testid="stripe-card-collapse"
      >
        <Box p={2}>
          {activeFulfillmentDetailsTab !== "PICKUP" && (
            <>
              <Checkbox
                selected={billingAddressSameAsShipping}
                onSelect={handleBillingAddressSameAsShippingChange}
                data-testid="billing-address-same-as-shipping"
              >
                Billing address same as shipping
              </Checkbox>

              <Spacer y={2} />
            </>
          )}

          <Checkbox
            selected={savePaymentMethod}
            onSelect={setSavePaymentMethod}
          >
            Save credit card for later use
          </Checkbox>

          {needsBillingAddress() && (
            <>
              <Spacer y={4} />
              <Text variant="sm" fontWeight="bold" mb={2}>
                Billing address
              </Text>
              <Formik
                initialValues={billingFormValues}
                validationSchema={yup
                  .object()
                  .shape(addressFormFieldsValidator())}
                onSubmit={(values: FormikContextWithAddress) => {
                  setBillingFormValues(values)
                }}
                enableReinitialize
              >
                {({ values }) => {
                  if (!isEqual(values, billingFormValues)) {
                    setBillingFormValues(values)
                  }

                  return <AddressFormFields />
                }}
              </Formik>
            </>
          )}
        </Box>
      </Collapse>

      <Collapse
        open={
          selectedPaymentMethod === "stripe-ach" ||
          selectedPaymentMethod === "stripe-sepa"
        }
      >
        <Box p={2}>
          <Flex>
            <Checkbox
              selected={savePaymentMethod}
              onSelect={setSavePaymentMethod}
            >
              Save bank account for later use.
            </Checkbox>

            <Tooltip
              placement="top-start"
              width={400}
              content={`Thank you for signing up for direct debits from Artsy. You
                    have authorized Artsy and, if applicable, its affiliated
                    entities to debit the bank account specified above, on behalf
                    of sellers that use the Artsy website, for any amount owed for
                    your purchase of artworks from such sellers, according to
                    Artsy’s website and terms. You can change or cancel this
                    authorization at any time by providing Artsy with 30 (thirty)
                    days’ notice. By clicking “Save bank account for later use”,
                    you authorize Artsy to save the bank account specified above.`}
            >
              <Clickable ml={0.5} style={{ lineHeight: 0 }}>
                <InfoIcon />
              </Clickable>
            </Tooltip>
          </Flex>
        </Box>
      </Collapse>

      <Spacer y={2} />
      {/* Stripe error messages are displayed within the Payment Element, so we don't need to handle them here. */}
      {errorMessage && !isSelectedPaymentMethodStripe && (
        <>
          <CheckoutErrorBanner error={{ message: errorMessage }} />
          <Spacer y={4} />
        </>
      )}
      <Button
        loading={isSubmittingToStripe}
        variant="primaryBlack"
        width="100%"
        type="submit"
      >
        Continue to Review
      </Button>
    </form>
  )
}

const ME_FRAGMENT = graphql`
  fragment Order2PaymentForm_me on Me {
    creditCards(first: 10) {
      edges {
        node {
          __typename
          internalID
          brand
          lastDigits
        }
      }
    }
    bankAccounts(first: 10) {
      edges {
        node {
          __typename
          type
          internalID
          last4
        }
      }
    }
  }
`

const ORDER_FRAGMENT = graphql`
  fragment Order2PaymentForm_order on Order {
    code
    mode
    source
    internalID
    availablePaymentMethods
    itemsTotal {
      minor
      currencyCode
    }
    seller {
      ... on Partner {
        merchantAccount {
          externalId
        }
      }
    }
    fulfillmentDetails {
      name
      addressLine1
      addressLine2
      city
      region
      postalCode
      country
    }
    lineItems {
      artwork {
        href
        artworkMeta: meta {
          share
        }
      }
    }
  }
`
