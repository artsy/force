export const mockResolver = (
  orderDetails: any = BuyOrderWithShippingDetails
) => ({
  CommerceBuyOrder: (_, { id, ...others }) => {
    return {
      ...orderDetails,
      id,
      ...others,
    }
  },
  CommerceOfferOrder: (_, { id, ...others }) => {
    return {
      ...orderDetails,
      id,
      ...others,
    }
  },
  CommerceOrder: (_, { id, ...others }) => {
    return {
      ...orderDetails,
      id,
      ...others,
      __resolveType(obj, _context, _info) {
        return obj.mode === "BUY" ? "CommerceBuyOrder" : "CommerceOfferOrder"
      },
    }
  },
  Query: () => ({
    me: {
      name: "Alice Jane",
    },
  }),
})

const OrderArtworkNodeWithoutShipping = {
  artist_names: "Lisa Breslow",
  artists: [
    {
      id: "239084092",
      internalID: "artistId",
      slug: "artistId",
    },
  ],
  attribution_class: null,
  date: "2016",
  dimensions: {
    cm: "91.4 × 91.4 cm",
    in: "36 × 36 in",
  },
  edition_sets: [],
  euShippingOrigin: false,
  href: "/artwork/artworkID",
  id: "02393",
  image: {
    resized: {
      url:
        "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=185&height=184&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FtOfWds4sIX_9WpRf3RqaQQ%2Flarge.jpg",
    },
    resized_ArtworkSummaryItem: {
      url:
        "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=185&height=184&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FtOfWds4sIX_9WpRf3RqaQQ%2Flarge.jpg",
    },
  },
  internalID: "artworkId",
  is_acquireable: true as boolean,
  is_offerable: true as boolean,
  listPrice: {
    __typename: "Money",
    major: 10000,
  },
  medium: "Oil and pencil on panel",
  onlyShipsDomestically: false,
  partner: {
    id: "1234",
    initials: "AG",
    name: "A Gallery",
    profile: {
      icon: {
        url: "www.artsy.net",
      },
      id: "12345",
    },
    href: "/partner/a-g",
  },
  pickup_available: true,
  priceCurrency: "USD",
  shippingCountry: "US",
  slug: "artworkId",
  title: "Gramercy Park South",
}

const OrderArtworkNode = {
  artwork: {
    ...OrderArtworkNodeWithoutShipping,
    shippingOrigin: "New York, NY",
    artaShippingEnabled: false,
    domesticShippingFee: {
      minor: 10000,
      major: 100,
      display: "$100",
    },
    internationalShippingFee: {
      minor: 10000,
      major: 100,
      display: "$100",
    },
  },
}

const ArtaEnabledOrderArtworkNode = {
  artwork: {
    ...OrderArtworkNodeWithoutShipping,
    shippingOrigin: "New York, NY",
    artaShippingEnabled: true,
    domesticShippingFee: {
      minor: 10000,
      major: 100,
      display: "$100",
    },
    internationalShippingFee: {
      minor: 10000,
      major: 100,
      display: "$100",
    },
  },
}

const InquiryOrderArtworkNode = {
  artwork: {
    ...OrderArtworkNodeWithoutShipping,
    shippingOrigin: null,
    domesticShippingFee: null,
    internationalShippingFee: null,
  },
}

const OrderArtworkOrEditionSetkNode_Artwork = {
  artworkOrEditionSet: {
    __typename: "Artwork",
    displayPriceRange: false as boolean,
    id: "art123",
    price: "$12,000",
  },
}

const OfferArtworkOrEditionSetkNode_Artwork = {
  artworkOrEditionSet: {
    __typename: "Artwork",
    displayPriceRange: false as boolean,
    id: "art123",
    price: "$16,000",
  },
}

const OfferArtworkOrEditionSetkNode_ArtworkInPounds = {
  artworkOrEditionSet: {
    __typename: "Artwork",
    displayPriceRange: false as boolean,
    id: "art123",
    price: "£16,000",
  },
}

const OfferArtworkOrEditionSetkNode_Range = {
  artworkOrEditionSet: {
    __typename: "EditionSet",
    displayPriceRange: true as boolean,
    id: "ed123",
    price: "$14,000 - 18,000",
  },
}

const OrderArtworkFulfillmentsNode = {
  fulfillments: {
    edges: [
      {
        node: {
          courier: "UPS",
          estimatedDelivery: "Friday, August 6",
          id: "fullfillment-id",
          trackingId: "AP234345634",
        },
      },
    ],
  },
}

export const UntouchedOrder = {
  buyerTotal: "$12,000",
  code: "abcdefg",
  createdAt: "2019-12-19T06:01:17.171Z",
  creditCard: null,
  currencyCode: "USD",
  id: "2939023",
  internalID: "2939023",
  itemsTotal: "$12,000",
  lastTransactionFailed: false,
  lineItems: {
    edges: [
      {
        node: {
          editionSetId: null,
          id: "line-item-node-id",
          shippingQuoteOptions: null,
          ...OrderArtworkNode,
          ...OrderArtworkOrEditionSetkNode_Artwork,
          ...OrderArtworkFulfillmentsNode,
        },
      },
    ],
  },
  requestedFulfillment: null,
  sellerDetails: {
    __typename: "Partner",
    id: "partner-node-id",
    locations: [
      {
        city: "New York",
        country: "US",
        state: "NY",
      },
    ],
    name: "Kathryn Markel Fine Arts",
  },
  shippingTotal: null,
  shippingTotalCents: null,
  state: "PENDING",
  stateExpiresAt: "Jan 15",
  stateReason: null,
  taxTotal: null,
  taxTotalCents: null,
  totalListPriceCents: 1200000,
} as const

export const UntouchedBuyOrder = {
  ...UntouchedOrder,
  __typename: "CommerceBuyOrder",
  mode: "BUY",
} as const

export const UntouchedBuyOrderWithArtaEnabled = {
  ...UntouchedBuyOrder,
  __typename: "CommerceBuyOrder",
  lineItems: {
    edges: [
      {
        node: {
          editionSetId: null,
          id: "line-item-node-id",
          shippingQuoteOptions: null,
          ...ArtaEnabledOrderArtworkNode,
          ...OrderArtworkOrEditionSetkNode_Artwork,
          ...OrderArtworkFulfillmentsNode,
        },
      },
    ],
  },
} as const

export const UntouchedBuyOrderWithShippingQuotes = {
  ...UntouchedBuyOrder,
  __typename: "CommerceBuyOrder",
  lineItems: {
    edges: [
      {
        node: {
          editionSetId: null,
          id: "line-item-node-id",
          shippingQuoteOptions: {
            edges: [
              {
                node: {
                  id: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
                  tier: "select",
                  name: "",
                  isSelected: false,
                  priceCents: 400,
                  priceCurrency: "USD",
                  price: "$4.00",
                },
              },
              {
                node: {
                  id: "d8cfee28-8139-4391-8a8d-3010633e885b",
                  tier: "parcel",
                  name: "Next Day Air",
                  isSelected: false,
                  priceCents: 400,
                  priceCurrency: "USD",
                  price: "$4.00",
                },
              },
              {
                node: {
                  id: "1cbfad12-a90d-4e79-9753-02bf4fcc7f80",
                  tier: "parcel",
                  name: "Second Day Air",
                  isSelected: false,
                  priceCents: 400,
                  priceCurrency: "USD",
                  price: "$4.00",
                },
              },
              {
                node: {
                  id: "4a8f8080-23d3-4c0e-9811-7a41a9df6933",
                  tier: "parcel",
                  name: "Ground",
                  isSelected: false,
                  priceCents: 400,
                  priceCurrency: "USD",
                  price: "$4.00",
                },
              },
              {
                node: {
                  id: "278ba0c4-f815-4197-8a8d-b97f1883db21",
                  tier: "premium",
                  name: "",
                  isSelected: false,
                  priceCents: 200,
                  priceCurrency: "USD",
                  price: "$2.00",
                },
              },
            ],
          },
          ...ArtaEnabledOrderArtworkNode,
          ...OrderArtworkOrEditionSetkNode_Artwork,
          ...OrderArtworkFulfillmentsNode,
        },
      },
    ],
  },
} as const

export const UntouchedBuyOrderWithSelectedShippingQuote = {
  ...UntouchedBuyOrder,
  __typename: "CommerceBuyOrder",
  lineItems: {
    edges: [
      {
        node: {
          editionSetId: null,
          id: "line-item-node-id",
          shippingQuoteOptions: {
            edges: [
              {
                node: {
                  id: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
                  tier: "select",
                  name: "",
                  isSelected: true,
                  priceCents: 400,
                  priceCurrency: "USD",
                  price: "$4.00",
                },
              },
              {
                node: {
                  id: "d8cfee28-8139-4391-8a8d-3010633e885b",
                  tier: "parcel",
                  name: "Next Day Air",
                  isSelected: false,
                  priceCents: 400,
                  priceCurrency: "USD",
                  price: "$4.00",
                },
              },
              {
                node: {
                  id: "1cbfad12-a90d-4e79-9753-02bf4fcc7f80",
                  tier: "parcel",
                  name: "Second Day Air",
                  isSelected: false,
                  priceCents: 400,
                  priceCurrency: "USD",
                  price: "$4.00",
                },
              },
              {
                node: {
                  id: "4a8f8080-23d3-4c0e-9811-7a41a9df6933",
                  tier: "parcel",
                  name: "Ground",
                  isSelected: false,
                  priceCents: 400,
                  priceCurrency: "USD",
                  price: "$4.00",
                },
              },
              {
                node: {
                  id: "278ba0c4-f815-4197-8a8d-b97f1883db21",
                  tier: "premium",
                  name: "",
                  isSelected: false,
                  priceCents: 200,
                  priceCurrency: "USD",
                  price: "$2.00",
                },
              },
            ],
          },
          ...ArtaEnabledOrderArtworkNode,
          ...OrderArtworkOrEditionSetkNode_Artwork,
          ...OrderArtworkFulfillmentsNode,
        },
      },
    ],
  },
} as const

export const TaxTotals = {
  taxTotal: "$120",
  taxTotalCents: 12000,
} as const

export const ShippingTotals = {
  shippingTotal: "$200",
  shippingTotalCents: 20000,
} as const

export const OfferWithTotals = {
  amount: "$14,000",
  amountCents: 1400000,
  currencyCode: "USD",
  id: "myoffer-id",
  internalID: "myoffer-id",
  ...ShippingTotals,
  ...TaxTotals,
  buyerTotal: "$14,320",
  buyerTotalCents: 1432000,
  createdAt: "2019-08-01T20:34:27.467Z",
  fromParticipant: "SELLER",
  note: "Another note!",
} as const

export const OfferWithoutTotals = {
  amount: "$14,000",
  amountCents: 1400000,
  currencyCode: "USD",
  id: "myoffer-id",
  internalID: "myoffer-id",
  buyerTotal: "$14,320",
  buyerTotalCents: 1432000,
  createdAt: "2019-08-01T20:34:27.467Z",
  fromParticipant: "SELLER",
  note: "Another note!",
} as const

export const UntouchedOfferOrder = {
  ...UntouchedOrder,
  __typename: "CommerceOfferOrder",
  awaitingResponseFrom: null,
  currencyCode: "USD",
  itemsTotal: "$16,000",
  itemsTotalCents: 1600000,
  lastOffer: null,
  lineItems: {
    edges: [
      {
        node: {
          editionSetId: null,
          id: "line-item-node-id",
          shippingQuoteOptions: null,
          ...OrderArtworkNode,
          ...OfferArtworkOrEditionSetkNode_Artwork,
          ...OrderArtworkFulfillmentsNode,
        },
      },
    ],
  },
  isInquiryOrder: false,
  mode: "OFFER",
  myLastOffer: null,
  conversation: null,
  offers: {
    edges: [{ node: OfferWithTotals }],
  },
  totalListPriceCents: 1600000,
} as const

export const UntouchedInquiryOfferOrder = {
  ...UntouchedOfferOrder,
  lineItems: {
    offers: {
      edges: [
        {
          node: OfferWithoutTotals,
        },
      ],
    },
    edges: [
      {
        node: {
          editionSetId: null,
          id: "line-item-node-id",
          shippingQuoteOptions: null,
          ...InquiryOrderArtworkNode,
          ...OfferArtworkOrEditionSetkNode_Artwork,
          ...OrderArtworkFulfillmentsNode,
        },
      },
    ],
  },
} as const

export const UntouchedOfferOrderInPounds = {
  ...UntouchedOfferOrder,
  currencyCode: "GBP",
  itemsTotal: "£16,000",
  lineItems: {
    edges: [
      {
        node: {
          editionSetId: null,
          id: "line-item-node-id",
          shippingQuoteOptions: null,
          ...OrderArtworkNode,
          ...OfferArtworkOrEditionSetkNode_ArtworkInPounds,
          ...OrderArtworkFulfillmentsNode,
        },
      },
    ],
  },
} as const

export const UntouchedOfferOrderWithRange = {
  ...UntouchedOfferOrder,
  lineItems: {
    edges: [
      {
        node: {
          editionSetId: null,
          id: "line-item-node-id",
          shippingQuoteOptions: null,
          ...OrderArtworkNode,
          ...OfferArtworkOrEditionSetkNode_Range,
          ...OrderArtworkFulfillmentsNode,
        },
      },
    ],
  },
} as const

export const OfferOrderWithOffers = {
  ...UntouchedOfferOrder,
  lastOffer: OfferWithTotals,
  conversation: {
    internalID: "5665",
  },
  myLastOffer: {
    ...OfferWithTotals,
    hasDefiniteTotal: true,
    fromParticipant: "BUYER",
    id: "my-last-offer-id-no-note",
    internalID: "my-last-offer-id-no-note",
    note: null,
  },
} as const

export const OfferOrderWithOffersAndNote = {
  ...UntouchedOfferOrder,
  lastOffer: OfferWithTotals,
  conversation: {
    internalID: "5665",
  },
  myLastOffer: {
    ...OfferWithTotals,
    hasDefiniteTotal: true,
    fromParticipant: "BUYER",
    id: "my-last-offer-id-with-note",
    internalID: "my-last-offer-id-with-note",
    note: "This is a note!",
  },
} as const

export const ShippingDetails = {
  buyerPhoneNumber: "120938120983",
  requestedFulfillment: {
    __typename: "CommerceShip",
    addressLine1: "401 Broadway",
    addressLine2: "Suite 25",
    city: "New York",
    country: "US",
    fulfillmentType: "SHIP",
    name: "Joelle Van Dyne",
    phoneNumber: "120938120983",
    postalCode: "10013",
    region: "NY",
  },
} as const

export const ArtaShippingDetails = {
  buyerPhoneNumber: "120938120983",
  requestedFulfillment: {
    __typename: "CommerceShipArta",
    addressLine1: "401 Broadway",
    addressLine2: "Suite 25",
    city: "New York",
    country: "US",
    fulfillmentType: "SHIP_ARTA",
    name: "Joelle Van Dyne",
    phoneNumber: "120938120983",
    postalCode: "10013",
    region: "NY",
  },
} as const

export const PaymentDetails = {
  creditCard: {
    brand: "Visa",
    city: "New York",
    country: "US",
    expirationMonth: 3,
    expirationYear: 21,
    id: "relay-node-id",
    internalID: "gravity-credit-card-id",
    lastDigits: "4444",
    name: "Dr. Collector",
    postalCode: "90210",
    state: "NY",
    street1: "1 Art st",
    street2: null,
  },
} as const

export const BuyOrderWithShippingDetails = {
  ...UntouchedBuyOrder,
  ...ShippingDetails,
  ...PaymentDetails,
} as const

export const OfferOrderWithShippingDetails = {
  ...OfferOrderWithOffers,
  ...ShippingDetails,
  ...PaymentDetails,
} as const

export const OfferOrderWithShippingDetailsAndNote = {
  ...OfferOrderWithOffersAndNote,
  ...ShippingDetails,
  ...PaymentDetails,
} as const

export const BuyOrderWithArtaShippingDetails = {
  ...UntouchedBuyOrderWithShippingQuotes,
  ...ArtaShippingDetails,
  ...PaymentDetails,
} as const

export const BuyOrderWithSelectedShippingQuote = {
  ...UntouchedBuyOrderWithSelectedShippingQuote,
  ...ArtaShippingDetails,
  ...PaymentDetails,
} as const

export const BuyOrderPickup = {
  ...UntouchedBuyOrder,
  buyerPhoneNumber: "120938120983",
  requestedFulfillment: {
    __typename: "CommercePickup",
    fulfillmentType: "PICKUP",
  },
} as const

export const OfferOrderPickup = {
  ...OfferOrderWithOffers,
  buyerPhoneNumber: "120938120983",
  requestedFulfillment: {
    __typename: "CommercePickup",
    fulfillmentType: "PICKUP",
  },
} as const

export const Buyer = {
  __typename: "User",
  id: "buyer-node-id",
  internalID: "buyer",
} as const

export const Seller = {
  __typename: "Partner",
  id: "seller-node-id",
  internalID: "seller",
} as const

export const Offers = [
  {
    node: {
      amount: OfferWithTotals.amount,
      createdAt: "May 22",
      currencyCode: "USD",
      fromParticipant: OfferWithTotals.fromParticipant,
      id: OfferWithTotals.id,
      internalID: OfferWithTotals.internalID,
    },
  },
  {
    node: {
      amount: "$1,200.00",
      createdAt: "May 21",
      currencyCode: "USD",
      fromParticipant: "BUYER",
      id: "0",
      internalID: "0",
    },
  },
  {
    node: {
      amount: "$1,500.00",
      createdAt: "Apr 30",
      currencyCode: "USD",
      fromParticipant: "SELLER",
      id: "1",
      internalID: "1",
    },
  },
  {
    node: {
      amount: "$1,100.00",
      createdAt: "Apr 5",
      currencyCode: "USD",
      fromParticipant: "BUYER",
      id: "2",
      internalID: "2",
    },
  },
] as const

export const OfferOrderWithMissingMetadata = {
  ...UntouchedInquiryOfferOrder,
  ...ShippingDetails,
  ...PaymentDetails,
  lastOffer: {
    ...OfferWithoutTotals,
    shippingTotalCents: null,
    shippingTotal: null,
    taxTotal: null,
    taxTotalCents: null,
  },
  conversation: {
    internalID: "5665",
  },
  myLastOffer: {
    ...OfferWithoutTotals,
    shippingTotalCents: null,
    shippingTotal: null,
    taxTotal: null,
    taxTotalCents: null,
    fromParticipant: "BUYER",
    id: "my-last-offer-id-no-note",
    internalID: "my-last-offer-id-no-note",
    note: null,
    hasDefiniteTotal: false,
  },
  isInquiryOrder: true,
} as const
