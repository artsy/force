/**
 * @generated SignedSource<<611da6f92c9be0f11b92570c47922ddf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SaleArtworks_Test_Query$variables = Record<PropertyKey, never>;
export type SaleArtworks_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"SaleArtworksFilter_viewer">;
  } | null | undefined;
};
export type SaleArtworks_Test_Query = {
  response: SaleArtworks_Test_Query$data;
  variables: SaleArtworks_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v3 = [
  (v1/*: any*/),
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
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
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v8 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v9 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v13 = [
  (v10/*: any*/),
  (v0/*: any*/)
],
v14 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FilterArtworksConnection"
},
v15 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v16 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FilterArtworksCounts"
},
v17 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v18 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v20 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v21 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v22 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SaleArtworks_Test_Query",
    "selections": [
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
            "name": "SaleArtworksFilter_viewer"
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
    "name": "SaleArtworks_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": "filtered_artworks",
            "args": null,
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Literal",
                        "name": "format",
                        "value": "0,0"
                      }
                    ],
                    "kind": "ScalarField",
                    "name": "total",
                    "storageKey": "total(format:\"0,0\")"
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageCursors",
                "kind": "LinkedField",
                "name": "pageCursors",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "around",
                    "plural": true,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v3/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "previous",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksEdge",
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
                            "kind": "ScalarField",
                            "name": "primaryLabel",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Artwork",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          (v4/*: any*/),
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
                            "concreteType": "CollectorSignals",
                            "kind": "LinkedField",
                            "name": "collectorSignals",
                            "plural": false,
                            "selections": [
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
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "PartnerOfferToCollector",
                                "kind": "LinkedField",
                                "name": "partnerOffer",
                                "plural": false,
                                "selections": [
                                  (v7/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Money",
                                    "kind": "LinkedField",
                                    "name": "priceWithDiscount",
                                    "plural": false,
                                    "selections": (v8/*: any*/),
                                    "storageKey": null
                                  },
                                  (v0/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
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
                            "args": (v9/*: any*/),
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
                              (v0/*: any*/)
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
                            "args": (v9/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v0/*: any*/),
                              (v4/*: any*/),
                              (v10/*: any*/)
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
                            "args": (v9/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v10/*: any*/),
                              (v4/*: any*/),
                              (v0/*: any*/)
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
                              (v7/*: any*/),
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
                              (v0/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isOpen",
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
                              (v11/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotLabel",
                                "storageKey": null
                              },
                              (v7/*: any*/),
                              (v12/*: any*/),
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
                                "selections": (v8/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v8/*: any*/),
                                "storageKey": null
                              },
                              (v0/*: any*/)
                            ],
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
                              (v11/*: any*/),
                              (v0/*: any*/),
                              (v7/*: any*/),
                              (v12/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AttributionClass",
                            "kind": "LinkedField",
                            "name": "attributionClass",
                            "plural": false,
                            "selections": (v13/*: any*/),
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
                                "selections": (v13/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "isUnlisted",
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
                          (v0/*: any*/)
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
              }
            ],
            "storageKey": null
          },
          {
            "alias": "sidebarAggregations",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "followedArtists",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "ArtworksAggregationResults",
                "kind": "LinkedField",
                "name": "aggregations",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slice",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AggregationCount",
                    "kind": "LinkedField",
                    "name": "counts",
                    "plural": true,
                    "selections": [
                      (v10/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": "artworksConnection(first:1)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b5ae260febf38946c6051435ff458b14",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.filtered_artworks": (v14/*: any*/),
        "viewer.filtered_artworks.__isArtworkConnectionInterface": (v15/*: any*/),
        "viewer.filtered_artworks.counts": (v16/*: any*/),
        "viewer.filtered_artworks.counts.total": (v17/*: any*/),
        "viewer.filtered_artworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdgeInterface"
        },
        "viewer.filtered_artworks.edges.__isNode": (v15/*: any*/),
        "viewer.filtered_artworks.edges.__typename": (v15/*: any*/),
        "viewer.filtered_artworks.edges.id": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "viewer.filtered_artworks.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "viewer.filtered_artworks.edges.node.artist.id": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "viewer.filtered_artworks.edges.node.artist.targetSupply.isP1": (v19/*: any*/),
        "viewer.filtered_artworks.edges.node.artistNames": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "viewer.filtered_artworks.edges.node.artists.href": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.artists.id": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node.artists.name": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "viewer.filtered_artworks.edges.node.attributionClass.id": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node.attributionClass.name": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.collecting_institution": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "viewer.filtered_artworks.edges.node.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "viewer.filtered_artworks.edges.node.collectorSignals.auction.bidCount": (v21/*: any*/),
        "viewer.filtered_artworks.edges.node.collectorSignals.auction.liveBiddingStarted": (v22/*: any*/),
        "viewer.filtered_artworks.edges.node.collectorSignals.auction.lotClosesAt": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.collectorSignals.auction.onlineBiddingExtended": (v22/*: any*/),
        "viewer.filtered_artworks.edges.node.collectorSignals.auction.registrationEndsAt": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "viewer.filtered_artworks.edges.node.collectorSignals.partnerOffer.endAt": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.collectorSignals.partnerOffer.id": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "viewer.filtered_artworks.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "viewer.filtered_artworks.edges.node.cultural_maker": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.date": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.href": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.id": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "viewer.filtered_artworks.edges.node.image.aspectRatio": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Float"
        },
        "viewer.filtered_artworks.edges.node.image.blurhashDataURL": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.image.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "viewer.filtered_artworks.edges.node.image.placeholder": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "viewer.filtered_artworks.edges.node.image.resized.height": (v23/*: any*/),
        "viewer.filtered_artworks.edges.node.image.resized.src": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.image.resized.srcSet": (v15/*: any*/),
        "viewer.filtered_artworks.edges.node.image.resized.width": (v23/*: any*/),
        "viewer.filtered_artworks.edges.node.image.url": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.image.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "viewer.filtered_artworks.edges.node.imageTitle": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.image_title": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.internalID": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node.isUnlisted": (v22/*: any*/),
        "viewer.filtered_artworks.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "viewer.filtered_artworks.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "viewer.filtered_artworks.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "viewer.filtered_artworks.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "viewer.filtered_artworks.edges.node.mediumType.filterGene.id": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node.mediumType.filterGene.name": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "viewer.filtered_artworks.edges.node.partner.href": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.partner.id": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node.partner.name": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "viewer.filtered_artworks.edges.node.sale.cascadingEndTimeIntervalMinutes": (v23/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.endAt": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.extendedBiddingIntervalMinutes": (v23/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.extendedBiddingPeriodMinutes": (v23/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.id": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.isOpen": (v19/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.is_auction": (v19/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.is_closed": (v19/*: any*/),
        "viewer.filtered_artworks.edges.node.sale.startAt": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.saleArtwork": (v24/*: any*/),
        "viewer.filtered_artworks.edges.node.saleArtwork.endAt": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.saleArtwork.extendedBiddingEndAt": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.saleArtwork.id": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node.saleArtwork.lotID": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork": (v24/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "viewer.filtered_artworks.edges.node.sale_artwork.counts.bidder_positions": (v17/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.endAt": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.extendedBiddingEndAt": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.formattedEndDateTime": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "viewer.filtered_artworks.edges.node.sale_artwork.highest_bid.display": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.id": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.lotID": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.lotLabel": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "viewer.filtered_artworks.edges.node.sale_artwork.opening_bid.display": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.sale_message": (v20/*: any*/),
        "viewer.filtered_artworks.edges.node.slug": (v18/*: any*/),
        "viewer.filtered_artworks.edges.node.title": (v20/*: any*/),
        "viewer.filtered_artworks.id": (v18/*: any*/),
        "viewer.filtered_artworks.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "viewer.filtered_artworks.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "viewer.filtered_artworks.pageCursors.around.cursor": (v15/*: any*/),
        "viewer.filtered_artworks.pageCursors.around.isCurrent": (v22/*: any*/),
        "viewer.filtered_artworks.pageCursors.around.page": (v21/*: any*/),
        "viewer.filtered_artworks.pageCursors.first": (v25/*: any*/),
        "viewer.filtered_artworks.pageCursors.first.cursor": (v15/*: any*/),
        "viewer.filtered_artworks.pageCursors.first.isCurrent": (v22/*: any*/),
        "viewer.filtered_artworks.pageCursors.first.page": (v21/*: any*/),
        "viewer.filtered_artworks.pageCursors.last": (v25/*: any*/),
        "viewer.filtered_artworks.pageCursors.last.cursor": (v15/*: any*/),
        "viewer.filtered_artworks.pageCursors.last.isCurrent": (v22/*: any*/),
        "viewer.filtered_artworks.pageCursors.last.page": (v21/*: any*/),
        "viewer.filtered_artworks.pageCursors.previous": (v25/*: any*/),
        "viewer.filtered_artworks.pageCursors.previous.cursor": (v15/*: any*/),
        "viewer.filtered_artworks.pageCursors.previous.page": (v21/*: any*/),
        "viewer.filtered_artworks.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "viewer.filtered_artworks.pageInfo.endCursor": (v20/*: any*/),
        "viewer.filtered_artworks.pageInfo.hasNextPage": (v22/*: any*/),
        "viewer.sidebarAggregations": (v14/*: any*/),
        "viewer.sidebarAggregations.aggregations": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworksAggregationResults"
        },
        "viewer.sidebarAggregations.aggregations.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AggregationCount"
        },
        "viewer.sidebarAggregations.aggregations.counts.count": (v21/*: any*/),
        "viewer.sidebarAggregations.aggregations.counts.name": (v15/*: any*/),
        "viewer.sidebarAggregations.aggregations.counts.value": (v15/*: any*/),
        "viewer.sidebarAggregations.aggregations.slice": {
          "enumValues": [
            "ARTIST",
            "ARTIST_NATIONALITY",
            "ARTIST_SERIES",
            "ATTRIBUTION_CLASS",
            "COLOR",
            "DIMENSION_RANGE",
            "FOLLOWED_ARTISTS",
            "GALLERY",
            "INSTITUTION",
            "LOCATION_CITY",
            "MAJOR_PERIOD",
            "MATERIALS_TERMS",
            "MEDIUM",
            "MERCHANDISABLE_ARTISTS",
            "PARTNER",
            "PARTNER_CITY",
            "PERIOD",
            "PRICE_RANGE",
            "SIMPLE_PRICE_HISTOGRAM",
            "TOTAL"
          ],
          "nullable": true,
          "plural": false,
          "type": "ArtworkAggregation"
        },
        "viewer.sidebarAggregations.counts": (v16/*: any*/),
        "viewer.sidebarAggregations.counts.followedArtists": (v17/*: any*/),
        "viewer.sidebarAggregations.id": (v18/*: any*/)
      }
    },
    "name": "SaleArtworks_Test_Query",
    "operationKind": "query",
    "text": "query SaleArtworks_Test_Query {\n  viewer {\n    ...SaleArtworksFilter_viewer\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {\n  id\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      collectorSignals {\n        primaryLabel\n      }\n      id\n    }\n  }\n  ...ArtworkGrid_artworks_3QDGWC\n}\n\nfragment ArtworkGrid_artworks_3QDGWC on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork_3QDGWC\n      ...FlatGridItem_artwork_13vYwd\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork_1ZRKfT on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment FlatGridItem_artwork_13vYwd on Artwork {\n  ...Metadata_artwork_1ZRKfT\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    isOpen\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n    blurhashDataURL\n  }\n  artistNames\n  href\n}\n\nfragment GridItem_artwork_3QDGWC on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n    blurhashDataURL\n  }\n  artistNames\n  href\n  ...Metadata_artwork_1ZRKfT\n  ...ExclusiveAccessBadge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork_1ZRKfT on Artwork {\n  ...Details_artwork_1ZRKfT\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  collectorSignals {\n    primaryLabel\n  }\n}\n\nfragment SaleArtworksFilter_viewer on Viewer {\n  filtered_artworks: artworksConnection {\n    id\n    counts {\n      total(format: \"0,0\")\n    }\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n  }\n  sidebarAggregations: artworksConnection(first: 1) {\n    counts {\n      followedArtists\n    }\n    aggregations {\n      slice\n      counts {\n        name\n        value\n        count\n      }\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "478684311f10b0f7c51316909e971c71";

export default node;
