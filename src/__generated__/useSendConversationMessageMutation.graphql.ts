/**
 * @generated SignedSource<<eb471a9003b7c77891565e31d86357f1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SendConversationMessageMutationInput = {
  attachments?: ReadonlyArray<ConversationMessageAttachmentInput> | null;
  bodyHTML?: string | null;
  bodyText: string;
  clientMutationId?: string | null;
  from: string;
  fromId?: string | null;
  id: string;
  replyAll?: boolean | null;
  replyToMessageID: string;
  to?: ReadonlyArray<string | null> | null;
};
export type ConversationMessageAttachmentInput = {
  id?: string | null;
  name: string;
  size?: string | null;
  type: string;
  url: string;
};
export type useSendConversationMessageMutation$variables = {
  input: SendConversationMessageMutationInput;
};
export type useSendConversationMessageMutation$data = {
  readonly sendConversationMessage: {
    readonly conversation: {
      readonly lastMessageID: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"ConversationMessages_conversation">;
    } | null;
  } | null;
};
export type useSendConversationMessageMutation = {
  response: useSendConversationMessageMutation$data;
  variables: useSendConversationMessageMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lastMessageID",
  "storageKey": null
},
v3 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v4 = [
  (v3/*: any*/),
  {
    "kind": "Literal",
    "name": "sort",
    "value": "DESC"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v10 = {
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
    "name": "useSendConversationMessageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendConversationMessageMutationPayload",
        "kind": "LinkedField",
        "name": "sendConversationMessage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ConversationMessages_conversation"
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useSendConversationMessageMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendConversationMessageMutationPayload",
        "kind": "LinkedField",
        "name": "sendConversationMessage",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "fromLastViewedMessageID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v4/*: any*/),
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
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isFromUser",
                            "storageKey": null
                          },
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Attachment",
                            "kind": "LinkedField",
                            "name": "attachments",
                            "plural": true,
                            "selections": [
                              (v6/*: any*/),
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
                              (v5/*: any*/)
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
                              (v5/*: any*/)
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
                          }
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
                "args": (v4/*: any*/),
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
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ConversationItem",
                "kind": "LinkedField",
                "name": "items",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "item",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isOfferable",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isOfferableFromInquiry",
                            "storageKey": null
                          },
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artistNames",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "href",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": "imageURL",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "version",
                                    "value": [
                                      "large"
                                    ]
                                  }
                                ],
                                "kind": "ScalarField",
                                "name": "url",
                                "storageKey": "url(version:[\"large\"])"
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "listPrice",
                            "plural": false,
                            "selections": [
                              (v8/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v9/*: any*/),
                                "type": "Money",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v9/*: any*/),
                                "type": "PriceRange",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isConversationItemType"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v5/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "orderEvents",
                "args": [
                  (v3/*: any*/),
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
                          (v8/*: any*/),
                          (v6/*: any*/),
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
                              (v8/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v7/*: any*/),
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
                                  (v7/*: any*/),
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
                                      (v10/*: any*/),
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
                                          (v10/*: any*/),
                                          (v5/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v5/*: any*/)
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
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "orderConnection(first:10,participantType:\"BUYER\",states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\",\"CANCELED\",\"PROCESSING_APPROVAL\"])"
              },
              (v2/*: any*/),
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8ecf7d360ad3cb48ff6f4c61688998ea",
    "id": null,
    "metadata": {},
    "name": "useSendConversationMessageMutation",
    "operationKind": "mutation",
    "text": "mutation useSendConversationMessageMutation(\n  $input: SendConversationMessageMutationInput!\n) {\n  sendConversationMessage(input: $input) {\n    conversation {\n      ...ConversationMessages_conversation\n      lastMessageID\n      id\n    }\n  }\n}\n\nfragment ConversationMessageArtwork_item on ConversationItemType {\n  __isConversationItemType: __typename\n  __typename\n  ... on Artwork {\n    internalID\n    id\n    date\n    title\n    artistNames\n    href\n    isOfferableFromInquiry\n    image {\n      imageURL: url(version: [\"large\"])\n    }\n    listPrice {\n      __typename\n      ... on Money {\n        display\n      }\n      ... on PriceRange {\n        display\n      }\n    }\n  }\n}\n\nfragment ConversationMessage_message on Message {\n  __typename\n  id\n  internalID\n  attachments {\n    internalID\n    contentType\n    downloadURL\n    fileName\n    id\n  }\n  body\n  createdAt\n  createdAtTime: createdAt(format: \"h:mmA\")\n  deliveries {\n    openedAt\n    fullTransformedEmail\n    id\n  }\n  isFromUser\n  isFirstMessage\n  from {\n    name\n  }\n  to\n  cc\n}\n\nfragment ConversationMessages_conversation on Conversation {\n  fromLastViewedMessageID\n  messagesConnection(first: 10, sort: DESC) {\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    edges {\n      node {\n        id\n        internalID\n        createdAt\n        isFromUser\n        ...ConversationMessage_message\n        __typename\n      }\n      cursor\n    }\n  }\n  inquiryRequest {\n    formattedFirstMessage\n    id\n  }\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        id\n        isOfferable\n        isOfferableFromInquiry\n        internalID\n      }\n      ...ConversationMessageArtwork_item\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  orderEvents: orderConnection(first: 10, states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED, CANCELED, PROCESSING_APPROVAL], participantType: BUYER) {\n    edges {\n      node {\n        __typename\n        internalID\n        updatedAt\n        ... on CommerceOfferOrder {\n          buyerAction\n        }\n        orderHistory {\n          ...ConversationOrderUpdate_event\n          __typename\n          ... on CommerceOrderStateChangedEvent {\n            createdAt\n            orderUpdateState\n            state\n            stateReason\n          }\n          ... on CommerceOfferSubmittedEvent {\n            createdAt\n            offer {\n              amount\n              fromParticipant\n              definesTotal\n              offerAmountChanged\n              respondsTo {\n                fromParticipant\n                id\n              }\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationOrderUpdate_event on CommerceOrderEventUnion {\n  __isCommerceOrderEventUnion: __typename\n  __typename\n  ... on CommerceOrderStateChangedEvent {\n    createdAt\n    orderUpdateState\n    state\n    stateReason\n  }\n  ... on CommerceOfferSubmittedEvent {\n    createdAt\n    offer {\n      amount\n      fromParticipant\n      definesTotal\n      offerAmountChanged\n      respondsTo {\n        fromParticipant\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2b4c0c11d65e1d9f79abdf89196e24e9";

export default node;
