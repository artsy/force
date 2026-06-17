import MoneyFillIcon from "@artsy/icons/MoneyFillIcon"
import type { FlexProps } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { useConversationsContext } from "Apps/Conversations/ConversationsContext"
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

  const { findPartnerOffer } = useConversationsContext()

  const activeOrder = extractNodes(data.activeOrders)[0]
  const item = data.items?.[0]?.item
  const artwork = item?.__typename === "Artwork" ? item : null
  const partnerOffer = artwork?.internalID
    ? findPartnerOffer(artwork.internalID)
    : null

  if (!isPartnerOfferConvoEnabled || !partnerOffer || activeOrder) {
    return null
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
    items {
      item {
        __typename
        ... on Artwork {
          internalID
        }
      }
    }
    activeOrders: orderConnection(
      first: 1
      states: [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]
    ) {
      edges {
        node {
          internalID
        }
      }
    }
  }
`
