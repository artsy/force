/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ArtistSearchResults_Test_QueryVariables = {
    term: string;
};
export type ArtistSearchResults_Test_QueryResponse = {
    readonly viewer: {
        readonly " $fragmentRefs": FragmentRefs<"ArtistSearchResults_viewer">;
    } | null;
};
export type ArtistSearchResults_Test_Query = {
    readonly response: ArtistSearchResults_Test_QueryResponse;
    readonly variables: ArtistSearchResults_Test_QueryVariables;
};



/*
query ArtistSearchResults_Test_Query(
  $term: String!
) {
  viewer {
    ...ArtistSearchResults_viewer
  }
}

fragment ArtistSearchResults_viewer on Viewer {
  searchConnection(query: $term, mode: AUTOSUGGEST, entities: [ARTIST], first: 10) {
    edges {
      node {
        __typename
        ... on SearchableItem {
          id
          slug
          internalID
          displayLabel
          imageUrl
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
  "nullable": true,
  "plural": false,
  "type": "String"
},
v4 = {
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
    "name": "ArtistSearchResults_Test_Query",
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
            "name": "ArtistSearchResults_viewer"
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
    "name": "ArtistSearchResults_Test_Query",
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
                "name": "entities",
                "value": [
                  "ARTIST"
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
                            "kind": "ScalarField",
                            "name": "displayLabel",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "imageUrl",
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
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9041a5151a609637d199b1d07eb7e9e6",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "viewer": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Viewer"
        },
        "viewer.searchConnection": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "SearchableConnection"
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
        "viewer.searchConnection.edges.node.__isNode": (v2/*: any*/),
        "viewer.searchConnection.edges.node.__typename": (v2/*: any*/),
        "viewer.searchConnection.edges.node.displayLabel": (v3/*: any*/),
        "viewer.searchConnection.edges.node.id": (v4/*: any*/),
        "viewer.searchConnection.edges.node.imageUrl": (v3/*: any*/),
        "viewer.searchConnection.edges.node.internalID": (v4/*: any*/),
        "viewer.searchConnection.edges.node.slug": (v4/*: any*/)
      }
    },
    "name": "ArtistSearchResults_Test_Query",
    "operationKind": "query",
    "text": "query ArtistSearchResults_Test_Query(\n  $term: String!\n) {\n  viewer {\n    ...ArtistSearchResults_viewer\n  }\n}\n\nfragment ArtistSearchResults_viewer on Viewer {\n  searchConnection(query: $term, mode: AUTOSUGGEST, entities: [ARTIST], first: 10) {\n    edges {\n      node {\n        __typename\n        ... on SearchableItem {\n          id\n          slug\n          internalID\n          displayLabel\n          imageUrl\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'fbd7c2db9f868d151120b2c61429370d';
export default node;
