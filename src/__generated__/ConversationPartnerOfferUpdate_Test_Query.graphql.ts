/**
 * @generated SignedSource<<0732c4251137e345a76e05f3275975af>>
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
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": true,
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
                              (v1/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "collectorOrdersConnection(first:10)"
              },
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
                    "name": "offerType",
                    "value": [
                      "PERSONALIZED"
                    ]
                  }
                ],
                "concreteType": "PartnerOfferConnection",
                "kind": "LinkedField",
                "name": "partnerOffersConnection",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PartnerOfferEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PartnerOffer",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "internalID",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "endAt",
                            "storageKey": null
                          },
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
                          (v1/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnerOffersConnection(first:1,offerType:[\"PERSONALIZED\"])"
              },
              (v1/*: any*/)
            ],
            "storageKey": "conversation(id:\"conversation-id\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cc10d5f5c88e199ecb5534192214a9f4",
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
        "me.conversation.collectorOrdersConnection.edges.node.id": (v2/*: any*/),
        "me.conversation.collectorOrdersConnection.edges.node.lineItems": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "LineItem"
        },
        "me.conversation.collectorOrdersConnection.edges.node.lineItems.id": (v2/*: any*/),
        "me.conversation.collectorOrdersConnection.edges.node.lineItems.partnerOfferId": (v3/*: any*/),
        "me.conversation.id": (v2/*: any*/),
        "me.conversation.partnerOffersConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferConnection"
        },
        "me.conversation.partnerOffersConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "PartnerOfferEdge"
        },
        "me.conversation.partnerOffersConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOffer"
        },
        "me.conversation.partnerOffersConnection.edges.node.endAt": (v3/*: any*/),
        "me.conversation.partnerOffersConnection.edges.node.id": (v2/*: any*/),
        "me.conversation.partnerOffersConnection.edges.node.internalID": (v2/*: any*/),
        "me.conversation.partnerOffersConnection.edges.node.isAvailable": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "me.conversation.partnerOffersConnection.edges.node.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "me.conversation.partnerOffersConnection.edges.node.priceWithDiscount.display": (v3/*: any*/),
        "me.id": (v2/*: any*/)
      }
    },
    "name": "ConversationPartnerOfferUpdate_Test_Query",
    "operationKind": "query",
    "text": "query ConversationPartnerOfferUpdate_Test_Query {\n  me {\n    conversation(id: \"conversation-id\") {\n      ...ConversationPartnerOfferUpdate_conversation\n      id\n    }\n    id\n  }\n}\n\nfragment ConversationPartnerOfferUpdate_conversation on Conversation {\n  collectorOrdersConnection(first: 10) {\n    edges {\n      node {\n        buyerState\n        lineItems {\n          partnerOfferId\n          id\n        }\n        id\n      }\n    }\n  }\n  partnerOffersConnection(first: 1, offerType: [PERSONALIZED]) {\n    edges {\n      node {\n        internalID\n        endAt\n        isAvailable\n        priceWithDiscount {\n          display\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "62b8bff505b1a2ccb4834b9a198c1d6b";

export default node;
