import { DEFUALT_OFFER_NOTE_PREFIX } from "Apps/Order/Routes/Offer"
import { PriceOptions_artwork$data } from "__generated__/PriceOptions_artwork.graphql"

export interface OfferItem {
  price: string
  displayPriceRange?: boolean
}

type ListPriceType = PriceOptions_artwork$data["listPrice"] | undefined
type ListPriceOptionsType = (
  | {
      key: string
      value: number
      description: string
    }
  | undefined
)[]

export const getOfferItemFromOrder = (orderLineItemsNode): OfferItem | null => {
  const offerItem = orderLineItemsNode.edges[0].node.artworkOrEditionSet

  if (["Artwork", "EditionSet"].includes(offerItem?.__typename)) {
    return offerItem
  }
  return null
}

export const lastOfferNote = (note: string) => {
  if (note.startsWith(DEFUALT_OFFER_NOTE_PREFIX)) {
    return ""
  } else {
    return note
  }
}

export const getInitialOfferState = (
  listPriceOptions: ListPriceOptionsType,
  lastOffer?: number
) => {
  let lastOfferValue: number | undefined = undefined
  let selectedPriceOption = listPriceOptions[0]?.key
  let selectedPriceValue = listPriceOptions[0]?.value

  if (lastOffer) {
    const matchingPriceOption = listPriceOptions.find(
      option => option?.value === lastOffer
    )

    if (matchingPriceOption) {
      selectedPriceOption = matchingPriceOption.key
      selectedPriceValue = matchingPriceOption.value
    } else {
      lastOfferValue = lastOffer
      selectedPriceOption = "price-option-custom"
      selectedPriceValue = undefined
    }
  }

  return {
    lastOffer: lastOfferValue,
    selectedPriceOption,
    selectedPriceValue,
  }
}

export const getOfferPriceOptions = (
  listPrice: ListPriceType,
  isPriceRange?: boolean | null,
  isPartnerOfferOrder?: boolean
) => {
  return isPriceRange && !isPartnerOfferOrder
    ? getRangeOptions(listPrice)
    : getPercentageOptions(listPrice, isPartnerOfferOrder)
}

const getRangeOptions = (listPrice: ListPriceType) => {
  const minPriceRange = listPrice?.minPrice?.major
  const maxPriceRange = listPrice?.maxPrice?.major
  const midPriceRange = Math.round(
    (Number(minPriceRange) + Number(maxPriceRange)) / 2
  )
  const getRangeDetails = [
    {
      key: "max",
      value: maxPriceRange,
      description: "Top-end of range (high chance of acceptance)",
    },
    {
      key: "mid",
      value: midPriceRange,
      description: "Midpoint (good chance of acceptance)",
    },
    {
      key: "min",
      value: minPriceRange,
      description: "Low-end of range (lower chance of acceptance)",
    },
  ]

  return getRangeDetails.map((rangePrice, idx) => ({
    key: `price-option-${rangePrice.key}`,
    value: rangePrice.value!,
    description: rangePrice.description,
  }))
}

const getPercentageOptions = (
  listPrice: ListPriceType,
  isPartnerOfferOrder: boolean | undefined
) => {
  const priceLabel = isPartnerOfferOrder ? "gallery offer" : "list price"

  const percentageOptions = [
    {
      key: "max",
      percentage: 0,
      description: `${
        priceLabel.charAt(0).toUpperCase() + priceLabel.slice(1)
      }${isPartnerOfferOrder ? "" : " (high chance of acceptance)"}`,
    },
    {
      key: "mid",
      percentage: isPartnerOfferOrder ? 0.05 : 0.1,
      description: `${
        isPartnerOfferOrder ? "5%" : "10%"
      } below the ${priceLabel}${
        isPartnerOfferOrder ? "" : " (good chance of acceptance)"
      }`,
    },
    {
      key: "min",
      percentage: isPartnerOfferOrder ? 0.1 : 0.2,
      description: `${
        isPartnerOfferOrder ? "10%" : "20%"
      } below the ${priceLabel}${
        isPartnerOfferOrder
          ? ""
          : " (substantial reduction, lower chance of acceptance)"
      }`,
    },
  ]

  return percentageOptions.map((option, idx) => {
    if (listPrice?.major) {
      return {
        key: `price-option-${option.key}`,
        value: Math.round(listPrice.major * (1 - option.percentage)),
        description: option.description,
      }
    }
    return
  })
}
