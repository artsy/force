import { DEFUALT_OFFER_NOTE_PREFIX } from "Apps/Order/Routes/Offer"
import type { PriceOptions_artwork$data } from "__generated__/PriceOptions_artwork.graphql"

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
  let lastOfferValue: number | undefined
  let selectedPriceOption: string | undefined
  let selectedPriceValue: number | undefined

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
      description: "Top-end of range",
    },
    {
      key: "mid",
      value: midPriceRange,
      description: "Midpoint",
    },
    {
      key: "min",
      value: minPriceRange,
      description: "Low-end of range",
    },
  ]

  return getRangeDetails.map((rangePrice, _idx) => ({
    key: `price-option-${rangePrice.key}`,
    value: rangePrice.value!,
    description: rangePrice.description,
  }))
}

const getPercentageOptions = (
  listPrice: ListPriceType,
  isPartnerOfferOrder: boolean | undefined
) => {
  let percentageOptions
  if (isPartnerOfferOrder) {
    percentageOptions = [
      { key: "max", percentage: 0, description: "Gallery offer" },
      {
        key: "mid",
        percentage: 0.05,
        description: "5% below the gallery offer",
      },
      {
        key: "min",
        percentage: 0.1,
        description: "10% below the gallery offer",
      },
    ]
  } else {
    percentageOptions = [
      {
        key: "max",
        percentage: 0,
        description: "List price",
      },
      {
        key: "mid",
        percentage: 0.1,
        description: "10% below the list price",
      },
      {
        key: "min",
        percentage: 0.2,
        description: "20% below the list price",
      },
    ]
  }

  return percentageOptions.map((option, _idx) => {
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
