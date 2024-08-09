/**
 * @generated SignedSource<<843efeb3a5b10043f88347412cf085ea>>
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
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkSWASectionSubmitted_submissionState" | "MyCollectionArtwork_artwork">;
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
  "name": "state",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
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
    "value": 85
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
  "type": "Artwork"
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
  "type": "String"
},
v56 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Boolean"
},
v57 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotEstimate"
},
v58 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotImages"
},
v59 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Image"
},
v60 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "CroppedImageUrl"
},
v61 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
},
v62 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v63 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionLotPerformance"
},
v64 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "AuctionResultPriceRealized"
},
v65 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "Float"
},
v66 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Boolean"
},
v67 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "PageCursor"
},
v68 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "ID"
},
v69 = {
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
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "MyCollectionArtworkSWASectionSubmitted_submissionState"
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
            "alias": null,
            "args": null,
            "concreteType": "ArtworkConsignmentSubmission",
            "kind": "LinkedField",
            "name": "consignmentSubmission",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "stateLabel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "stateHelpMessage",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "actionLabel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "buttonLabel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "externalID",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistNames",
            "storageKey": null
          },
          (v4/*: any*/),
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
                          (v4/*: any*/),
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
              (v7/*: any*/)
            ],
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
              (v3/*: any*/),
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
                      (v4/*: any*/),
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
            "args": (v8/*: any*/),
            "concreteType": "ArtworkConnection",
            "kind": "LinkedField",
            "name": "listedArtworksConnection",
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
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "listedArtworksConnection(first:1)"
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
            "selections": (v17/*: any*/),
            "storageKey": null
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
                "storageKey": "cropped(height:800,quality:85,version:[\"main\",\"normalized\",\"larger\",\"large\"],width:800)"
              },
              {
                "alias": null,
                "args": (v45/*: any*/),
                "concreteType": "ResizedImageUrl",
                "kind": "LinkedField",
                "name": "resized",
                "plural": false,
                "selections": (v46/*: any*/),
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
    "cacheID": "be769db9133b808628a73d1213c1b7c8",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": (v48/*: any*/),
        "artwork.artist": (v49/*: any*/),
        "artwork.artist.auctionResults": (v50/*: any*/),
        "artwork.artist.auctionResults.totalCount": (v51/*: any*/),
        "artwork.artist.auctionResultsConnection": (v50/*: any*/),
        "artwork.artist.auctionResultsConnection.edges": (v52/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node": (v53/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist": (v49/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist.id": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.artist.name": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.boughtIn": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.categoryText": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.currency": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.date_text": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.dimension_text": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.estimate": (v57/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.estimate.display": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.id": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images": (v58/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail": (v59/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped": (v60/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.height": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.src": (v62/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.srcSet": (v62/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.images.thumbnail.cropped.width": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.internalID": (v54/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.isUpcoming": (v56/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.location": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.lotNumber": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.mediumText": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.organization": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.performance": (v63/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.performance.mid": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized": (v64/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.cents_usd": (v65/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.display": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.price_realized.display_usd": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.saleDate": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.saleTitle": (v55/*: any*/),
        "artwork.artist.auctionResultsConnection.edges.node.title": (v55/*: any*/),
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
        "artwork.artist.auctionResultsConnection.pageCursors.around.cursor": (v62/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.around.isCurrent": (v66/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.around.page": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first": (v67/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.cursor": (v62/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.isCurrent": (v66/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.first.page": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last": (v67/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.cursor": (v62/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.isCurrent": (v66/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.last.page": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous": (v67/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous.cursor": (v62/*: any*/),
        "artwork.artist.auctionResultsConnection.pageCursors.previous.page": (v61/*: any*/),
        "artwork.artist.auctionResultsConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "artwork.artist.auctionResultsConnection.pageInfo.hasNextPage": (v66/*: any*/),
        "artwork.artist.auctionResultsConnection.totalCount": (v51/*: any*/),
        "artwork.artist.auctionResultsCount": (v50/*: any*/),
        "artwork.artist.auctionResultsCount.totalCount": (v51/*: any*/),
        "artwork.artist.href": (v55/*: any*/),
        "artwork.artist.id": (v54/*: any*/),
        "artwork.artist.internalID": (v54/*: any*/),
        "artwork.artist.isPersonalArtist": (v56/*: any*/),
        "artwork.artist.name": (v55/*: any*/),
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
        "artwork.artistNames": (v55/*: any*/),
        "artwork.artists": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Artist"
        },
        "artwork.artists.id": (v54/*: any*/),
        "artwork.artists.name": (v55/*: any*/),
        "artwork.artworkMeta": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMeta"
        },
        "artwork.artworkMeta.share": (v55/*: any*/),
        "artwork.attributionClass": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "AttributionClass"
        },
        "artwork.attributionClass.id": (v54/*: any*/),
        "artwork.attributionClass.shortDescription": (v55/*: any*/),
        "artwork.auctionResult": (v50/*: any*/),
        "artwork.auctionResult.edges": (v52/*: any*/),
        "artwork.auctionResult.edges.cursor": (v62/*: any*/),
        "artwork.auctionResult.edges.node": (v53/*: any*/),
        "artwork.auctionResult.edges.node.artist": (v49/*: any*/),
        "artwork.auctionResult.edges.node.artist.id": (v54/*: any*/),
        "artwork.auctionResult.edges.node.artist.name": (v55/*: any*/),
        "artwork.auctionResult.edges.node.artistID": (v62/*: any*/),
        "artwork.auctionResult.edges.node.boughtIn": (v56/*: any*/),
        "artwork.auctionResult.edges.node.categoryText": (v55/*: any*/),
        "artwork.auctionResult.edges.node.currency": (v55/*: any*/),
        "artwork.auctionResult.edges.node.date_text": (v55/*: any*/),
        "artwork.auctionResult.edges.node.dimension_text": (v55/*: any*/),
        "artwork.auctionResult.edges.node.estimate": (v57/*: any*/),
        "artwork.auctionResult.edges.node.estimate.display": (v55/*: any*/),
        "artwork.auctionResult.edges.node.id": (v54/*: any*/),
        "artwork.auctionResult.edges.node.images": (v58/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail": (v59/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped": (v60/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.height": (v61/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.src": (v62/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.srcSet": (v62/*: any*/),
        "artwork.auctionResult.edges.node.images.thumbnail.cropped.width": (v61/*: any*/),
        "artwork.auctionResult.edges.node.internalID": (v54/*: any*/),
        "artwork.auctionResult.edges.node.isUpcoming": (v56/*: any*/),
        "artwork.auctionResult.edges.node.location": (v55/*: any*/),
        "artwork.auctionResult.edges.node.lotNumber": (v55/*: any*/),
        "artwork.auctionResult.edges.node.mediumText": (v55/*: any*/),
        "artwork.auctionResult.edges.node.organization": (v55/*: any*/),
        "artwork.auctionResult.edges.node.performance": (v63/*: any*/),
        "artwork.auctionResult.edges.node.performance.mid": (v55/*: any*/),
        "artwork.auctionResult.edges.node.price_realized": (v64/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.cents_usd": (v65/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.display": (v55/*: any*/),
        "artwork.auctionResult.edges.node.price_realized.display_usd": (v55/*: any*/),
        "artwork.auctionResult.edges.node.saleDate": (v55/*: any*/),
        "artwork.auctionResult.edges.node.saleTitle": (v55/*: any*/),
        "artwork.auctionResult.edges.node.title": (v55/*: any*/),
        "artwork.auctionResults": (v50/*: any*/),
        "artwork.auctionResults.totalCount": (v51/*: any*/),
        "artwork.collectorLocation": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "MyLocation"
        },
        "artwork.collectorLocation.city": (v55/*: any*/),
        "artwork.collectorLocation.country": (v55/*: any*/),
        "artwork.collectorLocation.countryCode": (v55/*: any*/),
        "artwork.collectorLocation.id": (v54/*: any*/),
        "artwork.collectorLocation.state": (v55/*: any*/),
        "artwork.comparables": (v50/*: any*/),
        "artwork.comparables.totalCount": (v51/*: any*/),
        "artwork.confidentialNotes": (v55/*: any*/),
        "artwork.consignmentSubmission": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkConsignmentSubmission"
        },
        "artwork.consignmentSubmission.actionLabel": (v55/*: any*/),
        "artwork.consignmentSubmission.buttonLabel": (v55/*: any*/),
        "artwork.consignmentSubmission.externalID": (v55/*: any*/),
        "artwork.consignmentSubmission.internalID": (v55/*: any*/),
        "artwork.consignmentSubmission.state": {
          "enumValues": [
            "APPROVED",
            "CLOSED",
            "DRAFT",
            "HOLD",
            "PUBLISHED",
            "REJECTED",
            "RESUBMITTED",
            "SUBMITTED"
          ],
          "nullable": false,
          "plural": false,
          "type": "ArtworkConsignmentSubmissionState"
        },
        "artwork.consignmentSubmission.stateHelpMessage": (v55/*: any*/),
        "artwork.consignmentSubmission.stateLabel": (v55/*: any*/),
        "artwork.date": (v55/*: any*/),
        "artwork.dimensions": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "dimensions"
        },
        "artwork.dimensions.cm": (v55/*: any*/),
        "artwork.dimensions.in": (v55/*: any*/),
        "artwork.downloadableImageUrl": (v55/*: any*/),
        "artwork.editionOf": (v55/*: any*/),
        "artwork.figures": {
          "enumValues": null,
          "nullable": false,
          "plural": true,
          "type": "ArtworkFigures"
        },
        "artwork.figures.__typename": (v62/*: any*/),
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
        "artwork.figures.deepZoom.Image.Format": (v55/*: any*/),
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
        "artwork.figures.deepZoom.Image.Url": (v55/*: any*/),
        "artwork.figures.deepZoom.Image.xmlns": (v55/*: any*/),
        "artwork.figures.height": (v51/*: any*/),
        "artwork.figures.id": (v54/*: any*/),
        "artwork.figures.internalID": (v68/*: any*/),
        "artwork.figures.isDefault": (v56/*: any*/),
        "artwork.figures.isZoomable": (v56/*: any*/),
        "artwork.figures.playerUrl": (v62/*: any*/),
        "artwork.figures.type": (v62/*: any*/),
        "artwork.figures.videoHeight": (v61/*: any*/),
        "artwork.figures.videoWidth": (v61/*: any*/),
        "artwork.figures.width": (v51/*: any*/),
        "artwork.formattedMetadata": (v55/*: any*/),
        "artwork.hasMarketPriceInsights": (v56/*: any*/),
        "artwork.hasPriceEstimateRequest": (v56/*: any*/),
        "artwork.heightCm": (v65/*: any*/),
        "artwork.href": (v55/*: any*/),
        "artwork.id": (v54/*: any*/),
        "artwork.image": (v59/*: any*/),
        "artwork.image.resized": (v69/*: any*/),
        "artwork.image.resized.height": (v51/*: any*/),
        "artwork.image.resized.src": (v62/*: any*/),
        "artwork.image.resized.srcSet": (v62/*: any*/),
        "artwork.image.resized.width": (v51/*: any*/),
        "artwork.images": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "Image"
        },
        "artwork.images.fallback": (v60/*: any*/),
        "artwork.images.fallback.height": (v61/*: any*/),
        "artwork.images.fallback.src": (v62/*: any*/),
        "artwork.images.fallback.srcSet": (v62/*: any*/),
        "artwork.images.fallback.width": (v61/*: any*/),
        "artwork.images.internalID": (v68/*: any*/),
        "artwork.images.isDefault": (v56/*: any*/),
        "artwork.images.placeholder": (v55/*: any*/),
        "artwork.images.resized": (v69/*: any*/),
        "artwork.images.resized.height": (v51/*: any*/),
        "artwork.images.resized.src": (v62/*: any*/),
        "artwork.images.resized.srcSet": (v62/*: any*/),
        "artwork.images.resized.width": (v51/*: any*/),
        "artwork.images.url": (v55/*: any*/),
        "artwork.images.versions": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "String"
        },
        "artwork.internalID": (v54/*: any*/),
        "artwork.isDownloadable": (v56/*: any*/),
        "artwork.isHangable": (v56/*: any*/),
        "artwork.isInAuction": (v56/*: any*/),
        "artwork.isPriceEstimateRequestable": (v56/*: any*/),
        "artwork.isSaved": (v56/*: any*/),
        "artwork.isSavedToList": (v66/*: any*/),
        "artwork.isSetVideoAsCover": (v56/*: any*/),
        "artwork.isUnlisted": (v66/*: any*/),
        "artwork.listedArtworksConnection": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ArtworkConnection"
        },
        "artwork.listedArtworksConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "ArtworkEdge"
        },
        "artwork.listedArtworksConnection.edges.node": (v48/*: any*/),
        "artwork.listedArtworksConnection.edges.node.id": (v54/*: any*/),
        "artwork.listedArtworksConnection.edges.node.internalID": (v54/*: any*/),
        "artwork.marketPriceInsights": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkPriceInsights"
        },
        "artwork.marketPriceInsights.annualLotsSold": (v51/*: any*/),
        "artwork.marketPriceInsights.annualValueSoldDisplayText": (v55/*: any*/),
        "artwork.marketPriceInsights.demandRank": (v65/*: any*/),
        "artwork.marketPriceInsights.demandRankDisplayText": (v55/*: any*/),
        "artwork.marketPriceInsights.liquidityRankDisplayText": (v55/*: any*/),
        "artwork.marketPriceInsights.medianSaleOverEstimatePercentage": (v65/*: any*/),
        "artwork.marketPriceInsights.sellThroughRate": (v65/*: any*/),
        "artwork.medium": (v55/*: any*/),
        "artwork.mediumType": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "ArtworkMedium"
        },
        "artwork.mediumType.name": (v55/*: any*/),
        "artwork.metric": (v55/*: any*/),
        "artwork.partner": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Partner"
        },
        "artwork.partner.id": (v54/*: any*/),
        "artwork.partner.slug": (v54/*: any*/),
        "artwork.preview": (v59/*: any*/),
        "artwork.preview.url": (v55/*: any*/),
        "artwork.pricePaid": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Money"
        },
        "artwork.pricePaid.display": (v55/*: any*/),
        "artwork.provenance": (v55/*: any*/),
        "artwork.sale": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "artwork.sale.id": (v54/*: any*/),
        "artwork.sale.isAuction": (v56/*: any*/),
        "artwork.sale.isClosed": (v56/*: any*/),
        "artwork.sale.isLiveOpen": (v56/*: any*/),
        "artwork.sale.isRegistrationClosed": (v56/*: any*/),
        "artwork.sale.liveStartAt": (v55/*: any*/),
        "artwork.sale.registrationEndsAt": (v55/*: any*/),
        "artwork.sale.registrationStatus": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Bidder"
        },
        "artwork.sale.registrationStatus.id": (v54/*: any*/),
        "artwork.sale.registrationStatus.qualifiedForBidding": (v56/*: any*/),
        "artwork.sale.slug": (v54/*: any*/),
        "artwork.slug": (v54/*: any*/),
        "artwork.submissionId": (v55/*: any*/),
        "artwork.title": (v55/*: any*/),
        "artwork.widthCm": (v65/*: any*/)
      }
    },
    "name": "MyCollectionArtworkTestQuery",
    "operationKind": "query",
    "text": "query MyCollectionArtworkTestQuery {\n  artwork(id: \"foo\") {\n    ...MyCollectionArtwork_artwork\n    ...MyCollectionArtworkSWASectionSubmitted_submissionState\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    name\n    id\n  }\n  images {\n    thumbnail {\n      cropped(width: 130, height: 130, version: [\"square140\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  location\n  lotNumber\n  saleTitle\n  isUpcoming\n}\n\nfragment ArtworkActionsSaveButton_artwork on Artwork {\n  id\n  internalID\n  isSaved\n  slug\n  title\n  date\n  artistNames\n  preview: image {\n    url(version: \"square\")\n  }\n  isInAuction\n  isSavedToList\n  sale {\n    isAuction\n    isClosed\n    id\n  }\n  ...ArtworkActionsWatchLotButton_artwork\n}\n\nfragment ArtworkActionsWatchLotButton_artwork on Artwork {\n  sale {\n    isLiveOpen\n    isRegistrationClosed\n    liveStartAt\n    registrationStatus {\n      qualifiedForBidding\n      id\n    }\n    id\n  }\n  ...ArtworkAuctionRegistrationPanel_artwork\n}\n\nfragment ArtworkActions_artwork_yvCPB on Artwork {\n  ...ArtworkActionsSaveButton_artwork\n  ...ArtworkDownloadButton_artwork\n  ...ArtworkSharePanel_artwork_yvCPB\n  ...ViewInRoom_artwork\n  isUnlisted\n  slug\n  downloadableImageUrl\n  isDownloadable\n  isHangable\n  partner {\n    slug\n    id\n  }\n}\n\nfragment ArtworkAuctionRegistrationPanel_artwork on Artwork {\n  sale {\n    slug\n    registrationEndsAt\n    isRegistrationClosed\n    id\n  }\n}\n\nfragment ArtworkDownloadButton_artwork on Artwork {\n  title\n  date\n  downloadableImageUrl\n  artists {\n    name\n    id\n  }\n}\n\nfragment ArtworkImageBrowserLarge_artwork_yvCPB on Artwork {\n  ...ArtworkLightbox_artwork_yvCPB\n  ...ArtworkVideoPlayer_artwork_yvCPB\n  isSetVideoAsCover\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      __typename\n      internalID\n      isZoomable\n    }\n    ... on Video {\n      __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowserSmall_artwork_yvCPB on Artwork {\n  ...ArtworkLightbox_artwork_yvCPB\n  ...ArtworkVideoPlayer_artwork_yvCPB\n  isSetVideoAsCover\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      ...DeepZoom_image\n      internalID\n      isZoomable\n      type: __typename\n    }\n    ... on Video {\n      type: __typename\n      id\n    }\n  }\n}\n\nfragment ArtworkImageBrowser_artwork_yvCPB on Artwork {\n  ...ArtworkActions_artwork_yvCPB\n  ...ArtworkImageBrowserSmall_artwork_yvCPB\n  ...ArtworkImageBrowserLarge_artwork_yvCPB\n  internalID\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      isDefault\n      width\n      height\n    }\n    ... on Video {\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment ArtworkLightbox_artwork_yvCPB on Artwork {\n  formattedMetadata\n  images(includeAll: true) {\n    internalID\n    isDefault\n    placeholder: url(version: [\"small\", \"medium\"])\n    fallback: cropped(quality: 85, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    resized(quality: 85, width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      width\n      height\n      src\n      srcSet\n    }\n    versions\n  }\n}\n\nfragment ArtworkSharePanel_artwork_yvCPB on Artwork {\n  href\n  images(includeAll: true) {\n    url\n  }\n  artworkMeta: meta {\n    share\n  }\n}\n\nfragment ArtworkVideoPlayer_artwork_yvCPB on Artwork {\n  internalID\n  slug\n  figures(includeAll: true) {\n    __typename\n    ... on Video {\n      __typename\n      playerUrl\n      videoWidth: width\n      videoHeight: height\n      id\n    }\n  }\n}\n\nfragment DeepZoom_image on Image {\n  deepZoom {\n    Image {\n      xmlns\n      Url\n      Format\n      TileSize\n      Overlap\n      Size {\n        Width\n        Height\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkAboutTab_artwork on Artwork {\n  ...MyCollectionArtworkDetails_artwork\n  ...MyCollectionArtworkRequestPriceEstimate_artwork\n  ...MyCollectionArtworkSubmitForSale_artwork\n  artist {\n    slug\n    targetSupply {\n      priority\n    }\n    id\n  }\n  consignmentSubmission {\n    internalID\n  }\n  hasPriceEstimateRequest\n  internalID\n}\n\nfragment MyCollectionArtworkArtistMarket_marketPriceInsights on ArtworkPriceInsights {\n  annualLotsSold\n  annualValueSoldDisplayText\n  medianSaleOverEstimatePercentage\n  liquidityRankDisplayText\n  sellThroughRate\n}\n\nfragment MyCollectionArtworkAuctionResults_artist on Artist {\n  slug\n  internalID\n  auctionResultsConnection(first: 6) {\n    totalCount\n    pageInfo {\n      hasNextPage\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    edges {\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n\nfragment MyCollectionArtworkComparables_artwork on Artwork {\n  auctionResult: comparableAuctionResults(first: 6) @optionalField {\n    edges {\n      cursor\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        artistID\n        internalID\n        id\n      }\n    }\n  }\n  artist {\n    name\n    id\n  }\n}\n\nfragment MyCollectionArtworkDemandIndex_marketPriceInsights on ArtworkPriceInsights {\n  demandRank\n  demandRankDisplayText\n}\n\nfragment MyCollectionArtworkDetails_artwork on Artwork {\n  mediumType {\n    name\n  }\n  confidentialNotes\n  medium\n  metric\n  dimensions {\n    in\n    cm\n  }\n  provenance\n  attributionClass {\n    shortDescription\n    id\n  }\n  editionOf\n  pricePaid {\n    display\n  }\n  collectorLocation {\n    city\n    state\n    country\n    countryCode\n    id\n  }\n}\n\nfragment MyCollectionArtworkHeader_artwork on Artwork {\n  internalID\n  slug\n  consignmentSubmission {\n    internalID\n  }\n}\n\nfragment MyCollectionArtworkImageBrowser_artwork on Artwork {\n  ...ArtworkImageBrowser_artwork_yvCPB\n  internalID\n  figures(includeAll: true) {\n    __typename\n    ... on Image {\n      width\n      height\n    }\n    ... on Video {\n      id\n    }\n  }\n}\n\nfragment MyCollectionArtworkInsights_artwork on Artwork {\n  hasPriceEstimateRequest\n  isPriceEstimateRequestable\n  internalID\n  auctionResults: comparableAuctionResults(first: 1) @optionalField {\n    totalCount\n  }\n  ...MyCollectionArtworkComparables_artwork\n  ...MyCollectionArtworkRequestPriceEstimate_artwork\n  ...MyCollectionArtworkSWASectionSubmitted_submissionState\n  ...MyCollectionArtworkSWASubmissionStatus_artwork\n  artist {\n    slug\n    auctionResultsCount: auctionResultsConnection(first: 1) {\n      totalCount\n    }\n    targetSupply {\n      priority\n    }\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n  consignmentSubmission {\n    state\n    stateLabel\n  }\n  marketPriceInsights {\n    ...MyCollectionArtworkArtistMarket_marketPriceInsights\n    ...MyCollectionArtworkDemandIndex_marketPriceInsights\n  }\n  ...MyCollectionArtworkSubmitForSale_artwork\n}\n\nfragment MyCollectionArtworkMeta_artwork on Artwork {\n  artistNames\n  title\n}\n\nfragment MyCollectionArtworkRequestPriceEstimate_artwork on Artwork {\n  hasPriceEstimateRequest\n  isPriceEstimateRequestable\n  internalID\n}\n\nfragment MyCollectionArtworkSWASectionSubmitted_submissionState on Artwork {\n  consignmentSubmission {\n    internalID\n    state\n    stateLabel\n    stateHelpMessage\n  }\n}\n\nfragment MyCollectionArtworkSWASubmissionStatus_artwork on Artwork {\n  internalID\n  listedArtworksConnection(first: 1) {\n    edges {\n      node {\n        internalID\n        id\n      }\n    }\n  }\n  consignmentSubmission {\n    actionLabel\n    buttonLabel\n    externalID\n    internalID\n    state\n    stateLabel\n    stateHelpMessage\n  }\n}\n\nfragment MyCollectionArtworkSubmitForSale_artwork on Artwork {\n  internalID\n  artist {\n    internalID\n    slug\n    targetSupply {\n      priority\n    }\n    id\n  }\n  consignmentSubmission {\n    internalID\n  }\n  marketPriceInsights {\n    demandRank\n  }\n}\n\nfragment MyCollectionArtworkTitle_artwork on Artwork {\n  artistNames\n  title\n  date\n  artist {\n    href\n    isPersonalArtist\n    id\n  }\n}\n\nfragment MyCollectionArtwork_artwork on Artwork {\n  ...MyCollectionArtworkHeader_artwork\n  ...MyCollectionArtworkTitle_artwork\n  ...MyCollectionArtworkDetails_artwork\n  ...MyCollectionArtworkMeta_artwork\n  ...MyCollectionArtworkInsights_artwork\n  ...MyCollectionArtworkImageBrowser_artwork\n  ...MyCollectionArtworkComparables_artwork\n  ...MyCollectionArtworkRequestPriceEstimate_artwork\n  ...MyCollectionArtworkSWASectionSubmitted_submissionState\n  ...MyCollectionArtworkSWASubmissionStatus_artwork\n  ...MyCollectionArtworkSubmitForSale_artwork\n  ...MyCollectionArtworkAboutTab_artwork\n  comparables: comparableAuctionResults {\n    totalCount\n  }\n  hasPriceEstimateRequest\n  hasMarketPriceInsights\n  submissionId\n  internalID\n  slug\n  consignmentSubmission {\n    state\n    internalID\n  }\n  artist {\n    slug\n    targetSupply {\n      priority\n    }\n    auctionResults: auctionResultsConnection {\n      totalCount\n    }\n    ...MyCollectionArtworkAuctionResults_artist\n    id\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n\nfragment ViewInRoomArtwork_artwork on Artwork {\n  widthCm\n  heightCm\n  image {\n    resized(width: 800, height: 800, version: [\"main\", \"normalized\", \"larger\", \"large\"]) {\n      src\n      srcSet\n      width\n      height\n    }\n  }\n}\n\nfragment ViewInRoom_artwork on Artwork {\n  ...ViewInRoomArtwork_artwork\n}\n"
  }
};
})();

(node as any).hash = "cb7056e03316de44d8ad2456bb0df516";

export default node;
