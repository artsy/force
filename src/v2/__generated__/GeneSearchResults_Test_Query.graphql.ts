/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneSearchResults_Test_QueryVariables = {
    term: string;
};
export type GeneSearchResults_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"GeneSearchResults_viewer">;
    } | null;
};
export type GeneSearchResults_Test_Query = {
    readonly response: GeneSearchResults_Test_QueryResponse;
    readonly variables: GeneSearchResults_Test_QueryVariables;
};



/*
query GeneSearchResults_Test_Query(
  $term: String!
) {
  viewer {
    ...GeneSearchResults_viewer
  }
}

fragment GeneSearchResults_viewer on Viewer {
  match_gene: searchConnection(query: $term, mode: AUTOSUGGEST, entities: [GENE], first: 10) {
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
          __isNode: __typename
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
    "name": "term"
  }
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GeneSearchResults_Test_Query",
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
            "name": "GeneSearchResults_viewer"
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
    "name": "GeneSearchResults_Test_Query",
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
            "alias": "match_gene",
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
                "name": "first",
                "value": 10
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
                            "name": "name",
                            "storageKey": null
                          },
                          (v1/*: any*/),
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
                            "name": "internalID",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Image",
                            "kind": "LinkedField",
                            "name": "image",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
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
                                "kind": "LinkedField",
                                "name": "cropped",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "url",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": "cropped(height:100,width:100)"
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "Gene",
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
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2728c109b67045c24632c432eaa9a864",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.match_gene": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SearchableConnection"
        },
        "viewer.match_gene.edges": {
          "enumValues": null,
          "nullable": true,
          "plural": true,
          "type": "SearchableEdge"
        },
        "viewer.match_gene.edges.node": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Searchable"
        },
        "viewer.match_gene.edges.node.__isNode": (v2/*: any*/),
        "viewer.match_gene.edges.node.__typename": (v2/*: any*/),
        "viewer.match_gene.edges.node.id": (v3/*: any*/),
        "viewer.match_gene.edges.node.image": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Image"
        },
        "viewer.match_gene.edges.node.image.cropped": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CroppedImageUrl"
        },
        "viewer.match_gene.edges.node.image.cropped.url": (v2/*: any*/),
        "viewer.match_gene.edges.node.internalID": (v3/*: any*/),
        "viewer.match_gene.edges.node.name": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "viewer.match_gene.edges.node.slug": (v3/*: any*/)
      }
    },
    "name": "GeneSearchResults_Test_Query",
    "operationKind": "query",
    "text": "query GeneSearchResults_Test_Query(\n  $term: String!\n) {\n  viewer {\n    ...GeneSearchResults_viewer\n  }\n}\n\nfragment GeneSearchResults_viewer on Viewer {\n  match_gene: searchConnection(query: $term, mode: AUTOSUGGEST, entities: [GENE], first: 10) {\n    edges {\n      node {\n        __typename\n        ... on Gene {\n          name\n          id\n          slug\n          internalID\n          image {\n            cropped(width: 100, height: 100) {\n              url\n            }\n          }\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '65eb583c80fd45315f58bca90288e872';
export default node;
