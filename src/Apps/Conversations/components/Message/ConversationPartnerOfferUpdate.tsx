import MoneyFillIcon from "@artsy/icons/MoneyFillIcon"
import type { FlexProps } from "@artsy/palette"
import { useFlag } from "@unleash/proxy-client-react"
import { useConversationsContext } from "Apps/Conversations/ConversationsContext"
import { ConversationEventRow } from "Apps/Conversations/components/Message/ConversationEventRow"
import { useTimer } from "Utils/Hooks/useTimer"
import type { ConversationPartnerOfferUpdate_artwork$key } from "__generated__/ConversationPartnerOfferUpdate_artwork.graphql"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"

interface ConversationPartnerOfferUpdateProps extends FlexProps {
  artwork?: ConversationPartnerOfferUpdate_artwork$key | null
}

export const ConversationPartnerOfferUpdate: FC<
  React.PropsWithChildren<ConversationPartnerOfferUpdateProps>
> = ({ artwork, ...flexProps }) => {
  const isPartnerOfferConvoEnabled = useFlag("topaz_partner-offer-convo")

  const data = useFragment(ARTWORK_FRAGMENT, artwork)

  const { findPartnerOffer } = useConversationsContext()

  const partnerOffer = data?.internalID
    ? findPartnerOffer(data.internalID)
    : null

  const { hasEnded } = useTimer(partnerOffer?.endAt ?? "")

  if (!isPartnerOfferConvoEnabled || !partnerOffer) {
    return null
  }

  const isExpired = hasEnded || !partnerOffer.isAvailable
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

const ARTWORK_FRAGMENT = graphql`
  fragment ConversationPartnerOfferUpdate_artwork on Artwork {
    internalID
  }
`
