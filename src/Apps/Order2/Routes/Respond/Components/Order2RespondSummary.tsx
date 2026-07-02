import { ContextModule } from "@artsy/cohesion"
import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import { Order2OrderSummary } from "Apps/Order2/Components/Order2OrderSummary"
import { useRespondContext } from "Apps/Order2/Routes/Respond/Hooks/useRespondContext"
import type { Order2RespondSummary_order$key } from "__generated__/Order2RespondSummary_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2RespondSummaryProps {
  order: Order2RespondSummary_order$key
}

const extractLineItemMetadata = (lineItem: any) => {
  const artworkVersion = lineItem?.artworkVersion
  const artwork = lineItem?.artwork

  return {
    artworkInternalID: artwork?.internalID ?? "",
    artistNames: artworkVersion?.artistNames ?? "",
    title: artworkVersion?.title ?? "",
    date: artworkVersion?.date ?? "",
    price: artwork?.price ?? "",
    attributionClass: artwork?.attributionClass ?? null,
    image: artworkVersion?.image ?? artwork?.images?.[0] ?? null,
    dimensions: artwork?.dimensions ?? null,
    framedDimensions: artwork?.framedDimensions ?? null,
  }
}

export const Order2RespondSummary: React.FC<Order2RespondSummaryProps> = ({
  order,
}) => {
  const orderData = useFragment(FRAGMENT, order)
  const { checkoutTracking, artworkPath } = useRespondContext()

  const artworkData = extractLineItemMetadata(orderData.lineItems[0]!)
  const { dimensionsLabelWithoutFrameText: dimensionsLabel } =
    useArtworkDimensions({
      dimensions: artworkData.dimensions,
      framedDimensions: artworkData.framedDimensions,
    })

  return (
    <Order2OrderSummary
      order={orderData}
      title="Offer summary"
      contextModule={ContextModule.ordersRespond}
      checkoutTracking={checkoutTracking}
      artworkPath={artworkPath}
      artwork={{
        artworkInternalID: artworkData.artworkInternalID,
        artistNames: artworkData.artistNames,
        title: artworkData.title,
        date: artworkData.date,
        listPriceDisplay: artworkData.price,
        attributionClassLabel: artworkData.attributionClass?.shortDescription,
        dimensionsLabel,
        imageURL: artworkData.image?.resized?.url,
      }}
    />
  )
}

const FRAGMENT = graphql`
  fragment Order2RespondSummary_order on Order {
    ...Order2OrderSummary_order
    lineItems {
      artworkVersion {
        artistNames
        title
        date
        image {
          resized(height: 200) {
            url
          }
        }
      }
      artwork {
        internalID
        price
        attributionClass {
          shortDescription
        }
        dimensions {
          in
          cm
        }
        framedDimensions {
          in
          cm
        }
        images(includeAll: false) {
          resized(height: 200) {
            url
          }
        }
      }
    }
  }
`
