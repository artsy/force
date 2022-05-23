import { FC, useEffect } from "react"
import { Payment_order } from "v2/__generated__/Payment_order.graphql"
import { useSetPayment } from "v2/Apps/Order/Components/Mutations/useSetPayment"

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

  return <div>Setting bank debit payment for this order...</div>
}
