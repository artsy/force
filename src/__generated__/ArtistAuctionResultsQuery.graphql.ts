/**
 * @generated SignedSource<<3d124e27805f9dd6aba18b5eaa0fbbcc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type AuctionResultSorts = "DATE_ASC" | "DATE_DESC" | "ESTIMATE_AND_DATE_DESC" | "PRICE_AND_DATE_DESC" | "%future added value";
export type AuctionResultsState = "ALL" | "PAST" | "UPCOMING" | "%future added value";
export type ArtistAuctionResultsQuery$variables = {
  allowEmptyCreatedDates?: boolean | null;
  artistID: string;
  before?: string | null;
  categories?: ReadonlyArray<string | null> | null;
  createdAfterYear?: number | null;
  createdBeforeYear?: number | null;
  first?: number | null;
  includeEstimateRange?: boolean | null;
  includeUnknownPrices?: boolean | null;
  keyword?: string | null;
  last?: number | null;
  organizations?: ReadonlyArray<string | null> | null;
  page?: number | null;
  priceRange?: string | null;
  size?: number | null;
  sizes?: ReadonlyArray<ArtworkSizes | null> | null;
  sort?: AuctionResultSorts | null;
  state?: AuctionResultsState | null;
};
export type ArtistAuctionResultsQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistAuctionResults_artist">;
  } | null;
};
export type ArtistAuctionResultsQuery = {
  response: ArtistAuctionResultsQuery$data;
  variables: ArtistAuctionResultsQuery$variables;
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
  "name": "before"
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
  "name": "first"
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
  "name": "keyword"
},
v10 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "last"
},
v11 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "organizations"
},
v12 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "page"
},
v13 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "priceRange"
},
v14 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "size"
},
v15 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sizes"
},
v16 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "sort"
},
v17 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "state"
},
v18 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v19 = {
  "kind": "Variable",
  "name": "allowEmptyCreatedDates",
  "variableName": "allowEmptyCreatedDates"
},
v20 = {
  "kind": "Variable",
  "name": "before",
  "variableName": "before"
},
v21 = {
  "kind": "Variable",
  "name": "categories",
  "variableName": "categories"
},
v22 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v23 = {
  "kind": "Variable",
  "name": "includeEstimateRange",
  "variableName": "includeEstimateRange"
},
v24 = {
  "kind": "Variable",
  "name": "includeUnknownPrices",
  "variableName": "includeUnknownPrices"
},
v25 = {
  "kind": "Variable",
  "name": "keyword",
  "variableName": "keyword"
},
v26 = {
  "kind": "Variable",
  "name": "last",
  "variableName": "last"
},
v27 = {
  "kind": "Variable",
  "name": "organizations",
  "variableName": "organizations"
},
v28 = {
  "kind": "Variable",
  "name": "page",
  "variableName": "page"
},
v29 = {
  "kind": "Variable",
  "name": "priceRange",
  "variableName": "priceRange"
},
v30 = {
  "kind": "Variable",
  "name": "size",
  "variableName": "size"
},
v31 = {
  "kind": "Variable",
  "name": "sizes",
  "variableName": "sizes"
},
v32 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v33 = {
  "kind": "Variable",
  "name": "state",
  "variableName": "state"
},
v34 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v37 = {
  "kind": "Variable",
  "name": "earliestCreatedYear",
  "variableName": "createdAfterYear"
},
v38 = {
  "kind": "Variable",
  "name": "latestCreatedYear",
  "variableName": "createdBeforeYear"
},
v39 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "cursor",
  "storageKey": null
},
v40 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "page",
  "storageKey": null
},
v41 = [
  (v39/*: any*/),
  (v40/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "isCurrent",
    "storageKey": null
  }
],
v42 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v43 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v44 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v45 = [
  (v42/*: any*/)
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
      (v15/*: any*/),
      (v16/*: any*/),
      (v17/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistAuctionResultsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v18/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": [
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
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
              (v22/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              (v29/*: any*/),
              (v30/*: any*/),
              (v31/*: any*/),
              (v32/*: any*/),
              (v33/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ArtistAuctionResults_artist"
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
      (v6/*: any*/),
      (v10/*: any*/),
      (v12/*: any*/),
      (v14/*: any*/),
      (v2/*: any*/),
      (v16/*: any*/),
      (v17/*: any*/),
      (v1/*: any*/),
      (v11/*: any*/),
      (v9/*: any*/),
      (v3/*: any*/),
      (v15/*: any*/),
      (v13/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      (v5/*: any*/),
      (v4/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "ArtistAuctionResultsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v18/*: any*/),
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
          (v34/*: any*/),
          (v35/*: any*/),
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
              (v36/*: any*/)
            ],
            "storageKey": "meta(page:\"AUCTION_RESULTS\")"
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "ArtistCounts",
            "kind": "LinkedField",
            "name": "counts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "auctionResults",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v37/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v38/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              (v29/*: any*/),
              (v30/*: any*/),
              (v31/*: any*/),
              (v32/*: any*/),
              (v33/*: any*/)
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "YearRange",
                "kind": "LinkedField",
                "name": "createdYearRange",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "startAt",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endAt",
                    "storageKey": null
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
                    "selections": (v41/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "first",
                    "plural": false,
                    "selections": (v41/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "kind": "LinkedField",
                    "name": "last",
                    "plural": false,
                    "selections": (v41/*: any*/),
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
                      (v39/*: any*/),
                      (v40/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v42/*: any*/),
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
                      (v34/*: any*/),
                      (v36/*: any*/),
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
                          (v35/*: any*/),
                          (v43/*: any*/)
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
                          (v44/*: any*/),
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
                          (v44/*: any*/)
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
                      (v43/*: any*/)
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
              (v19/*: any*/),
              (v21/*: any*/),
              (v37/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v38/*: any*/),
              (v27/*: any*/),
              (v29/*: any*/),
              (v31/*: any*/),
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
            "selections": (v45/*: any*/),
            "storageKey": null
          },
          {
            "alias": "upcomingAuctionResults",
            "args": [
              (v19/*: any*/),
              (v21/*: any*/),
              (v37/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v38/*: any*/),
              (v27/*: any*/),
              (v29/*: any*/),
              (v31/*: any*/),
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
            "selections": (v45/*: any*/),
            "storageKey": null
          },
          (v43/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "c80ae56f26814dcede50b769c1ad45eb",
    "id": null,
    "metadata": {},
    "name": "ArtistAuctionResultsQuery",
    "operationKind": "query",
    "text": "query ArtistAuctionResultsQuery(\n  $first: Int\n  $last: Int\n  $page: Int\n  $size: Int\n  $before: String\n  $sort: AuctionResultSorts\n  $state: AuctionResultsState\n  $artistID: String!\n  $organizations: [String]\n  $keyword: String\n  $categories: [String]\n  $sizes: [ArtworkSizes]\n  $priceRange: String\n  $includeEstimateRange: Boolean\n  $includeUnknownPrices: Boolean\n  $createdBeforeYear: Int\n  $createdAfterYear: Int\n  $allowEmptyCreatedDates: Boolean\n) {\n  artist(id: $artistID) {\n    ...ArtistAuctionResults_artist_1Yveoe\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  internalID\n  title\n  dimension_text: dimensionText\n  organization\n  artist {\n    name\n    id\n  }\n  images {\n    thumbnail {\n      cropped(width: 130, height: 130, version: [\"square140\"]) {\n        src\n        srcSet\n        width\n        height\n      }\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n  location\n  lotNumber\n  saleTitle\n  isUpcoming\n}\n\nfragment ArtistAuctionResults_artist_1Yveoe on Artist {\n  slug\n  internalID\n  name\n  meta(page: AUCTION_RESULTS) {\n    description\n    title\n  }\n  counts {\n    auctionResults\n  }\n  auctionResultsConnection(first: $first, page: $page, size: $size, before: $before, last: $last, sort: $sort, organizations: $organizations, keyword: $keyword, categories: $categories, sizes: $sizes, priceRange: $priceRange, includeEstimateRange: $includeEstimateRange, includeUnknownPrices: $includeUnknownPrices, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates, state: $state) {\n    createdYearRange {\n      startAt\n      endAt\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    totalCount\n    edges {\n      node {\n        ...ArtistAuctionResultItem_auctionResult\n        isUpcoming\n        id\n      }\n    }\n  }\n  pastAuctionResults: auctionResultsConnection(state: PAST, organizations: $organizations, keyword: $keyword, categories: $categories, sizes: $sizes, priceRange: $priceRange, includeEstimateRange: $includeEstimateRange, includeUnknownPrices: $includeUnknownPrices, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates) {\n    totalCount\n  }\n  upcomingAuctionResults: auctionResultsConnection(state: UPCOMING, organizations: $organizations, keyword: $keyword, categories: $categories, sizes: $sizes, priceRange: $priceRange, includeEstimateRange: $includeEstimateRange, includeUnknownPrices: $includeUnknownPrices, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates) {\n    totalCount\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();

(node as any).hash = "cd28e764659193dd4044b7511ce4d960";

export default node;
