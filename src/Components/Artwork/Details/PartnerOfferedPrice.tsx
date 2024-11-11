import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Flex, Text } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { SaleMessage } from "./Details"
import { useTimer } from "Utils/Hooks/useTimer"
import { PartnerOfferedPriceQuery } from "__generated__/PartnerOfferedPriceQuery.graphql"
import { PartnerOfferedPrice_artwork$data } from "__generated__/PartnerOfferedPrice_artwork.graphql"
import { Details_artwork$data } from "__generated__/Details_artwork.graphql"

interface PartnerOfferedPriceProps {
  artwork: PartnerOfferedPrice_artwork$data
  fallback: object
}

interface PartnerOfferLineProps {
  artwork: PartnerOfferedPrice_artwork$data
}

const ActivePartnerOfferTimer: React.FC<PartnerOfferLineProps> = ({
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
      color="red100"
      alignSelf="flex-start"
    >
      Exp.{SEPARATOR}
      {Number(days)}d{SEPARATOR}
      {Number(hours)}h{SEPARATOR}
    </Text>
  )
}

const PartnerOfferedPrice: React.FC<PartnerOfferedPriceProps> = ({
  artwork,
  fallback,
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
    fallback
  )
}

const PartnerOfferedPriceFragmentContainer = createFragmentContainer(
  PartnerOfferedPrice,
  {
    artwork: graphql`
      fragment PartnerOfferedPrice_artwork on Artwork {
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
  }
)

interface PartnerOfferedPriceQueryRendererProps {
  id: string
  artwork: Details_artwork$data
}

export const PartnerOfferedPriceQueryRenderer: FC<PartnerOfferedPriceQueryRendererProps> = ({
  id,
  artwork,
}) => {
  return (
    <SystemQueryRenderer<PartnerOfferedPriceQuery>
      lazyLoad
      query={graphql`
        query PartnerOfferedPriceQuery($id: String!) {
          artwork(id: $id) {
            ...PartnerOfferedPrice_artwork
          }
        }
      `}
      placeholder={<SaleMessage artwork={artwork} />}
      variables={{ id }}
      render={({ error, props }) => {
        const publicPrice = <SaleMessage artwork={artwork} />

        if (error || !props?.artwork) {
          return publicPrice
        }

        return (
          <PartnerOfferedPriceFragmentContainer
            artwork={props.artwork}
            fallback={publicPrice}
          />
        )
      }}
    />
  )
}
