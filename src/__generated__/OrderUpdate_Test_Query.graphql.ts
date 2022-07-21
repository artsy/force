/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type OrderUpdate_Test_QueryVariables = {
    conversationID: string;
};
export type OrderUpdate_Test_QueryResponse = {
    readonly me: {
        readonly conversation: {
            readonly orderConnection: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly orderHistory: ReadonlyArray<{
                            readonly __typename: string;
                            readonly " $fragmentRefs": FragmentRefs<"OrderUpdate_event">;
                        }>;
                    } | null;
                } | null> | null;
            } | null;
        } | null;
    } | null;
};
export type OrderUpdate_Test_Query = {
    readonly response: OrderUpdate_Test_QueryResponse;
    readonly variables: OrderUpdate_Test_QueryVariables;
};



/*
query OrderUpdate_Test_Query(
  $conversationID: String!
) {
  me {
    conversation(id: $conversationID) {
      orderConnection(first: 10, participantType: BUYER) {
        edges {
          node {
            __typename
            orderHistory {
              __typename
              ...OrderUpdate_event
            }
            id
          }
        }
      }
      id
    }
    id
  }
}

fragment OrderUpdate_event on CommerceOrderEventUnion {
  __isCommerceOrderEventUnion: __typename
  __typename
  ... on CommerceOrderStateChangedEvent {
    createdAt
    orderUpdateState
    state
    stateReason
  }
  ... on CommerceOfferSubmittedEvent {
    createdAt
    offer {
      amount
      fromParticipant
      definesTotal
      offerAmountChanged
      respondsTo {
        fromParticipant
        id
      }
      id
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "conversationID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "conversationID"
  }
],
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "participantType",
    "value": "BUYER"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v10 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v11 = {
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "OrderUpdate_Test_Query",
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
            "args": (v1/*: any*/),
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
                "concreteType": "CommerceOrderConnectionWithTotalCount",
                "kind": "LinkedField",
                "name": "orderConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommerceOrderEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "orderHistory",
                            "plural": true,
                            "selections": [
                              (v3/*: any*/),
                              {
                                "args": null,
                                "kind": "FragmentSpread",
                                "name": "OrderUpdate_event"
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
                "storageKey": "orderConnection(first:10,participantType:\"BUYER\")"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "OrderUpdate_Test_Query",
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
            "args": (v1/*: any*/),
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
                "concreteType": "CommerceOrderConnectionWithTotalCount",
                "kind": "LinkedField",
                "name": "orderConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CommerceOrderEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "orderHistory",
                            "plural": true,
                            "selections": [
                              (v3/*: any*/),
                              {
                                "kind": "TypeDiscriminator",
                                "abstractKey": "__isCommerceOrderEventUnion"
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "orderUpdateState",
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
                                    "name": "stateReason",
                                    "storageKey": null
                                  }
                                ],
                                "type": "CommerceOrderStateChangedEvent",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "CommerceOffer",
                                    "kind": "LinkedField",
                                    "name": "offer",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "amount",
                                        "storageKey": null
                                      },
                                      (v5/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "definesTotal",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "offerAmountChanged",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "CommerceOffer",
                                        "kind": "LinkedField",
                                        "name": "respondsTo",
                                        "plural": false,
                                        "selections": [
                                          (v5/*: any*/),
                                          (v6/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v6/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "type": "CommerceOfferSubmittedEvent",
                                "abstractKey": null
                              }
                            ],
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
                "storageKey": "orderConnection(first:10,participantType:\"BUYER\")"
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d30959c0db32f558e89981cdc039038c",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.conversation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "me.conversation.id": (v7/*: any*/),
        "me.conversation.orderConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderConnectionWithTotalCount"
        },
        "me.conversation.orderConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceOrderEdge"
        },
        "me.conversation.orderConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "me.conversation.orderConnection.edges.node.__typename": (v8/*: any*/),
        "me.conversation.orderConnection.edges.node.id": (v7/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "CommerceOrderEventUnion"
        },
        "me.conversation.orderConnection.edges.node.orderHistory.__isCommerceOrderEventUnion": (v8/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.__typename": (v8/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.createdAt": (v8/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CommerceOffer"
        },
        "me.conversation.orderConnection.edges.node.orderHistory.offer.amount": (v9/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.definesTotal": (v10/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.fromParticipant": (v11/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.id": (v7/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.offerAmountChanged": (v10/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.respondsTo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOffer"
        },
        "me.conversation.orderConnection.edges.node.orderHistory.offer.respondsTo.fromParticipant": (v11/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.respondsTo.id": (v7/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.orderUpdateState": (v9/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.state": {
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "PENDING",
            "PROCESSING_APPROVAL",
            "REFUNDED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderStateEnum"
        },
        "me.conversation.orderConnection.edges.node.orderHistory.stateReason": (v9/*: any*/),
        "me.id": (v7/*: any*/)
      }
    },
    "name": "OrderUpdate_Test_Query",
    "operationKind": "query",
    "text": "query OrderUpdate_Test_Query(\n  $conversationID: String!\n) {\n  me {\n    conversation(id: $conversationID) {\n      orderConnection(first: 10, participantType: BUYER) {\n        edges {\n          node {\n            __typename\n            orderHistory {\n              __typename\n              ...OrderUpdate_event\n            }\n            id\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment OrderUpdate_event on CommerceOrderEventUnion {\n  __isCommerceOrderEventUnion: __typename\n  __typename\n  ... on CommerceOrderStateChangedEvent {\n    createdAt\n    orderUpdateState\n    state\n    stateReason\n  }\n  ... on CommerceOfferSubmittedEvent {\n    createdAt\n    offer {\n      amount\n      fromParticipant\n      definesTotal\n      offerAmountChanged\n      respondsTo {\n        fromParticipant\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bfd3e0a8a2a60fdbd34f225d5180542e';
export default node;
