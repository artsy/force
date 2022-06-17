import { FC, useEffect, useState } from "react"
import { Appearance, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { getENV } from "v2/Utils/getENV"
import { BankDebitForm } from "./BankDebitForm"
import { CreateBankDebitSetupForOrder } from "./Mutations/CreateBankDebitSetupForOrder"
import { Payment_order } from "v2/__generated__/Payment_order.graphql"

interface Props {
  order: Payment_order
  isUserHasEnoughFunds: boolean
}

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

export const BankDebitProvider: FC<Props> = ({
  order,
  isUserHasEnoughFunds,
}) => {
  const [clientSecret, setClientSecret] = useState("")
  const { submitMutation } = CreateBankDebitSetupForOrder()

  useEffect(() => {
    const fetchData = async () => {
      const data = await submitMutation({
        variables: { input: { id: order.internalID } },
      })

      if (
        data.commerceCreateBankDebitSetupForOrder?.actionOrError.__typename ===
        "CommerceOrderRequiresAction"
      ) {
        setClientSecret(
          data.commerceCreateBankDebitSetupForOrder?.actionOrError?.actionData
            .clientSecret
        )
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
            isUserHasEnoughFunds={isUserHasEnoughFunds}
          />
        </Elements>
      )}
    </div>
  )
}
