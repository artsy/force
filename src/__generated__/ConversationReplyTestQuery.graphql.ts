/**
 * @generated SignedSource<<5caf80f6142a75edebfa327fd710b8e3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationReplyTestQuery$variables = {};
export type ConversationReplyTestQuery$data = {
  readonly conversation: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationReply_conversation">;
  } | null;
};
export type ConversationReplyTestQuery = {
  response: ConversationReplyTestQuery$data;
  variables: ConversationReplyTestQuery$variables;
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
  "name": "internalID",
  "storageKey": null
},
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
v4 = [
  (v1/*: any*/),
  (v3/*: any*/)
],
v5 = {
  "kind": "InlineFragment",
  "selections": [
    (v3/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v7 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v8 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v9 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ConversationItemType"
},
v10 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationReplyTestQuery",
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
            "name": "ConversationReply_conversation"
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
    "name": "ConversationReplyTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Conversation",
        "kind": "LinkedField",
        "name": "conversation",
        "plural": false,
        "selections": [
          (v1/*: any*/),
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
                "name": "liveArtwork",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isAcquireable",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isEdition",
                        "storageKey": null
                      },
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "EditionSet",
                        "kind": "LinkedField",
                        "name": "editionSets",
                        "plural": true,
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isOfferableFromInquiry",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isOfferable",
                        "storageKey": null
                      }
                    ],
                    "type": "Artwork",
                    "abstractKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "item",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": (v4/*: any*/),
                    "type": "Artwork",
                    "abstractKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "activeOrders",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
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
                      (v2/*: any*/),
                      (v1/*: any*/),
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
                      },
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "buyerAction",
                            "storageKey": null
                          },
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
                                    "selections": (v4/*: any*/),
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
            "alias": null,
            "args": null,
            "concreteType": "ConversationInitiator",
            "kind": "LinkedField",
            "name": "from",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "email",
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
            "name": "inquiryID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "lastMessageID",
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": "conversation(id:\"conversation-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "0937d57e6c46614b3643f580af818d15",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "conversation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "conversation.activeOrders": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderConnectionWithTotalCount"
        },
        "conversation.activeOrders.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceOrderEdge"
        },
        "conversation.activeOrders.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "conversation.activeOrders.edges.node.__typename": (v6/*: any*/),
        "conversation.activeOrders.edges.node.buyerAction": {
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
        "conversation.activeOrders.edges.node.id": (v7/*: any*/),
        "conversation.activeOrders.edges.node.internalID": (v7/*: any*/),
        "conversation.activeOrders.edges.node.offers": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOfferConnection"
        },
        "conversation.activeOrders.edges.node.offers.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceOfferEdge"
        },
        "conversation.activeOrders.edges.node.offers.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOffer"
        },
        "conversation.activeOrders.edges.node.offers.edges.node.id": (v7/*: any*/),
        "conversation.activeOrders.edges.node.offers.edges.node.internalID": (v7/*: any*/),
        "conversation.activeOrders.edges.node.state": {
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
        "conversation.activeOrders.edges.node.stateExpiresAt": (v8/*: any*/),
        "conversation.activeOrders.edges.node.stateReason": (v8/*: any*/),
        "conversation.from": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ConversationInitiator"
        },
        "conversation.from.email": (v6/*: any*/),
        "conversation.from.id": (v7/*: any*/),
        "conversation.id": (v7/*: any*/),
        "conversation.inquiryID": (v8/*: any*/),
        "conversation.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "conversation.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ConversationItem"
        },
        "conversation.items.item": (v9/*: any*/),
        "conversation.items.item.__isNode": (v6/*: any*/),
        "conversation.items.item.__typename": (v6/*: any*/),
        "conversation.items.item.id": (v7/*: any*/),
        "conversation.items.item.internalID": (v7/*: any*/),
        "conversation.items.liveArtwork": (v9/*: any*/),
        "conversation.items.liveArtwork.__isNode": (v6/*: any*/),
        "conversation.items.liveArtwork.__typename": (v6/*: any*/),
        "conversation.items.liveArtwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "conversation.items.liveArtwork.editionSets.id": (v7/*: any*/),
        "conversation.items.liveArtwork.editionSets.internalID": (v7/*: any*/),
        "conversation.items.liveArtwork.id": (v7/*: any*/),
        "conversation.items.liveArtwork.internalID": (v7/*: any*/),
        "conversation.items.liveArtwork.isAcquireable": (v10/*: any*/),
        "conversation.items.liveArtwork.isEdition": (v10/*: any*/),
        "conversation.items.liveArtwork.isOfferable": (v10/*: any*/),
        "conversation.items.liveArtwork.isOfferableFromInquiry": (v10/*: any*/),
        "conversation.items.liveArtwork.slug": (v7/*: any*/),
        "conversation.lastMessageID": (v8/*: any*/)
      }
    },
    "name": "ConversationReplyTestQuery",
    "operationKind": "query",
    "text": "query ConversationReplyTestQuery {\n  conversation(id: \"conversation-id\") {\n    ...ConversationReply_conversation\n    id\n  }\n}\n\nfragment ConfirmArtworkButton_artwork on Artwork {\n  internalID\n}\n\nfragment Conversation2CTA_conversation on Conversation {\n  ...useConversationPurchaseButtonData_conversation\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        __typename\n        isOfferableFromInquiry\n        isAcquireable\n        isOfferable\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  activeOrders: orderConnection(first: 10, states: [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]) {\n    edges {\n      node {\n        __typename\n        internalID\n        state\n        stateReason\n        stateExpiresAt\n        ... on CommerceOfferOrder {\n          buyerAction\n          offers(first: 5) {\n            edges {\n              node {\n                internalID\n                id\n              }\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationReply_conversation on Conversation {\n  ...Conversation2CTA_conversation\n  from {\n    email\n    id\n  }\n  internalID\n  inquiryID\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  lastMessageID\n}\n\nfragment useConversationPurchaseButtonData_conversation on Conversation {\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        __typename\n        isAcquireable\n        isEdition\n        internalID\n        slug\n        editionSets {\n          internalID\n          id\n        }\n        ...ConfirmArtworkButton_artwork\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4d5aab4bef53aaecf5bcdeb6484be827";

export default node;
