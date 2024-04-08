/**
 * @generated SignedSource<<d9eccab5d020ca4151d37f4dfdbae9b3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationDetailsTestQuery$variables = Record<PropertyKey, never>;
export type ConversationDetailsTestQuery$data = {
  readonly conversation: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationDetails_conversation">;
  } | null | undefined;
};
export type ConversationDetailsTestQuery = {
  response: ConversationDetailsTestQuery$data;
  variables: ConversationDetailsTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "conversation-id"
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
v3 = [
  (v2/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v5 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v7 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v8 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationDetailsTestQuery",
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
            "name": "ConversationDetails_conversation"
          }
        ],
        "storageKey": "conversation(id:\"conversation-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ConversationDetailsTestQuery",
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
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              {
                "kind": "Literal",
                "name": "states",
                "value": [
                  "APPROVED",
                  "FULFILLED",
                  "SUBMITTED",
                  "PROCESSING_APPROVAL",
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
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isCommerceOrder"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "code",
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
                        "name": "mode",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "stateReason",
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
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "from",
                                "plural": false,
                                "selections": [
                                  (v1/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "offerAmountChanged",
                                "storageKey": null
                              },
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "precision",
                                    "value": 2
                                  }
                                ],
                                "kind": "ScalarField",
                                "name": "amount",
                                "storageKey": "amount(precision:2)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "CommerceOfferOrder",
                        "abstractKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "stateExpiresAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "stateUpdatedAt",
                        "storageKey": null
                      },
                      {
                        "alias": "formattedStateExpiresAt",
                        "args": [
                          {
                            "kind": "Literal",
                            "name": "format",
                            "value": "MMM D, h:mm A zz"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "stateExpiresAt",
                        "storageKey": "stateExpiresAt(format:\"MMM D, h:mm A zz\")"
                      },
                      (v2/*: any*/),
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
                                    "concreteType": "Artwork",
                                    "kind": "LinkedField",
                                    "name": "artwork",
                                    "plural": false,
                                    "selections": (v3/*: any*/),
                                    "storageKey": null
                                  },
                                  (v2/*: any*/)
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
            "storageKey": "orderConnection(first:1,states:[\"APPROVED\",\"FULFILLED\",\"SUBMITTED\",\"PROCESSING_APPROVAL\",\"REFUNDED\",\"CANCELED\"])"
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
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      (v4/*: any*/),
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
                        "name": "isUnlisted",
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
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          },
                          (v4/*: any*/),
                          (v2/*: any*/)
                        ],
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
                    "type": "Artwork",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v3/*: any*/),
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
            "alias": "attachmentsConnection",
            "args": [
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
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "messagesConnection(first:30,sort:\"DESC\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": "conversation(id:\"conversation-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "4bd70750c3361002766a407313121c06",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "conversation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "conversation.attachmentsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MessageConnection"
        },
        "conversation.attachmentsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MessageEdge"
        },
        "conversation.attachmentsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Message"
        },
        "conversation.attachmentsConnection.edges.node.attachments": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Attachment"
        },
        "conversation.attachmentsConnection.edges.node.attachments.contentType": (v5/*: any*/),
        "conversation.attachmentsConnection.edges.node.attachments.downloadURL": (v5/*: any*/),
        "conversation.attachmentsConnection.edges.node.attachments.fileName": (v5/*: any*/),
        "conversation.attachmentsConnection.edges.node.attachments.id": (v6/*: any*/),
        "conversation.attachmentsConnection.edges.node.id": (v6/*: any*/),
        "conversation.id": (v6/*: any*/),
        "conversation.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ConversationItem"
        },
        "conversation.items.item": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ConversationItemType"
        },
        "conversation.items.item.__isNode": (v5/*: any*/),
        "conversation.items.item.__typename": (v5/*: any*/),
        "conversation.items.item.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "conversation.items.item.artist.id": (v6/*: any*/),
        "conversation.items.item.artist.name": (v7/*: any*/),
        "conversation.items.item.artist.slug": (v6/*: any*/),
        "conversation.items.item.date": (v7/*: any*/),
        "conversation.items.item.id": (v6/*: any*/),
        "conversation.items.item.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "conversation.items.item.image.url": (v7/*: any*/),
        "conversation.items.item.isUnlisted": (v8/*: any*/),
        "conversation.items.item.slug": (v6/*: any*/),
        "conversation.items.item.title": (v7/*: any*/),
        "conversation.orderConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderConnectionWithTotalCount"
        },
        "conversation.orderConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceOrderEdge"
        },
        "conversation.orderConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "conversation.orderConnection.edges.node.__isCommerceOrder": (v5/*: any*/),
        "conversation.orderConnection.edges.node.__typename": (v5/*: any*/),
        "conversation.orderConnection.edges.node.code": (v5/*: any*/),
        "conversation.orderConnection.edges.node.formattedStateExpiresAt": (v7/*: any*/),
        "conversation.orderConnection.edges.node.id": (v6/*: any*/),
        "conversation.orderConnection.edges.node.lastOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOffer"
        },
        "conversation.orderConnection.edges.node.lastOffer.amount": (v7/*: any*/),
        "conversation.orderConnection.edges.node.lastOffer.from": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "CommerceOrderPartyUnion"
        },
        "conversation.orderConnection.edges.node.lastOffer.from.__typename": (v5/*: any*/),
        "conversation.orderConnection.edges.node.lastOffer.id": (v6/*: any*/),
        "conversation.orderConnection.edges.node.lastOffer.offerAmountChanged": (v8/*: any*/),
        "conversation.orderConnection.edges.node.lineItems": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItemConnection"
        },
        "conversation.orderConnection.edges.node.lineItems.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceLineItemEdge"
        },
        "conversation.orderConnection.edges.node.lineItems.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceLineItem"
        },
        "conversation.orderConnection.edges.node.lineItems.edges.node.artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "conversation.orderConnection.edges.node.lineItems.edges.node.artwork.id": (v6/*: any*/),
        "conversation.orderConnection.edges.node.lineItems.edges.node.id": (v6/*: any*/),
        "conversation.orderConnection.edges.node.mode": {
          "enumValues": [
            "BUY",
            "OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderModeEnum"
        },
        "conversation.orderConnection.edges.node.state": {
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
        "conversation.orderConnection.edges.node.stateExpiresAt": (v7/*: any*/),
        "conversation.orderConnection.edges.node.stateReason": (v7/*: any*/),
        "conversation.orderConnection.edges.node.stateUpdatedAt": (v7/*: any*/)
      }
    },
    "name": "ConversationDetailsTestQuery",
    "operationKind": "query",
    "text": "query ConversationDetailsTestQuery {\n  conversation(id: \"conversation-id\") {\n    ...ConversationDetails_conversation\n    id\n  }\n}\n\nfragment ConversationArtwork_conversation on Conversation {\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        id\n        slug\n        date\n        title\n        isUnlisted\n        artist {\n          name\n          slug\n          id\n        }\n        image {\n          url\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationAttachments_conversation on Conversation {\n  attachmentsConnection: messagesConnection(first: 30, sort: DESC) {\n    edges {\n      node {\n        attachments {\n          id\n          contentType\n          fileName\n          downloadURL\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationDetails_conversation on Conversation {\n  orderConnection(first: 1, states: [APPROVED, FULFILLED, SUBMITTED, PROCESSING_APPROVAL, REFUNDED, CANCELED]) {\n    edges {\n      node {\n        __typename\n        ...ConversationOrderInformation_order\n        id\n      }\n    }\n  }\n  ...ConversationArtwork_conversation\n  ...ConversationAttachments_conversation\n}\n\nfragment ConversationOrderInformation_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  code\n  state\n  ...ConversationOrderState_state\n  ...ReviewOrderButton_order\n  ... on CommerceOfferOrder {\n    lastOffer {\n      amount(precision: 2)\n      id\n    }\n  }\n}\n\nfragment ConversationOrderState_state on CommerceOrder {\n  __isCommerceOrder: __typename\n  state\n  mode\n  stateReason\n  ... on CommerceOfferOrder {\n    lastOffer {\n      from {\n        __typename\n      }\n      offerAmountChanged\n      id\n    }\n  }\n  ...ConversationStatusWithCounter_order\n}\n\nfragment ConversationStatusWithCounter_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  stateExpiresAt\n  stateUpdatedAt\n  formattedStateExpiresAt: stateExpiresAt(format: \"MMM D, h:mm A zz\")\n}\n\nfragment ReviewOrderButton_order on CommerceOrder {\n  __isCommerceOrder: __typename\n  id\n  state\n  mode\n  lineItems {\n    edges {\n      node {\n        artwork {\n          id\n        }\n        id\n      }\n    }\n  }\n  ... on CommerceOfferOrder {\n    lastOffer {\n      from {\n        __typename\n      }\n      offerAmountChanged\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ac0c329f77c26863f96e49f8518a736d";

export default node;
