/**
 * @generated SignedSource<<c905ad4abdca4d25b81e03174650571a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkTestQuery$variables = {};
export type MyCollectionArtworkTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtwork_artwork">;
  } | null;
};
export type MyCollectionArtworkTestQuery = {
  response: MyCollectionArtworkTestQuery$data;
  variables: MyCollectionArtworkTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
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
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v7 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 6
  }
],
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v11 = [
  (v9/*: any*/),
  (v10/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v12 = {
  "alias": "dimension_text",
  "args": null,
  "kind": "ScalarField",
  "name": "dimensionText",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "organization",
  "storageKey": null
},
v14 = [
  (v4/*: any*/),
  (v3/*: any*/)
],
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artist",
  "plural": false,
  "selections": (v14/*: any*/),
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v20 = [
  (v16/*: any*/),
  (v17/*: any*/),
  (v18/*: any*/),
  (v19/*: any*/)
],
v21 = {
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
      "name": "thumbnail",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 130
            },
            {
              "kind": "Literal",
              "name": "version",
              "value": [
                "square140"
              ]
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 130
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v20/*: any*/),
          "storageKey": "cropped(height:130,version:[\"square140\"],width:130)"
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mediumText",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categoryText",
  "storageKey": null
},
v24 = {
  "alias": "date_text",
  "args": null,
  "kind": "ScalarField",
  "name": "dateText",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleDate",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "boughtIn",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v29 = {
  "alias": "price_realized",
  "args": null,
  "concreteType": "AuctionResultPriceRealized",
  "kind": "LinkedField",
  "name": "priceRealized",
  "plural": false,
  "selections": [
    (v28/*: any*/),
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
v30 = {
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
v31 = [
  (v28/*: any*/)
],
v32 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotEstimate",
  "kind": "LinkedField",
  "name": "estimate",
  "plural": false,
  "selections": (v31/*: any*/),
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "location",
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotNumber",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleTitle",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isUpcoming",
  "storageKey": null
},
v37 = [
  (v8/*: any*/)
],
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDefault",
  "storageKey": null
},
v39 = [
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
v40 = [
  (v18/*: any*/),
  (v19/*: any*/),
  (v16/*: any*/),
  (v17/*: any*/)
],
v41 = {
  "alias": "type",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v42 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v43 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultConnection"
},
v44 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v45 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "AuctionResultEdge"
},
v46 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResult"
},
v47 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v48 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v49 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v50 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotEstimate"
},
v51 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotImages"
},
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v54 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v55 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v56 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotPerformance"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultPriceRealized"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v59 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v60 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
},
v61 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ResizedImageUrl"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "MyCollectionArtworkTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
        "storageKey": "artwork(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyCollectionArtworkTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
          (v1/*: any*/),
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPersonalArtist",
                "storageKey": null
              },
              (v3/*: any*/),
              (v4/*: any*/),
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
              (v5/*: any*/),
              (v6/*: any*/),
              {
                "alias": null,
                "args": (v7/*: any*/),
                "concreteType": "AuctionResultConnection",
                "kind": "LinkedField",
                "name": "auctionResultsConnection",
                "plural": false,
                "selections": [
                  (v8/*: any*/),
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
                        "selections": (v11/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "first",
                        "plural": false,
                        "selections": (v11/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "last",
                        "plural": false,
                        "selections": (v11/*: any*/),
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
                          (v1/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v15/*: any*/),
                          (v21/*: any*/),
                          (v22/*: any*/),
                          (v23/*: any*/),
                          (v24/*: any*/),
                          (v25/*: any*/),
                          (v26/*: any*/),
                          (v27/*: any*/),
                          (v29/*: any*/),
                          (v30/*: any*/),
                          (v32/*: any*/),
                          (v33/*: any*/),
                          (v34/*: any*/),
                          (v35/*: any*/),
                          (v36/*: any*/),
                          (v3/*: any*/)
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
                "selections": (v37/*: any*/),
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
              (v3/*: any*/)
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
            "selections": (v31/*: any*/),
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
            "args": (v7/*: any*/),
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
                  (v9/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v12/*: any*/),
                      (v13/*: any*/),
                      (v15/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/),
                      (v24/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v27/*: any*/),
                      (v29/*: any*/),
                      (v30/*: any*/),
                      (v32/*: any*/),
                      (v33/*: any*/),
                      (v34/*: any*/),
                      (v35/*: any*/),
                      (v36/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistID",
                        "storageKey": null
                      },
                      (v6/*: any*/),
                      (v3/*: any*/)
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
          (v6/*: any*/),
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
          (v3/*: any*/),
          (v5/*: any*/),
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
                  (v3/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/),
              (v5/*: any*/),
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
            "selections": (v14/*: any*/),
            "storageKey": null
          },
          (v2/*: any*/),
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
              (v38/*: any*/),
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
                "args": (v39/*: any*/),
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v40/*: any*/),
                "storageKey": "cropped(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": (v39/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v40/*: any*/),
                "storageKey": "resized(height:800,version:[\"normalized\",\"larger\",\"large\"],width:800)"
              },
              (v18/*: any*/),
              (v19/*: any*/)
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
                "args": (v39/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v20/*: any*/),
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
              (v5/*: any*/),
              (v3/*: any*/)
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
                  (v3/*: any*/),
                  (v41/*: any*/)
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
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isZoomable",
                    "storageKey": null
                  },
                  (v41/*: any*/),
                  (v38/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/)
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
            "selections": (v37/*: any*/),
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
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "ccf716c26d84ab461850e7348a9ccc40",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artist": (v42/*: any*/),
        "artwork.artist.auctionResults": (v43/*: any*/),
        "artwork.artist.auctionResults.totalCount": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection": (v43/*: any*/),
        "artwork.artist.auctionResultsConnection.edges": (v45/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node": (v46/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist": (v42/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist.id": (v47/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist.name": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.boughtIn": (v49/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.categoryText": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.currency": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.date_text": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.dimension_text": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.estimate": (v50/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.estimate.display": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.id": (v47/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images": (v51/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped": (v53/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.height": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.src": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.srcSet": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.width": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.isUpcoming": (v49/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.location": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.lotNumber": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.mediumText": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.organization": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.performance": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.performance.mid": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.cents_usd": (v58/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.display": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.display_usd": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.saleDate": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.saleTitle": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.title": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageCursors"
        },
        "artwork.artist.auctionResultsConnection.pageCursors.around": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "PageCursor"
        },
        "artwork.artist.auctionResultsConnection.pageCursors.around.cursor": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.around.isCurrent": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.around.page": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.cursor": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.isCurrent": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.page": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.cursor": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.isCurrent": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.page": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous.cursor": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous.page": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "artwork.artist.auctionResultsConnection.pageInfo.hasNextPage": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.totalCount": (v44/*: any*/),
        "artwork.artist.href": (v48/*: any*/),
        "artwork.artist.id": (v47/*: any*/),
        "artwork.artist.internalID": (v47/*: any*/),
        "artwork.artist.isPersonalArtist": (v49/*: any*/),
        "artwork.artist.name": (v48/*: any*/),
        "artwork.artist.slug": (v47/*: any*/),
        "artwork.artist.targetSupply": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "artwork.artist.targetSupply.isP1": (v49/*: any*/),
        "artwork.artistNames": (v48/*: any*/),
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.id": (v47/*: any*/),
        "artwork.artists.name": (v48/*: any*/),
        "artwork.artworkLocation": (v48/*: any*/),
        "artwork.artworkMeta": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMeta"
        },
        "artwork.artworkMeta.share": (v48/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v47/*: any*/),
        "artwork.attributionClass.shortDescription": (v48/*: any*/),
        "artwork.auctionResult": (v43/*: any*/),
        "artwork.auctionResult.edges": (v45/*: any*/),
        "artwork.auctionResult.edges.cursor": (v55/*: any*/),
        "artwork.auctionResult.edges.node": (v46/*: any*/),
        "artwork.auctionResult.edges.node.artist": (v42/*: any*/),
        "artwork.auctionResult.edges.node.artist.id": (v47/*: any*/),
        "artwork.auctionResult.edges.node.artist.name": (v48/*: any*/),
        "artwork.auctionResult.edges.node.artistID": (v55/*: any*/),
        "artwork.auctionResult.edges.node.boughtIn": (v49/*: any*/),
        "artwork.auctionResult.edges.node.categoryText": (v48/*: any*/),
        "artwork.auctionResult.edges.node.currency": (v48/*: any*/),
        "artwork.auctionResult.edges.node.date_text": (v48/*: any*/),
        "artwork.auctionResult.edges.node.dimension_text": (v48/*: any*/),
        "artwork.auctionResult.edges.node.estimate": (v50/*: any*/),
        "artwork.auctionResult.edges.node.estimate.display": (v48/*: any*/),
        "artwork.auctionResult.edges.node.id": (v47/*: any*/),
        "artwork.auctionResult.edges.node.images": (v51/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail": (v52/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped": (v53/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.height": (v54/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.src": (v55/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.srcSet": (v55/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.width": (v54/*: any*/),
        "artwork.auctionResult.edges.node.internalID": (v47/*: any*/),
        "artwork.auctionResult.edges.node.isUpcoming": (v49/*: any*/),
        "artwork.auctionResult.edges.node.location": (v48/*: any*/),
        "artwork.auctionResult.edges.node.lotNumber": (v48/*: any*/),
        "artwork.auctionResult.edges.node.mediumText": (v48/*: any*/),
        "artwork.auctionResult.edges.node.organization": (v48/*: any*/),
        "artwork.auctionResult.edges.node.performance": (v56/*: any*/),
        "artwork.auctionResult.edges.node.performance.mid": (v48/*: any*/),
        "artwork.auctionResult.edges.node.price_realized": (v57/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.cents_usd": (v58/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.display": (v48/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.display_usd": (v48/*: any*/),
        "artwork.auctionResult.edges.node.saleDate": (v48/*: any*/),
        "artwork.auctionResult.edges.node.saleTitle": (v48/*: any*/),
        "artwork.auctionResult.edges.node.title": (v48/*: any*/),
        "artwork.category": (v48/*: any*/),
        "artwork.comparables": (v43/*: any*/),
        "artwork.comparables.totalCount": (v44/*: any*/),
        "artwork.consignmentSubmission": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConsignmentSubmission"
        },
        "artwork.consignmentSubmission.displayText": (v48/*: any*/),
        "artwork.date": (v48/*: any*/),
        "artwork.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.dimensions.cm": (v48/*: any*/),
        "artwork.dimensions.in": (v48/*: any*/),
        "artwork.downloadableImageUrl": (v48/*: any*/),
        "artwork.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtworkFigures"
        },
        "artwork.figures.__typename": (v55/*: any*/),
        "artwork.figures.deepZoom": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoom"
        },
        "artwork.figures.deepZoom.Image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImage"
        },
        "artwork.figures.deepZoom.Image.Format": (v48/*: any*/),
        "artwork.figures.deepZoom.Image.Overlap": (v44/*: any*/),
        "artwork.figures.deepZoom.Image.Size": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImageSize"
        },
        "artwork.figures.deepZoom.Image.Size.Height": (v44/*: any*/),
        "artwork.figures.deepZoom.Image.Size.Width": (v44/*: any*/),
        "artwork.figures.deepZoom.Image.TileSize": (v44/*: any*/),
        "artwork.figures.deepZoom.Image.Url": (v48/*: any*/),
        "artwork.figures.deepZoom.Image.xmlns": (v48/*: any*/),
        "artwork.figures.height": (v44/*: any*/),
        "artwork.figures.id": (v47/*: any*/),
        "artwork.figures.internalID": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ID"
        },
        "artwork.figures.isDefault": (v49/*: any*/),
        "artwork.figures.isZoomable": (v49/*: any*/),
        "artwork.figures.playerUrl": (v55/*: any*/),
        "artwork.figures.type": (v55/*: any*/),
        "artwork.figures.videoHeight": (v54/*: any*/),
        "artwork.figures.videoWidth": (v54/*: any*/),
        "artwork.figures.width": (v44/*: any*/),
        "artwork.formattedMetadata": (v48/*: any*/),
        "artwork.hasMarketPriceInsights": (v49/*: any*/),
        "artwork.hasPriceEstimateRequest": (v49/*: any*/),
        "artwork.heightCm": (v58/*: any*/),
        "artwork.href": (v48/*: any*/),
        "artwork.id": (v47/*: any*/),
        "artwork.image": (v52/*: any*/),
        "artwork.image.resized": (v61/*: any*/),
        "artwork.image.resized.height": (v44/*: any*/),
        "artwork.image.resized.src": (v55/*: any*/),
        "artwork.image.resized.srcSet": (v55/*: any*/),
        "artwork.image.resized.width": (v44/*: any*/),
        "artwork.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "artwork.images.fallback": (v53/*: any*/),
        "artwork.images.fallback.height": (v54/*: any*/),
        "artwork.images.fallback.src": (v55/*: any*/),
        "artwork.images.fallback.srcSet": (v55/*: any*/),
        "artwork.images.fallback.width": (v54/*: any*/),
        "artwork.images.height": (v44/*: any*/),
        "artwork.images.isDefault": (v49/*: any*/),
        "artwork.images.placeholder": (v48/*: any*/),
        "artwork.images.resized": (v61/*: any*/),
        "artwork.images.resized.height": (v44/*: any*/),
        "artwork.images.resized.src": (v55/*: any*/),
        "artwork.images.resized.srcSet": (v55/*: any*/),
        "artwork.images.resized.width": (v44/*: any*/),
        "artwork.images.url": (v48/*: any*/),
        "artwork.images.width": (v44/*: any*/),
        "artwork.internalID": (v47/*: any*/),
        "artwork.isDownloadable": (v49/*: any*/),
        "artwork.isHangable": (v49/*: any*/),
        "artwork.isSaved": (v49/*: any*/),
        "artwork.isSetVideoAsCover": (v49/*: any*/),
        "artwork.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artwork.marketPriceInsights.annualLotsSold": (v44/*: any*/),
        "artwork.marketPriceInsights.annualValueSoldDisplayText": (v48/*: any*/),
        "artwork.marketPriceInsights.demandRank": (v58/*: any*/),
        "artwork.marketPriceInsights.demandRankDisplayText": (v48/*: any*/),
        "artwork.marketPriceInsights.liquidityRankDisplayText": (v48/*: any*/),
        "artwork.marketPriceInsights.medianSaleOverEstimatePercentage": (v58/*: any*/),
        "artwork.marketPriceInsights.sellThroughRate": (v58/*: any*/),
        "artwork.medium": (v48/*: any*/),
        "artwork.metric": (v48/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.id": (v47/*: any*/),
        "artwork.partner.slug": (v47/*: any*/),
        "artwork.pricePaid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "artwork.pricePaid.display": (v48/*: any*/),
        "artwork.provenance": (v48/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.id": (v47/*: any*/),
        "artwork.sale.isAuction": (v49/*: any*/),
        "artwork.sale.isClosed": (v49/*: any*/),
        "artwork.sale.isLiveOpen": (v49/*: any*/),
        "artwork.sale.isRegistrationClosed": (v49/*: any*/),
        "artwork.sale.liveStartAt": (v48/*: any*/),
        "artwork.sale.registrationEndsAt": (v48/*: any*/),
        "artwork.sale.registrationStatus": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "artwork.sale.registrationStatus.id": (v47/*: any*/),
        "artwork.sale.registrationStatus.qualifiedForBidding": (v49/*: any*/),
        "artwork.sale.requireIdentityVerification": (v49/*: any*/),
        "artwork.sale.slug": (v47/*: any*/),
        "artwork.slug": (v47/*: any*/),
        "artwork.submissionId": (v48/*: any*/),
        "artwork.title": (v48/*: any*/),
        "artwork.widthCm": (v58/*: any*/)
      }
    },
    "name": "MyCollectionArtworkTestQuery",
    "operationKind": "query",
    "text": "query MyCollectionArtworkTestQuery {\n  artwork(id: \"foo\") {\n    ...MyCollectionArtwork_artwork\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    name\n    id\n  }\n  images {\n    thumbnail {\n      cropped(width: 130, height: 130, version: [\"square140\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  location\n  lotNumber\n  saleTitle\n  isUpcoming\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  internalID\n  id\n  slug\n  title\n  sale {\n    isAuction\n    isClosed\n    isLiveOpen\n    isRegistrationClosed\n    requireIdentityVerification\n    liveStartAt\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    id\n  }\n  isSaved\n  ...ArtworkAuctionRegistrationPanel_artwork\n}\n\nfragment ArtworkActions_artwork on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkDownloadButton_artwork\n  ...ArtworkSharePanel_artwork\n  ...ViewInRoom_artwork\n  slug\n  downloadableImageUrl\n  isDownloadable\n  isHangable\n  partner {\n    slug\n    id\n  }\n}\n\nfragment ArtworkAuctionRegistrationPanel_artwork on Artwork {\n  sale {\n    slug\n    registrationEndsAt\n    isRegistrationClosed\n    id\n  }\n}\n\nfragment ArtworkDownloadButton_artwork on Artwork {\n  title\n  date\n  downloadableImageUrl\n  artists {\n    name\n    id\n  }\n}\n\nfragment ArtworkImageBrowserLarge_artwork on Artwork {\n  ...ArtworkLightbox_artwork\n  ...ArtworkVideoPlayer_artwork\n  isSetVideoAsCover\n  figures {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      __typename\n      internalID\n      isZoomable\n    }\n    ... on Video {\n      __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowserSmall_artwork on Artwork {\n  ...ArtworkLightbox_artwork\n  ...ArtworkVideoPlayer_artwork\n  isSetVideoAsCover\n  figures {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      internalID\n      isZoomable\n      type: __typename\n    }\n    ... on Video {\n      type: __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkActions_artwork\n  ...ArtworkImageBrowserSmall_artwork\n  ...ArtworkImageBrowserLarge_artwork\n  internalID\n  figures {\n    __typename\n    ... on Image {\n      isDefault\n      width\n      height\n    }\n    ... on Video {\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment ArtworkLightbox_artwork on Artwork {\n  formattedMetadata\n  images {\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n  }\n}\n\nfragment ArtworkSharePanel_artwork on Artwork {\n  href\n  images {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ArtworkVideoPlayer_artwork on Artwork {\n  internalID\n  slug\n  figures {\n    __typename\n    ... on Video {\n      __typename\n      playerUrl\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkArtistMarket_marketPriceInsights on ArtworkPriceInsights {\n  annualLotsSold\n  annualValueSoldDisplayText\n  medianSaleOverEstimatePercentage\n  liquidityRankDisplayText\n  sellThroughRate\n}\n\nfragment MyCollectionArtworkAuctionResults_artist on Artist {\n  slug\n  internalID\n  auctionResultsConnection(first: 6) {\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkComparables_artwork on Artwork {\n  auctionResult: comparableAuctionResults(first: 6) @optionalField {\n    edges {\n      cursor\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        artistID\n        internalID\n        id\n      }\n    }\n  }\n  artist {\n    name\n    id\n  }\n}\n\nfragment MyCollectionArtworkDemandIndex_marketPriceInsights on ArtworkPriceInsights {\n  demandRank\n  demandRankDisplayText\n}\n\nfragment MyCollectionArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkImageBrowser_artwork\n  internalID\n  images {\n    width\n    height\n  }\n}\n\nfragment MyCollectionArtworkInsights_artwork on Artwork {\n  ...MyCollectionArtworkComparables_artwork\n  ...MyCollectionArtworkRequestPriceEstimateSection_artwork\n  artist {\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n  marketPriceInsights {\n    ...MyCollectionArtworkArtistMarket_marketPriceInsights\n    ...MyCollectionArtworkDemandIndex_marketPriceInsights\n  }\n}\n\nfragment MyCollectionArtworkMeta_artwork on Artwork {\n  artistNames\n  title\n}\n\nfragment MyCollectionArtworkRequestPriceEstimateSection_artwork on Artwork {\n  artist {\n    targetSupply {\n      isP1\n    }\n    id\n  }\n  hasPriceEstimateRequest\n  internalID\n  consignmentSubmission {\n    displayText\n  }\n}\n\nfragment MyCollectionArtworkSidebarMetadata_artwork on Artwork {\n  category\n  medium\n  metric\n  dimensions {\n    in\n    cm\n  }\n  provenance\n  attributionClass {\n    shortDescription\n    id\n  }\n  pricePaid {\n    display\n  }\n  artworkLocation\n}\n\nfragment MyCollectionArtworkSidebarTitleInfo_artwork on Artwork {\n  artistNames\n  title\n  date\n  artist {\n    href\n    isPersonalArtist\n    id\n  }\n}\n\nfragment MyCollectionArtworkSidebar_artwork on Artwork {\n  ...MyCollectionArtworkSidebarTitleInfo_artwork\n  ...MyCollectionArtworkSidebarMetadata_artwork\n}\n\nfragment MyCollectionArtwork_artwork on Artwork {\n  ...MyCollectionArtworkSidebar_artwork\n  ...MyCollectionArtworkMeta_artwork\n  ...MyCollectionArtworkInsights_artwork\n  ...MyCollectionArtworkImageBrowser_artwork\n  ...MyCollectionArtworkComparables_artwork\n  ...MyCollectionArtworkSidebarTitleInfo_artwork\n  ...MyCollectionArtworkRequestPriceEstimateSection_artwork\n  comparables: comparableAuctionResults {\n    totalCount\n  }\n  hasMarketPriceInsights\n  submissionId\n  internalID\n  slug\n  consignmentSubmission {\n    displayText\n  }\n  artist {\n    slug\n    targetSupply {\n      isP1\n    }\n    auctionResults: auctionResultsConnection {\n      totalCount\n    }\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ViewInRoom_artwork on Artwork {\n  ...ViewInRoomArtwork_artwork\n}\n"
  }
};
})();

(node as any).hash = "5fd3b94bce8eb91054083f590353edf7";

export default node;
