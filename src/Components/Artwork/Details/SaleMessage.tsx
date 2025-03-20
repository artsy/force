import { Flex, Text } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useTimer } from "Utils/Hooks/useTimer"
import type { Details_artwork$data } from "__generated__/Details_artwork.graphql"
import type { SaleMessageQuery } from "__generated__/SaleMessageQuery.graphql"
import type { SaleMessage_artwork$data } from "__generated__/SaleMessage_artwork.graphql"
import type { FC, ReactElement } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface PublicSaleMessageProps {
  artwork: Details_artwork$data
}

interface ActivePartnerOfferTimerProps {
  artwork: SaleMessage_artwork$data
}

interface SaleMessageProps {
  artwork: SaleMessage_artwork$data
  publicSaleMessage: ReactElement
}

const PublicSaleMessage: React.FC<PublicSaleMessageProps> = props => {
  const {
    artwork: { sale, sale_message, sale_artwork },
  } = props

  if (sale?.is_auction && !sale?.is_closed) {
    const highestBid_display = sale_artwork?.highest_bid?.display
    const openingBid_display = sale_artwork?.opening_bid?.display

    return <>{highestBid_display || openingBid_display || ""}</>
  }

  // NBSP is used to prevent un-aligned carousels
  return <>{sale_message ?? " "}</>
}

const ActivePartnerOfferTimer: React.FC<ActivePartnerOfferTimerProps> = ({
  artwork: { collectorSignals },
}) => {
  const SEPARATOR = <>&nbsp;</>
  const { endAt } = collectorSignals?.partnerOffer ?? {}
  const { time } = useTimer(endAt ?? "")
  const { days, hours } = time

  return (
    <Text
      variant="sm-display"
      lineHeight="22px"
      color="blue100"
      alignSelf="flex-start"
      fontWeight="normal"
    >
      Exp.{SEPARATOR}
      {Number(days)}d{SEPARATOR}
      {Number(hours)}h{SEPARATOR}
    </Text>
  )
}

const SaleMessage: React.FC<SaleMessageProps> = ({
  artwork,
  publicSaleMessage,
}) => {
  const partnerOffer = artwork?.collectorSignals?.partnerOffer
  const offeredPrice = partnerOffer?.priceWithDiscount?.display

  return partnerOffer ? (
    <Flex flexDirection="row" alignItems="center">
      <Text lineHeight="22px">{offeredPrice}</Text>
      &nbsp;
      <ActivePartnerOfferTimer artwork={artwork} />
    </Flex>
  ) : (
    publicSaleMessage
  )
}

const SaleMessageFragmentContainer = createFragmentContainer(SaleMessage, {
  artwork: graphql`
    fragment SaleMessage_artwork on Artwork {
      collectorSignals {
        partnerOffer {
          endAt
          priceWithDiscount {
            display
          }
        }
      }
    }
  `,
})

interface SaleMessageQueryRendererProps {
  id: string
  artwork: Details_artwork$data
}

export const SaleMessageQueryRenderer: FC<SaleMessageQueryRendererProps> = ({
  id,
  artwork,
}) => {
  const publicSaleMessage = <PublicSaleMessage artwork={artwork} />

  return (
    <SystemQueryRenderer<SaleMessageQuery>
      lazyLoad
      query={graphql`
        query SaleMessageQuery($id: String!) {
          artwork(id: $id) {
            ...SaleMessage_artwork
          }
        }
      `}
      placeholder={publicSaleMessage}
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props?.artwork) {
          return publicSaleMessage
        }

        return (
          <SaleMessageFragmentContainer
            artwork={props.artwork}
            publicSaleMessage={publicSaleMessage}
          />
        )
      }}
    />
  )
}
