/**
 * @generated SignedSource<<61e6f77b794931114a929d6159180f2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
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
  "name": "internalID",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v4 = [
  {
    "kind": "Literal",
    "name": "shallow",
    "value": true
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
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
  "name": "name",
  "storageKey": null
},
v8 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 1
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v10 = [
  (v9/*: any*/)
],
v11 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 6
  }
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v14 = [
  (v12/*: any*/),
  (v13/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v15 = {
  "alias": "dimension_text",
  "args": null,
  "kind": "ScalarField",
  "name": "dimensionText",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "organization",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artist",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    (v7/*: any*/)
  ],
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v22 = [
  (v18/*: any*/),
  (v19/*: any*/),
  (v20/*: any*/),
  (v21/*: any*/)
],
v23 = {
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
          "selections": (v22/*: any*/),
          "storageKey": "cropped(height:130,version:[\"square140\"],width:130)"
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mediumText",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categoryText",
  "storageKey": null
},
v26 = {
  "alias": "date_text",
  "args": null,
  "kind": "ScalarField",
  "name": "dateText",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleDate",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "boughtIn",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v31 = {
  "alias": "price_realized",
  "args": null,
  "concreteType": "AuctionResultPriceRealized",
  "kind": "LinkedField",
  "name": "priceRealized",
  "plural": false,
  "selections": [
    (v30/*: any*/),
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
v32 = {
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
v33 = [
  (v30/*: any*/)
],
v34 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotEstimate",
  "kind": "LinkedField",
  "name": "estimate",
  "plural": false,
  "selections": (v33/*: any*/),
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "location",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotNumber",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleTitle",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isUpcoming",
  "storageKey": null
},
v39 = [
  {
    "kind": "Literal",
    "name": "includeAll",
    "value": true
  }
],
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDefault",
  "storageKey": null
},
v41 = [
  {
    "kind": "Literal",
    "name": "height",
    "value": 800
  },
  {
    "kind": "Literal",
    "name": "version",
    "value": [
      "main",
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
v42 = [
  (v20/*: any*/),
  (v21/*: any*/),
  (v18/*: any*/),
  (v19/*: any*/)
],
v43 = {
  "alias": "type",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v44 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v45 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Artist"
},
v46 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultConnection"
},
v47 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v48 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "AuctionResultEdge"
},
v49 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResult"
},
v50 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v51 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotEstimate"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotImages"
},
v54 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v56 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v57 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotPerformance"
},
v59 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultPriceRealized"
},
v60 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v61 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v62 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
},
v63 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v64 = {
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
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": "isOwnedByCurrentUser",
            "args": [
              {
                "kind": "Literal",
                "name": "default",
                "value": false
              },
              {
                "kind": "Literal",
                "name": "saves",
                "value": false
              }
            ],
            "kind": "ScalarField",
            "name": "isSavedToList",
            "storageKey": "isSavedToList(default:false,saves:false)"
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistNames",
            "storageKey": null
          },
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "date",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artist",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPersonalArtist",
                "storageKey": null
              },
              (v6/*: any*/),
              (v7/*: any*/),
              (v2/*: any*/),
              {
                "alias": "auctionResultsCount",
                "args": (v8/*: any*/),
                "concreteType": "AuctionResultConnection",
                "kind": "LinkedField",
                "name": "auctionResultsConnection",
                "plural": false,
                "selections": (v10/*: any*/),
                "storageKey": "auctionResultsConnection(first:1)"
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
                    "name": "priority",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/),
              {
                "alias": null,
                "args": (v11/*: any*/),
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
                        "selections": (v14/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "first",
                        "plural": false,
                        "selections": (v14/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PageCursor",
                        "kind": "LinkedField",
                        "name": "last",
                        "plural": false,
                        "selections": (v14/*: any*/),
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
                          (v12/*: any*/),
                          (v13/*: any*/)
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
                          (v3/*: any*/),
                          (v15/*: any*/),
                          (v16/*: any*/),
                          (v17/*: any*/),
                          (v23/*: any*/),
                          (v24/*: any*/),
                          (v25/*: any*/),
                          (v26/*: any*/),
                          (v27/*: any*/),
                          (v28/*: any*/),
                          (v29/*: any*/),
                          (v31/*: any*/),
                          (v32/*: any*/),
                          (v34/*: any*/),
                          (v35/*: any*/),
                          (v36/*: any*/),
                          (v37/*: any*/),
                          (v38/*: any*/),
                          (v6/*: any*/)
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
                "selections": (v10/*: any*/),
                "storageKey": null
              }
            ],
            "storageKey": "artist(shallow:true)"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtworkMedium",
            "kind": "LinkedField",
            "name": "mediumType",
            "plural": false,
            "selections": [
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "additionalInformation",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "exhibitionHistory",
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
              (v6/*: any*/)
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
            "selections": (v33/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MyLocation",
            "kind": "LinkedField",
            "name": "collectorLocation",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "city",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "state",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "country",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "countryCode",
                "storageKey": null
              },
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": "auctionResults",
            "args": (v8/*: any*/),
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "comparableAuctionResults",
            "plural": false,
            "selections": (v10/*: any*/),
            "storageKey": "comparableAuctionResults(first:1)"
          },
          {
            "alias": "auctionResult",
            "args": (v11/*: any*/),
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
                  (v12/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v3/*: any*/),
                      (v15/*: any*/),
                      (v16/*: any*/),
                      (v17/*: any*/),
                      (v23/*: any*/),
                      (v24/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v27/*: any*/),
                      (v28/*: any*/),
                      (v29/*: any*/),
                      (v31/*: any*/),
                      (v32/*: any*/),
                      (v34/*: any*/),
                      (v35/*: any*/),
                      (v36/*: any*/),
                      (v37/*: any*/),
                      (v38/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "artistID",
                        "storageKey": null
                      },
                      (v6/*: any*/)
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
          (v6/*: any*/),
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
            "name": "isSavedToAnyList",
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
              (v6/*: any*/),
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
                  (v6/*: any*/)
                ],
                "storageKey": null
              },
              (v2/*: any*/),
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
            "name": "downloadableImageUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "Artist",
            "kind": "LinkedField",
            "name": "artists",
            "plural": true,
            "selections": [
              (v7/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": "artists(shallow:true)"
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": (v39/*: any*/),
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
              (v1/*: any*/),
              (v40/*: any*/),
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
                "args": (v41/*: any*/),
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v42/*: any*/),
                "storageKey": "cropped(height:800,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": (v41/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v42/*: any*/),
                "storageKey": "resized(height:800,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
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
            "name": "diameterCm",
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
                "args": (v41/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v22/*: any*/),
                "storageKey": "resized(height:800,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
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
              (v2/*: any*/),
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "caption",
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
            "args": (v39/*: any*/),
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
                  (v6/*: any*/),
                  (v43/*: any*/)
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
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isZoomable",
                    "storageKey": null
                  },
                  (v43/*: any*/),
                  (v40/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/)
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
            "selections": (v10/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasMarketPriceInsights",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "97ff077052705322474112f5ecda34eb",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.additionalInformation": (v44/*: any*/),
        "artwork.artist": (v45/*: any*/),
        "artwork.artist.auctionResults": (v46/*: any*/),
        "artwork.artist.auctionResults.totalCount": (v47/*: any*/),
        "artwork.artist.auctionResultsConnection": (v46/*: any*/),
        "artwork.artist.auctionResultsConnection.edges": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node": (v49/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist": (v45/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist.id": (v50/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist.name": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.boughtIn": (v51/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.categoryText": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.currency": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.date_text": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.dimension_text": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.estimate": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.estimate.display": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.id": (v50/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images": (v53/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.height": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.src": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.srcSet": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.width": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.internalID": (v50/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.isUpcoming": (v51/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.location": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.lotNumber": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.mediumText": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.organization": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.performance": (v58/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.performance.mid": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.cents_usd": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.display": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.display_usd": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.saleDate": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.saleTitle": (v44/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.title": (v44/*: any*/),
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
        "artwork.artist.auctionResultsConnection.pageCursors.around.cursor": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.around.isCurrent": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.around.page": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first": (v62/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.cursor": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.isCurrent": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.page": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last": (v62/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.cursor": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.isCurrent": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.page": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous": (v62/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous.cursor": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous.page": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "artwork.artist.auctionResultsConnection.pageInfo.hasNextPage": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.totalCount": (v47/*: any*/),
        "artwork.artist.auctionResultsCount": (v46/*: any*/),
        "artwork.artist.auctionResultsCount.totalCount": (v47/*: any*/),
        "artwork.artist.href": (v44/*: any*/),
        "artwork.artist.id": (v50/*: any*/),
        "artwork.artist.internalID": (v50/*: any*/),
        "artwork.artist.isPersonalArtist": (v51/*: any*/),
        "artwork.artist.name": (v44/*: any*/),
        "artwork.artist.slug": (v50/*: any*/),
        "artwork.artist.targetSupply": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtistTargetSupply"
        },
        "artwork.artist.targetSupply.priority": {
          "enumValues": [
            "FALSE",
            "TRUE"
          ],
          "nullable": true,
          "plural": false,
          "type": "ArtistTargetSupplyPriority"
        },
        "artwork.artistNames": (v44/*: any*/),
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.id": (v50/*: any*/),
        "artwork.artists.name": (v44/*: any*/),
        "artwork.artworkMeta": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMeta"
        },
        "artwork.artworkMeta.share": (v44/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v50/*: any*/),
        "artwork.attributionClass.shortDescription": (v44/*: any*/),
        "artwork.auctionResult": (v46/*: any*/),
        "artwork.auctionResult.edges": (v48/*: any*/),
        "artwork.auctionResult.edges.cursor": (v57/*: any*/),
        "artwork.auctionResult.edges.node": (v49/*: any*/),
        "artwork.auctionResult.edges.node.artist": (v45/*: any*/),
        "artwork.auctionResult.edges.node.artist.id": (v50/*: any*/),
        "artwork.auctionResult.edges.node.artist.name": (v44/*: any*/),
        "artwork.auctionResult.edges.node.artistID": (v57/*: any*/),
        "artwork.auctionResult.edges.node.boughtIn": (v51/*: any*/),
        "artwork.auctionResult.edges.node.categoryText": (v44/*: any*/),
        "artwork.auctionResult.edges.node.currency": (v44/*: any*/),
        "artwork.auctionResult.edges.node.date_text": (v44/*: any*/),
        "artwork.auctionResult.edges.node.dimension_text": (v44/*: any*/),
        "artwork.auctionResult.edges.node.estimate": (v52/*: any*/),
        "artwork.auctionResult.edges.node.estimate.display": (v44/*: any*/),
        "artwork.auctionResult.edges.node.id": (v50/*: any*/),
        "artwork.auctionResult.edges.node.images": (v53/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail": (v54/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped": (v55/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.height": (v56/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.src": (v57/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.srcSet": (v57/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.width": (v56/*: any*/),
        "artwork.auctionResult.edges.node.internalID": (v50/*: any*/),
        "artwork.auctionResult.edges.node.isUpcoming": (v51/*: any*/),
        "artwork.auctionResult.edges.node.location": (v44/*: any*/),
        "artwork.auctionResult.edges.node.lotNumber": (v44/*: any*/),
        "artwork.auctionResult.edges.node.mediumText": (v44/*: any*/),
        "artwork.auctionResult.edges.node.organization": (v44/*: any*/),
        "artwork.auctionResult.edges.node.performance": (v58/*: any*/),
        "artwork.auctionResult.edges.node.performance.mid": (v44/*: any*/),
        "artwork.auctionResult.edges.node.price_realized": (v59/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.cents_usd": (v60/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.display": (v44/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.display_usd": (v44/*: any*/),
        "artwork.auctionResult.edges.node.saleDate": (v44/*: any*/),
        "artwork.auctionResult.edges.node.saleTitle": (v44/*: any*/),
        "artwork.auctionResult.edges.node.title": (v44/*: any*/),
        "artwork.auctionResults": (v46/*: any*/),
        "artwork.auctionResults.totalCount": (v47/*: any*/),
        "artwork.caption": (v44/*: any*/),
        "artwork.collectorLocation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyLocation"
        },
        "artwork.collectorLocation.city": (v44/*: any*/),
        "artwork.collectorLocation.country": (v44/*: any*/),
        "artwork.collectorLocation.countryCode": (v44/*: any*/),
        "artwork.collectorLocation.id": (v50/*: any*/),
        "artwork.collectorLocation.state": (v44/*: any*/),
        "artwork.collectorSignals": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CollectorSignals"
        },
        "artwork.collectorSignals.auction": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AuctionCollectorSignals"
        },
        "artwork.collectorSignals.auction.lotWatcherCount": (v56/*: any*/),
        "artwork.comparables": (v46/*: any*/),
        "artwork.comparables.totalCount": (v47/*: any*/),
        "artwork.confidentialNotes": (v44/*: any*/),
        "artwork.date": (v44/*: any*/),
        "artwork.diameterCm": (v60/*: any*/),
        "artwork.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.dimensions.cm": (v44/*: any*/),
        "artwork.dimensions.in": (v44/*: any*/),
        "artwork.downloadableImageUrl": (v44/*: any*/),
        "artwork.editionOf": (v44/*: any*/),
        "artwork.exhibitionHistory": (v44/*: any*/),
        "artwork.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtworkFigures"
        },
        "artwork.figures.__typename": (v57/*: any*/),
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
        "artwork.figures.deepZoom.Image.Format": (v44/*: any*/),
        "artwork.figures.deepZoom.Image.Overlap": (v47/*: any*/),
        "artwork.figures.deepZoom.Image.Size": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImageSize"
        },
        "artwork.figures.deepZoom.Image.Size.Height": (v47/*: any*/),
        "artwork.figures.deepZoom.Image.Size.Width": (v47/*: any*/),
        "artwork.figures.deepZoom.Image.TileSize": (v47/*: any*/),
        "artwork.figures.deepZoom.Image.Url": (v44/*: any*/),
        "artwork.figures.deepZoom.Image.xmlns": (v44/*: any*/),
        "artwork.figures.height": (v47/*: any*/),
        "artwork.figures.id": (v50/*: any*/),
        "artwork.figures.internalID": (v63/*: any*/),
        "artwork.figures.isDefault": (v51/*: any*/),
        "artwork.figures.isZoomable": (v51/*: any*/),
        "artwork.figures.playerUrl": (v57/*: any*/),
        "artwork.figures.type": (v57/*: any*/),
        "artwork.figures.videoHeight": (v56/*: any*/),
        "artwork.figures.videoWidth": (v56/*: any*/),
        "artwork.figures.width": (v47/*: any*/),
        "artwork.formattedMetadata": (v44/*: any*/),
        "artwork.hasMarketPriceInsights": (v51/*: any*/),
        "artwork.heightCm": (v60/*: any*/),
        "artwork.href": (v44/*: any*/),
        "artwork.id": (v50/*: any*/),
        "artwork.image": (v54/*: any*/),
        "artwork.image.resized": (v64/*: any*/),
        "artwork.image.resized.height": (v47/*: any*/),
        "artwork.image.resized.src": (v57/*: any*/),
        "artwork.image.resized.srcSet": (v57/*: any*/),
        "artwork.image.resized.width": (v47/*: any*/),
        "artwork.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "artwork.images.fallback": (v55/*: any*/),
        "artwork.images.fallback.height": (v56/*: any*/),
        "artwork.images.fallback.src": (v57/*: any*/),
        "artwork.images.fallback.srcSet": (v57/*: any*/),
        "artwork.images.fallback.width": (v56/*: any*/),
        "artwork.images.internalID": (v63/*: any*/),
        "artwork.images.isDefault": (v51/*: any*/),
        "artwork.images.placeholder": (v44/*: any*/),
        "artwork.images.resized": (v64/*: any*/),
        "artwork.images.resized.height": (v47/*: any*/),
        "artwork.images.resized.src": (v57/*: any*/),
        "artwork.images.resized.srcSet": (v57/*: any*/),
        "artwork.images.resized.width": (v47/*: any*/),
        "artwork.images.url": (v44/*: any*/),
        "artwork.images.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "artwork.internalID": (v50/*: any*/),
        "artwork.isDownloadable": (v51/*: any*/),
        "artwork.isHangable": (v51/*: any*/),
        "artwork.isInAuction": (v51/*: any*/),
        "artwork.isOwnedByCurrentUser": (v61/*: any*/),
        "artwork.isSavedToAnyList": (v61/*: any*/),
        "artwork.isSetVideoAsCover": (v51/*: any*/),
        "artwork.isUnlisted": (v61/*: any*/),
        "artwork.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artwork.marketPriceInsights.annualLotsSold": (v47/*: any*/),
        "artwork.marketPriceInsights.annualValueSoldDisplayText": (v44/*: any*/),
        "artwork.marketPriceInsights.demandRank": (v60/*: any*/),
        "artwork.marketPriceInsights.demandRankDisplayText": (v44/*: any*/),
        "artwork.marketPriceInsights.liquidityRankDisplayText": (v44/*: any*/),
        "artwork.marketPriceInsights.medianSaleOverEstimatePercentage": (v60/*: any*/),
        "artwork.marketPriceInsights.sellThroughRate": (v60/*: any*/),
        "artwork.medium": (v44/*: any*/),
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.name": (v44/*: any*/),
        "artwork.metric": (v44/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.id": (v50/*: any*/),
        "artwork.partner.slug": (v50/*: any*/),
        "artwork.preview": (v54/*: any*/),
        "artwork.preview.url": (v44/*: any*/),
        "artwork.pricePaid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "artwork.pricePaid.display": (v44/*: any*/),
        "artwork.provenance": (v44/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.id": (v50/*: any*/),
        "artwork.sale.isAuction": (v51/*: any*/),
        "artwork.sale.isClosed": (v51/*: any*/),
        "artwork.sale.isLiveOpen": (v51/*: any*/),
        "artwork.sale.isRegistrationClosed": (v51/*: any*/),
        "artwork.sale.liveStartAt": (v44/*: any*/),
        "artwork.sale.registrationEndsAt": (v44/*: any*/),
        "artwork.sale.registrationStatus": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "artwork.sale.registrationStatus.id": (v50/*: any*/),
        "artwork.sale.registrationStatus.qualifiedForBidding": (v51/*: any*/),
        "artwork.sale.slug": (v50/*: any*/),
        "artwork.slug": (v50/*: any*/),
        "artwork.title": (v44/*: any*/),
        "artwork.widthCm": (v60/*: any*/)
      }
    },
    "name": "MyCollectionArtworkTestQuery",
    "operationKind": "query",
    "text": "query MyCollectionArtworkTestQuery {\n  artwork(id: \"foo\") {\n    ...MyCollectionArtwork_artwork\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    id\n    name\n  }\n  images {\n    thumbnail {\n      cropped(width: 130, height: 130, version: [\"square140\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  location\n  lotNumber\n  saleTitle\n  isUpcoming\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isInAuction\n  isSavedToAnyList\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  collectorSignals {\n    auction {\n      lotWatcherCount\n    }\n  }\n  ...ArtworkActionsWatchLotButton_artwork\n}\n\nfragment ArtworkActionsWatchLotButton_artwork on Artwork {\n  sale {\n    isLiveOpen\n    isRegistrationClosed\n    liveStartAt\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    id\n  }\n  ...ArtworkAuctionRegistrationPanel_artwork\n}\n\nfragment ArtworkActions_artwork_yvCPB on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkDownloadButton_artwork\n  ...ArtworkSharePanel_artwork_yvCPB\n  ...ViewInRoom_artwork\n  isUnlisted\n  slug\n  downloadableImageUrl\n  isDownloadable\n  isHangable\n  partner {\n    slug\n    id\n  }\n}\n\nfragment ArtworkAuctionRegistrationPanel_artwork on Artwork {\n  sale {\n    slug\n    registrationEndsAt\n    isRegistrationClosed\n    id\n  }\n}\n\nfragment ArtworkDownloadButton_artwork on Artwork {\n  title\n  date\n  downloadableImageUrl\n  artists(shallow: true) {\n    name\n    id\n  }\n}\n\nfragment ArtworkImageBrowserLarge_artwork_yvCPB on Artwork {\n  ...ArtworkLightbox_artwork_yvCPB\n  ...ArtworkVideoPlayer_artwork_yvCPB\n  isSetVideoAsCover\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      __typename\n      internalID\n      isZoomable\n    }\n    ... on Video {\n      __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowserSmall_artwork_yvCPB on Artwork {\n  ...ArtworkLightbox_artwork_yvCPB\n  ...ArtworkVideoPlayer_artwork_yvCPB\n  isSetVideoAsCover\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      internalID\n      isZoomable\n      type: __typename\n    }\n    ... on Video {\n      type: __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowser_artwork_yvCPB on Artwork {\n  ...ArtworkActions_artwork_yvCPB\n  ...ArtworkImageBrowserSmall_artwork_yvCPB\n  ...ArtworkImageBrowserLarge_artwork_yvCPB\n  internalID\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      isDefault\n      width\n      height\n    }\n    ... on Video {\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n  isSetVideoAsCover\n}\n\nfragment ArtworkLightbox_artwork_yvCPB on Artwork {\n  caption\n  formattedMetadata\n  images(includeAll: true) {\n    internalID\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    versions\n  }\n}\n\nfragment ArtworkSharePanel_artwork_yvCPB on Artwork {\n  href\n  images(includeAll: true) {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ArtworkVideoPlayer_artwork_yvCPB on Artwork {\n  internalID\n  slug\n  figures(includeAll: true) {\n    __typename\n    ... on Video {\n      __typename\n      playerUrl\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkAboutTab_artwork on Artwork {\n  ...MyCollectionArtworkDetails_artwork\n  artist(shallow: true) {\n    slug\n    targetSupply {\n      priority\n    }\n    id\n  }\n  internalID\n}\n\nfragment MyCollectionArtworkArtistMarket_marketPriceInsights on ArtworkPriceInsights {\n  annualLotsSold\n  annualValueSoldDisplayText\n  medianSaleOverEstimatePercentage\n  liquidityRankDisplayText\n  sellThroughRate\n}\n\nfragment MyCollectionArtworkAuctionResults_artist on Artist {\n  slug\n  internalID\n  auctionResultsConnection(first: 6) {\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkComparables_artwork on Artwork {\n  auctionResult: comparableAuctionResults(first: 6) @optionalField {\n    edges {\n      cursor\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        artistID\n        internalID\n        id\n      }\n    }\n  }\n  artist(shallow: true) {\n    name\n    id\n  }\n}\n\nfragment MyCollectionArtworkDemandIndex_marketPriceInsights on ArtworkPriceInsights {\n  demandRank\n  demandRankDisplayText\n}\n\nfragment MyCollectionArtworkDetails_artwork on Artwork {\n  mediumType {\n    name\n  }\n  additionalInformation\n  exhibitionHistory\n  confidentialNotes\n  medium\n  metric\n  dimensions {\n    in\n    cm\n  }\n  provenance\n  attributionClass {\n    shortDescription\n    id\n  }\n  editionOf\n  pricePaid {\n    display\n  }\n  collectorLocation {\n    city\n    state\n    country\n    countryCode\n    id\n  }\n}\n\nfragment MyCollectionArtworkHeader_artwork on Artwork {\n  internalID\n  slug\n  isOwnedByCurrentUser: isSavedToList(default: false, saves: false)\n}\n\nfragment MyCollectionArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkImageBrowser_artwork_yvCPB\n  internalID\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      width\n      height\n    }\n    ... on Video {\n      id\n    }\n  }\n}\n\nfragment MyCollectionArtworkInsights_artwork on Artwork {\n  internalID\n  auctionResults: comparableAuctionResults(first: 1) @optionalField {\n    totalCount\n  }\n  ...MyCollectionArtworkComparables_artwork\n  artist(shallow: true) {\n    slug\n    auctionResultsCount: auctionResultsConnection(first: 1) {\n      totalCount\n    }\n    targetSupply {\n      priority\n    }\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n  marketPriceInsights {\n    ...MyCollectionArtworkArtistMarket_marketPriceInsights\n    ...MyCollectionArtworkDemandIndex_marketPriceInsights\n  }\n}\n\nfragment MyCollectionArtworkMeta_artwork on Artwork {\n  artistNames\n  title\n}\n\nfragment MyCollectionArtworkTitle_artwork on Artwork {\n  artistNames\n  title\n  date\n  artist(shallow: true) {\n    href\n    isPersonalArtist\n    id\n  }\n}\n\nfragment MyCollectionArtwork_artwork on Artwork {\n  ...MyCollectionArtworkHeader_artwork\n  ...MyCollectionArtworkTitle_artwork\n  ...MyCollectionArtworkDetails_artwork\n  ...MyCollectionArtworkMeta_artwork\n  ...MyCollectionArtworkInsights_artwork\n  ...MyCollectionArtworkImageBrowser_artwork\n  ...MyCollectionArtworkComparables_artwork\n  ...MyCollectionArtworkAboutTab_artwork\n  comparables: comparableAuctionResults {\n    totalCount\n  }\n  hasMarketPriceInsights\n  internalID\n  slug\n  artist(shallow: true) {\n    slug\n    targetSupply {\n      priority\n    }\n    auctionResults: auctionResultsConnection {\n      totalCount\n    }\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  diameterCm\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ViewInRoom_artwork on Artwork {\n  ...ViewInRoomArtwork_artwork\n}\n"
  }
};
})();

(node as any).hash = "5fd3b94bce8eb91054083f590353edf7";

export default node;
