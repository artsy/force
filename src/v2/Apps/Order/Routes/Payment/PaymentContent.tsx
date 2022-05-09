import { FC, RefObject, useState } from "react"
import {
  Flex,
  Spacer,
  BorderedRadio,
  RadioGroup,
  Text,
  Collapse,
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
  const [paymentMethod, setPaymentMethod] = useState("bank_debit")

  return (
    <div>
      <Flex
        flexDirection="column"
        style={isLoading ? { pointerEvents: "none" } : {}}
      >
        <Spacer mb={2} />
        <Text variant="lg">Payment method</Text>
        <Spacer mb={2} />
        <RadioGroup
          onSelect={val => {
            setPaymentMethod(val)
          }}
          defaultValue={paymentMethod}
        >
          <BorderedRadio
            value="bank_debit"
            label="Bank transfer (US bank account)"
          />
          <BorderedRadio value="credit_card" label="Credit card" />
        </RadioGroup>
        <Spacer mb={4} />
        <Text variant="lg">Payment details</Text>
        <Spacer mb={2} />
        <Collapse open={paymentMethod === "credit_card"}>
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
        <Collapse open={paymentMethod === "bank_debit"}>
          <Text color="black60" variant="sm">
            • Bank transfer is powered by Stripe.
          </Text>
          <Text color="black60" variant="sm">
            • Search for your bank institution or select from the options below.
          </Text>
          <Text color="black60" variant="sm">
            • If you can not find your bank, please check your spelling or
            choose another payment method.
          </Text>
          <Spacer mb={2} />
          <BankDebitProvider order={order} />
        </Collapse>
      </Flex>
    </div>
  )
}
