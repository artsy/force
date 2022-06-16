import { createFragmentContainer, graphql } from "react-relay"
import { FC, useState } from "react"
import { BankDebitProvider } from "v2/Components/BankDebitForm/BankDebitProvider"
import { BankAccountPicker_me } from "v2/__generated__/BankAccountPicker_me.graphql"
import { BorderedRadio, RadioGroup } from "@artsy/palette"
import { BankDebitDetails } from "./BankDebitDetails"
import { BankAccountPicker_order } from "v2/__generated__/BankAccountPicker_order.graphql"

interface Props {
  order: BankAccountPicker_order
  me: BankAccountPicker_me
}
export const BankAccountPicker: FC<Props> = props => {
  const [bankAccountSelection, setBankAccountSelection] = useState({
    type: "",
    id: "",
  })

  const {
    me: { creditCards },
    order,
  } = props

  const bankAccountsArray = creditCards?.edges?.map(e => e?.node)!

  return (
    <>
      <RadioGroup
        onSelect={val => {
          if (val === "new") {
            setBankAccountSelection({ type: "new", id: "" })
          } else {
            setBankAccountSelection({ type: "existing", id: val })
          }
        }}
        defaultValue={
          bankAccountSelection.type === "new" ? "new" : bankAccountSelection.id
        }
      >
        {bankAccountsArray
          .map(bank => {
            const { internalID, lastDigits } = bank

            return (
              <BorderedRadio value={internalID} key={internalID}>
                <BankDebitDetails last4={lastDigits} />
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
    order: graphql`
      fragment BankAccountPicker_order on CommerceOrder {
        internalID
        mode
        state
        lineItems {
          edges {
            node {
              artwork {
                slug
              }
            }
          }
        }
      }
    `,
  }
)
