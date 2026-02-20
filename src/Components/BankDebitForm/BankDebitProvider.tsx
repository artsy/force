import { Box, Message, Spacer, Text, useTheme } from "@artsy/palette"
import { Elements } from "@stripe/react-stripe-js"
import {
  type Appearance,
  type StripeError,
  loadStripe,
} from "@stripe/stripe-js"
import { useOrderPaymentContext } from "Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"
import { LoadingArea } from "Components/LoadingArea"
import { getENV } from "Utils/getENV"
import type { BankAccountPicker_order$data } from "__generated__/BankAccountPicker_order.graphql"
import type { Payment_order$data } from "__generated__/Payment_order.graphql"
import camelCase from "lodash/camelCase"
import upperFirst from "lodash/upperFirst"
import { type FC, useEffect, useState } from "react"
import { BankDebitForm } from "./BankDebitForm"
import { CreateBankDebitSetupForOrder } from "./Mutations/CreateBankDebitSetupForOrder"

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

export const BankDebitProvider: FC<React.PropsWithChildren<Props>> = ({
  order,
  onError,
}) => {
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
              .actionData.clientSecret,
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
  }, [])

  const { theme } = useTheme()

  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: theme.colors.mono100,
      colorBackground: theme.colors.mono0,
      colorText: theme.colors.mono100,
      colorIcon: theme.colors.mono60,
      colorDanger: theme.colors.red100,
      fontFamily: theme.fonts.sans,
      borderRadius: "3px",
    },
    rules: {
      ".Label": {
        fontSize: theme.textVariants.xs.fontSize, // "13px",
        lineHeight: theme.textVariants.xs.lineHeight, // "20px",
        color: theme.colors.mono100,
      },
      ".Label--resting": {
        color: theme.colors.mono60,
      },
      ".Label--floating": {
        color: theme.colors.mono100,
      },
      ".Input": {
        border: `1px solid ${theme.colors.mono30}`,
        transition: "border-color 0.25s",
        boxShadow: "none",
        paddingTop: "12px",
        lineHeight: theme.textVariants["sm-display"].lineHeight, // "20px",
        marginBottom: theme.space["1"], // "10px"
        color: theme.colors.mono100,
      },
      ".Input--empty": {
        color: theme.colors.mono60,
      },
      ".Input:focus": {
        boxShadow: "none",
        color: theme.colors.mono100,
        borderColor: theme.colors.blue100,
      },
      ".Input:hover": {
        color: theme.colors.mono100,
        borderColor: theme.colors.mono60,
      },
      ".Input--invalid": {
        border: `1px solid ${theme.colors.red100}`,
        color: theme.colors.mono100,
        boxShadow: "none",
      },
      ".Input:autofill": {
        backgroundColor: theme.colors.mono0,
      },
      ".TermsText": {
        fontSize: theme.textVariants.xs.fontSize, // "13px",
        lineHeight: theme.textVariants.xs.lineHeight, // "20px",
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
        camelCase(selectedPaymentMethod),
      )}`}
    >
      <LoadingArea
        isLoading={isStripePaymentElementLoading && !bankDebitSetupError}
      >
        {isStripePaymentElementLoading && !bankDebitSetupError && (
          <Box height={300} />
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
