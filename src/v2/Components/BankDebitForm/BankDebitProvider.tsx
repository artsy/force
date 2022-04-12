import { FC, useEffect, useState } from "react"
import { Appearance, loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { getENV } from "v2/Utils/getENV"
import { commitMutation, graphql } from "relay-runtime"
import { createBankDebitSetupMutation } from "v2/__generated__/createBankDebitSetupMutation.graphql"
import { useSystemContext } from "v2/System"

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"), {
  betas: ["us_bank_account_beta_2"],
})

export const BankDebitProvider: FC = ({ children }) => {
  const { relayEnvironment } = useSystemContext()
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    // Create SetupIntent as soon as the page loads
    commitMutation<createBankDebitSetupMutation>(relayEnvironment!, {
      mutation: graphql`
        mutation createBankDebitSetupMutation(
          $input: CreateBankDebitSetupInput!
        ) {
          createBankDebitSetup(input: $input) {
            clientSecret
          }
        }
      `,
      variables: {
        input: {
          clientMutationId: "create-bank-debit-setup",
          paymentMethodTypes: ["us_bank_account"],
        },
      },
      onCompleted: response => {
        setClientSecret(response.createBankDebitSetup!.clientSecret)
      },
      onError: error => {
        console.log("error", error)
      },
    })
  }, [relayEnvironment])

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
    terms: {
      usBankAccount: "never",
    },
    fields: {
      billingDetails: "never",
    },
  }

  return (
    clientSecret && (
      <Elements options={options} stripe={stripePromise}>
        {children}
      </Elements>
    )
  )
}
