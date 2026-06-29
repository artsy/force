import MoneyFillIcon from "@artsy/icons/MoneyFillIcon"
import type { FlexProps } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { ConversationEventRow } from "Apps/Conversations/components/Message/ConversationEventRow"
import { isPartnerOfferActive } from "Apps/Conversations/utils/isPartnerOfferActive"
import { extractNodes } from "Utils/extractNodes"
import type { ConversationPartnerOfferUpdate_conversation$key } from "__generated__/ConversationPartnerOfferUpdate_conversation.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface ConversationPartnerOfferUpdateProps extends FlexProps {
  conversation: ConversationPartnerOfferUpdate_conversation$key
}

export const ConversationPartnerOfferUpdate: FC<
  React.PropsWithChildren<ConversationPartnerOfferUpdateProps>
> = ({ conversation, ...flexProps }) => {
  const isPartnerOfferConvoEnabled = useFlag("topaz_partner-offer-convo")

  const data = useFragment(CONVERSATION_FRAGMENT, conversation)

  const partnerOffer = extractNodes(data.partnerOffersConnection)[0] ?? null

  if (!isPartnerOfferConvoEnabled || !partnerOffer) {
    return null
  }

  const PURCHASED_BUYER_STATES = new Set(["SUBMITTED", "APPROVED", "COMPLETED"])

  const orders = extractNodes(data.collectorOrdersConnection)
  const isPurchased = orders.some(
    order =>
      PURCHASED_BUYER_STATES.has(order.buyerState ?? "") &&
      order.lineItems?.some(
        lineItem => lineItem?.partnerOfferId === partnerOffer.internalID,
      ),
  )

  if (isPurchased) {
    return (
      <ConversationEventRow
        Icon={MoneyFillIcon}
        iconFill="mono100"
        message="You purchased this artwork"
        textColor="mono100"
        {...flexProps}
      />
    )
  }

  const isExpired = !isPartnerOfferActive(partnerOffer)
  const priceDisplay = partnerOffer.priceWithDiscount?.display

  const offerMessage = priceDisplay
    ? `You received an offer for ${priceDisplay}`
    : "You received an offer"

  const message = isExpired ? "Offer Expired" : offerMessage

  return (
    <ConversationEventRow
      Icon={MoneyFillIcon}
      iconFill={isExpired ? "red100" : "mono100"}
      message={message}
      textColor={isExpired ? "red100" : "mono100"}
      {...flexProps}
    />
  )
}

const CONVERSATION_FRAGMENT = graphql`
  fragment ConversationPartnerOfferUpdate_conversation on Conversation {
    collectorOrdersConnection(first: 10) {
      edges {
        node {
          buyerState
          lineItems {
            partnerOfferId
          }
        }
      }
    }
    partnerOffersConnection(first: 1, offerType: [PERSONALIZED]) {
      edges {
        node {
          internalID
          endAt
          isAvailable
          priceWithDiscount {
            display
          }
        }
      }
    }
  }
`
