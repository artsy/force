import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { BankDebitProvider } from "Components/BankDebitForm/BankDebitProvider"
import { BankAccountPicker_me } from "__generated__/BankAccountPicker_me.graphql"
import { BankAccountSelection } from "../Routes/Payment/index"
import { BorderedRadio, RadioGroup, Collapse, Spacer } from "@artsy/palette"
import { SaveAndContinueButton } from "Apps/Order/Components/SaveAndContinueButton"
import { BankDebitDetails } from "./BankDebitDetails"
import { InsufficientFundsError } from "./InsufficientFundsError"
import { BankAccountPicker_order } from "__generated__/BankAccountPicker_order.graphql"
import { extractNodes } from "Utils/extractNodes"
import { useSetPayment } from "../Mutations/useSetPayment"

interface Props {
  order: BankAccountPicker_order
  me: BankAccountPicker_me
  bankAccountHasInsufficientFunds: boolean
  onSetBankAccountHasInsufficientFunds: (arg: boolean) => void
  onSetIsSavingPayment: (arg: boolean) => void
  onSetBalanceCheckComplete: (arg: boolean) => void
  onSetSelectedBankAccountId: (arg: string) => void
  bankAccountSelection: BankAccountSelection
  onSetBankAccountSelection: (arg: BankAccountSelection) => void
}

export const BankAccountPicker: FC<Props> = props => {
  const {
    me: { bankAccounts },
    order,
    bankAccountHasInsufficientFunds,
    onSetBankAccountHasInsufficientFunds,
    onSetIsSavingPayment,
    onSetBalanceCheckComplete,
    onSetSelectedBankAccountId,
    bankAccountSelection,
    onSetBankAccountSelection,
  } = props

  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const bankAccountsArray = extractNodes(bankAccounts)

  const { submitMutation: setPaymentMutation } = useSetPayment()

  const handleContinue = async () => {
    onSetBalanceCheckComplete(false)
    onSetIsSavingPayment(true)

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

      onSetSelectedBankAccountId(bankAccountSelection.id!)
    } catch (error) {
      console.error(error)
    } finally {
      onSetIsSavingPayment(false)
    }
  }

  return (
    <>
      {bankAccountsArray.length > 0 && (
        <RadioGroup
          data-test="bankAccounts"
          onSelect={val => {
            if (val === "new") {
              onSetBankAccountHasInsufficientFunds(false)
              onSetBankAccountSelection({ type: "new" })
            } else {
              if (val !== bankAccountSelection.id) {
                onSetBankAccountHasInsufficientFunds(false)
              }

              onSetBankAccountSelection({ type: "existing", id: val })
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
                data-test="AddNewBankAccount"
                value="new"
                key="new"
                selected={bankAccountSelection.type === "new"}
              >
                Add another bank account.
              </BorderedRadio>,
            ])}
        </RadioGroup>
      )}

      <Collapse open={bankAccountSelection.type === "new"}>
        {bankAccountSelection.type === "new" && (
          <BankDebitProvider
            order={order}
            bankAccountHasInsufficientFunds={bankAccountHasInsufficientFunds}
            onSetBankAccountHasInsufficientFunds={
              onSetBankAccountHasInsufficientFunds
            }
            onSetIsSavingPayment={onSetIsSavingPayment}
            onSetClientSecret={setClientSecret}
            clientSecret={clientSecret}
          />
        )}
      </Collapse>

      {bankAccountSelection.type === "existing" && (
        <>
          {bankAccountHasInsufficientFunds && <InsufficientFundsError />}
          <Spacer mt={4} />
          <SaveAndContinueButton
            testId="bankTransferSaveExisting"
            onClick={handleContinue}
            disabled={!bankAccountSelection.type}
          />
          <Spacer mb={2} />
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
