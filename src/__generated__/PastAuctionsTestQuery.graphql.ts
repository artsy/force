/**
 * @generated SignedSource<<074f1beb2a737bcd0a00812ee19f7aeb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PastAuctionsTestQuery$variables = Record<PropertyKey, never>;
export type PastAuctionsTestQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"PastAuctions_viewer">;
  } | null | undefined;
};
export type PastAuctionsTestQuery = {
  response: PastAuctionsTestQuery$data;
  variables: PastAuctionsTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "auctionState",
    "value": "CLOSED"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 10
  },
  {
    "kind": "Literal",
    "name": "live",
    "value": false
  },
  {
    "kind": "Literal",
    "name": "sort",
    "value": "TIMELY_AT_NAME_DESC"
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v2 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "PastAuctionsTestQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "PastAuctions_viewer"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PastAuctionsTestQuery",
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
            "args": (v0/*: any*/),
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
            "storageKey": "salesConnection(auctionState:\"CLOSED\",first:10,live:false,sort:\"TIMELY_AT_NAME_DESC\")"
          },
          {
            "alias": null,
            "args": (v0/*: any*/),
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
    "cacheID": "664f4514abab6c500474d49642d78f3f",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.salesConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SaleConnection"
        },
        "viewer.salesConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SaleEdge"
        },
        "viewer.salesConnection.edges.cursor": (v1/*: any*/),
        "viewer.salesConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Sale"
        },
        "viewer.salesConnection.edges.node.__typename": (v1/*: any*/),
        "viewer.salesConnection.edges.node.endAt": (v2/*: any*/),
        "viewer.salesConnection.edges.node.href": (v2/*: any*/),
        "viewer.salesConnection.edges.node.id": (v3/*: any*/),
        "viewer.salesConnection.edges.node.name": (v2/*: any*/),
        "viewer.salesConnection.edges.node.slug": (v3/*: any*/),
        "viewer.salesConnection.pageInfo": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "PageInfo"
        },
        "viewer.salesConnection.pageInfo.endCursor": (v2/*: any*/),
        "viewer.salesConnection.pageInfo.hasNextPage": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "viewer.salesConnection.totalCount": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        }
      }
    },
    "name": "PastAuctionsTestQuery",
    "operationKind": "query",
    "text": "query PastAuctionsTestQuery {\n  viewer {\n    ...PastAuctions_viewer\n  }\n}\n\nfragment PastAuctions_viewer on Viewer {\n  salesConnection(first: 10, live: false, sort: TIMELY_AT_NAME_DESC, auctionState: CLOSED) {\n    totalCount\n    edges {\n      node {\n        slug\n        name\n        href\n        endAt\n        id\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8d956777574233e7ee0f85e975239e88";

export default node;
