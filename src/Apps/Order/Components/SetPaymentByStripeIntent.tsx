import { FC } from "react"
import { Payment_order } from "__generated__/Payment_order.graphql"
import { ProcessingPayment } from "./ProcessingPayment"

interface Props {
  order: Payment_order
  setupIntentId: string
  shouldSaveBankAccount: boolean
  onSuccess: () => void
  onError: (object) => void
}

export const SetPaymentByStripeIntent: FC<Props> = () => {
  // const { setupIntentId, shouldSaveBankAccount } = props
  // const {
  //   submitMutation: setPaymentByStripeIntentMutation,
  // } = useSetPaymentByStripeIntent()

  // useEffect(() => {
  //   const setPaymentByStripeIntent = async () => {
  //     try {
  //       const orderOrError = (
  //         await setPaymentByStripeIntentMutation({
  //           variables: {
  //             input: {
  //               id: props.order.internalID,
  //               setupIntentId: setupIntentId,
  //               oneTimeUse: !shouldSaveBankAccount,
  //             },
  //           },
  //         })
  //       ).commerceSetPaymentByStripeIntent?.orderOrError

  //       if (orderOrError?.error) {
  //         throw orderOrError.error
  //       }

  //       props.onSuccess()
  //     } catch (error) {
  //       props.onError(error)
  //     }
  //   }

  //   setPaymentByStripeIntent()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  return <ProcessingPayment />
}
