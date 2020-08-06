/* tslint:disable */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneSearchResultsQueryVariables = {
    term: string;
};
export type GeneSearchResultsQueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"GeneSearchResults_viewer">;
    } | null;
};
export type GeneSearchResultsQuery = {
    readonly response: GeneSearchResultsQueryResponse;
    readonly variables: GeneSearchResultsQueryVariables;
};



/*
query GeneSearchResultsQuery(
  $term: String!
) {
  viewer {
    ...GeneSearchResults_viewer
  }
}

fragment GeneSearchResults_viewer on Viewer {
  match_gene: searchConnection(query: $term, mode: AUTOSUGGEST, entities: [GENE]) {
    edges {
      node {
        __typename
        ... on Gene {
          name
          id
          slug
          internalID
          image {
            cropped(width: 100, height: 100) {
              url
            }
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
    "kind": "LocalArgument",
    "name": "term",
    "type": "String!",
    "defaultValue": null
  }
];
return {
  "kind": "Request",
  "fragment": {
    "kind": "Fragment",
    "name": "GeneSearchResultsQuery",
    "type": "Query",
    "metadata": null,
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "FragmentSpread",
            "name": "GeneSearchResults_viewer",
            "args": null
          }
        ]
      }
    ]
  },
  "operation": {
    "kind": "Operation",
    "name": "GeneSearchResultsQuery",
    "argumentDefinitions": (v0/*: any*/),
    "selections": [
      {
        "kind": "LinkedField",
        "alias": null,
        "name": "viewer",
        "storageKey": null,
        "args": null,
        "concreteType": "Viewer",
        "plural": false,
        "selections": [
          {
            "kind": "LinkedField",
            "alias": "match_gene",
            "name": "searchConnection",
            "storageKey": null,
            "args": [
              {
                "kind": "Literal",
                "name": "entities",
                "value": [
                  "GENE"
                ]
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
            "plural": false,
            "selections": [
              {
                "kind": "LinkedField",
                "alias": null,
                "name": "edges",
                "storageKey": null,
                "args": null,
                "concreteType": "SearchableEdge",
                "plural": true,
                "selections": [
                  {
                    "kind": "LinkedField",
                    "alias": null,
                    "name": "node",
                    "storageKey": null,
                    "args": null,
                    "concreteType": null,
                    "plural": false,
                    "selections": [
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "__typename",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "ScalarField",
                        "alias": null,
                        "name": "id",
                        "args": null,
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "type": "Gene",
                        "selections": [
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "name",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "slug",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "ScalarField",
                            "alias": null,
                            "name": "internalID",
                            "args": null,
                            "storageKey": null
                          },
                          {
                            "kind": "LinkedField",
                            "alias": null,
                            "name": "image",
                            "storageKey": null,
                            "args": null,
                            "concreteType": "Image",
                            "plural": false,
                            "selections": [
                              {
                                "kind": "LinkedField",
                                "alias": null,
                                "name": "cropped",
                                "storageKey": "cropped(height:100,width:100)",
                                "args": [
                                  {
                                    "kind": "Literal",
                                    "name": "height",
                                    "value": 100
                                  },
                                  {
                                    "kind": "Literal",
                                    "name": "width",
                                    "value": 100
                                  }
                                ],
                                "concreteType": "CroppedImageUrl",
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
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "params": {
    "operationKind": "query",
    "name": "GeneSearchResultsQuery",
    "id": null,
    "text": "query GeneSearchResultsQuery(\n  $term: String!\n) {\n  viewer {\n    ...GeneSearchResults_viewer\n  }\n}\n\nfragment GeneSearchResults_viewer on Viewer {\n  match_gene: searchConnection(query: $term, mode: AUTOSUGGEST, entities: [GENE]) {\n    edges {\n      node {\n        __typename\n        ... on Gene {\n          name\n          id\n          slug\n          internalID\n          image {\n            cropped(width: 100, height: 100) {\n              url\n            }\n          }\n        }\n        ... on Node {\n          id\n        }\n      }\n    }\n  }\n}\n",
    "metadata": {}
  }
};
})();
(node as any).hash = '381a05e7887812030ff90a5d9f1cf08b';
export default node;
