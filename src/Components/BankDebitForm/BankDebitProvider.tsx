import { FC, useEffect, useState } from "react"
import { Appearance, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { getENV } from "Utils/getENV"
import { BankDebitForm } from "./BankDebitForm"
import { CreateBankDebitSetupForOrder } from "./Mutations/CreateBankDebitSetupForOrder"
import { BankAccountPicker_order } from "__generated__/BankAccountPicker_order.graphql"
import createLogger from "Utils/logger"
import {
  CommercePaymentMethodEnum,
  Payment_order,
} from "__generated__/Payment_order.graphql"
import { Box, Message, Spacer, Text } from "@artsy/palette"
import { LoadingArea } from "../LoadingArea"

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

const logger = createLogger("Order/Routes/Payment/index.tsx")

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
      <Spacer mt={2} />
    </>
  )
}

interface Props {
  order: BankAccountPicker_order | Payment_order
  paymentMethod: CommercePaymentMethodEnum
  bankAccountHasInsufficientFunds: boolean
  onSetBankAccountHasInsufficientFunds: (arg: boolean) => void
  onSetIsSavingPayment: (arg: boolean) => void
  onSetClientSecret: (arg: string) => void
  clientSecret: string | null
}

export const BankDebitProvider: FC<Props> = ({
  order,
  paymentMethod,
  bankAccountHasInsufficientFunds,
  onSetBankAccountHasInsufficientFunds,
  onSetIsSavingPayment,
  onSetClientSecret,
  clientSecret,
}) => {
  const [bankDebitSetupError, setBankDebitSetupError] = useState(false)
  const [isPaymentElementLoading, setIsPaymentElementLoading] = useState(true)
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
          onSetClientSecret(
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
        logger.error(error)
      }
    }

    if (!clientSecret) {
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
    },
  }

  const options = {
    clientSecret: clientSecret || "",
    appearance: appearance,
  }

  return (
    <div data-test={`${paymentMethod}_PaymentSection`}>
      <LoadingArea isLoading={isPaymentElementLoading}>
        {isPaymentElementLoading && <Box height={300}></Box>}
        <Spacer mt={2} />
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <BankDebitForm
              order={order}
              paymentMethod={paymentMethod}
              bankAccountHasInsufficientFunds={bankAccountHasInsufficientFunds}
              onSetBankAccountHasInsufficientFunds={
                onSetBankAccountHasInsufficientFunds
              }
              onSetIsSavingPayment={onSetIsSavingPayment}
              onSetIsPaymentElementLoading={setIsPaymentElementLoading}
            />
          </Elements>
        )}
        {bankDebitSetupError && <BankSetupErrorMessage />}
      </LoadingArea>
    </div>
  )
}
