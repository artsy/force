/**
 * @generated SignedSource<<1ad99e5a25214f11788136f69fe5ccc1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationPartnerOfferCTA_Test_Query$variables = Record<PropertyKey, never>;
export type ConversationPartnerOfferCTA_Test_Query$data = {
  readonly me: {
    readonly conversation: {
      readonly " $fragmentSpreads": FragmentRefs<"ConversationPartnerOfferCTA_conversation" | "ConversationsContext_conversation">;
    } | null | undefined;
  } | null | undefined;
};
export type ConversationPartnerOfferCTA_Test_Query = {
  response: ConversationPartnerOfferCTA_Test_Query$data;
  variables: ConversationPartnerOfferCTA_Test_Query$variables;
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
  "kind": "Literal",
  "name": "first",
  "value": 10
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v5 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v6 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationPartnerOfferCTA_Test_Query",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "ConversationsContext_conversation"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ConversationPartnerOfferCTA_conversation"
              }
            ],
            "storageKey": "conversation(id:\"conversation-id\")"
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
    "name": "ConversationPartnerOfferCTA_Test_Query",
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
                "args": [
                  (v1/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "offerType",
                    "value": [
                      "BULK",
                      "PERSONALIZED"
                    ]
                  }
                ],
                "concreteType": "PartnerOfferToCollectorConnection",
                "kind": "LinkedField",
                "name": "collectorPartnerOffersConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerOfferToCollectorEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PartnerOfferToCollector",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "artworkId",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "endAt",
                            "storageKey": null
                          },
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isAvailable",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isPurchased",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "note",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Money",
                            "kind": "LinkedField",
                            "name": "priceWithDiscount",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "display",
                                "storageKey": null
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
                "storageKey": "collectorPartnerOffersConnection(first:10,offerType:[\"BULK\",\"PERSONALIZED\"])"
              },
              (v2/*: any*/),
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "href",
                            "storageKey": null
                          }
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/)
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
                "alias": "activeCollectorOrders",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "buyerState",
                    "value": [
                      "SUBMITTED",
                      "OFFER_RECEIVED",
                      "COUNTEROFFER_SENT",
                      "PAYMENT_FAILED",
                      "PROCESSING_PAYMENT",
                      "PROCESSING_OFFLINE_PAYMENT",
                      "APPROVED",
                      "SHIPPED",
                      "COMPLETED",
                      "REFUNDED"
                    ]
                  },
                  (v1/*: any*/)
                ],
                "concreteType": "MeOrdersConnection",
                "kind": "LinkedField",
                "name": "collectorOrdersConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MeOrdersEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Order",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "buyerAction",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "impulseConversationId",
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
                "storageKey": "collectorOrdersConnection(buyerState:[\"SUBMITTED\",\"OFFER_RECEIVED\",\"COUNTEROFFER_SENT\",\"PAYMENT_FAILED\",\"PROCESSING_PAYMENT\",\"PROCESSING_OFFLINE_PAYMENT\",\"APPROVED\",\"SHIPPED\",\"COMPLETED\",\"REFUNDED\"],first:10)"
              },
              (v3/*: any*/)
            ],
            "storageKey": "conversation(id:\"conversation-id\")"
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "af89aa99dfc78905f5c64f650e04dd5d",
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
        "me.conversation.activeCollectorOrders": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MeOrdersConnection"
        },
        "me.conversation.activeCollectorOrders.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MeOrdersEdge"
        },
        "me.conversation.activeCollectorOrders.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.conversation.activeCollectorOrders.edges.node.buyerAction": {
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
          "type": "OrderBuyerActionEnum"
        },
        "me.conversation.activeCollectorOrders.edges.node.id": (v4/*: any*/),
        "me.conversation.activeCollectorOrders.edges.node.impulseConversationId": (v5/*: any*/),
        "me.conversation.activeCollectorOrders.edges.node.internalID": (v4/*: any*/),
        "me.conversation.collectorPartnerOffersConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollectorConnection"
        },
        "me.conversation.collectorPartnerOffersConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerOfferToCollectorEdge"
        },
        "me.conversation.collectorPartnerOffersConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "me.conversation.collectorPartnerOffersConnection.edges.node.artworkId": (v5/*: any*/),
        "me.conversation.collectorPartnerOffersConnection.edges.node.endAt": (v5/*: any*/),
        "me.conversation.collectorPartnerOffersConnection.edges.node.id": (v4/*: any*/),
        "me.conversation.collectorPartnerOffersConnection.edges.node.internalID": (v4/*: any*/),
        "me.conversation.collectorPartnerOffersConnection.edges.node.isAvailable": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "me.conversation.collectorPartnerOffersConnection.edges.node.isPurchased": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "me.conversation.collectorPartnerOffersConnection.edges.node.note": (v5/*: any*/),
        "me.conversation.collectorPartnerOffersConnection.edges.node.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "me.conversation.collectorPartnerOffersConnection.edges.node.priceWithDiscount.display": (v5/*: any*/),
        "me.conversation.id": (v4/*: any*/),
        "me.conversation.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "me.conversation.items": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ConversationItem"
        },
        "me.conversation.items.item": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ConversationItemType"
        },
        "me.conversation.items.item.__isNode": (v6/*: any*/),
        "me.conversation.items.item.__typename": (v6/*: any*/),
        "me.conversation.items.item.href": (v5/*: any*/),
        "me.conversation.items.item.id": (v4/*: any*/),
        "me.conversation.items.item.internalID": (v4/*: any*/),
        "me.id": (v4/*: any*/)
      }
    },
    "name": "ConversationPartnerOfferCTA_Test_Query",
    "operationKind": "query",
    "text": "query ConversationPartnerOfferCTA_Test_Query {\n  me {\n    conversation(id: \"conversation-id\") {\n      ...ConversationsContext_conversation\n      ...ConversationPartnerOfferCTA_conversation\n      id\n    }\n    id\n  }\n}\n\nfragment ConversationPartnerOfferCTA_conversation on Conversation {\n  internalID\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n        href\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  activeCollectorOrders: collectorOrdersConnection(first: 10, buyerState: [SUBMITTED, OFFER_RECEIVED, COUNTEROFFER_SENT, PAYMENT_FAILED, PROCESSING_PAYMENT, PROCESSING_OFFLINE_PAYMENT, APPROVED, SHIPPED, COMPLETED, REFUNDED]) {\n    edges {\n      node {\n        internalID\n        buyerAction\n        impulseConversationId\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationsContext_conversation on Conversation {\n  collectorPartnerOffersConnection(first: 10, offerType: [BULK, PERSONALIZED]) {\n    edges {\n      node {\n        artworkId\n        endAt\n        internalID\n        isAvailable\n        isPurchased\n        note\n        priceWithDiscount {\n          display\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "0d910d52e91e18183f67f0e64a1e1a5d";

export default node;
