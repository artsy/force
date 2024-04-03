/**
 * @generated SignedSource<<dc5f8c2a9dcbfc873250b31f9fbe421e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PartnerShowOpenedNotification_test_Query$variables = Record<PropertyKey, never>;
export type PartnerShowOpenedNotification_test_Query$data = {
  readonly notificationsConnection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"PartnerShowOpenedNotification_notification">;
      } | null | undefined;
    } | null | undefined> | null | undefined;
  } | null | undefined;
};
export type PartnerShowOpenedNotification_test_Query = {
  response: PartnerShowOpenedNotification_test_Query$data;
  variables: PartnerShowOpenedNotification_test_Query$variables;
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
  "name": "__typename",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
  "name": "internalID",
  "storageKey": null
},
v6 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v7 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v11 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v12 = [
  (v3/*: any*/),
  (v4/*: any*/)
],
v13 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "MMMM D"
  }
],
v14 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v18 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Partner"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PartnerShowOpenedNotification_test_Query",
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
                    "name": "PartnerShowOpenedNotification_notification"
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
    "name": "PartnerShowOpenedNotification_test_Query",
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "item",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              (v3/*: any*/),
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "ShowConnection",
                            "kind": "LinkedField",
                            "name": "showsConnection",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ShowEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Show",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": [
                                          {
                                            "kind": "Literal",
                                            "name": "first",
                                            "value": 2
                                          }
                                        ],
                                        "concreteType": "ArtworkConnection",
                                        "kind": "LinkedField",
                                        "name": "artworksConnection",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "kind": "InlineFragment",
                                            "selections": [
                                              {
                                                "alias": null,
                                                "args": null,
                                                "concreteType": null,
                                                "kind": "LinkedField",
                                                "name": "edges",
                                                "plural": true,
                                                "selections": [
                                                  (v1/*: any*/),
                                                  {
                                                    "alias": null,
                                                    "args": null,
                                                    "concreteType": "Artwork",
                                                    "kind": "LinkedField",
                                                    "name": "node",
                                                    "plural": false,
                                                    "selections": [
                                                      (v4/*: any*/),
                                                      {
                                                        "alias": null,
                                                        "args": null,
                                                        "kind": "ScalarField",
                                                        "name": "slug",
                                                        "storageKey": null
                                                      },
                                                      (v2/*: any*/),
                                                      (v5/*: any*/),
                                                      {
                                                        "alias": null,
                                                        "args": [
                                                          {
                                                            "kind": "Literal",
                                                            "name": "includeAll",
                                                            "value": false
                                                          }
                                                        ],
                                                        "concreteType": "Image",
                                                        "kind": "LinkedField",
                                                        "name": "image",
                                                        "plural": false,
                                                        "selections": [
                                                          {
                                                            "alias": null,
                                                            "args": null,
                                                            "kind": "ScalarField",
                                                            "name": "aspectRatio",
                                                            "storageKey": null
                                                          },
                                                          (v5/*: any*/),
                                                          {
                                                            "alias": null,
                                                            "args": null,
                                                            "kind": "ScalarField",
                                                            "name": "placeholder",
                                                            "storageKey": null
                                                          },
                                                          {
                                                            "alias": null,
                                                            "args": [
                                                              (v6/*: any*/)
                                                            ],
                                                            "kind": "ScalarField",
                                                            "name": "url",
                                                            "storageKey": "url(version:[\"larger\",\"large\"])"
                                                          },
                                                          {
                                                            "alias": null,
                                                            "args": null,
                                                            "kind": "ScalarField",
                                                            "name": "versions",
                                                            "storageKey": null
                                                          },
                                                          {
                                                            "alias": null,
                                                            "args": null,
                                                            "kind": "ScalarField",
                                                            "name": "blurhashDataURL",
                                                            "storageKey": null
                                                          },
                                                          {
                                                            "alias": null,
                                                            "args": [
                                                              (v6/*: any*/),
                                                              {
                                                                "kind": "Literal",
                                                                "name": "width",
                                                                "value": 445
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
                                                            "storageKey": "resized(version:[\"larger\",\"large\"],width:445)"
                                                          }
                                                        ],
                                                        "storageKey": "image(includeAll:false)"
                                                      },
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
                                                        "name": "imageTitle",
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
                                                        "name": "visibilityLevel",
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
                                                        "args": null,
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
                                                          (v4/*: any*/)
                                                        ],
                                                        "storageKey": null
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
                                                        "args": (v7/*: any*/),
                                                        "concreteType": "Artist",
                                                        "kind": "LinkedField",
                                                        "name": "artists",
                                                        "plural": true,
                                                        "selections": [
                                                          (v4/*: any*/),
                                                          (v2/*: any*/),
                                                          (v3/*: any*/)
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
                                                        "args": (v7/*: any*/),
                                                        "concreteType": "Partner",
                                                        "kind": "LinkedField",
                                                        "name": "partner",
                                                        "plural": false,
                                                        "selections": [
                                                          (v3/*: any*/),
                                                          (v2/*: any*/),
                                                          (v4/*: any*/)
                                                        ],
                                                        "storageKey": "partner(shallow:true)"
                                                      },
                                                      {
                                                        "alias": null,
                                                        "args": null,
                                                        "concreteType": "Sale",
                                                        "kind": "LinkedField",
                                                        "name": "sale",
                                                        "plural": false,
                                                        "selections": [
                                                          (v8/*: any*/),
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
                                                          (v4/*: any*/),
                                                          {
                                                            "alias": "is_preview",
                                                            "args": null,
                                                            "kind": "ScalarField",
                                                            "name": "isPreview",
                                                            "storageKey": null
                                                          },
                                                          {
                                                            "alias": "display_timely_at",
                                                            "args": null,
                                                            "kind": "ScalarField",
                                                            "name": "displayTimelyAt",
                                                            "storageKey": null
                                                          },
                                                          {
                                                            "alias": null,
                                                            "args": null,
                                                            "kind": "ScalarField",
                                                            "name": "extendedBiddingPeriodMinutes",
                                                            "storageKey": null
                                                          }
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
                                                          (v9/*: any*/),
                                                          {
                                                            "alias": null,
                                                            "args": null,
                                                            "kind": "ScalarField",
                                                            "name": "lotLabel",
                                                            "storageKey": null
                                                          },
                                                          (v8/*: any*/),
                                                          (v10/*: any*/),
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
                                                            "selections": (v11/*: any*/),
                                                            "storageKey": null
                                                          },
                                                          {
                                                            "alias": "opening_bid",
                                                            "args": null,
                                                            "concreteType": "SaleArtworkOpeningBid",
                                                            "kind": "LinkedField",
                                                            "name": "openingBid",
                                                            "plural": false,
                                                            "selections": (v11/*: any*/),
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
                                                        "selections": (v12/*: any*/),
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
                                                            "selections": (v12/*: any*/),
                                                            "storageKey": null
                                                          }
                                                        ],
                                                        "storageKey": null
                                                      },
                                                      {
                                                        "alias": "is_biddable",
                                                        "args": null,
                                                        "kind": "ScalarField",
                                                        "name": "isBiddable",
                                                        "storageKey": null
                                                      },
                                                      {
                                                        "alias": null,
                                                        "args": null,
                                                        "concreteType": "SaleArtwork",
                                                        "kind": "LinkedField",
                                                        "name": "saleArtwork",
                                                        "plural": false,
                                                        "selections": [
                                                          (v8/*: any*/),
                                                          (v10/*: any*/),
                                                          (v9/*: any*/),
                                                          (v4/*: any*/)
                                                        ],
                                                        "storageKey": null
                                                      },
                                                      {
                                                        "alias": "image_title",
                                                        "args": null,
                                                        "kind": "ScalarField",
                                                        "name": "imageTitle",
                                                        "storageKey": null
                                                      }
                                                    ],
                                                    "storageKey": null
                                                  },
                                                  {
                                                    "kind": "InlineFragment",
                                                    "selections": [
                                                      (v4/*: any*/)
                                                    ],
                                                    "type": "Node",
                                                    "abstractKey": "__isNode"
                                                  }
                                                ],
                                                "storageKey": null
                                              }
                                            ],
                                            "type": "ArtworkConnectionInterface",
                                            "abstractKey": "__isArtworkConnectionInterface"
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "totalCount",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": "artworksConnection(first:2)"
                                      },
                                      (v2/*: any*/),
                                      (v5/*: any*/),
                                      (v4/*: any*/),
                                      {
                                        "alias": null,
                                        "args": (v13/*: any*/),
                                        "kind": "ScalarField",
                                        "name": "startAt",
                                        "storageKey": "startAt(format:\"MMMM D\")"
                                      },
                                      {
                                        "alias": null,
                                        "args": (v13/*: any*/),
                                        "kind": "ScalarField",
                                        "name": "endAt",
                                        "storageKey": "endAt(format:\"MMMM D\")"
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
                        "type": "ShowOpenedNotificationItem",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "available",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "expiresAt",
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "notificationType",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "RELATIVE"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "publishedAt",
                    "storageKey": "publishedAt(format:\"RELATIVE\")"
                  },
                  (v4/*: any*/)
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
    "cacheID": "8cde3a3e755e04f32a43ba5f25be9688",
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
        "notificationsConnection.edges.node.headline": (v14/*: any*/),
        "notificationsConnection.edges.node.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "NotificationItem"
        },
        "notificationsConnection.edges.node.item.__typename": (v14/*: any*/),
        "notificationsConnection.edges.node.item.available": (v16/*: any*/),
        "notificationsConnection.edges.node.item.expiresAt": (v17/*: any*/),
        "notificationsConnection.edges.node.item.partner": (v18/*: any*/),
        "notificationsConnection.edges.node.item.partner.href": (v17/*: any*/),
        "notificationsConnection.edges.node.item.partner.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item.partner.name": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ShowConnection"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ShowEdge"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.__isArtworkConnectionInterface": (v14/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdgeInterface"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.__isNode": (v14/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.__typename": (v14/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.artist.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.artist.targetSupply.isP1": (v16/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.artistNames": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.artists.href": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.artists.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.artists.name": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.attributionClass.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.attributionClass.name": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.collecting_institution": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.cultural_maker": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.date": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.href": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image": (v19/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image.blurhashDataURL": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image.placeholder": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image.resized.height": (v20/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image.resized.src": (v14/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image.resized.srcSet": (v14/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image.resized.width": (v20/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image.url": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.imageTitle": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.image_title": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.internalID": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.isSaved": (v16/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.isSavedToList": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.is_biddable": (v16/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.mediumType.filterGene.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.mediumType.filterGene.name": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.partner": (v18/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.partner.href": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.partner.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.partner.name": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.preview": (v19/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.preview.url": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale.cascadingEndTimeIntervalMinutes": (v20/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale.display_timely_at": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale.endAt": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale.extendedBiddingIntervalMinutes": (v20/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale.extendedBiddingPeriodMinutes": (v20/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale.is_auction": (v16/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale.is_closed": (v16/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale.is_preview": (v16/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale.startAt": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.saleArtwork": (v21/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.saleArtwork.endAt": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.saleArtwork.extendedBiddingEndAt": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.saleArtwork.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.saleArtwork.lotID": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork": (v21/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork.counts.bidder_positions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork.endAt": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork.extendedBiddingEndAt": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork.formattedEndDateTime": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork.highest_bid.display": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork.lotID": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork.lotLabel": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_artwork.opening_bid.display": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.sale_message": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.slug": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.title": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.edges.node.visibilityLevel": {
          "enumValues": [
            "LISTED",
            "UNLISTED"
          ],
          "nullable": true,
          "plural": false,
          "type": "Visibility"
        },
        "notificationsConnection.edges.node.item.showsConnection.edges.node.artworksConnection.totalCount": (v20/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.endAt": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.href": (v17/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.id": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.internalID": (v15/*: any*/),
        "notificationsConnection.edges.node.item.showsConnection.edges.node.startAt": (v17/*: any*/),
        "notificationsConnection.edges.node.notificationType": {
          "enumValues": [
            "ARTICLE_FEATURED_ARTIST",
            "ARTWORK_ALERT",
            "ARTWORK_PUBLISHED",
            "PARTNER_OFFER_CREATED",
            "PARTNER_SHOW_OPENED",
            "VIEWING_ROOM_PUBLISHED"
          ],
          "nullable": false,
          "plural": false,
          "type": "NotificationTypesEnum"
        },
        "notificationsConnection.edges.node.publishedAt": (v14/*: any*/)
      }
    },
    "name": "PartnerShowOpenedNotification_test_Query",
    "operationKind": "query",
    "text": "query PartnerShowOpenedNotification_test_Query {\n  notificationsConnection(first: 1) {\n    edges {\n      node {\n        ...PartnerShowOpenedNotification_notification\n        id\n      }\n    }\n  }\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork\n      ...FlatGridItem_artwork\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment Badge_artwork on Artwork {\n  is_biddable: isBiddable\n  href\n  sale {\n    is_preview: isPreview\n    display_timely_at: displayTimelyAt\n    id\n  }\n}\n\nfragment DeprecatedSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  visibilityLevel\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...SaveButton_artwork\n  ...SaveArtworkToListsButton_artwork\n  ...HoverDetails_artwork\n}\n\nfragment FlatGridItem_artwork on Artwork {\n  ...Metadata_artwork\n  ...DeprecatedSaveButton_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    blurhashDataURL\n  }\n  artistNames\n  href\n  isSaved\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n    blurhashDataURL\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...Badge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n}\n\nfragment NotificationTypeLabel_notification on Notification {\n  notificationType\n  publishedAt(format: \"RELATIVE\")\n  item {\n    __typename\n    ... on PartnerOfferCreatedNotificationItem {\n      available\n      expiresAt\n    }\n    ... on ShowOpenedNotificationItem {\n      showsConnection {\n        edges {\n          node {\n            startAt(format: \"MMMM D\")\n            endAt(format: \"MMMM D\")\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment PartnerShowOpenedNotification_notification on Notification {\n  headline\n  item {\n    __typename\n    ... on ShowOpenedNotificationItem {\n      partner {\n        href\n        name\n        id\n      }\n      showsConnection {\n        edges {\n          node {\n            artworksConnection(first: 2) {\n              ...ArtworkGrid_artworks\n              totalCount\n            }\n            href\n            internalID\n            id\n          }\n        }\n      }\n    }\n  }\n  notificationType\n  ...NotificationTypeLabel_notification\n}\n\nfragment SaveArtworkToListsButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  isSaved\n  title\n}\n"
  }
};
})();

(node as any).hash = "8d8700044d4860bc59239aad6b0e5d95";

export default node;
