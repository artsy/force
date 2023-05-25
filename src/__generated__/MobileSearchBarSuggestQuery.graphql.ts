/**
 * @generated SignedSource<<19c19a7e1a3d2230fbd1ddf9d451f5fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MobileSearchBarSuggestQuery$variables = {
  term: string;
};
export type MobileSearchBarSuggestQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"MobileSearchBar_viewer">;
  } | null;
};
export type MobileSearchBarSuggestQuery = {
  response: MobileSearchBarSuggestQuery$data;
  variables: MobileSearchBarSuggestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "term"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MobileSearchBarSuggestQuery",
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
                "variableName": "term"
              }
            ],
            "kind": "FragmentSpread",
            "name": "MobileSearchBar_viewer"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MobileSearchBarSuggestQuery",
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
            "alias": "searchConnectionAggregation",
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
                "value": 0
              },
              {
                "kind": "Literal",
                "name": "mode",
                "value": "AUTOSUGGEST"
              },
              {
                "kind": "Variable",
                "name": "query",
                "variableName": "term"
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
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "10acbd82b3fae3d78305d2e6eb6d3f7f",
    "id": null,
    "metadata": {},
    "name": "MobileSearchBarSuggestQuery",
    "operationKind": "query",
    "text": "query MobileSearchBarSuggestQuery(\n  $term: String!\n) {\n  viewer {\n    ...MobileSearchBar_viewer_4hh6ED\n  }\n}\n\nfragment MobileSearchBar_viewer_4hh6ED on Viewer {\n  ...NewSearchInputPills_viewer_4hh6ED\n}\n\nfragment NewSearchInputPills_viewer_4hh6ED on Viewer {\n  searchConnectionAggregation: searchConnection(first: 0, mode: AUTOSUGGEST, query: $term, aggregations: [TYPE]) {\n    aggregations {\n      counts {\n        count\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "afb14b67e649d54459c942ab02d91f57";

export default node;
