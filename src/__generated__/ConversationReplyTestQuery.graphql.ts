/**
 * @generated SignedSource<<758f3e6225fb315ad0a3e9c334320831>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationReplyTestQuery$variables = Record<PropertyKey, never>;
export type ConversationReplyTestQuery$data = {
  readonly conversation: {
    readonly " $fragmentSpreads": FragmentRefs<"ConversationReply_conversation">;
  } | null | undefined;
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
v12 = [
  (v1/*: any*/),
  (v4/*: any*/)
],
v13 = {
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
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "state",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stateReason",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "stateExpiresAt",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "buyerAction",
  "storageKey": null
},
v18 = {
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
          "selections": (v12/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": "offers(first:5)"
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
                    "selections": (v12/*: any*/),
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
              (v13/*: any*/)
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
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
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
                          (v17/*: any*/),
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
                          (v18/*: any*/)
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
              (v13/*: any*/)
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
                      (v14/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v17/*: any*/),
                          (v18/*: any*/)
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
              (v4/*: any*/)
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
          (v4/*: any*/)
        ],
        "storageKey": "conversation(id:\"conversation-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "34daf05447a2b6c8c6ee7491e9e3d023",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "conversation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Conversation"
        },
        "conversation.activeOrderCTA": (v19/*: any*/),
        "conversation.activeOrderCTA.edges": (v20/*: any*/),
        "conversation.activeOrderCTA.edges.node": (v21/*: any*/),
        "conversation.activeOrderCTA.edges.node.__typename": (v22/*: any*/),
        "conversation.activeOrderCTA.edges.node.buyerAction": (v23/*: any*/),
        "conversation.activeOrderCTA.edges.node.id": (v24/*: any*/),
        "conversation.activeOrderCTA.edges.node.internalID": (v24/*: any*/),
        "conversation.activeOrderCTA.edges.node.offers": (v25/*: any*/),
        "conversation.activeOrderCTA.edges.node.offers.edges": (v26/*: any*/),
        "conversation.activeOrderCTA.edges.node.offers.edges.node": (v27/*: any*/),
        "conversation.activeOrderCTA.edges.node.offers.edges.node.id": (v24/*: any*/),
        "conversation.activeOrderCTA.edges.node.offers.edges.node.internalID": (v24/*: any*/),
        "conversation.activeOrderCTA.edges.node.state": (v28/*: any*/),
        "conversation.activeOrderCTA.edges.node.stateExpiresAt": (v29/*: any*/),
        "conversation.activeOrderCTA.edges.node.stateReason": (v29/*: any*/),
        "conversation.activeOrders": (v19/*: any*/),
        "conversation.activeOrders.edges": (v20/*: any*/),
        "conversation.activeOrders.edges.node": (v21/*: any*/),
        "conversation.activeOrders.edges.node.__typename": (v22/*: any*/),
        "conversation.activeOrders.edges.node.buyerAction": (v23/*: any*/),
        "conversation.activeOrders.edges.node.id": (v24/*: any*/),
        "conversation.activeOrders.edges.node.internalID": (v24/*: any*/),
        "conversation.activeOrders.edges.node.lastOffer": (v27/*: any*/),
        "conversation.activeOrders.edges.node.lastOffer.createdAt": (v22/*: any*/),
        "conversation.activeOrders.edges.node.lastOffer.id": (v24/*: any*/),
        "conversation.activeOrders.edges.node.offers": (v25/*: any*/),
        "conversation.activeOrders.edges.node.offers.edges": (v26/*: any*/),
        "conversation.activeOrders.edges.node.offers.edges.node": (v27/*: any*/),
        "conversation.activeOrders.edges.node.offers.edges.node.id": (v24/*: any*/),
        "conversation.activeOrders.edges.node.offers.edges.node.internalID": (v24/*: any*/),
        "conversation.activeOrders.edges.node.state": (v28/*: any*/),
        "conversation.activeOrders.edges.node.stateExpiresAt": (v29/*: any*/),
        "conversation.activeOrders.edges.node.stateReason": (v29/*: any*/),
        "conversation.activeOrders.edges.node.stateUpdatedAt": (v29/*: any*/),
        "conversation.from": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ConversationInitiator"
        },
        "conversation.from.email": (v22/*: any*/),
        "conversation.from.id": (v24/*: any*/),
        "conversation.id": (v24/*: any*/),
        "conversation.inquiryID": (v29/*: any*/),
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
        "conversation.items.item": (v30/*: any*/),
        "conversation.items.item.__isNode": (v22/*: any*/),
        "conversation.items.item.__typename": (v22/*: any*/),
        "conversation.items.item.id": (v24/*: any*/),
        "conversation.items.item.internalID": (v24/*: any*/),
        "conversation.items.liveArtwork": (v30/*: any*/),
        "conversation.items.liveArtwork.__isNode": (v22/*: any*/),
        "conversation.items.liveArtwork.__typename": (v22/*: any*/),
        "conversation.items.liveArtwork.artistNames": (v29/*: any*/),
        "conversation.items.liveArtwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "conversation.items.liveArtwork.attributionClass.id": (v24/*: any*/),
        "conversation.items.liveArtwork.attributionClass.name": (v29/*: any*/),
        "conversation.items.liveArtwork.category": (v29/*: any*/),
        "conversation.items.liveArtwork.certificateOfAuthenticity": (v31/*: any*/),
        "conversation.items.liveArtwork.certificateOfAuthenticity.details": (v29/*: any*/),
        "conversation.items.liveArtwork.conditionDescription": (v31/*: any*/),
        "conversation.items.liveArtwork.conditionDescription.details": (v29/*: any*/),
        "conversation.items.liveArtwork.date": (v29/*: any*/),
        "conversation.items.liveArtwork.dimensions": (v32/*: any*/),
        "conversation.items.liveArtwork.dimensions.cm": (v29/*: any*/),
        "conversation.items.liveArtwork.dimensions.in": (v29/*: any*/),
        "conversation.items.liveArtwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "conversation.items.liveArtwork.editionSets.dimensions": (v32/*: any*/),
        "conversation.items.liveArtwork.editionSets.dimensions.cm": (v29/*: any*/),
        "conversation.items.liveArtwork.editionSets.dimensions.in": (v29/*: any*/),
        "conversation.items.liveArtwork.editionSets.editionOf": (v29/*: any*/),
        "conversation.items.liveArtwork.editionSets.id": (v24/*: any*/),
        "conversation.items.liveArtwork.editionSets.internalID": (v24/*: any*/),
        "conversation.items.liveArtwork.editionSets.isAcquireable": (v33/*: any*/),
        "conversation.items.liveArtwork.editionSets.isOfferable": (v33/*: any*/),
        "conversation.items.liveArtwork.editionSets.isOfferableFromInquiry": (v33/*: any*/),
        "conversation.items.liveArtwork.editionSets.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "conversation.items.liveArtwork.editionSets.listPrice.__typename": (v22/*: any*/),
        "conversation.items.liveArtwork.editionSets.listPrice.display": (v29/*: any*/),
        "conversation.items.liveArtwork.framed": (v31/*: any*/),
        "conversation.items.liveArtwork.framed.details": (v29/*: any*/),
        "conversation.items.liveArtwork.id": (v24/*: any*/),
        "conversation.items.liveArtwork.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "conversation.items.liveArtwork.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "conversation.items.liveArtwork.image.resized.height": (v34/*: any*/),
        "conversation.items.liveArtwork.image.resized.src": (v22/*: any*/),
        "conversation.items.liveArtwork.image.resized.srcSet": (v22/*: any*/),
        "conversation.items.liveArtwork.image.resized.width": (v34/*: any*/),
        "conversation.items.liveArtwork.internalID": (v24/*: any*/),
        "conversation.items.liveArtwork.isAcquireable": (v33/*: any*/),
        "conversation.items.liveArtwork.isEdition": (v33/*: any*/),
        "conversation.items.liveArtwork.isOfferable": (v33/*: any*/),
        "conversation.items.liveArtwork.isOfferableFromInquiry": (v33/*: any*/),
        "conversation.items.liveArtwork.manufacturer": (v29/*: any*/),
        "conversation.items.liveArtwork.medium": (v29/*: any*/),
        "conversation.items.liveArtwork.published": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "conversation.items.liveArtwork.publisher": (v29/*: any*/),
        "conversation.items.liveArtwork.saleMessage": (v29/*: any*/),
        "conversation.items.liveArtwork.signatureInfo": (v31/*: any*/),
        "conversation.items.liveArtwork.signatureInfo.details": (v29/*: any*/),
        "conversation.items.liveArtwork.slug": (v24/*: any*/),
        "conversation.items.liveArtwork.title": (v29/*: any*/),
        "conversation.lastMessageID": (v29/*: any*/)
      }
    },
    "name": "ConversationReplyTestQuery",
    "operationKind": "query",
    "text": "query ConversationReplyTestQuery {\n  conversation(id: \"conversation-id\") {\n    ...ConversationReply_conversation\n    id\n  }\n}\n\nfragment ConversationCTA_conversation on Conversation {\n  ...useConversationPurchaseButtonData_conversation\n  ...ConversationReviewOfferCTA_conversation\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        ...ConversationConfirmModal_artwork\n        __typename\n        internalID\n        isOfferableFromInquiry\n        isAcquireable\n        isOfferable\n        published\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  activeOrderCTA: orderConnection(first: 10, states: [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]) {\n    edges {\n      node {\n        __typename\n        internalID\n        state\n        stateReason\n        stateExpiresAt\n        ... on CommerceOfferOrder {\n          buyerAction\n          offers(first: 5) {\n            edges {\n              node {\n                internalID\n                id\n              }\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationConfirmModal_artwork on Artwork {\n  category\n  artistNames\n  date\n  internalID\n  isEdition\n  manufacturer\n  medium\n  publisher\n  saleMessage\n  title\n  isOfferable\n  isAcquireable\n  isOfferableFromInquiry\n  attributionClass {\n    name\n    id\n  }\n  image {\n    resized(width: 40, height: 40) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  conditionDescription {\n    details\n  }\n  certificateOfAuthenticity {\n    details\n  }\n  framed {\n    details\n  }\n  dimensions {\n    in\n    cm\n  }\n  signatureInfo {\n    details\n  }\n  editionSets {\n    internalID\n    editionOf\n    isOfferableFromInquiry\n    isOfferable\n    isAcquireable\n    listPrice {\n      __typename\n      ... on Money {\n        display\n      }\n      ... on PriceRange {\n        display\n      }\n    }\n    dimensions {\n      cm\n      in\n    }\n    id\n  }\n}\n\nfragment ConversationReply_conversation on Conversation {\n  ...ConversationCTA_conversation\n  from {\n    email\n    id\n  }\n  internalID\n  inquiryID\n  items {\n    item {\n      __typename\n      ... on Artwork {\n        id\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  lastMessageID\n}\n\nfragment ConversationReviewOfferCTA_conversation on Conversation {\n  internalID\n  activeOrders: orderConnection(first: 1, states: [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]) {\n    edges {\n      node {\n        __typename\n        internalID\n        state\n        stateReason\n        stateExpiresAt\n        stateUpdatedAt\n        ... on CommerceOfferOrder {\n          buyerAction\n          lastOffer {\n            createdAt\n            id\n          }\n          offers(first: 5) {\n            edges {\n              node {\n                internalID\n                id\n              }\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment useConversationPurchaseButtonData_conversation on Conversation {\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        __typename\n        isAcquireable\n        isEdition\n        internalID\n        slug\n        editionSets {\n          internalID\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4d5aab4bef53aaecf5bcdeb6484be827";

export default node;
