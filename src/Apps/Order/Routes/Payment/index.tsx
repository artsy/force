import { FadeInBox } from "Components/FadeInBox"
import { Elements, PaymentElement, useElements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { ActionType, ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, Flex, Spacer, Text, SkeletonBox } from "@artsy/palette"
import type { Stripe, StripeElements, StripeError } from "@stripe/stripe-js"
import type { Router } from "found"
// libs
import { type FC, createRef, useEffect, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

import type { PaymentRouteSetOrderPaymentMutation } from "__generated__/PaymentRouteSetOrderPaymentMutation.graphql"
// relay generated
import type { Payment_me$data } from "__generated__/Payment_me.graphql"
import type { Payment_order$data } from "__generated__/Payment_order.graphql"

import { useStripePaymentBySetupIntentId } from "Apps/Order/Hooks/useStripePaymentBySetupIntentId"
import { useSetPayment } from "Apps/Order/Mutations/useSetPayment"
import {
  type CommitMutation,
  injectCommitMutation,
} from "Apps/Order/Utils/commitMutation"
import { getInitialPaymentMethodValue } from "Apps/Order/Utils/orderUtils"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { useRouter } from "System/Hooks/useRouter"
// utils, hooks, mutations and system tools
import { extractNodes } from "Utils/extractNodes"
import createLogger from "Utils/logger"
import { useOrderPaymentContext } from "./PaymentContext/OrderPaymentContext"

import { AdditionalArtworkDetailsFragmentContainer as AdditionalArtworkDetails } from "Apps/Order/Components/AdditionalArtworkDetails"
import { ArtworkSummaryItemFragmentContainer as ArtworkSummaryItem } from "Apps/Order/Components/ArtworkSummaryItem"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import type { CreditCardPicker } from "Apps/Order/Components/CreditCardPicker"
import { OrderRouteContainer } from "Apps/Order/Components/OrderRouteContainer"
import {
  buyNowFlowSteps,
  offerFlowSteps,
  privateFlowSteps,
} from "Apps/Order/Components/OrderStepper"
// components
import { PartnerOfferTimerItem } from "Apps/Order/Components/PartnerOfferTimerItem"
import { PollAccountBalanceQueryRenderer } from "Apps/Order/Components/PollAccountBalance"
import { SaveAndContinueButton } from "Apps/Order/Components/SaveAndContinueButton"
import { SavingPaymentSpinner } from "Apps/Order/Components/SavingPaymentSpinner"
import { TransactionDetailsSummaryItemFragmentContainer as TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { type Dialog, injectDialog } from "Apps/Order/Dialogs"
import { useJump } from "Utils/Hooks/useJump"
import { PaymentContent } from "./PaymentContent"
import { Collapse } from "Apps/Order/Components/Collapse"

const logger = createLogger("Order/Routes/Payment/index.tsx")

export interface PaymentRouteProps {
  order: Payment_order$data
  me: Payment_me$data
  router: Router
  dialog: Dialog
  commitMutation: CommitMutation
  isCommittingMutation: boolean
  stripe: Stripe
  elements: StripeElements
}

export enum BalanceCheckResult {
  success = "success",
  failed = "failed",
  check_not_possible = "check not possible",
}

export type BankAccountSelectionType = "existing" | "new"

export interface BankAccountSelection {
  type: BankAccountSelectionType
  id?: string
}

const stripePromise = loadStripe("pk_test_h9x96nuEG26CZFlE05aSA41o009gNRFRAZ")

const PaymentForm = () => {
  const elements = useElements()
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("new")
  const options = {
    layout: {
      // type: "tabs",
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
    // console.log(elements?.getElement("payment"))
    elements?.getElement("payment")?.collapse()
  }

  const onClickWirePaymentMethods = () => {
    setSelectedPaymentMethod("wire")
    elements?.getElement("payment")?.collapse()
  }

  return (
    <>
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
          options={options}
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
        <SaveAndContinueButton />
      </form>
    </>
  )
}

export const PaymentRoute: FC<
  React.PropsWithChildren<PaymentRouteProps>
> = props => {
  const { order, me } = props

  const options = {
    mode: "payment",
    amount: order.buyerTotalCents,
    currency: order.currencyCode.toLowerCase(),
    // customerSessionClientSecret: "cuss_secret_xxx",
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
  }

  return (
    <Box data-test="orderPayment">
      <OrderRouteContainer
        order={order}
        currentStep="Payment"
        steps={buyNowFlowSteps}
        content={
          <Elements stripe={stripePromise} options={options}>
            <PaymentForm />
          </Elements>
        }
        sidebar={
          <Flex flexDirection="column">
            <Flex flexDirection="column">
              {order.source === "partner_offer" && order.mode === "BUY" && (
                <>
                  <PartnerOfferTimerItem order={order} />
                  <Spacer y={2} />
                </>
              )}
              <ArtworkSummaryItem order={order} />
              <TransactionDetailsSummaryItem
                transactionStep="payment"
                order={order}
              />
              <BuyerGuarantee
                contextModule={ContextModule.ordersPayment}
                contextPageOwnerType={OwnerType.ordersPayment}
                orderSource={order.source}
                renderArtsyPrivateSaleConditions={true}
                privateSaleConditions={order.conditionsOfSale}
              />
            </Flex>
          </Flex>
        }
      />
    </Box>
  )
}

graphql`
  fragment Payment_validation on CommerceOrder {
    paymentSet
    paymentMethod
    paymentMethodDetails {
      __typename
      ... on CreditCard {
        id
      }
      ... on BankAccount {
        id
      }
      ... on WireTransfer {
        isManualPayment
      }
    }
  }
`

export const PaymentFragmentContainer = createFragmentContainer(
  injectCommitMutation(injectDialog(PaymentRoute)),
  {
    me: graphql`
      fragment Payment_me on Me {
        creditCards(first: 100) {
          edges {
            node {
              internalID
            }
          }
        }
        bankAccounts(first: 100) {
          edges {
            node {
              internalID
              last4
            }
          }
        }
        ...CreditCardPicker_me
        ...BankAccountPicker_me
      }
    `,
    order: graphql`
      fragment Payment_order on CommerceOrder {
        artworkDetails
        source
        conditionsOfSale
        bankAccountId
        availablePaymentMethods
        paymentSet
        buyerTotalCents
        internalID
        mode
        currencyCode
        buyerTotal(precision: 2)
        lineItems {
          edges {
            node {
              artwork {
                slug
              }
              artworkVersion {
                provenance
                condition_description
              }
            }
          }
        }
        ...Payment_validation @relay(mask: false)
        ...CreditCardPicker_order
        ...BankAccountPicker_order
        ...PartnerOfferTimerItem_order
        ...ArtworkSummaryItem_order
        ...AdditionalArtworkDetails_order
        ...TransactionDetailsSummaryItem_order
        ...OrderStepper_order
      }
    `,
  },
)
