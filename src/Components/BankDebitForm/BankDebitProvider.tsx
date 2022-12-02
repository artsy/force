import { FC, useEffect, useState } from "react"
import { Appearance, loadStripe, StripeError } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { getENV } from "Utils/getENV"
import { BankDebitForm } from "./BankDebitForm"
import { CreateBankDebitSetupForOrder } from "./Mutations/CreateBankDebitSetupForOrder"
import { BankAccountPicker_order$data } from "__generated__/BankAccountPicker_order.graphql"
import { Payment_order$data } from "__generated__/Payment_order.graphql"
import { Box, Message, Spacer, Text } from "@artsy/palette"
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
    variables: {
      colorPrimary: "#000",
      colorBackground: "#ffffff",
      colorText: "#707070",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      borderRadius: "0px",
    },
    rules: {
      ".Label": {
        fontSize: "13.5px",
        lineHeight: "20px",
        fontFamily: "Helvetica, sans-serif",
        color: "#000",
      },
      ".Input": {
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "1px solid #C2C2C2",
        transition: "border-color 0.25s",
        boxShadow: "none",
        paddingTop: "12px",
        lineHeight: "26px",
        marginBottom: "10px",
      },
      ".Input:focus": {
        boxShadow: "none",
        color: "#000",
      },
      ".Input:hover": {
        color: "#000",
        borderColor: "#707070",
      },
      ".Input--invalid": {
        borderTop: "none",
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "1px solid #C82400",
        color: "#000",
        boxShadow: "none",
      },
      ".TermsText": {
        fontSize: "13px",
        lineHeight: "20px",
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
      <LoadingArea isLoading={isStripePaymentElementLoading}>
        {isStripePaymentElementLoading && <Box height={300}></Box>}
        <Spacer y={2} />
        {stripeClient && (
          <Elements options={options} stripe={stripePromise}>
            <BankDebitForm order={order} onError={onError} />
          </Elements>
        )}
        {bankDebitSetupError && <BankSetupErrorMessage />}
      </LoadingArea>
    </div>
  )
}
