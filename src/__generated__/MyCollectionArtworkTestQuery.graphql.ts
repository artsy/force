/**
 * @generated SignedSource<<3690e64c9882f0ad2eca9fe0b2de3a5a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkTestQuery$variables = Record<PropertyKey, never>;
export type MyCollectionArtworkTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtwork_artwork">;
  } | null | undefined;
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
v38 = [
  {
    "kind": "Literal",
    "name": "includeAll",
    "value": true
  }
],
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDefault",
  "storageKey": null
},
v40 = {
  "kind": "Literal",
  "name": "height",
  "value": 800
},
v41 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v42 = {
  "kind": "Literal",
  "name": "width",
  "value": 800
},
v43 = [
  (v40/*: any*/),
  {
    "kind": "Literal",
    "name": "quality",
    "value": 85
  },
  (v41/*: any*/),
  (v42/*: any*/)
],
v44 = [
  (v18/*: any*/),
  (v19/*: any*/),
  (v16/*: any*/),
  (v17/*: any*/)
],
v45 = {
  "alias": "type",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v46 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v47 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultConnection"
},
v48 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v49 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "AuctionResultEdge"
},
v50 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResult"
},
v51 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v54 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotEstimate"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotImages"
},
v56 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v58 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v59 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v60 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotPerformance"
},
v61 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultPriceRealized"
},
v62 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v63 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v64 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
},
v65 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v66 = {
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
                          (v6/*: any*/),
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
            "name": "confidentialNotes",
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
            "kind": "ScalarField",
            "name": "editionOf",
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
                      (v6/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isPriceEstimateRequestable",
            "storageKey": null
          },
          (v6/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isSaved",
            "storageKey": null
          },
          (v5/*: any*/),
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
              (v3/*: any*/),
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
            "args": (v38/*: any*/),
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
              (v6/*: any*/),
              (v39/*: any*/),
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
                "args": (v43/*: any*/),
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v44/*: any*/),
                "storageKey": "cropped(height:800,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": (v43/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v44/*: any*/),
                "storageKey": "resized(height:800,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "versions",
                "storageKey": null
              }
            ],
            "storageKey": "images(includeAll:true)"
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
                "args": [
                  (v40/*: any*/),
                  (v41/*: any*/),
                  (v42/*: any*/)
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v20/*: any*/),
                "storageKey": "resized(height:800,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
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
            "args": (v38/*: any*/),
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
                  (v45/*: any*/)
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
                  (v45/*: any*/),
                  (v39/*: any*/),
                  (v18/*: any*/),
                  (v19/*: any*/)
                ],
                "type": "Image",
                "abstractKey": null
              }
            ],
            "storageKey": "figures(includeAll:true)"
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
          },
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
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "31874d953db40b456852d1e9b5666898",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.artist": (v46/*: any*/),
        "artwork.artist.auctionResults": (v47/*: any*/),
        "artwork.artist.auctionResults.totalCount": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection": (v47/*: any*/),
        "artwork.artist.auctionResultsConnection.edges": (v49/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node": (v50/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist": (v46/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist.id": (v51/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist.name": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.boughtIn": (v53/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.categoryText": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.currency": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.date_text": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.dimension_text": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.estimate": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.estimate.display": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.id": (v51/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.height": (v58/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.src": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.srcSet": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.width": (v58/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.internalID": (v51/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.isUpcoming": (v53/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.location": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.lotNumber": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.mediumText": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.organization": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.performance": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.performance.mid": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.cents_usd": (v62/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.display": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.display_usd": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.saleDate": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.saleTitle": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.title": (v52/*: any*/),
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
        "artwork.artist.auctionResultsConnection.pageCursors.around.cursor": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.around.isCurrent": (v63/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.around.page": (v58/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first": (v64/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.cursor": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.isCurrent": (v63/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.page": (v58/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last": (v64/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.cursor": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.isCurrent": (v63/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.page": (v58/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous": (v64/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous.cursor": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous.page": (v58/*: any*/),
        "artwork.artist.auctionResultsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "artwork.artist.auctionResultsConnection.pageInfo.hasNextPage": (v63/*: any*/),
        "artwork.artist.auctionResultsConnection.totalCount": (v48/*: any*/),
        "artwork.artist.href": (v52/*: any*/),
        "artwork.artist.id": (v51/*: any*/),
        "artwork.artist.internalID": (v51/*: any*/),
        "artwork.artist.isPersonalArtist": (v53/*: any*/),
        "artwork.artist.name": (v52/*: any*/),
        "artwork.artist.slug": (v51/*: any*/),
        "artwork.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "artwork.artist.targetSupply.isP1": (v53/*: any*/),
        "artwork.artistNames": (v52/*: any*/),
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.id": (v51/*: any*/),
        "artwork.artists.name": (v52/*: any*/),
        "artwork.artworkLocation": (v52/*: any*/),
        "artwork.artworkMeta": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMeta"
        },
        "artwork.artworkMeta.share": (v52/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v51/*: any*/),
        "artwork.attributionClass.shortDescription": (v52/*: any*/),
        "artwork.auctionResult": (v47/*: any*/),
        "artwork.auctionResult.edges": (v49/*: any*/),
        "artwork.auctionResult.edges.cursor": (v59/*: any*/),
        "artwork.auctionResult.edges.node": (v50/*: any*/),
        "artwork.auctionResult.edges.node.artist": (v46/*: any*/),
        "artwork.auctionResult.edges.node.artist.id": (v51/*: any*/),
        "artwork.auctionResult.edges.node.artist.name": (v52/*: any*/),
        "artwork.auctionResult.edges.node.artistID": (v59/*: any*/),
        "artwork.auctionResult.edges.node.boughtIn": (v53/*: any*/),
        "artwork.auctionResult.edges.node.categoryText": (v52/*: any*/),
        "artwork.auctionResult.edges.node.currency": (v52/*: any*/),
        "artwork.auctionResult.edges.node.date_text": (v52/*: any*/),
        "artwork.auctionResult.edges.node.dimension_text": (v52/*: any*/),
        "artwork.auctionResult.edges.node.estimate": (v54/*: any*/),
        "artwork.auctionResult.edges.node.estimate.display": (v52/*: any*/),
        "artwork.auctionResult.edges.node.id": (v51/*: any*/),
        "artwork.auctionResult.edges.node.images": (v55/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail": (v56/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped": (v57/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.height": (v58/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.src": (v59/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.srcSet": (v59/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.width": (v58/*: any*/),
        "artwork.auctionResult.edges.node.internalID": (v51/*: any*/),
        "artwork.auctionResult.edges.node.isUpcoming": (v53/*: any*/),
        "artwork.auctionResult.edges.node.location": (v52/*: any*/),
        "artwork.auctionResult.edges.node.lotNumber": (v52/*: any*/),
        "artwork.auctionResult.edges.node.mediumText": (v52/*: any*/),
        "artwork.auctionResult.edges.node.organization": (v52/*: any*/),
        "artwork.auctionResult.edges.node.performance": (v60/*: any*/),
        "artwork.auctionResult.edges.node.performance.mid": (v52/*: any*/),
        "artwork.auctionResult.edges.node.price_realized": (v61/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.cents_usd": (v62/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.display": (v52/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.display_usd": (v52/*: any*/),
        "artwork.auctionResult.edges.node.saleDate": (v52/*: any*/),
        "artwork.auctionResult.edges.node.saleTitle": (v52/*: any*/),
        "artwork.auctionResult.edges.node.title": (v52/*: any*/),
        "artwork.category": (v52/*: any*/),
        "artwork.comparables": (v47/*: any*/),
        "artwork.comparables.totalCount": (v48/*: any*/),
        "artwork.confidentialNotes": (v52/*: any*/),
        "artwork.consignmentSubmission": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConsignmentSubmission"
        },
        "artwork.consignmentSubmission.displayText": (v52/*: any*/),
        "artwork.date": (v52/*: any*/),
        "artwork.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.dimensions.cm": (v52/*: any*/),
        "artwork.dimensions.in": (v52/*: any*/),
        "artwork.downloadableImageUrl": (v52/*: any*/),
        "artwork.editionOf": (v52/*: any*/),
        "artwork.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtworkFigures"
        },
        "artwork.figures.__typename": (v59/*: any*/),
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
        "artwork.figures.deepZoom.Image.Format": (v52/*: any*/),
        "artwork.figures.deepZoom.Image.Overlap": (v48/*: any*/),
        "artwork.figures.deepZoom.Image.Size": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImageSize"
        },
        "artwork.figures.deepZoom.Image.Size.Height": (v48/*: any*/),
        "artwork.figures.deepZoom.Image.Size.Width": (v48/*: any*/),
        "artwork.figures.deepZoom.Image.TileSize": (v48/*: any*/),
        "artwork.figures.deepZoom.Image.Url": (v52/*: any*/),
        "artwork.figures.deepZoom.Image.xmlns": (v52/*: any*/),
        "artwork.figures.height": (v48/*: any*/),
        "artwork.figures.id": (v51/*: any*/),
        "artwork.figures.internalID": (v65/*: any*/),
        "artwork.figures.isDefault": (v53/*: any*/),
        "artwork.figures.isZoomable": (v53/*: any*/),
        "artwork.figures.playerUrl": (v59/*: any*/),
        "artwork.figures.type": (v59/*: any*/),
        "artwork.figures.videoHeight": (v58/*: any*/),
        "artwork.figures.videoWidth": (v58/*: any*/),
        "artwork.figures.width": (v48/*: any*/),
        "artwork.formattedMetadata": (v52/*: any*/),
        "artwork.hasMarketPriceInsights": (v53/*: any*/),
        "artwork.hasPriceEstimateRequest": (v53/*: any*/),
        "artwork.heightCm": (v62/*: any*/),
        "artwork.href": (v52/*: any*/),
        "artwork.id": (v51/*: any*/),
        "artwork.image": (v56/*: any*/),
        "artwork.image.resized": (v66/*: any*/),
        "artwork.image.resized.height": (v48/*: any*/),
        "artwork.image.resized.src": (v59/*: any*/),
        "artwork.image.resized.srcSet": (v59/*: any*/),
        "artwork.image.resized.width": (v48/*: any*/),
        "artwork.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "artwork.images.fallback": (v57/*: any*/),
        "artwork.images.fallback.height": (v58/*: any*/),
        "artwork.images.fallback.src": (v59/*: any*/),
        "artwork.images.fallback.srcSet": (v59/*: any*/),
        "artwork.images.fallback.width": (v58/*: any*/),
        "artwork.images.internalID": (v65/*: any*/),
        "artwork.images.isDefault": (v53/*: any*/),
        "artwork.images.placeholder": (v52/*: any*/),
        "artwork.images.resized": (v66/*: any*/),
        "artwork.images.resized.height": (v48/*: any*/),
        "artwork.images.resized.src": (v59/*: any*/),
        "artwork.images.resized.srcSet": (v59/*: any*/),
        "artwork.images.resized.width": (v48/*: any*/),
        "artwork.images.url": (v52/*: any*/),
        "artwork.images.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "artwork.internalID": (v51/*: any*/),
        "artwork.isDownloadable": (v53/*: any*/),
        "artwork.isHangable": (v53/*: any*/),
        "artwork.isPriceEstimateRequestable": (v53/*: any*/),
        "artwork.isSaved": (v53/*: any*/),
        "artwork.isSavedToList": (v63/*: any*/),
        "artwork.isSetVideoAsCover": (v53/*: any*/),
        "artwork.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artwork.marketPriceInsights.annualLotsSold": (v48/*: any*/),
        "artwork.marketPriceInsights.annualValueSoldDisplayText": (v52/*: any*/),
        "artwork.marketPriceInsights.demandRank": (v62/*: any*/),
        "artwork.marketPriceInsights.demandRankDisplayText": (v52/*: any*/),
        "artwork.marketPriceInsights.liquidityRankDisplayText": (v52/*: any*/),
        "artwork.marketPriceInsights.medianSaleOverEstimatePercentage": (v62/*: any*/),
        "artwork.marketPriceInsights.sellThroughRate": (v62/*: any*/),
        "artwork.medium": (v52/*: any*/),
        "artwork.metric": (v52/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.id": (v51/*: any*/),
        "artwork.partner.slug": (v51/*: any*/),
        "artwork.preview": (v56/*: any*/),
        "artwork.preview.url": (v52/*: any*/),
        "artwork.pricePaid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "artwork.pricePaid.display": (v52/*: any*/),
        "artwork.provenance": (v52/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.id": (v51/*: any*/),
        "artwork.sale.isAuction": (v53/*: any*/),
        "artwork.sale.isClosed": (v53/*: any*/),
        "artwork.sale.isLiveOpen": (v53/*: any*/),
        "artwork.sale.isRegistrationClosed": (v53/*: any*/),
        "artwork.sale.liveStartAt": (v52/*: any*/),
        "artwork.sale.registrationEndsAt": (v52/*: any*/),
        "artwork.sale.registrationStatus": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "artwork.sale.registrationStatus.id": (v51/*: any*/),
        "artwork.sale.registrationStatus.qualifiedForBidding": (v53/*: any*/),
        "artwork.sale.slug": (v51/*: any*/),
        "artwork.slug": (v51/*: any*/),
        "artwork.submissionId": (v52/*: any*/),
        "artwork.title": (v52/*: any*/),
        "artwork.widthCm": (v62/*: any*/)
      }
    },
    "name": "MyCollectionArtworkTestQuery",
    "operationKind": "query",
    "text": "query MyCollectionArtworkTestQuery {\n  artwork(id: \"foo\") {\n    ...MyCollectionArtwork_artwork\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    name\n    id\n  }\n  images {\n    thumbnail {\n      cropped(width: 130, height: 130, version: [\"square140\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  location\n  lotNumber\n  saleTitle\n  isUpcoming\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isSavedToList\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  ...ArtworkActionsWatchLotButton_artwork\n}\n\nfragment ArtworkActionsWatchLotButton_artwork on Artwork {\n  sale {\n    isLiveOpen\n    isRegistrationClosed\n    liveStartAt\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    id\n  }\n  ...ArtworkAuctionRegistrationPanel_artwork\n}\n\nfragment ArtworkActions_artwork_yvCPB on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkDownloadButton_artwork\n  ...ArtworkSharePanel_artwork_yvCPB\n  ...ViewInRoom_artwork\n  slug\n  downloadableImageUrl\n  isDownloadable\n  isHangable\n  partner {\n    slug\n    id\n  }\n}\n\nfragment ArtworkAuctionRegistrationPanel_artwork on Artwork {\n  sale {\n    slug\n    registrationEndsAt\n    isRegistrationClosed\n    id\n  }\n}\n\nfragment ArtworkDownloadButton_artwork on Artwork {\n  title\n  date\n  downloadableImageUrl\n  artists {\n    name\n    id\n  }\n}\n\nfragment ArtworkImageBrowserLarge_artwork_yvCPB on Artwork {\n  ...ArtworkLightbox_artwork_yvCPB\n  ...ArtworkVideoPlayer_artwork_yvCPB\n  isSetVideoAsCover\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      __typename\n      internalID\n      isZoomable\n    }\n    ... on Video {\n      __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowserSmall_artwork_yvCPB on Artwork {\n  ...ArtworkLightbox_artwork_yvCPB\n  ...ArtworkVideoPlayer_artwork_yvCPB\n  isSetVideoAsCover\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      internalID\n      isZoomable\n      type: __typename\n    }\n    ... on Video {\n      type: __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowser_artwork_yvCPB on Artwork {\n  ...ArtworkActions_artwork_yvCPB\n  ...ArtworkImageBrowserSmall_artwork_yvCPB\n  ...ArtworkImageBrowserLarge_artwork_yvCPB\n  internalID\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      isDefault\n      width\n      height\n    }\n    ... on Video {\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment ArtworkLightbox_artwork_yvCPB on Artwork {\n  formattedMetadata\n  images(includeAll: true) {\n    internalID\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(quality: 85, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(quality: 85, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    versions\n  }\n}\n\nfragment ArtworkSharePanel_artwork_yvCPB on Artwork {\n  href\n  images(includeAll: true) {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ArtworkVideoPlayer_artwork_yvCPB on Artwork {\n  internalID\n  slug\n  figures(includeAll: true) {\n    __typename\n    ... on Video {\n      __typename\n      playerUrl\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkArtistMarket_marketPriceInsights on ArtworkPriceInsights {\n  annualLotsSold\n  annualValueSoldDisplayText\n  medianSaleOverEstimatePercentage\n  liquidityRankDisplayText\n  sellThroughRate\n}\n\nfragment MyCollectionArtworkAuctionResults_artist on Artist {\n  slug\n  internalID\n  auctionResultsConnection(first: 6) {\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkComparables_artwork on Artwork {\n  auctionResult: comparableAuctionResults(first: 6) @optionalField {\n    edges {\n      cursor\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        artistID\n        internalID\n        id\n      }\n    }\n  }\n  artist {\n    name\n    id\n  }\n}\n\nfragment MyCollectionArtworkDemandIndex_marketPriceInsights on ArtworkPriceInsights {\n  demandRank\n  demandRankDisplayText\n}\n\nfragment MyCollectionArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkImageBrowser_artwork_yvCPB\n  internalID\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      width\n      height\n    }\n    ... on Video {\n      id\n    }\n  }\n}\n\nfragment MyCollectionArtworkInsights_artwork on Artwork {\n  ...MyCollectionArtworkComparables_artwork\n  ...MyCollectionArtworkRequestPriceEstimateSection_artwork\n  artist {\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n  marketPriceInsights {\n    ...MyCollectionArtworkArtistMarket_marketPriceInsights\n    ...MyCollectionArtworkDemandIndex_marketPriceInsights\n  }\n}\n\nfragment MyCollectionArtworkMeta_artwork on Artwork {\n  artistNames\n  title\n}\n\nfragment MyCollectionArtworkRequestPriceEstimateSection_artwork on Artwork {\n  hasPriceEstimateRequest\n  isPriceEstimateRequestable\n  internalID\n}\n\nfragment MyCollectionArtworkSidebarMetadata_artwork on Artwork {\n  category\n  confidentialNotes\n  medium\n  metric\n  dimensions {\n    in\n    cm\n  }\n  provenance\n  attributionClass {\n    shortDescription\n    id\n  }\n  editionOf\n  pricePaid {\n    display\n  }\n  artworkLocation\n}\n\nfragment MyCollectionArtworkSidebarTitleInfo_artwork on Artwork {\n  artistNames\n  title\n  date\n  artist {\n    href\n    isPersonalArtist\n    id\n  }\n}\n\nfragment MyCollectionArtworkSidebar_artwork on Artwork {\n  ...MyCollectionArtworkSidebarTitleInfo_artwork\n  ...MyCollectionArtworkSidebarMetadata_artwork\n}\n\nfragment MyCollectionArtwork_artwork on Artwork {\n  ...MyCollectionArtworkSidebar_artwork\n  ...MyCollectionArtworkMeta_artwork\n  ...MyCollectionArtworkInsights_artwork\n  ...MyCollectionArtworkImageBrowser_artwork\n  ...MyCollectionArtworkComparables_artwork\n  ...MyCollectionArtworkSidebarTitleInfo_artwork\n  ...MyCollectionArtworkRequestPriceEstimateSection_artwork\n  comparables: comparableAuctionResults {\n    totalCount\n  }\n  hasMarketPriceInsights\n  submissionId\n  internalID\n  slug\n  consignmentSubmission {\n    displayText\n  }\n  artist {\n    slug\n    targetSupply {\n      isP1\n    }\n    auctionResults: auctionResultsConnection {\n      totalCount\n    }\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ViewInRoom_artwork on Artwork {\n  ...ViewInRoomArtwork_artwork\n}\n"
  }
};
})();

(node as any).hash = "5fd3b94bce8eb91054083f590353edf7";

export default node;
