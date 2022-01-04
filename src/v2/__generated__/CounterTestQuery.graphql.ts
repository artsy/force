/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type CounterTestQueryVariables = {};
export type CounterTestQueryResponse = {
    readonly order: {
        readonly " $fragmentRefs": FragmentRefs<"Counter_order">;
    } | null;
};
export type CounterTestQueryRawResponse = {
    readonly order: ({
        readonly internalID: string;
        readonly mode: CommerceOrderModeEnum | null;
        readonly state: CommerceOrderStateEnum;
        readonly itemsTotal: string | null;
        readonly stateExpiresAt: string | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly slug: string;
                        readonly id: string | null;
                        readonly artistNames: string | null;
                        readonly title: string | null;
                        readonly date: string | null;
                        readonly shippingOrigin: string | null;
                        readonly image: ({
                            readonly resized_ArtworkSummaryItem: ({
                                readonly url: string;
                            }) | null;
                        }) | null;
                    }) | null;
                    readonly id: string | null;
                    readonly artworkOrEditionSet: ({
                        readonly __typename: "Artwork";
                        readonly id: string | null;
                        readonly price: string | null;
                    } | {
                        readonly __typename: "EditionSet";
                        readonly id: string | null;
                        readonly price: string | null;
                    } | {
                        readonly __typename: string;
                        readonly id: string | null;
                    }) | null;
                    readonly selectedShippingQuote: ({
                        readonly displayName: string;
                        readonly id: string | null;
                    }) | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly __typename: "CommerceOfferOrder";
        readonly requestedFulfillment: ({
            readonly __typename: "CommerceShip";
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
        }) | null;
        readonly code: string;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly buyerTotal: string | null;
        readonly currencyCode: string;
        readonly sellerDetails: ({
            readonly __typename: "Partner";
            readonly id: string | null;
            readonly name: string | null;
        } | {
            readonly __typename: string | null;
            readonly id: string | null;
        }) | null;
        readonly creditCard: ({
            readonly brand: string;
            readonly lastDigits: string;
            readonly expirationYear: number;
            readonly expirationMonth: number;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
        readonly lastOffer: ({
            readonly createdAt: string;
            readonly id: string | null;
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
        }) | null;
        readonly myLastOffer: ({
            readonly internalID: string;
            readonly id: string | null;
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
        }) | null;
        readonly offers: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly internalID: string;
                    readonly amount: string | null;
                    readonly createdAt: string;
                    readonly fromParticipant: CommerceOrderParticipantEnum | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
    } | {
        readonly internalID: string;
        readonly mode: CommerceOrderModeEnum | null;
        readonly state: CommerceOrderStateEnum;
        readonly itemsTotal: string | null;
        readonly stateExpiresAt: string | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly slug: string;
                        readonly id: string | null;
                        readonly artistNames: string | null;
                        readonly title: string | null;
                        readonly date: string | null;
                        readonly shippingOrigin: string | null;
                        readonly image: ({
                            readonly resized_ArtworkSummaryItem: ({
                                readonly url: string;
                            }) | null;
                        }) | null;
                    }) | null;
                    readonly id: string | null;
                    readonly artworkOrEditionSet: ({
                        readonly __typename: "Artwork";
                        readonly id: string | null;
                        readonly price: string | null;
                    } | {
                        readonly __typename: "EditionSet";
                        readonly id: string | null;
                        readonly price: string | null;
                    } | {
                        readonly __typename: string;
                        readonly id: string | null;
                    }) | null;
                    readonly selectedShippingQuote: ({
                        readonly displayName: string;
                        readonly id: string | null;
                    }) | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly __typename: string;
        readonly requestedFulfillment: ({
            readonly __typename: "CommerceShip";
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
        }) | null;
        readonly code: string;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly buyerTotal: string | null;
        readonly currencyCode: string;
        readonly sellerDetails: ({
            readonly __typename: "Partner";
            readonly id: string | null;
            readonly name: string | null;
        } | {
            readonly __typename: string | null;
            readonly id: string | null;
        }) | null;
        readonly creditCard: ({
            readonly brand: string;
            readonly lastDigits: string;
            readonly expirationYear: number;
            readonly expirationMonth: number;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type CounterTestQuery = {
    readonly response: CounterTestQueryResponse;
    readonly variables: CounterTestQueryVariables;
    readonly rawResponse: CounterTestQueryRawResponse;
};



/*
query CounterTestQuery {
  order: commerceOrder(id: "") {
    __typename
    ...Counter_order
    id
  }
}

fragment ArtworkSummaryItem_order on CommerceOrder {
  sellerDetails {
    __typename
    ... on Partner {
      name
    }
    ... on Node {
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

fragment Counter_order on CommerceOrder {
  internalID
  mode
  state
  itemsTotal(precision: 2)
  stateExpiresAt
  ... on CommerceOfferOrder {
    lastOffer {
      createdAt
      id
    }
    myLastOffer {
      internalID
      id
    }
  }
  lineItems {
    edges {
      node {
        artwork {
          slug
          id
        }
        id
      }
    }
  }
  ...TransactionDetailsSummaryItem_order
  ...ArtworkSummaryItem_order
  ...ShippingSummaryItem_order
  ...CreditCardSummaryItem_order
  ...OfferHistoryItem_order
}

fragment CreditCardSummaryItem_order on CommerceOrder {
  creditCard {
    brand
    lastDigits
    expirationYear
    expirationMonth
    id
  }
}

fragment OfferHistoryItem_order on CommerceOrder {
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
            id
          }
        }
        id
      }
    }
  }
  ... on CommerceOfferOrder {
    offers {
      edges {
        node {
          internalID
          amount(precision: 2)
          createdAt(format: "MMM D")
          fromParticipant
          id
        }
      }
    }
    currencyCode
    lastOffer {
      internalID
      fromParticipant
      amount(precision: 2)
      shippingTotal(precision: 2)
      taxTotal(precision: 2)
      note
      id
    }
  }
}

fragment ShippingAddress_ship on CommerceRequestedFulfillmentUnion {
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

fragment TransactionDetailsSummaryItem_order on CommerceOrder {
  __typename
  requestedFulfillment {
    __typename
  }
  code
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
    "value": ""
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "price",
    "storageKey": null
  }
],
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v7 = [
  (v6/*: any*/),
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
v8 = {
  "alias": null,
  "args": (v2/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": (v2/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": (v2/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v13 = {
  "alias": null,
  "args": (v2/*: any*/),
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": "amount(precision:2)"
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountCents",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerTotalCents",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "note",
  "storageKey": null
},
v18 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v19 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v20 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v21 = {
  "type": "CommerceOffer",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v22 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v23 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v24 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v25 = {
  "type": "CommerceOrderParticipantEnum",
  "enumValues": [
    "BUYER",
    "SELLER"
  ],
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CounterTestQuery",
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
            "name": "Counter_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CounterTestQuery",
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
            "name": "state",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "kind": "ScalarField",
            "name": "itemsTotal",
            "storageKey": "itemsTotal(precision:2)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "stateExpiresAt",
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
                            "name": "slug",
                            "storageKey": null
                          },
                          (v3/*: any*/),
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
                          }
                        ],
                        "storageKey": null
                      },
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "artworkOrEditionSet",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          (v3/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v5/*: any*/),
                            "type": "Artwork"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v5/*: any*/),
                            "type": "EditionSet"
                          }
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
                          (v3/*: any*/)
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
          (v4/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "requestedFulfillment",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v7/*: any*/),
                "type": "CommerceShip"
              },
              {
                "kind": "InlineFragment",
                "selections": (v7/*: any*/),
                "type": "CommerceShipArta"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
          (v8/*: any*/),
          (v9/*: any*/),
          (v10/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
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
            "concreteType": null,
            "kind": "LinkedField",
            "name": "sellerDetails",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v3/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*: any*/)
                ],
                "type": "Partner"
              }
            ],
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
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/),
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
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "createdAt",
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  (v1/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "myLastOffer",
                "plural": false,
                "selections": [
                  (v1/*: any*/),
                  (v3/*: any*/),
                  (v13/*: any*/),
                  (v14/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  (v11/*: any*/),
                  (v12/*: any*/),
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOfferConnection",
                "kind": "LinkedField",
                "name": "offers",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommerceOfferEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CommerceOffer",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v13/*: any*/),
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
                            "name": "createdAt",
                            "storageKey": "createdAt(format:\"MMM D\")"
                          },
                          (v16/*: any*/),
                          (v3/*: any*/)
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
            "type": "CommerceOfferOrder"
          }
        ],
        "storageKey": "commerceOrder(id:\"\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "order": {
          "type": "CommerceOrder",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.id": (v18/*: any*/),
        "order.internalID": (v19/*: any*/),
        "order.mode": {
          "type": "CommerceOrderModeEnum",
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "plural": false,
          "nullable": true
        },
        "order.state": {
          "type": "CommerceOrderStateEnum",
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "PENDING",
            "REFUNDED",
            "SUBMITTED"
          ],
          "plural": false,
          "nullable": false
        },
        "order.itemsTotal": (v20/*: any*/),
        "order.stateExpiresAt": (v20/*: any*/),
        "order.lineItems": {
          "type": "CommerceLineItemConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lastOffer": (v21/*: any*/),
        "order.myLastOffer": (v21/*: any*/),
        "order.lineItems.edges": {
          "type": "CommerceLineItemEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "order.__typename": (v22/*: any*/),
        "order.requestedFulfillment": {
          "type": "CommerceRequestedFulfillmentUnion",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.code": (v22/*: any*/),
        "order.shippingTotal": (v20/*: any*/),
        "order.shippingTotalCents": (v23/*: any*/),
        "order.taxTotal": (v20/*: any*/),
        "order.taxTotalCents": (v23/*: any*/),
        "order.buyerTotal": (v20/*: any*/),
        "order.currencyCode": (v22/*: any*/),
        "order.sellerDetails": {
          "type": "OrderParty",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.creditCard": {
          "type": "CreditCard",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lastOffer.createdAt": (v22/*: any*/),
        "order.lastOffer.id": (v18/*: any*/),
        "order.myLastOffer.internalID": (v19/*: any*/),
        "order.myLastOffer.id": (v18/*: any*/),
        "order.lineItems.edges.node": {
          "type": "CommerceLineItem",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.requestedFulfillment.__typename": (v22/*: any*/),
        "order.creditCard.brand": (v22/*: any*/),
        "order.creditCard.lastDigits": (v22/*: any*/),
        "order.creditCard.expirationYear": (v24/*: any*/),
        "order.creditCard.expirationMonth": (v24/*: any*/),
        "order.creditCard.id": (v18/*: any*/),
        "order.offers": {
          "type": "CommerceOfferConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node.artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node.id": (v18/*: any*/),
        "order.sellerDetails.name": (v20/*: any*/),
        "order.sellerDetails.id": (v18/*: any*/),
        "order.offers.edges": {
          "type": "CommerceOfferEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "order.lastOffer.internalID": (v19/*: any*/),
        "order.lastOffer.fromParticipant": (v25/*: any*/),
        "order.lastOffer.amount": (v20/*: any*/),
        "order.lastOffer.shippingTotal": (v20/*: any*/),
        "order.lastOffer.taxTotal": (v20/*: any*/),
        "order.lastOffer.note": (v20/*: any*/),
        "order.lineItems.edges.node.artwork.slug": (v19/*: any*/),
        "order.lineItems.edges.node.artwork.id": (v18/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet": {
          "type": "ArtworkOrEditionSetType",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node.selectedShippingQuote": {
          "type": "CommerceShippingQuote",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lastOffer.amountCents": (v24/*: any*/),
        "order.lastOffer.shippingTotalCents": (v23/*: any*/),
        "order.lastOffer.taxTotalCents": (v23/*: any*/),
        "order.lastOffer.buyerTotal": (v20/*: any*/),
        "order.lastOffer.buyerTotalCents": (v23/*: any*/),
        "order.myLastOffer.amount": (v20/*: any*/),
        "order.myLastOffer.amountCents": (v24/*: any*/),
        "order.myLastOffer.shippingTotal": (v20/*: any*/),
        "order.myLastOffer.shippingTotalCents": (v23/*: any*/),
        "order.myLastOffer.taxTotal": (v20/*: any*/),
        "order.myLastOffer.taxTotalCents": (v23/*: any*/),
        "order.myLastOffer.buyerTotal": (v20/*: any*/),
        "order.myLastOffer.buyerTotalCents": (v23/*: any*/),
        "order.myLastOffer.fromParticipant": (v25/*: any*/),
        "order.myLastOffer.note": (v20/*: any*/),
        "order.requestedFulfillment.name": (v20/*: any*/),
        "order.requestedFulfillment.addressLine1": (v20/*: any*/),
        "order.requestedFulfillment.addressLine2": (v20/*: any*/),
        "order.requestedFulfillment.city": (v20/*: any*/),
        "order.requestedFulfillment.postalCode": (v20/*: any*/),
        "order.requestedFulfillment.region": (v20/*: any*/),
        "order.requestedFulfillment.country": (v20/*: any*/),
        "order.requestedFulfillment.phoneNumber": (v20/*: any*/),
        "order.offers.edges.node": (v21/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v22/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.displayName": (v22/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.id": (v18/*: any*/),
        "order.lineItems.edges.node.artwork.artistNames": (v20/*: any*/),
        "order.lineItems.edges.node.artwork.title": (v20/*: any*/),
        "order.lineItems.edges.node.artwork.date": (v20/*: any*/),
        "order.lineItems.edges.node.artwork.shippingOrigin": (v20/*: any*/),
        "order.lineItems.edges.node.artwork.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.offers.edges.node.internalID": (v19/*: any*/),
        "order.offers.edges.node.amount": (v20/*: any*/),
        "order.offers.edges.node.createdAt": (v22/*: any*/),
        "order.offers.edges.node.fromParticipant": (v25/*: any*/),
        "order.offers.edges.node.id": (v18/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v20/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v18/*: any*/),
        "order.lineItems.edges.node.artwork.image.resized_ArtworkSummaryItem": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node.artwork.image.resized_ArtworkSummaryItem.url": (v22/*: any*/)
      }
    },
    "name": "CounterTestQuery",
    "operationKind": "query",
    "text": "query CounterTestQuery {\n  order: commerceOrder(id: \"\") {\n    __typename\n    ...Counter_order\n    id\n  }\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      id\n    }\n    ... on User {\n      id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          artistNames\n          title\n          date\n          shippingOrigin\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment Counter_order on CommerceOrder {\n  internalID\n  mode\n  state\n  itemsTotal(precision: 2)\n  stateExpiresAt\n  ... on CommerceOfferOrder {\n    lastOffer {\n      createdAt\n      id\n    }\n    myLastOffer {\n      internalID\n      id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        id\n      }\n    }\n  }\n  ...TransactionDetailsSummaryItem_order\n  ...ArtworkSummaryItem_order\n  ...ShippingSummaryItem_order\n  ...CreditCardSummaryItem_order\n  ...OfferHistoryItem_order\n}\n\nfragment CreditCardSummaryItem_order on CommerceOrder {\n  creditCard {\n    brand\n    lastDigits\n    expirationYear\n    expirationMonth\n    id\n  }\n}\n\nfragment OfferHistoryItem_order on CommerceOrder {\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    offers {\n      edges {\n        node {\n          internalID\n          amount(precision: 2)\n          createdAt(format: \"MMM D\")\n          fromParticipant\n          id\n        }\n      }\n    }\n    currencyCode\n    lastOffer {\n      internalID\n      fromParticipant\n      amount(precision: 2)\n      shippingTotal(precision: 2)\n      taxTotal(precision: 2)\n      note\n      id\n    }\n  }\n}\n\nfragment ShippingAddress_ship on CommerceRequestedFulfillmentUnion {\n  ... on CommerceShip {\n    name\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    phoneNumber\n  }\n  ... on CommerceShipArta {\n    name\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    phoneNumber\n  }\n}\n\nfragment ShippingSummaryItem_order on CommerceOrder {\n  state\n  requestedFulfillment {\n    __typename\n    ...ShippingAddress_ship\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          shippingOrigin\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  code\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            id\n          }\n        }\n        selectedShippingQuote {\n          displayName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a11d6f80150788e6b524c162e9dcd62c';
export default node;
