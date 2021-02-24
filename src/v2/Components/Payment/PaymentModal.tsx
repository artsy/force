import React, { useState } from "react"
import { Button, Input, Modal, Spacer, Text } from "@artsy/palette"
import { Formik, FormikHelpers, FormikProps } from "formik"
import { CountrySelect } from "v2/Components/CountrySelect"
import {
  validateAddress,
  removeEmptyKeys,
} from "v2/Apps/Order/Utils/formValidators"
import { SavedAddressType } from "v2/Apps/Order/Utils/shippingAddressUtils"
import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js"
import { commitMutation, graphql, RelayProp } from "react-relay"
import { PaymentModalCreateCreditCardMutation } from "v2/__generated__/PaymentModalCreateCreditCardMutation.graphql.ts"
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
    createCreditCard: { creditCardOrError },
  } = data

  // Explicitly update the relay store to be aware of the new credit card
  if (creditCardOrError.creditCardEdge) {
    const meStore = store.get(me.id)
    const connection = ConnectionHandler.getConnection(
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
    ConnectionHandler.insertEdgeAfter(connection, creditCardEdge)
  }
}

const validator = (values: any) => {
  const validationResult = validateAddress(values)
  const errorsTrimmed = removeEmptyKeys(validationResult.errors)
  return errorsTrimmed
}

const mutation = graphql`
  mutation PaymentModalCreateCreditCardMutation($input: CreditCardInput!) {
    createCreditCard(input: $input) {
      creditCardOrError {
        ... on CreditCardMutationSuccess {
          creditCardEdge {
            node {
              ...UserSettingsPaymentsCreditCard @relay(mask: false)
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

export const PaymentModal: React.FC<PaymentModalProps> = props => {
  const { show, closeModal, relay } = props
  const stripe = useStripe()
  const elements = useElements()
  const [createError, setCreateError] = useState(null)

  const addCreditCard = async (
    values: SavedAddressType,
    actions: FormikHelpers<SavedAddressType>
  ) => {
    const billingAddress: CreateTokenCardData = {
      name: values.name,
      address_line1: values.addressLine1,
      address_line2: values.addressLine2,
      address_city: values.city,
      address_state: values.region,
      address_zip: values.postalCode,
      address_country: values.country,
    }

    const cardElement = elements.getElement(CardElement)
    const stripeResults = await stripe.createToken(cardElement, billingAddress)
    const { token, error } = stripeResults
    if (error) {
      setCreateError(error.message)
    } else {
      commitMutation<PaymentModalCreateCreditCardMutation>(relay.environment, {
        onCompleted: (data, errors) => {
          const {
            createCreditCard: { creditCardOrError },
          } = data
          actions?.setSubmitting(false)
          if (creditCardOrError.creditCardEdge) {
            closeModal()
          } else {
            if (errors) {
              // TODO: user freindly message?
              setCreateError(
                `Failed. ${errors
                  .map((e: PayloadError) => e.message)
                  .join(", ")}`
              )
            } else {
              const mutationError = creditCardOrError.mutationError
              setCreateError(`Failed. ${mutationError.message}`)
            }
          }
        },
        onError: error => {
          actions?.setSubmitting(false)
          logger.error(error)
          setCreateError("Failed.")
        },
        mutation,
        variables: {
          input: { token: token.id },
        },
        updater: (store, data) => {
          onCreditCardAdded(props.me, store, data)
        },
      })
    }
  }
  return (
    <Modal title="Add credit card" show={show} onClose={closeModal}>
      <Formik
        initialValues={{
          country: "US",
        }}
        validate={validator}
        onSubmit={(values, actions) => {
          addCreditCard(values, actions)
        }}
      >
        {(formik: FormikProps<SavedAddressType>) => (
          <form onSubmit={formik.handleSubmit}>
            <Text data-test="credit-card-error" color="red" my={2}>
              {createError}
            </Text>
            <Text>Credit Card</Text>
            <CreditCardInput />
            <Spacer mt={1} />
            <Input
              id="name"
              name="name"
              title="Name on card"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
              value={formik.values.name}
            />
            <Spacer mb={1} />
            <Input
              name="postalCode"
              title="Postal Code"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.postalCode && formik.errors.postalCode}
              value={formik.values.postalCode}
            />
            <Spacer mb={1} />
            <Input
              title="Address Line 1"
              name="addressLine1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.addressLine1 && formik.errors.addressLine1}
              value={formik.values.addressLine1}
            />
            <Spacer mb={1} />
            <Input
              title="Address Line 2"
              name="addressLine2"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.addressLine2 && formik.errors.addressLine2}
              value={formik.values.addressLine2}
            />
            <Spacer mb={1} />
            <Input
              title="City"
              name="city"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.city && formik.errors.city}
              value={formik.values.city}
            />
            <Spacer mb={1} />
            <Input
              title="Region"
              name="region"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.region && formik.errors.region}
              value={formik.values.region}
            />
            <Spacer mb={1} />
            <Text>Country</Text>
            <CountrySelect
              selected={formik.values.country}
              onSelect={countryCode => {
                formik.setFieldValue("country", countryCode)
              }}
              error={formik.errors.country}
            />
            <Spacer mb={1} />
            <Button
              type="submit"
              size="large"
              loading={formik.isSubmitting}
              disabled={Object.keys(formik.errors).length > 0}
              width="100%"
              mt={2}
            >
              Save changes
            </Button>
          </form>
        )}
      </Formik>
    </Modal>
  )
}
