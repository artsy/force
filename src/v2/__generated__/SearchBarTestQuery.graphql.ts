/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SearchBarTestQueryVariables = {
    term: string;
    hasTerm: boolean;
};
export type SearchBarTestQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"SearchBar_viewer">;
    } | null;
};
export type SearchBarTestQueryRawResponse = {
    readonly viewer: ({
        readonly searchConnection: ({
            readonly edges: ReadonlyArray<({
                readonly node: ({
                    readonly displayLabel: string | null;
                    readonly href: string | null;
                    readonly __typename: "SearchableItem";
                    readonly id: string | null;
                    readonly displayType: string | null;
                    readonly slug: string;
                } | {
                    readonly displayLabel: string | null;
                    readonly href: string | null;
                    readonly __typename: "Artist";
                    readonly id: string | null;
                    readonly statuses: ({
                        readonly artworks: boolean | null;
                        readonly auctionLots: boolean | null;
                    }) | null;
                } | {
                    readonly displayLabel: string | null;
                    readonly href: string | null;
                    readonly __typename: string;
                    readonly id: string | null;
                }) | null;
            }) | null> | null;
        }) | null;
    }) | null;
};
export type SearchBarTestQuery = {
    readonly response: SearchBarTestQueryResponse;
    readonly variables: SearchBarTestQueryVariables;
    readonly rawResponse: SearchBarTestQueryRawResponse;
};



/*
query SearchBarTestQuery(
  $term: String!
  $hasTerm: Boolean!
) {
  viewer {
    ...SearchBar_viewer_2Mejjw
  }
}

fragment SearchBar_viewer_2Mejjw on Viewer {
  searchConnection(query: $term, mode: AUTOSUGGEST, first: 7) @include(if: $hasTerm) {
    edges {
      node {
        displayLabel
        href
        __typename
        ... on SearchableItem {
          displayType
          slug
        }
        ... on Artist {
          statuses {
            artworks
            auctionLots
          }
        }
        ... on Node {
          id
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "term",
    "type": "String!"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "hasTerm",
    "type": "Boolean!"
  }
],
v1 = {
  "type": "String",
  "enumValues": null,
  "plural": false,
  "nullable": true
},
v2 = {
  "type": "Boolean",
  "enumValues": null,
  "plural": false,
  "nullable": true
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SearchBarTestQuery",
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
              {
                "kind": "Variable",
                "name": "term",
                "variableName": "term"
              }
            ],
            "kind": "FragmentSpread",
            "name": "SearchBar_viewer"
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
    "name": "SearchBarTestQuery",
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
                            "name": "__typename",
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
                            "type": "SearchableItem"
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
                            "type": "Artist"
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
        "viewer.searchConnection.edges": {
          "type": "SearchableEdge",
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
        "viewer.searchConnection.edges.node.displayLabel": (v1/*: any*/),
        "viewer.searchConnection.edges.node.href": (v1/*: any*/),
        "viewer.searchConnection.edges.node.__typename": {
          "type": "String",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.searchConnection.edges.node.displayType": (v1/*: any*/),
        "viewer.searchConnection.edges.node.slug": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": false
        },
        "viewer.searchConnection.edges.node.statuses": {
          "type": "ArtistStatuses",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.searchConnection.edges.node.id": {
          "type": "ID",
          "enumValues": null,
          "plural": false,
          "nullable": true
        },
        "viewer.searchConnection.edges.node.statuses.artworks": (v2/*: any*/),
        "viewer.searchConnection.edges.node.statuses.auctionLots": (v2/*: any*/)
      }
    },
    "name": "SearchBarTestQuery",
    "operationKind": "query",
    "text": "query SearchBarTestQuery(\n  $term: String!\n  $hasTerm: Boolean!\n) {\n  viewer {\n    ...SearchBar_viewer_2Mejjw\n  }\n}\n\nfragment SearchBar_viewer_2Mejjw on Viewer {\n  searchConnection(query: $term, mode: AUTOSUGGEST, first: 7) @include(if: $hasTerm) {\n    edges {\n      node {\n        displayLabel\n        href\n        __typename\n        ... on SearchableItem {\n          displayType\n          slug\n        }\n        ... on Artist {\n          statuses {\n            artworks\n            auctionLots\n          }\n        }\n        ... on Node {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '51e1f4122a06a1b1cbcbce24402b88c6';
export default node;
