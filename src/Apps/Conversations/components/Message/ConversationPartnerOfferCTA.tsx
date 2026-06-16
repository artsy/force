import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Clickable, Flex, Message, Text } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { useConversationsContext } from "Apps/Conversations/ConversationsContext"
import { isPartnerOfferActive } from "Apps/Conversations/utils/isPartnerOfferActive"
import { ExpiresInTimer } from "Components/Notifications/ExpiresInTimer"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import type { ConversationPartnerOfferCTA_conversation$key } from "__generated__/ConversationPartnerOfferCTA_conversation.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface ConversationPartnerOfferCTAProps {
  conversation: ConversationPartnerOfferCTA_conversation$key
}

export const ConversationPartnerOfferCTA: FC<
  React.PropsWithChildren<ConversationPartnerOfferCTAProps>
> = ({ conversation }) => {
  const isPartnerOfferConvoEnabled = useFlag("topaz_partner-offer-convo")

  const data = useFragment(CONVERSATION_FRAGMENT, conversation)

  const { findPartnerOffer } = useConversationsContext()

  const activeOrder = extractNodes(data.activeOrders)[0]
  const item = data.items?.[0]?.item
  const artwork = item?.__typename === "Artwork" ? item : null
  const partnerOffer = artwork?.internalID
    ? findPartnerOffer(artwork.internalID)
    : null

  if (
    !isPartnerOfferConvoEnabled ||
    !partnerOffer ||
    !artwork?.href ||
    activeOrder
  ) {
    return null
  }

  if (!isPartnerOfferActive(partnerOffer)) {
    return null
  }

  const message = partnerOffer.priceWithDiscount?.display
    ? `Offer received for ${partnerOffer.priceWithDiscount.display}`
    : "Offer received"

  const href = `${artwork.href}?partner_offer_id=${partnerOffer.internalID}`

  return (
    <Clickable width="100%">
      <RouterLink
        to={href}
        target="_blank"
        textDecoration="none"
        data-testid="partnerOfferActionLink"
      >
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignContent="center"
          alignItems="center"
        >
          <Message variant="info" width="100%">
            <Text variant="sm-display" color="mono100" fontWeight="bold">
              {message}
            </Text>

            <ExpiresInTimer
              expiresAt={partnerOffer.endAt}
              available={partnerOffer.isAvailable}
            />
          </Message>

          <ChevronRightIcon
            fill="mono100"
            position="absolute"
            right={0}
            pr={4}
          />
        </Flex>
      </RouterLink>
    </Clickable>
  )
}

const CONVERSATION_FRAGMENT = graphql`
  fragment ConversationPartnerOfferCTA_conversation on Conversation {
    items {
      item {
        __typename
        ... on Artwork {
          internalID
          href
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
