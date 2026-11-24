/**
 * @generated SignedSource<<32ed92edf8adda992d2cce5a008daa07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConversationCTA_Test_Query$variables = Record<PropertyKey, never>;
export type ConversationCTA_Test_Query$data = {
  readonly me: {
    readonly conversation: {
      readonly " $fragmentSpreads": FragmentRefs<"ConversationCTA_conversation" | "ConversationsContext_conversation">;
    } | null | undefined;
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
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
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
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAcquireable",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferableFromInquiry",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOfferable",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cm",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "in",
  "storageKey": null
},
v11 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "details",
    "storageKey": null
  }
],
v12 = {
  "kind": "InlineFragment",
  "selections": [
    (v4/*: any*/)
  ],
  "type": "Node",
  "abstractKey": "__isNode"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ConversationItemType"
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
  "type": "ArtworkInfoRow"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v21 = {
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
                "name": "ConversationsContext_conversation"
              },
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
                            "selections": (v3/*: any*/),
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
                    "name": "liveArtwork",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isEdition",
                            "storageKey": null
                          },
                          (v2/*: any*/),
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
                              (v2/*: any*/),
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "editionOf",
                                "storageKey": null
                              },
                              (v7/*: any*/),
                              (v8/*: any*/),
                              (v6/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "listPrice",
                                "plural": false,
                                "selections": [
                                  (v5/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v3/*: any*/),
                                    "type": "Money",
                                    "abstractKey": null
                                  },
                                  {
                                    "kind": "InlineFragment",
                                    "selections": (v3/*: any*/),
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
                                  (v9/*: any*/),
                                  (v10/*: any*/)
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
                          (v8/*: any*/),
                          (v7/*: any*/),
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
                            "selections": (v11/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkInfoRow",
                            "kind": "LinkedField",
                            "name": "certificateOfAuthenticity",
                            "plural": false,
                            "selections": (v11/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ArtworkInfoRow",
                            "kind": "LinkedField",
                            "name": "framed",
                            "plural": false,
                            "selections": (v11/*: any*/),
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
                              (v10/*: any*/),
                              (v9/*: any*/)
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
                            "selections": (v11/*: any*/),
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
                      (v12/*: any*/)
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
                      (v5/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/)
                        ],
                        "type": "Artwork",
                        "abstractKey": null
                      },
                      (v12/*: any*/)
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
                              (v4/*: any*/)
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
                              (v2/*: any*/),
                              (v4/*: any*/)
                            ],
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
                "storageKey": "collectorOrdersConnection(buyerState:[\"SUBMITTED\",\"OFFER_RECEIVED\",\"COUNTEROFFER_SENT\",\"PAYMENT_FAILED\",\"PROCESSING_PAYMENT\",\"PROCESSING_OFFLINE_PAYMENT\",\"APPROVED\",\"SHIPPED\",\"COMPLETED\",\"REFUNDED\"],first:10)"
              },
              (v4/*: any*/)
            ],
            "storageKey": "conversation(id:\"1234\")"
          },
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4124568d021d8a7aec734ed4aeb16ae1",
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
        "me.conversation.activeCollectorOrders.edges.node.buyerStateExpiresAt": (v13/*: any*/),
        "me.conversation.activeCollectorOrders.edges.node.id": (v14/*: any*/),
        "me.conversation.activeCollectorOrders.edges.node.internalID": (v14/*: any*/),
        "me.conversation.activeCollectorOrders.edges.node.lastSubmittedOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Offer"
        },
        "me.conversation.activeCollectorOrders.edges.node.lastSubmittedOffer.createdAt": (v13/*: any*/),
        "me.conversation.activeCollectorOrders.edges.node.lastSubmittedOffer.id": (v14/*: any*/),
        "me.conversation.activeCollectorOrders.edges.node.submittedOffers": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "Offer"
        },
        "me.conversation.activeCollectorOrders.edges.node.submittedOffers.id": (v14/*: any*/),
        "me.conversation.activeCollectorOrders.edges.node.submittedOffers.internalID": (v14/*: any*/),
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
        "me.conversation.collectorPartnerOffersConnection.edges.node.artworkId": (v13/*: any*/),
        "me.conversation.collectorPartnerOffersConnection.edges.node.endAt": (v13/*: any*/),
        "me.conversation.collectorPartnerOffersConnection.edges.node.id": (v14/*: any*/),
        "me.conversation.collectorPartnerOffersConnection.edges.node.internalID": (v14/*: any*/),
        "me.conversation.collectorPartnerOffersConnection.edges.node.isAvailable": (v15/*: any*/),
        "me.conversation.collectorPartnerOffersConnection.edges.node.isPurchased": (v16/*: any*/),
        "me.conversation.collectorPartnerOffersConnection.edges.node.note": (v13/*: any*/),
        "me.conversation.collectorPartnerOffersConnection.edges.node.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "me.conversation.collectorPartnerOffersConnection.edges.node.priceWithDiscount.display": (v13/*: any*/),
        "me.conversation.id": (v14/*: any*/),
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
        "me.conversation.items.item": (v17/*: any*/),
        "me.conversation.items.item.__isNode": (v18/*: any*/),
        "me.conversation.items.item.__typename": (v18/*: any*/),
        "me.conversation.items.item.id": (v14/*: any*/),
        "me.conversation.items.item.internalID": (v14/*: any*/),
        "me.conversation.items.liveArtwork": (v17/*: any*/),
        "me.conversation.items.liveArtwork.__isNode": (v18/*: any*/),
        "me.conversation.items.liveArtwork.__typename": (v18/*: any*/),
        "me.conversation.items.liveArtwork.artistNames": (v13/*: any*/),
        "me.conversation.items.liveArtwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.conversation.items.liveArtwork.attributionClass.id": (v14/*: any*/),
        "me.conversation.items.liveArtwork.attributionClass.name": (v13/*: any*/),
        "me.conversation.items.liveArtwork.category": (v13/*: any*/),
        "me.conversation.items.liveArtwork.certificateOfAuthenticity": (v19/*: any*/),
        "me.conversation.items.liveArtwork.certificateOfAuthenticity.details": (v13/*: any*/),
        "me.conversation.items.liveArtwork.conditionDescription": (v19/*: any*/),
        "me.conversation.items.liveArtwork.conditionDescription.details": (v13/*: any*/),
        "me.conversation.items.liveArtwork.date": (v13/*: any*/),
        "me.conversation.items.liveArtwork.dimensions": (v20/*: any*/),
        "me.conversation.items.liveArtwork.dimensions.cm": (v13/*: any*/),
        "me.conversation.items.liveArtwork.dimensions.in": (v13/*: any*/),
        "me.conversation.items.liveArtwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "me.conversation.items.liveArtwork.editionSets.dimensions": (v20/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.dimensions.cm": (v13/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.dimensions.in": (v13/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.editionOf": (v13/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.id": (v14/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.internalID": (v14/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.isAcquireable": (v15/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.isOfferable": (v15/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.isOfferableFromInquiry": (v15/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "me.conversation.items.liveArtwork.editionSets.listPrice.__typename": (v18/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.listPrice.display": (v13/*: any*/),
        "me.conversation.items.liveArtwork.framed": (v19/*: any*/),
        "me.conversation.items.liveArtwork.framed.details": (v13/*: any*/),
        "me.conversation.items.liveArtwork.id": (v14/*: any*/),
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
        "me.conversation.items.liveArtwork.image.resized.height": (v21/*: any*/),
        "me.conversation.items.liveArtwork.image.resized.src": (v18/*: any*/),
        "me.conversation.items.liveArtwork.image.resized.srcSet": (v18/*: any*/),
        "me.conversation.items.liveArtwork.image.resized.width": (v21/*: any*/),
        "me.conversation.items.liveArtwork.internalID": (v14/*: any*/),
        "me.conversation.items.liveArtwork.isAcquireable": (v15/*: any*/),
        "me.conversation.items.liveArtwork.isEdition": (v15/*: any*/),
        "me.conversation.items.liveArtwork.isOfferable": (v15/*: any*/),
        "me.conversation.items.liveArtwork.isOfferableFromInquiry": (v15/*: any*/),
        "me.conversation.items.liveArtwork.manufacturer": (v13/*: any*/),
        "me.conversation.items.liveArtwork.medium": (v13/*: any*/),
        "me.conversation.items.liveArtwork.published": (v16/*: any*/),
        "me.conversation.items.liveArtwork.publisher": (v13/*: any*/),
        "me.conversation.items.liveArtwork.saleMessage": (v13/*: any*/),
        "me.conversation.items.liveArtwork.signatureInfo": (v19/*: any*/),
        "me.conversation.items.liveArtwork.signatureInfo.details": (v13/*: any*/),
        "me.conversation.items.liveArtwork.slug": (v14/*: any*/),
        "me.conversation.items.liveArtwork.title": (v13/*: any*/),
        "me.id": (v14/*: any*/)
      }
    },
    "name": "ConversationCTA_Test_Query",
    "operationKind": "query",
    "text": "query ConversationCTA_Test_Query {\n  me {\n    conversation(id: \"1234\") {\n      ...ConversationsContext_conversation\n      ...ConversationCTA_conversation\n      id\n    }\n    id\n  }\n}\n\nfragment ConversationCTA_conversation on Conversation {\n  ...useConversationPurchaseButtonData_conversation\n  ...ConversationReviewOfferCTA_conversation\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        ...ConversationConfirmModal_artwork\n        __typename\n        internalID\n        isOfferableFromInquiry\n        isAcquireable\n        isOfferable\n        published\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  activeCollectorOrders: collectorOrdersConnection(first: 10, buyerState: [SUBMITTED, OFFER_RECEIVED, COUNTEROFFER_SENT, PAYMENT_FAILED, PROCESSING_PAYMENT, PROCESSING_OFFLINE_PAYMENT, APPROVED, SHIPPED, COMPLETED, REFUNDED]) {\n    edges {\n      node {\n        internalID\n        buyerAction\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationConfirmModal_artwork on Artwork {\n  category\n  artistNames\n  date\n  internalID\n  isEdition\n  manufacturer\n  medium\n  publisher\n  saleMessage\n  title\n  isOfferable\n  isAcquireable\n  isOfferableFromInquiry\n  attributionClass {\n    name\n    id\n  }\n  image {\n    resized(width: 40, height: 40) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  conditionDescription {\n    details\n  }\n  certificateOfAuthenticity {\n    details\n  }\n  framed {\n    details\n  }\n  dimensions {\n    in\n    cm\n  }\n  signatureInfo {\n    details\n  }\n  editionSets {\n    internalID\n    editionOf\n    isOfferableFromInquiry\n    isOfferable\n    isAcquireable\n    listPrice {\n      __typename\n      ... on Money {\n        display\n      }\n      ... on PriceRange {\n        display\n      }\n    }\n    dimensions {\n      cm\n      in\n    }\n    id\n  }\n}\n\nfragment ConversationReviewOfferCTA_conversation on Conversation {\n  internalID\n  activeCollectorOrders: collectorOrdersConnection(first: 10, buyerState: [SUBMITTED, OFFER_RECEIVED, COUNTEROFFER_SENT, PAYMENT_FAILED, PROCESSING_PAYMENT, PROCESSING_OFFLINE_PAYMENT, APPROVED, SHIPPED, COMPLETED, REFUNDED]) {\n    edges {\n      node {\n        internalID\n        buyerAction\n        buyerStateExpiresAt\n        lastSubmittedOffer {\n          createdAt\n          id\n        }\n        submittedOffers {\n          internalID\n          id\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationsContext_conversation on Conversation {\n  collectorPartnerOffersConnection(first: 10, offerType: [BULK, PERSONALIZED]) {\n    edges {\n      node {\n        artworkId\n        endAt\n        internalID\n        isAvailable\n        isPurchased\n        note\n        priceWithDiscount {\n          display\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment useConversationPurchaseButtonData_conversation on Conversation {\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        __typename\n        isAcquireable\n        isEdition\n        internalID\n        slug\n        editionSets {\n          internalID\n          id\n        }\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c4f17a8f510f4c7b928b991d223debcf";

export default node;
