/**
 * @generated SignedSource<<99f38371b022452aeef49c6457eec7a9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type OfferHistoryItemTestQuery$variables = Record<PropertyKey, never>;
export type OfferHistoryItemTestQuery$data = {
  readonly order: {
    readonly " $fragmentSpreads": FragmentRefs<"OfferHistoryItem_order">;
  } | null | undefined;
};
export type OfferHistoryItemTestQuery$rawResponse = {
  readonly order: {
    readonly __typename: "CommerceOfferOrder";
    readonly __isCommerceOrder: "CommerceOfferOrder";
    readonly currencyCode: string;
    readonly id: string;
    readonly lastOffer: {
      readonly amount: string | null | undefined;
      readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
      readonly id: string;
      readonly internalID: string;
      readonly note: string | null | undefined;
      readonly shippingTotal: string | null | undefined;
      readonly taxTotal: string | null | undefined;
    } | null | undefined;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artworkOrEditionSet: {
            readonly __typename: "Artwork";
            readonly __isNode: "Artwork";
            readonly id: string;
            readonly price: string | null | undefined;
          } | {
            readonly __typename: "EditionSet";
            readonly __isNode: "EditionSet";
            readonly id: string;
            readonly price: string | null | undefined;
          } | {
            readonly __typename: string;
            readonly __isNode: string;
            readonly id: string;
          } | null | undefined;
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly offers: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly amount: string | null | undefined;
          readonly createdAt: string;
          readonly fromParticipant: CommerceOrderParticipantEnum | null | undefined;
          readonly id: string;
          readonly internalID: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | {
    readonly __typename: string;
    readonly __isCommerceOrder: string;
    readonly id: string;
    readonly lineItems: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly artworkOrEditionSet: {
            readonly __typename: "Artwork";
            readonly __isNode: "Artwork";
            readonly id: string;
            readonly price: string | null | undefined;
          } | {
            readonly __typename: "EditionSet";
            readonly __isNode: "EditionSet";
            readonly id: string;
            readonly price: string | null | undefined;
          } | {
            readonly __typename: string;
            readonly __isNode: string;
            readonly id: string;
          } | null | undefined;
          readonly id: string;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type OfferHistoryItemTestQuery = {
  rawResponse: OfferHistoryItemTestQuery$rawResponse;
  response: OfferHistoryItemTestQuery$data;
  variables: OfferHistoryItemTestQuery$variables;
};

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
  "name": "price",
  "storageKey": null
},
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOffer"
},
v11 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v12 = {
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
    "type": "Query",
    "abstractKey": null
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
            "kind": "TypeDiscriminator",
            "abstractKey": "__isCommerceOrder"
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
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v2/*: any*/)
                            ],
                            "type": "Artwork",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/)
                            ],
                            "type": "EditionSet",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/)
                            ],
                            "type": "Node",
                            "abstractKey": "__isNode"
                          }
                        ],
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
          },
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
                          (v3/*: any*/)
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
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "type": "CommerceOfferOrder",
            "abstractKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "commerceOrder(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "5d4669f74fce276f53e92ecde8a7218a",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "order.__isCommerceOrder": (v8/*: any*/),
        "order.__typename": (v8/*: any*/),
        "order.currencyCode": (v8/*: any*/),
        "order.id": (v9/*: any*/),
        "order.lastOffer": (v10/*: any*/),
        "order.lastOffer.amount": (v11/*: any*/),
        "order.lastOffer.fromParticipant": (v12/*: any*/),
        "order.lastOffer.id": (v9/*: any*/),
        "order.lastOffer.internalID": (v9/*: any*/),
        "order.lastOffer.note": (v11/*: any*/),
        "order.lastOffer.shippingTotal": (v11/*: any*/),
        "order.lastOffer.taxTotal": (v11/*: any*/),
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
        "order.lineItems.edges.node.artworkOrEditionSet": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkOrEditionSetType"
        },
        "order.lineItems.edges.node.artworkOrEditionSet.__isNode": (v8/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.__typename": (v8/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.id": (v9/*: any*/),
        "order.lineItems.edges.node.artworkOrEditionSet.price": (v11/*: any*/),
        "order.lineItems.edges.node.id": (v9/*: any*/),
        "order.offers": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOfferConnection"
        },
        "order.offers.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceOfferEdge"
        },
        "order.offers.edges.node": (v10/*: any*/),
        "order.offers.edges.node.amount": (v11/*: any*/),
        "order.offers.edges.node.createdAt": (v8/*: any*/),
        "order.offers.edges.node.fromParticipant": (v12/*: any*/),
        "order.offers.edges.node.id": (v9/*: any*/),
        "order.offers.edges.node.internalID": (v9/*: any*/)
      }
    },
    "name": "OfferHistoryItemTestQuery",
    "operationKind": "query",
    "text": "query OfferHistoryItemTestQuery {\n  order: commerceOrder(id: \"foo\") {\n    __typename\n    ...OfferHistoryItem_order\n    id\n  }\n}\n\nfragment OfferHistoryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    offers {\n      edges {\n        node {\n          internalID\n          amount(precision: 2)\n          createdAt(format: \"MMM D\")\n          fromParticipant\n          id\n        }\n      }\n    }\n    currencyCode\n    lastOffer {\n      internalID\n      fromParticipant\n      amount(precision: 2)\n      shippingTotal(precision: 2)\n      taxTotal(precision: 2)\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "afd51bf3e365789b1db9e5bb2a257697";

export default node;
