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
            readonly conversationEventConnection: {
                readonly edges: ReadonlyArray<{
                    readonly node: {
                        readonly __typename: string;
                        readonly " $fragmentRefs": FragmentRefs<"OrderUpdate_event">;
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
      conversationEventConnection {
        edges {
          node {
            __typename
            ...OrderUpdate_event
            ... on Node {
              id
            }
          }
        }
      }
      id
    }
    id
  }
}

fragment OrderUpdate_event on ConversationEvent {
  ... on ConversationOrderStateChanged {
    __typename
    createdAt
    stateReason
    state
  }
  ... on ConversationOfferSubmitted {
    __typename
    createdAt
    amount
    fromParticipant
    offerAmountChanged
    respondsTo {
      fromParticipant
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
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
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
  "name": "createdAt",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
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
                "args": null,
                "concreteType": "ConversationEventConnection",
                "kind": "LinkedField",
                "name": "conversationEventConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ConversationEventEdge",
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
                          (v2/*: any*/),
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
                "args": null,
                "concreteType": "ConversationEventConnection",
                "kind": "LinkedField",
                "name": "conversationEventConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ConversationEventEdge",
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
                          (v2/*: any*/),
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
                            "type": "ConversationOrderStateChanged"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v4/*: any*/),
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
                                "name": "offerAmountChanged",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ConversationOfferSubmitted",
                                "kind": "LinkedField",
                                "name": "respondsTo",
                                "plural": false,
                                "selections": [
                                  (v5/*: any*/),
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "ConversationOfferSubmitted"
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
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "OrderUpdate_Test_Query",
    "operationKind": "query",
    "text": "query OrderUpdate_Test_Query(\n  $conversationID: String!\n) {\n  me {\n    conversation(id: $conversationID) {\n      conversationEventConnection {\n        edges {\n          node {\n            __typename\n            ...OrderUpdate_event\n            ... on Node {\n              id\n            }\n          }\n        }\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment OrderUpdate_event on ConversationEvent {\n  ... on ConversationOrderStateChanged {\n    __typename\n    createdAt\n    stateReason\n    state\n  }\n  ... on ConversationOfferSubmitted {\n    __typename\n    createdAt\n    amount\n    fromParticipant\n    offerAmountChanged\n    respondsTo {\n      fromParticipant\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '09dd5d281663f6185c9699030a51b5b4';
export default node;
