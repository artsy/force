/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type Offer2TestQueryVariables = {};
export type Offer2TestQueryResponse = {
    readonly order: {
        readonly " $fragmentRefs": FragmentRefs<"Offer_order">;
    } | null;
};
export type Offer2TestQueryRawResponse = {
    readonly order: ({
        readonly __typename: "CommerceOfferOrder";
        readonly __isCommerceOrder: "CommerceOfferOrder";
        readonly internalID: string;
        readonly mode: CommerceOrderModeEnum | null;
        readonly state: CommerceOrderStateEnum;
        readonly totalListPriceCents: number;
        readonly currencyCode: string;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly slug: string;
                        readonly price: string | null;
                        readonly isPriceRange: boolean | null;
                        readonly isEdition: boolean | null;
                        readonly priceCurrency: string | null;
                        readonly id: string;
                        readonly date: string | null;
                        readonly shippingOrigin: string | null;
                    }) | null;
                    readonly artworkOrEditionSet: ({
                        readonly __typename: "Artwork";
                        readonly __isNode: "Artwork";
                        readonly id: string;
                        readonly price: string | null;
                        readonly displayPriceRange: boolean | null;
                        readonly listPrice: ({
                            readonly __typename: "Money";
                            readonly major: number;
                        } | {
                            readonly __typename: "PriceRange";
                            readonly maxPrice: ({
                                readonly major: number;
                            }) | null;
                            readonly minPrice: ({
                                readonly major: number;
                            }) | null;
                        } | {
                            readonly __typename: string;
                        }) | null;
                    } | {
                        readonly __typename: "EditionSet";
                        readonly __isNode: "EditionSet";
                        readonly id: string;
                        readonly internalID: string;
                        readonly price: string | null;
                        readonly displayPriceRange: boolean | null;
                        readonly listPrice: ({
                            readonly __typename: "Money";
                            readonly major: number;
                        } | {
                            readonly __typename: "PriceRange";
                            readonly maxPrice: ({
                                readonly major: number;
                            }) | null;
                            readonly minPrice: ({
                                readonly major: number;
                            }) | null;
                        } | {
                            readonly __typename: string;
                        }) | null;
                    } | {
                        readonly __typename: string;
                        readonly __isNode: string;
                        readonly id: string;
                    }) | null;
                    readonly id: string;
                    readonly artworkVersion: ({
                        readonly artistNames: string | null;
                        readonly title: string | null;
                        readonly image: ({
                            readonly resized_ArtworkSummaryItem: ({
                                readonly url: string;
                            }) | null;
                        }) | null;
                        readonly id: string;
                    }) | null;
                    readonly selectedShippingQuote: ({
                        readonly displayName: string;
                        readonly id: string;
                    }) | null;
                }) | null;
            }) | null> | null;
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
        readonly requestedFulfillment: ({
            readonly __typename: string;
        }) | null;
        readonly code: string;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly itemsTotal: string | null;
        readonly buyerTotal: string | null;
        readonly id: string;
        readonly isInquiryOrder: boolean;
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
        readonly mode: CommerceOrderModeEnum | null;
        readonly state: CommerceOrderStateEnum;
        readonly totalListPriceCents: number;
        readonly currencyCode: string;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly slug: string;
                        readonly price: string | null;
                        readonly isPriceRange: boolean | null;
                        readonly isEdition: boolean | null;
                        readonly priceCurrency: string | null;
                        readonly id: string;
                        readonly date: string | null;
                        readonly shippingOrigin: string | null;
                    }) | null;
                    readonly artworkOrEditionSet: ({
                        readonly __typename: "Artwork";
                        readonly __isNode: "Artwork";
                        readonly id: string;
                        readonly price: string | null;
                        readonly displayPriceRange: boolean | null;
                        readonly listPrice: ({
                            readonly __typename: "Money";
                            readonly major: number;
                        } | {
                            readonly __typename: "PriceRange";
                            readonly maxPrice: ({
                                readonly major: number;
                            }) | null;
                            readonly minPrice: ({
                                readonly major: number;
                            }) | null;
                        } | {
                            readonly __typename: string;
                        }) | null;
                    } | {
                        readonly __typename: "EditionSet";
                        readonly __isNode: "EditionSet";
                        readonly id: string;
                        readonly internalID: string;
                        readonly price: string | null;
                        readonly displayPriceRange: boolean | null;
                        readonly listPrice: ({
                            readonly __typename: "Money";
                            readonly major: number;
                        } | {
                            readonly __typename: "PriceRange";
                            readonly maxPrice: ({
                                readonly major: number;
                            }) | null;
                            readonly minPrice: ({
                                readonly major: number;
                            }) | null;
                        } | {
                            readonly __typename: string;
                        }) | null;
                    } | {
                        readonly __typename: string;
                        readonly __isNode: string;
                        readonly id: string;
                    }) | null;
                    readonly id: string;
                    readonly artworkVersion: ({
                        readonly artistNames: string | null;
                        readonly title: string | null;
                        readonly image: ({
                            readonly resized_ArtworkSummaryItem: ({
                                readonly url: string;
                            }) | null;
                        }) | null;
                        readonly id: string;
                    }) | null;
                    readonly selectedShippingQuote: ({
                        readonly displayName: string;
                        readonly id: string;
                    }) | null;
                }) | null;
            }) | null> | null;
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
        readonly requestedFulfillment: ({
            readonly __typename: string;
        }) | null;
        readonly code: string;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly itemsTotal: string | null;
        readonly buyerTotal: string | null;
        readonly id: string;
    }) | null;
};
export type Offer2TestQuery = {
    readonly response: Offer2TestQueryResponse;
    readonly variables: Offer2TestQueryVariables;
    readonly rawResponse: Offer2TestQueryRawResponse;
};



/*
query Offer2TestQuery {
  order: commerceOrder(id: "1234567") {
    __typename
    ...Offer_order
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
  currencyCode
  mode
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
        artwork {
          date
          shippingOrigin
          id
        }
        artworkVersion {
          artistNames
          title
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

fragment Offer_order on CommerceOrder {
  __isCommerceOrder: __typename
  internalID
  mode
  state
  totalListPriceCents
  currencyCode
  lineItems {
    edges {
      node {
        artwork {
          slug
          price
          isPriceRange
          isEdition
          ...PriceOptions_artwork
          id
        }
        artworkOrEditionSet {
          __typename
          ... on Artwork {
            price
            displayPriceRange
            listPrice {
              __typename
              ... on Money {
                major
              }
              ... on PriceRange {
                maxPrice {
                  major
                }
                minPrice {
                  major
                }
              }
            }
          }
          ... on EditionSet {
            internalID
            price
            displayPriceRange
            listPrice {
              __typename
              ... on Money {
                major
              }
              ... on PriceRange {
                maxPrice {
                  major
                }
                minPrice {
                  major
                }
              }
            }
            id
          }
          ... on Node {
            __isNode: __typename
            id
          }
        }
        id
      }
    }
  }
  ... on CommerceOfferOrder {
    isInquiryOrder
  }
  ...ArtworkSummaryItem_order
  ...TransactionDetailsSummaryItem_order
  ...PriceOptions_order
}

fragment PriceOptions_artwork on Artwork {
  priceCurrency
  isPriceRange
}

fragment PriceOptions_order on CommerceOrder {
  __isCommerceOrder: __typename
  internalID
}

fragment TransactionDetailsSummaryItem_order on CommerceOrder {
  __isCommerceOrder: __typename
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
    "value": "1234567"
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
  "name": "price",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayPriceRange",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "major",
    "storageKey": null
  }
],
v7 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "listPrice",
  "plural": false,
  "selections": [
    (v1/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v6/*: any*/),
      "type": "Money",
      "abstractKey": null
    },
    {
      "kind": "InlineFragment",
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "maxPrice",
          "plural": false,
          "selections": (v6/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Money",
          "kind": "LinkedField",
          "name": "minPrice",
          "plural": false,
          "selections": (v6/*: any*/),
          "storageKey": null
        }
      ],
      "type": "PriceRange",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v8 = [
  (v4/*: any*/)
],
v9 = {
  "kind": "InlineFragment",
  "selections": (v8/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v10 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v11 = {
  "alias": null,
  "args": (v10/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": (v10/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": (v10/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v16 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": (v10/*: any*/),
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
  (v11/*: any*/),
  (v12/*: any*/),
  (v13/*: any*/),
  (v14/*: any*/),
  (v15/*: any*/),
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
  (v4/*: any*/)
],
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
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
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v22 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v23 = {
  "enumValues": [
    "BUYER",
    "SELLER"
  ],
  "nullable": true,
  "plural": false,
  "type": "CommerceOrderParticipantEnum"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v25 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Offer2TestQuery",
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
            "name": "Offer_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"1234567\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "Offer2TestQuery",
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
            "args": null,
            "kind": "ScalarField",
            "name": "totalListPriceCents",
            "storageKey": null
          },
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
                            "name": "isPriceRange",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isEdition",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "priceCurrency",
                            "storageKey": null
                          },
                          (v4/*: any*/),
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
                          }
                        ],
                        "storageKey": null
                      },
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
                              (v3/*: any*/),
                              (v5/*: any*/),
                              (v7/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              (v5/*: any*/),
                              (v7/*: any*/),
                              (v4/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          (v9/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkVersion",
                        "kind": "LinkedField",
                        "name": "artworkVersion",
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
                          (v4/*: any*/)
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
                          (v4/*: any*/)
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
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  }
                ],
                "type": "Partner",
                "abstractKey": null
              },
              (v9/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v8/*: any*/),
                "type": "User",
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
            "name": "requestedFulfillment",
            "plural": false,
            "selections": [
              (v1/*: any*/)
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
          (v11/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          {
            "alias": null,
            "args": (v10/*: any*/),
            "kind": "ScalarField",
            "name": "itemsTotal",
            "storageKey": "itemsTotal(precision:2)"
          },
          (v15/*: any*/),
          (v4/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isInquiryOrder",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "lastOffer",
                "plural": false,
                "selections": (v16/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "myLastOffer",
                "plural": false,
                "selections": (v16/*: any*/),
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          }
        ],
        "storageKey": "commerceOrder(id:\"1234567\")"
      }
    ]
  },
  "params": {
    "cacheID": "3766dea04908b20b0c8d4d3e4b43d6cc",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v17/*: any*/),
        "order.__typename": (v17/*: any*/),
        "order.buyerTotal": (v18/*: any*/),
        "order.code": (v17/*: any*/),
        "order.currencyCode": (v17/*: any*/),
        "order.id": (v19/*: any*/),
        "order.internalID": (v19/*: any*/),
        "order.isInquiryOrder": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "order.itemsTotal": (v18/*: any*/),
        "order.lastOffer": (v20/*: any*/),
        "order.lastOffer.amount": (v18/*: any*/),
        "order.lastOffer.amountCents": (v21/*: any*/),
        "order.lastOffer.buyerTotal": (v18/*: any*/),
        "order.lastOffer.buyerTotalCents": (v22/*: any*/),
        "order.lastOffer.fromParticipant": (v23/*: any*/),
        "order.lastOffer.id": (v19/*: any*/),
        "order.lastOffer.internalID": (v19/*: any*/),
        "order.lastOffer.note": (v18/*: any*/),
        "order.lastOffer.shippingTotal": (v18/*: any*/),
        "order.lastOffer.shippingTotalCents": (v22/*: any*/),
        "order.lastOffer.taxTotal": (v18/*: any*/),
        "order.lastOffer.taxTotalCents": (v22/*: any*/),
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
        "order.lineItems.edges.node.artwork.date": (v18/*: any*/),
        "order.lineItems.edges.node.artwork.id": (v19/*: any*/),
        "order.lineItems.edges.node.artwork.isEdition": (v24/*: any*/),
        "order.lineItems.edges.node.artwork.isPriceRange": (v24/*: any*/),
        "order.lineItems.edges.node.artwork.price": (v18/*: any*/),
        "order.lineItems.edges.node.artwork.priceCurrency": (v18/*: any*/),
        "order.lineItems.edges.node.artwork.shippingOrigin": (v18/*: any*/),
        "order.lineItems.edges.node.artwork.slug": (v19/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "order.lineItems.edges.node.artworkOrEditionSet.__isNode": (v17/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v17/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.displayPriceRange": (v24/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v19/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.internalID": (v19/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "order.lineItems.edges.node.artworkOrEditionSet.listPrice.__typename": (v17/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.listPrice.major": (v25/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.listPrice.maxPrice": (v26/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.listPrice.maxPrice.major": (v25/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.listPrice.minPrice": (v26/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.listPrice.minPrice.major": (v25/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v18/*: any*/),
        "order.lineItems.edges.node.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "order.lineItems.edges.node.artworkVersion.artistNames": (v18/*: any*/),
        "order.lineItems.edges.node.artworkVersion.id": (v19/*: any*/),
        "order.lineItems.edges.node.artworkVersion.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "order.lineItems.edges.node.artworkVersion.image.resized_ArtworkSummaryItem": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "order.lineItems.edges.node.artworkVersion.image.resized_ArtworkSummaryItem.url": (v17/*: any*/),
        "order.lineItems.edges.node.artworkVersion.title": (v18/*: any*/),
        "order.lineItems.edges.node.id": (v19/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceShippingQuote"
        },
        "order.lineItems.edges.node.selectedShippingQuote.displayName": (v17/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.id": (v19/*: any*/),
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
        "order.myLastOffer.amount": (v18/*: any*/),
        "order.myLastOffer.amountCents": (v21/*: any*/),
        "order.myLastOffer.buyerTotal": (v18/*: any*/),
        "order.myLastOffer.buyerTotalCents": (v22/*: any*/),
        "order.myLastOffer.fromParticipant": (v23/*: any*/),
        "order.myLastOffer.id": (v19/*: any*/),
        "order.myLastOffer.internalID": (v19/*: any*/),
        "order.myLastOffer.note": (v18/*: any*/),
        "order.myLastOffer.shippingTotal": (v18/*: any*/),
        "order.myLastOffer.shippingTotalCents": (v22/*: any*/),
        "order.myLastOffer.taxTotal": (v18/*: any*/),
        "order.myLastOffer.taxTotalCents": (v22/*: any*/),
        "order.requestedFulfillment": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceRequestedFulfillmentUnion"
        },
        "order.requestedFulfillment.__typename": (v17/*: any*/),
        "order.sellerDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderParty"
        },
        "order.sellerDetails.__isNode": (v17/*: any*/),
        "order.sellerDetails.__typename": (v17/*: any*/),
        "order.sellerDetails.id": (v19/*: any*/),
        "order.sellerDetails.name": (v18/*: any*/),
        "order.shippingTotal": (v18/*: any*/),
        "order.shippingTotalCents": (v22/*: any*/),
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
        "order.taxTotal": (v18/*: any*/),
        "order.taxTotalCents": (v22/*: any*/),
        "order.totalListPriceCents": (v21/*: any*/)
      }
    },
    "name": "Offer2TestQuery",
    "operationKind": "query",
    "text": "query Offer2TestQuery {\n  order: commerceOrder(id: \"1234567\") {\n    __typename\n    ...Offer_order\n    id\n  }\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on User {\n      id\n    }\n  }\n  currencyCode\n  mode\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        artwork {\n          date\n          shippingOrigin\n          id\n        }\n        artworkVersion {\n          artistNames\n          title\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment Offer_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  state\n  totalListPriceCents\n  currencyCode\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          price\n          isPriceRange\n          isEdition\n          ...PriceOptions_artwork\n          id\n        }\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n            displayPriceRange\n            listPrice {\n              __typename\n              ... on Money {\n                major\n              }\n              ... on PriceRange {\n                maxPrice {\n                  major\n                }\n                minPrice {\n                  major\n                }\n              }\n            }\n          }\n          ... on EditionSet {\n            internalID\n            price\n            displayPriceRange\n            listPrice {\n              __typename\n              ... on Money {\n                major\n              }\n              ... on PriceRange {\n                maxPrice {\n                  major\n                }\n                minPrice {\n                  major\n                }\n              }\n            }\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    isInquiryOrder\n  }\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n  ...PriceOptions_order\n}\n\nfragment PriceOptions_artwork on Artwork {\n  priceCurrency\n  isPriceRange\n}\n\nfragment PriceOptions_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  code\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        selectedShippingQuote {\n          displayName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '7fe17ed91eea079ea393080194a74c99';
export default node;
