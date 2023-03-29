import { Spacer, Text } from "@artsy/palette"
import { graphql, useFragment } from "react-relay"
import { OrderInformation_order$key } from "__generated__/OrderInformation_order.graphql"
import { OrderState } from "./OrderState"
import { ReviewOrderButton } from "./ReviewOrderButton"

interface OrderInformationProps {
  order: OrderInformation_order$key
}
export const OrderInformation: React.FC<OrderInformationProps> = ({
  order,
}) => {
  const data = useFragment(
    graphql`
      fragment OrderInformation_order on CommerceOrder {
        code
        ...OrderState_state
        ...ReviewOrderButton_order
        ... on CommerceOfferOrder {
          lastOffer {
            amount(precision: 2)
          }
        }
      }
    `,
    order
  )

  if (!data) return null

  const { code, lastOffer } = data

  return (
    <>
      <Text variant="lg">Order Information</Text>
      <Spacer y={2} />
      <Text variant="sm">Order #{code}</Text>
      <Text variant="xl">{lastOffer?.amount}</Text>
      <Spacer y={2} />
      <OrderState order={data} />
      <Spacer y={2} />
      <ReviewOrderButton order={data} />
    </>
  )
}
