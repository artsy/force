import { FC, useEffect } from "react"
import { Payment_order } from "v2/__generated__/Payment_order.graphql"
import { useSetPayment } from "v2/Apps/Order/Components/Mutations/useSetPayment"
import { Spinner } from "@artsy/palette"
import styled from "styled-components"

interface Props {
  order: Payment_order
  setupIntentId: string
  onSuccess: () => void
  onError: (object) => void
}

export const SetPayment: FC<Props> = props => {
  const { setupIntentId } = props
  const { submitMutation: setPaymentMutation } = useSetPayment()

  useEffect(() => {
    const setPayment = async () => {
      try {
        const orderOrError = (
          await setPaymentMutation({
            variables: {
              input: {
                id: props.order.internalID,
                setupIntentId: setupIntentId,
              },
            },
          })
        ).commerceSetPayment?.orderOrError

        if (orderOrError?.error) {
          throw orderOrError.error
        }

        props.onSuccess()
      } catch (error) {
        props.onError(error)
      }
    }

    setPayment()
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
