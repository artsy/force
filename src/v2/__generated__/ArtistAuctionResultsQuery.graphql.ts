/* tslint:disable */

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
    organizations?: ReadonlyArray<string | null> | null;
    categories?: ReadonlyArray<string | null> | null;
    sizes?: ReadonlyArray<ArtworkSizes | null> | null;
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
  $categories: [String]
  $sizes: [ArtworkSizes]
  $createdBeforeYear: Int
  $createdAfterYear: Int
  $allowEmptyCreatedDates: Boolean
) {
  artist(id: $artistID) {
    ...ArtistAuctionResults_artist_214CZC
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
  description
  date_text: dateText
  saleDate
  price_realized: priceRealized {
    display
    cents_usd: centsUSD
  }
  estimate {
    display
  }
}

fragment ArtistAuctionResults_artist_214CZC on Artist {
  slug
  ...AuctionResultHeader_artist
  auctionResultsConnection(first: $first, after: $after, before: $before, last: $last, sort: $sort, organizations: $organizations, categories: $categories, sizes: $sizes, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates) {
    ...AuctionResultsCount_results
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

fragment AuctionResultHeader_artist on Artist {
  slug
}

fragment AuctionResultsCount_results on AuctionResultConnection {
  totalCount
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
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "last",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "after",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "before",
    "type": "String",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sort",
    "type": "AuctionResultSorts",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "artistID",
    "type": "String!",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "organizations",
    "type": "[String]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "categories",
    "type": "[String]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "sizes",
    "type": "[ArtworkSizes]",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "createdBeforeYear",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "createdAfterYear",
    "type": "Int",
    "defaultValue": null
  },
  {
    "kind": "LocalArgument",
    "name": "allowEmptyCreatedDates",
    "type": "Boolean",
    "defaultValue": null
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
  "name": "last",
  "variableName": "last"
},
v8 = {
  "kind": "Variable",
  "name": "organizations",
  "variableName": "organizations"
},
v9 = {
  "kind": "Variable",
  "name": "sizes",
  "variableName": "sizes"
},
v10 = {
  "kind": "Variable",
  "name": "sort",
  "variableName": "sort"
},
v11 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v12 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v13 = [
  (v11/*: any*/),
  (v12/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
],
v14 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v15 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "id",
  "args": null,
  "storageKey": null
};
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "ArtistAuctionResultsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "ArtistAuctionResults_artist",
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
              (v10/*: any*/)
            ]
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "ArtistAuctionResultsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "artist",
        "storageKey": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "plural": false,
        "selections": [
          {
            "kind": "ScalarField",
            "alias": null,
            "name": "slug",
            "args": null,
            "storageKey": null
          },
          {
            "kind": "LinkedField",
            "alias": null,
            "name": "auctionResultsConnection",
            "storageKey": null,
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
              {
                "kind": "Variable",
                "name": "latestCreatedYear",
                "variableName": "createdBeforeYear"
              },
              (v8/*: any*/),
              (v9/*: any*/),
              (v10/*: any*/)
            ],
            "concreteType": "AuctionResultConnection",
            "plural": false,
            "selections": [
              {
                "kind": "ScalarField",
                "alias": null,
                "name": "totalCount",
                "args": null,
                "storageKey": null
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "createdYearRange",
                "storageKey": null,
                "args": null,
                "concreteType": "YearRange",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "startAt",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endAt",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageInfo",
                "storageKey": null,
                "args": null,
                "concreteType": "PageInfo",
                "plural": false,
                "selections": [
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "hasNextPage",
                    "args": null,
                    "storageKey": null
                  },
                  {
                    "kind": "ScalarField",
                    "alias": null,
                    "name": "endCursor",
                    "args": null,
                    "storageKey": null
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "pageCursors",
                "storageKey": null,
                "args": null,
                "concreteType": "PageCursors",
                "plural": false,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "around",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": true,
                    "selections": (v13/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "first",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v13/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "last",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v13/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "previous",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      (v12/*: any*/)
                    ]
                  }
                ]
              },
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "AuctionResultEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "AuctionResult",
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "title",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "dimension_text",
                        "name": "dimensionText",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "images",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "AuctionLotImages",
                        "plural": false,
                        "selections": [
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "thumbnail",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "ScalarField",
                                "alias": null,
                                "name": "url",
                                "args": null,
                                "storageKey": null
                              }
                            ]
                          }
                        ]
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "description",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": "date_text",
                        "name": "dateText",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "organization",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "mediumText",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "categoryText",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "saleDate",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "LinkedField",
                        "alias": "price_realized",
                        "name": "priceRealized",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "AuctionResultPriceRealized",
                        "plural": false,
                        "selections": [
                          (v14/*: any*/),
                          {
                            "kind": "ScalarField",
                            "alias": "cents_usd",
                            "name": "centsUSD",
                            "args": null,
                            "storageKey": null
                          }
                        ]
                      },
                      {
                        "kind": "LinkedField",
                        "alias": null,
                        "name": "estimate",
                        "storageKey": null,
                        "args": null,
                        "concreteType": "AuctionLotEstimate",
                        "plural": false,
                        "selections": [
                          (v14/*: any*/)
                        ]
                      },
                      (v15/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v15/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "ArtistAuctionResultsQuery",
    "id": null,
    "text": "query ArtistAuctionResultsQuery(\n  $first: Int\n  $last: Int\n  $after: String\n  $before: String\n  $sort: AuctionResultSorts\n  $artistID: String!\n  $organizations: [String]\n  $categories: [String]\n  $sizes: [ArtworkSizes]\n  $createdBeforeYear: Int\n  $createdAfterYear: Int\n  $allowEmptyCreatedDates: Boolean\n) {\n  artist(id: $artistID) {\n    ...ArtistAuctionResults_artist_214CZC\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  title\n  dimension_text: dimensionText\n  organization\n  images {\n    thumbnail {\n      url\n    }\n  }\n  mediumText\n  categoryText\n  description\n  date_text: dateText\n  saleDate\n  price_realized: priceRealized {\n    display\n    cents_usd: centsUSD\n  }\n  estimate {\n    display\n  }\n}\n\nfragment ArtistAuctionResults_artist_214CZC on Artist {\n  slug\n  ...AuctionResultHeader_artist\n  auctionResultsConnection(first: $first, after: $after, before: $before, last: $last, sort: $sort, organizations: $organizations, categories: $categories, sizes: $sizes, earliestCreatedYear: $createdAfterYear, latestCreatedYear: $createdBeforeYear, allowEmptyCreatedDates: $allowEmptyCreatedDates) {\n    ...AuctionResultsCount_results\n    createdYearRange {\n      startAt\n      endAt\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    totalCount\n    edges {\n      node {\n        title\n        dimension_text: dimensionText\n        images {\n          thumbnail {\n            url\n          }\n        }\n        description\n        date_text: dateText\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n\nfragment AuctionResultHeader_artist on Artist {\n  slug\n}\n\nfragment AuctionResultsCount_results on AuctionResultConnection {\n  totalCount\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '27e4d2154553949a4452db380d0a7f49';
export default node;
