import { FC, useEffect } from "react"
import { Payment_order } from "v2/__generated__/Payment_order.graphql"
import { useSetPaymentByStripeIntent } from "v2/Apps/Order/Components/Mutations/useSetPaymentByStripeIntent"
import { Spinner } from "@artsy/palette"
import styled from "styled-components"

interface Props {
  order: Payment_order
  setupIntentId: string
  saveAccount: string
  onSuccess: () => void
  onError: (object) => void
}

export const SetPaymentByStripeIntent: FC<Props> = props => {
  const { setupIntentId, saveAccount } = props
  const {
    submitMutation: setPaymentByStripeIntentMutation,
  } = useSetPaymentByStripeIntent()

  useEffect(() => {
    const setPaymentByStripeIntent = async () => {
      try {
        const orderOrError = (
          await setPaymentByStripeIntentMutation({
            variables: {
              input: {
                id: props.order.internalID,
                setupIntentId: setupIntentId,
                oneTimeUse: saveAccount === "true" ? false : true,
              },
            },
          })
        ).commerceSetPaymentByStripeIntent?.orderOrError

        if (orderOrError?.error) {
          throw orderOrError.error
        }

        props.onSuccess()
      } catch (error) {
        props.onError(error)
      }
    }

    setPaymentByStripeIntent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const SpinnerContainer = styled.div`
    width: 100%;
    height: 300px;
    position: relative;
  `
  return (
    <SpinnerContainer>
      <Spinner position="relative" color="brand" />
    </SpinnerContainer>
  )
}
