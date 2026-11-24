/**
 * @generated SignedSource<<a70b208e9dee01fb6d8088ba72ef93ff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationReviewOfferCTA_Test_Query$variables = Record<PropertyKey, never>;
export type ConversationReviewOfferCTA_Test_Query$data = {
  readonly conversation: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationReviewOfferCTA_conversation">;
  } | null | undefined;
};
export type ConversationReviewOfferCTA_Test_Query = {
  response: ConversationReviewOfferCTA_Test_Query$data;
  variables: ConversationReviewOfferCTA_Test_Query$variables;
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
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationReviewOfferCTA_Test_Query",
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
            "name": "ConversationReviewOfferCTA_conversation"
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
    "name": "ConversationReviewOfferCTA_Test_Query",
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
                      (v1/*: any*/),
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
                        "name": "buyerStateExpiresAt",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Offer",
                        "kind": "LinkedField",
                        "name": "lastSubmittedOffer",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "createdAt",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Offer",
                        "kind": "LinkedField",
                        "name": "submittedOffers",
                        "plural": true,
                        "selections": [
                          (v1/*: any*/),
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
            "storageKey": "collectorOrdersConnection(buyerState:[\"SUBMITTED\",\"OFFER_RECEIVED\",\"COUNTEROFFER_SENT\",\"PAYMENT_FAILED\",\"PROCESSING_PAYMENT\",\"PROCESSING_OFFLINE_PAYMENT\",\"APPROVED\",\"SHIPPED\",\"COMPLETED\",\"REFUNDED\"],first:10)"
          },
          (v2/*: any*/)
        ],
        "storageKey": "conversation(id:\"123\")"
      }
    ]
  },
  "params": {
    "cacheID": "d50fc1046cb309e7188c703811eb5e36",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "conversation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "conversation.activeCollectorOrders": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MeOrdersConnection"
        },
        "conversation.activeCollectorOrders.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "MeOrdersEdge"
        },
        "conversation.activeCollectorOrders.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "conversation.activeCollectorOrders.edges.node.buyerAction": {
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
        "conversation.activeCollectorOrders.edges.node.buyerStateExpiresAt": (v3/*: any*/),
        "conversation.activeCollectorOrders.edges.node.id": (v4/*: any*/),
        "conversation.activeCollectorOrders.edges.node.internalID": (v4/*: any*/),
        "conversation.activeCollectorOrders.edges.node.lastSubmittedOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Offer"
        },
        "conversation.activeCollectorOrders.edges.node.lastSubmittedOffer.createdAt": (v3/*: any*/),
        "conversation.activeCollectorOrders.edges.node.lastSubmittedOffer.id": (v4/*: any*/),
        "conversation.activeCollectorOrders.edges.node.submittedOffers": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Offer"
        },
        "conversation.activeCollectorOrders.edges.node.submittedOffers.id": (v4/*: any*/),
        "conversation.activeCollectorOrders.edges.node.submittedOffers.internalID": (v4/*: any*/),
        "conversation.id": (v4/*: any*/),
        "conversation.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        }
      }
    },
    "name": "ConversationReviewOfferCTA_Test_Query",
    "operationKind": "query",
    "text": "query ConversationReviewOfferCTA_Test_Query {\n  conversation(id: \"123\") {\n    ...ConversationReviewOfferCTA_conversation\n    id\n  }\n}\n\nfragment ConversationReviewOfferCTA_conversation on Conversation {\n  internalID\n  activeCollectorOrders: collectorOrdersConnection(first: 10, buyerState: [SUBMITTED, OFFER_RECEIVED, COUNTEROFFER_SENT, PAYMENT_FAILED, PROCESSING_PAYMENT, PROCESSING_OFFLINE_PAYMENT, APPROVED, SHIPPED, COMPLETED, REFUNDED]) {\n    edges {\n      node {\n        internalID\n        buyerAction\n        buyerStateExpiresAt\n        lastSubmittedOffer {\n          createdAt\n          id\n        }\n        submittedOffers {\n          internalID\n          id\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b454f545d921c0461a7efec0981470fe";

export default node;
