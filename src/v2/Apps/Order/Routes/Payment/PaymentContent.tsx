import { FC, RefObject, useState } from "react"
import {
  Button,
  Flex,
  Spacer,
  BorderedRadio,
  RadioGroup,
  Text,
  Collapse,
  Clickable,
} from "@artsy/palette"
import {
  PaymentPicker,
  PaymentPickerFragmentContainer,
} from "../../Components/PaymentPicker"
import { Media } from "v2/Utils/Responsive"
import { BankDebitProvider } from "v2/Components/BankDebitForm/BankDebitProvider"
import { ContinueButton } from "./index"
import { Payment_me } from "v2/__generated__/Payment_me.graphql"
import { Payment_order } from "v2/__generated__/Payment_order.graphql"
import { CommitMutation } from "../../Utils/commitMutation"

export interface Props {
  order: Payment_order
  me: Payment_me
  commitMutation: CommitMutation
  isLoading: boolean
  onContinue: () => void
  paymentPicker: RefObject<PaymentPicker>
}

export const PaymentContent: FC<Props> = props => {
  const {
    commitMutation,
    isLoading,
    onContinue,
    me,
    order,
    paymentPicker,
  } = props
  const [stepOneComplete, setStepOneComplete] = useState(false)
  const [paymentMethodSelection, setPaymentMethodSelection] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")

  const paymentMethodLabel = (paymentMethod: string) => {
    switch (paymentMethod) {
      case "credit_card":
        return "Credit card"
      case "bank_transfer":
        return "Bank transfer (US bank account)"
    }
  }

  const handlePaymentMethodSave = paymentMethodSelection => {
    setPaymentMethod(paymentMethodSelection)
    setStepOneComplete(true)
  }

  return (
    <div>
      <Flex
        flexDirection="column"
        style={isLoading ? { pointerEvents: "none" } : {}}
      >
        {/* Step One Payment Menthod */}
        <Flex flexDirection="row" justifyContent="space-between">
          <Flex flexDirection="column">
            <Text variant="xs">Step 1 of 2</Text>
            <Text variant="lg">Payment Method</Text>
            <Text color="black60">
              {paymentMethod && paymentMethodLabel(paymentMethod)}
            </Text>
          </Flex>
          {paymentMethod && (
            <Clickable
              textDecoration="underline"
              onClick={() => setStepOneComplete(false)}
            >
              <Text variant="xs">Change</Text>
            </Clickable>
          )}
        </Flex>
        <Collapse open={!stepOneComplete}>
          <Spacer mb={4} />
          <RadioGroup
            onSelect={val => {
              setPaymentMethodSelection(val)
            }}
          >
            <BorderedRadio value="credit_card" label="Credit Card" />
            <BorderedRadio value="bank_transfer" label="Bank Transfer" />
          </RadioGroup>
          <Spacer mb={4} />
          <Button
            onClick={() => handlePaymentMethodSave(paymentMethodSelection)}
            variant="primaryBlack"
            width="100%"
          >
            Save and Continue
          </Button>
        </Collapse>
        <Spacer mb={4} />
        {/* Step Two Payment Details */}
        <Text color={stepOneComplete ? "black100" : "black30"} variant="xs">
          Step 2 of 2
        </Text>
        <Text color={stepOneComplete ? "black100" : "black30"} variant="lg">
          Payment Details
        </Text>
        <Spacer mb={2} />
        {paymentMethod && paymentMethod === "credit_card" && (
          <Collapse open={stepOneComplete}>
            <PaymentPickerFragmentContainer
              commitMutation={commitMutation}
              me={me}
              order={order}
              innerRef={paymentPicker}
            />
            <Spacer mb={4} />
            <Media greaterThan="xs">
              <ContinueButton onClick={onContinue} loading={isLoading} />
            </Media>
          </Collapse>
        )}
        {paymentMethod && paymentMethod === "bank_transfer" && (
          <Collapse open={stepOneComplete}>
            <BankDebitProvider />
          </Collapse>
        )}
      </Flex>
    </div>
  )
}
