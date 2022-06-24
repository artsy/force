import { createFragmentContainer, graphql } from "react-relay"
import { FC, useState } from "react"
import { BankDebitProvider } from "v2/Components/BankDebitForm/BankDebitProvider"
import { BankAccountPicker_me } from "v2/__generated__/BankAccountPicker_me.graphql"
import {
  BorderedRadio,
  RadioGroup,
  Spacer,
  Collapse,
  Button,
} from "@artsy/palette"
import { BankDebitDetails } from "./BankDebitDetails"
import { BankAccountPicker_order } from "v2/__generated__/BankAccountPicker_order.graphql"
import { useSetPayment } from "v2/Apps/Order/Components/Mutations/useSetPayment"

interface Props {
  order: BankAccountPicker_order
  me: BankAccountPicker_me
  onSetPaymentSuccess: () => void
  onSetPaymentError: (error: Error) => void
}

export const BankAccountPicker: FC<Props> = props => {
  const {
    me: { bankAccounts },
    order,
    onSetPaymentSuccess,
    onSetPaymentError,
  } = props

  const bankAccountsArray = bankAccounts?.edges?.map(e => e?.node)!

  const userHasExistingBankAccounts = bankAccountsArray.length > 0

  const getInitialBankAccountSelection = () => {
    // user has added bank account to the order
    if (props.order.bankAccountId) {
      return {
        type: "existing",
        id: props.order.bankAccountId,
      }
    } else {
      // user has existing bank accounts on account but not on order
      return userHasExistingBankAccounts
        ? {
            type: "existing",
            id: bankAccountsArray[0]?.internalID!,
          }
        : // user has no bank accounts on account or order
          { type: "new" }
    }
  }

  const [bankAccountSelection, setBankAccountSelection] = useState(
    getInitialBankAccountSelection()
  )

  const { submitMutation: setPaymentMutation } = useSetPayment()

  const handleContinue = async () => {
    try {
      const orderOrError = (
        await setPaymentMutation({
          variables: {
            input: {
              id: order.internalID,
              paymentMethod: "US_BANK_ACCOUNT",
              paymentMethodId: bankAccountSelection.id,
            },
          },
        })
      ).commerceSetPayment?.orderOrError

      if (orderOrError?.error) {
        throw orderOrError.error
      }

      onSetPaymentSuccess()
    } catch (error) {
      onSetPaymentError(error)
    }
  }

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
      {bankAccountSelection.type === "existing" && (
        <>
          <Button
            onClick={handleContinue}
            disabled={!bankAccountSelection.type}
            variant="primaryBlack"
            width="50%"
          >
            Save and Continue
          </Button>
          <Spacer mb={4} />
        </>
      )}
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
        bankAccountId
      }
    `,
  }
)
