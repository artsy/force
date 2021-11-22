/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConversationMessages_Test_QueryVariables = {};
export type ConversationMessages_Test_QueryResponse = {
    readonly me: {
        readonly conversation: {
            readonly conversationEventConnection: {
                readonly " $fragmentRefs": FragmentRefs<"ConversationMessages_messagesAndEvents">;
            } | null;
        } | null;
    } | null;
};
export type ConversationMessages_Test_Query = {
    readonly response: ConversationMessages_Test_QueryResponse;
    readonly variables: ConversationMessages_Test_QueryVariables;
};



/*
query ConversationMessages_Test_Query {
  me {
    conversation(id: "1234") {
      conversationEventConnection {
        ...ConversationMessages_messagesAndEvents
      }
      id
    }
    id
  }
}

fragment ConversationMessages_messagesAndEvents on ConversationEventConnection {
  edges {
    node {
      __typename
      ... on Message {
        internalID
        createdAt
        isFromUser
        body
        ...Message_message
      }
      ...OrderUpdate_event
      ... on ConversationOrderStateChanged {
        state
        stateReason
        createdAt
      }
      ... on ConversationOfferSubmitted {
        createdAt
      }
      ... on Node {
        id
      }
    }
  }
}

fragment Message_message on Message {
  __typename
  internalID
  body
  createdAt
  isFromUser
  from {
    name
    email
  }
  attachments {
    id
    contentType
    fileName
    downloadURL
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
    "kind": "Literal",
    "name": "id",
    "value": "1234"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationMessages_Test_Query",
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
            "args": (v0/*: any*/),
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ConversationMessages_messagesAndEvents"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "conversation(id:\"1234\")"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConversationMessages_Test_Query",
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
            "args": (v0/*: any*/),
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
                            "storageKey": null
                          },
                          (v1/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "internalID",
                                "storageKey": null
                              },
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isFromUser",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "body",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "MessageInitiator",
                                "kind": "LinkedField",
                                "name": "from",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "name",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "email",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Attachment",
                                "kind": "LinkedField",
                                "name": "attachments",
                                "plural": true,
                                "selections": [
                                  (v1/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "contentType",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "fileName",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "downloadURL",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "Message"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v2/*: any*/),
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
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "amount",
                                "storageKey": null
                              },
                              (v3/*: any*/),
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
                                  (v3/*: any*/),
                                  (v1/*: any*/)
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
              (v1/*: any*/)
            ],
            "storageKey": "conversation(id:\"1234\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ConversationMessages_Test_Query",
    "operationKind": "query",
    "text": "query ConversationMessages_Test_Query {\n  me {\n    conversation(id: \"1234\") {\n      conversationEventConnection {\n        ...ConversationMessages_messagesAndEvents\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment ConversationMessages_messagesAndEvents on ConversationEventConnection {\n  edges {\n    node {\n      __typename\n      ... on Message {\n        internalID\n        createdAt\n        isFromUser\n        body\n        ...Message_message\n      }\n      ...OrderUpdate_event\n      ... on ConversationOrderStateChanged {\n        state\n        stateReason\n        createdAt\n      }\n      ... on ConversationOfferSubmitted {\n        createdAt\n      }\n      ... on Node {\n        id\n      }\n    }\n  }\n}\n\nfragment Message_message on Message {\n  __typename\n  internalID\n  body\n  createdAt\n  isFromUser\n  from {\n    name\n    email\n  }\n  attachments {\n    id\n    contentType\n    fileName\n    downloadURL\n  }\n}\n\nfragment OrderUpdate_event on ConversationEvent {\n  ... on ConversationOrderStateChanged {\n    __typename\n    createdAt\n    stateReason\n    state\n  }\n  ... on ConversationOfferSubmitted {\n    __typename\n    createdAt\n    amount\n    fromParticipant\n    offerAmountChanged\n    respondsTo {\n      fromParticipant\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b28f5f3b087e49b156c940c88594a525';
export default node;
