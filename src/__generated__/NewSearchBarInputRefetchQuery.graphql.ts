/**
 * @generated SignedSource<<a80cbb80569a8dc4170653bd8100d0c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NewSearchBarInputRefetchQuery$variables = {
  hasTerm: boolean;
  term: string;
};
export type NewSearchBarInputRefetchQuery$data = {
  readonly viewer: {
    readonly " $fragmentSpreads": FragmentRefs<"NewSearchBarInput_viewer" | "NewSearchInputPills_viewer">;
  } | null;
};
export type NewSearchBarInputRefetchQuery = {
  response: NewSearchBarInputRefetchQuery$data;
  variables: NewSearchBarInputRefetchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasTerm"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "term"
},
v2 = {
  "kind": "Variable",
  "name": "term",
  "variableName": "term"
},
v3 = {
  "kind": "Literal",
  "name": "mode",
  "value": "AUTOSUGGEST"
},
v4 = {
  "kind": "Variable",
  "name": "query",
  "variableName": "term"
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "NewSearchBarInputRefetchQuery",
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
                "name": "hasTerm",
                "variableName": "hasTerm"
              },
              (v2/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "NewSearchBarInput_viewer"
          },
          {
            "args": [
              (v2/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "NewSearchInputPills_viewer"
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
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "NewSearchBarInputRefetchQuery",
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
            "condition": "hasTerm",
            "kind": "Condition",
            "passingValue": true,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Literal",
                    "name": "first",
                    "value": 7
                  },
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "concreteType": "SearchableConnection",
                "kind": "LinkedField",
                "name": "searchConnection",
                "plural": false,
                "selections": [
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
                            "name": "displayLabel",
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
                            "name": "imageUrl",
                            "storageKey": null
                          },
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
                                "name": "displayType",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "slug",
                                "storageKey": null
                              }
                            ],
                            "type": "SearchableItem",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ArtistStatuses",
                                "kind": "LinkedField",
                                "name": "statuses",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "artworks",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "auctionLots",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "type": "Artist",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "id",
                                "storageKey": null
                              }
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
                "storageKey": null
              }
            ]
          },
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
              (v3/*: any*/),
              (v4/*: any*/)
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
    "cacheID": "567dd6357356a40995ffbaa18efab836",
    "id": null,
    "metadata": {},
    "name": "NewSearchBarInputRefetchQuery",
    "operationKind": "query",
    "text": "query NewSearchBarInputRefetchQuery(\n  $term: String!\n  $hasTerm: Boolean!\n) {\n  viewer {\n    ...NewSearchBarInput_viewer_2Mejjw\n    ...NewSearchInputPills_viewer_4hh6ED\n  }\n}\n\nfragment NewSearchBarInput_viewer_2Mejjw on Viewer {\n  searchConnection(query: $term, mode: AUTOSUGGEST, first: 7) @include(if: $hasTerm) {\n    edges {\n      node {\n        displayLabel\n        href\n        imageUrl\n        __typename\n        ... on SearchableItem {\n          displayType\n          slug\n        }\n        ... on Artist {\n          statuses {\n            artworks\n            auctionLots\n          }\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment NewSearchInputPills_viewer_4hh6ED on Viewer {\n  searchConnectionAggregation: searchConnection(first: 0, mode: AUTOSUGGEST, query: $term, aggregations: [TYPE]) {\n    aggregations {\n      counts {\n        count\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8b33ed5d85b25de235265a65c8df17a4";

export default node;
