/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type NewPaymentTestQueryVariables = {};
export type NewPaymentTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"NewPayment_me">;
    } | null;
    readonly order: {
        readonly " $fragmentRefs": FragmentRefs<"NewPayment_order">;
    } | null;
};
export type NewPaymentTestQueryRawResponse = {
    readonly me: ({
        readonly creditCards: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly internalID: string;
                    readonly brand: string;
                    readonly lastDigits: string;
                    readonly expirationMonth: number;
                    readonly expirationYear: number;
                    readonly id: string;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string;
    }) | null;
    readonly order: ({
        readonly __typename: "CommerceOfferOrder";
        readonly __isCommerceOrder: "CommerceOfferOrder";
        readonly internalID: string;
        readonly mode: CommerceOrderModeEnum | null;
        readonly stateExpiresAt: string | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly slug: string;
                        readonly artists: ReadonlyArray<({
                            readonly slug: string;
                            readonly id: string;
                        }) | null> | null;
                        readonly id: string;
                        readonly date: string | null;
                        readonly shippingOrigin: string | null;
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
        readonly state: CommerceOrderStateEnum;
        readonly creditCard: ({
            readonly internalID: string;
            readonly name: string | null;
            readonly street1: string | null;
            readonly street2: string | null;
            readonly city: string | null;
            readonly state: string | null;
            readonly country: string | null;
            readonly postalCode: string | null;
            readonly expirationMonth: number;
            readonly expirationYear: number;
            readonly lastDigits: string;
            readonly brand: string;
            readonly id: string;
        }) | null;
        readonly requestedFulfillment: ({
            readonly __typename: "CommerceShip";
            readonly name: string | null;
            readonly addressLine1: string | null;
            readonly addressLine2: string | null;
            readonly city: string | null;
            readonly region: string | null;
            readonly country: string | null;
            readonly postalCode: string | null;
        } | {
            readonly __typename: "CommerceShipArta";
            readonly name: string | null;
            readonly addressLine1: string | null;
            readonly addressLine2: string | null;
            readonly city: string | null;
            readonly region: string | null;
            readonly country: string | null;
            readonly postalCode: string | null;
        } | {
            readonly __typename: "CommercePickup";
            readonly fulfillmentType: string;
        } | {
            readonly __typename: string;
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
        readonly currencyCode: string;
        readonly code: string;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly itemsTotal: string | null;
        readonly buyerTotal: string | null;
        readonly id: string;
        readonly lastOffer: ({
            readonly createdAt: string;
            readonly internalID: string;
            readonly note: string | null;
            readonly id: string;
            readonly amount: string | null;
            readonly amountCents: number;
            readonly shippingTotal: string | null;
            readonly shippingTotalCents: number | null;
            readonly taxTotal: string | null;
            readonly taxTotalCents: number | null;
            readonly buyerTotal: string | null;
            readonly buyerTotalCents: number | null;
            readonly fromParticipant: CommerceOrderParticipantEnum | null;
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
        readonly stateExpiresAt: string | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly slug: string;
                        readonly artists: ReadonlyArray<({
                            readonly slug: string;
                            readonly id: string;
                        }) | null> | null;
                        readonly id: string;
                        readonly date: string | null;
                        readonly shippingOrigin: string | null;
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
        readonly state: CommerceOrderStateEnum;
        readonly creditCard: ({
            readonly internalID: string;
            readonly name: string | null;
            readonly street1: string | null;
            readonly street2: string | null;
            readonly city: string | null;
            readonly state: string | null;
            readonly country: string | null;
            readonly postalCode: string | null;
            readonly expirationMonth: number;
            readonly expirationYear: number;
            readonly lastDigits: string;
            readonly brand: string;
            readonly id: string;
        }) | null;
        readonly requestedFulfillment: ({
            readonly __typename: "CommerceShip";
            readonly name: string | null;
            readonly addressLine1: string | null;
            readonly addressLine2: string | null;
            readonly city: string | null;
            readonly region: string | null;
            readonly country: string | null;
            readonly postalCode: string | null;
        } | {
            readonly __typename: "CommerceShipArta";
            readonly name: string | null;
            readonly addressLine1: string | null;
            readonly addressLine2: string | null;
            readonly city: string | null;
            readonly region: string | null;
            readonly country: string | null;
            readonly postalCode: string | null;
        } | {
            readonly __typename: "CommercePickup";
            readonly fulfillmentType: string;
        } | {
            readonly __typename: string;
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
        readonly currencyCode: string;
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
export type NewPaymentTestQuery = {
    readonly response: NewPaymentTestQueryResponse;
    readonly variables: NewPaymentTestQueryVariables;
    readonly rawResponse: NewPaymentTestQueryRawResponse;
};



/*
query NewPaymentTestQuery {
  me {
    ...NewPayment_me
    id
  }
  order: commerceOrder(id: "unused") {
    __typename
    ...NewPayment_order
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

fragment NewPayment_me on Me {
  ...PaymentPicker_me
}

fragment NewPayment_order on CommerceOrder {
  __isCommerceOrder: __typename
  internalID
  mode
  stateExpiresAt
  lineItems {
    edges {
      node {
        artwork {
          slug
          artists {
            slug
            id
          }
          id
        }
        id
      }
    }
  }
  ... on CommerceOfferOrder {
    lastOffer {
      createdAt
      internalID
      note
      id
    }
  }
  ...PaymentPicker_order
  ...ArtworkSummaryItem_order
  ...TransactionDetailsSummaryItem_order
}

fragment PaymentPicker_me on Me {
  creditCards(first: 100) {
    edges {
      node {
        internalID
        brand
        lastDigits
        expirationMonth
        expirationYear
        id
      }
    }
  }
}

fragment PaymentPicker_order on CommerceOrder {
  __isCommerceOrder: __typename
  internalID
  mode
  state
  creditCard {
    internalID
    name
    street1
    street2
    city
    state
    country
    postalCode
    expirationMonth
    expirationYear
    lastDigits
    brand
    id
  }
  requestedFulfillment {
    __typename
    ... on CommerceShip {
      name
      addressLine1
      addressLine2
      city
      region
      country
      postalCode
    }
    ... on CommerceShipArta {
      name
      addressLine1
      addressLine2
      city
      region
      country
      postalCode
    }
    ... on CommercePickup {
      fulfillmentType
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
  internalID
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
    "value": "unused"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "brand",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastDigits",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationMonth",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationYear",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v10 = [
  (v6/*: any*/)
],
v11 = {
  "kind": "InlineFragment",
  "selections": (v10/*: any*/),
  "type": "Node",
  "abstractKey": "__isNode"
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v17 = [
  (v13/*: any*/),
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
  (v14/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "region",
    "storageKey": null
  },
  (v15/*: any*/),
  (v16/*: any*/)
],
v18 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v19 = {
  "alias": null,
  "args": (v18/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": (v18/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": (v18/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "note",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": (v18/*: any*/),
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": "amount(precision:2)"
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountCents",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerTotalCents",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CreditCard"
},
v30 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v31 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v32 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOffer"
},
v35 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v36 = {
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
    "name": "NewPaymentTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NewPayment_me"
          }
        ],
        "storageKey": null
      },
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
            "name": "NewPayment_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "NewPaymentTestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 100
              }
            ],
            "concreteType": "CreditCardConnection",
            "kind": "LinkedField",
            "name": "creditCards",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CreditCardEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CreditCard",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "creditCards(first:100)"
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": "order",
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "commerceOrder",
        "plural": false,
        "selections": [
          (v7/*: any*/),
          {
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
          },
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
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v8/*: any*/),
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v6/*: any*/),
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
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "artworkOrEditionSet",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v9/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v9/*: any*/),
                              (v6/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          (v11/*: any*/)
                        ],
                        "storageKey": null
                      },
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
                          (v6/*: any*/)
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
                          (v6/*: any*/)
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
          (v12/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CreditCard",
            "kind": "LinkedField",
            "name": "creditCard",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v13/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "street1",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "street2",
                "storageKey": null
              },
              (v14/*: any*/),
              (v12/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              (v3/*: any*/),
              (v2/*: any*/),
              (v6/*: any*/)
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
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v17/*: any*/),
                "type": "CommerceShip",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": (v17/*: any*/),
                "type": "CommerceShipArta",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "fulfillmentType",
                    "storageKey": null
                  }
                ],
                "type": "CommercePickup",
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
              (v7/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v13/*: any*/)
                ],
                "type": "Partner",
                "abstractKey": null
              },
              (v11/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": (v10/*: any*/),
                "type": "User",
                "abstractKey": null
              }
            ],
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
            "kind": "ScalarField",
            "name": "code",
            "storageKey": null
          },
          (v19/*: any*/),
          (v20/*: any*/),
          (v21/*: any*/),
          (v22/*: any*/),
          {
            "alias": null,
            "args": (v18/*: any*/),
            "kind": "ScalarField",
            "name": "itemsTotal",
            "storageKey": "itemsTotal(precision:2)"
          },
          (v23/*: any*/),
          (v6/*: any*/),
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
                  (v1/*: any*/),
                  (v24/*: any*/),
                  (v6/*: any*/),
                  (v25/*: any*/),
                  (v26/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v22/*: any*/),
                  (v23/*: any*/),
                  (v27/*: any*/),
                  (v28/*: any*/)
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
                  (v25/*: any*/),
                  (v26/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v22/*: any*/),
                  (v23/*: any*/),
                  (v27/*: any*/),
                  (v28/*: any*/),
                  (v24/*: any*/),
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          }
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ]
  },
  "params": {
    "cacheID": "c8b90049350c4af3bba9cf94ebe0d2d5",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.creditCards": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CreditCardConnection"
        },
        "me.creditCards.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CreditCardEdge"
        },
        "me.creditCards.edges.node": (v29/*: any*/),
        "me.creditCards.edges.node.brand": (v30/*: any*/),
        "me.creditCards.edges.node.expirationMonth": (v31/*: any*/),
        "me.creditCards.edges.node.expirationYear": (v31/*: any*/),
        "me.creditCards.edges.node.id": (v32/*: any*/),
        "me.creditCards.edges.node.internalID": (v32/*: any*/),
        "me.creditCards.edges.node.lastDigits": (v30/*: any*/),
        "me.id": (v32/*: any*/),
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v30/*: any*/),
        "order.__typename": (v30/*: any*/),
        "order.buyerTotal": (v33/*: any*/),
        "order.code": (v30/*: any*/),
        "order.creditCard": (v29/*: any*/),
        "order.creditCard.brand": (v30/*: any*/),
        "order.creditCard.city": (v33/*: any*/),
        "order.creditCard.country": (v33/*: any*/),
        "order.creditCard.expirationMonth": (v31/*: any*/),
        "order.creditCard.expirationYear": (v31/*: any*/),
        "order.creditCard.id": (v32/*: any*/),
        "order.creditCard.internalID": (v32/*: any*/),
        "order.creditCard.lastDigits": (v30/*: any*/),
        "order.creditCard.name": (v33/*: any*/),
        "order.creditCard.postalCode": (v33/*: any*/),
        "order.creditCard.state": (v33/*: any*/),
        "order.creditCard.street1": (v33/*: any*/),
        "order.creditCard.street2": (v33/*: any*/),
        "order.currencyCode": (v30/*: any*/),
        "order.id": (v32/*: any*/),
        "order.internalID": (v32/*: any*/),
        "order.itemsTotal": (v33/*: any*/),
        "order.lastOffer": (v34/*: any*/),
        "order.lastOffer.amount": (v33/*: any*/),
        "order.lastOffer.amountCents": (v31/*: any*/),
        "order.lastOffer.buyerTotal": (v33/*: any*/),
        "order.lastOffer.buyerTotalCents": (v35/*: any*/),
        "order.lastOffer.createdAt": (v30/*: any*/),
        "order.lastOffer.fromParticipant": (v36/*: any*/),
        "order.lastOffer.id": (v32/*: any*/),
        "order.lastOffer.internalID": (v32/*: any*/),
        "order.lastOffer.note": (v33/*: any*/),
        "order.lastOffer.shippingTotal": (v33/*: any*/),
        "order.lastOffer.shippingTotalCents": (v35/*: any*/),
        "order.lastOffer.taxTotal": (v33/*: any*/),
        "order.lastOffer.taxTotalCents": (v35/*: any*/),
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
        "order.lineItems.edges.node.artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "order.lineItems.edges.node.artwork.artists.id": (v32/*: any*/),
        "order.lineItems.edges.node.artwork.artists.slug": (v32/*: any*/),
        "order.lineItems.edges.node.artwork.date": (v33/*: any*/),
        "order.lineItems.edges.node.artwork.id": (v32/*: any*/),
        "order.lineItems.edges.node.artwork.shippingOrigin": (v33/*: any*/),
        "order.lineItems.edges.node.artwork.slug": (v32/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "order.lineItems.edges.node.artworkOrEditionSet.__isNode": (v30/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v30/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v32/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v33/*: any*/),
        "order.lineItems.edges.node.artworkVersion": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkVersion"
        },
        "order.lineItems.edges.node.artworkVersion.artistNames": (v33/*: any*/),
        "order.lineItems.edges.node.artworkVersion.id": (v32/*: any*/),
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
        "order.lineItems.edges.node.artworkVersion.image.resized_ArtworkSummaryItem.url": (v30/*: any*/),
        "order.lineItems.edges.node.artworkVersion.title": (v33/*: any*/),
        "order.lineItems.edges.node.id": (v32/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceShippingQuote"
        },
        "order.lineItems.edges.node.selectedShippingQuote.displayName": (v30/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.id": (v32/*: any*/),
        "order.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "order.myLastOffer": (v34/*: any*/),
        "order.myLastOffer.amount": (v33/*: any*/),
        "order.myLastOffer.amountCents": (v31/*: any*/),
        "order.myLastOffer.buyerTotal": (v33/*: any*/),
        "order.myLastOffer.buyerTotalCents": (v35/*: any*/),
        "order.myLastOffer.fromParticipant": (v36/*: any*/),
        "order.myLastOffer.id": (v32/*: any*/),
        "order.myLastOffer.internalID": (v32/*: any*/),
        "order.myLastOffer.note": (v33/*: any*/),
        "order.myLastOffer.shippingTotal": (v33/*: any*/),
        "order.myLastOffer.shippingTotalCents": (v35/*: any*/),
        "order.myLastOffer.taxTotal": (v33/*: any*/),
        "order.myLastOffer.taxTotalCents": (v35/*: any*/),
        "order.requestedFulfillment": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceRequestedFulfillmentUnion"
        },
        "order.requestedFulfillment.__typename": (v30/*: any*/),
        "order.requestedFulfillment.addressLine1": (v33/*: any*/),
        "order.requestedFulfillment.addressLine2": (v33/*: any*/),
        "order.requestedFulfillment.city": (v33/*: any*/),
        "order.requestedFulfillment.country": (v33/*: any*/),
        "order.requestedFulfillment.fulfillmentType": (v30/*: any*/),
        "order.requestedFulfillment.name": (v33/*: any*/),
        "order.requestedFulfillment.postalCode": (v33/*: any*/),
        "order.requestedFulfillment.region": (v33/*: any*/),
        "order.sellerDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "OrderParty"
        },
        "order.sellerDetails.__isNode": (v30/*: any*/),
        "order.sellerDetails.__typename": (v30/*: any*/),
        "order.sellerDetails.id": (v32/*: any*/),
        "order.sellerDetails.name": (v33/*: any*/),
        "order.shippingTotal": (v33/*: any*/),
        "order.shippingTotalCents": (v35/*: any*/),
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
        "order.stateExpiresAt": (v33/*: any*/),
        "order.taxTotal": (v33/*: any*/),
        "order.taxTotalCents": (v35/*: any*/)
      }
    },
    "name": "NewPaymentTestQuery",
    "operationKind": "query",
    "text": "query NewPaymentTestQuery {\n  me {\n    ...NewPayment_me\n    id\n  }\n  order: commerceOrder(id: \"unused\") {\n    __typename\n    ...NewPayment_order\n    id\n  }\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n    ... on User {\n      id\n    }\n  }\n  currencyCode\n  mode\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        artwork {\n          date\n          shippingOrigin\n          id\n        }\n        artworkVersion {\n          artistNames\n          title\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment NewPayment_me on Me {\n  ...PaymentPicker_me\n}\n\nfragment NewPayment_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  stateExpiresAt\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          artists {\n            slug\n            id\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    lastOffer {\n      createdAt\n      internalID\n      note\n      id\n    }\n  }\n  ...PaymentPicker_order\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n}\n\nfragment PaymentPicker_me on Me {\n  creditCards(first: 100) {\n    edges {\n      node {\n        internalID\n        brand\n        lastDigits\n        expirationMonth\n        expirationYear\n        id\n      }\n    }\n  }\n}\n\nfragment PaymentPicker_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  internalID\n  mode\n  state\n  creditCard {\n    internalID\n    name\n    street1\n    street2\n    city\n    state\n    country\n    postalCode\n    expirationMonth\n    expirationYear\n    lastDigits\n    brand\n    id\n  }\n  requestedFulfillment {\n    __typename\n    ... on CommerceShip {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on CommerceShipArta {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on CommercePickup {\n      fulfillmentType\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  code\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        selectedShippingQuote {\n          displayName\n          id\n        }\n        id\n      }\n    }\n  }\n  internalID\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0cc56b005b9a11c716fae9645d398251';
export default node;
