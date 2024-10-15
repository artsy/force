import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Flex, Text } from "@artsy/palette"
import { useTimer } from "Utils/Hooks/useTimer"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { PartnerOfferLineQuery } from "__generated__/PartnerOfferLineQuery.graphql"
import { PartnerOfferLine_artwork$data } from "__generated__/PartnerOfferLine_artwork.graphql"

interface PartnerOfferLineProps {
  artwork: PartnerOfferLine_artwork$data
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
      px={0.5}
      alignSelf="flex-start"
    >
      Exp.{SEPARATOR}
      {Number(days)}d{SEPARATOR}
      {Number(hours)}h{SEPARATOR}
    </Text>
  )
}

const PartnerOfferLine: React.FC<PartnerOfferLineProps> = ({ artwork }) => {
  return (
    <Flex flexDirection="row" alignItems="center">
      <ActivePartnerOfferTimer artwork={artwork} />
    </Flex>
  )
}

const PartnerOfferLineFragmentContainer = createFragmentContainer(
  PartnerOfferLine,
  {
    artwork: graphql`
      fragment PartnerOfferLine_artwork on Artwork {
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

interface PartnerOfferLineQueryRendererProps {
  id: string
}

export const PartnerOfferLineQueryRenderer: FC<PartnerOfferLineQueryRendererProps> = ({
  id,
}) => {
  return (
    <SystemQueryRenderer<PartnerOfferLineQuery>
      lazyLoad
      query={graphql`
        query PartnerOfferLineQuery($id: String!) {
          artwork(id: $id) {
            ...PartnerOfferLine_artwork
          }
        }
      `}
      placeholder={<></>}
      variables={{ id }}
      render={({ error, props }) => {
        if (error || !props?.artwork) {
          return null
        }

        return <PartnerOfferLineFragmentContainer artwork={props.artwork} />
      }}
    />
  )
}
