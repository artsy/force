import { createFragmentContainer, graphql } from "react-relay"
import { FC, useState } from "react"
import { BankDebitProvider } from "v2/Components/BankDebitForm/BankDebitProvider"
import { BankAccountPicker_me } from "v2/__generated__/BankAccountPicker_me.graphql"
import { BorderedRadio, RadioGroup, Spacer, Collapse } from "@artsy/palette"
import { BankDebitDetails } from "./BankDebitDetails"
import { BankAccountPicker_order } from "v2/__generated__/BankAccountPicker_order.graphql"
import { useRouter } from "v2/System/Router/useRouter"
import { getENV } from "v2/Utils/getENV"

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
    me: { bankAccounts },
    order,
  } = props

  const bankAccountsArray = bankAccounts?.edges?.map(e => e?.node)!

  const userHasExistingBankAccounts = bankAccountsArray.length > 0

  const { router } = useRouter()

  const returnURL = `${getENV("APP_URL")}/orders/${order.internalID}/payment`

  // if (bankAccountSelection.type === "existing") {
  //   router.push(returnURL)
  // }

  return (
    <>
      {userHasExistingBankAccounts && (
        <RadioGroup
          onSelect={val => {
            if (val === "new") {
              setBankAccountSelection({ type: "new", id: "" })
            } else {
              setBankAccountSelection({ type: "existing", id: val })
            }
          }}
          defaultValue={
            bankAccountSelection.type === "new"
              ? "new"
              : bankAccountSelection.id
          }
        >
          {bankAccountsArray
            .map(bank => {
              const { internalID, last4 } = bank!

              return (
                <BorderedRadio value={internalID} key={internalID}>
                  <BankDebitDetails last4={last4} />
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
      )}
      <Spacer mb={4} />
      <Collapse open={bankAccountSelection.type === "new"}>
        <BankDebitProvider order={order} />
      </Collapse>
    </>
  )
}

export const BankAccountPickerFragmentContainer = createFragmentContainer(
  BankAccountPicker,
  {
    me: graphql`
      fragment BankAccountPicker_me on Me {
        bankAccounts(first: 100) {
          edges {
            node {
              internalID
              last4
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
