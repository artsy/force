/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type searchRoutes_SearchResultsTopLevelQueryVariables = {
    keyword: string;
};
export type searchRoutes_SearchResultsTopLevelQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"SearchApp_viewer">;
    } | null;
};
export type searchRoutes_SearchResultsTopLevelQuery = {
    readonly response: searchRoutes_SearchResultsTopLevelQueryResponse;
    readonly variables: searchRoutes_SearchResultsTopLevelQueryVariables;
};



/*
query searchRoutes_SearchResultsTopLevelQuery(
  $keyword: String!
) {
  viewer {
    ...SearchApp_viewer_2hPz0N
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

fragment SearchApp_viewer_2hPz0N on Viewer {
  searchConnection(query: $keyword, first: 1, aggregations: [TYPE]) {
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
  artworksConnection(keyword: $keyword, size: 0, aggregations: [TOTAL]) {
    counts {
      total
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "keyword",
    "type": "String!"
  }
],
v1 = {
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
    "name": "searchRoutes_SearchResultsTopLevelQuery",
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
                "kind": "Variable",
                "name": "term",
                "variableName": "keyword"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "searchRoutes_SearchResultsTopLevelQuery",
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
                "value": [
                  "TYPE"
                ]
              },
              {
                "kind": "Literal",
                "name": "first",
                "value": 1
              },
              {
                "kind": "Variable",
                "name": "query",
                "variableName": "keyword"
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
            "storageKey": null
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
                "kind": "Variable",
                "name": "keyword",
                "variableName": "keyword"
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
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "searchRoutes_SearchResultsTopLevelQuery",
    "operationKind": "query",
    "text": "query searchRoutes_SearchResultsTopLevelQuery(\n  $keyword: String!\n) {\n  viewer {\n    ...SearchApp_viewer_2hPz0N\n  }\n}\n\nfragment NavigationTabs_searchableConnection on SearchableConnection {\n  aggregations {\n    slice\n    counts {\n      count\n      name\n    }\n  }\n}\n\nfragment SearchApp_viewer_2hPz0N on Viewer {\n  searchConnection(query: $keyword, first: 1, aggregations: [TYPE]) {\n    aggregations {\n      slice\n      counts {\n        count\n        name\n      }\n    }\n    ...NavigationTabs_searchableConnection\n    edges {\n      node {\n        __typename\n        ... on SearchableItem {\n          slug\n          displayLabel\n          displayType\n        }\n        ... on Node {\n          id\n        }\n      }\n    }\n  }\n  artworksConnection(keyword: $keyword, size: 0, aggregations: [TOTAL]) {\n    counts {\n      total\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '93376127136ef5f8b5a24a34d8e4a9fa';
export default node;
