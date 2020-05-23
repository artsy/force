/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AuctionResults_Test_QueryVariables = {
    artistID: string;
};
export type AuctionResults_Test_QueryResponse = {
    readonly artist: {
        readonly " $fragmentRefs": FragmentRefs<"AuctionResults_artist">;
    } | null;
};
export type AuctionResults_Test_QueryRawResponse = {
    readonly artist: ({
        readonly slug: string;
        readonly auctionResultsConnection: ({
            readonly totalCount: number | null;
            readonly createdYearRange: ({
                readonly startAt: number | null;
                readonly endAt: number | null;
            }) | null;
            readonly pageInfo: {
                readonly hasNextPage: boolean;
                readonly endCursor: string | null;
            };
            readonly pageCursors: {
                readonly around: ReadonlyArray<{
                    readonly cursor: string;
                    readonly page: number;
                    readonly isCurrent: boolean;
                }>;
                readonly first: ({
                    readonly cursor: string;
                    readonly page: number;
                    readonly isCurrent: boolean;
                }) | null;
                readonly last: ({
                    readonly cursor: string;
                    readonly page: number;
                    readonly isCurrent: boolean;
                }) | null;
                readonly previous: ({
                    readonly cursor: string;
                    readonly page: number;
                }) | null;
            };
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly title: string | null;
                    readonly dimension_text: string | null;
                    readonly images: ({
                        readonly thumbnail: ({
                            readonly url: string | null;
                        }) | null;
                    }) | null;
                    readonly description: string | null;
                    readonly date_text: string | null;
                    readonly organization: string | null;
                    readonly mediumText: string | null;
                    readonly categoryText: string | null;
                    readonly saleDate: string | null;
                    readonly price_realized: ({
                        readonly display: string | null;
                        readonly cents_usd: number | null;
                    }) | null;
                    readonly estimate: ({
                        readonly display: string | null;
                    }) | null;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
        readonly id: string | null;
    }) | null;
};
export type AuctionResults_Test_Query = {
    readonly response: AuctionResults_Test_QueryResponse;
    readonly variables: AuctionResults_Test_QueryVariables;
    readonly rawResponse: AuctionResults_Test_QueryRawResponse;
};



/*
query AuctionResults_Test_Query(
  $artistID: String!
) {
  artist(id: $artistID) {
    ...AuctionResults_artist
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

fragment ArtistAuctionResults_artist on Artist {
  slug
  ...AuctionResultHeader_artist
  auctionResultsConnection(first: 10, sort: DATE_DESC) {
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

fragment AuctionResults_artist on Artist {
  ...ArtistAuctionResults_artist
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
    "name": "artistID",
    "type": "String!",
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
  "kind": "ScalarField",
  "alias": null,
  "name": "cursor",
  "args": null,
  "storageKey": null
},
v3 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "page",
  "args": null,
  "storageKey": null
},
v4 = [
  (v2/*: any*/),
  (v3/*: any*/),
  {
    "kind": "ScalarField",
    "alias": null,
    "name": "isCurrent",
    "args": null,
    "storageKey": null
  }
],
v5 = {
  "kind": "ScalarField",
  "alias": null,
  "name": "display",
  "args": null,
  "storageKey": null
},
v6 = {
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
    "name": "AuctionResults_Test_Query",
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
            "name": "AuctionResults_artist",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "AuctionResults_Test_Query",
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
            "storageKey": "auctionResultsConnection(first:10,sort:\"DATE_DESC\")",
            "args": [
              {
                "kind": "Literal",
                "name": "first",
                "value": 10
              },
              {
                "kind": "Literal",
                "name": "sort",
                "value": "DATE_DESC"
              }
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
                    "selections": (v4/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "first",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v4/*: any*/)
                  },
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "last",
                    "storageKey": null,
                    "args": null,
                    "concreteType": "PageCursor",
                    "plural": false,
                    "selections": (v4/*: any*/)
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
                      (v2/*: any*/),
                      (v3/*: any*/)
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
                          (v5/*: any*/),
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
                          (v5/*: any*/)
                        ]
                      },
                      (v6/*: any*/)
                    ]
                  }
                ]
              }
            ]
          },
          (v6/*: any*/)
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "AuctionResults_Test_Query",
    "id": null,
    "text": "query AuctionResults_Test_Query(\n  $artistID: String!\n) {\n  artist(id: $artistID) {\n    ...AuctionResults_artist\n    id\n  }\n}\n\nfragment ArtistAuctionResultItem_auctionResult on AuctionResult {\n  title\n  dimension_text: dimensionText\n  organization\n  images {\n    thumbnail {\n      url\n    }\n  }\n  mediumText\n  categoryText\n  description\n  date_text: dateText\n  saleDate\n  price_realized: priceRealized {\n    display\n    cents_usd: centsUSD\n  }\n  estimate {\n    display\n  }\n}\n\nfragment ArtistAuctionResults_artist on Artist {\n  slug\n  ...AuctionResultHeader_artist\n  auctionResultsConnection(first: 10, sort: DATE_DESC) {\n    ...AuctionResultsCount_results\n    createdYearRange {\n      startAt\n      endAt\n    }\n    pageInfo {\n      hasNextPage\n      endCursor\n    }\n    pageCursors {\n      ...Pagination_pageCursors\n    }\n    totalCount\n    edges {\n      node {\n        title\n        dimension_text: dimensionText\n        images {\n          thumbnail {\n            url\n          }\n        }\n        description\n        date_text: dateText\n        ...ArtistAuctionResultItem_auctionResult\n        id\n      }\n    }\n  }\n}\n\nfragment AuctionResultHeader_artist on Artist {\n  slug\n}\n\nfragment AuctionResultsCount_results on AuctionResultConnection {\n  totalCount\n}\n\nfragment AuctionResults_artist on Artist {\n  ...ArtistAuctionResults_artist\n}\n\nfragment Pagination_pageCursors on PageCursors {\n  around {\n    cursor\n    page\n    isCurrent\n  }\n  first {\n    cursor\n    page\n    isCurrent\n  }\n  last {\n    cursor\n    page\n    isCurrent\n  }\n  previous {\n    cursor\n    page\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = 'a12ac64f5eedae104516cf397fbaabf5';
export default node;
