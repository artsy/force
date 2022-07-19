import { FC, useEffect, useState } from "react"
import { Appearance, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { getENV } from "v2/Utils/getENV"
import { BankDebitForm } from "./BankDebitForm"
import { CreateBankDebitSetupForOrder } from "./Mutations/CreateBankDebitSetupForOrder"
import { BankAccountPicker_order } from "v2/__generated__/BankAccountPicker_order.graphql"
import createLogger from "v2/Utils/logger"
import { Message, Spacer, Text } from "@artsy/palette"

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
  order: BankAccountPicker_order
  bankAccountHasInsufficientFunds: boolean
}

export const BankDebitProvider: FC<Props> = ({
  order,
  bankAccountHasInsufficientFunds,
}) => {
  const [clientSecret, setClientSecret] = useState("")
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
          setClientSecret(
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

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const appearance: Appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#000",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      borderRadius: "0px",
    },
    rules: {
      ".Label": {
        textTransform: "uppercase",
      },
    },
  }

  const options = {
    clientSecret: clientSecret,
    appearance: appearance,
  }

  const returnURL = `${getENV("APP_URL")}/orders/${order.internalID}/payment`

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <BankDebitForm
            order={order}
            returnURL={returnURL}
            bankAccountHasInsufficientFunds={bankAccountHasInsufficientFunds}
          />
        </Elements>
      )}
      {bankDebitSetupError && <BankSetupErrorMessage />}
    </div>
  )
}
