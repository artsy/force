import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { BankDebitProvider } from "Components/BankDebitForm/BankDebitProvider"
import { BankAccountPicker_me } from "__generated__/BankAccountPicker_me.graphql"
import { BorderedRadio, RadioGroup, Spacer, Collapse } from "@artsy/palette"
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
  setBankAccountHasInsufficientFunds: (arg: boolean) => void
  onBankAccountContinue: () => void
  setIsProcessingPayment: (arg: boolean) => void
}

export const BankAccountPicker: FC<Props> = props => {
  const {
    me: { bankAccounts },
    order,
    bankAccountHasInsufficientFunds,
    setBankAccountHasInsufficientFunds,
    onBankAccountContinue,
    setIsProcessingPayment,
  } = props

  const bankAccountsArray = extractNodes(bankAccounts)
  const userHasExistingBankAccounts = bankAccountsArray.length > 0

  type BankAccountSelectionType = "existing" | "new"

  interface BankAccountSelection {
    type: BankAccountSelectionType
    id?: string
  }

  const { submitMutation: setPaymentMutation } = useSetPayment()

  // TODO: use a single setPaymentMutation for all payment methods
  const handleContinue = async () => {
    setIsProcessingPayment(true)
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

      onBankAccountContinue()
    } catch (error) {
      console.error(error)
    }
  }

  const getInitialBankAccountSelection = (): BankAccountSelection => {
    if (props.order.bankAccountId) {
      return {
        type: "existing",
        id: props.order.bankAccountId,
      }
    } else {
      return userHasExistingBankAccounts
        ? {
            type: "existing",
            id: order.bankAccountId || bankAccountsArray[0]?.internalID!,
          }
        : { type: "new" }
    }
  }

  const [bankAccountSelection, setBankAccountSelection] = useState<
    BankAccountSelection
  >(getInitialBankAccountSelection())

  return (
    <>
      {userHasExistingBankAccounts && (
        <RadioGroup
          data-test="bankAccounts"
          onSelect={val => {
            setBankAccountHasInsufficientFunds(false)
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
      <Spacer mb={4} />

      <Collapse open={bankAccountSelection.type === "new"}>
        <BankDebitProvider
          order={order}
          bankAccountHasInsufficientFunds={bankAccountHasInsufficientFunds}
          setIsProcessingPayment={setIsProcessingPayment}
        />
      </Collapse>

      {bankAccountSelection.type === "existing" && (
        <>
          {bankAccountHasInsufficientFunds && <InsufficientFundsError />}
          
          <SaveAndContinueButton
            data-test="bankTransferSaveExisting"
            media={{ greaterThan: "xs" }}
            onClick={handleContinue}
            disabled={
              !bankAccountSelection.type || bankAccountHasInsufficientFunds
            }
          />
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
