export const mockResolver = (
  orderDetails: any = BuyOrderWithShippingDetails
) => ({
  Query: () => ({
    me: {
      name: "Alice Jane",
    },
  }),
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
})

export const UntouchedOrder = {
  internalID: "2939023",
  id: "2939023",
  code: "abcdefg",
  state: "PENDING",
  stateReason: null,
  stateExpiresAt: "Jan 15",
  itemsTotal: "$12,000",
  totalListPrice: "$12,000",
  totalListPriceCents: 1200000,
  shippingTotal: null,
  shippingTotalCents: null,
  taxTotal: null,
  taxTotalCents: null,
  creditCard: null,
  buyerTotal: "$12,000",
  requestedFulfillment: null,
  lastTransactionFailed: false,
  currencyCode: "USD",
  createdAt: "2019-12-19T06:01:17.171Z",
  lineItems: {
    edges: [
      {
        node: {
          id: "line-item-node-id",
          artwork: {
            id: "02393",
            internalID: "artworkId",
            href: "/artwork/artworkID",
            slug: "artworkId",
            pickup_available: true,
            artist_names: "Lisa Breslow",
            title: "Gramercy Park South",
            date: "2016",
            shippingOrigin: "New York, NY",
            medium: "Oil and pencil on panel",
            onlyShipsDomestically: false,
            euShippingOrigin: false,
            shippingCountry: "US",
            is_acquireable: true as boolean,
            is_offerable: false as boolean,
            partner: {
              name: "A Gallery",
              id: "1234",
              initials: "AG",
              slug: "a-g",
              profile: {
                id: "12345",
                icon: {
                  url: "www.artsy.net",
                },
              },
            },
            dimensions: {
              in: "36 × 36 in",
              cm: "91.4 × 91.4 cm",
            },
            edition_sets: [],
            artists: [
              {
                internalID: "artistId",
                slug: "artistId",
                id: "239084092",
              },
            ],
            attribution_class: null,
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
          },
          fulfillments: {
            edges: [
              {
                node: {
                  id: "fullfillment-id",
                  courier: "UPS",
                  trackingId: "AP234345634",
                  estimatedDelivery: "Friday, August 6",
                },
              },
            ],
          },
          editionSetId: null,
        },
      },
    ],
  },
  sellerDetails: {
    __typename: "Partner",
    id: "partner-node-id",
    name: "Kathryn Markel Fine Arts",
    locations: [
      {
        city: "New York",
        state: "NY",
        country: "US",
      },
    ],
  },
} as const

export const UntouchedBuyOrder = {
  ...UntouchedOrder,
  __typename: "CommerceBuyOrder",
  mode: "BUY",
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
  id: "myoffer-id",
  internalID: "myoffer-id",
  amount: "$14,000",
  amountCents: 1400000,
  currencyCode: "USD",
  ...ShippingTotals,
  ...TaxTotals,
  createdAt: "2019-08-01T20:34:27.467Z",
  fromParticipant: "SELLER",
  buyerTotal: "$14,320",
  buyerTotalCents: 1432000,
  note: "Another note!",
} as const

export const UntouchedOfferOrder = {
  ...UntouchedOrder,
  __typename: "CommerceOfferOrder",
  mode: "OFFER",
  currencyCode: "USD",
  totalListPrice: "$16,000",
  totalListPriceCents: 1600000,
  itemsTotal: "$16,000",
  itemsTotalCents: 1600000,
  lastOffer: null,
  awaitingResponseFrom: null,
  myLastOffer: null,
  offers: {
    edges: [{ node: OfferWithTotals }],
  },
} as const

export const OfferOrderWithOffers = {
  ...UntouchedOfferOrder,
  lastOffer: OfferWithTotals,
  myLastOffer: {
    ...OfferWithTotals,
    internalID: "my-last-offer-id-no-note",
    id: "my-last-offer-id-no-note",
    fromParticipant: "BUYER",
    note: null,
  },
} as const

export const OfferOrderWithOffersAndNote = {
  ...UntouchedOfferOrder,
  lastOffer: OfferWithTotals,
  myLastOffer: {
    ...OfferWithTotals,
    internalID: "my-last-offer-id-with-note",
    id: "my-last-offer-id-with-note",
    fromParticipant: "BUYER",
    note: "This is a note!",
  },
} as const

export const ShippingDetails = {
  buyerPhoneNumber: "120938120983",
  requestedFulfillment: {
    __typename: "CommerceShip",
    fulfillmentType: "SHIP",
    name: "Joelle Van Dyne",
    addressLine1: "401 Broadway",
    addressLine2: "Suite 25",
    city: "New York",
    postalCode: "10013",
    region: "NY",
    country: "US",
    phoneNumber: "120938120983",
  },
} as const

export const PaymentDetails = {
  creditCard: {
    id: "relay-node-id",
    internalID: "gravity-credit-card-id",
    name: "Dr. Collector",
    street1: "1 Art st",
    street2: null,
    city: "New York",
    state: "NY",
    country: "USA",
    postalCode: "90210",
    brand: "Visa",
    lastDigits: "4444",
    expirationMonth: 3,
    expirationYear: 21,
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
      id: OfferWithTotals.id,
      internalID: OfferWithTotals.internalID,
      currencyCode: "USD",
      fromParticipant: OfferWithTotals.fromParticipant,
      amount: OfferWithTotals.amount,
      createdAt: "May 22",
    },
  },
  {
    node: {
      id: "0",
      internalID: "0",
      currencyCode: "USD",
      fromParticipant: "BUYER",
      amount: "$1,200.00",
      createdAt: "May 21",
    },
  },
  {
    node: {
      id: "1",
      internalID: "1",
      currencyCode: "USD",
      fromParticipant: "SELLER",
      amount: "$1,500.00",
      createdAt: "Apr 30",
    },
  },
  {
    node: {
      id: "2",
      internalID: "2",
      currencyCode: "USD",
      fromParticipant: "BUYER",
      amount: "$1,100.00",
      createdAt: "Apr 5",
    },
  },
] as const
