/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type PaymentTestQueryVariables = {};
export type PaymentTestQueryResponse = {
    readonly me: {
        readonly " $fragmentRefs": FragmentRefs<"Payment_me">;
    } | null;
    readonly order: {
        readonly " $fragmentRefs": FragmentRefs<"Payment_order">;
    } | null;
};
export type PaymentTestQueryRawResponse = {
    readonly me: ({
        readonly creditCards: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly internalID: string;
                    readonly brand: string;
                    readonly lastDigits: string;
                    readonly expirationMonth: number;
                    readonly expirationYear: number;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
    }) | null;
    readonly order: ({
        readonly internalID: string;
        readonly mode: CommerceOrderModeEnum | null;
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
            readonly id: string | null;
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
            readonly __typename: "CommercePickup";
            readonly fulfillmentType: string;
        } | {
            readonly __typename: string;
        }) | null;
        readonly sellerDetails: ({
            readonly __typename: "Partner";
            readonly id: string | null;
            readonly name: string | null;
        } | {
            readonly __typename: string | null;
            readonly id: string | null;
        }) | null;
        readonly __typename: "CommerceOfferOrder";
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly itemsTotal: string | null;
        readonly buyerTotal: string | null;
        readonly currencyCode: string;
        readonly id: string | null;
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
            readonly id: string | null;
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
            readonly id: string | null;
        }) | null;
    } | {
        readonly internalID: string;
        readonly mode: CommerceOrderModeEnum | null;
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
            readonly id: string | null;
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
            readonly __typename: "CommercePickup";
            readonly fulfillmentType: string;
        } | {
            readonly __typename: string;
        }) | null;
        readonly sellerDetails: ({
            readonly __typename: "Partner";
            readonly id: string | null;
            readonly name: string | null;
        } | {
            readonly __typename: string | null;
            readonly id: string | null;
        }) | null;
        readonly __typename: string;
        readonly shippingTotal: string | null;
        readonly shippingTotalCents: number | null;
        readonly taxTotal: string | null;
        readonly taxTotalCents: number | null;
        readonly itemsTotal: string | null;
        readonly buyerTotal: string | null;
        readonly currencyCode: string;
        readonly id: string | null;
    }) | null;
};
export type PaymentTestQuery = {
    readonly response: PaymentTestQueryResponse;
    readonly variables: PaymentTestQueryVariables;
    readonly rawResponse: PaymentTestQueryRawResponse;
};



/*
query PaymentTestQuery {
  me {
    ...Payment_me
    id
  }
  order: commerceOrder(id: "unused") {
    __typename
    ...Payment_order
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

fragment Payment_me on Me {
  ...PaymentPicker_me
}

fragment Payment_order on CommerceOrder {
  internalID
  mode
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
  ...PaymentPicker_order
  ...ArtworkSummaryItem_order
  ...TransactionDetailsSummaryItem_order
}

fragment TransactionDetailsSummaryItem_order on CommerceOrder {
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
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "price",
    "storageKey": null
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "country",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "postalCode",
  "storageKey": null
},
v14 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v15 = {
  "alias": null,
  "args": (v14/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": (v14/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": (v14/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v20 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": (v14/*: any*/),
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
  (v15/*: any*/),
  (v16/*: any*/),
  (v17/*: any*/),
  (v18/*: any*/),
  (v19/*: any*/),
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
  (v6/*: any*/)
],
v21 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v22 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v23 = {
  "type": "CreditCard",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v24 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v25 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v26 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v27 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v28 = {
  "type": "CommerceOffer",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v29 = {
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
    "name": "PaymentTestQuery",
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
            "name": "Payment_me"
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
            "name": "Payment_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PaymentTestQuery",
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
                          (v6/*: any*/),
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
                          (v6/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v8/*: any*/),
                            "type": "Artwork"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v8/*: any*/),
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
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "CreditCard",
            "kind": "LinkedField",
            "name": "creditCard",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v10/*: any*/),
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
              (v11/*: any*/),
              (v9/*: any*/),
              (v12/*: any*/),
              (v13/*: any*/),
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
                "selections": [
                  (v10/*: any*/),
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
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "region",
                    "storageKey": null
                  },
                  (v12/*: any*/),
                  (v13/*: any*/)
                ],
                "type": "CommerceShip"
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
                "type": "CommercePickup"
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
              (v6/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v10/*: any*/)
                ],
                "type": "Partner"
              }
            ],
            "storageKey": null
          },
          (v7/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          {
            "alias": null,
            "args": (v14/*: any*/),
            "kind": "ScalarField",
            "name": "itemsTotal",
            "storageKey": "itemsTotal(precision:2)"
          },
          (v19/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currencyCode",
            "storageKey": null
          },
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
                "selections": (v20/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "myLastOffer",
                "plural": false,
                "selections": (v20/*: any*/),
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder"
          }
        ],
        "storageKey": "commerceOrder(id:\"unused\")"
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order": {
          "type": "CommerceOrder",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v21/*: any*/),
        "order.id": (v21/*: any*/),
        "order.internalID": (v22/*: any*/),
        "order.mode": {
          "type": "CommerceOrderModeEnum",
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "plural": false,
          "nullable": true
        },
        "order.lineItems": {
          "type": "CommerceLineItemConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.creditCards": {
          "type": "CreditCardConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges": {
          "type": "CommerceLineItemEdge",
          "enumValues": null,
          "plural": true,
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
        "order.creditCard": (v23/*: any*/),
        "order.requestedFulfillment": {
          "type": "CommerceRequestedFulfillmentUnion",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.sellerDetails": {
          "type": "OrderParty",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.__typename": (v24/*: any*/),
        "order.shippingTotal": (v25/*: any*/),
        "order.shippingTotalCents": (v26/*: any*/),
        "order.taxTotal": (v25/*: any*/),
        "order.taxTotalCents": (v26/*: any*/),
        "order.itemsTotal": (v25/*: any*/),
        "order.buyerTotal": (v25/*: any*/),
        "order.currencyCode": (v24/*: any*/),
        "me.creditCards.edges": {
          "type": "CreditCardEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "order.lineItems.edges.node": {
          "type": "CommerceLineItem",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.creditCard.internalID": (v22/*: any*/),
        "order.creditCard.name": (v25/*: any*/),
        "order.creditCard.street1": (v25/*: any*/),
        "order.creditCard.street2": (v25/*: any*/),
        "order.creditCard.city": (v25/*: any*/),
        "order.creditCard.state": (v25/*: any*/),
        "order.creditCard.country": (v25/*: any*/),
        "order.creditCard.postalCode": (v25/*: any*/),
        "order.creditCard.expirationMonth": (v27/*: any*/),
        "order.creditCard.expirationYear": (v27/*: any*/),
        "order.creditCard.lastDigits": (v24/*: any*/),
        "order.creditCard.brand": (v24/*: any*/),
        "order.creditCard.id": (v21/*: any*/),
        "order.requestedFulfillment.__typename": (v24/*: any*/),
        "order.lastOffer": (v28/*: any*/),
        "order.myLastOffer": (v28/*: any*/),
        "me.creditCards.edges.node": (v23/*: any*/),
        "order.lineItems.edges.node.artwork": {
          "type": "Artwork",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node.id": (v21/*: any*/),
        "order.requestedFulfillment.name": (v25/*: any*/),
        "order.requestedFulfillment.addressLine1": (v25/*: any*/),
        "order.requestedFulfillment.addressLine2": (v25/*: any*/),
        "order.requestedFulfillment.city": (v25/*: any*/),
        "order.requestedFulfillment.region": (v25/*: any*/),
        "order.requestedFulfillment.country": (v25/*: any*/),
        "order.requestedFulfillment.postalCode": (v25/*: any*/),
        "order.requestedFulfillment.fulfillmentType": (v24/*: any*/),
        "order.sellerDetails.name": (v25/*: any*/),
        "order.sellerDetails.id": (v21/*: any*/),
        "order.lastOffer.id": (v21/*: any*/),
        "order.myLastOffer.id": (v21/*: any*/),
        "me.creditCards.edges.node.internalID": (v22/*: any*/),
        "me.creditCards.edges.node.brand": (v24/*: any*/),
        "me.creditCards.edges.node.lastDigits": (v24/*: any*/),
        "me.creditCards.edges.node.expirationMonth": (v27/*: any*/),
        "me.creditCards.edges.node.expirationYear": (v27/*: any*/),
        "me.creditCards.edges.node.id": (v21/*: any*/),
        "order.lineItems.edges.node.artwork.slug": (v22/*: any*/),
        "order.lineItems.edges.node.artwork.id": (v21/*: any*/),
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
        "order.lastOffer.internalID": (v22/*: any*/),
        "order.lastOffer.amount": (v25/*: any*/),
        "order.lastOffer.amountCents": (v27/*: any*/),
        "order.lastOffer.shippingTotal": (v25/*: any*/),
        "order.lastOffer.shippingTotalCents": (v26/*: any*/),
        "order.lastOffer.taxTotal": (v25/*: any*/),
        "order.lastOffer.taxTotalCents": (v26/*: any*/),
        "order.lastOffer.buyerTotal": (v25/*: any*/),
        "order.lastOffer.buyerTotalCents": (v26/*: any*/),
        "order.lastOffer.fromParticipant": (v29/*: any*/),
        "order.lastOffer.note": (v25/*: any*/),
        "order.myLastOffer.internalID": (v22/*: any*/),
        "order.myLastOffer.amount": (v25/*: any*/),
        "order.myLastOffer.amountCents": (v27/*: any*/),
        "order.myLastOffer.shippingTotal": (v25/*: any*/),
        "order.myLastOffer.shippingTotalCents": (v26/*: any*/),
        "order.myLastOffer.taxTotal": (v25/*: any*/),
        "order.myLastOffer.taxTotalCents": (v26/*: any*/),
        "order.myLastOffer.buyerTotal": (v25/*: any*/),
        "order.myLastOffer.buyerTotalCents": (v26/*: any*/),
        "order.myLastOffer.fromParticipant": (v29/*: any*/),
        "order.myLastOffer.note": (v25/*: any*/),
        "order.lineItems.edges.node.artwork.artistNames": (v25/*: any*/),
        "order.lineItems.edges.node.artwork.title": (v25/*: any*/),
        "order.lineItems.edges.node.artwork.date": (v25/*: any*/),
        "order.lineItems.edges.node.artwork.shippingOrigin": (v25/*: any*/),
        "order.lineItems.edges.node.artwork.image": {
          "type": "Image",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v24/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.displayName": (v24/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.id": (v21/*: any*/),
        "order.lineItems.edges.node.artwork.image.resized_ArtworkSummaryItem": {
          "type": "ResizedImageUrl",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v25/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v21/*: any*/),
        "order.lineItems.edges.node.artwork.image.resized_ArtworkSummaryItem.url": (v24/*: any*/)
      }
    },
    "name": "PaymentTestQuery",
    "operationKind": "query",
    "text": "query PaymentTestQuery {\n  me {\n    ...Payment_me\n    id\n  }\n  order: commerceOrder(id: \"unused\") {\n    __typename\n    ...Payment_order\n    id\n  }\n}\n\nfragment ArtworkSummaryItem_order on CommerceOrder {\n  sellerDetails {\n    __typename\n    ... on Partner {\n      name\n    }\n    ... on Node {\n      id\n    }\n    ... on User {\n      id\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          artistNames\n          title\n          date\n          shippingOrigin\n          image {\n            resized_ArtworkSummaryItem: resized(width: 55) {\n              url\n            }\n          }\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment PaymentPicker_me on Me {\n  creditCards(first: 100) {\n    edges {\n      node {\n        internalID\n        brand\n        lastDigits\n        expirationMonth\n        expirationYear\n        id\n      }\n    }\n  }\n}\n\nfragment PaymentPicker_order on CommerceOrder {\n  internalID\n  mode\n  state\n  creditCard {\n    internalID\n    name\n    street1\n    street2\n    city\n    state\n    country\n    postalCode\n    expirationMonth\n    expirationYear\n    lastDigits\n    brand\n    id\n  }\n  requestedFulfillment {\n    __typename\n    ... on CommerceShip {\n      name\n      addressLine1\n      addressLine2\n      city\n      region\n      country\n      postalCode\n    }\n    ... on CommercePickup {\n      fulfillmentType\n    }\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment Payment_me on Me {\n  ...PaymentPicker_me\n}\n\nfragment Payment_order on CommerceOrder {\n  internalID\n  mode\n  lineItems {\n    edges {\n      node {\n        artwork {\n          slug\n          id\n        }\n        id\n      }\n    }\n  }\n  ...PaymentPicker_order\n  ...ArtworkSummaryItem_order\n  ...TransactionDetailsSummaryItem_order\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            id\n          }\n        }\n        selectedShippingQuote {\n          displayName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '14f9674b9b6dce1805ec6518676f13a0';
export default node;
