/**
 * @generated SignedSource<<5d88f8156abeec4c2505a7d7488a394b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerOfferCreatedNotification_test_Query$variables = Record<PropertyKey, never>;
export type PartnerOfferCreatedNotification_test_Query$data = {
  readonly notificationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PartnerOfferCreatedNotification_notification">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type PartnerOfferCreatedNotification_test_Query = {
  response: PartnerOfferCreatedNotification_test_Query$data;
  variables: PartnerOfferCreatedNotification_test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
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
  "name": "endAt",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isAvailable",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "Money",
  "kind": "LinkedField",
  "name": "priceWithDiscount",
  "plural": false,
  "selections": (v4/*: any*/),
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v10 = [
  (v9/*: any*/),
  (v6/*: any*/)
],
v11 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v12 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v13 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v15 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Money"
},
v16 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v17 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v19 = {
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
    "name": "PartnerOfferCreatedNotification_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "NotificationConnection",
        "kind": "LinkedField",
        "name": "notificationsConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NotificationEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Notification",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "PartnerOfferCreatedNotification_notification"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "notificationsConnection(first:1)"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PartnerOfferCreatedNotification_test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "NotificationConnection",
        "kind": "LinkedField",
        "name": "notificationsConnection",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NotificationEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Notification",
                "kind": "LinkedField",
                "name": "node",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "headline",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "targetHref",
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
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PartnerOffer",
                            "kind": "LinkedField",
                            "name": "partnerOffer",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              (v2/*: any*/),
                              (v3/*: any*/),
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
                                "kind": "ScalarField",
                                "name": "source",
                                "storageKey": null
                              },
                              (v5/*: any*/),
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "PartnerOfferCreatedNotificationItem",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": "offerArtworksConnection",
                    "args": (v0/*: any*/),
                    "concreteType": "ArtworkConnection",
                    "kind": "LinkedField",
                    "name": "artworksConnection",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "ArtworkEdge",
                        "kind": "LinkedField",
                        "name": "edges",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Artwork",
                            "kind": "LinkedField",
                            "name": "node",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "slug",
                                "storageKey": null
                              },
                              (v7/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "title",
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
                                "name": "price",
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
                                    "alias": "src",
                                    "args": [
                                      {
                                        "kind": "Literal",
                                        "name": "version",
                                        "value": [
                                          "larger",
                                          "large"
                                        ]
                                      }
                                    ],
                                    "kind": "ScalarField",
                                    "name": "url",
                                    "storageKey": "url(version:[\"larger\",\"large\"])"
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
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": (v8/*: any*/),
                                "concreteType": "Partner",
                                "kind": "LinkedField",
                                "name": "partner",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Profile",
                                    "kind": "LinkedField",
                                    "name": "profile",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Image",
                                        "kind": "LinkedField",
                                        "name": "icon",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": [
                                              {
                                                "kind": "Literal",
                                                "name": "version",
                                                "value": "square140"
                                              }
                                            ],
                                            "kind": "ScalarField",
                                            "name": "url",
                                            "storageKey": "url(version:\"square140\")"
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v6/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v6/*: any*/),
                                  (v9/*: any*/),
                                  (v7/*: any*/)
                                ],
                                "storageKey": "partner(shallow:true)"
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "CollectorSignals",
                                "kind": "LinkedField",
                                "name": "collectorSignals",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "PartnerOfferToCollector",
                                    "kind": "LinkedField",
                                    "name": "partnerOffer",
                                    "plural": false,
                                    "selections": [
                                      (v3/*: any*/),
                                      (v6/*: any*/),
                                      (v2/*: any*/),
                                      (v5/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "AuctionCollectorSignals",
                                    "kind": "LinkedField",
                                    "name": "auction",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "bidCount",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "lotClosesAt",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "liveBiddingStarted",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "registrationEndsAt",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "onlineBiddingExtended",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "lotWatcherCount",
                                        "storageKey": null
                                      }
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
                                "name": "date",
                                "storageKey": null
                              },
                              {
                                "alias": "sale_message",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "saleMessage",
                                "storageKey": null
                              },
                              {
                                "alias": "cultural_maker",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "culturalMaker",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": (v8/*: any*/),
                                "concreteType": "Artist",
                                "kind": "LinkedField",
                                "name": "artist",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "ArtistTargetSupply",
                                    "kind": "LinkedField",
                                    "name": "targetSupply",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "isP1",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  (v6/*: any*/)
                                ],
                                "storageKey": "artist(shallow:true)"
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ArtworkPriceInsights",
                                "kind": "LinkedField",
                                "name": "marketPriceInsights",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "demandRank",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": (v8/*: any*/),
                                "concreteType": "Artist",
                                "kind": "LinkedField",
                                "name": "artists",
                                "plural": true,
                                "selections": [
                                  (v6/*: any*/),
                                  (v7/*: any*/),
                                  (v9/*: any*/)
                                ],
                                "storageKey": "artists(shallow:true)"
                              },
                              {
                                "alias": "collecting_institution",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "collectingInstitution",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Sale",
                                "kind": "LinkedField",
                                "name": "sale",
                                "plural": false,
                                "selections": [
                                  (v2/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "cascadingEndTimeIntervalMinutes",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "extendedBiddingIntervalMinutes",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "startAt",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": "is_auction",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isAuction",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": "is_closed",
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isClosed",
                                    "storageKey": null
                                  },
                                  (v6/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": "sale_artwork",
                                "args": null,
                                "concreteType": "SaleArtwork",
                                "kind": "LinkedField",
                                "name": "saleArtwork",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "lotID",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "lotLabel",
                                    "storageKey": null
                                  },
                                  (v2/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "extendedBiddingEndAt",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "formattedEndDateTime",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "SaleArtworkCounts",
                                    "kind": "LinkedField",
                                    "name": "counts",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": "bidder_positions",
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "bidderPositions",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": "highest_bid",
                                    "args": null,
                                    "concreteType": "SaleArtworkHighestBid",
                                    "kind": "LinkedField",
                                    "name": "highestBid",
                                    "plural": false,
                                    "selections": (v4/*: any*/),
                                    "storageKey": null
                                  },
                                  {
                                    "alias": "opening_bid",
                                    "args": null,
                                    "concreteType": "SaleArtworkOpeningBid",
                                    "kind": "LinkedField",
                                    "name": "openingBid",
                                    "plural": false,
                                    "selections": (v4/*: any*/),
                                    "storageKey": null
                                  },
                                  (v6/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v6/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isSaved",
                                "storageKey": null
                              },
                              {
                                "alias": "preview",
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
                                        "name": "version",
                                        "value": "square"
                                      }
                                    ],
                                    "kind": "ScalarField",
                                    "name": "url",
                                    "storageKey": "url(version:\"square\")"
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isInAuction",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isSavedToList",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "AttributionClass",
                                "kind": "LinkedField",
                                "name": "attributionClass",
                                "plural": false,
                                "selections": (v10/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ArtworkMedium",
                                "kind": "LinkedField",
                                "name": "mediumType",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Gene",
                                    "kind": "LinkedField",
                                    "name": "filterGene",
                                    "plural": false,
                                    "selections": (v10/*: any*/),
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": "artworksConnection(first:1)"
                  },
                  (v6/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": "notificationsConnection(first:1)"
      }
    ]
  },
  "params": {
    "cacheID": "9b1091217c8717c9fe04379baa510dfd",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "notificationsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "NotificationConnection"
        },
        "notificationsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "NotificationEdge"
        },
        "notificationsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Notification"
        },
        "notificationsConnection.edges.node.headline": (v11/*: any*/),
        "notificationsConnection.edges.node.id": (v12/*: any*/),
        "notificationsConnection.edges.node.item": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "NotificationItem"
        },
        "notificationsConnection.edges.node.item.__typename": (v11/*: any*/),
        "notificationsConnection.edges.node.item.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOffer"
        },
        "notificationsConnection.edges.node.item.partnerOffer.endAt": (v13/*: any*/),
        "notificationsConnection.edges.node.item.partnerOffer.id": (v12/*: any*/),
        "notificationsConnection.edges.node.item.partnerOffer.internalID": (v12/*: any*/),
        "notificationsConnection.edges.node.item.partnerOffer.isAvailable": (v14/*: any*/),
        "notificationsConnection.edges.node.item.partnerOffer.note": (v13/*: any*/),
        "notificationsConnection.edges.node.item.partnerOffer.priceWithDiscount": (v15/*: any*/),
        "notificationsConnection.edges.node.item.partnerOffer.priceWithDiscount.display": (v13/*: any*/),
        "notificationsConnection.edges.node.item.partnerOffer.source": {
          "enumValues": [
            "ABANDONED_ORDER",
            "SAVE"
          ],
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferSourceEnum"
        },
        "notificationsConnection.edges.node.offerArtworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.artist.id": (v12/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.artist.targetSupply.isP1": (v14/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.artistNames": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.artists.href": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.artists.id": (v12/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.artists.name": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.attributionClass.id": (v12/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.attributionClass.name": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collecting_institution": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.auction.bidCount": (v16/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.auction.liveBiddingStarted": (v17/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.auction.lotClosesAt": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.auction.lotWatcherCount": (v16/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.auction.onlineBiddingExtended": (v17/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.auction.registrationEndsAt": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.partnerOffer.endAt": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.partnerOffer.id": (v12/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.partnerOffer.isAvailable": (v14/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount": (v15/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.cultural_maker": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.date": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.href": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.id": (v12/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.image": (v18/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.image.height": (v19/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.image.src": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.image.width": (v19/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.internalID": (v12/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.isInAuction": (v14/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.isSaved": (v14/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.isSavedToList": (v17/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.mediumType.filterGene.id": (v12/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.mediumType.filterGene.name": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.partner.href": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.partner.id": (v12/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.partner.name": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.partner.profile": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Profile"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.partner.profile.icon": (v18/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.partner.profile.icon.url": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.partner.profile.id": (v12/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.preview": (v18/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.preview.url": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.price": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v19/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale.endAt": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v19/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale.id": (v12/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale.is_auction": (v14/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale.is_closed": (v14/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale.startAt": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtwork"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork.endAt": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork.highest_bid.display": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork.id": (v12/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork.lotID": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork.lotLabel": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_artwork.opening_bid.display": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.sale_message": (v13/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.slug": (v12/*: any*/),
        "notificationsConnection.edges.node.offerArtworksConnection.edges.node.title": (v13/*: any*/),
        "notificationsConnection.edges.node.targetHref": (v11/*: any*/)
      }
    },
    "name": "PartnerOfferCreatedNotification_test_Query",
    "operationKind": "query",
    "text": "query PartnerOfferCreatedNotification_test_Query {\n  notificationsConnection(first: 1) {\n    edges {\n      node {\n        ...PartnerOfferCreatedNotification_notification\n        id\n      }\n    }\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork_1ZRKfT on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...BidTimerLine_artwork\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork_1ZRKfT\n  internalID\n  href\n}\n\nfragment PartnerOfferArtwork_artwork on Artwork {\n  internalID\n  slug\n  href\n  title\n  artistNames\n  price\n  image {\n    src: url(version: [\"larger\", \"large\"])\n    width\n    height\n  }\n  partner(shallow: true) {\n    profile {\n      icon {\n        url(version: \"square140\")\n      }\n      id\n    }\n    id\n  }\n  collectorSignals {\n    partnerOffer {\n      isAvailable\n      id\n    }\n  }\n  ...Metadata_artwork\n}\n\nfragment PartnerOfferCreatedNotification_notification on Notification {\n  headline\n  targetHref\n  item {\n    __typename\n    ... on PartnerOfferCreatedNotificationItem {\n      partnerOffer {\n        internalID\n        endAt\n        isAvailable\n        note\n        source\n        priceWithDiscount {\n          display\n        }\n        id\n      }\n    }\n  }\n  offerArtworksConnection: artworksConnection(first: 1) {\n    edges {\n      node {\n        ...PartnerOfferArtwork_artwork\n        id\n      }\n    }\n  }\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isInAuction\n  isSavedToList\n  collectorSignals {\n    auction {\n      lotWatcherCount\n      lotClosesAt\n      liveBiddingStarted\n    }\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n  collectorSignals {\n    auction {\n      lotWatcherCount\n      lotClosesAt\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3f79b178b0ddab77fff8a95b5386b288";

export default node;
