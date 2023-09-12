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

export const DEFUALT_OFFER_NOTE_PREFIX = "I sent an offer for"

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
  customOffer?: number
) => {
  let customOfferValue: number | undefined = undefined
  let selectedPriceOption = listPriceOptions[0]?.key
  let selectedPriceValue = listPriceOptions[0]?.value

  if (customOffer) {
    const matchingPriceOption = listPriceOptions.find(
      option => option?.value === customOffer
    )

    if (matchingPriceOption) {
      selectedPriceOption = matchingPriceOption.key
      selectedPriceValue = matchingPriceOption.value
    } else {
      customOfferValue = customOffer
      selectedPriceOption = "price-option-custom"
      selectedPriceValue = undefined
    }
  }

  return {
    customOffer: customOfferValue,
    selectedPriceOption,
    selectedPriceValue,
  }
}

export const getOfferPriceOptions = (
  listPrice: ListPriceType,
  isPriceRange?: boolean | null
) => {
  return isPriceRange
    ? getRangeOptions(listPrice)
    : getPercentageOptions(listPrice)
}

const getRangeOptions = (listPrice: ListPriceType) => {
  const minPriceRange = listPrice?.minPrice?.major
  const maxPriceRange = listPrice?.maxPrice?.major
  const midPriceRange = Math.round(
    (Number(minPriceRange) + Number(maxPriceRange)) / 2
  )
  const getRangeDetails = [
    {
      value: maxPriceRange,
      description: "Top-end of range (high chance of acceptance)",
    },
    {
      value: midPriceRange,
      description: "Midpoint (good chance of acceptance)",
    },
    {
      value: minPriceRange,
      description: "Low-end of range (lower chance of acceptance)",
    },
  ]

  return getRangeDetails.map((rangePrice, idx) => ({
    key: `price-option-${idx}`,
    value: rangePrice.value!,
    description: rangePrice.description,
  }))
}

const getPercentageOptions = (listPrice: ListPriceType) => {
  const percentageOptions = [
    { percentage: 0, description: "List price (high chance of acceptance)" },
    {
      percentage: 0.1,
      description: "10% below the list price (good chance of acceptance)",
    },
    {
      percentage: 0.2,
      description:
        "20% below the list price (substantial reduction, lower chance of acceptance)",
    },
  ]

  return percentageOptions.map((option, idx) => {
    if (listPrice?.major) {
      return {
        key: `price-option-${idx}`,
        value: Math.round(listPrice.major * (1 - option.percentage)),
        description: option.description,
      }
    }
    return
  })
}
