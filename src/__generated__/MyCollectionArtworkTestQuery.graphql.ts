/**
 * @generated SignedSource<<cc78bacbefd40738787e606d52ae5058>>
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
v17 = [
  (v7/*: any*/),
  (v6/*: any*/)
],
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "Artist",
  "kind": "LinkedField",
  "name": "artist",
  "plural": false,
  "selections": (v17/*: any*/),
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "src",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "srcSet",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "width",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "height",
  "storageKey": null
},
v23 = [
  (v19/*: any*/),
  (v20/*: any*/),
  (v21/*: any*/),
  (v22/*: any*/)
],
v24 = {
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
          "selections": (v23/*: any*/),
          "storageKey": "cropped(height:130,version:[\"square140\"],width:130)"
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mediumText",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "categoryText",
  "storageKey": null
},
v27 = {
  "alias": "date_text",
  "args": null,
  "kind": "ScalarField",
  "name": "dateText",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleDate",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "boughtIn",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currency",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v32 = {
  "alias": "price_realized",
  "args": null,
  "concreteType": "AuctionResultPriceRealized",
  "kind": "LinkedField",
  "name": "priceRealized",
  "plural": false,
  "selections": [
    (v31/*: any*/),
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
v33 = {
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
v34 = [
  (v31/*: any*/)
],
v35 = {
  "alias": null,
  "args": null,
  "concreteType": "AuctionLotEstimate",
  "kind": "LinkedField",
  "name": "estimate",
  "plural": false,
  "selections": (v34/*: any*/),
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "location",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "lotNumber",
  "storageKey": null
},
v38 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "saleTitle",
  "storageKey": null
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isUpcoming",
  "storageKey": null
},
v40 = [
  {
    "kind": "Literal",
    "name": "includeAll",
    "value": true
  }
],
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isDefault",
  "storageKey": null
},
v42 = {
  "kind": "Literal",
  "name": "height",
  "value": 800
},
v43 = {
  "kind": "Literal",
  "name": "version",
  "value": [
    "main",
    "normalized",
    "larger",
    "large"
  ]
},
v44 = {
  "kind": "Literal",
  "name": "width",
  "value": 800
},
v45 = [
  (v42/*: any*/),
  {
    "kind": "Literal",
    "name": "quality",
    "value": 80
  },
  (v43/*: any*/),
  (v44/*: any*/)
],
v46 = [
  (v21/*: any*/),
  (v22/*: any*/),
  (v19/*: any*/),
  (v20/*: any*/)
],
v47 = {
  "alias": "type",
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
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
  "type": "Artist"
},
v50 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultConnection"
},
v51 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Int"
},
v52 = {
  "enumValues": null,
  "nullable": true,
  "plural": true,
  "type": "AuctionResultEdge"
},
v53 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResult"
},
v54 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v55 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v56 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotEstimate"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotImages"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v59 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v60 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v61 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v62 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotPerformance"
},
v63 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultPriceRealized"
},
v64 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v65 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v66 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
},
v67 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v68 = {
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
                          (v18/*: any*/),
                          (v24/*: any*/),
                          (v25/*: any*/),
                          (v26/*: any*/),
                          (v27/*: any*/),
                          (v28/*: any*/),
                          (v29/*: any*/),
                          (v30/*: any*/),
                          (v32/*: any*/),
                          (v33/*: any*/),
                          (v35/*: any*/),
                          (v36/*: any*/),
                          (v37/*: any*/),
                          (v38/*: any*/),
                          (v39/*: any*/),
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
            "selections": (v34/*: any*/),
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
                      (v18/*: any*/),
                      (v24/*: any*/),
                      (v25/*: any*/),
                      (v26/*: any*/),
                      (v27/*: any*/),
                      (v28/*: any*/),
                      (v29/*: any*/),
                      (v30/*: any*/),
                      (v32/*: any*/),
                      (v33/*: any*/),
                      (v35/*: any*/),
                      (v36/*: any*/),
                      (v37/*: any*/),
                      (v38/*: any*/),
                      (v39/*: any*/),
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
            "selections": (v17/*: any*/),
            "storageKey": "artists(shallow:true)"
          },
          (v5/*: any*/),
          {
            "alias": null,
            "args": (v40/*: any*/),
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
              (v41/*: any*/),
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
                "args": (v45/*: any*/),
                "concreteType": "CroppedImageUrl",
                "kind": "LinkedField",
                "name": "cropped",
                "plural": false,
                "selections": (v46/*: any*/),
                "storageKey": "cropped(height:800,quality:80,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": (v45/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v46/*: any*/),
                "storageKey": "resized(height:800,quality:80,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": "mobileLightboxSource",
                "args": [
                  (v42/*: any*/),
                  {
                    "kind": "Literal",
                    "name": "quality",
                    "value": 50
                  },
                  (v43/*: any*/),
                  (v44/*: any*/)
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v46/*: any*/),
                "storageKey": "resized(height:800,quality:50,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
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
                "args": [
                  (v42/*: any*/),
                  (v43/*: any*/),
                  (v44/*: any*/)
                ],
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v23/*: any*/),
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
            "args": (v40/*: any*/),
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
                  (v47/*: any*/)
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
                  (v47/*: any*/),
                  (v41/*: any*/),
                  (v21/*: any*/),
                  (v22/*: any*/)
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
    "cacheID": "ccffeab907dc61b2c0dc3e06f411c339",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.additionalInformation": (v48/*: any*/),
        "artwork.artist": (v49/*: any*/),
        "artwork.artist.auctionResults": (v50/*: any*/),
        "artwork.artist.auctionResults.totalCount": (v51/*: any*/),
        "artwork.artist.auctionResultsConnection": (v50/*: any*/),
        "artwork.artist.auctionResultsConnection.edges": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node": (v53/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist": (v49/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist.id": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist.name": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.boughtIn": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.categoryText": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.currency": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.date_text": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.dimension_text": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.estimate": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.estimate.display": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.id": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail": (v58/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.height": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.src": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.srcSet": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.width": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.internalID": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.isUpcoming": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.location": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.lotNumber": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.mediumText": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.organization": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.performance": (v62/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.performance.mid": (v48/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized": (v63/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.cents_usd": (v64/*: any*/),
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
        "artwork.artist.auctionResultsConnection.pageCursors.around.cursor": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.around.isCurrent": (v65/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.around.page": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first": (v66/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.cursor": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.isCurrent": (v65/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.page": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last": (v66/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.cursor": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.isCurrent": (v65/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.page": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous": (v66/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous.cursor": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous.page": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "artwork.artist.auctionResultsConnection.pageInfo.hasNextPage": (v65/*: any*/),
        "artwork.artist.auctionResultsConnection.totalCount": (v51/*: any*/),
        "artwork.artist.auctionResultsCount": (v50/*: any*/),
        "artwork.artist.auctionResultsCount.totalCount": (v51/*: any*/),
        "artwork.artist.href": (v48/*: any*/),
        "artwork.artist.id": (v54/*: any*/),
        "artwork.artist.internalID": (v54/*: any*/),
        "artwork.artist.isPersonalArtist": (v55/*: any*/),
        "artwork.artist.name": (v48/*: any*/),
        "artwork.artist.slug": (v54/*: any*/),
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
        "artwork.artistNames": (v48/*: any*/),
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.id": (v54/*: any*/),
        "artwork.artists.name": (v48/*: any*/),
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
        "artwork.attributionClass.id": (v54/*: any*/),
        "artwork.attributionClass.shortDescription": (v48/*: any*/),
        "artwork.auctionResult": (v50/*: any*/),
        "artwork.auctionResult.edges": (v52/*: any*/),
        "artwork.auctionResult.edges.cursor": (v61/*: any*/),
        "artwork.auctionResult.edges.node": (v53/*: any*/),
        "artwork.auctionResult.edges.node.artist": (v49/*: any*/),
        "artwork.auctionResult.edges.node.artist.id": (v54/*: any*/),
        "artwork.auctionResult.edges.node.artist.name": (v48/*: any*/),
        "artwork.auctionResult.edges.node.artistID": (v61/*: any*/),
        "artwork.auctionResult.edges.node.boughtIn": (v55/*: any*/),
        "artwork.auctionResult.edges.node.categoryText": (v48/*: any*/),
        "artwork.auctionResult.edges.node.currency": (v48/*: any*/),
        "artwork.auctionResult.edges.node.date_text": (v48/*: any*/),
        "artwork.auctionResult.edges.node.dimension_text": (v48/*: any*/),
        "artwork.auctionResult.edges.node.estimate": (v56/*: any*/),
        "artwork.auctionResult.edges.node.estimate.display": (v48/*: any*/),
        "artwork.auctionResult.edges.node.id": (v54/*: any*/),
        "artwork.auctionResult.edges.node.images": (v57/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail": (v58/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped": (v59/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.height": (v60/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.src": (v61/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.srcSet": (v61/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.width": (v60/*: any*/),
        "artwork.auctionResult.edges.node.internalID": (v54/*: any*/),
        "artwork.auctionResult.edges.node.isUpcoming": (v55/*: any*/),
        "artwork.auctionResult.edges.node.location": (v48/*: any*/),
        "artwork.auctionResult.edges.node.lotNumber": (v48/*: any*/),
        "artwork.auctionResult.edges.node.mediumText": (v48/*: any*/),
        "artwork.auctionResult.edges.node.organization": (v48/*: any*/),
        "artwork.auctionResult.edges.node.performance": (v62/*: any*/),
        "artwork.auctionResult.edges.node.performance.mid": (v48/*: any*/),
        "artwork.auctionResult.edges.node.price_realized": (v63/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.cents_usd": (v64/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.display": (v48/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.display_usd": (v48/*: any*/),
        "artwork.auctionResult.edges.node.saleDate": (v48/*: any*/),
        "artwork.auctionResult.edges.node.saleTitle": (v48/*: any*/),
        "artwork.auctionResult.edges.node.title": (v48/*: any*/),
        "artwork.auctionResults": (v50/*: any*/),
        "artwork.auctionResults.totalCount": (v51/*: any*/),
        "artwork.caption": (v48/*: any*/),
        "artwork.collectorLocation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyLocation"
        },
        "artwork.collectorLocation.city": (v48/*: any*/),
        "artwork.collectorLocation.country": (v48/*: any*/),
        "artwork.collectorLocation.countryCode": (v48/*: any*/),
        "artwork.collectorLocation.id": (v54/*: any*/),
        "artwork.collectorLocation.state": (v48/*: any*/),
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
        "artwork.collectorSignals.auction.lotWatcherCount": (v60/*: any*/),
        "artwork.comparables": (v50/*: any*/),
        "artwork.comparables.totalCount": (v51/*: any*/),
        "artwork.confidentialNotes": (v48/*: any*/),
        "artwork.date": (v48/*: any*/),
        "artwork.diameterCm": (v64/*: any*/),
        "artwork.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.dimensions.cm": (v48/*: any*/),
        "artwork.dimensions.in": (v48/*: any*/),
        "artwork.downloadableImageUrl": (v48/*: any*/),
        "artwork.editionOf": (v48/*: any*/),
        "artwork.exhibitionHistory": (v48/*: any*/),
        "artwork.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtworkFigures"
        },
        "artwork.figures.__typename": (v61/*: any*/),
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
        "artwork.figures.deepZoom.Image.Overlap": (v51/*: any*/),
        "artwork.figures.deepZoom.Image.Size": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "DeepZoomImageSize"
        },
        "artwork.figures.deepZoom.Image.Size.Height": (v51/*: any*/),
        "artwork.figures.deepZoom.Image.Size.Width": (v51/*: any*/),
        "artwork.figures.deepZoom.Image.TileSize": (v51/*: any*/),
        "artwork.figures.deepZoom.Image.Url": (v48/*: any*/),
        "artwork.figures.deepZoom.Image.xmlns": (v48/*: any*/),
        "artwork.figures.height": (v51/*: any*/),
        "artwork.figures.id": (v54/*: any*/),
        "artwork.figures.internalID": (v67/*: any*/),
        "artwork.figures.isDefault": (v55/*: any*/),
        "artwork.figures.isZoomable": (v55/*: any*/),
        "artwork.figures.playerUrl": (v61/*: any*/),
        "artwork.figures.type": (v61/*: any*/),
        "artwork.figures.videoHeight": (v60/*: any*/),
        "artwork.figures.videoWidth": (v60/*: any*/),
        "artwork.figures.width": (v51/*: any*/),
        "artwork.formattedMetadata": (v48/*: any*/),
        "artwork.hasMarketPriceInsights": (v55/*: any*/),
        "artwork.heightCm": (v64/*: any*/),
        "artwork.href": (v48/*: any*/),
        "artwork.id": (v54/*: any*/),
        "artwork.image": (v58/*: any*/),
        "artwork.image.resized": (v68/*: any*/),
        "artwork.image.resized.height": (v51/*: any*/),
        "artwork.image.resized.src": (v61/*: any*/),
        "artwork.image.resized.srcSet": (v61/*: any*/),
        "artwork.image.resized.width": (v51/*: any*/),
        "artwork.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "artwork.images.fallback": (v59/*: any*/),
        "artwork.images.fallback.height": (v60/*: any*/),
        "artwork.images.fallback.src": (v61/*: any*/),
        "artwork.images.fallback.srcSet": (v61/*: any*/),
        "artwork.images.fallback.width": (v60/*: any*/),
        "artwork.images.internalID": (v67/*: any*/),
        "artwork.images.isDefault": (v55/*: any*/),
        "artwork.images.mobileLightboxSource": (v68/*: any*/),
        "artwork.images.mobileLightboxSource.height": (v51/*: any*/),
        "artwork.images.mobileLightboxSource.src": (v61/*: any*/),
        "artwork.images.mobileLightboxSource.srcSet": (v61/*: any*/),
        "artwork.images.mobileLightboxSource.width": (v51/*: any*/),
        "artwork.images.placeholder": (v48/*: any*/),
        "artwork.images.resized": (v68/*: any*/),
        "artwork.images.resized.height": (v51/*: any*/),
        "artwork.images.resized.src": (v61/*: any*/),
        "artwork.images.resized.srcSet": (v61/*: any*/),
        "artwork.images.resized.width": (v51/*: any*/),
        "artwork.images.url": (v48/*: any*/),
        "artwork.images.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "artwork.internalID": (v54/*: any*/),
        "artwork.isDownloadable": (v55/*: any*/),
        "artwork.isHangable": (v55/*: any*/),
        "artwork.isInAuction": (v55/*: any*/),
        "artwork.isOwnedByCurrentUser": (v65/*: any*/),
        "artwork.isSavedToAnyList": (v65/*: any*/),
        "artwork.isSetVideoAsCover": (v55/*: any*/),
        "artwork.isUnlisted": (v65/*: any*/),
        "artwork.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artwork.marketPriceInsights.annualLotsSold": (v51/*: any*/),
        "artwork.marketPriceInsights.annualValueSoldDisplayText": (v48/*: any*/),
        "artwork.marketPriceInsights.demandRank": (v64/*: any*/),
        "artwork.marketPriceInsights.demandRankDisplayText": (v48/*: any*/),
        "artwork.marketPriceInsights.liquidityRankDisplayText": (v48/*: any*/),
        "artwork.marketPriceInsights.medianSaleOverEstimatePercentage": (v64/*: any*/),
        "artwork.marketPriceInsights.sellThroughRate": (v64/*: any*/),
        "artwork.medium": (v48/*: any*/),
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.name": (v48/*: any*/),
        "artwork.metric": (v48/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.id": (v54/*: any*/),
        "artwork.partner.slug": (v54/*: any*/),
        "artwork.preview": (v58/*: any*/),
        "artwork.preview.url": (v48/*: any*/),
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
        "artwork.sale.id": (v54/*: any*/),
        "artwork.sale.isAuction": (v55/*: any*/),
        "artwork.sale.isClosed": (v55/*: any*/),
        "artwork.sale.isLiveOpen": (v55/*: any*/),
        "artwork.sale.isRegistrationClosed": (v55/*: any*/),
        "artwork.sale.liveStartAt": (v48/*: any*/),
        "artwork.sale.registrationEndsAt": (v48/*: any*/),
        "artwork.sale.registrationStatus": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "artwork.sale.registrationStatus.id": (v54/*: any*/),
        "artwork.sale.registrationStatus.qualifiedForBidding": (v55/*: any*/),
        "artwork.sale.slug": (v54/*: any*/),
        "artwork.slug": (v54/*: any*/),
        "artwork.title": (v48/*: any*/),
        "artwork.widthCm": (v64/*: any*/)
      }
    },
    "name": "MyCollectionArtworkTestQuery",
    "operationKind": "query",
    "text": "query MyCollectionArtworkTestQuery {\n  artwork(id: \"foo\") {\n    ...MyCollectionArtwork_artwork\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    name\n    id\n  }\n  images {\n    thumbnail {\n      cropped(width: 130, height: 130, version: [\"square140\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  location\n  lotNumber\n  saleTitle\n  isUpcoming\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isInAuction\n  isSavedToAnyList\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  collectorSignals {\n    auction {\n      lotWatcherCount\n    }\n  }\n  ...ArtworkActionsWatchLotButton_artwork\n}\n\nfragment ArtworkActionsWatchLotButton_artwork on Artwork {\n  sale {\n    isLiveOpen\n    isRegistrationClosed\n    liveStartAt\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    id\n  }\n  ...ArtworkAuctionRegistrationPanel_artwork\n}\n\nfragment ArtworkActions_artwork_yvCPB on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkDownloadButton_artwork\n  ...ArtworkSharePanel_artwork_yvCPB\n  ...ViewInRoom_artwork\n  isUnlisted\n  slug\n  downloadableImageUrl\n  isDownloadable\n  isHangable\n  partner {\n    slug\n    id\n  }\n}\n\nfragment ArtworkAuctionRegistrationPanel_artwork on Artwork {\n  sale {\n    slug\n    registrationEndsAt\n    isRegistrationClosed\n    id\n  }\n}\n\nfragment ArtworkDownloadButton_artwork on Artwork {\n  title\n  date\n  downloadableImageUrl\n  artists(shallow: true) {\n    name\n    id\n  }\n}\n\nfragment ArtworkImageBrowserLarge_artwork_yvCPB on Artwork {\n  ...ArtworkLightbox_artwork_yvCPB\n  ...ArtworkVideoPlayer_artwork_yvCPB\n  isSetVideoAsCover\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      __typename\n      internalID\n      isZoomable\n    }\n    ... on Video {\n      __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowserSmall_artwork_yvCPB on Artwork {\n  ...ArtworkLightbox_artwork_yvCPB\n  ...ArtworkVideoPlayer_artwork_yvCPB\n  isSetVideoAsCover\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      internalID\n      isZoomable\n      type: __typename\n    }\n    ... on Video {\n      type: __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowser_artwork_yvCPB on Artwork {\n  ...ArtworkActions_artwork_yvCPB\n  ...ArtworkImageBrowserSmall_artwork_yvCPB\n  ...ArtworkImageBrowserLarge_artwork_yvCPB\n  internalID\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      isDefault\n      width\n      height\n    }\n    ... on Video {\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n  isSetVideoAsCover\n}\n\nfragment ArtworkLightbox_artwork_yvCPB on Artwork {\n  caption\n  formattedMetadata\n  images(includeAll: true) {\n    internalID\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(quality: 80, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(quality: 80, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    mobileLightboxSource: resized(quality: 50, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    versions\n  }\n}\n\nfragment ArtworkSharePanel_artwork_yvCPB on Artwork {\n  href\n  images(includeAll: true) {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ArtworkVideoPlayer_artwork_yvCPB on Artwork {\n  internalID\n  slug\n  figures(includeAll: true) {\n    __typename\n    ... on Video {\n      __typename\n      playerUrl\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkAboutTab_artwork on Artwork {\n  ...MyCollectionArtworkDetails_artwork\n  artist(shallow: true) {\n    slug\n    targetSupply {\n      priority\n    }\n    id\n  }\n  internalID\n}\n\nfragment MyCollectionArtworkArtistMarket_marketPriceInsights on ArtworkPriceInsights {\n  annualLotsSold\n  annualValueSoldDisplayText\n  medianSaleOverEstimatePercentage\n  liquidityRankDisplayText\n  sellThroughRate\n}\n\nfragment MyCollectionArtworkAuctionResults_artist on Artist {\n  slug\n  internalID\n  auctionResultsConnection(first: 6) {\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkComparables_artwork on Artwork {\n  internalID\n  auctionResult: comparableAuctionResults(first: 6) @optionalField {\n    edges {\n      cursor\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        artistID\n        internalID\n        id\n      }\n    }\n  }\n  artist(shallow: true) {\n    name\n    id\n  }\n}\n\nfragment MyCollectionArtworkDemandIndex_marketPriceInsights on ArtworkPriceInsights {\n  demandRank\n  demandRankDisplayText\n}\n\nfragment MyCollectionArtworkDetails_artwork on Artwork {\n  mediumType {\n    name\n  }\n  additionalInformation\n  exhibitionHistory\n  confidentialNotes\n  medium\n  metric\n  dimensions {\n    in\n    cm\n  }\n  provenance\n  attributionClass {\n    shortDescription\n    id\n  }\n  editionOf\n  pricePaid {\n    display\n  }\n  collectorLocation {\n    city\n    state\n    country\n    countryCode\n    id\n  }\n}\n\nfragment MyCollectionArtworkHeader_artwork on Artwork {\n  internalID\n  slug\n  isOwnedByCurrentUser: isSavedToList(default: false, saves: false)\n}\n\nfragment MyCollectionArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkImageBrowser_artwork_yvCPB\n  internalID\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      width\n      height\n    }\n    ... on Video {\n      id\n    }\n  }\n}\n\nfragment MyCollectionArtworkInsights_artwork on Artwork {\n  internalID\n  auctionResults: comparableAuctionResults(first: 1) @optionalField {\n    totalCount\n  }\n  ...MyCollectionArtworkComparables_artwork\n  artist(shallow: true) {\n    slug\n    auctionResultsCount: auctionResultsConnection(first: 1) {\n      totalCount\n    }\n    targetSupply {\n      priority\n    }\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n  marketPriceInsights {\n    ...MyCollectionArtworkArtistMarket_marketPriceInsights\n    ...MyCollectionArtworkDemandIndex_marketPriceInsights\n  }\n}\n\nfragment MyCollectionArtworkMeta_artwork on Artwork {\n  internalID\n  artistNames\n  title\n}\n\nfragment MyCollectionArtworkTitle_artwork on Artwork {\n  artistNames\n  title\n  date\n  artist(shallow: true) {\n    href\n    isPersonalArtist\n    id\n  }\n}\n\nfragment MyCollectionArtwork_artwork on Artwork {\n  ...MyCollectionArtworkHeader_artwork\n  ...MyCollectionArtworkTitle_artwork\n  ...MyCollectionArtworkDetails_artwork\n  ...MyCollectionArtworkMeta_artwork\n  ...MyCollectionArtworkInsights_artwork\n  ...MyCollectionArtworkImageBrowser_artwork\n  ...MyCollectionArtworkComparables_artwork\n  ...MyCollectionArtworkAboutTab_artwork\n  comparables: comparableAuctionResults {\n    totalCount\n  }\n  hasMarketPriceInsights\n  internalID\n  slug\n  artist(shallow: true) {\n    slug\n    targetSupply {\n      priority\n    }\n    auctionResults: auctionResultsConnection {\n      totalCount\n    }\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  diameterCm\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ViewInRoom_artwork on Artwork {\n  ...ViewInRoomArtwork_artwork\n}\n"
  }
};
})();

(node as any).hash = "5fd3b94bce8eb91054083f590353edf7";

export default node;
