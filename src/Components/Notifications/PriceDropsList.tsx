import { ContextModule } from "@artsy/cohesion"
import { Flex } from "@artsy/palette"
import { NotificationArtwork } from "Components/Notifications/NotificationArtwork"
import { extractNodes } from "Utils/extractNodes"
import type { FC } from "react"
import { graphql, useFragment } from "react-relay"
import type { PriceDropsList_priceDropsConnection$key } from "__generated__/PriceDropsList_priceDropsConnection.graphql"

interface PriceDropsListProps {
  priceDropsConnection?: PriceDropsList_priceDropsConnection$key | null
}

export const PriceDropsList: FC<
  React.PropsWithChildren<PriceDropsListProps>
> = props => {
  const priceDropsConnection = useFragment(
    priceDropsListFragment,
    props.priceDropsConnection,
  )

  const priceDrops = extractNodes(priceDropsConnection)

  return (
    <Flex flexDirection="column" alignItems="center">
      {priceDrops.map(priceDrop => (
        <NotificationArtwork
          key={priceDrop.artwork.internalID}
          artwork={priceDrop.artwork}
          contextModule={ContextModule.activity}
        />
      ))}
    </Flex>
  )
}

// TODO: rename file and component to NotificationPriceDropsList
export const priceDropsListFragment = graphql`
  fragment PriceDropsList_priceDropsConnection on PriceDropConnection {
    edges {
      node {
        ...PriceDrop_priceDrop
        artwork {
          internalID
          ...NotificationArtwork_artwork
        }
      }
    }
  }
`
