/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type ArtistAutosuggest_SearchConnection_QueryVariables = {
    searchQuery: string;
};
export type ArtistAutosuggest_SearchConnection_QueryResponse = {
    readonly searchConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly displayLabel: string | null;
                readonly internalID?: string;
                readonly image?: {
                    readonly cropped: {
                        readonly height: number;
                        readonly src: string;
                        readonly srcSet: string;
                        readonly width: number;
                    } | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
};
export type ArtistAutosuggest_SearchConnection_Query = {
    readonly response: ArtistAutosuggest_SearchConnection_QueryResponse;
    readonly variables: ArtistAutosuggest_SearchConnection_QueryVariables;
};



/*
query ArtistAutosuggest_SearchConnection_Query(
  $searchQuery: String!
) {
  searchConnection(query: $searchQuery, entities: ARTIST, mode: AUTOSUGGEST, first: 3) {
    edges {
      node {
        __typename
        displayLabel
        ... on Artist {
          internalID
          image {
            cropped(width: 44, height: 44) {
              height
              src
              srcSet
              width
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
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchQuery",
    "type": "String!"
  }
],
v1 = [
  {
    "kind": "Literal",
    "name": "entities",
    "value": "ARTIST"
  },
  {
    "kind": "Literal",
    "name": "first",
    "value": 3
  },
  {
    "kind": "Literal",
    "name": "mode",
    "value": "AUTOSUGGEST"
  },
  {
    "kind": "Variable",
    "name": "query",
    "variableName": "searchQuery"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayLabel",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
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
              "value": 44
            },
            {
              "kind": "Literal",
              "name": "width",
              "value": 44
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
              "name": "height",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "src",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "srcSet",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "width",
              "storageKey": null
            }
          ],
          "storageKey": "cropped(height:44,width:44)"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Artist"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistAutosuggest_SearchConnection_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
                  (v3/*: any*/)
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
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ArtistAutosuggest_SearchConnection_Query",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "id",
                    "storageKey": null
                  },
                  (v3/*: any*/)
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
    "id": null,
    "metadata": {},
    "name": "ArtistAutosuggest_SearchConnection_Query",
    "operationKind": "query",
    "text": "query ArtistAutosuggest_SearchConnection_Query(\n  $searchQuery: String!\n) {\n  searchConnection(query: $searchQuery, entities: ARTIST, mode: AUTOSUGGEST, first: 3) {\n    edges {\n      node {\n        __typename\n        displayLabel\n        ... on Artist {\n          internalID\n          image {\n            cropped(width: 44, height: 44) {\n              height\n              src\n              srcSet\n              width\n            }\n          }\n        }\n        ... on Node {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '79a276339764fe6e8332cbf26bb6f57c';
export default node;
