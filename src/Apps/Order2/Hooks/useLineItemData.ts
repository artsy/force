import { useArtworkDimensions } from "Apps/Artwork/useArtworkDimensions"
import type { Order2OrderSummaryArtwork } from "Apps/Order2/Components/Order2OrderSummary"
import type { useLineItemData_lineItem$key } from "__generated__/useLineItemData_lineItem.graphql"
import { graphql, useFragment } from "react-relay"

export const useLineItemData = (
  lineItem: useLineItemData_lineItem$key,
): Order2OrderSummaryArtwork => {
  const { artworkVersion, artworkOrEditionSet, artwork } = useFragment(
    FRAGMENT,
    lineItem,
  )

  const isArtworkOrEditionSet =
    artworkOrEditionSet?.__typename === "Artwork" ||
    artworkOrEditionSet?.__typename === "EditionSet"

  const dimensions = isArtworkOrEditionSet
    ? artworkOrEditionSet.dimensions
    : undefined
  const framedDimensions = isArtworkOrEditionSet
    ? artworkOrEditionSet.framedDimensions
    : undefined
  const price = isArtworkOrEditionSet ? artworkOrEditionSet.price : undefined

  const { dimensionsLabelWithoutFrameText: dimensionsLabel } =
    useArtworkDimensions({ dimensions, framedDimensions })

  const fallbackImage =
    artwork?.figures?.[0]?.__typename === "Image" ? artwork.figures[0] : null
  const image = artworkVersion?.image?.url
    ? artworkVersion.image
    : fallbackImage

  return {
    artworkInternalID: artwork?.internalID,
    artistNames: artworkVersion?.artistNames,
    title: artworkVersion?.title,
    date: artworkVersion?.date,
    listPriceDisplay: price || "Not publicly listed",
    attributionClassLabel: artworkVersion?.attributionClass?.shortDescription,
    dimensionsLabel,
    imageURL: image?.resized?.url,
  }
}

const FRAGMENT = graphql`
  fragment useLineItemData_lineItem on LineItem {
    artworkOrEditionSet {
      __typename
      ... on Artwork {
        price
        dimensions {
          in
          cm
        }
        framedDimensions {
          in
          cm
        }
      }
      ... on EditionSet {
        price
        dimensions {
          in
          cm
        }
        framedDimensions {
          in
          cm
        }
      }
    }
    artworkVersion {
      title
      artistNames
      date
      attributionClass {
        shortDescription
      }
      image {
        url
        resized(width: 185, height: 138) {
          url
        }
      }
    }
    artwork {
      internalID
      figures(includeAll: false) {
        __typename
        ... on Image {
          resized(width: 185, height: 138) {
            url
          }
        }
      }
    }
  }
`
