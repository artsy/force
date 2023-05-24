import { FC, useEffect, useState } from "react"
import { Appearance, loadStripe, StripeError } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { getENV } from "Utils/getENV"
import { BankDebitForm } from "./BankDebitForm"
import { CreateBankDebitSetupForOrder } from "./Mutations/CreateBankDebitSetupForOrder"
import { BankAccountPicker_order$data } from "__generated__/BankAccountPicker_order.graphql"
import { Payment_order$data } from "__generated__/Payment_order.graphql"
import { Box, Message, Spacer, Text, THEME } from "@artsy/palette"
import { LoadingArea } from "Components/LoadingArea"
import { camelCase, upperFirst } from "lodash"
import { useOrderPaymentContext } from "Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

const BankSetupErrorMessage = () => {
  return (
    <>
      <Message
        title="Bank transfer is not available at the moment"
        variant="error"
      >
        <Text variant="sm">
          Refresh the page or select another payment method.
        </Text>
      </Message>
      <Spacer y={2} />
    </>
  )
}

interface Props {
  order: BankAccountPicker_order$data | Payment_order$data
  onError: (error: Error | StripeError) => void
}

export const BankDebitProvider: FC<Props> = ({ order, onError }) => {
  const {
    selectedPaymentMethod,
    stripeClient,
    isStripePaymentElementLoading,
    setStripeClient,
  } = useOrderPaymentContext()

  const [bankDebitSetupError, setBankDebitSetupError] = useState(false)
  const { submitMutation } = CreateBankDebitSetupForOrder()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderOrError = await submitMutation({
          variables: { input: { id: order.internalID } },
        })

        if (
          orderOrError.commerceCreateBankDebitSetupForOrder?.actionOrError
            .__typename === "CommerceOrderRequiresAction"
        ) {
          setStripeClient(
            orderOrError.commerceCreateBankDebitSetupForOrder?.actionOrError
              .actionData.clientSecret
          )
        }

        if (
          orderOrError.commerceCreateBankDebitSetupForOrder?.actionOrError
            .__typename === "CommerceOrderWithMutationFailure"
        ) {
          throw orderOrError.commerceCreateBankDebitSetupForOrder?.actionOrError
            .error
        }
      } catch (error) {
        setBankDebitSetupError(true)
        onError(error)
      }
    }

    if (!stripeClient) {
      fetchData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const appearance: Appearance = {
    theme: "stripe",
    labels: "floating",
    variables: {
      colorPrimary: THEME.colors.black100,
      colorBackground: THEME.colors.white100,
      colorText: THEME.colors.black100,
      colorIcon: THEME.colors.black60,
      colorDanger: THEME.colors.red100,
      fontFamily: THEME.fonts.sans,
      borderRadius: "3px",
    },
    rules: {
      ".Label": {
        fontSize: THEME.textVariants.xs.fontSize, // "13px",
        lineHeight: THEME.textVariants.xs.lineHeight, // "20px",
        color: THEME.colors.black100,
      },
      ".Label--resting": {
        color: THEME.colors.black60,
      },
      ".Label--floating": {
        color: THEME.colors.black100,
      },
      ".Input": {
        border: `1px solid ${THEME.colors.black30}`,
        transition: "border-color 0.25s",
        boxShadow: "none",
        paddingTop: "12px",
        lineHeight: THEME.textVariants["sm-display"].lineHeight, // "20px",
        marginBottom: THEME.space["1"], // "10px"
        color: THEME.colors.black100,
      },
      ".Input--empty": {
        color: THEME.colors.black60,
      },
      ".Input:focus": {
        boxShadow: "none",
        color: THEME.colors.black100,
        borderColor: THEME.colors.blue100,
      },
      ".Input:hover": {
        color: THEME.colors.black100,
        borderColor: THEME.colors.black60,
      },
      ".Input--invalid": {
        border: `1px solid ${THEME.colors.red100}`,
        color: THEME.colors.black100,
        boxShadow: "none",
      },
      ".Input:autofill": {
        backgroundColor: THEME.colors.white100,
      },
      ".TermsText": {
        fontSize: THEME.textVariants.xs.fontSize, // "13px",
        lineHeight: THEME.textVariants.xs.lineHeight, // "20px",
      },
    },
  }

  const options = {
    clientSecret: stripeClient || "",
    appearance: appearance,
  }

  return (
    <div
      data-test={`paymentSection${upperFirst(
        camelCase(selectedPaymentMethod)
      )}`}
    >
      <LoadingArea
        isLoading={isStripePaymentElementLoading && !bankDebitSetupError}
      >
        {isStripePaymentElementLoading && !bankDebitSetupError && (
          <Box height={300}></Box>
        )}
        <Spacer y={2} />
        {stripeClient && (
          <Elements options={options} stripe={stripePromise}>
            <BankDebitForm order={order} onError={onError} />
          </Elements>
        )}
      </LoadingArea>
      {bankDebitSetupError && <BankSetupErrorMessage />}
    </div>
  )
}
