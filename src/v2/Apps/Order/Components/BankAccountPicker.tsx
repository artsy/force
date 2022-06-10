import { createFragmentContainer, graphql } from "react-relay"
import { FC, useState } from "react"
import { Payment_order } from "v2/__generated__/Payment_order.graphql"
import { BankDebitProvider } from "v2/Components/BankDebitForm/BankDebitProvider"
import { BorderedRadio, RadioGroup } from "@artsy/palette"
import { BankDebitDetails } from "./BankDebitDetails"

interface Props {
  order: Payment_order
}
export const BankAccountPicker: FC<Props> = order => {
  const [bankAccountSelection, setBankAccountSelection] = useState({
    type: "",
    id: "",
  })

  return (
    <>
      <RadioGroup
        onSelect={val => {
          if (val === "new") {
            setBankAccountSelection({ type: "new" })
          } else {
            setBankAccountSelection({ type: "existing", id: val })
          }
        }}
        defaultValue={
          bankAccountSelection.type === "new" ? "new" : bankAccountSelection.id
        }
      >
        {order.bankAccounts
          .map(bank => {
            const { internalID, last4 } = bank
            return (
              <BorderedRadio value={internalID} key={internalID}>
                <BankDebitDetails responsive={false} last4={last4} />
              </BorderedRadio>
            )
          })
          .concat([
            <BorderedRadio
              data-test="AddNewCard"
              value="new"
              key="new"
              selected={bankAccountSelection.type === "new"}
            >
              Add another bank account.
            </BorderedRadio>,
          ])}
      </RadioGroup>
      <BankDebitProvider order={order} />
    </>
  )
}

export const BankAccountPickerFragmentContainer = createFragmentContainer(
  BankAccountPicker,
  {
    me: graphql`
      fragment BankAccountPicker_me on Me {
        creditCards(first: 100) {
          edges {
            node {
              internalID
              lastDigits
            }
          }
        }
      }
    `,
  }
)
