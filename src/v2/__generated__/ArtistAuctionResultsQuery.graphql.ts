/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtworkSizes = "LARGE" | "MEDIUM" | "SMALL" | "%future added value";
export type AuctionResultSorts = "DATE_DESC" | "ESTIMATE_AND_DATE_DESC" | "PRICE_AND_DATE_DESC" | "%future added value";
export type ArtistAuctionResultsQueryVariables = {
    first?: number | null;
    last?: number | null;
    after?: string | null;
    before?: string | null;
    sort?: AuctionResultSorts | null;
    artistID: string;
    organizations?: Array<string | null> | null;
    keyword?: string | null;
    categories?: Array<string | null> | null;
    sizes?: Array<ArtworkSizes | null> | null;
    createdBeforeYear?: number | null;
    createdAfterYear?: number | null;
    allowEmptyCreatedDates?: boolean | null;
};
export type ArtistAuctionResultsQueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistAuctionResults_artist">;
    } | null;
};
export type ArtistAuctionResultsQuery = {
    readonly response: ArtistAuctionResultsQueryResponse;
    readonly variables: ArtistAuctionResultsQueryVariables;
};



/*
query ArtistAuctionResultsQuery(
  $first: Int
  $last: Int
  $after: String
  $before: String
  $sort: AuctionResultSorts
  $artistID: String!
  $organizations: [String]
  $keyword: String
  $categories: [String]
  $sizes: [ArtworkSizes]
  $createdBeforeYear: Int
  $createdAfterYear: Int
  $allowEmptyCreatedDates: Boolean
) {
  artist(id: $artistID) {
    ...ArtistAuctionResults_artist_2dM7Jd
    id
  }
}

fragment ArtistAuctionResultItem_auctionResult on AuctionResult {
  title
  dimension_text: dimensionText
  organization
  images {
    thumbnail {
      url
    }
  }
  mediumText
  categoryText
  date_text: dateText
  saleDate
  boughtIn
  currency
  price_realized: priceRealized {
    display
    display_usd: displayUSD
    cents_usd: centsUSD
  }
  performance {
    mid
  }
  estimate {
    display
  }
}

fragment ArtistAuctionResultsCount_results on AuctionResultConnection {
  totalCount
}

fragment ArtistAuctionResults_artist_2dM7Jd on Artist {
  slug
  internalID
  name
  auctionResultsConnection(first: $first, after: $after, before: $before, last: $last, sort: $sort, organizations: $organizations, keyword: $keyword, categories: $categories, sizes: $sizes, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates) {
    ...ArtistAuctionResultsCount_results
    createdYearRange {
      startAt
      endAt
    }
    pageInfo {
      hasNextPage
      endCursor
    }
    pageCursors {
      ...Pagination_pageCursors
    }
    totalCount
    edges {
      node {
        title
        dimension_text: dimensionText
        images {
          thumbnail {
            url
          }
        }
        description
        date_text: dateText
        ...ArtistAuctionResultItem_auctionResult
        id
      }
    }
  }
}

fragment Pagination_pageCursors on PageCursors {
  around {
    cursor
    page
    isCurrent
  }
  first {
    cursor
    page
    isCurrent
  }
  last {
    cursor
    page
    isCurrent
  }
  previous {
    cursor
    page
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "last",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "before",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sort",
    "type": "AuctionResultSorts"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "organizations",
    "type": "[String]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "keyword",
    "type": "String"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "categories",
    "type": "[String]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "sizes",
    "type": "[ArtworkSizes]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "createdBeforeYear",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "createdAfterYear",
    "type": "Int"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "allowEmptyCreatedDates",
    "type": "Boolean"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
],
v2 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v3 = {
  "kind": "Variable",
  "name": "allowEmptyCreatedDates",
  "variableName": "allowEmptyCreatedDates"
},
v4 = {
  "kind": "Variable",
  "name": "before",
  "variableName": "before"
},
v5 = {
  "kind": "Variable",
  "name": "categories",
  "variableName": "categories"
},
v6 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v7 = {
  "kind": "Variable",
  "name": "keyword",
  "variableName": "keyword"
},
v8 = {
  "kind": "Variable",
  "name": "last",
  "variableName": "last"
},
v9 = {
  "kind": "Variable",
  "name": "organizations",
  "variableName": "organizations"
},
v10 = {
  "kind": "Variable",
  "name": "sizes",
  "variableName": "sizes"
},
v11 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
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
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "display",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistAuctionResultsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
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
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "ArtistAuctionResults_artist"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtistAuctionResultsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "internalID",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              (v5/*: any*/),
              {
                "kind": "Variable",
                "name": "earliestCreatedYear",
                "variableName": "createdAfterYear"
              },
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              {
                "kind": "Variable",
                "name": "latestCreatedYear",
                "variableName": "createdBeforeYear"
              },
              (v9/*: any*/),
              (v10/*: any*/),
              (v11/*: any*/)
            ],
            "concreteType": "AuctionResultConnection",
            "kind": "LinkedField",
            "name": "auctionResultsConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "totalCount",
                "storageKey": null
              },
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
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
                                "args": null,
                                "kind": "ScalarField",
                                "name": "url",
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
                        "name": "description",
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
                        "name": "organization",
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
                          (v15/*: any*/),
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
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v16/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          (v16/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "ArtistAuctionResultsQuery",
    "operationKind": "query",
    "text": "query ArtistAuctionResultsQuery(\n  $first: Int\n  $last: Int\n  $after: String\n  $before: String\n  $sort: AuctionResultSorts\n  $artistID: String!\n  $organizations: [String]\n  $keyword: String\n  $categories: [String]\n  $sizes: [ArtworkSizes]\n  $createdBeforeYear: Int\n  $createdAfterYear: Int\n  $allowEmptyCreatedDates: Boolean\n) {\n  artist(id: $artistID) {\n    ...ArtistAuctionResults_artist_2dM7Jd\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  title\n  dimension_text: dimensionText\n  organization\n  images {\n    thumbnail {\n      url\n    }\n  }\n  mediumText\n  categoryText\n  date_text: dateText\n  saleDate\n  boughtIn\n  currency\n  price_realized: priceRealized {\n    display\n    display_usd: displayUSD\n    cents_usd: centsUSD\n  }\n  performance {\n    mid\n  }\n  estimate {\n    display\n  }\n}\n\nfragment ArtistAuctionResultsCount_results on AuctionResultConnection {\n  totalCount\n}\n\nfragment ArtistAuctionResults_artist_2dM7Jd on Artist {\n  slug\n  internalID\n  name\n  auctionResultsConnection(first: $first, after: $after, before: $before, last: $last, sort: $sort, organizations: $organizations, keyword: $keyword, categories: $categories, sizes: $sizes, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates) {\n    ...ArtistAuctionResultsCount_results\n    createdYearRange {\n      startAt\n      endAt\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    totalCount\n    edges {\n      node {\n        title\n        dimension_text: dimensionText\n        images {\n          thumbnail {\n            url\n          }\n        }\n        description\n        date_text: dateText\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f81edb1347afde0906b9a253a8d02686';
export default node;
