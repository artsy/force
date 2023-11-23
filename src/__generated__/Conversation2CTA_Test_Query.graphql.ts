/**
 * @generated SignedSource<<6737273082796eaebaac0b0ef592b298>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Conversation2CTA_Test_Query$variables = Record<PropertyKey, never>;
export type Conversation2CTA_Test_Query$data = {
  readonly me: {
    readonly conversation: {
      readonly " $fragmentSpreads": FragmentRefs<"Conversation2CTA_conversation">;
    } | null | undefined;
  } | null | undefined;
};
export type Conversation2CTA_Test_Query = {
  response: Conversation2CTA_Test_Query$data;
  variables: Conversation2CTA_Test_Query$variables;
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
  "type": "CommerceOrderConnectionWithTotalCount"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "CommerceOrderEdge"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOrder"
},
v21 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v22 = {
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
v23 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOfferConnection"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "CommerceOfferEdge"
},
v26 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CommerceOffer"
},
v27 = {
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
v28 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v29 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ConversationItemType"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ArtworkInfoRow"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "dimensions"
},
v32 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v33 = {
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
    "name": "Conversation2CTA_Test_Query",
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
                "name": "Conversation2CTA_conversation"
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
    "name": "Conversation2CTA_Test_Query",
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
      }
    ]
  },
  "params": {
    "cacheID": "55b3948774b765359e24046895a112cc",
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
        "me.conversation.activeOrderCTA": (v18/*: any*/),
        "me.conversation.activeOrderCTA.edges": (v19/*: any*/),
        "me.conversation.activeOrderCTA.edges.node": (v20/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.__typename": (v21/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.buyerAction": (v22/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.id": (v23/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.internalID": (v23/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.offers": (v24/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.offers.edges": (v25/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.offers.edges.node": (v26/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.offers.edges.node.id": (v23/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.offers.edges.node.internalID": (v23/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.state": (v27/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.stateExpiresAt": (v28/*: any*/),
        "me.conversation.activeOrderCTA.edges.node.stateReason": (v28/*: any*/),
        "me.conversation.activeOrders": (v18/*: any*/),
        "me.conversation.activeOrders.edges": (v19/*: any*/),
        "me.conversation.activeOrders.edges.node": (v20/*: any*/),
        "me.conversation.activeOrders.edges.node.__typename": (v21/*: any*/),
        "me.conversation.activeOrders.edges.node.buyerAction": (v22/*: any*/),
        "me.conversation.activeOrders.edges.node.id": (v23/*: any*/),
        "me.conversation.activeOrders.edges.node.internalID": (v23/*: any*/),
        "me.conversation.activeOrders.edges.node.lastOffer": (v26/*: any*/),
        "me.conversation.activeOrders.edges.node.lastOffer.createdAt": (v21/*: any*/),
        "me.conversation.activeOrders.edges.node.lastOffer.id": (v23/*: any*/),
        "me.conversation.activeOrders.edges.node.offers": (v24/*: any*/),
        "me.conversation.activeOrders.edges.node.offers.edges": (v25/*: any*/),
        "me.conversation.activeOrders.edges.node.offers.edges.node": (v26/*: any*/),
        "me.conversation.activeOrders.edges.node.offers.edges.node.id": (v23/*: any*/),
        "me.conversation.activeOrders.edges.node.offers.edges.node.internalID": (v23/*: any*/),
        "me.conversation.activeOrders.edges.node.state": (v27/*: any*/),
        "me.conversation.activeOrders.edges.node.stateExpiresAt": (v28/*: any*/),
        "me.conversation.activeOrders.edges.node.stateReason": (v28/*: any*/),
        "me.conversation.id": (v23/*: any*/),
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
        "me.conversation.items.item": (v29/*: any*/),
        "me.conversation.items.item.__isNode": (v21/*: any*/),
        "me.conversation.items.item.__typename": (v21/*: any*/),
        "me.conversation.items.item.id": (v23/*: any*/),
        "me.conversation.items.item.internalID": (v23/*: any*/),
        "me.conversation.items.liveArtwork": (v29/*: any*/),
        "me.conversation.items.liveArtwork.__isNode": (v21/*: any*/),
        "me.conversation.items.liveArtwork.__typename": (v21/*: any*/),
        "me.conversation.items.liveArtwork.artistNames": (v28/*: any*/),
        "me.conversation.items.liveArtwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "me.conversation.items.liveArtwork.attributionClass.id": (v23/*: any*/),
        "me.conversation.items.liveArtwork.attributionClass.name": (v28/*: any*/),
        "me.conversation.items.liveArtwork.category": (v28/*: any*/),
        "me.conversation.items.liveArtwork.certificateOfAuthenticity": (v30/*: any*/),
        "me.conversation.items.liveArtwork.certificateOfAuthenticity.details": (v28/*: any*/),
        "me.conversation.items.liveArtwork.conditionDescription": (v30/*: any*/),
        "me.conversation.items.liveArtwork.conditionDescription.details": (v28/*: any*/),
        "me.conversation.items.liveArtwork.date": (v28/*: any*/),
        "me.conversation.items.liveArtwork.dimensions": (v31/*: any*/),
        "me.conversation.items.liveArtwork.dimensions.cm": (v28/*: any*/),
        "me.conversation.items.liveArtwork.dimensions.in": (v28/*: any*/),
        "me.conversation.items.liveArtwork.editionSets": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "EditionSet"
        },
        "me.conversation.items.liveArtwork.editionSets.dimensions": (v31/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.dimensions.cm": (v28/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.dimensions.in": (v28/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.editionOf": (v28/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.id": (v23/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.internalID": (v23/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.isAcquireable": (v32/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.isOfferable": (v32/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.isOfferableFromInquiry": (v32/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.listPrice": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ListPrice"
        },
        "me.conversation.items.liveArtwork.editionSets.listPrice.__typename": (v21/*: any*/),
        "me.conversation.items.liveArtwork.editionSets.listPrice.display": (v28/*: any*/),
        "me.conversation.items.liveArtwork.framed": (v30/*: any*/),
        "me.conversation.items.liveArtwork.framed.details": (v28/*: any*/),
        "me.conversation.items.liveArtwork.id": (v23/*: any*/),
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
        "me.conversation.items.liveArtwork.image.resized.height": (v33/*: any*/),
        "me.conversation.items.liveArtwork.image.resized.src": (v21/*: any*/),
        "me.conversation.items.liveArtwork.image.resized.srcSet": (v21/*: any*/),
        "me.conversation.items.liveArtwork.image.resized.width": (v33/*: any*/),
        "me.conversation.items.liveArtwork.internalID": (v23/*: any*/),
        "me.conversation.items.liveArtwork.isAcquireable": (v32/*: any*/),
        "me.conversation.items.liveArtwork.isEdition": (v32/*: any*/),
        "me.conversation.items.liveArtwork.isOfferable": (v32/*: any*/),
        "me.conversation.items.liveArtwork.isOfferableFromInquiry": (v32/*: any*/),
        "me.conversation.items.liveArtwork.manufacturer": (v28/*: any*/),
        "me.conversation.items.liveArtwork.medium": (v28/*: any*/),
        "me.conversation.items.liveArtwork.publisher": (v28/*: any*/),
        "me.conversation.items.liveArtwork.saleMessage": (v28/*: any*/),
        "me.conversation.items.liveArtwork.signatureInfo": (v30/*: any*/),
        "me.conversation.items.liveArtwork.signatureInfo.details": (v28/*: any*/),
        "me.conversation.items.liveArtwork.slug": (v23/*: any*/),
        "me.conversation.items.liveArtwork.title": (v28/*: any*/),
        "me.id": (v23/*: any*/)
      }
    },
    "name": "Conversation2CTA_Test_Query",
    "operationKind": "query",
    "text": "query Conversation2CTA_Test_Query {\n  me {\n    conversation(id: \"1234\") {\n      ...Conversation2CTA_conversation\n      id\n    }\n    id\n  }\n}\n\nfragment ConfirmArtworkButton_artwork on Artwork {\n  internalID\n}\n\nfragment Conversation2CTA_conversation on Conversation {\n  ...useConversationPurchaseButtonData_conversation\n  ...ConversationReviewOfferCTA_conversation\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        ...ConversationConfirmModal_artwork\n        __typename\n        isOfferableFromInquiry\n        isAcquireable\n        isOfferable\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n    item {\n      __typename\n      ... on Artwork {\n        internalID\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n  activeOrderCTA: orderConnection(first: 10, states: [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]) {\n    edges {\n      node {\n        __typename\n        internalID\n        state\n        stateReason\n        stateExpiresAt\n        ... on CommerceOfferOrder {\n          buyerAction\n          offers(first: 5) {\n            edges {\n              node {\n                internalID\n                id\n              }\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment ConversationConfirmModal_artwork on Artwork {\n  category\n  artistNames\n  date\n  internalID\n  isEdition\n  manufacturer\n  medium\n  publisher\n  saleMessage\n  title\n  isOfferable\n  isAcquireable\n  isOfferableFromInquiry\n  attributionClass {\n    name\n    id\n  }\n  image {\n    resized(width: 40, height: 40) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  conditionDescription {\n    details\n  }\n  certificateOfAuthenticity {\n    details\n  }\n  framed {\n    details\n  }\n  dimensions {\n    in\n    cm\n  }\n  signatureInfo {\n    details\n  }\n  editionSets {\n    internalID\n    editionOf\n    isOfferableFromInquiry\n    isOfferable\n    isAcquireable\n    listPrice {\n      __typename\n      ... on Money {\n        display\n      }\n      ... on PriceRange {\n        display\n      }\n    }\n    dimensions {\n      cm\n      in\n    }\n    id\n  }\n}\n\nfragment ConversationReviewOfferCTA_conversation on Conversation {\n  internalID\n  activeOrders: orderConnection(first: 1, states: [APPROVED, PROCESSING_APPROVAL, FULFILLED, SUBMITTED, REFUNDED]) {\n    edges {\n      node {\n        __typename\n        internalID\n        state\n        stateReason\n        stateExpiresAt\n        ... on CommerceOfferOrder {\n          buyerAction\n          lastOffer {\n            createdAt\n            id\n          }\n          offers(first: 5) {\n            edges {\n              node {\n                internalID\n                id\n              }\n            }\n          }\n        }\n        id\n      }\n    }\n  }\n}\n\nfragment useConversationPurchaseButtonData_conversation on Conversation {\n  internalID\n  items {\n    liveArtwork {\n      __typename\n      ... on Artwork {\n        __typename\n        isAcquireable\n        isEdition\n        internalID\n        slug\n        editionSets {\n          internalID\n          id\n        }\n        ...ConfirmArtworkButton_artwork\n      }\n      ... on Node {\n        __isNode: __typename\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6fad1a57da19026cd9d3ef8369e45671";

export default node;
