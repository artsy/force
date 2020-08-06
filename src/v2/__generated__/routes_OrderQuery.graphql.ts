/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
export type CommerceOrderModeEnum = "BUY" | "OFFER" | "%future added value";
export type CommerceOrderParticipantEnum = "BUYER" | "SELLER" | "%future added value";
export type CommerceOrderStateEnum = "ABANDONED" | "APPROVED" | "CANCELED" | "FULFILLED" | "PENDING" | "REFUNDED" | "SUBMITTED" | "%future added value";
export type routes_OrderQueryVariables = {
    orderID: string;
};
export type routes_OrderQueryResponse = {
    readonly me: {
        readonly name: string | null;
    } | null;
    readonly order: {
        readonly internalID: string;
        readonly mode: CommerceOrderModeEnum | null;
        readonly state: CommerceOrderStateEnum;
        readonly lastTransactionFailed: boolean | null;
        readonly requestedFulfillment: {
            readonly __typename: string;
        } | null;
        readonly lineItems: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly artwork: {
                        readonly slug: string;
                        readonly href: string | null;
                        readonly is_acquireable: boolean | null;
                        readonly is_offerable: boolean | null;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
        readonly creditCard: {
            readonly internalID: string;
        } | null;
        readonly myLastOffer?: {
            readonly internalID: string;
            readonly createdAt: string;
        } | null;
        readonly lastOffer?: {
            readonly internalID: string;
            readonly createdAt: string;
        } | null;
        readonly awaitingResponseFrom?: CommerceOrderParticipantEnum | null;
    } | null;
};
export type routes_OrderQueryRawResponse = {
    readonly me: ({
        readonly name: string | null;
        readonly id: string | null;
    }) | null;
    readonly order: ({
        readonly __typename: "CommerceOfferOrder";
        readonly internalID: string;
        readonly mode: CommerceOrderModeEnum | null;
        readonly state: CommerceOrderStateEnum;
        readonly lastTransactionFailed: boolean | null;
        readonly requestedFulfillment: ({
            readonly __typename: string;
        }) | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly slug: string;
                        readonly id: string | null;
                        readonly href: string | null;
                        readonly is_acquireable: boolean | null;
                        readonly is_offerable: boolean | null;
                    }) | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly creditCard: ({
            readonly internalID: string;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
        readonly myLastOffer: ({
            readonly internalID: string;
            readonly createdAt: string;
            readonly id: string | null;
        }) | null;
        readonly lastOffer: ({
            readonly internalID: string;
            readonly createdAt: string;
            readonly id: string | null;
        }) | null;
        readonly awaitingResponseFrom: CommerceOrderParticipantEnum | null;
    } | {
        readonly __typename: string | null;
        readonly internalID: string;
        readonly mode: CommerceOrderModeEnum | null;
        readonly state: CommerceOrderStateEnum;
        readonly lastTransactionFailed: boolean | null;
        readonly requestedFulfillment: ({
            readonly __typename: string;
        }) | null;
        readonly lineItems: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly artwork: ({
                        readonly slug: string;
                        readonly id: string | null;
                        readonly href: string | null;
                        readonly is_acquireable: boolean | null;
                        readonly is_offerable: boolean | null;
                    }) | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly creditCard: ({
            readonly internalID: string;
            readonly id: string | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type routes_OrderQuery = {
    readonly response: routes_OrderQueryResponse;
    readonly variables: routes_OrderQueryVariables;
    readonly rawResponse: routes_OrderQueryRawResponse;
};



/*
query routes_OrderQuery(
  $orderID: ID!
) {
  me {
    name
    id
  }
  order: commerceOrder(id: $orderID) @principalField {
    __typename
    internalID
    mode
    state
    lastTransactionFailed
    ... on CommerceOfferOrder {
      myLastOffer {
        internalID
        createdAt
        id
      }
      lastOffer {
        internalID
        createdAt
        id
      }
      awaitingResponseFrom
    }
    requestedFulfillment {
      __typename
    }
    lineItems {
      edges {
        node {
          artwork {
            slug
            id
            href
            is_acquireable: isAcquireable
            is_offerable: isOfferable
          }
          id
        }
      }
    }
    creditCard {
      internalID
      id
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "LocalArgument",
    "name": "orderID",
    "type": "ID!",
    "defaultValue": null
  }
],
v1 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "name",
  "args": null,
  "storageKey": null
},
v2 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "orderID"
  }
],
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "internalID",
  "args": null,
  "storageKey": null
},
v4 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "mode",
  "args": null,
  "storageKey": null
},
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "state",
  "args": null,
  "storageKey": null
},
v6 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "lastTransactionFailed",
  "args": null,
  "storageKey": null
},
v7 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "__typename",
  "args": null,
  "storageKey": null
},
v8 = {
  "kind": "LinkedField",
  "alias": null,
  "name": "requestedFulfillment",
  "storageKey": null,
  "args": null,
  "concreteType": null,
  "plural": false,
  "selections": [
    (v7/*: any*/)
  ]
},
v9 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "slug",
  "args": null,
  "storageKey": null
},
v10 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "href",
  "args": null,
  "storageKey": null
},
v11 = {
  "kind": "ScalarField",
  "alias": "is_acquireable",
  "name": "isAcquireable",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": "is_offerable",
  "name": "isOfferable",
  "args": null,
  "storageKey": null
},
v13 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "createdAt",
  "args": null,
  "storageKey": null
},
v14 = [
  (v3/*: any*/),
  (v13/*: any*/)
],
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "awaitingResponseFrom",
  "args": null,
  "storageKey": null
},
v16 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
},
v17 = [
  (v3/*: any*/),
  (v13/*: any*/),
  (v16/*: any*/)
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "routes_OrderQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "commerceOrder",
        "storageKey": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v8/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "lineItems",
            "storageKey": null,
            "args": null,
            "concreteType": "CommerceLineItemConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "CommerceLineItemEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "CommerceLineItem",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artwork",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/)
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCard",
            "storageKey": null,
            "args": null,
            "concreteType": "CreditCard",
            "plural": false,
            "selections": [
              (v3/*: any*/)
            ]
          },
          {
            "kind": "InlineFragment",
            "type": "CommerceOfferOrder",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "myLastOffer",
                "storageKey": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "plural": false,
                "selections": (v14/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lastOffer",
                "storageKey": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "plural": false,
                "selections": (v14/*: any*/)
              },
              (v15/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "routes_OrderQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "me",
        "storageKey": null,
        "args": null,
        "concreteType": "Me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v16/*: any*/)
        ]
      },
      {
        "kind": "LinkedField",
        "alias": "order",
        "name": "commerceOrder",
        "storageKey": null,
        "args": (v2/*: any*/),
        "concreteType": null,
        "plural": false,
        "selections": [
          (v7/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v8/*: any*/),
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "lineItems",
            "storageKey": null,
            "args": null,
            "concreteType": "CommerceLineItemConnection",
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "CommerceLineItemEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "CommerceLineItem",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "artwork",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "plural": false,
                        "selections": [
                          (v9/*: any*/),
                          (v16/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/)
                        ]
                      },
                      (v16/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "creditCard",
            "storageKey": null,
            "args": null,
            "concreteType": "CreditCard",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              (v16/*: any*/)
            ]
          },
          (v16/*: any*/),
          {
            "kind": "InlineFragment",
            "type": "CommerceOfferOrder",
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "myLastOffer",
                "storageKey": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "plural": false,
                "selections": (v17/*: any*/)
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "lastOffer",
                "storageKey": null,
                "args": null,
                "concreteType": "CommerceOffer",
                "plural": false,
                "selections": (v17/*: any*/)
              },
              (v15/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "routes_OrderQuery",
    "id": null,
    "text": "query routes_OrderQuery(\n  $orderID: ID!\n) {\n  me {\n    name\n    id\n  }\n  order: commerceOrder(id: $orderID) @principalField {\n    __typename\n    internalID\n    mode\n    state\n    lastTransactionFailed\n    ... on CommerceOfferOrder {\n      myLastOffer {\n        internalID\n        createdAt\n        id\n      }\n      lastOffer {\n        internalID\n        createdAt\n        id\n      }\n      awaitingResponseFrom\n    }\n    requestedFulfillment {\n      __typename\n    }\n    lineItems {\n      edges {\n        node {\n          artwork {\n            slug\n            id\n            href\n            is_acquireable: isAcquireable\n            is_offerable: isOfferable\n          }\n          id\n        }\n      }\n    }\n    creditCard {\n      internalID\n      id\n    }\n    id\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'a2c250d484790ea3dd5b02bbe273c793';
export default node;
