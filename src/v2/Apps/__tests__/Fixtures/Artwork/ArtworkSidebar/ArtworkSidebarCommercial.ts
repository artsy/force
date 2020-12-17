import { FullArtworkFixture } from "v2/Apps/__tests__/Fixtures/Artwork/FullArtwork.fixture"

export const ForSaleArtworkNoEditions = {
  ...FullArtworkFixture,
  availability: "for sale",
  edition_sets: [],
  internalID: "43483904584390",
  is_inquireable: true,
  is_price_range: true,
  sale_message: "$40,000 - 50,000",
  slug: "for_sale_no_editions_artwrok",
}

export const ForSaleArtworkWithOneEdition = {
  ...FullArtworkFixture,
  availability: "for sale",
  edition_sets: [
    {
      dimensions: { cm: "55.9 × 83.8 cm", in: "22 × 33 in" },
      edition_of: "",
      id: "for_sale_one_edition_edition",
      is_acquireable: true,
      is_offerable: true,
      sale_message: "$2,222",
    },
  ],
  internalID: "43483904584390",
  is_inquireable: true,
  is_price_range: false,
  sale_message: "$2,222",
  slug: "for_sale_one_edition_artwrok",
}

export const ForSaleArtworkWithMultipleEditions = {
  ...FullArtworkFixture,
  availability: "for sale",
  edition_sets: [
    {
      dimensions: { cm: "33 × 23 × 32 cm", in: "13 × 9 1/10 × 12 3/5 in" },
      edition_of: "Editions 3, 5, 8-10 of 123 + 0AP",
      id: "for_sale_multiple_editions_edition_1",
      is_acquireable: true,
      is_offerable: true,
      sale_message: "$2,500 - 5,000",
    },
    {
      dimensions: { cm: "2.5 × 5.1 × 7.6 cm", in: "1 × 2 × 3 in" },
      edition_of: "",
      id: "for_sale_multiple_editions_edition_2",
      is_acquireable: true,
      is_offerable: true,
      sale_message: "On hold",
    },
    {
      dimensions: { cm: "563.9 cm diameter", in: "222 in diameter" },
      edition_of: "Edition 1/234",
      id: "for_sale_multiple_editions_edition_3",
      is_acquireable: true,
      is_offerable: true,
      sale_message: "On loan",
    },
    {
      dimensions: { cm: "2.5 × 5.1 × 7.6 cm", in: "1 × 2 × 3 in" },
      edition_of: "",
      id: "for_sale_multiple_editions_edition_4",
      is_acquireable: true,
      is_offerable: true,
      sale_message: "Sold",
    },
  ],
  internalID: "43483904584390",
  is_inquireable: true,
  is_price_range: false,
  sale_message: "$2,500 - 5,000",
  slug: "for_sale_multiple_editions_artwrok",
}

export const ContactForPriceWork = {
  ...FullArtworkFixture,
  availability: "for sale",
  edition_sets: [
    {
      dimensions: { cm: "68 × 22 cm", in: "26 4/5 × 8 7/10 in" },
      edition_of: "Edition 250/400/400",
      id: "contact_for_price_edition_1",
      is_acquireable: true,
      is_offerable: true,
      sale_message: "Contact for Price",
    },
  ],
  internalID: "43483904584390",
  is_inquireable: true,
  is_price_range: false,
  sale_message: "Contact For Price",
  slug: "contact_for_price_artwork",
}

export const ArtworkOfferableAndInquireable = {
  ...FullArtworkFixture,
  edition_sets: [],
  id: "artwork_offer_inquireable",
  internalID: "43483904584390",
  is_acquireable: false,
  is_inquireable: true,
  is_offerable: true,
  pickup_available: false,
  sale_message: "$10,000",
  shippingInfo: "Shipping: Free shipping worldwide",
  shippingOrigin: "New York, New York, US",
}

export const ArtworkBuyNow = {
  ...FullArtworkFixture,
  edition_sets: [],
  is_acquireable: true,
  is_inquireable: false,
  is_offerable: false,
  pickup_available: false,
  sale_message: "$10,000",
  shippingInfo: "Shipping: Free shipping worldwide",
  shippingOrigin: "New York, New York, US",
  slug: "artwork_buy_now",
}

export const ArtworkBuyNowWithMultipleEditions = {
  ...FullArtworkFixture,
  internalID: "43483904584390",
  edition_sets: [
    {
      id: "buy_now_multiple_editions_edition_1",
      is_acquireable: true,
      sale_message: "$2,000",
      dimensions: { cm: "33 × 23 × 32 cm", in: "13 × 9 1/10 × 12 3/5 in" },
      edition_of: "Editions 11-20 of 123 + 0AP",
      is_offerable: false,
    },
    {
      id: "buy_now_multiple_editions_edition_2",
      is_acquireable: true,
      sale_message: "$2,500",
      dimensions: { cm: "33 × 23 × 32 cm", in: "13 × 9 1/10 × 12 3/5 in" },
      edition_of: "Editions 3, 5, 8-10 of 123 + 0AP",
      is_offerable: false,
    },
    {
      id: "for_sale_multiple_editions_edition_3",
      is_acquireable: false,
      dimensions: { in: "1 × 2 × 3 in", cm: "2.5 × 5.1 × 7.6 cm" },
      sale_message: "Sold",
      edition_of: "",
      is_offerable: false,
    },
  ],
  is_acquireable: true,
  is_inquireable: false,
  is_offerable: false,
  is_price_range: true,
  pickup_available: false,
  sale_message: "$2,000 - $2,500",
  shippingInfo: "Shipping: Free shipping worldwide",
  shippingOrigin: "New York, New York, US",
  slug: "artwork_buy_now_multiple_editions",
}

export const ArtworkBuyNowSoldWithMultipleEditions = {
  ...FullArtworkFixture,
  edition_sets: [
    {
      id: "for_sale_multiple_editions_edition_4",
      is_acquireable: false,
      dimensions: { in: "1 × 2 × 3 in", cm: "2.5 × 5.1 × 7.6 cm" },
      sale_message: "Sold",
      edition_of: "",
      is_offerable: false,
    },
    {
      id: "buy_now_multiple_editions_edition_1",
      is_acquireable: false,
      sale_message: "Sold",
      dimensions: { cm: "33 × 23 × 32 cm", in: "13 × 9 1/10 × 12 3/5 in" },
      edition_of: "Editions 3, 5, 8-10 of 123 + 0AP",
      is_offerable: false,
    },
  ],
  is_acquireable: false,
  is_inquireable: false,
  is_offerable: false,
  is_price_range: false,
  pickup_available: false,
  sale_message: "Sold",
  shippingInfo: "Shipping: Free shipping worldwide",
  shippingOrigin: "New York, New York, US",
  slug: "artwork_buy_now_multiple_editions",
}

export const ArtworkSold = {
  ...FullArtworkFixture,
  edition_sets: [],
  is_acquireable: false,
  is_inquireable: false,
  is_offerable: false,
  pickup_available: false,
  sale_message: "Sold",
  shippingInfo: null,
  shippingOrigin: null,
  slug: "artwork_sold",
}

export const ArtworkMakeOffer = {
  ...FullArtworkFixture,
  edition_sets: [],
  is_acquireable: false,
  is_inquireable: false,
  is_offerable: true,
  pickup_available: false,
  sale_message: "$10,000",
  shippingInfo: "Shipping: Free shipping worldwide",
  shippingOrigin: "New York, New York, US",
  slug: "artwork_sold",
}

export const ArtworkBuyNowMakeOffer = {
  ...FullArtworkFixture,
  edition_sets: [],
  is_acquireable: true,
  is_inquireable: false,
  is_offerable: true,
  pickup_available: false,
  sale_message: "$10,000",
  shippingInfo: "Shipping: Free shipping worldwide",
  shippingOrigin: "New York, New York, US",
  slug: "artwork_buy_now_make_offer",
}

export const ArtworkSingleEditionHiddenAvailability = {
  ...FullArtworkFixture,
  edition_sets: [
    {
      id: "RWRpdGlvblNldDo1YmZkNzIwODc3M2UxZTZhMWJhYTNiNjE=",
      internalID: "5bfd7208773e1e6a1baa3b61",
      is_acquireable: false,
      dimensions: { in: "20 × 24 in", cm: "50.8 × 61 cm" },
      is_offerable: false,
      edition_of: "Edition of 25",
      sale_message: null,
    },
  ],
  is_acquireable: false,
  is_inquireable: true,
  is_offerable: false,
  pickup_available: false,
  sale_message: null,
  shippingInfo: "Shipping, tax, and service quoted by seller",
  shippingOrigin: null,
  slug: "artwork_single_etition_hidden_availability",
}
