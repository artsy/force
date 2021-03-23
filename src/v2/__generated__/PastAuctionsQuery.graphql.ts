/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PastAuctionsQueryVariables = {
    first: number;
    after?: string | null;
};
export type PastAuctionsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"PastAuctions_viewer">;
    } | null;
};
export type PastAuctionsQuery = {
    readonly response: PastAuctionsQueryResponse;
    readonly variables: PastAuctionsQueryVariables;
};



/*
query PastAuctionsQuery(
  $first: Int!
  $after: String
) {
  viewer {
    ...PastAuctions_viewer_2HEEH6
  }
}

fragment AuctionArtworksRail_sale on Sale {
  internalID
  href
  name
  formattedStartDateTime
}

fragment PastAuctions_viewer_2HEEH6 on Viewer {
  salesConnection(first: $first, after: $after, live: false, sort: START_AT_DESC, auctionState: CLOSED) {
    totalCount
    edges {
      node {
        slug
        name
        href
        endAt
        ...AuctionArtworksRail_sale
        id
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first",
    "type": "Int!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after",
    "type": "String"
  }
],
v1 = {
  "kind": "Variable",
  "name": "after",
  "variableName": "after"
},
v2 = {
  "kind": "Variable",
  "name": "first",
  "variableName": "first"
},
v3 = [
  (v1/*: any*/),
  {
    "kind": "Literal",
    "name": "auctionState",
    "value": "CLOSED"
  },
  (v2/*: any*/),
  {
    "kind": "Literal",
    "name": "live",
    "value": false
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "START_AT_DESC"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PastAuctionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "args": [
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "PastAuctions_viewer"
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
    "name": "PastAuctionsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Viewer",
        "kind": "LinkedField",
        "name": "viewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "SaleConnection",
            "kind": "LinkedField",
            "name": "salesConnection",
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
                "concreteType": "SaleEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Sale",
                    "kind": "LinkedField",
                    "name": "node",
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
                        "name": "name",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "href",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endAt",
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
                        "name": "formattedStartDateTime",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "id",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
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
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
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
            "args": (v3/*: any*/),
            "filters": [
              "live",
              "sort",
              "auctionState"
            ],
            "handle": "connection",
            "key": "PastAuctions_salesConnection",
            "kind": "LinkedHandle",
            "name": "salesConnection"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "PastAuctionsQuery",
    "operationKind": "query",
    "text": "query PastAuctionsQuery(\n  $first: Int!\n  $after: String\n) {\n  viewer {\n    ...PastAuctions_viewer_2HEEH6\n  }\n}\n\nfragment AuctionArtworksRail_sale on Sale {\n  internalID\n  href\n  name\n  formattedStartDateTime\n}\n\nfragment PastAuctions_viewer_2HEEH6 on Viewer {\n  salesConnection(first: $first, after: $after, live: false, sort: START_AT_DESC, auctionState: CLOSED) {\n    totalCount\n    edges {\n      node {\n        slug\n        name\n        href\n        endAt\n        ...AuctionArtworksRail_sale\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '0f11957b86a583aa7ba15fb199867fc7';
export default node;
