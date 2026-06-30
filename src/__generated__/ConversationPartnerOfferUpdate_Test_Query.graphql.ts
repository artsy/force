/**
 * @generated SignedSource<<b817a0bb57782e149d7e282955fc0c6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationPartnerOfferUpdate_Test_Query$variables = Record<PropertyKey, never>;
export type ConversationPartnerOfferUpdate_Test_Query$data = {
  readonly me: {
    readonly conversation: {
      readonly " $fragmentSpreads": FragmentRefs<"ConversationPartnerOfferUpdate_conversation">;
    } | null | undefined;
  } | null | undefined;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationsContext_viewer">;
  } | null | undefined;
};
export type ConversationPartnerOfferUpdate_Test_Query = {
  response: ConversationPartnerOfferUpdate_Test_Query$data;
  variables: ConversationPartnerOfferUpdate_Test_Query$variables;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Me"
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
    "name": "ConversationPartnerOfferUpdate_Test_Query",
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
                "name": "ConversationPartnerOfferUpdate_conversation"
              }
            ],
            "storageKey": "conversation(id:\"conversation-id\")"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ConversationsContext_viewer"
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
    "name": "ConversationPartnerOfferUpdate_Test_Query",
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
                          (v1/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/)
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
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10
                  }
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
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "buyerState",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "LineItem",
                            "kind": "LinkedField",
                            "name": "lineItems",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "partnerOfferId",
                                "storageKey": null
                              },
                              (v2/*: any*/)
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
                "storageKey": "collectorOrdersConnection(first:10)"
              },
              (v2/*: any*/)
            ],
            "storageKey": "conversation(id:\"conversation-id\")"
          },
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
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
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 100
                  },
                  {
                    "kind": "Literal",
                    "name": "offerType",
                    "value": [
                      "PERSONALIZED"
                    ]
                  }
                ],
                "concreteType": "PartnerOfferToCollectorConnection",
                "kind": "LinkedField",
                "name": "partnerOffersConnection",
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
                          (v1/*: any*/),
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
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnerOffersConnection(first:100,offerType:[\"PERSONALIZED\"])"
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "7f27c4c48f8ac49ed6f999f1583d5ae7",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": (v3/*: any*/),
        "me.conversation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "me.conversation.collectorOrdersConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MeOrdersConnection"
        },
        "me.conversation.collectorOrdersConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MeOrdersEdge"
        },
        "me.conversation.collectorOrdersConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.conversation.collectorOrdersConnection.edges.node.buyerState": {
          "enumValues": [
            "APPROVED",
            "CANCELED",
            "COMPLETED",
            "COUNTEROFFER_SENT",
            "DECLINED_BY_BUYER",
            "DECLINED_BY_SELLER",
            "INCOMPLETE",
            "OFFER_RECEIVED",
            "PAYMENT_FAILED",
            "PROCESSING_OFFLINE_PAYMENT",
            "PROCESSING_PAYMENT",
            "REFUNDED",
            "SHIPPED",
            "SUBMITTED",
            "UNKNOWN"
          ],
          "nullable": true,
          "plural": false,
          "type": "OrderBuyerStateEnum"
        },
        "me.conversation.collectorOrdersConnection.edges.node.id": (v4/*: any*/),
        "me.conversation.collectorOrdersConnection.edges.node.lineItems": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "LineItem"
        },
        "me.conversation.collectorOrdersConnection.edges.node.lineItems.id": (v4/*: any*/),
        "me.conversation.collectorOrdersConnection.edges.node.lineItems.partnerOfferId": (v5/*: any*/),
        "me.conversation.id": (v4/*: any*/),
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
        "me.conversation.items.item.id": (v4/*: any*/),
        "me.conversation.items.item.internalID": (v4/*: any*/),
        "me.id": (v4/*: any*/),
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.me": (v3/*: any*/),
        "viewer.me.id": (v4/*: any*/),
        "viewer.me.partnerOffersConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollectorConnection"
        },
        "viewer.me.partnerOffersConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerOfferToCollectorEdge"
        },
        "viewer.me.partnerOffersConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "viewer.me.partnerOffersConnection.edges.node.artworkId": (v5/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.endAt": (v5/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.id": (v4/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.internalID": (v4/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.isAvailable": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "viewer.me.partnerOffersConnection.edges.node.note": (v5/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "viewer.me.partnerOffersConnection.edges.node.priceWithDiscount.display": (v5/*: any*/)
      }
    },
    "name": "ConversationPartnerOfferUpdate_Test_Query",
    "operationKind": "query",
    "text": "query ConversationPartnerOfferUpdate_Test_Query {\n  me {\n    conversation(id: \"conversation-id\") {\n      ...ConversationPartnerOfferUpdate_conversation\n      id\n    }\n    id\n  }\n  viewer {\n    ...ConversationsContext_viewer\n  }\n}\n\nfragment ConversationPartnerOfferUpdate_conversation on Conversation {\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  collectorOrdersConnection(first: 10) {\n    edges {\n      node {\n        buyerState\n        lineItems {\n          partnerOfferId\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationsContext_viewer on Viewer {\n  me {\n    partnerOffersConnection(first: 100, offerType: [PERSONALIZED]) {\n      edges {\n        node {\n          artworkId\n          endAt\n          internalID\n          isAvailable\n          note\n          priceWithDiscount {\n            display\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "22de69482d23cffa9508918578c63c6d";

export default node;
