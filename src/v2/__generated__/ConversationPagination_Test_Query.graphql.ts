/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ConversationPagination_Test_QueryVariables = {};
export type ConversationPagination_Test_QueryResponse = {
    readonly node: {
        readonly " $fragmentRefs": FragmentRefs<"Conversation_conversation">;
    } | null;
};
export type ConversationPagination_Test_Query = {
    readonly response: ConversationPagination_Test_QueryResponse;
    readonly variables: ConversationPagination_Test_QueryVariables;
};



/*
query ConversationPagination_Test_Query {
  node(id: "example") {
    __typename
    ...Conversation_conversation
    id
  }
}

fragment ConversationCTA_conversation on Conversation {
  internalID
  items {
    liveArtwork {
      __typename
      ... on Artwork {
        __typename
        isOfferableFromInquiry
      }
      ... on Node {
        __isNode: __typename
        id
      }
    }
    item {
      __typename
      ... on Artwork {
        internalID
      }
      ... on Node {
        __isNode: __typename
        id
      }
    }
  }
  activeOrders: orderConnection(first: 10, states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED]) {
    edges {
      node {
        __typename
        internalID
        state
        stateReason
        stateExpiresAt
        ... on CommerceOfferOrder {
          buyerAction
          offers(first: 5) {
            edges {
              node {
                internalID
                id
              }
            }
          }
        }
        id
      }
    }
  }
  ...OpenInquiryModalCTA_conversation
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

fragment Conversation_conversation on Conversation {
  id
  internalID
  from {
    name
    email
    id
  }
  to {
    name
    initials
    id
  }
  initialMessage
  lastMessageID
  fromLastViewedMessageID
  isLastMessageToUser
  unread
  orderConnection(first: 10, states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED, CANCELED], participantType: BUYER) {
    edges {
      node {
        __typename
        internalID
        updatedAt
        ... on CommerceOfferOrder {
          buyerAction
        }
        id
      }
    }
    ...ConversationMessages_events
  }
  messagesConnection(first: 30, sort: DESC) {
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
    }
    edges {
      node {
        id
        __typename
      }
      cursor
    }
    totalCount
    ...ConversationMessages_messages
  }
  items {
    item {
      __typename
      ... on Artwork {
        id
        isOfferable
        isOfferableFromInquiry
        internalID
      }
      ...Item_item
      ... on Node {
        __isNode: __typename
        id
      }
    }
    liveArtwork {
      __typename
      ... on Artwork {
        isOfferable
        isOfferableFromInquiry
        internalID
        __typename
      }
      ... on Node {
        __isNode: __typename
        id
      }
    }
  }
  ...ConversationCTA_conversation
}

fragment Item_item on ConversationItemType {
  __isConversationItemType: __typename
  __typename
  ... on Artwork {
    internalID
    id
    date
    title
    artistNames
    href
    isOfferableFromInquiry
    image {
      url(version: ["large"])
    }
    listPrice {
      __typename
      ... on Money {
        display
      }
      ... on PriceRange {
        display
      }
    }
  }
  ... on Show {
    id
    fair {
      name
      exhibitionPeriod
      location {
        city
        id
      }
      id
    }
    href
    name
    coverImage {
      url
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

fragment OpenInquiryModalCTA_conversation on Conversation {
  internalID
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
    "value": "example"
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "email",
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "first",
  "value": 10
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
  "name": "stateReason",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "fromParticipant",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerAction",
  "storageKey": null
},
v12 = [
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
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferableFromInquiry",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v16 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v17 = {
  "kind": "InlineFragment",
  "selections": [
    (v2/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOrderConnectionWithTotalCount"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "CommerceOrderEdge"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOrder"
},
v22 = {
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
v23 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOffer"
},
v25 = {
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
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ConversationItemType"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v30 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v31 = {
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
    "name": "ConversationPagination_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "Conversation_conversation"
          }
        ],
        "storageKey": "node(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConversationPagination_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "ConversationInitiator",
                "kind": "LinkedField",
                "name": "from",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v2/*: any*/)
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
                  (v4/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "initials",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "unread",
                "storageKey": null
              },
              {
                "alias": null,
                "args": [
                  (v6/*: any*/),
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
                      "CANCELED"
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
                          (v1/*: any*/),
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "updatedAt",
                            "storageKey": null
                          },
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
                              (v1/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v7/*: any*/),
                                  (v8/*: any*/),
                                  (v9/*: any*/)
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
                                          (v2/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v2/*: any*/)
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
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v11/*: any*/)
                            ],
                            "type": "CommerceOfferOrder",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "orderConnection(first:10,participantType:\"BUYER\",states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\",\"CANCELED\"])"
              },
              {
                "alias": null,
                "args": (v12/*: any*/),
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
                        "name": "startCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
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
                        "name": "hasNextPage",
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
                          (v2/*: any*/),
                          (v1/*: any*/),
                          (v3/*: any*/),
                          (v7/*: any*/),
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
                              (v4/*: any*/),
                              (v5/*: any*/)
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
                              (v2/*: any*/),
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
                "args": (v12/*: any*/),
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
                      (v1/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isConversationItemType"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v3/*: any*/),
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
                          (v15/*: any*/),
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
                              (v1/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": (v16/*: any*/),
                                "type": "Money",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": (v16/*: any*/),
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
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Fair",
                            "kind": "LinkedField",
                            "name": "fair",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
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
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "city",
                                    "storageKey": null
                                  },
                                  (v2/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v15/*: any*/),
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "coverImage",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "url",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "Show",
                        "abstractKey": null
                      },
                      (v17/*: any*/)
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
                      (v1/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v3/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      (v17/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": "activeOrders",
                "args": [
                  (v6/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "states",
                    "value": [
                      "APPROVED",
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
                          (v1/*: any*/),
                          (v3/*: any*/),
                          (v9/*: any*/),
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "stateExpiresAt",
                            "storageKey": null
                          },
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v11/*: any*/),
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
                                        "selections": [
                                          (v3/*: any*/),
                                          (v2/*: any*/)
                                        ],
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
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "orderConnection(first:10,states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\"])"
              }
            ],
            "type": "Conversation",
            "abstractKey": null
          }
        ],
        "storageKey": "node(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "d05ae06816b63542bec324ade0e342ec",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Node"
        },
        "node.__typename": (v18/*: any*/),
        "node.activeOrders": (v19/*: any*/),
        "node.activeOrders.edges": (v20/*: any*/),
        "node.activeOrders.edges.node": (v21/*: any*/),
        "node.activeOrders.edges.node.__typename": (v18/*: any*/),
        "node.activeOrders.edges.node.buyerAction": (v22/*: any*/),
        "node.activeOrders.edges.node.id": (v23/*: any*/),
        "node.activeOrders.edges.node.internalID": (v23/*: any*/),
        "node.activeOrders.edges.node.offers": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOfferConnection"
        },
        "node.activeOrders.edges.node.offers.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceOfferEdge"
        },
        "node.activeOrders.edges.node.offers.edges.node": (v24/*: any*/),
        "node.activeOrders.edges.node.offers.edges.node.id": (v23/*: any*/),
        "node.activeOrders.edges.node.offers.edges.node.internalID": (v23/*: any*/),
        "node.activeOrders.edges.node.state": (v25/*: any*/),
        "node.activeOrders.edges.node.stateExpiresAt": (v26/*: any*/),
        "node.activeOrders.edges.node.stateReason": (v26/*: any*/),
        "node.from": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ConversationInitiator"
        },
        "node.from.email": (v18/*: any*/),
        "node.from.id": (v23/*: any*/),
        "node.from.name": (v18/*: any*/),
        "node.fromLastViewedMessageID": (v26/*: any*/),
        "node.id": (v23/*: any*/),
        "node.initialMessage": (v18/*: any*/),
        "node.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "node.isLastMessageToUser": (v27/*: any*/),
        "node.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ConversationItem"
        },
        "node.items.item": (v28/*: any*/),
        "node.items.item.__isConversationItemType": (v18/*: any*/),
        "node.items.item.__isNode": (v18/*: any*/),
        "node.items.item.__typename": (v18/*: any*/),
        "node.items.item.artistNames": (v26/*: any*/),
        "node.items.item.coverImage": (v29/*: any*/),
        "node.items.item.coverImage.url": (v26/*: any*/),
        "node.items.item.date": (v26/*: any*/),
        "node.items.item.fair": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Fair"
        },
        "node.items.item.fair.exhibitionPeriod": (v26/*: any*/),
        "node.items.item.fair.id": (v23/*: any*/),
        "node.items.item.fair.location": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Location"
        },
        "node.items.item.fair.location.city": (v26/*: any*/),
        "node.items.item.fair.location.id": (v23/*: any*/),
        "node.items.item.fair.name": (v26/*: any*/),
        "node.items.item.href": (v26/*: any*/),
        "node.items.item.id": (v23/*: any*/),
        "node.items.item.image": (v29/*: any*/),
        "node.items.item.image.url": (v26/*: any*/),
        "node.items.item.internalID": (v23/*: any*/),
        "node.items.item.isOfferable": (v27/*: any*/),
        "node.items.item.isOfferableFromInquiry": (v27/*: any*/),
        "node.items.item.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "node.items.item.listPrice.__typename": (v18/*: any*/),
        "node.items.item.listPrice.display": (v26/*: any*/),
        "node.items.item.name": (v26/*: any*/),
        "node.items.item.title": (v26/*: any*/),
        "node.items.liveArtwork": (v28/*: any*/),
        "node.items.liveArtwork.__isNode": (v18/*: any*/),
        "node.items.liveArtwork.__typename": (v18/*: any*/),
        "node.items.liveArtwork.id": (v23/*: any*/),
        "node.items.liveArtwork.internalID": (v23/*: any*/),
        "node.items.liveArtwork.isOfferable": (v27/*: any*/),
        "node.items.liveArtwork.isOfferableFromInquiry": (v27/*: any*/),
        "node.lastMessageID": (v26/*: any*/),
        "node.messagesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MessageConnection"
        },
        "node.messagesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MessageEdge"
        },
        "node.messagesConnection.edges.cursor": (v18/*: any*/),
        "node.messagesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Message"
        },
        "node.messagesConnection.edges.node.__typename": (v18/*: any*/),
        "node.messagesConnection.edges.node.attachments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Attachment"
        },
        "node.messagesConnection.edges.node.attachments.contentType": (v18/*: any*/),
        "node.messagesConnection.edges.node.attachments.downloadURL": (v18/*: any*/),
        "node.messagesConnection.edges.node.attachments.fileName": (v18/*: any*/),
        "node.messagesConnection.edges.node.attachments.id": (v23/*: any*/),
        "node.messagesConnection.edges.node.body": (v26/*: any*/),
        "node.messagesConnection.edges.node.createdAt": (v26/*: any*/),
        "node.messagesConnection.edges.node.from": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MessageInitiator"
        },
        "node.messagesConnection.edges.node.from.email": (v26/*: any*/),
        "node.messagesConnection.edges.node.from.name": (v26/*: any*/),
        "node.messagesConnection.edges.node.id": (v23/*: any*/),
        "node.messagesConnection.edges.node.internalID": (v23/*: any*/),
        "node.messagesConnection.edges.node.isFromUser": (v27/*: any*/),
        "node.messagesConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "node.messagesConnection.pageInfo.endCursor": (v26/*: any*/),
        "node.messagesConnection.pageInfo.hasNextPage": (v30/*: any*/),
        "node.messagesConnection.pageInfo.hasPreviousPage": (v30/*: any*/),
        "node.messagesConnection.pageInfo.startCursor": (v26/*: any*/),
        "node.messagesConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "node.orderConnection": (v19/*: any*/),
        "node.orderConnection.edges": (v20/*: any*/),
        "node.orderConnection.edges.node": (v21/*: any*/),
        "node.orderConnection.edges.node.__typename": (v18/*: any*/),
        "node.orderConnection.edges.node.buyerAction": (v22/*: any*/),
        "node.orderConnection.edges.node.id": (v23/*: any*/),
        "node.orderConnection.edges.node.internalID": (v23/*: any*/),
        "node.orderConnection.edges.node.orderHistory": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "CommerceOrderEventUnion"
        },
        "node.orderConnection.edges.node.orderHistory.__isCommerceOrderEventUnion": (v18/*: any*/),
        "node.orderConnection.edges.node.orderHistory.__typename": (v18/*: any*/),
        "node.orderConnection.edges.node.orderHistory.createdAt": (v18/*: any*/),
        "node.orderConnection.edges.node.orderHistory.offer": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CommerceOffer"
        },
        "node.orderConnection.edges.node.orderHistory.offer.amount": (v26/*: any*/),
        "node.orderConnection.edges.node.orderHistory.offer.definesTotal": (v30/*: any*/),
        "node.orderConnection.edges.node.orderHistory.offer.fromParticipant": (v31/*: any*/),
        "node.orderConnection.edges.node.orderHistory.offer.id": (v23/*: any*/),
        "node.orderConnection.edges.node.orderHistory.offer.offerAmountChanged": (v30/*: any*/),
        "node.orderConnection.edges.node.orderHistory.offer.respondsTo": (v24/*: any*/),
        "node.orderConnection.edges.node.orderHistory.offer.respondsTo.fromParticipant": (v31/*: any*/),
        "node.orderConnection.edges.node.orderHistory.offer.respondsTo.id": (v23/*: any*/),
        "node.orderConnection.edges.node.orderHistory.state": (v25/*: any*/),
        "node.orderConnection.edges.node.orderHistory.stateReason": (v26/*: any*/),
        "node.orderConnection.edges.node.updatedAt": (v18/*: any*/),
        "node.to": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ConversationResponder"
        },
        "node.to.id": (v23/*: any*/),
        "node.to.initials": (v26/*: any*/),
        "node.to.name": (v18/*: any*/),
        "node.unread": (v27/*: any*/)
      }
    },
    "name": "ConversationPagination_Test_Query",
    "operationKind": "query",
    "text": "query ConversationPagination_Test_Query {\n  node(id: \"example\") {\n    __typename\n    ...Conversation_conversation\n    id\n  }\n}\n\nfragment ConversationCTA_conversation on Conversation {\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        __typename\n        isOfferableFromInquiry\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  activeOrders: orderConnection(first: 10, states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED]) {\n    edges {\n      node {\n        __typename\n        internalID\n        state\n        stateReason\n        stateExpiresAt\n        ... on CommerceOfferOrder {\n          buyerAction\n          offers(first: 5) {\n            edges {\n              node {\n                internalID\n                id\n              }\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n  ...OpenInquiryModalCTA_conversation\n}\n\nfragment ConversationMessages_events on CommerceOrderConnectionWithTotalCount {\n  edges {\n    node {\n      __typename\n      orderHistory {\n        ...OrderUpdate_event\n        __typename\n        ... on CommerceOrderStateChangedEvent {\n          state\n          stateReason\n          createdAt\n        }\n        ... on CommerceOfferSubmittedEvent {\n          createdAt\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment ConversationMessages_messages on MessageConnection {\n  edges {\n    node {\n      __typename\n      id\n      internalID\n      createdAt\n      isFromUser\n      body\n      ...Message_message\n    }\n  }\n}\n\nfragment Conversation_conversation on Conversation {\n  id\n  internalID\n  from {\n    name\n    email\n    id\n  }\n  to {\n    name\n    initials\n    id\n  }\n  initialMessage\n  lastMessageID\n  fromLastViewedMessageID\n  isLastMessageToUser\n  unread\n  orderConnection(first: 10, states: [APPROVED, FULFILLED, SUBMITTED, REFUNDED, CANCELED], participantType: BUYER) {\n    edges {\n      node {\n        __typename\n        internalID\n        updatedAt\n        ... on CommerceOfferOrder {\n          buyerAction\n        }\n        id\n      }\n    }\n    ...ConversationMessages_events\n  }\n  messagesConnection(first: 30, sort: DESC) {\n    pageInfo {\n      startCursor\n      endCursor\n      hasPreviousPage\n      hasNextPage\n    }\n    edges {\n      node {\n        id\n        __typename\n      }\n      cursor\n    }\n    totalCount\n    ...ConversationMessages_messages\n  }\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        id\n        isOfferable\n        isOfferableFromInquiry\n        internalID\n      }\n      ...Item_item\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        isOfferable\n        isOfferableFromInquiry\n        internalID\n        __typename\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  ...ConversationCTA_conversation\n}\n\nfragment Item_item on ConversationItemType {\n  __isConversationItemType: __typename\n  __typename\n  ... on Artwork {\n    internalID\n    id\n    date\n    title\n    artistNames\n    href\n    isOfferableFromInquiry\n    image {\n      url(version: [\"large\"])\n    }\n    listPrice {\n      __typename\n      ... on Money {\n        display\n      }\n      ... on PriceRange {\n        display\n      }\n    }\n  }\n  ... on Show {\n    id\n    fair {\n      name\n      exhibitionPeriod\n      location {\n        city\n        id\n      }\n      id\n    }\n    href\n    name\n    coverImage {\n      url\n    }\n  }\n}\n\nfragment Message_message on Message {\n  __typename\n  internalID\n  body\n  createdAt\n  isFromUser\n  from {\n    name\n    email\n  }\n  attachments {\n    id\n    contentType\n    fileName\n    downloadURL\n  }\n}\n\nfragment OpenInquiryModalCTA_conversation on Conversation {\n  internalID\n}\n\nfragment OrderUpdate_event on CommerceOrderEventUnion {\n  __isCommerceOrderEventUnion: __typename\n  __typename\n  ... on CommerceOrderStateChangedEvent {\n    createdAt\n    stateReason\n    state\n  }\n  ... on CommerceOfferSubmittedEvent {\n    createdAt\n    offer {\n      amount\n      fromParticipant\n      definesTotal\n      offerAmountChanged\n      respondsTo {\n        fromParticipant\n        id\n      }\n      id\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4e5638c75ef0bcbb604a5a2844a6a652';
export default node;
