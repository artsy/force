/**
 * @generated SignedSource<<0595bb11708db796c0b00db73f669eea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type AuctionResultsState = "ALL" | "PAST" | "UPCOMING" | "%future added value";
export type artistRoutes_AuctionResultsQuery$variables = {
  allowEmptyCreatedDates?: boolean | null | undefined;
  artistID: string;
  categories?: ReadonlyArray<string | null | undefined> | null | undefined;
  createdAfterYear?: number | null | undefined;
  createdBeforeYear?: number | null | undefined;
  includeEstimateRange?: boolean | null | undefined;
  includeUnknownPrices?: boolean | null | undefined;
  organizations?: ReadonlyArray<string | null | undefined> | null | undefined;
  page?: number | null | undefined;
  priceRange?: string | null | undefined;
  sizes?: ReadonlyArray<ArtworkSizes | null | undefined> | null | undefined;
  state?: AuctionResultsState | null | undefined;
};
export type artistRoutes_AuctionResultsQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResultsRoute_artist">;
  } | null | undefined;
};
export type artistRoutes_AuctionResultsQuery = {
  response: artistRoutes_AuctionResultsQuery$data;
  variables: artistRoutes_AuctionResultsQuery$variables;
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
  "name": "artistID"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "categories"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "createdAfterYear"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "createdBeforeYear"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeEstimateRange"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "includeUnknownPrices"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "organizations"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "page"
},
v9 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "priceRange"
},
v10 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sizes"
},
v11 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "state"
},
v12 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v13 = {
  "kind": "Variable",
  "name": "allowEmptyCreatedDates",
  "variableName": "allowEmptyCreatedDates"
},
v14 = {
  "kind": "Variable",
  "name": "categories",
  "variableName": "categories"
},
v15 = {
  "kind": "Variable",
  "name": "includeEstimateRange",
  "variableName": "includeEstimateRange"
},
v16 = {
  "kind": "Variable",
  "name": "includeUnknownPrices",
  "variableName": "includeUnknownPrices"
},
v17 = {
  "kind": "Variable",
  "name": "organizations",
  "variableName": "organizations"
},
v18 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v19 = {
  "kind": "Variable",
  "name": "priceRange",
  "variableName": "priceRange"
},
v20 = {
  "kind": "Variable",
  "name": "sizes",
  "variableName": "sizes"
},
v21 = {
  "kind": "Variable",
  "name": "state",
  "variableName": "state"
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v25 = {
  "kind": "Variable",
  "name": "earliestCreatedYear",
  "variableName": "createdAfterYear"
},
v26 = {
  "kind": "Variable",
  "name": "latestCreatedYear",
  "variableName": "createdBeforeYear"
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v29 = [
  (v27/*: any*/),
  (v28/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v33 = [
  (v30/*: any*/)
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
      (v11/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "artistRoutes_AuctionResultsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v12/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": [
              (v13/*: any*/),
              (v14/*: any*/),
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
              (v15/*: any*/),
              (v16/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ArtistAuctionResultsRoute_artist"
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
    "argumentDefinitions": [
      (v8/*: any*/),
      (v11/*: any*/),
      (v1/*: any*/),
      (v7/*: any*/),
      (v2/*: any*/),
      (v10/*: any*/),
      (v9/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "artistRoutes_AuctionResultsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v12/*: any*/),
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
          (v22/*: any*/),
          (v23/*: any*/),
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
              (v24/*: any*/)
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
              (v13/*: any*/),
              (v14/*: any*/),
              (v25/*: any*/),
              {
                "kind": "Literal",
                "name": "first",
                "value": 50
              },
              (v15/*: any*/),
              (v16/*: any*/),
              (v26/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              {
                "kind": "Literal",
                "name": "sort",
                "value": "DATE_DESC"
              },
              (v21/*: any*/)
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
                    "selections": (v29/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v29/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v29/*: any*/),
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
                      (v27/*: any*/),
                      (v28/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v30/*: any*/),
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
                      (v22/*: any*/),
                      (v24/*: any*/),
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
                          (v23/*: any*/),
                          (v31/*: any*/)
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
                          (v32/*: any*/),
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
                          (v32/*: any*/)
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
                      (v31/*: any*/)
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
              (v13/*: any*/),
              (v14/*: any*/),
              (v25/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v26/*: any*/),
              (v17/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
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
            "selections": (v33/*: any*/),
            "storageKey": null
          },
          {
            "alias": "upcomingAuctionResults",
            "args": [
              (v13/*: any*/),
              (v14/*: any*/),
              (v25/*: any*/),
              (v15/*: any*/),
              (v16/*: any*/),
              (v26/*: any*/),
              (v17/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
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
            "selections": (v33/*: any*/),
            "storageKey": null
          },
          {
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
                      (v23/*: any*/),
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
          (v31/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c2198be5b317e9fda4b7d55f35a4b39f",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_AuctionResultsQuery",
    "operationKind": "query",
    "text": "query artistRoutes_AuctionResultsQuery(\n  $page: Int\n  $state: AuctionResultsState\n  $artistID: String!\n  $organizations: [String]\n  $categories: [String]\n  $sizes: [ArtworkSizes]\n  $priceRange: String\n  $includeEstimateRange: Boolean\n  $includeUnknownPrices: Boolean\n  $createdAfterYear: Int\n  $createdBeforeYear: Int\n  $allowEmptyCreatedDates: Boolean\n) {\n  artist(id: $artistID) {\n    ...ArtistAuctionResultsRoute_artist_rukZa\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    name\n    id\n  }\n  images {\n    thumbnail {\n      cropped(width: 130, height: 130, version: [\"square140\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  location\n  lotNumber\n  saleTitle\n  isUpcoming\n}\n\nfragment ArtistAuctionResultsRoute_artist_rukZa on Artist {\n  ...ArtistAuctionResults_artist_2rF1H1\n  sidebarAggregations: auctionResultsConnection(aggregations: [SIMPLE_PRICE_HISTOGRAM, CURRENCIES_COUNT, LOTS_BY_SALE_YEAR, LOTS_BY_CREATED_YEAR]) {\n    aggregations {\n      slice\n      counts {\n        name\n        value\n        count\n      }\n    }\n  }\n}\n\nfragment ArtistAuctionResults_artist_2rF1H1 on Artist {\n  slug\n  internalID\n  name\n  meta(page: AUCTION_RESULTS) {\n    description\n    title\n  }\n  statuses {\n    auctionLots\n  }\n  auctionResultsConnection(first: 50, page: $page, sort: DATE_DESC, organizations: $organizations, categories: $categories, sizes: $sizes, priceRange: $priceRange, includeEstimateRange: $includeEstimateRange, includeUnknownPrices: $includeUnknownPrices, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates, state: $state) {\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    totalCount\n    edges {\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        isUpcoming\n        id\n      }\n    }\n  }\n  pastAuctionResults: auctionResultsConnection(state: PAST, organizations: $organizations, categories: $categories, sizes: $sizes, priceRange: $priceRange, includeEstimateRange: $includeEstimateRange, includeUnknownPrices: $includeUnknownPrices, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates) {\n    totalCount\n  }\n  upcomingAuctionResults: auctionResultsConnection(state: UPCOMING, organizations: $organizations, categories: $categories, sizes: $sizes, priceRange: $priceRange, includeEstimateRange: $includeEstimateRange, includeUnknownPrices: $includeUnknownPrices, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates) {\n    totalCount\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();

(node as any).hash = "06ad0be0c32595b5d30cce963a187ce2";

export default node;
