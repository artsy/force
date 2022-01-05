/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderDisplayStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "IN_TRANSIT" | "PENDING" | "PROCESSING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type StatusQueryVariables = {};
export type StatusQueryResponse = {
    readonly order: {
        readonly " $fragmentRefs": FragmentRefs<"Status_order">;
    } | null;
};
export type StatusQueryRawResponse = {
    readonly order: ({
        readonly __typename: "CommerceOfferOrder";
        readonly __isCommerceOrder: "CommerceOfferOrder";
        readonly internalID: string;
        readonly code: string;
        readonly displayState: CommerceOrderDisplayStateEnum;
        readonly state: CommerceOrderStateEnum;
        readonly mode: CommerceOrderModeEnum | null;
        readonly stateReason: string | null;
        readonly stateExpiresAt: string | null;
        readonly requestedFulfillment: ({
            readonly __typename: "CommerceShip";
            readonly __isCommerceRequestedFulfillmentUnion: "CommerceShip";
            readonly name: string | null;
            readonly addressLine1: string | null;
            readonly addressLine2: string | null;
            readonly city: string | null;
            readonly postalCode: string | null;
            readonly region: string | null;
            readonly country: string | null;
            readonly phoneNumber: string | null;
        } | {
            readonly __typename: "CommerceShipArta";
            readonly __isCommerceRequestedFulfillmentUnion: "CommerceShipArta";
            readonly name: string | null;
            readonly addressLine1: string | null;
            readonly addressLine2: string | null;
            readonly city: string | null;
            readonly postalCode: string | null;
            readonly region: string | null;
            readonly country: string | null;
            readonly phoneNumber: string | null;
        } | {
            readonly __typename: string;
            readonly __isCommerceRequestedFulfillmentUnion: string;
        }) | null;
        readonly sellerDetails: ({
            readonly __typename: "Partner";
            readonly __isNode: "Partner";
            readonly id: string;
            readonly name: string | null;
        } | {
            readonly __typename: "User";
            readonly __isNode: "User";
            readonly id: string;
        } | {
            readonly __typename: string;
            readonly __isNode: string;
            readonly id: string;
        }) | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly artistNames: string | null;
                        readonly title: string | null;
                        readonly date: string | null;
                        readonly shippingOrigin: string | null;
                        readonly image: ({
                            readonly resized_ArtworkSummaryItem: ({
                                readonly url: string;
                            }) | null;
                        }) | null;
                        readonly id: string;
                    }) | null;
                    readonly id: string;
                    readonly artworkOrEditionSet: ({
                        readonly __typename: "Artwork";
                        readonly __isNode: "Artwork";
                        readonly id: string;
                        readonly price: string | null;
                    } | {
                        readonly __typename: "EditionSet";
                        readonly __isNode: "EditionSet";
                        readonly id: string;
                        readonly price: string | null;
                    } | {
                        readonly __typename: string;
                        readonly __isNode: string;
                        readonly id: string;
                    }) | null;
                    readonly selectedShippingQuote: ({
                        readonly displayName: string;
                        readonly id: string;
                    }) | null;
                    readonly shipment: ({
                        readonly trackingNumber: string | null;
                        readonly trackingUrl: string | null;
                        readonly carrierName: string | null;
                        readonly estimatedDeliveryWindow: string | null;
                        readonly id: string;
                    }) | null;
                    readonly fulfillments: ({
                        readonly edges: ReadonlyArray<({
                            readonly node: ({
                                readonly courier: string;
                                readonly trackingId: string | null;
                                readonly estimatedDelivery: string | null;
                                readonly id: string;
                            }) | null;
                        }) | null> | null;
                    }) | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly itemsTotal: string | null;
        readonly buyerTotal: string | null;
        readonly currencyCode: string;
        readonly creditCard: ({
            readonly brand: string;
            readonly lastDigits: string;
            readonly expirationYear: number;
            readonly expirationMonth: number;
            readonly id: string;
        }) | null;
        readonly id: string;
        readonly lastOffer: ({
            readonly internalID: string;
            readonly amount: string | null;
            readonly amountCents: number;
            readonly shippingTotal: string | null;
            readonly shippingTotalCents: number | null;
            readonly taxTotal: string | null;
            readonly taxTotalCents: number | null;
            readonly buyerTotal: string | null;
            readonly buyerTotalCents: number | null;
            readonly fromParticipant: CommerceOrderParticipantEnum | null;
            readonly note: string | null;
            readonly id: string;
        }) | null;
        readonly myLastOffer: ({
            readonly internalID: string;
            readonly amount: string | null;
            readonly amountCents: number;
            readonly shippingTotal: string | null;
            readonly shippingTotalCents: number | null;
            readonly taxTotal: string | null;
            readonly taxTotalCents: number | null;
            readonly buyerTotal: string | null;
            readonly buyerTotalCents: number | null;
            readonly fromParticipant: CommerceOrderParticipantEnum | null;
            readonly note: string | null;
            readonly id: string;
        }) | null;
    } | {
        readonly __typename: string;
        readonly __isCommerceOrder: string;
        readonly internalID: string;
        readonly code: string;
        readonly displayState: CommerceOrderDisplayStateEnum;
        readonly state: CommerceOrderStateEnum;
        readonly mode: CommerceOrderModeEnum | null;
        readonly stateReason: string | null;
        readonly stateExpiresAt: string | null;
        readonly requestedFulfillment: ({
            readonly __typename: "CommerceShip";
            readonly __isCommerceRequestedFulfillmentUnion: "CommerceShip";
            readonly name: string | null;
            readonly addressLine1: string | null;
            readonly addressLine2: string | null;
            readonly city: string | null;
            readonly postalCode: string | null;
            readonly region: string | null;
            readonly country: string | null;
            readonly phoneNumber: string | null;
        } | {
            readonly __typename: "CommerceShipArta";
            readonly __isCommerceRequestedFulfillmentUnion: "CommerceShipArta";
            readonly name: string | null;
            readonly addressLine1: string | null;
            readonly addressLine2: string | null;
            readonly city: string | null;
            readonly postalCode: string | null;
            readonly region: string | null;
            readonly country: string | null;
            readonly phoneNumber: string | null;
        } | {
            readonly __typename: string;
            readonly __isCommerceRequestedFulfillmentUnion: string;
        }) | null;
        readonly sellerDetails: ({
            readonly __typename: "Partner";
            readonly __isNode: "Partner";
            readonly id: string;
            readonly name: string | null;
        } | {
            readonly __typename: "User";
            readonly __isNode: "User";
            readonly id: string;
        } | {
            readonly __typename: string;
            readonly __isNode: string;
            readonly id: string;
        }) | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly artistNames: string | null;
                        readonly title: string | null;
                        readonly date: string | null;
                        readonly shippingOrigin: string | null;
                        readonly image: ({
                            readonly resized_ArtworkSummaryItem: ({
                                readonly url: string;
                            }) | null;
                        }) | null;
                        readonly id: string;
                    }) | null;
                    readonly id: string;
                    readonly artworkOrEditionSet: ({
                        readonly __typename: "Artwork";
                        readonly __isNode: "Artwork";
                        readonly id: string;
                        readonly price: string | null;
                    } | {
                        readonly __typename: "EditionSet";
                        readonly __isNode: "EditionSet";
                        readonly id: string;
                        readonly price: string | null;
                    } | {
                        readonly __typename: string;
                        readonly __isNode: string;
                        readonly id: string;
                    }) | null;
                    readonly selectedShippingQuote: ({
                        readonly displayName: string;
                        readonly id: string;
                    }) | null;
                    readonly shipment: ({
                        readonly trackingNumber: string | null;
                        readonly trackingUrl: string | null;
                        readonly carrierName: string | null;
                        readonly estimatedDeliveryWindow: string | null;
                        readonly id: string;
                    }) | null;
                    readonly fulfillments: ({
                        readonly edges: ReadonlyArray<({
                            readonly node: ({
                                readonly courier: string;
                                readonly trackingId: string | null;
                                readonly estimatedDelivery: string | null;
                                readonly id: string;
                            }) | null;
                        }) | null> | null;
                    }) | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly itemsTotal: string | null;
        readonly buyerTotal: string | null;
        readonly currencyCode: string;
        readonly creditCard: ({
            readonly brand: string;
            readonly lastDigits: string;
            readonly expirationYear: number;
            readonly expirationMonth: number;
            readonly id: string;
        }) | null;
        readonly id: string;
    }) | null;
};
export type StatusQuery = {
    readonly response: StatusQueryResponse;
    readonly variables: StatusQueryVariables;
    readonly rawResponse: StatusQueryRawResponse;
};



/*
query StatusQuery {
  order: commerceOrder(id: "42") {
    __typename
    ...Status_order
    id
  }
}

fragment ArtworkSummaryItem_order on CommerceOrder {
  __isCommerceOrder: __typename
  sellerDetails {
    __typename
    ... on Partner {
      name
    }
    ... on Node {
      __isNode: __typename
      id
    }
    ... on User {
      id
    }
  }
  lineItems {
    edges {
      node {
        artwork {
          artistNames
          title
          date
          shippingOrigin
          image {
            resized_ArtworkSummaryItem: resized(width: 55) {
              url
            }
          }
          id
        }
        id
      }
    }
  }
}

fragment CreditCardSummaryItem_order on CommerceOrder {
  __isCommerceOrder: __typename
  creditCard {
    brand
    lastDigits
    expirationYear
    expirationMonth
    id
  }
}

fragment ShippingAddress_ship on CommerceRequestedFulfillmentUnion {
  __isCommerceRequestedFulfillmentUnion: __typename
  ... on CommerceShip {
    name
    addressLine1
    addressLine2
    city
    postalCode
    region
    country
    phoneNumber
  }
  ... on CommerceShipArta {
    name
    addressLine1
    addressLine2
    city
    postalCode
    region
    country
    phoneNumber
  }
}

fragment ShippingSummaryItem_order on CommerceOrder {
  __isCommerceOrder: __typename
  state
  requestedFulfillment {
    __typename
    ...ShippingAddress_ship
  }
  lineItems {
    edges {
      node {
        artwork {
          shippingOrigin
          id
        }
        id
      }
    }
  }
}

fragment Status_order on CommerceOrder {
  __isCommerceOrder: __typename
  __typename
  internalID
  code
  displayState
  state
  mode
  stateReason
  stateExpiresAt(format: "MMM D")
  requestedFulfillment {
    __typename
    ... on CommerceShip {
      __typename
    }
    ... on CommercePickup {
      __typename
    }
    ... on CommerceShipArta {
      __typename
    }
  }
  ...ArtworkSummaryItem_order
  ...TransactionDetailsSummaryItem_order
  ...ShippingSummaryItem_order
  ...CreditCardSummaryItem_order
  lineItems {
    edges {
      node {
        shipment {
          trackingNumber
          trackingUrl
          carrierName
          estimatedDeliveryWindow
          id
        }
        selectedShippingQuote {
          displayName
          id
        }
        fulfillments {
          edges {
            node {
              courier
              trackingId
              estimatedDelivery(format: "MMM Do, YYYY")
              id
            }
          }
        }
        id
      }
    }
  }
  ... on CommerceOfferOrder {
    myLastOffer {
      internalID
      amount(precision: 2)
      amountCents
      shippingTotal(precision: 2)
      shippingTotalCents
      taxTotal(precision: 2)
      taxTotalCents
      id
    }
  }
}

fragment TransactionDetailsSummaryItem_order on CommerceOrder {
  __isCommerceOrder: __typename
  __typename
  requestedFulfillment {
    __typename
  }
  lineItems {
    edges {
      node {
        artworkOrEditionSet {
          __typename
          ... on Artwork {
            price
          }
          ... on EditionSet {
            price
            id
          }
          ... on Node {
            __isNode: __typename
            id
          }
        }
        selectedShippingQuote {
          displayName
          id
        }
        id
      }
    }
  }
  mode
  shippingTotal(precision: 2)
  shippingTotalCents
  taxTotal(precision: 2)
  taxTotalCents
  itemsTotal(precision: 2)
  buyerTotal(precision: 2)
  currencyCode
  ... on CommerceOfferOrder {
    lastOffer {
      internalID
      amount(precision: 2)
      amountCents
      shippingTotal(precision: 2)
      shippingTotalCents
      taxTotal(precision: 2)
      taxTotalCents
      buyerTotal(precision: 2)
      buyerTotalCents
      fromParticipant
      note
      id
    }
    myLastOffer {
      internalID
      amount(precision: 2)
      amountCents
      shippingTotal(precision: 2)
      shippingTotalCents
      taxTotal(precision: 2)
      taxTotalCents
      buyerTotal(precision: 2)
      buyerTotalCents
      fromParticipant
      note
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "42"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine1",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine2",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "city",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "postalCode",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "region",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "country",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "phoneNumber",
    "storageKey": null
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  (v5/*: any*/)
],
v7 = {
  "kind": "InlineFragment",
  "selections": (v6/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v9 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v10 = {
  "alias": null,
  "args": (v9/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": (v9/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": (v9/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v15 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": (v9/*: any*/),
    "kind": "ScalarField",
    "name": "amount",
    "storageKey": "amount(precision:2)"
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "amountCents",
    "storageKey": null
  },
  (v10/*: any*/),
  (v11/*: any*/),
  (v12/*: any*/),
  (v13/*: any*/),
  (v14/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "buyerTotalCents",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "fromParticipant",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "note",
    "storageKey": null
  },
  (v5/*: any*/)
],
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v19 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOffer"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v22 = {
  "enumValues": [
    "BUYER",
    "SELLER"
  ],
  "nullable": true,
  "plural": false,
  "type": "CommerceOrderParticipantEnum"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "StatusQuery",
    "selections": [
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Status_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"42\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "StatusQuery",
    "selections": [
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "displayState",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "mode",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "stateReason",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "format",
                "value": "MMM D"
              }
            ],
            "kind": "ScalarField",
            "name": "stateExpiresAt",
            "storageKey": "stateExpiresAt(format:\"MMM D\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "requestedFulfillment",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "TypeDiscriminator",
                "abstractKey": "__isCommerceRequestedFulfillmentUnion"
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "CommerceShip",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v4/*: any*/),
                "type": "CommerceShipArta",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "sellerDetails",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v3/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v6/*: any*/),
                "type": "User",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CommerceLineItemConnection",
            "kind": "LinkedField",
            "name": "lineItems",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceLineItemEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommerceLineItem",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "artwork",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artistNames",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "shippingOrigin",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": "resized_ArtworkSummaryItem",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 55
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "url",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "resized(width:55)"
                              }
                            ],
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "artworkOrEditionSet",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v8/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v8/*: any*/),
                              (v5/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          (v7/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceShippingQuote",
                        "kind": "LinkedField",
                        "name": "selectedShippingQuote",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "displayName",
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceShipment",
                        "kind": "LinkedField",
                        "name": "shipment",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "trackingNumber",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "trackingUrl",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "carrierName",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "estimatedDeliveryWindow",
                            "storageKey": null
                          },
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceFulfillmentConnection",
                        "kind": "LinkedField",
                        "name": "fulfillments",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CommerceFulfillmentEdge",
                            "kind": "LinkedField",
                            "name": "edges",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceFulfillment",
                                "kind": "LinkedField",
                                "name": "node",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "courier",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "trackingId",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "format",
                                        "value": "MMM Do, YYYY"
                                      }
                                    ],
                                    "kind": "ScalarField",
                                    "name": "estimatedDelivery",
                                    "storageKey": "estimatedDelivery(format:\"MMM Do, YYYY\")"
                                  },
                                  (v5/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": (v9/*: any*/),
            "kind": "ScalarField",
            "name": "itemsTotal",
            "storageKey": "itemsTotal(precision:2)"
          },
          (v14/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currencyCode",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "CreditCard",
            "kind": "LinkedField",
            "name": "creditCard",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "brand",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastDigits",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expirationYear",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expirationMonth",
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          },
          (v5/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "lastOffer",
                "plural": false,
                "selections": (v15/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "myLastOffer",
                "plural": false,
                "selections": (v15/*: any*/),
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          }
        ],
        "storageKey": "commerceOrder(id:\"42\")"
      }
    ]
  },
  "params": {
    "cacheID": "a08d4158c68b64fb74d9ad3b49472472",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v16/*: any*/),
        "order.__typename": (v16/*: any*/),
        "order.buyerTotal": (v17/*: any*/),
        "order.code": (v16/*: any*/),
        "order.creditCard": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreditCard"
        },
        "order.creditCard.brand": (v16/*: any*/),
        "order.creditCard.expirationMonth": (v18/*: any*/),
        "order.creditCard.expirationYear": (v18/*: any*/),
        "order.creditCard.id": (v19/*: any*/),
        "order.creditCard.lastDigits": (v16/*: any*/),
        "order.currencyCode": (v16/*: any*/),
        "order.displayState": {
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "IN_TRANSIT",
            "PENDING",
            "PROCESSING",
            "REFUNDED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderDisplayStateEnum"
        },
        "order.id": (v19/*: any*/),
        "order.internalID": (v19/*: any*/),
        "order.itemsTotal": (v17/*: any*/),
        "order.lastOffer": (v20/*: any*/),
        "order.lastOffer.amount": (v17/*: any*/),
        "order.lastOffer.amountCents": (v18/*: any*/),
        "order.lastOffer.buyerTotal": (v17/*: any*/),
        "order.lastOffer.buyerTotalCents": (v21/*: any*/),
        "order.lastOffer.fromParticipant": (v22/*: any*/),
        "order.lastOffer.id": (v19/*: any*/),
        "order.lastOffer.internalID": (v19/*: any*/),
        "order.lastOffer.note": (v17/*: any*/),
        "order.lastOffer.shippingTotal": (v17/*: any*/),
        "order.lastOffer.shippingTotalCents": (v21/*: any*/),
        "order.lastOffer.taxTotal": (v17/*: any*/),
        "order.lastOffer.taxTotalCents": (v21/*: any*/),
        "order.lineItems": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItemConnection"
        },
        "order.lineItems.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceLineItemEdge"
        },
        "order.lineItems.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItem"
        },
        "order.lineItems.edges.node.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "order.lineItems.edges.node.artwork.artistNames": (v17/*: any*/),
        "order.lineItems.edges.node.artwork.date": (v17/*: any*/),
        "order.lineItems.edges.node.artwork.id": (v19/*: any*/),
        "order.lineItems.edges.node.artwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "order.lineItems.edges.node.artwork.image.resized_ArtworkSummaryItem": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "order.lineItems.edges.node.artwork.image.resized_ArtworkSummaryItem.url": (v16/*: any*/),
        "order.lineItems.edges.node.artwork.shippingOrigin": (v17/*: any*/),
        "order.lineItems.edges.node.artwork.title": (v17/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "order.lineItems.edges.node.artworkOrEditionSet.__isNode": (v16/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v16/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v19/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v17/*: any*/),
        "order.lineItems.edges.node.fulfillments": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceFulfillmentConnection"
        },
        "order.lineItems.edges.node.fulfillments.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceFulfillmentEdge"
        },
        "order.lineItems.edges.node.fulfillments.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceFulfillment"
        },
        "order.lineItems.edges.node.fulfillments.edges.node.courier": (v16/*: any*/),
        "order.lineItems.edges.node.fulfillments.edges.node.estimatedDelivery": (v17/*: any*/),
        "order.lineItems.edges.node.fulfillments.edges.node.id": (v19/*: any*/),
        "order.lineItems.edges.node.fulfillments.edges.node.trackingId": (v17/*: any*/),
        "order.lineItems.edges.node.id": (v19/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceShippingQuote"
        },
        "order.lineItems.edges.node.selectedShippingQuote.displayName": (v16/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.id": (v19/*: any*/),
        "order.lineItems.edges.node.shipment": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceShipment"
        },
        "order.lineItems.edges.node.shipment.carrierName": (v17/*: any*/),
        "order.lineItems.edges.node.shipment.estimatedDeliveryWindow": (v17/*: any*/),
        "order.lineItems.edges.node.shipment.id": (v19/*: any*/),
        "order.lineItems.edges.node.shipment.trackingNumber": (v17/*: any*/),
        "order.lineItems.edges.node.shipment.trackingUrl": (v17/*: any*/),
        "order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "order.myLastOffer": (v20/*: any*/),
        "order.myLastOffer.amount": (v17/*: any*/),
        "order.myLastOffer.amountCents": (v18/*: any*/),
        "order.myLastOffer.buyerTotal": (v17/*: any*/),
        "order.myLastOffer.buyerTotalCents": (v21/*: any*/),
        "order.myLastOffer.fromParticipant": (v22/*: any*/),
        "order.myLastOffer.id": (v19/*: any*/),
        "order.myLastOffer.internalID": (v19/*: any*/),
        "order.myLastOffer.note": (v17/*: any*/),
        "order.myLastOffer.shippingTotal": (v17/*: any*/),
        "order.myLastOffer.shippingTotalCents": (v21/*: any*/),
        "order.myLastOffer.taxTotal": (v17/*: any*/),
        "order.myLastOffer.taxTotalCents": (v21/*: any*/),
        "order.requestedFulfillment": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceRequestedFulfillmentUnion"
        },
        "order.requestedFulfillment.__isCommerceRequestedFulfillmentUnion": (v16/*: any*/),
        "order.requestedFulfillment.__typename": (v16/*: any*/),
        "order.requestedFulfillment.addressLine1": (v17/*: any*/),
        "order.requestedFulfillment.addressLine2": (v17/*: any*/),
        "order.requestedFulfillment.city": (v17/*: any*/),
        "order.requestedFulfillment.country": (v17/*: any*/),
        "order.requestedFulfillment.name": (v17/*: any*/),
        "order.requestedFulfillment.phoneNumber": (v17/*: any*/),
        "order.requestedFulfillment.postalCode": (v17/*: any*/),
        "order.requestedFulfillment.region": (v17/*: any*/),
        "order.sellerDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderParty"
        },
        "order.sellerDetails.__isNode": (v16/*: any*/),
        "order.sellerDetails.__typename": (v16/*: any*/),
        "order.sellerDetails.id": (v19/*: any*/),
        "order.sellerDetails.name": (v17/*: any*/),
        "order.shippingTotal": (v17/*: any*/),
        "order.shippingTotalCents": (v21/*: any*/),
        "order.state": {
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "PENDING",
            "REFUNDED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderStateEnum"
        },
        "order.stateExpiresAt": (v17/*: any*/),
        "order.stateReason": (v17/*: any*/),
        "order.taxTotal": (v17/*: any*/),
        "order.taxTotalCents": (v21/*: any*/)
      }
    },
    "name": "StatusQuery",
    "operationKind": "query",
    "text": "query StatusQuery {\n  order: commerceOrder(id: \"42\") {\n    __typename\n    ...Status_order\n    id\n  }\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on User {\n      id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          artistNames\n          title\n          date\n          shippingOrigin\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment CreditCardSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  creditCard {\n    brand\n    lastDigits\n    expirationYear\n    expirationMonth\n    id\n  }\n}\n\nfragment ShippingAddress_ship on CommerceRequestedFulfillmentUnion {\n  __isCommerceRequestedFulfillmentUnion: __typename\n  ... on CommerceShip {\n    name\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    phoneNumber\n  }\n  ... on CommerceShipArta {\n    name\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    phoneNumber\n  }\n}\n\nfragment ShippingSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  state\n  requestedFulfillment {\n    __typename\n    ...ShippingAddress_ship\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          shippingOrigin\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment Status_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  __typename\n  internalID\n  code\n  displayState\n  state\n  mode\n  stateReason\n  stateExpiresAt(format: \"MMM D\")\n  requestedFulfillment {\n    __typename\n    ... on CommerceShip {\n      __typename\n    }\n    ... on CommercePickup {\n      __typename\n    }\n    ... on CommerceShipArta {\n      __typename\n    }\n  }\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n  ...ShippingSummaryItem_order\n  ...CreditCardSummaryItem_order\n  lineItems {\n    edges {\n      node {\n        shipment {\n          trackingNumber\n          trackingUrl\n          carrierName\n          estimatedDeliveryWindow\n          id\n        }\n        selectedShippingQuote {\n          displayName\n          id\n        }\n        fulfillments {\n          edges {\n            node {\n              courier\n              trackingId\n              estimatedDelivery(format: \"MMM Do, YYYY\")\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      id\n    }\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        selectedShippingQuote {\n          displayName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ae6e40d0198462c1086d1174f704e7bf';
export default node;
