/**
 * @generated SignedSource<<c14c180b5f67b6ec5a4fddbaa3dbca3a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type myCollectionRoutes_ArtworkQuery$variables = {
  artworkID: string;
};
export type myCollectionRoutes_ArtworkQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtwork_artwork">;
  } | null;
};
export type myCollectionRoutes_ArtworkQuery = {
  response: myCollectionRoutes_ArtworkQuery$data;
  variables: myCollectionRoutes_ArtworkQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artworkID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artworkID"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
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
  "name": "name",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 6
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v12 = [
  (v10/*: any*/),
  (v11/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v13 = {
  "alias": "dimension_text",
  "args": null,
  "kind": "ScalarField",
  "name": "dimensionText",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "organization",
  "storageKey": null
},
v15 = [
  (v5/*: any*/),
  (v4/*: any*/)
],
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artist",
  "plural": false,
  "selections": (v15/*: any*/),
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v21 = [
  (v17/*: any*/),
  (v18/*: any*/),
  (v19/*: any*/),
  (v20/*: any*/)
],
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotImages",
  "kind": "LinkedField",
  "name": "images",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "larger",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 100
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 100
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v21/*: any*/),
          "storageKey": "cropped(height:100,width:100)"
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mediumText",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categoryText",
  "storageKey": null
},
v25 = {
  "alias": "date_text",
  "args": null,
  "kind": "ScalarField",
  "name": "dateText",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleDate",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "boughtIn",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v30 = {
  "alias": "price_realized",
  "args": null,
  "concreteType": "AuctionResultPriceRealized",
  "kind": "LinkedField",
  "name": "priceRealized",
  "plural": false,
  "selections": [
    (v29/*: any*/),
    {
      "alias": "display_usd",
      "args": null,
      "kind": "ScalarField",
      "name": "displayUSD",
      "storageKey": null
    },
    {
      "alias": "cents_usd",
      "args": null,
      "kind": "ScalarField",
      "name": "centsUSD",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotPerformance",
  "kind": "LinkedField",
  "name": "performance",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mid",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v32 = [
  (v29/*: any*/)
],
v33 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotEstimate",
  "kind": "LinkedField",
  "name": "estimate",
  "plural": false,
  "selections": (v32/*: any*/),
  "storageKey": null
},
v34 = [
  (v9/*: any*/)
],
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDefault",
  "storageKey": null
},
v36 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 800
  },
  {
    "kind": "Literal",
    "name": "version",
    "value": [
      "normalized",
      "larger",
      "large"
    ]
  },
  {
    "kind": "Literal",
    "name": "width",
    "value": 800
  }
],
v37 = [
  (v19/*: any*/),
  (v20/*: any*/),
  (v17/*: any*/),
  (v18/*: any*/)
],
v38 = {
  "alias": "type",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "myCollectionRoutes_ArtworkQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyCollectionArtwork_artwork"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "myCollectionRoutes_ArtworkQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistNames",
            "storageKey": null
          },
          (v2/*: any*/),
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
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPersonalArtist",
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/),
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
              (v6/*: any*/),
              (v7/*: any*/),
              {
                "alias": null,
                "args": (v8/*: any*/),
                "concreteType": "AuctionResultConnection",
                "kind": "LinkedField",
                "name": "auctionResultsConnection",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
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
                        "selections": (v12/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "first",
                        "plural": false,
                        "selections": (v12/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "last",
                        "plural": false,
                        "selections": (v12/*: any*/),
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
                          (v10/*: any*/),
                          (v11/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResultEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionResult",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v16/*: any*/),
                          (v22/*: any*/),
                          (v23/*: any*/),
                          (v24/*: any*/),
                          (v25/*: any*/),
                          (v26/*: any*/),
                          (v27/*: any*/),
                          (v28/*: any*/),
                          (v30/*: any*/),
                          (v31/*: any*/),
                          (v33/*: any*/),
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": "auctionResultsConnection(first:6)"
              },
              {
                "alias": "auctionResults",
                "args": null,
                "concreteType": "AuctionResultConnection",
                "kind": "LinkedField",
                "name": "auctionResultsConnection",
                "plural": false,
                "selections": (v34/*: any*/),
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
            "name": "medium",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "metric",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "in",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "cm",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "provenance",
            "storageKey": null
          },
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
                "name": "shortDescription",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Money",
            "kind": "LinkedField",
            "name": "pricePaid",
            "plural": false,
            "selections": (v32/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artworkLocation",
            "storageKey": null
          },
          {
            "alias": "auctionResult",
            "args": (v8/*: any*/),
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "comparableAuctionResults",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v13/*: any*/),
                      (v14/*: any*/),
                      (v16/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/),
                      (v24/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v27/*: any*/),
                      (v28/*: any*/),
                      (v30/*: any*/),
                      (v31/*: any*/),
                      (v33/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistID",
                        "storageKey": null
                      },
                      (v7/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "comparableAuctionResults(first:6)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasPriceEstimateRequest",
            "storageKey": null
          },
          (v7/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkConsignmentSubmission",
            "kind": "LinkedField",
            "name": "consignmentSubmission",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "displayText",
                "storageKey": null
              }
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
                "name": "annualLotsSold",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "annualValueSoldDisplayText",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "medianSaleOverEstimatePercentage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "liquidityRankDisplayText",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "sellThroughRate",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "demandRank",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "demandRankDisplayText",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v4/*: any*/),
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Sale",
            "kind": "LinkedField",
            "name": "sale",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isClosed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isLiveOpen",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isRegistrationClosed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "requireIdentityVerification",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "liveStartAt",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Bidder",
                "kind": "LinkedField",
                "name": "registrationStatus",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "qualifiedForBidding",
                    "storageKey": null
                  },
                  (v4/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "registrationEndsAt",
                "storageKey": null
              }
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "downloadableImageUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": (v15/*: any*/),
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Image",
            "kind": "LinkedField",
            "name": "images",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "url",
                "storageKey": null
              },
              (v35/*: any*/),
              {
                "alias": "placeholder",
                "args": [
                  {
                    "kind": "Literal",
                    "name": "version",
                    "value": [
                      "small",
                      "medium"
                    ]
                  }
                ],
                "kind": "ScalarField",
                "name": "url",
                "storageKey": "url(version:[\"small\",\"medium\"])"
              },
              {
                "alias": "fallback",
                "args": (v36/*: any*/),
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v37/*: any*/),
                "storageKey": "cropped(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": (v36/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v37/*: any*/),
                "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              (v19/*: any*/),
              (v20/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "artworkMeta",
            "args": null,
            "concreteType": "ArtworkMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "share",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "widthCm",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "heightCm",
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
                "args": (v36/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v21/*: any*/),
                "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isDownloadable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isHangable",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Partner",
            "kind": "LinkedField",
            "name": "partner",
            "plural": false,
            "selections": [
              (v6/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          },
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
            "concreteType": null,
            "kind": "LinkedField",
            "name": "figures",
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
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "playerUrl",
                    "storageKey": null
                  },
                  {
                    "alias": "videoWidth",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "width",
                    "storageKey": null
                  },
                  {
                    "alias": "videoHeight",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "height",
                    "storageKey": null
                  },
                  (v4/*: any*/),
                  (v38/*: any*/)
                ],
                "type": "Video",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "DeepZoom",
                    "kind": "LinkedField",
                    "name": "deepZoom",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "DeepZoomImage",
                        "kind": "LinkedField",
                        "name": "Image",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "xmlns",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Url",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Format",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "TileSize",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "Overlap",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "DeepZoomImageSize",
                            "kind": "LinkedField",
                            "name": "Size",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "Width",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "Height",
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
                  },
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isZoomable",
                    "storageKey": null
                  },
                  (v38/*: any*/),
                  (v35/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/)
                ],
                "type": "Image",
                "abstractKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isSetVideoAsCover",
            "storageKey": null
          },
          {
            "alias": "comparables",
            "args": null,
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "comparableAuctionResults",
            "plural": false,
            "selections": (v34/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasMarketPriceInsights",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "submissionId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4ca0a8f8d96eb7e01cdf69b97059deb4",
    "id": null,
    "metadata": {},
    "name": "myCollectionRoutes_ArtworkQuery",
    "operationKind": "query",
    "text": "query myCollectionRoutes_ArtworkQuery(\n  $artworkID: String!\n) {\n  artwork(id: $artworkID) @principalField {\n    ...MyCollectionArtwork_artwork\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    name\n    id\n  }\n  images {\n    larger {\n      cropped(width: 100, height: 100) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  internalID\n  id\n  slug\n  title\n  sale {\n    isAuction\n    isClosed\n    isLiveOpen\n    isRegistrationClosed\n    requireIdentityVerification\n    liveStartAt\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    id\n  }\n  isSaved\n  ...ArtworkAuctionRegistrationPanel_artwork\n}\n\nfragment ArtworkActions_artwork on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkDownloadButton_artwork\n  ...ArtworkSharePanel_artwork\n  ...ViewInRoom_artwork\n  slug\n  downloadableImageUrl\n  isDownloadable\n  isHangable\n  partner {\n    slug\n    id\n  }\n}\n\nfragment ArtworkAuctionRegistrationPanel_artwork on Artwork {\n  sale {\n    slug\n    registrationEndsAt\n    isRegistrationClosed\n    id\n  }\n}\n\nfragment ArtworkDownloadButton_artwork on Artwork {\n  title\n  date\n  downloadableImageUrl\n  artists {\n    name\n    id\n  }\n}\n\nfragment ArtworkImageBrowserLarge_artwork on Artwork {\n  ...ArtworkLightbox_artwork\n  ...ArtworkVideoPlayer_artwork\n  isSetVideoAsCover\n  figures {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      __typename\n      internalID\n      isZoomable\n    }\n    ... on Video {\n      __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowserSmall_artwork on Artwork {\n  ...ArtworkLightbox_artwork\n  ...ArtworkVideoPlayer_artwork\n  isSetVideoAsCover\n  figures {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      internalID\n      isZoomable\n      type: __typename\n    }\n    ... on Video {\n      type: __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkActions_artwork\n  ...ArtworkImageBrowserSmall_artwork\n  ...ArtworkImageBrowserLarge_artwork\n  internalID\n  figures {\n    __typename\n    ... on Image {\n      isDefault\n      width\n      height\n    }\n    ... on Video {\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment ArtworkLightbox_artwork on Artwork {\n  formattedMetadata\n  images {\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtworkSharePanel_artwork on Artwork {\n  href\n  images {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ArtworkVideoPlayer_artwork on Artwork {\n  internalID\n  slug\n  figures {\n    __typename\n    ... on Video {\n      __typename\n      playerUrl\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkArtistMarket_marketPriceInsights on ArtworkPriceInsights {\n  annualLotsSold\n  annualValueSoldDisplayText\n  medianSaleOverEstimatePercentage\n  liquidityRankDisplayText\n  sellThroughRate\n}\n\nfragment MyCollectionArtworkAuctionResults_artist on Artist {\n  slug\n  internalID\n  auctionResultsConnection(first: 6) {\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkComparables_artwork on Artwork {\n  auctionResult: comparableAuctionResults(first: 6) @optionalField {\n    edges {\n      cursor\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        artistID\n        internalID\n        id\n      }\n    }\n  }\n  artist {\n    name\n    id\n  }\n}\n\nfragment MyCollectionArtworkDemandIndex_marketPriceInsights on ArtworkPriceInsights {\n  demandRank\n  demandRankDisplayText\n}\n\nfragment MyCollectionArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkImageBrowser_artwork\n  internalID\n  images {\n    width\n    height\n  }\n}\n\nfragment MyCollectionArtworkInsights_artwork on Artwork {\n  ...MyCollectionArtworkComparables_artwork\n  ...MyCollectionArtworkRequestPriceEstimateSection_artwork\n  artist {\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n  marketPriceInsights {\n    ...MyCollectionArtworkArtistMarket_marketPriceInsights\n    ...MyCollectionArtworkDemandIndex_marketPriceInsights\n  }\n}\n\nfragment MyCollectionArtworkMeta_artwork on Artwork {\n  artistNames\n  title\n}\n\nfragment MyCollectionArtworkRequestPriceEstimateSection_artwork on Artwork {\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  hasPriceEstimateRequest\n  internalID\n  consignmentSubmission {\n    displayText\n  }\n}\n\nfragment MyCollectionArtworkSidebarMetadata_artwork on Artwork {\n  category\n  medium\n  metric\n  dimensions {\n    in\n    cm\n  }\n  provenance\n  attributionClass {\n    shortDescription\n    id\n  }\n  pricePaid {\n    display\n  }\n  artworkLocation\n}\n\nfragment MyCollectionArtworkSidebarTitleInfo_artwork on Artwork {\n  artistNames\n  title\n  date\n  artist {\n    href\n    isPersonalArtist\n    id\n  }\n}\n\nfragment MyCollectionArtworkSidebar_artwork on Artwork {\n  ...MyCollectionArtworkSidebarTitleInfo_artwork\n  ...MyCollectionArtworkSidebarMetadata_artwork\n}\n\nfragment MyCollectionArtwork_artwork on Artwork {\n  ...MyCollectionArtworkSidebar_artwork\n  ...MyCollectionArtworkMeta_artwork\n  ...MyCollectionArtworkInsights_artwork\n  ...MyCollectionArtworkImageBrowser_artwork\n  ...MyCollectionArtworkComparables_artwork\n  ...MyCollectionArtworkSidebarTitleInfo_artwork\n  ...MyCollectionArtworkRequestPriceEstimateSection_artwork\n  comparables: comparableAuctionResults {\n    totalCount\n  }\n  hasMarketPriceInsights\n  submissionId\n  internalID\n  slug\n  consignmentSubmission {\n    displayText\n  }\n  artist {\n    slug\n    targetSupply {\n      isP1\n    }\n    auctionResults: auctionResultsConnection {\n      totalCount\n    }\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ViewInRoom_artwork on Artwork {\n  ...ViewInRoomArtwork_artwork\n}\n"
  }
};
})();

(node as any).hash = "eb0d685c52377b6950abe6d49acab502";

export default node;
