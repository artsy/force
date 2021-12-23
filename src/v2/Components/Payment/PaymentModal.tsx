import { useState } from "react"
import * as React from "react"
import { Button, Modal, Spacer, Text } from "@artsy/palette"
import {
  BillingInfoFormContext,
  BillingInfoFormValues,
} from "v2/Components/BillingInfoFormContext"
import { AddressForm } from "../AddressForm"
import { Form, FormikHelpers, FormikValues, FormikProps } from "formik"
import { SavedAddressType } from "v2/Apps/Order/Utils/shippingUtils"
import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { commitMutation, graphql, RelayProp } from "react-relay"
import { PaymentModalCreateCreditCardMutation } from "v2/__generated__/PaymentModalCreateCreditCardMutation.graphql"
import {
  ConnectionHandler,
  PayloadError,
  RecordSourceSelectorProxy,
} from "relay-runtime"
import { CreateTokenCardData } from "@stripe/stripe-js"
import { PaymentSection_me } from "v2/__generated__/PaymentSection_me.graphql"
import createLogger from "v2/Utils/logger"

const logger = createLogger("Components/Payment/PaymentModal.tsx")

const onCreditCardAdded = (
  me: PaymentSection_me,
  store: RecordSourceSelectorProxy<any>,
  data: PaymentModalCreateCreditCardMutation["response"]
): void => {
  const {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    createCreditCard: { creditCardOrError },
  } = data

  // Explicitly update the relay store to be aware of the new credit card
  if (creditCardOrError.creditCardEdge) {
    const meStore = store.get(me.id)
    const connection = ConnectionHandler.getConnection(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      meStore,
      "PaymentSection_creditCards"
    )
    const mutationPayload = store.getRootField("createCreditCard")
    const creditCardOrErrorEdge = mutationPayload.getLinkedRecord(
      "creditCardOrError"
    )
    const creditCardEdge = creditCardOrErrorEdge.getLinkedRecord(
      "creditCardEdge"
    )
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    ConnectionHandler.insertEdgeAfter(connection, creditCardEdge)
  }
}

const mutation = graphql`
  mutation PaymentModalCreateCreditCardMutation($input: CreditCardInput!) {
    createCreditCard(input: $input) {
      creditCardOrError {
        ... on CreditCardMutationSuccess {
          creditCardEdge {
            node {
              ...PaymentSectionCreditCard @relay(mask: false)
            }
          }
        }
        ... on CreditCardMutationFailure {
          mutationError {
            type
            message
            detail
          }
        }
      }
    }
  }
`
export interface PaymentModalProps {
  show: boolean
  closeModal: () => void
  onSuccess?: () => void
  onError?: (message: string) => void
  me: PaymentSection_me
  relay: RelayProp
}

type BillingInfoPicked = Pick<BillingInfoFormValues, "address">

export const PaymentModal: React.FC<PaymentModalProps> = props => {
  const { show, closeModal, relay } = props
  const stripe = useStripe()
  const elements = useElements()
  const [createError, setCreateError] = useState(null)

  const addCreditCard = async (
    values: FormikValues,
    actions: FormikHelpers<BillingInfoPicked>
  ) => {
    const billingAddress: CreateTokenCardData = {
      name: values.name || undefined,
      address_line1: values.addressLine1,
      address_line2: values.addressLine2 || undefined,
      address_city: values.city,
      address_state: values.region || undefined,
      address_zip: values.postalCode || undefined,
      address_country: values.country,
    }

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const cardElement = elements.getElement(CardElement)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const stripeResults = await stripe.createToken(cardElement, billingAddress)
    const { token, error } = stripeResults
    if (error) {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      setCreateError(error.message)
    } else {
      commitMutation<PaymentModalCreateCreditCardMutation>(relay.environment, {
        onCompleted: (data, errors) => {
          const {
            // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
            createCreditCard: { creditCardOrError },
          } = data
          actions?.setSubmitting(false)
          if (creditCardOrError.creditCardEdge) {
            closeModal()
          } else {
            if (errors) {
              // TODO: user freindly message?
              setCreateError(
                // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                `Failed. ${errors
                  .map((e: PayloadError) => e.message)
                  .join(", ")}`
              )
            } else {
              const mutationError = creditCardOrError.mutationError
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              setCreateError(`Failed. ${mutationError.message}`)
            }
          }
        },
        onError: error => {
          actions?.setSubmitting(false)
          logger.error(error)
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          setCreateError("Failed.")
        },
        mutation,
        variables: {
          // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
          input: { token: token.id },
        },
        updater: (store, data) => {
          onCreditCardAdded(props.me, store, data)
        },
      })
    }
  }
  return (
    <Modal isWide title="Add credit card" show={show} onClose={closeModal}>
      <BillingInfoFormContext
        onSubmit={(values, actions) => addCreditCard(values, actions)}
        formKeys={["address"]}
      >
        {(formik: FormikProps<SavedAddressType>) => (
          <Form>
            <Text data-test="credit-card-error" color="red100" my={2}>
              {createError}
            </Text>
            <Text textTransform="uppercase" variant="xs" mb={0.5}>
              Credit card
            </Text>
            <CreditCardInput />
            <Spacer mt={1} />
            <AddressForm billing={true} />
            <Spacer mb={1} />
            <Button
              type="submit"
              variant="primaryBlack"
              loading={formik.isSubmitting}
              disabled={!formik.isValid}
              width="100%"
              mt={2}
            >
              Save changes
            </Button>
          </Form>
        )}
      </BillingInfoFormContext>
    </Modal>
  )
}
