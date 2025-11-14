import { ConversationOrderState } from "Apps/Conversations/components/Details/OrderState/ConversationOrderState"
import { Separator, Spacer, Text } from "@artsy/palette"
import type { ConversationOrderInformation_order$key } from "__generated__/ConversationOrderInformation_order.graphql"
import { graphql, useFragment } from "react-relay"
import { ReviewOrderButton } from "./ReviewOrderButton"

interface OrderInformationProps {
  order: ConversationOrderInformation_order$key
}
export const ConversationOrderInformation: React.FC<
  React.PropsWithChildren<OrderInformationProps>
> = ({ order }) => {
  const data = useFragment(
    graphql`
      fragment ConversationOrderInformation_order on CommerceOrder {
        code
        state
        ...ConversationOrderState_state
        ...ReviewOrderButton_order
        ... on CommerceOfferOrder {
          lastOffer {
            amount(precision: 2)
          }
        }
      }
    `,
    order,
  )

  if (!data) return null

  const { code, lastOffer } = data

  const showReviewOrderButton = data.state !== "CANCELED"

  return (
    <>
      <Text variant="lg">Order Information</Text>

      <Spacer y={2} />

      <Text variant="sm">Order #{code}</Text>
      <Text variant="xl">{lastOffer?.amount}</Text>

      <Spacer y={2} />

      <ConversationOrderState order={data} />

      <Spacer y={2} />

      {showReviewOrderButton && <ReviewOrderButton order={data} />}

      <Separator borderWidth={1} my={4} />
    </>
  )
}
