/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchApp_Test_QueryVariables = {};
export type SearchApp_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"SearchApp_viewer">;
    } | null;
};
export type SearchApp_Test_Query = {
    readonly response: SearchApp_Test_QueryResponse;
    readonly variables: SearchApp_Test_QueryVariables;
};



/*
query SearchApp_Test_Query {
  viewer {
    ...SearchApp_viewer_2rc5k6
  }
}

fragment NavigationTabs_searchableConnection on SearchableConnection {
  aggregations {
    slice
    counts {
      count
      name
    }
  }
}

fragment SearchApp_viewer_2rc5k6 on Viewer {
  searchConnection(query: "andy", first: 1, aggregations: [TYPE]) {
    aggregations {
      slice
      counts {
        count
        name
      }
    }
    ...NavigationTabs_searchableConnection
    edges {
      node {
        __typename
        ... on SearchableItem {
          slug
          displayLabel
          displayType
        }
        ... on Node {
          id
        }
      }
    }
  }
  artworksConnection(keyword: "andy", size: 0, aggregations: [TOTAL]) {
    counts {
      total
    }
    id
  }
}
*/

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
  "type": "ID",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v3 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
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
    "type": "Query"
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
                      (v1/*: any*/),
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
                        "type": "SearchableItem"
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
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "type": "Viewer",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.searchConnection": {
          "type": "SearchableConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.artworksConnection": {
          "type": "FilterArtworksConnection",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.searchConnection.aggregations": {
          "type": "SearchAggregationResults",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.searchConnection.edges": {
          "type": "SearchableEdge",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.artworksConnection.counts": {
          "type": "FilterArtworksCounts",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.artworksConnection.id": (v2/*: any*/),
        "viewer.searchConnection.aggregations.slice": {
          "type": "SearchAggregation",
          "enumValues": (v0/*: any*/),
          "plural": false,
          "nullable": true
        },
        "viewer.searchConnection.aggregations.counts": {
          "type": "AggregationCount",
          "enumValues": null,
          "plural": true,
          "nullable": true
        },
        "viewer.searchConnection.edges.node": {
          "type": "Searchable",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.artworksConnection.counts.total": {
          "type": "FormattedNumber",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.searchConnection.aggregations.counts.count": {
          "type": "Int",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.searchConnection.aggregations.counts.name": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.searchConnection.edges.node.slug": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.searchConnection.edges.node.displayLabel": (v3/*: any*/),
        "viewer.searchConnection.edges.node.displayType": (v3/*: any*/),
        "viewer.searchConnection.edges.node.id": (v2/*: any*/)
      }
    },
    "name": "SearchApp_Test_Query",
    "operationKind": "query",
    "text": "query SearchApp_Test_Query {\n  viewer {\n    ...SearchApp_viewer_2rc5k6\n  }\n}\n\nfragment NavigationTabs_searchableConnection on SearchableConnection {\n  aggregations {\n    slice\n    counts {\n      count\n      name\n    }\n  }\n}\n\nfragment SearchApp_viewer_2rc5k6 on Viewer {\n  searchConnection(query: \"andy\", first: 1, aggregations: [TYPE]) {\n    aggregations {\n      slice\n      counts {\n        count\n        name\n      }\n    }\n    ...NavigationTabs_searchableConnection\n    edges {\n      node {\n        __typename\n        ... on SearchableItem {\n          slug\n          displayLabel\n          displayType\n        }\n        ... on Node {\n          id\n        }\n      }\n    }\n  }\n  artworksConnection(keyword: \"andy\", size: 0, aggregations: [TOTAL]) {\n    counts {\n      total\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '5bfd09b367a9e823a2784960ec441573';
export default node;
