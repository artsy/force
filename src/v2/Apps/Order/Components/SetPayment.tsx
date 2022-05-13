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
  const { submitMutation: setPaymentMutation } = useSetPayment()

  useEffect(() => {
    const setPayment = async () => {
      try {
        const orderOrError = (
          await setPaymentMutation({
            variables: {
              // TODO: Instead of sending `creditCardId`, we'll send
              // `setupIntentId` when the mutation is ready.
              input: {
                id: props.order.internalID,
                creditCardId: "627c1945596846000d2ba394",
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
