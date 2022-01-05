/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type OfferHistoryItemTestQueryVariables = {};
export type OfferHistoryItemTestQueryResponse = {
    readonly order: {
        readonly " $fragmentRefs": FragmentRefs<"OfferHistoryItem_order">;
    } | null;
};
export type OfferHistoryItemTestQueryRawResponse = {
    readonly order: ({
        readonly __typename: "CommerceOfferOrder";
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
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
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
        readonly currencyCode: string;
        readonly lastOffer: ({
            readonly internalID: string;
            readonly fromParticipant: CommerceOrderParticipantEnum | null;
            readonly amount: string | null;
            readonly shippingTotal: string | null;
            readonly taxTotal: string | null;
            readonly note: string | null;
            readonly id: string | null;
        }) | null;
    } | {
        readonly __typename: string | null;
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
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type OfferHistoryItemTestQuery = {
    readonly response: OfferHistoryItemTestQueryResponse;
    readonly variables: OfferHistoryItemTestQueryVariables;
    readonly rawResponse: OfferHistoryItemTestQueryRawResponse;
};



/*
query OfferHistoryItemTestQuery {
  order: commerceOrder(id: "foo") {
    __typename
    ...OfferHistoryItem_order
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
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
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v5 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v6 = {
  "alias": null,
  "args": (v5/*: any*/),
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": "amount(precision:2)"
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
},
v8 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v9 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v10 = {
  "type": "CommerceOffer",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v11 = {
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v12 = {
  "type": "CommerceOrderParticipantEnum",
  "enumValues": [
    "BUYER",
    "SELLER"
  ],
  "plural": false,
  "nullable": true
},
v13 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OfferHistoryItemTestQuery",
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
            "name": "OfferHistoryItem_order"
          }
        ],
        "storageKey": "commerceOrder(id:\"foo\")"
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OfferHistoryItemTestQuery",
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
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
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
                          (v4/*: any*/),
                          (v6/*: any*/),
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
                          (v7/*: any*/),
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
                "name": "currencyCode",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "kind": "LinkedField",
                "name": "lastOffer",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v7/*: any*/),
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": (v5/*: any*/),
                    "kind": "ScalarField",
                    "name": "shippingTotal",
                    "storageKey": "shippingTotal(precision:2)"
                  },
                  {
                    "alias": null,
                    "args": (v5/*: any*/),
                    "kind": "ScalarField",
                    "name": "taxTotal",
                    "storageKey": "taxTotal(precision:2)"
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
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder"
          }
        ],
        "storageKey": "commerceOrder(id:\"foo\")"
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
        "order.id": (v8/*: any*/),
        "order.lineItems": {
          "type": "CommerceLineItemConnection",
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
        "order.offers": {
          "type": "CommerceOfferConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.currencyCode": (v9/*: any*/),
        "order.lastOffer": (v10/*: any*/),
        "order.lineItems.edges.node": {
          "type": "CommerceLineItem",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.offers.edges": {
          "type": "CommerceOfferEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "order.lastOffer.internalID": (v11/*: any*/),
        "order.lastOffer.fromParticipant": (v12/*: any*/),
        "order.lastOffer.amount": (v13/*: any*/),
        "order.lastOffer.shippingTotal": (v13/*: any*/),
        "order.lastOffer.taxTotal": (v13/*: any*/),
        "order.lastOffer.note": (v13/*: any*/),
        "order.lastOffer.id": (v8/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet": {
          "type": "ArtworkOrEditionSetType",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "order.lineItems.edges.node.id": (v8/*: any*/),
        "order.offers.edges.node": (v10/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v9/*: any*/),
        "order.offers.edges.node.internalID": (v11/*: any*/),
        "order.offers.edges.node.amount": (v13/*: any*/),
        "order.offers.edges.node.createdAt": (v9/*: any*/),
        "order.offers.edges.node.fromParticipant": (v12/*: any*/),
        "order.offers.edges.node.id": (v8/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v13/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v8/*: any*/)
      }
    },
    "name": "OfferHistoryItemTestQuery",
    "operationKind": "query",
    "text": "query OfferHistoryItemTestQuery {\n  order: commerceOrder(id: \"foo\") {\n    __typename\n    ...OfferHistoryItem_order\n    id\n  }\n}\n\nfragment OfferHistoryItem_order on CommerceOrder {\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    offers {\n      edges {\n        node {\n          internalID\n          amount(precision: 2)\n          createdAt(format: \"MMM D\")\n          fromParticipant\n          id\n        }\n      }\n    }\n    currencyCode\n    lastOffer {\n      internalID\n      fromParticipant\n      amount(precision: 2)\n      shippingTotal(precision: 2)\n      taxTotal(precision: 2)\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'afd51bf3e365789b1db9e5bb2a257697';
export default node;
