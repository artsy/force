import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Clickable, Flex, Message, Text } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { useConversationsContext } from "Apps/Conversations/ConversationsContext"
import { ExpiresInTimer } from "Components/Notifications/ExpiresInTimer"
import { RouterLink } from "System/Components/RouterLink"
import { useTimer } from "Utils/Hooks/useTimer"
import type { ConversationPartnerOfferCTA_artwork$key } from "__generated__/ConversationPartnerOfferCTA_artwork.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface ConversationPartnerOfferCTAProps {
  artwork?: ConversationPartnerOfferCTA_artwork$key | null
}

export const ConversationPartnerOfferCTA: FC<
  React.PropsWithChildren<ConversationPartnerOfferCTAProps>
> = ({ artwork }) => {
  const isPartnerOfferConvoEnabled = useFlag("topaz_partner-offer-convo")

  const data = useFragment(ARTWORK_FRAGMENT, artwork)

  const { findPartnerOffer } = useConversationsContext()

  const partnerOffer = data?.internalID
    ? findPartnerOffer(data.internalID)
    : null

  const { hasEnded } = useTimer(partnerOffer?.endAt ?? "")

  if (!isPartnerOfferConvoEnabled || !partnerOffer || !data?.href) {
    return null
  }

  if (hasEnded || !partnerOffer.isAvailable) {
    return null
  }

  const message = partnerOffer.priceWithDiscount?.display
    ? `Offer received for ${partnerOffer.priceWithDiscount.display}`
    : "Offer received"

  const href = `${data.href}?partner_offer_id=${partnerOffer.internalID}`

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

const ARTWORK_FRAGMENT = graphql`
  fragment ConversationPartnerOfferCTA_artwork on Artwork {
    internalID
    href
  }
`
