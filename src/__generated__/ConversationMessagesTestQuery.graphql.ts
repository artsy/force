/**
 * @generated SignedSource<<2935dcc43c587df58ad74b2da406c07e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationMessagesTestQuery$variables = {};
export type ConversationMessagesTestQuery$data = {
  readonly conversation: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationMessages_conversation">;
  } | null;
};
export type ConversationMessagesTestQuery = {
  response: ConversationMessagesTestQuery$data;
  variables: ConversationMessagesTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "123"
  }
],
v1 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "sort",
    "value": "DESC"
  }
],
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
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
  "type": "ID"
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
  "type": "String"
},
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": true,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v13 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v14 = {
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
    "name": "ConversationMessagesTestQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "ConversationMessages_conversation"
          }
        ],
        "storageKey": "conversation(id:\"123\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConversationMessagesTestQuery",
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
            "args": (v2/*: any*/),
            "concreteType": "MessageConnection",
            "kind": "LinkedField",
            "name": "messagesConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasPreviousPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                      (v3/*: any*/),
                      (v4/*: any*/),
                      (v5/*: any*/),
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
                        "concreteType": "Attachment",
                        "kind": "LinkedField",
                        "name": "attachments",
                        "plural": true,
                        "selections": [
                          (v4/*: any*/),
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
                            "name": "downloadURL",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "fileName",
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
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
                        "alias": "createdAtTime",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "h:mmA"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "createdAt",
                        "storageKey": "createdAt(format:\"h:mmA\")"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Delivery",
                        "kind": "LinkedField",
                        "name": "deliveries",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "openedAt",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "fullTransformedEmail",
                            "storageKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isFirstMessage",
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
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "to",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cc",
                        "storageKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "messagesConnection(first:10,sort:\"DESC\")"
          },
          {
            "alias": null,
            "args": (v2/*: any*/),
            "filters": [
              "sort"
            ],
            "handle": "connection",
            "key": "ConversationMessages_conversation_messagesConnection",
            "kind": "LinkedHandle",
            "name": "messagesConnection"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "PartnerInquiryRequest",
            "kind": "LinkedField",
            "name": "inquiryRequest",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "formattedFirstMessage",
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "orderEventsConnection",
            "args": [
              (v1/*: any*/),
              {
                "kind": "Literal",
                "name": "participantType",
                "value": "BUYER"
              },
              {
                "kind": "Literal",
                "name": "states",
                "value": [
                  "APPROVED",
                  "FULFILLED",
                  "SUBMITTED",
                  "REFUNDED",
                  "CANCELED",
                  "PROCESSING_APPROVAL"
                ]
              }
            ],
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
                      (v6/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "updatedAt",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "buyerAction",
                            "storageKey": null
                          }
                        ],
                        "type": "CommerceOfferOrder",
                        "abstractKey": null
                      },
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
                          (v6/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v5/*: any*/),
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
                              (v5/*: any*/),
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
                                  (v7/*: any*/),
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
                                      (v7/*: any*/),
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
            "storageKey": "orderConnection(first:10,participantType:\"BUYER\",states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\",\"CANCELED\",\"PROCESSING_APPROVAL\"])"
          },
          (v3/*: any*/)
        ],
        "storageKey": "conversation(id:\"123\")"
      }
    ]
  },
  "params": {
    "cacheID": "938c2b7867f52aee4b23a3e508128362",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "conversation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "conversation.id": (v8/*: any*/),
        "conversation.inquiryRequest": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerInquiryRequest"
        },
        "conversation.inquiryRequest.formattedFirstMessage": (v9/*: any*/),
        "conversation.inquiryRequest.id": (v8/*: any*/),
        "conversation.messagesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MessageConnection"
        },
        "conversation.messagesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MessageEdge"
        },
        "conversation.messagesConnection.edges.cursor": (v10/*: any*/),
        "conversation.messagesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Message"
        },
        "conversation.messagesConnection.edges.node.__typename": (v10/*: any*/),
        "conversation.messagesConnection.edges.node.attachments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Attachment"
        },
        "conversation.messagesConnection.edges.node.attachments.contentType": (v10/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.downloadURL": (v10/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.fileName": (v10/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.id": (v8/*: any*/),
        "conversation.messagesConnection.edges.node.attachments.internalID": (v8/*: any*/),
        "conversation.messagesConnection.edges.node.body": (v9/*: any*/),
        "conversation.messagesConnection.edges.node.cc": (v11/*: any*/),
        "conversation.messagesConnection.edges.node.createdAt": (v9/*: any*/),
        "conversation.messagesConnection.edges.node.createdAtTime": (v9/*: any*/),
        "conversation.messagesConnection.edges.node.deliveries": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Delivery"
        },
        "conversation.messagesConnection.edges.node.deliveries.fullTransformedEmail": (v10/*: any*/),
        "conversation.messagesConnection.edges.node.deliveries.id": (v8/*: any*/),
        "conversation.messagesConnection.edges.node.deliveries.openedAt": (v9/*: any*/),
        "conversation.messagesConnection.edges.node.from": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MessageInitiator"
        },
        "conversation.messagesConnection.edges.node.from.name": (v9/*: any*/),
        "conversation.messagesConnection.edges.node.id": (v8/*: any*/),
        "conversation.messagesConnection.edges.node.internalID": (v8/*: any*/),
        "conversation.messagesConnection.edges.node.isFirstMessage": (v12/*: any*/),
        "conversation.messagesConnection.edges.node.isFromUser": (v12/*: any*/),
        "conversation.messagesConnection.edges.node.to": (v11/*: any*/),
        "conversation.messagesConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "conversation.messagesConnection.pageInfo.endCursor": (v9/*: any*/),
        "conversation.messagesConnection.pageInfo.hasNextPage": (v13/*: any*/),
        "conversation.messagesConnection.pageInfo.hasPreviousPage": (v13/*: any*/),
        "conversation.messagesConnection.pageInfo.startCursor": (v9/*: any*/),
        "conversation.orderEventsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderConnectionWithTotalCount"
        },
        "conversation.orderEventsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceOrderEdge"
        },
        "conversation.orderEventsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "conversation.orderEventsConnection.edges.node.__typename": (v10/*: any*/),
        "conversation.orderEventsConnection.edges.node.buyerAction": {
          "enumValues": [
            "OFFER_ACCEPTED",
            "OFFER_ACCEPTED_CONFIRM_NEEDED",
            "OFFER_RECEIVED",
            "OFFER_RECEIVED_CONFIRM_NEEDED",
            "PAYMENT_FAILED",
            "PROVISIONAL_OFFER_ACCEPTED"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceBuyerOfferActionEnum"
        },
        "conversation.orderEventsConnection.edges.node.id": (v8/*: any*/),
        "conversation.orderEventsConnection.edges.node.internalID": (v8/*: any*/),
        "conversation.orderEventsConnection.edges.node.orderHistory": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "CommerceOrderEventUnion"
        },
        "conversation.orderEventsConnection.edges.node.orderHistory.__isCommerceOrderEventUnion": (v10/*: any*/),
        "conversation.orderEventsConnection.edges.node.orderHistory.__typename": (v10/*: any*/),
        "conversation.orderEventsConnection.edges.node.orderHistory.createdAt": (v10/*: any*/),
        "conversation.orderEventsConnection.edges.node.orderHistory.offer": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CommerceOffer"
        },
        "conversation.orderEventsConnection.edges.node.orderHistory.offer.amount": (v9/*: any*/),
        "conversation.orderEventsConnection.edges.node.orderHistory.offer.definesTotal": (v13/*: any*/),
        "conversation.orderEventsConnection.edges.node.orderHistory.offer.fromParticipant": (v14/*: any*/),
        "conversation.orderEventsConnection.edges.node.orderHistory.offer.id": (v8/*: any*/),
        "conversation.orderEventsConnection.edges.node.orderHistory.offer.offerAmountChanged": (v13/*: any*/),
        "conversation.orderEventsConnection.edges.node.orderHistory.offer.respondsTo": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOffer"
        },
        "conversation.orderEventsConnection.edges.node.orderHistory.offer.respondsTo.fromParticipant": (v14/*: any*/),
        "conversation.orderEventsConnection.edges.node.orderHistory.offer.respondsTo.id": (v8/*: any*/),
        "conversation.orderEventsConnection.edges.node.orderHistory.orderUpdateState": (v9/*: any*/),
        "conversation.orderEventsConnection.edges.node.orderHistory.state": {
          "enumValues": [
            "ABANDONED",
            "APPROVED",
            "CANCELED",
            "FULFILLED",
            "IN_REVIEW",
            "PENDING",
            "PROCESSING_APPROVAL",
            "REFUNDED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderStateEnum"
        },
        "conversation.orderEventsConnection.edges.node.orderHistory.stateReason": (v9/*: any*/),
        "conversation.orderEventsConnection.edges.node.updatedAt": (v10/*: any*/)
      }
    },
    "name": "ConversationMessagesTestQuery",
    "operationKind": "query",
    "text": "query ConversationMessagesTestQuery {\n  conversation(id: \"123\") {\n    ...ConversationMessages_conversation\n    id\n  }\n}\n\nfragment ConversationMessage_message on Message {\n  id\n  internalID\n  attachments {\n    internalID\n    contentType\n    downloadURL\n    fileName\n    id\n  }\n  body\n  createdAt\n  createdAtTime: createdAt(format: \"h:mmA\")\n  deliveries {\n    openedAt\n    fullTransformedEmail\n    id\n  }\n  isFromUser\n  isFirstMessage\n  from {\n    name\n  }\n  to\n  cc\n}\n\nfragment ConversationMessages_conversation on Conversation {\n  messagesConnection(first: 10, sort: DESC) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    edges {\n      node {\n        id\n        internalID\n        createdAt\n        isFromUser\n        ...ConversationMessage_message\n        __typename\n      }\n      cursor\n    }\n  }\n  inquiryRequest {\n    formattedFirstMessage\n    id\n  }\n  orderEventsConnection: orderConnection(first: 10, states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED, CANCELED, PROCESSING_APPROVAL], participantType: BUYER) {\n    edges {\n      node {\n        __typename\n        internalID\n        updatedAt\n        ... on CommerceOfferOrder {\n          buyerAction\n        }\n        orderHistory {\n          ...OrderUpdate_event\n          __typename\n          ... on CommerceOrderStateChangedEvent {\n            state\n            stateReason\n            createdAt\n          }\n          ... on CommerceOfferSubmittedEvent {\n            createdAt\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment OrderUpdate_event on CommerceOrderEventUnion {\n  __isCommerceOrderEventUnion: __typename\n  __typename\n  ... on CommerceOrderStateChangedEvent {\n    createdAt\n    orderUpdateState\n    state\n    stateReason\n  }\n  ... on CommerceOfferSubmittedEvent {\n    createdAt\n    offer {\n      amount\n      fromParticipant\n      definesTotal\n      offerAmountChanged\n      respondsTo {\n        fromParticipant\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d6648a7b72926582a13fff9a0d2da367";

export default node;
