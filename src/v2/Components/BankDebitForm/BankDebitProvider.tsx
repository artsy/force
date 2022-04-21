import { FC, useEffect, useState } from "react"
import { Appearance, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { getENV } from "v2/Utils/getENV"
import { BankDebitForm } from "./BankDebitForm"
import { CreateBankDebitSetupForOrder } from "./createBankDebitSetupForOrder"
import { Payment_order } from "v2/__generated__/Payment_order.graphql"
interface Props {
  order: Payment_order
}

export const BankDebitProvider: FC<Props> = ({ order }) => {
  const [clientSecret, setClientSecret] = useState("")
  const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"), {
    betas: ["us_bank_account_beta_2"],
  })

  const { submitMutation } = CreateBankDebitSetupForOrder()

  useEffect(() => {
    submitMutation({
      variables: { input: { id: order.internalID } },
      rejectIf: res => {
        return res.commerceCreateBankDebitSetupForOrder?.actionOrError
          .error?.[0].message
      },
    }).then(res => {
      setClientSecret(
        res.commerceCreateBankDebitSetupForOrder?.actionOrError.actionData
          .clientSecret
      )
    })
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

  return (
    <div>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <BankDebitForm />
        </Elements>
      )}
    </div>
  )
}
