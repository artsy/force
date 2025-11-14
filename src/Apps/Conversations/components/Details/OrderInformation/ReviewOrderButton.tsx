import type { CounterOfferState } from "Apps/Conversations/components/Details/OrderState/ConversationOrderState"
import { RouterLink } from "System/Components/RouterLink"
import { Button, type ButtonProps } from "@artsy/palette"
import type { ReviewOrderButton_order$key } from "__generated__/ReviewOrderButton_order.graphql"
import { graphql, useFragment } from "react-relay"
import { useTracking } from "react-tracking"

interface ReviewOrderButtonProps {
  order: ReviewOrderButton_order$key
}

export const ReviewOrderButton: React.FC<
  React.PropsWithChildren<ReviewOrderButtonProps>
> = ({ order }) => {
  const { trackEvent } = useTracking()

  const data = useFragment(
    graphql`
      fragment ReviewOrderButton_order on CommerceOrder {
        id @required(action: NONE)
        state @required(action: NONE)
        mode @required(action: NONE)
        lineItems {
          edges {
            node {
              artwork {
                id
              }
            }
          }
        }
        ... on CommerceOfferOrder {
          lastOffer {
            from @required(action: NONE) {
              __typename
            }
            offerAmountChanged @required(action: NONE)
          }
        }
      }
    `,
    order,
  )

  if (!data) {
    return null
  }

  let counterOfferState: CounterOfferState | undefined

  if (data.lastOffer && data.state === "SUBMITTED") {
    counterOfferState = `${
      data.lastOffer.offerAmountChanged ? "COUNTER_OFFER" : "OFFER"
    }_${
      data.lastOffer.from.__typename === "CommercePartner" ? "SELLER" : "BUYER"
    }`
  }

  let ctaSubmittedText = ""
  let variant: ButtonProps["variant"] = "primaryBlack"

  switch (counterOfferState) {
    case "COUNTER_OFFER_BUYER":
      ctaSubmittedText = "Review Counteroffer"
      break
    case "COUNTER_OFFER_SELLER":
      variant = "secondaryBlack"
      ctaSubmittedText = "View Offer"
      break
    case "OFFER_BUYER":
      ctaSubmittedText = "Review Offer"
      break
    default:
      ctaSubmittedText = `${data.state === "SUBMITTED" ? "Review" : "View"} ${
        data.mode === "OFFER" ? "Offer" : "Order"
      }`
      if (data.state !== "SUBMITTED" || data.mode !== "BUY") {
        variant = "secondaryBlack"
      }
  }

  return (
    <RouterLink
      to={`/orders/${data.id}/details`}
      enablePrefetch={false}
      onClick={() =>
        trackEvent({
          action: "Click",
          label: ctaSubmittedText,
          context_module: "conversations",
          artwork_id: data.lineItems?.edges?.[0]?.node?.artwork?.id,
        })
      }
    >
      <Button size={["small", "large"]} variant={variant} width="100%">
        {ctaSubmittedText}
      </Button>
    </RouterLink>
  )
}
