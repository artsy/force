/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConversationMessages_Test_QueryVariables = {};
export type ConversationMessages_Test_QueryResponse = {
    readonly me: {
        readonly conversation: {
            readonly messagesConnection: {
                readonly " $fragmentRefs": FragmentRefs<"ConversationMessages_messages">;
            } | null;
            readonly orderConnection: {
                readonly " $fragmentRefs": FragmentRefs<"ConversationMessages_events">;
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
      messagesConnection(first: 10) {
        ...ConversationMessages_messages
      }
      orderConnection(first: 10) {
        ...ConversationMessages_events
      }
      id
    }
    id
  }
}

fragment ConversationMessages_events on CommerceOrderConnectionWithTotalCount {
  edges {
    node {
      __typename
      orderHistory {
        ...OrderUpdate_event
        __typename
        ... on CommerceOrderStateChangedEvent {
          state
          stateReason
          createdAt
        }
        ... on CommerceOfferSubmittedEvent {
          createdAt
        }
      }
      id
    }
  }
}

fragment ConversationMessages_messages on MessageConnection {
  edges {
    node {
      __typename
      id
      internalID
      createdAt
      isFromUser
      body
      ...Message_message
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

fragment OrderUpdate_event on CommerceOrderEventUnion {
  __isCommerceOrderEventUnion: __typename
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
    "kind": "Literal",
    "name": "id",
    "value": "1234"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
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
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v10 = {
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
                "args": (v1/*: any*/),
                "concreteType": "MessageConnection",
                "kind": "LinkedField",
                "name": "messagesConnection",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ConversationMessages_messages"
                  }
                ],
                "storageKey": "messagesConnection(first:10)"
              },
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "CommerceOrderConnectionWithTotalCount",
                "kind": "LinkedField",
                "name": "orderConnection",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ConversationMessages_events"
                  }
                ],
                "storageKey": "orderConnection(first:10)"
              }
            ],
            "storageKey": "conversation(id:\"1234\")"
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
                "args": (v1/*: any*/),
                "concreteType": "MessageConnection",
                "kind": "LinkedField",
                "name": "messagesConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MessageEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Message",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "internalID",
                            "storageKey": null
                          },
                          (v4/*: any*/),
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
                              (v3/*: any*/),
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
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "messagesConnection(first:10)"
              },
              {
                "alias": null,
                "args": (v1/*: any*/),
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
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "orderHistory",
                            "plural": true,
                            "selections": [
                              {
                                "kind": "TypeDiscriminator",
                                "abstractKey": "__isCommerceOrderEventUnion"
                              },
                              (v2/*: any*/),
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
                                          (v3/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v3/*: any*/)
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
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "orderConnection(first:10)"
              },
              (v3/*: any*/)
            ],
            "storageKey": "conversation(id:\"1234\")"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9c8544ae85f736c389e6287345c77693",
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
        "me.conversation.id": (v6/*: any*/),
        "me.conversation.messagesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MessageConnection"
        },
        "me.conversation.messagesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MessageEdge"
        },
        "me.conversation.messagesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Message"
        },
        "me.conversation.messagesConnection.edges.node.__typename": (v7/*: any*/),
        "me.conversation.messagesConnection.edges.node.attachments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Attachment"
        },
        "me.conversation.messagesConnection.edges.node.attachments.contentType": (v7/*: any*/),
        "me.conversation.messagesConnection.edges.node.attachments.downloadURL": (v7/*: any*/),
        "me.conversation.messagesConnection.edges.node.attachments.fileName": (v7/*: any*/),
        "me.conversation.messagesConnection.edges.node.attachments.id": (v6/*: any*/),
        "me.conversation.messagesConnection.edges.node.body": (v8/*: any*/),
        "me.conversation.messagesConnection.edges.node.createdAt": (v8/*: any*/),
        "me.conversation.messagesConnection.edges.node.from": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MessageInitiator"
        },
        "me.conversation.messagesConnection.edges.node.from.email": (v8/*: any*/),
        "me.conversation.messagesConnection.edges.node.from.name": (v8/*: any*/),
        "me.conversation.messagesConnection.edges.node.id": (v6/*: any*/),
        "me.conversation.messagesConnection.edges.node.internalID": (v6/*: any*/),
        "me.conversation.messagesConnection.edges.node.isFromUser": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
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
        "me.conversation.orderConnection.edges.node.__typename": (v7/*: any*/),
        "me.conversation.orderConnection.edges.node.id": (v6/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "CommerceOrderEventUnion"
        },
        "me.conversation.orderConnection.edges.node.orderHistory.__isCommerceOrderEventUnion": (v7/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.__typename": (v7/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.createdAt": (v7/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CommerceOffer"
        },
        "me.conversation.orderConnection.edges.node.orderHistory.offer.amount": (v8/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.definesTotal": (v9/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.fromParticipant": (v10/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.id": (v6/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.offerAmountChanged": (v9/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.respondsTo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOffer"
        },
        "me.conversation.orderConnection.edges.node.orderHistory.offer.respondsTo.fromParticipant": (v10/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.offer.respondsTo.id": (v6/*: any*/),
        "me.conversation.orderConnection.edges.node.orderHistory.state": {
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
        "me.conversation.orderConnection.edges.node.orderHistory.stateReason": (v8/*: any*/),
        "me.id": (v6/*: any*/)
      }
    },
    "name": "ConversationMessages_Test_Query",
    "operationKind": "query",
    "text": "query ConversationMessages_Test_Query {\n  me {\n    conversation(id: \"1234\") {\n      messagesConnection(first: 10) {\n        ...ConversationMessages_messages\n      }\n      orderConnection(first: 10) {\n        ...ConversationMessages_events\n      }\n      id\n    }\n    id\n  }\n}\n\nfragment ConversationMessages_events on CommerceOrderConnectionWithTotalCount {\n  edges {\n    node {\n      __typename\n      orderHistory {\n        ...OrderUpdate_event\n        __typename\n        ... on CommerceOrderStateChangedEvent {\n          state\n          stateReason\n          createdAt\n        }\n        ... on CommerceOfferSubmittedEvent {\n          createdAt\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment ConversationMessages_messages on MessageConnection {\n  edges {\n    node {\n      __typename\n      id\n      internalID\n      createdAt\n      isFromUser\n      body\n      ...Message_message\n    }\n  }\n}\n\nfragment Message_message on Message {\n  __typename\n  internalID\n  body\n  createdAt\n  isFromUser\n  from {\n    name\n    email\n  }\n  attachments {\n    id\n    contentType\n    fileName\n    downloadURL\n  }\n}\n\nfragment OrderUpdate_event on CommerceOrderEventUnion {\n  __isCommerceOrderEventUnion: __typename\n  __typename\n  ... on CommerceOrderStateChangedEvent {\n    createdAt\n    stateReason\n    state\n  }\n  ... on CommerceOfferSubmittedEvent {\n    createdAt\n    offer {\n      amount\n      fromParticipant\n      definesTotal\n      offerAmountChanged\n      respondsTo {\n        fromParticipant\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'ac8b0cdff355d22116be3bda3e109e57';
export default node;
