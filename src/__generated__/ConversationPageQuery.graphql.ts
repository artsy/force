/**
 * @generated SignedSource<<f05b89dddd37dee8c7e8d1b92d6b494e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationPageQuery$variables = {
  conversationID: string;
};
export type ConversationPageQuery$data = {
  readonly me: {
    readonly " $fragmentSpreads": FragmentRefs<"Conversation_me">;
  } | null;
};
export type ConversationPageQuery = {
  response: ConversationPageQuery$data;
  variables: ConversationPageQuery$variables;
};

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
    "kind": "Literal",
    "name": "first",
    "value": 25
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v6 = [
  (v5/*: any*/),
  (v3/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "unread",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "date",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "artistNames",
  "storageKey": null
},
v12 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "url",
    "storageKey": null
  }
],
v13 = {
  "alias": null,
  "args": null,
  "concreteType": "Image",
  "kind": "LinkedField",
  "name": "coverImage",
  "plural": false,
  "selections": (v12/*: any*/),
  "storageKey": null
},
v14 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endCursor",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasNextPage",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasPreviousPage",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "startCursor",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v20 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerAction",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "createdAt",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stateReason",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
},
v26 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 30
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "DESC"
  }
],
v27 = {
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
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferableFromInquiry",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v31 = {
  "alias": "thumbnailUrl",
  "args": [
    {
      "kind": "Literal",
      "name": "version",
      "value": "small"
    }
  ],
  "kind": "ScalarField",
  "name": "url",
  "storageKey": "url(version:\"small\")"
},
v32 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v33 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "city",
  "storageKey": null
},
v37 = [
  (v4/*: any*/),
  (v3/*: any*/)
],
v38 = [
  (v5/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine1",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "addressLine2",
    "storageKey": null
  },
  (v36/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "postalCode",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "region",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "country",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "phoneNumber",
    "storageKey": null
  }
],
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "price",
  "storageKey": null
},
v40 = [
  {
    "kind": "Literal",
    "name": "precision",
    "value": 2
  }
],
v41 = {
  "alias": null,
  "args": (v40/*: any*/),
  "kind": "ScalarField",
  "name": "shippingTotal",
  "storageKey": "shippingTotal(precision:2)"
},
v42 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shippingTotalCents",
  "storageKey": null
},
v43 = {
  "alias": null,
  "args": (v40/*: any*/),
  "kind": "ScalarField",
  "name": "taxTotal",
  "storageKey": "taxTotal(precision:2)"
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "taxTotalCents",
  "storageKey": null
},
v45 = {
  "alias": null,
  "args": (v40/*: any*/),
  "kind": "ScalarField",
  "name": "buyerTotal",
  "storageKey": "buyerTotal(precision:2)"
},
v46 = [
  (v4/*: any*/),
  {
    "alias": null,
    "args": (v40/*: any*/),
    "kind": "ScalarField",
    "name": "amount",
    "storageKey": "amount(precision:2)"
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "amountCents",
    "storageKey": null
  },
  (v41/*: any*/),
  (v42/*: any*/),
  (v43/*: any*/),
  (v44/*: any*/),
  (v45/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "buyerTotalCents",
    "storageKey": null
  },
  (v25/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "note",
    "storageKey": null
  },
  (v3/*: any*/)
],
v47 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "brand",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "lastDigits",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "expirationYear",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "expirationMonth",
    "storageKey": null
  },
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationPageQuery",
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
            "args": [
              {
                "kind": "Variable",
                "name": "conversationID",
                "variableName": "conversationID"
              }
            ],
            "kind": "FragmentSpread",
            "name": "Conversation_me"
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
    "name": "ConversationPageQuery",
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
            "concreteType": "ConversationConnection",
            "kind": "LinkedField",
            "name": "conversationsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "ConversationEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Conversation",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastMessage",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ConversationResponder",
                        "kind": "LinkedField",
                        "name": "to",
                        "plural": false,
                        "selections": (v6/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastMessageAt",
                        "storageKey": null
                      },
                      (v7/*: any*/),
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
                                  (v9/*: any*/),
                                  (v10/*: any*/),
                                  (v11/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Image",
                                    "kind": "LinkedField",
                                    "name": "image",
                                    "plural": false,
                                    "selections": (v12/*: any*/),
                                    "storageKey": null
                                  }
                                ],
                                "type": "Artwork",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Fair",
                                    "kind": "LinkedField",
                                    "name": "fair",
                                    "plural": false,
                                    "selections": (v6/*: any*/),
                                    "storageKey": null
                                  },
                                  (v5/*: any*/),
                                  (v13/*: any*/)
                                ],
                                "type": "Show",
                                "abstractKey": null
                              },
                              (v14/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v8/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  (v15/*: any*/),
                  (v16/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": "conversationsConnection(first:25)"
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": null,
            "handle": "connection",
            "key": "ConversationList_conversationsConnection",
            "kind": "LinkedHandle",
            "name": "conversationsConnection"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "id",
                "variableName": "conversationID"
              }
            ],
            "concreteType": "Conversation",
            "kind": "LinkedField",
            "name": "conversation",
            "plural": false,
            "selections": [
              (v4/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ConversationInitiator",
                "kind": "LinkedField",
                "name": "from",
                "plural": false,
                "selections": [
                  (v19/*: any*/),
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ConversationResponder",
                "kind": "LinkedField",
                "name": "to",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "initials",
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
                "name": "initialMessage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "lastMessageID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "fromLastViewedMessageID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isLastMessageToUser",
                "storageKey": null
              },
              (v7/*: any*/),
              {
                "alias": null,
                "args": [
                  (v20/*: any*/),
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
                              (v21/*: any*/)
                            ],
                            "type": "CommerceOfferOrder",
                            "abstractKey": null
                          },
                          (v3/*: any*/),
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
                                  (v22/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "orderUpdateState",
                                    "storageKey": null
                                  },
                                  (v23/*: any*/),
                                  (v24/*: any*/)
                                ],
                                "type": "CommerceOrderStateChangedEvent",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v22/*: any*/),
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
                                      (v25/*: any*/),
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
                                          (v25/*: any*/),
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
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "orderConnection(first:10,participantType:\"BUYER\",states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\",\"CANCELED\",\"PROCESSING_APPROVAL\"])"
              },
              {
                "alias": null,
                "args": (v26/*: any*/),
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
                      (v18/*: any*/),
                      (v15/*: any*/),
                      (v17/*: any*/),
                      (v16/*: any*/)
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
                          (v8/*: any*/),
                          (v4/*: any*/),
                          (v22/*: any*/),
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
                              (v5/*: any*/),
                              (v19/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v27/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "totalCount",
                    "storageKey": null
                  }
                ],
                "storageKey": "messagesConnection(first:30,sort:\"DESC\")"
              },
              {
                "alias": null,
                "args": (v26/*: any*/),
                "filters": [],
                "handle": "connection",
                "key": "Messages_messagesConnection",
                "kind": "LinkedHandle",
                "name": "messagesConnection"
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
                          (v3/*: any*/),
                          (v28/*: any*/),
                          (v29/*: any*/),
                          (v4/*: any*/),
                          (v9/*: any*/),
                          (v10/*: any*/),
                          (v11/*: any*/),
                          (v30/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
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
                              },
                              (v31/*: any*/)
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
                                "selections": (v32/*: any*/),
                                "type": "Money",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v32/*: any*/),
                                "type": "PriceRange",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": "sale_message",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "saleMessage",
                            "storageKey": null
                          },
                          {
                            "alias": "cultural_maker",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "culturalMaker",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artist",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ArtistTargetSupply",
                                "kind": "LinkedField",
                                "name": "targetSupply",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isP1",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkPriceInsights",
                            "kind": "LinkedField",
                            "name": "marketPriceInsights",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "demandRank",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": (v33/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v3/*: any*/),
                              (v30/*: any*/),
                              (v5/*: any*/)
                            ],
                            "storageKey": "artists(shallow:true)"
                          },
                          {
                            "alias": "collecting_institution",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "collectingInstitution",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": (v33/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              (v30/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": "partner(shallow:true)"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Sale",
                            "kind": "LinkedField",
                            "name": "sale",
                            "plural": false,
                            "selections": [
                              (v34/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "cascadingEndTimeIntervalMinutes",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "extendedBiddingIntervalMinutes",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "startAt",
                                "storageKey": null
                              },
                              {
                                "alias": "is_auction",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isAuction",
                                "storageKey": null
                              },
                              {
                                "alias": "is_closed",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isClosed",
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": "sale_artwork",
                            "args": null,
                            "concreteType": "SaleArtwork",
                            "kind": "LinkedField",
                            "name": "saleArtwork",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotID",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotLabel",
                                "storageKey": null
                              },
                              (v34/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "extendedBiddingEndAt",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "formattedEndDateTime",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "SaleArtworkCounts",
                                "kind": "LinkedField",
                                "name": "counts",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": "bidder_positions",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "bidderPositions",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": "highest_bid",
                                "args": null,
                                "concreteType": "SaleArtworkHighestBid",
                                "kind": "LinkedField",
                                "name": "highestBid",
                                "plural": false,
                                "selections": (v32/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v32/*: any*/),
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v35/*: any*/),
                          {
                            "alias": "is_saved",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isSaved",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AttributionClass",
                            "kind": "LinkedField",
                            "name": "attributionClass",
                            "plural": false,
                            "selections": (v6/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkMedium",
                            "kind": "LinkedField",
                            "name": "mediumType",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Gene",
                                "kind": "LinkedField",
                                "name": "filterGene",
                                "plural": false,
                                "selections": (v6/*: any*/),
                                "storageKey": null
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
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Fair",
                            "kind": "LinkedField",
                            "name": "fair",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "exhibitionPeriod",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Location",
                                "kind": "LinkedField",
                                "name": "location",
                                "plural": false,
                                "selections": [
                                  (v36/*: any*/),
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v30/*: any*/),
                          (v5/*: any*/),
                          (v13/*: any*/),
                          {
                            "alias": "image",
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "coverImage",
                            "plural": false,
                            "selections": [
                              (v31/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "Show",
                        "abstractKey": null
                      },
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "liveArtwork",
                    "plural": false,
                    "selections": [
                      (v8/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v28/*: any*/),
                          (v29/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAcquireable",
                            "storageKey": null
                          },
                          (v4/*: any*/),
                          {
                            "alias": "is_acquireable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAcquireable",
                            "storageKey": null
                          },
                          {
                            "alias": "is_offerable",
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isOfferable",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isEdition",
                            "storageKey": null
                          },
                          (v35/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "EditionSet",
                            "kind": "LinkedField",
                            "name": "editionSets",
                            "plural": true,
                            "selections": (v37/*: any*/),
                            "storageKey": null
                          }
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      (v14/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "activeOrders",
                "args": [
                  (v20/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "states",
                    "value": [
                      "APPROVED",
                      "PROCESSING_APPROVAL",
                      "FULFILLED",
                      "SUBMITTED",
                      "REFUNDED"
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
                          (v4/*: any*/),
                          (v23/*: any*/),
                          (v24/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "stateExpiresAt",
                            "storageKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v21/*: any*/),
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "first",
                                    "value": 5
                                  }
                                ],
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
                                        "selections": (v37/*: any*/),
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "offers(first:5)"
                              }
                            ],
                            "type": "CommerceOfferOrder",
                            "abstractKey": null
                          },
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "orderConnection(first:10,states:[\"APPROVED\",\"PROCESSING_APPROVAL\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\"])"
              },
              {
                "alias": "sidebarOrderConnection",
                "args": [
                  (v20/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "states",
                    "value": [
                      "APPROVED",
                      "FULFILLED",
                      "SUBMITTED",
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
                          (v4/*: any*/),
                          (v23/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "displayState",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "mode",
                            "storageKey": null
                          },
                          (v24/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "code",
                            "storageKey": null
                          },
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
                            "name": "stateExpiresAt",
                            "storageKey": "stateExpiresAt(format:\"MMM D\")"
                          },
                          {
                            "kind": "TypeDiscriminator",
                            "abstractKey": "__isCommerceOrder"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "requestedFulfillment",
                            "plural": false,
                            "selections": [
                              (v8/*: any*/),
                              {
                                "kind": "TypeDiscriminator",
                                "abstractKey": "__isCommerceRequestedFulfillmentUnion"
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v38/*: any*/),
                                "type": "CommerceShip",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v38/*: any*/),
                                "type": "CommerceShipArta",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
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
                                          (v8/*: any*/),
                                          {
                                            "kind": "InlineFragment",
                                            "selections": [
                                              (v39/*: any*/)
                                            ],
                                            "type": "Artwork",
                                            "abstractKey": null
                                          },
                                          {
                                            "kind": "InlineFragment",
                                            "selections": [
                                              (v39/*: any*/),
                                              (v3/*: any*/)
                                            ],
                                            "type": "EditionSet",
                                            "abstractKey": null
                                          },
                                          (v14/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "CommerceShippingQuote",
                                        "kind": "LinkedField",
                                        "name": "selectedShippingQuote",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "typeName",
                                            "storageKey": null
                                          },
                                          (v3/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v3/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Artwork",
                                        "kind": "LinkedField",
                                        "name": "artwork",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "shippingOrigin",
                                            "storageKey": null
                                          },
                                          (v3/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "CommerceShipment",
                                        "kind": "LinkedField",
                                        "name": "shipment",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "trackingNumber",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "trackingUrl",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "carrierName",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "estimatedDeliveryWindow",
                                            "storageKey": null
                                          },
                                          (v3/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "CommerceFulfillmentConnection",
                                        "kind": "LinkedField",
                                        "name": "fulfillments",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "CommerceFulfillmentEdge",
                                            "kind": "LinkedField",
                                            "name": "edges",
                                            "plural": true,
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": "CommerceFulfillment",
                                                "kind": "LinkedField",
                                                "name": "node",
                                                "plural": false,
                                                "selections": [
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "courier",
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "kind": "ScalarField",
                                                    "name": "trackingId",
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "alias": null,
                                                    "args": [
                                                      {
                                                        "kind": "Literal",
                                                        "name": "format",
                                                        "value": "MMM Do, YYYY"
                                                      }
                                                    ],
                                                    "kind": "ScalarField",
                                                    "name": "estimatedDelivery",
                                                    "storageKey": "estimatedDelivery(format:\"MMM Do, YYYY\")"
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
                          (v41/*: any*/),
                          (v42/*: any*/),
                          (v43/*: any*/),
                          (v44/*: any*/),
                          {
                            "alias": null,
                            "args": (v40/*: any*/),
                            "kind": "ScalarField",
                            "name": "itemsTotal",
                            "storageKey": "itemsTotal(precision:2)"
                          },
                          (v45/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "currencyCode",
                            "storageKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceOffer",
                                "kind": "LinkedField",
                                "name": "lastOffer",
                                "plural": false,
                                "selections": (v46/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CommerceOffer",
                                "kind": "LinkedField",
                                "name": "myLastOffer",
                                "plural": false,
                                "selections": (v46/*: any*/),
                                "storageKey": null
                              },
                              (v21/*: any*/)
                            ],
                            "type": "CommerceOfferOrder",
                            "abstractKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "paymentMethod",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "source",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "paymentMethodDetails",
                            "plural": false,
                            "selections": [
                              (v8/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v47/*: any*/),
                                "type": "CreditCard",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "last4",
                                    "storageKey": null
                                  },
                                  (v3/*: any*/)
                                ],
                                "type": "BankAccount",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isManualPayment",
                                    "storageKey": null
                                  }
                                ],
                                "type": "WireTransfer",
                                "abstractKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CreditCard",
                            "kind": "LinkedField",
                            "name": "creditCard",
                            "plural": false,
                            "selections": (v47/*: any*/),
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
                "storageKey": "orderConnection(first:10,states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"PROCESSING_APPROVAL\"])"
              },
              {
                "alias": "attachmentsConnection",
                "args": (v26/*: any*/),
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
                          (v27/*: any*/),
                          (v3/*: any*/),
                          (v8/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      (v15/*: any*/),
                      (v16/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "messagesConnection(first:30,sort:\"DESC\")"
              },
              {
                "alias": "attachmentsConnection",
                "args": (v26/*: any*/),
                "filters": [],
                "handle": "connection",
                "key": "Details_attachmentsConnection",
                "kind": "LinkedHandle",
                "name": "messagesConnection"
              }
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
    "cacheID": "145b96928effedc53f7118873a283688",
    "id": null,
    "metadata": {},
    "name": "ConversationPageQuery",
    "operationKind": "query",
    "text": "query ConversationPageQuery(\n  $conversationID: String!\n) {\n  me {\n    ...Conversation_me_3oGfhn\n    id\n  }\n}\n\nfragment ConfirmArtworkButton_artwork on Artwork {\n  internalID\n}\n\nfragment ConversationCTA_conversation on Conversation {\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        __typename\n        isOfferableFromInquiry\n        is_acquireable: isAcquireable\n        is_offerable: isOfferable\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  activeOrders: orderConnection(first: 10, states: [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]) {\n    edges {\n      node {\n        __typename\n        internalID\n        state\n        stateReason\n        stateExpiresAt\n        ... on CommerceOfferOrder {\n          buyerAction\n          offers(first: 5) {\n            edges {\n              node {\n                internalID\n                id\n              }\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n  ...PurchaseOnInquiryButton_conversation\n  ...MakeOfferOnInquiryButton_conversation\n}\n\nfragment ConversationList_me on Me {\n  conversationsConnection(first: 25) {\n    edges {\n      cursor\n      node {\n        id\n        internalID\n        lastMessage\n        ...ConversationSnippet_conversation\n        __typename\n      }\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n      hasPreviousPage\n      startCursor\n    }\n  }\n}\n\nfragment ConversationMessages_events on CommerceOrderConnectionWithTotalCount {\n  edges {\n    node {\n      __typename\n      orderHistory {\n        ...OrderUpdate_event\n        __typename\n        ... on CommerceOrderStateChangedEvent {\n          state\n          stateReason\n          createdAt\n        }\n        ... on CommerceOfferSubmittedEvent {\n          createdAt\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment ConversationMessages_messages on MessageConnection {\n  edges {\n    node {\n      __typename\n      id\n      internalID\n      createdAt\n      isFromUser\n      body\n      ...Message_message\n    }\n  }\n}\n\nfragment ConversationSnippet_conversation on Conversation {\n  internalID\n  to {\n    name\n    id\n  }\n  lastMessage\n  lastMessageAt\n  unread\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        date\n        title\n        artistNames\n        image {\n          url\n        }\n      }\n      ... on Show {\n        fair {\n          name\n          id\n        }\n        name\n        coverImage {\n          url\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n\nfragment Conversation_conversation on Conversation {\n  id\n  internalID\n  from {\n    email\n    id\n  }\n  to {\n    name\n    initials\n    id\n  }\n  initialMessage\n  lastMessageID\n  fromLastViewedMessageID\n  isLastMessageToUser\n  unread\n  orderConnection(first: 10, states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED, CANCELED, PROCESSING_APPROVAL], participantType: BUYER) {\n    edges {\n      node {\n        __typename\n        internalID\n        updatedAt\n        ... on CommerceOfferOrder {\n          buyerAction\n        }\n        id\n      }\n    }\n    ...ConversationMessages_events\n  }\n  messagesConnection(first: 30, sort: DESC) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasPreviousPage\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        __typename\n      }\n      cursor\n    }\n    totalCount\n    ...ConversationMessages_messages\n  }\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        id\n        isOfferable\n        isOfferableFromInquiry\n        internalID\n      }\n      ...Item_item\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        isOfferable\n        isOfferableFromInquiry\n        isAcquireable\n        internalID\n        __typename\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  ...ConversationCTA_conversation\n}\n\nfragment Conversation_me_3oGfhn on Me {\n  ...ConversationList_me\n  conversation(id: $conversationID) {\n    internalID\n    ...Conversation_conversation\n    ...ConversationCTA_conversation\n    ...DetailsSidebar_conversation\n    id\n  }\n}\n\nfragment DetailsSidebar_conversation on Conversation {\n  to {\n    name\n    initials\n    id\n  }\n  sidebarOrderConnection: orderConnection(first: 10, states: [APPROVED, FULFILLED, SUBMITTED, PROCESSING_APPROVAL]) {\n    edges {\n      node {\n        __typename\n        internalID\n        state\n        displayState\n        mode\n        stateReason\n        code\n        stateExpiresAt(format: \"MMM D\")\n        ...TransactionDetailsSummaryItem_order\n        ...ShippingSummaryItem_order\n        ...PaymentMethodSummaryItem_order\n        creditCard {\n          brand\n          lastDigits\n          expirationYear\n          expirationMonth\n          id\n        }\n        requestedFulfillment {\n          __typename\n        }\n        ... on CommerceOfferOrder {\n          buyerAction\n        }\n        lineItems {\n          edges {\n            node {\n              artwork {\n                shippingOrigin\n                id\n              }\n              shipment {\n                trackingNumber\n                trackingUrl\n                carrierName\n                estimatedDeliveryWindow\n                id\n              }\n              selectedShippingQuote {\n                typeName\n                id\n              }\n              fulfillments {\n                edges {\n                  node {\n                    courier\n                    trackingId\n                    estimatedDelivery(format: \"MMM Do, YYYY\")\n                    id\n                  }\n                }\n              }\n              id\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n  attachmentsConnection: messagesConnection(first: 30, sort: DESC) {\n    edges {\n      node {\n        attachments {\n          id\n          contentType\n          fileName\n          downloadURL\n        }\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        href\n        ...Metadata_artwork\n        image {\n          thumbnailUrl: url(version: \"small\")\n        }\n      }\n      ... on Show {\n        href\n        image: coverImage {\n          thumbnailUrl: url(version: \"small\")\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  href\n  title\n  date\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...NewSaveButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Item_item on ConversationItemType {\n  __isConversationItemType: __typename\n  __typename\n  ... on Artwork {\n    internalID\n    id\n    date\n    title\n    artistNames\n    href\n    isOfferableFromInquiry\n    image {\n      url(version: [\"large\"])\n    }\n    listPrice {\n      __typename\n      ... on Money {\n        display\n      }\n      ... on PriceRange {\n        display\n      }\n    }\n  }\n  ... on Show {\n    id\n    fair {\n      name\n      exhibitionPeriod\n      location {\n        city\n        id\n      }\n      id\n    }\n    href\n    name\n    coverImage {\n      url\n    }\n  }\n}\n\nfragment MakeOfferOnInquiryButton_conversation on Conversation {\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        __typename\n        is_acquireable: isAcquireable\n        isEdition\n        editionSets {\n          internalID\n          id\n        }\n        ...ConfirmArtworkButton_artwork\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n\nfragment Message_message on Message {\n  __typename\n  internalID\n  body\n  createdAt\n  isFromUser\n  from {\n    name\n    email\n  }\n  attachments {\n    id\n    contentType\n    fileName\n    downloadURL\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment NewSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n\nfragment OrderUpdate_event on CommerceOrderEventUnion {\n  __isCommerceOrderEventUnion: __typename\n  __typename\n  ... on CommerceOrderStateChangedEvent {\n    createdAt\n    orderUpdateState\n    state\n    stateReason\n  }\n  ... on CommerceOfferSubmittedEvent {\n    createdAt\n    offer {\n      amount\n      fromParticipant\n      definesTotal\n      offerAmountChanged\n      respondsTo {\n        fromParticipant\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment PaymentMethodSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  source\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      brand\n      lastDigits\n      expirationYear\n      expirationMonth\n      id\n    }\n    ... on BankAccount {\n      last4\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n}\n\nfragment PurchaseOnInquiryButton_conversation on Conversation {\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        __typename\n        isEdition\n        internalID\n        slug\n        editionSets {\n          internalID\n          id\n        }\n        ...ConfirmArtworkButton_artwork\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n\nfragment ShippingAddress_ship on CommerceRequestedFulfillmentUnion {\n  __isCommerceRequestedFulfillmentUnion: __typename\n  ... on CommerceShip {\n    name\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    phoneNumber\n  }\n  ... on CommerceShipArta {\n    name\n    addressLine1\n    addressLine2\n    city\n    postalCode\n    region\n    country\n    phoneNumber\n  }\n}\n\nfragment ShippingSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  state\n  paymentMethod\n  requestedFulfillment {\n    __typename\n    ...ShippingAddress_ship\n  }\n  lineItems {\n    edges {\n      node {\n        artwork {\n          shippingOrigin\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment TransactionDetailsSummaryItem_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  __typename\n  requestedFulfillment {\n    __typename\n  }\n  code\n  lineItems {\n    edges {\n      node {\n        artworkOrEditionSet {\n          __typename\n          ... on Artwork {\n            price\n          }\n          ... on EditionSet {\n            price\n            id\n          }\n          ... on Node {\n            __isNode: __typename\n            id\n          }\n        }\n        selectedShippingQuote {\n          typeName\n          id\n        }\n        id\n      }\n    }\n  }\n  mode\n  shippingTotal(precision: 2)\n  shippingTotalCents\n  taxTotal(precision: 2)\n  taxTotalCents\n  itemsTotal(precision: 2)\n  buyerTotal(precision: 2)\n  currencyCode\n  ... on CommerceOfferOrder {\n    lastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n    myLastOffer {\n      internalID\n      amount(precision: 2)\n      amountCents\n      shippingTotal(precision: 2)\n      shippingTotalCents\n      taxTotal(precision: 2)\n      taxTotalCents\n      buyerTotal(precision: 2)\n      buyerTotalCents\n      fromParticipant\n      note\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b83b50f78717fb2472f26bd88ae34b54";

export default node;
