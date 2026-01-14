/**
 * @generated SignedSource<<4d362a9a6bb44858af55ab2cddf54199>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type AuctionResultsAggregation = "CURRENCIES_COUNT" | "LOTS_BY_CREATED_YEAR" | "LOTS_BY_SALE_YEAR" | "SIMPLE_PRICE_HISTOGRAM" | "%future added value";
export type AuctionResultsState = "ALL" | "PAST" | "UPCOMING" | "%future added value";
export type ArtistAuctionResultsQueryRendererQuery$variables = {
  allowEmptyCreatedDates?: boolean | null | undefined;
  allowUnspecifiedSaleDates?: boolean | null | undefined;
  artistID: string;
  categories?: ReadonlyArray<string | null | undefined> | null | undefined;
  createdAfterYear?: number | null | undefined;
  createdBeforeYear?: number | null | undefined;
  currency?: string | null | undefined;
  includeEstimateRange?: boolean | null | undefined;
  includeUnknownPrices?: boolean | null | undefined;
  organizations?: ReadonlyArray<string | null | undefined> | null | undefined;
  page?: number | null | undefined;
  priceRange?: string | null | undefined;
  saleEndYear?: number | null | undefined;
  saleStartYear?: number | null | undefined;
  sizes?: ReadonlyArray<ArtworkSizes | null | undefined> | null | undefined;
  state?: AuctionResultsState | null | undefined;
};
export type ArtistAuctionResultsQueryRendererQuery$data = {
  readonly artist: {
    readonly sidebarAggregations: {
      readonly aggregations: ReadonlyArray<{
        readonly counts: ReadonlyArray<{
          readonly count: number;
          readonly name: string;
          readonly value: string;
        } | null | undefined> | null | undefined;
        readonly slice: AuctionResultsAggregation | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResults_artist">;
  } | null | undefined;
};
export type ArtistAuctionResultsQueryRendererQuery = {
  response: ArtistAuctionResultsQueryRendererQuery$data;
  variables: ArtistAuctionResultsQueryRendererQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "allowEmptyCreatedDates"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "allowUnspecifiedSaleDates"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "artistID"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categories"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "createdAfterYear"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "createdBeforeYear"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "currency"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeEstimateRange"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeUnknownPrices"
},
v9 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "organizations"
},
v10 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "page"
},
v11 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "priceRange"
},
v12 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "saleEndYear"
},
v13 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "saleStartYear"
},
v14 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sizes"
},
v15 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "state"
},
v16 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v17 = {
  "kind": "Variable",
  "name": "allowEmptyCreatedDates",
  "variableName": "allowEmptyCreatedDates"
},
v18 = {
  "kind": "Variable",
  "name": "allowUnspecifiedSaleDates",
  "variableName": "allowUnspecifiedSaleDates"
},
v19 = {
  "kind": "Variable",
  "name": "categories",
  "variableName": "categories"
},
v20 = {
  "kind": "Variable",
  "name": "currency",
  "variableName": "currency"
},
v21 = {
  "kind": "Variable",
  "name": "includeEstimateRange",
  "variableName": "includeEstimateRange"
},
v22 = {
  "kind": "Variable",
  "name": "includeUnknownPrices",
  "variableName": "includeUnknownPrices"
},
v23 = {
  "kind": "Variable",
  "name": "organizations",
  "variableName": "organizations"
},
v24 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v25 = {
  "kind": "Variable",
  "name": "priceRange",
  "variableName": "priceRange"
},
v26 = {
  "kind": "Variable",
  "name": "saleEndYear",
  "variableName": "saleEndYear"
},
v27 = {
  "kind": "Variable",
  "name": "saleStartYear",
  "variableName": "saleStartYear"
},
v28 = {
  "kind": "Variable",
  "name": "sizes",
  "variableName": "sizes"
},
v29 = {
  "kind": "Variable",
  "name": "state",
  "variableName": "state"
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v31 = {
  "alias": "sidebarAggregations",
  "args": [
    {
      "kind": "Literal",
      "name": "aggregations",
      "value": [
        "SIMPLE_PRICE_HISTOGRAM",
        "CURRENCIES_COUNT",
        "LOTS_BY_SALE_YEAR",
        "LOTS_BY_CREATED_YEAR"
      ]
    }
  ],
  "concreteType": "AuctionResultConnection",
  "kind": "LinkedField",
  "name": "auctionResultsConnection",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AuctionResultsAggregationType",
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
            (v30/*: any*/),
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
    }
  ],
  "storageKey": "auctionResultsConnection(aggregations:[\"SIMPLE_PRICE_HISTOGRAM\",\"CURRENCIES_COUNT\",\"LOTS_BY_SALE_YEAR\",\"LOTS_BY_CREATED_YEAR\"])"
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v34 = {
  "kind": "Variable",
  "name": "earliestCreatedYear",
  "variableName": "createdAfterYear"
},
v35 = {
  "kind": "Variable",
  "name": "latestCreatedYear",
  "variableName": "createdBeforeYear"
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v38 = [
  (v36/*: any*/),
  (v37/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v41 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v42 = [
  (v39/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      (v9/*: any*/),
      (v10/*: any*/),
      (v11/*: any*/),
      (v12/*: any*/),
      (v13/*: any*/),
      (v14/*: any*/),
      (v15/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistAuctionResultsQueryRendererQuery",
    "selections": [
      {
        "alias": null,
        "args": (v16/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": [
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              {
                "kind": "Variable",
                "name": "createdAfterYear",
                "variableName": "createdAfterYear"
              },
              {
                "kind": "Variable",
                "name": "createdBeforeYear",
                "variableName": "createdBeforeYear"
              },
              (v20/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              (v29/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ArtistAuctionResults_artist"
          },
          (v31/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v10/*: any*/),
      (v15/*: any*/),
      (v2/*: any*/),
      (v9/*: any*/),
      (v3/*: any*/),
      (v14/*: any*/),
      (v11/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v0/*: any*/),
      (v13/*: any*/),
      (v12/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "ArtistAuctionResultsQueryRendererQuery",
    "selections": [
      {
        "alias": null,
        "args": (v16/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "slug",
            "storageKey": null
          },
          (v32/*: any*/),
          (v30/*: any*/),
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "page",
                "value": "AUCTION_RESULTS"
              }
            ],
            "concreteType": "ArtistMeta",
            "kind": "LinkedField",
            "name": "meta",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              (v33/*: any*/)
            ],
            "storageKey": "meta(page:\"AUCTION_RESULTS\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistStatuses",
            "kind": "LinkedField",
            "name": "statuses",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "auctionLots",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v34/*: any*/),
              {
                "kind": "Literal",
                "name": "first",
                "value": 50
              },
              (v21/*: any*/),
              (v22/*: any*/),
              (v35/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "DATE_DESC"
              },
              (v29/*: any*/)
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": [
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
                    "selections": (v38/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v38/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v38/*: any*/),
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
                      (v36/*: any*/),
                      (v37/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v39/*: any*/),
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
                      (v32/*: any*/),
                      (v33/*: any*/),
                      {
                        "alias": "dimension_text",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "dimensionText",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "organization",
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
                          (v30/*: any*/),
                          (v40/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
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
                                "storageKey": "cropped(height:130,version:[\"square140\"],width:130)"
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
                        "name": "mediumText",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "categoryText",
                        "storageKey": null
                      },
                      {
                        "alias": "date_text",
                        "args": null,
                        "kind": "ScalarField",
                        "name": "dateText",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleDate",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "boughtIn",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "currency",
                        "storageKey": null
                      },
                      {
                        "alias": "price_realized",
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "kind": "LinkedField",
                        "name": "priceRealized",
                        "plural": false,
                        "selections": [
                          (v41/*: any*/),
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
                      {
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
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AuctionLotEstimate",
                        "kind": "LinkedField",
                        "name": "estimate",
                        "plural": false,
                        "selections": [
                          (v41/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "location",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lotNumber",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "saleTitle",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isUpcoming",
                        "storageKey": null
                      },
                      (v40/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": "pastAuctionResults",
            "args": [
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v34/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              (v35/*: any*/),
              (v23/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              {
                "kind": "Literal",
                "name": "state",
                "value": "PAST"
              }
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": (v42/*: any*/),
            "storageKey": null
          },
          {
            "alias": "upcomingAuctionResults",
            "args": [
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v34/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              (v35/*: any*/),
              (v23/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              {
                "kind": "Literal",
                "name": "state",
                "value": "UPCOMING"
              }
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": (v42/*: any*/),
            "storageKey": null
          },
          (v31/*: any*/),
          (v40/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8ac508ecab9ded5ebfd8a7007e0c13e5",
    "id": null,
    "metadata": {},
    "name": "ArtistAuctionResultsQueryRendererQuery",
    "operationKind": "query",
    "text": "query ArtistAuctionResultsQueryRendererQuery(\n  $page: Int\n  $state: AuctionResultsState\n  $artistID: String!\n  $organizations: [String]\n  $categories: [String]\n  $sizes: [ArtworkSizes]\n  $priceRange: String\n  $currency: String\n  $includeEstimateRange: Boolean\n  $includeUnknownPrices: Boolean\n  $createdAfterYear: Int\n  $createdBeforeYear: Int\n  $allowEmptyCreatedDates: Boolean\n  $saleStartYear: Int\n  $saleEndYear: Int\n  $allowUnspecifiedSaleDates: Boolean\n) @cacheable {\n  artist(id: $artistID) {\n    ...ArtistAuctionResults_artist_1mUkLH\n    sidebarAggregations: auctionResultsConnection(aggregations: [SIMPLE_PRICE_HISTOGRAM, CURRENCIES_COUNT, LOTS_BY_SALE_YEAR, LOTS_BY_CREATED_YEAR]) {\n      aggregations {\n        slice\n        counts {\n          name\n          value\n          count\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    name\n    id\n  }\n  images {\n    thumbnail {\n      cropped(width: 130, height: 130, version: [\"square140\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  location\n  lotNumber\n  saleTitle\n  isUpcoming\n}\n\nfragment ArtistAuctionResults_artist_1mUkLH on Artist {\n  slug\n  internalID\n  name\n  meta(page: AUCTION_RESULTS) {\n    description\n    title\n  }\n  statuses {\n    auctionLots\n  }\n  auctionResultsConnection(first: 50, page: $page, sort: DATE_DESC, organizations: $organizations, categories: $categories, sizes: $sizes, priceRange: $priceRange, currency: $currency, saleStartYear: $saleStartYear, saleEndYear: $saleEndYear, allowUnspecifiedSaleDates: $allowUnspecifiedSaleDates, includeEstimateRange: $includeEstimateRange, includeUnknownPrices: $includeUnknownPrices, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates, state: $state) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    totalCount\n    edges {\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        isUpcoming\n        id\n      }\n    }\n  }\n  pastAuctionResults: auctionResultsConnection(state: PAST, organizations: $organizations, categories: $categories, sizes: $sizes, priceRange: $priceRange, currency: $currency, saleStartYear: $saleStartYear, saleEndYear: $saleEndYear, allowUnspecifiedSaleDates: $allowUnspecifiedSaleDates, includeEstimateRange: $includeEstimateRange, includeUnknownPrices: $includeUnknownPrices, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates) {\n    totalCount\n  }\n  upcomingAuctionResults: auctionResultsConnection(state: UPCOMING, organizations: $organizations, categories: $categories, sizes: $sizes, priceRange: $priceRange, currency: $currency, saleStartYear: $saleStartYear, saleEndYear: $saleEndYear, allowUnspecifiedSaleDates: $allowUnspecifiedSaleDates, includeEstimateRange: $includeEstimateRange, includeUnknownPrices: $includeUnknownPrices, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates) {\n    totalCount\n  }\n  sidebarAggregations: auctionResultsConnection(aggregations: [SIMPLE_PRICE_HISTOGRAM, CURRENCIES_COUNT, LOTS_BY_SALE_YEAR, LOTS_BY_CREATED_YEAR]) {\n    aggregations {\n      slice\n      counts {\n        name\n        value\n        count\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();

(node as any).hash = "c298e9bd4bcf685045e60ead2e4dd041";

export default node;
