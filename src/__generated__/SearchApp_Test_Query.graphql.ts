/**
 * @generated SignedSource<<ef602dca4ce50a89c3acb704d8488185>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SearchApp_Test_Query$variables = Record<PropertyKey, never>;
export type SearchApp_Test_Query$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"SearchApp_viewer">;
  } | null | undefined;
};
export type SearchApp_Test_Query = {
  response: SearchApp_Test_Query$data;
  variables: SearchApp_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  "TYPE"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchApp_Test_Query",
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
              {
                "kind": "Literal",
                "name": "term",
                "value": "andy"
              }
            ],
            "kind": "FragmentSpread",
            "name": "SearchApp_viewer"
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
    "name": "SearchApp_Test_Query",
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
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": (v0/*: any*/)
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              {
                "kind": "Literal",
                "name": "query",
                "value": "andy"
              }
            ],
            "concreteType": "SearchableConnection",
            "kind": "LinkedField",
            "name": "searchConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SearchAggregationResults",
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "count",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
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
                "concreteType": "SearchableEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
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
                            "name": "slug",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "displayLabel",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "displayType",
                            "storageKey": null
                          }
                        ],
                        "type": "SearchableItem",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v1/*: any*/)
                        ],
                        "type": "Node",
                        "abstractKey": "__isNode"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "searchConnection(aggregations:[\"TYPE\"],first:1,query:\"andy\")"
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "aggregations",
                "value": [
                  "TOTAL"
                ]
              },
              {
                "kind": "Literal",
                "name": "keyword",
                "value": "andy"
              },
              {
                "kind": "Literal",
                "name": "size",
                "value": 0
              }
            ],
            "concreteType": "FilterArtworksConnection",
            "kind": "LinkedField",
            "name": "artworksConnection",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "FilterArtworksCounts",
                "kind": "LinkedField",
                "name": "counts",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "total",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v1/*: any*/)
            ],
            "storageKey": "artworksConnection(aggregations:[\"TOTAL\"],keyword:\"andy\",size:0)"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "1e50f7d5c391e550993456d05e8fc046",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.artworksConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksConnection"
        },
        "viewer.artworksConnection.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FilterArtworksCounts"
        },
        "viewer.artworksConnection.counts.total": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "FormattedNumber"
        },
        "viewer.artworksConnection.id": (v2/*: any*/),
        "viewer.searchConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SearchableConnection"
        },
        "viewer.searchConnection.aggregations": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SearchAggregationResults"
        },
        "viewer.searchConnection.aggregations.counts": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "AggregationCount"
        },
        "viewer.searchConnection.aggregations.counts.count": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Int"
        },
        "viewer.searchConnection.aggregations.counts.name": (v3/*: any*/),
        "viewer.searchConnection.aggregations.slice": {
          "enumValues": (v0/*: any*/),
          "nullable": true,
          "plural": false,
          "type": "SearchAggregation"
        },
        "viewer.searchConnection.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SearchableEdge"
        },
        "viewer.searchConnection.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Searchable"
        },
        "viewer.searchConnection.edges.node.__isNode": (v3/*: any*/),
        "viewer.searchConnection.edges.node.__typename": (v3/*: any*/),
        "viewer.searchConnection.edges.node.displayLabel": (v4/*: any*/),
        "viewer.searchConnection.edges.node.displayType": (v4/*: any*/),
        "viewer.searchConnection.edges.node.id": (v2/*: any*/),
        "viewer.searchConnection.edges.node.slug": (v2/*: any*/)
      }
    },
    "name": "SearchApp_Test_Query",
    "operationKind": "query",
    "text": "query SearchApp_Test_Query {\n  viewer {\n    ...SearchApp_viewer_2rc5k6\n  }\n}\n\nfragment NavigationTabs_searchableConnection on SearchableConnection {\n  aggregations {\n    slice\n    counts {\n      count\n      name\n    }\n  }\n}\n\nfragment SearchApp_viewer_2rc5k6 on Viewer {\n  searchConnection(query: \"andy\", first: 1, aggregations: [TYPE]) {\n    aggregations {\n      slice\n      counts {\n        count\n        name\n      }\n    }\n    ...NavigationTabs_searchableConnection\n    edges {\n      node {\n        __typename\n        ... on SearchableItem {\n          slug\n          displayLabel\n          displayType\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n  artworksConnection(keyword: \"andy\", size: 0, aggregations: [TOTAL]) {\n    counts {\n      total\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5bfd09b367a9e823a2784960ec441573";

export default node;
