import { Elements, useElements, PaymentElement } from "@stripe/react-stripe-js"
import {
  type StripeElementsOptions,
  type StripeElementsUpdateOptions,
  type StripePaymentElementOptions,
  loadStripe,
} from "@stripe/stripe-js"
import { Box, Text, Spacer } from "@artsy/palette"
import { useState } from "react"
import { FadeInBox } from "Components/FadeInBox"
import { Collapse } from "Apps/Order/Components/Collapse"
import { getENV } from "Utils/getENV"

const stripePromise = loadStripe(getENV("STRIPE_PUBLISHABLE_KEY"))

export const PaymentForm = () => {
  const orderOptions: StripeElementsUpdateOptions = {
    amount: 12345,
    currency: "eur",
    // onBehalfOf: "acct_14FIYS4fSw9JrcJy", // US
    onBehalfOf: "acct_1KMqw0A6DHSUKBik", // DE
  }

  const options: StripeElementsOptions = {
    mode: "payment",
    appearance: {
      variables: {
        accordionItemSpacing: "10px",
      },
      rules: {
        ".AccordionItem": {
          border: "none",
          backgroundColor: "#EFEFEF",
        },
        ".AccordionItem:focus-visible": {
          border: "1px solid black",
        },
        ".AccordionItem--selected": {
          border: "1px solid black",
        },
      },
    },
    ...orderOptions,
  }

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentFormContent />
    </Elements>
  )
}

const PaymentFormContent = () => {
  const elements = useElements()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("new")

  const paymentElementOptions: StripePaymentElementOptions = {
    layout: {
      type: "accordion",
      spacedAccordionItems: true,
      defaultCollapsed: true,
      radios: false,
    },
  }

  const onChange = event => {
    const { elementType, collapsed } = event
    if (elementType === "payment" && !collapsed) {
      setSelectedPaymentMethod("new")
    }
  }

  const onReady = event => {
    console.log(event.getValue())
  }

  const onClickSavedPaymentMethods = () => {
    setSelectedPaymentMethod("saved")
    elements?.getElement("payment")?.collapse()
  }

  const onClickWirePaymentMethods = () => {
    setSelectedPaymentMethod("wire")
    elements?.getElement("payment")?.collapse()
  }

  return (
    <form>
      <FadeInBox>
        <Box
          backgroundColor="#EFEFEF"
          borderRadius="5px"
          padding="1rem"
          marginBottom="10px"
          style={{ cursor: "pointer" }}
          onClick={onClickSavedPaymentMethods}
        >
          <Text>Saved Payment Methods</Text>
          <Collapse open={selectedPaymentMethod === "saved"}>
            <Text variant="sm" p="10px">
              Visa ....1234
            </Text>
            <Text variant="sm" p="10px">
              Visa ....5678
            </Text>
          </Collapse>
        </Box>
      </FadeInBox>

      <PaymentElement
        options={paymentElementOptions}
        onChange={onChange}
        onReady={onReady}
      />

      <Spacer y={1} />
      <FadeInBox>
        <Box
          backgroundColor="#EFEFEF"
          borderRadius="5px"
          padding="1rem"
          marginBottom="10px"
          style={{ cursor: "pointer" }}
          onClick={onClickWirePaymentMethods}
        >
          <Text>Wire Transfer</Text>
          <Collapse open={selectedPaymentMethod === "wire"}>
            <Text color="black60" variant="sm">
              <ul
                style={{
                  paddingLeft: "2rem",
                  margin: "1rem 0",
                  listStyle: "disc",
                }}
              >
                <li>
                  To pay by wire transfer, complete checkout to view banking
                  details and wire transfer instructions.
                </li>
                <li>
                  Please inform your bank that you will be responsible for all
                  wire transfer fees.
                </li>
              </ul>
            </Text>
          </Collapse>
        </Box>
      </FadeInBox>
      <Spacer y={2} />
    </form>
  )
}
