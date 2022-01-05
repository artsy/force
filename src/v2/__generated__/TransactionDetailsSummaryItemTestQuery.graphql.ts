/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type TransactionDetailsSummaryItemTestQueryVariables = {};
export type TransactionDetailsSummaryItemTestQueryResponse = {
    readonly order: {
        readonly " $fragmentRefs": FragmentRefs<"TransactionDetailsSummaryItem_order">;
    } | null;
};
export type TransactionDetailsSummaryItemTestQueryRawResponse = {
    readonly order: ({
        readonly __typename: "CommerceOfferOrder";
        readonly requestedFulfillment: ({
            readonly __typename: string;
        }) | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
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
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly mode: CommerceOrderModeEnum | null;
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
        readonly __typename: string;
        readonly requestedFulfillment: ({
            readonly __typename: string;
        }) | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
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
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly mode: CommerceOrderModeEnum | null;
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
export type TransactionDetailsSummaryItemTestQuery = {
    readonly response: TransactionDetailsSummaryItemTestQueryResponse;
    readonly variables: TransactionDetailsSummaryItemTestQueryVariables;
    readonly rawResponse: TransactionDetailsSummaryItemTestQueryRawResponse;
};



/*
query TransactionDetailsSummaryItemTestQuery {
  order: commerceOrder(id: "whatevs") {
    __typename
    ...TransactionDetailsSummaryItem_order
    id
  }
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
    "value": "whatevs"
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
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "price",
    "storageKey": null
  }
],
v4 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v5 = {
  "alias": null,
  "args": (v4/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": (v4/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": (v4/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "internalID",
    "storageKey": null
  },
  {
    "alias": null,
    "args": (v4/*: any*/),
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
  (v5/*: any*/),
  (v6/*: any*/),
  (v7/*: any*/),
  (v8/*: any*/),
  (v9/*: any*/),
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
  (v2/*: any*/)
],
v11 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v12 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v13 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v14 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v15 = {
  "type": "CommerceOffer",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v16 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v17 = {
  "type": "Int",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v18 = {
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
    "name": "TransactionDetailsSummaryItemTestQuery",
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
            "name": "TransactionDetailsSummaryItem_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"whatevs\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "TransactionDetailsSummaryItemTestQuery",
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
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "artworkOrEditionSet",
                        "plural": false,
                        "selections": [
                          (v1/*: any*/),
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v3/*: any*/),
                            "type": "Artwork"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v3/*: any*/),
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
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
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
            "kind": "ScalarField",
            "name": "mode",
            "storageKey": null
          },
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          {
            "alias": null,
            "args": (v4/*: any*/),
            "kind": "ScalarField",
            "name": "itemsTotal",
            "storageKey": "itemsTotal(precision:2)"
          },
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currencyCode",
            "storageKey": null
          },
          (v2/*: any*/),
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
                "selections": (v10/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "myLastOffer",
                "plural": false,
                "selections": (v10/*: any*/),
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder"
          }
        ],
        "storageKey": "commerceOrder(id:\"whatevs\")"
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
        "order.id": (v11/*: any*/),
        "order.__typename": (v12/*: any*/),
        "order.requestedFulfillment": {
          "type": "CommerceRequestedFulfillmentUnion",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems": {
          "type": "CommerceLineItemConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.mode": {
          "type": "CommerceOrderModeEnum",
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "plural": false,
          "nullable": true
        },
        "order.shippingTotal": (v13/*: any*/),
        "order.shippingTotalCents": (v14/*: any*/),
        "order.taxTotal": (v13/*: any*/),
        "order.taxTotalCents": (v14/*: any*/),
        "order.itemsTotal": (v13/*: any*/),
        "order.buyerTotal": (v13/*: any*/),
        "order.currencyCode": (v12/*: any*/),
        "order.requestedFulfillment.__typename": (v12/*: any*/),
        "order.lineItems.edges": {
          "type": "CommerceLineItemEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "order.lastOffer": (v15/*: any*/),
        "order.myLastOffer": (v15/*: any*/),
        "order.lineItems.edges.node": {
          "type": "CommerceLineItem",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lastOffer.id": (v11/*: any*/),
        "order.myLastOffer.id": (v11/*: any*/),
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
        "order.lineItems.edges.node.id": (v11/*: any*/),
        "order.lastOffer.internalID": (v16/*: any*/),
        "order.lastOffer.amount": (v13/*: any*/),
        "order.lastOffer.amountCents": (v17/*: any*/),
        "order.lastOffer.shippingTotal": (v13/*: any*/),
        "order.lastOffer.shippingTotalCents": (v14/*: any*/),
        "order.lastOffer.taxTotal": (v13/*: any*/),
        "order.lastOffer.taxTotalCents": (v14/*: any*/),
        "order.lastOffer.buyerTotal": (v13/*: any*/),
        "order.lastOffer.buyerTotalCents": (v14/*: any*/),
        "order.lastOffer.fromParticipant": (v18/*: any*/),
        "order.lastOffer.note": (v13/*: any*/),
        "order.myLastOffer.internalID": (v16/*: any*/),
        "order.myLastOffer.amount": (v13/*: any*/),
        "order.myLastOffer.amountCents": (v17/*: any*/),
        "order.myLastOffer.shippingTotal": (v13/*: any*/),
        "order.myLastOffer.shippingTotalCents": (v14/*: any*/),
        "order.myLastOffer.taxTotal": (v13/*: any*/),
        "order.myLastOffer.taxTotalCents": (v14/*: any*/),
        "order.myLastOffer.buyerTotal": (v13/*: any*/),
        "order.myLastOffer.buyerTotalCents": (v14/*: any*/),
        "order.myLastOffer.fromParticipant": (v18/*: any*/),
        "order.myLastOffer.note": (v13/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v12/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.displayName": (v12/*: any*/),
        "order.lineItems.edges.node.selectedShippingQuote.id": (v11/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v13/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v11/*: any*/)
      }
    },
    "name": "TransactionDetailsSummaryItemTestQuery",
    "operationKind": "query",
    "text": "query TransactionDetailsSummaryItemTestQuery {\n  order: commerceOrder(id: \"whatevs\") {\n    __typename\n    ...TransactionDetailsSummaryItem_order\n    id\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            id\n          }\n        }\n        selectedShippingQuote {\n          displayName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd41f03e9e3cae58f872c2aef4857f94f';
export default node;
