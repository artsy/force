/**
 * @generated SignedSource<<a701d3208cbd1afdce8caac30f0fd115>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowArtworks_Test_Query$variables = Record<PropertyKey, never>;
export type ShowArtworks_Test_Query$data = {
  readonly show: {
    readonly " $fragmentSpreads": FragmentRefs<"ShowArtworks_show">;
  } | null | undefined;
};
export type ShowArtworks_Test_Query = {
  response: ShowArtworks_Test_Query$data;
  variables: ShowArtworks_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "catty-show"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  (v4/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v6 = [
  (v2/*: any*/)
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "aspectRatio",
  "storageKey": null
},
v9 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "larger",
    "large"
  ]
},
v10 = {
  "alias": null,
  "args": [
    (v9/*: any*/)
  ],
  "kind": "ScalarField",
  "name": "url",
  "storageKey": "url(version:[\"larger\",\"large\"])"
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "endAt",
  "storageKey": null
},
v14 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "display",
    "storageKey": null
  }
],
v15 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotID",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "extendedBiddingEndAt",
  "storageKey": null
},
v18 = [
  (v1/*: any*/),
  (v2/*: any*/)
],
v19 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FilterArtworksConnection"
},
v20 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v21 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "FormattedNumber"
},
v22 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v23 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artwork"
},
v24 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v25 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v26 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Float"
},
v27 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v28 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v29 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v30 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v31 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "SaleArtwork"
},
v32 = {
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
    "name": "ShowArtworks_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ShowArtworks_show"
          }
        ],
        "storageKey": "show(id:\"catty-show\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ShowArtworks_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Show",
        "kind": "LinkedField",
        "name": "show",
        "plural": false,
        "selections": [
          {
            "alias": "sidebar",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
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
                      (v1/*: any*/),
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
              (v2/*: any*/)
            ],
            "storageKey": "filterArtworksConnection(first:1)"
          },
          {
            "alias": "filtered_artworks",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 30
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "filterArtworksConnection",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v5/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v5/*: any*/),
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
                      (v3/*: any*/),
                      (v4/*: any*/)
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
                    "selections": (v6/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": "immersiveArtworkNode",
                    "args": null,
                    "concreteType": "Artwork",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v7/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "formattedMetadata",
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
                          (v8/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "blurhash",
                            "storageKey": null
                          },
                          (v10/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
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
                          (v7/*: any*/),
                          (v11/*: any*/),
                          (v12/*: any*/),
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
                              (v8/*: any*/),
                              (v12/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "placeholder",
                                "storageKey": null
                              },
                              (v10/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "versions",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": [
                                  (v9/*: any*/),
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
                                "kind": "ScalarField",
                                "name": "primaryLabel",
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
                                  (v13/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "Money",
                                    "kind": "LinkedField",
                                    "name": "priceWithDiscount",
                                    "plural": false,
                                    "selections": (v14/*: any*/),
                                    "storageKey": null
                                  },
                                  (v2/*: any*/)
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
                            "args": (v15/*: any*/),
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
                              (v2/*: any*/)
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
                            "args": (v15/*: any*/),
                            "concreteType": "Artist",
                            "kind": "LinkedField",
                            "name": "artists",
                            "plural": true,
                            "selections": [
                              (v2/*: any*/),
                              (v11/*: any*/),
                              (v1/*: any*/)
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
                            "args": (v15/*: any*/),
                            "concreteType": "Partner",
                            "kind": "LinkedField",
                            "name": "partner",
                            "plural": false,
                            "selections": [
                              (v1/*: any*/),
                              (v11/*: any*/),
                              (v2/*: any*/)
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
                              (v13/*: any*/),
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
                              (v2/*: any*/),
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
                              (v16/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "lotLabel",
                                "storageKey": null
                              },
                              (v13/*: any*/),
                              (v17/*: any*/),
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
                                "selections": (v14/*: any*/),
                                "storageKey": null
                              },
                              {
                                "alias": "opening_bid",
                                "args": null,
                                "concreteType": "SaleArtworkOpeningBid",
                                "kind": "LinkedField",
                                "name": "openingBid",
                                "plural": false,
                                "selections": (v14/*: any*/),
                                "storageKey": null
                              },
                              (v2/*: any*/)
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
                              (v16/*: any*/),
                              (v2/*: any*/),
                              (v13/*: any*/),
                              (v17/*: any*/)
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
                            "selections": (v18/*: any*/),
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
                                "selections": (v18/*: any*/),
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
                        "selections": (v6/*: any*/),
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
            "storageKey": "filterArtworksConnection(first:30)"
          },
          (v2/*: any*/)
        ],
        "storageKey": "show(id:\"catty-show\")"
      }
    ]
  },
  "params": {
    "cacheID": "b418454c1d27b5faf672331f200b3c31",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "show": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Show"
        },
        "show.filtered_artworks": (v19/*: any*/),
        "show.filtered_artworks.__isArtworkConnectionInterface": (v20/*: any*/),
        "show.filtered_artworks.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksCounts"
        },
        "show.filtered_artworks.counts.total": (v21/*: any*/),
        "show.filtered_artworks.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdgeInterface"
        },
        "show.filtered_artworks.edges.__isNode": (v20/*: any*/),
        "show.filtered_artworks.edges.__typename": (v20/*: any*/),
        "show.filtered_artworks.edges.id": (v22/*: any*/),
        "show.filtered_artworks.edges.immersiveArtworkNode": (v23/*: any*/),
        "show.filtered_artworks.edges.immersiveArtworkNode.formattedMetadata": (v24/*: any*/),
        "show.filtered_artworks.edges.immersiveArtworkNode.id": (v22/*: any*/),
        "show.filtered_artworks.edges.immersiveArtworkNode.image": (v25/*: any*/),
        "show.filtered_artworks.edges.immersiveArtworkNode.image.aspectRatio": (v26/*: any*/),
        "show.filtered_artworks.edges.immersiveArtworkNode.image.blurhash": (v24/*: any*/),
        "show.filtered_artworks.edges.immersiveArtworkNode.image.url": (v24/*: any*/),
        "show.filtered_artworks.edges.immersiveArtworkNode.slug": (v22/*: any*/),
        "show.filtered_artworks.edges.node": (v23/*: any*/),
        "show.filtered_artworks.edges.node.artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "show.filtered_artworks.edges.node.artist.id": (v22/*: any*/),
        "show.filtered_artworks.edges.node.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "show.filtered_artworks.edges.node.artist.targetSupply.isP1": (v27/*: any*/),
        "show.filtered_artworks.edges.node.artistNames": (v24/*: any*/),
        "show.filtered_artworks.edges.node.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "show.filtered_artworks.edges.node.artists.href": (v24/*: any*/),
        "show.filtered_artworks.edges.node.artists.id": (v22/*: any*/),
        "show.filtered_artworks.edges.node.artists.name": (v24/*: any*/),
        "show.filtered_artworks.edges.node.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "show.filtered_artworks.edges.node.attributionClass.id": (v22/*: any*/),
        "show.filtered_artworks.edges.node.attributionClass.name": (v24/*: any*/),
        "show.filtered_artworks.edges.node.collecting_institution": (v24/*: any*/),
        "show.filtered_artworks.edges.node.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "show.filtered_artworks.edges.node.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "show.filtered_artworks.edges.node.collectorSignals.auction.bidCount": (v28/*: any*/),
        "show.filtered_artworks.edges.node.collectorSignals.auction.liveBiddingStarted": (v29/*: any*/),
        "show.filtered_artworks.edges.node.collectorSignals.auction.lotClosesAt": (v24/*: any*/),
        "show.filtered_artworks.edges.node.collectorSignals.auction.onlineBiddingExtended": (v29/*: any*/),
        "show.filtered_artworks.edges.node.collectorSignals.auction.registrationEndsAt": (v24/*: any*/),
        "show.filtered_artworks.edges.node.collectorSignals.partnerOffer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PartnerOfferToCollector"
        },
        "show.filtered_artworks.edges.node.collectorSignals.partnerOffer.endAt": (v24/*: any*/),
        "show.filtered_artworks.edges.node.collectorSignals.partnerOffer.id": (v22/*: any*/),
        "show.filtered_artworks.edges.node.collectorSignals.partnerOffer.priceWithDiscount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "show.filtered_artworks.edges.node.collectorSignals.partnerOffer.priceWithDiscount.display": (v24/*: any*/),
        "show.filtered_artworks.edges.node.collectorSignals.primaryLabel": {
          "enumValues": [
            "CURATORS_PICK",
            "INCREASED_INTEREST",
            "PARTNER_OFFER"
          ],
          "nullable": true,
          "plural": false,
          "type": "LabelSignalEnum"
        },
        "show.filtered_artworks.edges.node.cultural_maker": (v24/*: any*/),
        "show.filtered_artworks.edges.node.date": (v24/*: any*/),
        "show.filtered_artworks.edges.node.href": (v24/*: any*/),
        "show.filtered_artworks.edges.node.id": (v22/*: any*/),
        "show.filtered_artworks.edges.node.image": (v25/*: any*/),
        "show.filtered_artworks.edges.node.image.aspectRatio": (v26/*: any*/),
        "show.filtered_artworks.edges.node.image.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "show.filtered_artworks.edges.node.image.placeholder": (v24/*: any*/),
        "show.filtered_artworks.edges.node.image.resized": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ResizedImageUrl"
        },
        "show.filtered_artworks.edges.node.image.resized.height": (v30/*: any*/),
        "show.filtered_artworks.edges.node.image.resized.src": (v20/*: any*/),
        "show.filtered_artworks.edges.node.image.resized.srcSet": (v20/*: any*/),
        "show.filtered_artworks.edges.node.image.resized.width": (v30/*: any*/),
        "show.filtered_artworks.edges.node.image.url": (v24/*: any*/),
        "show.filtered_artworks.edges.node.image.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "show.filtered_artworks.edges.node.imageTitle": (v24/*: any*/),
        "show.filtered_artworks.edges.node.image_title": (v24/*: any*/),
        "show.filtered_artworks.edges.node.internalID": (v22/*: any*/),
        "show.filtered_artworks.edges.node.isUnlisted": (v29/*: any*/),
        "show.filtered_artworks.edges.node.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "show.filtered_artworks.edges.node.marketPriceInsights.demandRank": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Float"
        },
        "show.filtered_artworks.edges.node.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "show.filtered_artworks.edges.node.mediumType.filterGene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Gene"
        },
        "show.filtered_artworks.edges.node.mediumType.filterGene.id": (v22/*: any*/),
        "show.filtered_artworks.edges.node.mediumType.filterGene.name": (v24/*: any*/),
        "show.filtered_artworks.edges.node.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "show.filtered_artworks.edges.node.partner.href": (v24/*: any*/),
        "show.filtered_artworks.edges.node.partner.id": (v22/*: any*/),
        "show.filtered_artworks.edges.node.partner.name": (v24/*: any*/),
        "show.filtered_artworks.edges.node.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "show.filtered_artworks.edges.node.sale.cascadingEndTimeIntervalMinutes": (v30/*: any*/),
        "show.filtered_artworks.edges.node.sale.endAt": (v24/*: any*/),
        "show.filtered_artworks.edges.node.sale.extendedBiddingIntervalMinutes": (v30/*: any*/),
        "show.filtered_artworks.edges.node.sale.extendedBiddingPeriodMinutes": (v30/*: any*/),
        "show.filtered_artworks.edges.node.sale.id": (v22/*: any*/),
        "show.filtered_artworks.edges.node.sale.isOpen": (v27/*: any*/),
        "show.filtered_artworks.edges.node.sale.is_auction": (v27/*: any*/),
        "show.filtered_artworks.edges.node.sale.is_closed": (v27/*: any*/),
        "show.filtered_artworks.edges.node.sale.startAt": (v24/*: any*/),
        "show.filtered_artworks.edges.node.saleArtwork": (v31/*: any*/),
        "show.filtered_artworks.edges.node.saleArtwork.endAt": (v24/*: any*/),
        "show.filtered_artworks.edges.node.saleArtwork.extendedBiddingEndAt": (v24/*: any*/),
        "show.filtered_artworks.edges.node.saleArtwork.id": (v22/*: any*/),
        "show.filtered_artworks.edges.node.saleArtwork.lotID": (v24/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork": (v31/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkCounts"
        },
        "show.filtered_artworks.edges.node.sale_artwork.counts.bidder_positions": (v21/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.endAt": (v24/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.extendedBiddingEndAt": (v24/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.formattedEndDateTime": (v24/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.highest_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkHighestBid"
        },
        "show.filtered_artworks.edges.node.sale_artwork.highest_bid.display": (v24/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.id": (v22/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.lotID": (v24/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.lotLabel": (v24/*: any*/),
        "show.filtered_artworks.edges.node.sale_artwork.opening_bid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleArtworkOpeningBid"
        },
        "show.filtered_artworks.edges.node.sale_artwork.opening_bid.display": (v24/*: any*/),
        "show.filtered_artworks.edges.node.sale_message": (v24/*: any*/),
        "show.filtered_artworks.edges.node.slug": (v22/*: any*/),
        "show.filtered_artworks.edges.node.title": (v24/*: any*/),
        "show.filtered_artworks.id": (v22/*: any*/),
        "show.filtered_artworks.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "show.filtered_artworks.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "show.filtered_artworks.pageCursors.around.cursor": (v20/*: any*/),
        "show.filtered_artworks.pageCursors.around.isCurrent": (v29/*: any*/),
        "show.filtered_artworks.pageCursors.around.page": (v28/*: any*/),
        "show.filtered_artworks.pageCursors.first": (v32/*: any*/),
        "show.filtered_artworks.pageCursors.first.cursor": (v20/*: any*/),
        "show.filtered_artworks.pageCursors.first.isCurrent": (v29/*: any*/),
        "show.filtered_artworks.pageCursors.first.page": (v28/*: any*/),
        "show.filtered_artworks.pageCursors.last": (v32/*: any*/),
        "show.filtered_artworks.pageCursors.last.cursor": (v20/*: any*/),
        "show.filtered_artworks.pageCursors.last.isCurrent": (v29/*: any*/),
        "show.filtered_artworks.pageCursors.last.page": (v28/*: any*/),
        "show.filtered_artworks.pageCursors.previous": (v32/*: any*/),
        "show.filtered_artworks.pageCursors.previous.cursor": (v20/*: any*/),
        "show.filtered_artworks.pageCursors.previous.page": (v28/*: any*/),
        "show.filtered_artworks.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "show.filtered_artworks.pageInfo.endCursor": (v24/*: any*/),
        "show.filtered_artworks.pageInfo.hasNextPage": (v29/*: any*/),
        "show.id": (v22/*: any*/),
        "show.sidebar": (v19/*: any*/),
        "show.sidebar.aggregations": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworksAggregationResults"
        },
        "show.sidebar.aggregations.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AggregationCount"
        },
        "show.sidebar.aggregations.counts.count": (v28/*: any*/),
        "show.sidebar.aggregations.counts.name": (v20/*: any*/),
        "show.sidebar.aggregations.counts.value": (v20/*: any*/),
        "show.sidebar.aggregations.slice": {
          "enumValues": [
            "ARTIST",
            "ARTIST_NATIONALITY",
            "ARTIST_SERIES",
            "ATTRIBUTION_CLASS",
            "COLOR",
            "DIMENSION_RANGE",
            "FOLLOWED_ARTISTS",
            "GALLERY",
            "IMPORT_SOURCE",
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
        "show.sidebar.id": (v22/*: any*/)
      }
    },
    "name": "ShowArtworks_Test_Query",
    "operationKind": "query",
    "text": "query ShowArtworks_Test_Query {\n  show(id: \"catty-show\") {\n    ...ShowArtworks_show\n    id\n  }\n}\n\nfragment ArtworkFilterArtworkGrid_filtered_artworks on FilterArtworksConnection {\n  id\n  pageInfo {\n    hasNextPage\n    endCursor\n  }\n  pageCursors {\n    ...Pagination_pageCursors\n  }\n  edges {\n    node {\n      id\n    }\n  }\n  ...ArtworkGrid_artworks\n}\n\nfragment ArtworkGrid_artworks on ArtworkConnectionInterface {\n  __isArtworkConnectionInterface: __typename\n  edges {\n    __typename\n    node {\n      id\n      slug\n      href\n      internalID\n      image(includeAll: false) {\n        aspectRatio\n      }\n      ...GridItem_artwork\n      ...FlatGridItem_artwork\n    }\n    ... on Node {\n      __isNode: __typename\n      id\n    }\n  }\n}\n\nfragment BidTimerLine_artwork on Artwork {\n  saleArtwork {\n    lotID\n    id\n  }\n  collectorSignals {\n    auction {\n      lotClosesAt\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n}\n\nfragment Details_artwork on Artwork {\n  internalID\n  href\n  title\n  date\n  collectorSignals {\n    primaryLabel\n    auction {\n      bidCount\n      lotClosesAt\n      liveBiddingStarted\n      registrationEndsAt\n      onlineBiddingExtended\n    }\n  }\n  sale_message: saleMessage\n  cultural_maker: culturalMaker\n  artist(shallow: true) {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  marketPriceInsights {\n    demandRank\n  }\n  artists(shallow: true) {\n    id\n    href\n    name\n  }\n  collecting_institution: collectingInstitution\n  partner(shallow: true) {\n    name\n    href\n    id\n  }\n  sale {\n    endAt\n    cascadingEndTimeIntervalMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    is_auction: isAuction\n    is_closed: isClosed\n    id\n  }\n  sale_artwork: saleArtwork {\n    lotID\n    lotLabel\n    endAt\n    extendedBiddingEndAt\n    formattedEndDateTime\n    counts {\n      bidder_positions: bidderPositions\n    }\n    highest_bid: highestBid {\n      display\n    }\n    opening_bid: openingBid {\n      display\n    }\n    id\n  }\n  ...PrimaryLabelLine_artwork\n  ...BidTimerLine_artwork\n  ...HoverDetails_artwork\n}\n\nfragment ExclusiveAccessBadge_artwork on Artwork {\n  isUnlisted\n}\n\nfragment FlatGridItem_artwork on Artwork {\n  ...Metadata_artwork\n  sale {\n    extendedBiddingPeriodMinutes\n    extendedBiddingIntervalMinutes\n    startAt\n    isOpen\n    id\n  }\n  saleArtwork {\n    endAt\n    extendedBiddingEndAt\n    lotID\n    id\n  }\n  internalID\n  title\n  image_title: imageTitle\n  image(includeAll: false) {\n    resized(width: 445, version: [\"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n  artistNames\n  href\n}\n\nfragment GridItem_artwork on Artwork {\n  internalID\n  title\n  imageTitle\n  image(includeAll: false) {\n    internalID\n    placeholder\n    url(version: [\"larger\", \"large\"])\n    aspectRatio\n    versions\n  }\n  artistNames\n  href\n  ...Metadata_artwork\n  ...ExclusiveAccessBadge_artwork\n}\n\nfragment HoverDetails_artwork on Artwork {\n  internalID\n  attributionClass {\n    name\n    id\n  }\n  mediumType {\n    filterGene {\n      name\n      id\n    }\n  }\n}\n\nfragment ImmersiveView_filtered_artworks on FilterArtworksConnection {\n  pageInfo {\n    hasNextPage\n  }\n  edges {\n    immersiveArtworkNode: node {\n      slug\n      formattedMetadata\n      image {\n        aspectRatio\n        blurhash\n        url(version: [\"larger\", \"large\"])\n      }\n      id\n    }\n  }\n}\n\nfragment Metadata_artwork on Artwork {\n  ...Details_artwork\n  internalID\n  href\n  sale {\n    isOpen\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment PrimaryLabelLine_artwork on Artwork {\n  internalID\n  collectorSignals {\n    primaryLabel\n    partnerOffer {\n      endAt\n      priceWithDiscount {\n        display\n      }\n      id\n    }\n  }\n}\n\nfragment ShowArtworks_show on Show {\n  sidebar: filterArtworksConnection(first: 1) {\n    aggregations {\n      slice\n      counts {\n        name\n        value\n        count\n      }\n    }\n    id\n  }\n  filtered_artworks: filterArtworksConnection(first: 30) {\n    id\n    counts {\n      total(format: \"0,0\")\n    }\n    ...ArtworkFilterArtworkGrid_filtered_artworks\n    ...ImmersiveView_filtered_artworks\n  }\n}\n"
  }
};
})();

(node as any).hash = "37dd6bc7410485514076cc239188e6e6";

export default node;
