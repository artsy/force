import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { StripeError } from "@stripe/stripe-js"

import { BankDebitProvider } from "Components/BankDebitForm/BankDebitProvider"
import { BankAccountPicker_me$data } from "__generated__/BankAccountPicker_me.graphql"
import { CommercePaymentMethodEnum } from "__generated__/Payment_order.graphql"
import { BorderedRadio, RadioGroup, Collapse, Spacer } from "@artsy/palette"
import { SaveAndContinueButton } from "Apps/Order/Components/SaveAndContinueButton"
import { BankDebitDetails } from "./BankDebitDetails"
import { InsufficientFundsError } from "./InsufficientFundsError"
import { BankAccountPicker_order$data } from "__generated__/BankAccountPicker_order.graphql"
import { extractNodes } from "Utils/extractNodes"
import { useSetPayment } from "Apps/Order/Mutations/useSetPayment"
import { camelCase, upperFirst } from "lodash"
import { useOrderPaymentContext } from "Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"

interface BankAccountRecord {
  internalID: string
  last4: string
}

interface Props {
  order: BankAccountPicker_order$data
  me: BankAccountPicker_me$data
  onError: (error: Error | StripeError) => void
}

export const BankAccountPicker: FC<Props> = props => {
  const {
    me: { bankAccounts },
    order,
  } = props

  const {
    bankAccountSelection,
    selectedPaymentMethod,
    setBalanceCheckComplete,
    bankAccountHasInsufficientFunds,
    setBankAccountSelection,
    setSelectedBankAccountId,
    setBankAccountHasInsufficientFunds,
    setIsSavingPayment,
  } = useOrderPaymentContext()

  const bankAccountsArray: BankAccountRecord[] =
    selectedPaymentMethod === "US_BANK_ACCOUNT"
      ? extractNodes(bankAccounts)
      : []

  if (order?.paymentMethodDetails?.internalID) {
    // if account on order is not saved on user's profile
    const isOrderBankSaved = bankAccountsArray.find(
      bank => bank.internalID === order.paymentMethodDetails?.internalID
    )

    if (!isOrderBankSaved) {
      // populate banks array with the account on order
      bankAccountsArray.unshift(order.paymentMethodDetails as BankAccountRecord)
    }
  }

  const { submitMutation: setPaymentMutation } = useSetPayment()

  const handleContinue = async () => {
    setBalanceCheckComplete(false)
    setIsSavingPayment(true)

    try {
      const orderOrError = (
        await setPaymentMutation({
          variables: {
            input: {
              id: order.internalID,
              paymentMethod: selectedPaymentMethod as CommercePaymentMethodEnum,
              paymentMethodId: bankAccountSelection?.id,
            },
          },
        })
      ).commerceSetPayment?.orderOrError

      if (orderOrError?.error) {
        throw orderOrError.error
      }

      setSelectedBankAccountId(bankAccountSelection?.id!)
    } catch (error) {
      props.onError(error)
    } finally {
      setIsSavingPayment(false)
    }
  }

  return (
    <>
      {bankAccountsArray?.length > 0 && (
        <RadioGroup
          data-test="bankAccounts"
          onSelect={val => {
            if (val === "new") {
              setBankAccountHasInsufficientFunds(false)
              setBankAccountSelection({ type: "new" })
            } else {
              if (val !== bankAccountSelection?.id) {
                setBankAccountHasInsufficientFunds(false)
              }

              setBankAccountSelection({ type: "existing", id: val })
            }
          }}
          defaultValue={
            bankAccountSelection?.type === "new"
              ? "new"
              : bankAccountSelection?.id
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
                selected={bankAccountSelection?.type === "new"}
              >
                Add another bank account.
              </BorderedRadio>,
            ])}
        </RadioGroup>
      )}

      <Collapse open={bankAccountSelection?.type === "new"}>
        {bankAccountSelection?.type === "new" && (
          <BankDebitProvider order={order} onError={props.onError} />
        )}
      </Collapse>

      {bankAccountSelection?.type === "existing" && (
        <>
          {bankAccountHasInsufficientFunds && <InsufficientFundsError />}
          <Spacer y={4} />
          <SaveAndContinueButton
            testId={`saveExisting${upperFirst(
              camelCase(selectedPaymentMethod)
            )}`}
            onClick={handleContinue}
            disabled={!bankAccountSelection?.type}
          />
          <Spacer y={2} />
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
        paymentMethodDetails {
          ... on BankAccount {
            internalID
            last4
          }
        }
      }
    `,
  }
)
