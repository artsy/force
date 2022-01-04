/* tslint:disable */
/* eslint-disable */

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
  __typename
  ... on CommerceOrderStateChangedEvent {
    createdAt
    stateReason
    state
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
    "name": "conversationID",
    "type": "String!"
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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v8 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": false
},
v9 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v10 = {
  "type": "CommerceOrderParticipantEnum",
  "enumValues": [
    "BUYER",
    "SELLER"
  ],
  "plural": false,
  "nullable": true
},
v11 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": false
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
    "type": "Query"
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
                                "kind": "InlineFragment",
                                "selections": [
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "stateReason",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "state",
                                    "storageKey": null
                                  }
                                ],
                                "type": "CommerceOrderStateChangedEvent"
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
                                "type": "CommerceOfferSubmittedEvent"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "type": "Me",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.conversation": {
          "type": "Conversation",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.id": (v7/*: any*/),
        "me.conversation.orderConnection": {
          "type": "CommerceOrderConnectionWithTotalCount",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.conversation.id": (v7/*: any*/),
        "me.conversation.orderConnection.edges": {
          "type": "CommerceOrderEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "me.conversation.orderConnection.edges.node": {
          "type": "CommerceOrder",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.conversation.orderConnection.edges.node.orderHistory": {
          "type": "CommerceOrderEventUnion",
          "enumValues": null,
          "plural": true,
          "nullable": false
        },
        "me.conversation.orderConnection.edges.node.id": (v7/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.__typename": (v8/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.createdAt": (v8/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.stateReason": (v9/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.state": {
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
        "me.conversation.orderConnection.edges.node.orderHistory.offer": {
          "type": "CommerceOffer",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "me.conversation.orderConnection.edges.node.orderHistory.offer.amount": (v9/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.fromParticipant": (v10/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.definesTotal": (v11/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.offerAmountChanged": (v11/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.respondsTo": {
          "type": "CommerceOffer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "me.conversation.orderConnection.edges.node.orderHistory.offer.id": (v7/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.respondsTo.fromParticipant": (v10/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.respondsTo.id": (v7/*: any*/)
      }
    },
    "name": "OrderUpdate_Test_Query",
    "operationKind": "query",
    "text": "query OrderUpdate_Test_Query(\n  $conversationID: String!\n) {\n  me {\n    conversation(id: $conversationID) {\n      orderConnection(first: 10, participantType: BUYER) {\n        edges {\n          node {\n            __typename\n            orderHistory {\n              __typename\n              ...OrderUpdate_event\n            }\n            id\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment OrderUpdate_event on CommerceOrderEventUnion {\n  __typename\n  ... on CommerceOrderStateChangedEvent {\n    createdAt\n    stateReason\n    state\n  }\n  ... on CommerceOfferSubmittedEvent {\n    createdAt\n    offer {\n      amount\n      fromParticipant\n      definesTotal\n      offerAmountChanged\n      respondsTo {\n        fromParticipant\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'bfd3e0a8a2a60fdbd34f225d5180542e';
export default node;
