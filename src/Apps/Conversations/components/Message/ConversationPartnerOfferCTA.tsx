import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Clickable, Flex, Message, Text } from "@artsy/palette"
import { useConversationsContext } from "Apps/Conversations/ConversationsContext"
import { RouterLink } from "System/Components/RouterLink"
import { useTimer } from "Utils/Hooks/useTimer"
import type { FC } from "react"

interface ConversationPartnerOfferCTAProps {
  artworkID?: string | null
  artworkHref?: string | null
}

export const ConversationPartnerOfferCTA: FC<
  React.PropsWithChildren<ConversationPartnerOfferCTAProps>
> = ({ artworkID, artworkHref }) => {
  const { findPartnerOffer } = useConversationsContext()

  const partnerOffer = artworkID ? findPartnerOffer(artworkID) : null

  const { hasEnded } = useTimer(partnerOffer?.endAt ?? "")

  if (!partnerOffer || !artworkHref) {
    return null
  }

  if (hasEnded || !partnerOffer.isAvailable) {
    return null
  }

  const message = partnerOffer.priceWithDiscount?.display
    ? `Offer Received for ${partnerOffer.priceWithDiscount.display}`
    : "Offer Received"

  const href = `${artworkHref}?partner_offer_id=${partnerOffer.internalID}`

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
          <Message variant="info" title={message} width="100%">
            <Text variant="sm">Tap to review the offer from the gallery</Text>
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
