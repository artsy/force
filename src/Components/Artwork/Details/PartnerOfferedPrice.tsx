import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SkeletonText, Text } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { SaleMessage } from "./Details"
import { PartnerOfferedPriceQuery } from "__generated__/PartnerOfferedPriceQuery.graphql"
import { PartnerOfferedPrice_artwork$data } from "__generated__/PartnerOfferedPrice_artwork.graphql"
import { Details_artwork$data } from "__generated__/Details_artwork.graphql"

interface PartnerOfferedPriceProps {
  artwork: PartnerOfferedPrice_artwork$data
  fallback: object
}

const PartnerOfferedPrice: React.FC<PartnerOfferedPriceProps> = ({
  artwork,
  fallback,
}) => {
  const partnerOffer = artwork?.collectorSignals?.partnerOffer
  const offeredPrice = partnerOffer?.priceWithDiscount?.display

  return partnerOffer ? <Text lineHeight="22px">{offeredPrice}</Text> : fallback
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
      placeholder={<SkeletonText variant="sm-display">Loading</SkeletonText>}
      variables={{ id }}
      render={({ error, props }) => {
        const publicPrice = <SaleMessage artwork={artwork} />

        if (error || !props?.artwork) {
          return <SkeletonText variant="sm-display">Loading</SkeletonText>
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
