/**
 * @generated SignedSource<<c5db89975ded6edd40755e76f58c195c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationCTA_Test_Query$variables = Record<PropertyKey, never>;
export type ConversationCTA_Test_Query$data = {
  readonly me: {
    readonly conversation: {
      readonly " $fragmentSpreads": FragmentRefs<"ConversationCTA_conversation">;
    } | null | undefined;
  } | null | undefined;
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationsContext_viewer">;
  } | null | undefined;
};
export type ConversationCTA_Test_Query = {
  response: ConversationCTA_Test_Query$data;
  variables: ConversationCTA_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "1234"
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
  "name": "isAcquireable",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferableFromInquiry",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v7 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cm",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "in",
  "storageKey": null
},
v10 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "details",
    "storageKey": null
  }
],
v11 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v12 = {
  "kind": "Literal",
  "name": "states",
  "value": [
    "APPROVED",
    "PROCESSING_APPROVAL",
    "FULFILLED",
    "SUBMITTED",
    "REFUNDED"
  ]
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stateReason",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stateExpiresAt",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerAction",
  "storageKey": null
},
v17 = {
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
            (v1/*: any*/),
            (v4/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "offers(first:5)"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Me"
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
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v23 = {
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
v24 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOfferConnection"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "CommerceOfferEdge"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOffer"
},
v28 = {
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
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ConversationItemType"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkInfoRow"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v33 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v34 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ConversationCTA_Test_Query",
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
                "name": "ConversationCTA_conversation"
              }
            ],
            "storageKey": "conversation(id:\"1234\")"
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
    "name": "ConversationCTA_Test_Query",
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
                    "name": "liveArtwork",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/),
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
                            "selections": [
                              (v1/*: any*/),
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "editionOf",
                                "storageKey": null
                              },
                              (v5/*: any*/),
                              (v6/*: any*/),
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "listPrice",
                                "plural": false,
                                "selections": [
                                  (v2/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v7/*: any*/),
                                    "type": "Money",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v7/*: any*/),
                                    "type": "PriceRange",
                                    "abstractKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "dimensions",
                                "kind": "LinkedField",
                                "name": "dimensions",
                                "plural": false,
                                "selections": [
                                  (v8/*: any*/),
                                  (v9/*: any*/)
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
                            "name": "category",
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
                            "name": "date",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "manufacturer",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "medium",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "publisher",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "saleMessage",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          },
                          (v6/*: any*/),
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AttributionClass",
                            "kind": "LinkedField",
                            "name": "attributionClass",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "name",
                                "storageKey": null
                              },
                              (v4/*: any*/)
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
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 40
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 40
                                  }
                                ],
                                "concreteType": "ResizedImageUrl",
                                "kind": "LinkedField",
                                "name": "resized",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "src",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "srcSet",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "width",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "height",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "resized(height:40,width:40)"
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkInfoRow",
                            "kind": "LinkedField",
                            "name": "conditionDescription",
                            "plural": false,
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkInfoRow",
                            "kind": "LinkedField",
                            "name": "certificateOfAuthenticity",
                            "plural": false,
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkInfoRow",
                            "kind": "LinkedField",
                            "name": "framed",
                            "plural": false,
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "dimensions",
                            "kind": "LinkedField",
                            "name": "dimensions",
                            "plural": false,
                            "selections": [
                              (v9/*: any*/),
                              (v8/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkInfoRow",
                            "kind": "LinkedField",
                            "name": "signatureInfo",
                            "plural": false,
                            "selections": (v10/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "published",
                            "storageKey": null
                          }
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      (v11/*: any*/)
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
                        "selections": [
                          (v1/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      (v11/*: any*/)
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
                    "value": 1
                  },
                  (v12/*: any*/)
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
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "stateUpdatedAt",
                            "storageKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v16/*: any*/),
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
                                    "kind": "ScalarField",
                                    "name": "createdAt",
                                    "storageKey": null
                                  },
                                  (v4/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v17/*: any*/)
                            ],
                            "type": "CommerceOfferOrder",
                            "abstractKey": null
                          },
                          (v4/*: any*/)
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
                "alias": "activeOrderCTA",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 10
                  },
                  (v12/*: any*/)
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
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v16/*: any*/),
                              (v17/*: any*/)
                            ],
                            "type": "CommerceOfferOrder",
                            "abstractKey": null
                          },
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "orderConnection(first:10,states:[\"APPROVED\",\"PROCESSING_APPROVAL\",\"FULFILLED\",\"SUBMITTED\",\"REFUNDED\"])"
              },
              (v4/*: any*/)
            ],
            "storageKey": "conversation(id:\"1234\")"
          },
          (v4/*: any*/)
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
                            "selections": (v7/*: any*/),
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "partnerOffersConnection(first:100)"
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "15baf297ec0a41c4b3a26d351bc8bdc1",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": (v18/*: any*/),
        "me.conversation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "me.conversation.activeOrderCTA": (v19/*: any*/),
        "me.conversation.activeOrderCTA.edges": (v20/*: any*/),
        "me.conversation.activeOrderCTA.edges.node": (v21/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.__typename": (v22/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.buyerAction": (v23/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.id": (v24/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.internalID": (v24/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.offers": (v25/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.offers.edges": (v26/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.offers.edges.node": (v27/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.offers.edges.node.id": (v24/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.offers.edges.node.internalID": (v24/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.state": (v28/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.stateExpiresAt": (v29/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.stateReason": (v29/*: any*/),
        "me.conversation.activeOrders": (v19/*: any*/),
        "me.conversation.activeOrders.edges": (v20/*: any*/),
        "me.conversation.activeOrders.edges.node": (v21/*: any*/),
        "me.conversation.activeOrders.edges.node.__typename": (v22/*: any*/),
        "me.conversation.activeOrders.edges.node.buyerAction": (v23/*: any*/),
        "me.conversation.activeOrders.edges.node.id": (v24/*: any*/),
        "me.conversation.activeOrders.edges.node.internalID": (v24/*: any*/),
        "me.conversation.activeOrders.edges.node.lastOffer": (v27/*: any*/),
        "me.conversation.activeOrders.edges.node.lastOffer.createdAt": (v22/*: any*/),
        "me.conversation.activeOrders.edges.node.lastOffer.id": (v24/*: any*/),
        "me.conversation.activeOrders.edges.node.offers": (v25/*: any*/),
        "me.conversation.activeOrders.edges.node.offers.edges": (v26/*: any*/),
        "me.conversation.activeOrders.edges.node.offers.edges.node": (v27/*: any*/),
        "me.conversation.activeOrders.edges.node.offers.edges.node.id": (v24/*: any*/),
        "me.conversation.activeOrders.edges.node.offers.edges.node.internalID": (v24/*: any*/),
        "me.conversation.activeOrders.edges.node.state": (v28/*: any*/),
        "me.conversation.activeOrders.edges.node.stateExpiresAt": (v29/*: any*/),
        "me.conversation.activeOrders.edges.node.stateReason": (v29/*: any*/),
        "me.conversation.activeOrders.edges.node.stateUpdatedAt": (v29/*: any*/),
        "me.conversation.id": (v24/*: any*/),
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
        "me.conversation.items.item": (v30/*: any*/),
        "me.conversation.items.item.__isNode": (v22/*: any*/),
        "me.conversation.items.item.__typename": (v22/*: any*/),
        "me.conversation.items.item.id": (v24/*: any*/),
        "me.conversation.items.item.internalID": (v24/*: any*/),
        "me.conversation.items.liveArtwork": (v30/*: any*/),
        "me.conversation.items.liveArtwork.__isNode": (v22/*: any*/),
        "me.conversation.items.liveArtwork.__typename": (v22/*: any*/),
        "me.conversation.items.liveArtwork.artistNames": (v29/*: any*/),
        "me.conversation.items.liveArtwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.conversation.items.liveArtwork.attributionClass.id": (v24/*: any*/),
        "me.conversation.items.liveArtwork.attributionClass.name": (v29/*: any*/),
        "me.conversation.items.liveArtwork.category": (v29/*: any*/),
        "me.conversation.items.liveArtwork.certificateOfAuthenticity": (v31/*: any*/),
        "me.conversation.items.liveArtwork.certificateOfAuthenticity.details": (v29/*: any*/),
        "me.conversation.items.liveArtwork.conditionDescription": (v31/*: any*/),
        "me.conversation.items.liveArtwork.conditionDescription.details": (v29/*: any*/),
        "me.conversation.items.liveArtwork.date": (v29/*: any*/),
        "me.conversation.items.liveArtwork.dimensions": (v32/*: any*/),
        "me.conversation.items.liveArtwork.dimensions.cm": (v29/*: any*/),
        "me.conversation.items.liveArtwork.dimensions.in": (v29/*: any*/),
        "me.conversation.items.liveArtwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "me.conversation.items.liveArtwork.editionSets.dimensions": (v32/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.dimensions.cm": (v29/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.dimensions.in": (v29/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.editionOf": (v29/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.id": (v24/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.internalID": (v24/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.isAcquireable": (v33/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.isOfferable": (v33/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.isOfferableFromInquiry": (v33/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "me.conversation.items.liveArtwork.editionSets.listPrice.__typename": (v22/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.listPrice.display": (v29/*: any*/),
        "me.conversation.items.liveArtwork.framed": (v31/*: any*/),
        "me.conversation.items.liveArtwork.framed.details": (v29/*: any*/),
        "me.conversation.items.liveArtwork.id": (v24/*: any*/),
        "me.conversation.items.liveArtwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "me.conversation.items.liveArtwork.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "me.conversation.items.liveArtwork.image.resized.height": (v34/*: any*/),
        "me.conversation.items.liveArtwork.image.resized.src": (v22/*: any*/),
        "me.conversation.items.liveArtwork.image.resized.srcSet": (v22/*: any*/),
        "me.conversation.items.liveArtwork.image.resized.width": (v34/*: any*/),
        "me.conversation.items.liveArtwork.internalID": (v24/*: any*/),
        "me.conversation.items.liveArtwork.isAcquireable": (v33/*: any*/),
        "me.conversation.items.liveArtwork.isEdition": (v33/*: any*/),
        "me.conversation.items.liveArtwork.isOfferable": (v33/*: any*/),
        "me.conversation.items.liveArtwork.isOfferableFromInquiry": (v33/*: any*/),
        "me.conversation.items.liveArtwork.manufacturer": (v29/*: any*/),
        "me.conversation.items.liveArtwork.medium": (v29/*: any*/),
        "me.conversation.items.liveArtwork.published": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "me.conversation.items.liveArtwork.publisher": (v29/*: any*/),
        "me.conversation.items.liveArtwork.saleMessage": (v29/*: any*/),
        "me.conversation.items.liveArtwork.signatureInfo": (v31/*: any*/),
        "me.conversation.items.liveArtwork.signatureInfo.details": (v29/*: any*/),
        "me.conversation.items.liveArtwork.slug": (v24/*: any*/),
        "me.conversation.items.liveArtwork.title": (v29/*: any*/),
        "me.id": (v24/*: any*/),
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.me": (v18/*: any*/),
        "viewer.me.id": (v24/*: any*/),
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
        "viewer.me.partnerOffersConnection.edges.node.artworkId": (v29/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.endAt": (v29/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.id": (v24/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.internalID": (v24/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.isAvailable": (v33/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.note": (v29/*: any*/),
        "viewer.me.partnerOffersConnection.edges.node.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "viewer.me.partnerOffersConnection.edges.node.priceWithDiscount.display": (v29/*: any*/)
      }
    },
    "name": "ConversationCTA_Test_Query",
    "operationKind": "query",
    "text": "query ConversationCTA_Test_Query {\n  me {\n    conversation(id: \"1234\") {\n      ...ConversationCTA_conversation\n      id\n    }\n    id\n  }\n  viewer {\n    ...ConversationsContext_viewer\n  }\n}\n\nfragment ConversationCTA_conversation on Conversation {\n  ...useConversationPurchaseButtonData_conversation\n  ...ConversationReviewOfferCTA_conversation\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        ...ConversationConfirmModal_artwork\n        __typename\n        internalID\n        isOfferableFromInquiry\n        isAcquireable\n        isOfferable\n        published\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  activeOrderCTA: orderConnection(first: 10, states: [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]) {\n    edges {\n      node {\n        __typename\n        internalID\n        state\n        stateReason\n        stateExpiresAt\n        ... on CommerceOfferOrder {\n          buyerAction\n          offers(first: 5) {\n            edges {\n              node {\n                internalID\n                id\n              }\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationConfirmModal_artwork on Artwork {\n  category\n  artistNames\n  date\n  internalID\n  isEdition\n  manufacturer\n  medium\n  publisher\n  saleMessage\n  title\n  isOfferable\n  isAcquireable\n  isOfferableFromInquiry\n  attributionClass {\n    name\n    id\n  }\n  image {\n    resized(width: 40, height: 40) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  conditionDescription {\n    details\n  }\n  certificateOfAuthenticity {\n    details\n  }\n  framed {\n    details\n  }\n  dimensions {\n    in\n    cm\n  }\n  signatureInfo {\n    details\n  }\n  editionSets {\n    internalID\n    editionOf\n    isOfferableFromInquiry\n    isOfferable\n    isAcquireable\n    listPrice {\n      __typename\n      ... on Money {\n        display\n      }\n      ... on PriceRange {\n        display\n      }\n    }\n    dimensions {\n      cm\n      in\n    }\n    id\n  }\n}\n\nfragment ConversationReviewOfferCTA_conversation on Conversation {\n  internalID\n  activeOrders: orderConnection(first: 1, states: [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]) {\n    edges {\n      node {\n        __typename\n        internalID\n        state\n        stateReason\n        stateExpiresAt\n        stateUpdatedAt\n        ... on CommerceOfferOrder {\n          buyerAction\n          lastOffer {\n            createdAt\n            id\n          }\n          offers(first: 5) {\n            edges {\n              node {\n                internalID\n                id\n              }\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationsContext_viewer on Viewer {\n  me {\n    partnerOffersConnection(first: 100) {\n      edges {\n        node {\n          artworkId\n          endAt\n          internalID\n          isAvailable\n          note\n          priceWithDiscount {\n            display\n          }\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment useConversationPurchaseButtonData_conversation on Conversation {\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        __typename\n        isAcquireable\n        isEdition\n        internalID\n        slug\n        editionSets {\n          internalID\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4e04133b136159261fafbbec08a54928";

export default node;
