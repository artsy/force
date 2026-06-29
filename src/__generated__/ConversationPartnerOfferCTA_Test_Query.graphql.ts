/**
 * @generated SignedSource<<90e936c557aa4880633628184eae1f45>>
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
      readonly " $fragmentSpreads": FragmentRefs<"ConversationPartnerOfferCTA_conversation">;
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
v4 = {
  "kind": "Literal",
  "name": "first",
  "value": 1
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
                    "name": "item",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v1/*: any*/),
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
                "alias": "activeOrders",
                "args": [
                  (v4/*: any*/),
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
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "orderConnection(first:1,states:[\"APPROVED\",\"PROCESSING_APPROVAL\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\"])"
              },
              {
                "alias": null,
                "args": [
                  (v4/*: any*/),
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
                          (v1/*: any*/),
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
                          (v3/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnerOffersConnection(first:1,offerType:[\"PERSONALIZED\"])"
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
    "cacheID": "807cbae2d766726e9ea5959daa1eb195",
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
        "me.conversation.activeOrders": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrderConnectionWithTotalCount"
        },
        "me.conversation.activeOrders.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "CommerceOrderEdge"
        },
        "me.conversation.activeOrders.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceOrder"
        },
        "me.conversation.activeOrders.edges.node.__typename": (v5/*: any*/),
        "me.conversation.activeOrders.edges.node.id": (v6/*: any*/),
        "me.conversation.activeOrders.edges.node.internalID": (v6/*: any*/),
        "me.conversation.id": (v6/*: any*/),
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
        "me.conversation.items.item.__isNode": (v5/*: any*/),
        "me.conversation.items.item.__typename": (v5/*: any*/),
        "me.conversation.items.item.href": (v7/*: any*/),
        "me.conversation.items.item.id": (v6/*: any*/),
        "me.conversation.items.item.internalID": (v6/*: any*/),
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
        "me.conversation.partnerOffersConnection.edges.node.endAt": (v7/*: any*/),
        "me.conversation.partnerOffersConnection.edges.node.id": (v6/*: any*/),
        "me.conversation.partnerOffersConnection.edges.node.internalID": (v6/*: any*/),
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
        "me.conversation.partnerOffersConnection.edges.node.priceWithDiscount.display": (v7/*: any*/),
        "me.id": (v6/*: any*/)
      }
    },
    "name": "ConversationPartnerOfferCTA_Test_Query",
    "operationKind": "query",
    "text": "query ConversationPartnerOfferCTA_Test_Query {\n  me {\n    conversation(id: \"conversation-id\") {\n      ...ConversationPartnerOfferCTA_conversation\n      id\n    }\n    id\n  }\n}\n\nfragment ConversationPartnerOfferCTA_conversation on Conversation {\n  internalID\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n        href\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  activeOrders: orderConnection(first: 1, states: [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]) {\n    edges {\n      node {\n        __typename\n        internalID\n        id\n      }\n    }\n  }\n  partnerOffersConnection(first: 1, offerType: [PERSONALIZED]) {\n    edges {\n      node {\n        internalID\n        endAt\n        isAvailable\n        priceWithDiscount {\n          display\n        }\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5ac5db8f5b1c46f26823fc38132975a9";

export default node;
