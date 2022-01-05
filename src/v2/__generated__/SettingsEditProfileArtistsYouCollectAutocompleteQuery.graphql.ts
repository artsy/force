/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type SettingsEditProfileArtistsYouCollectAutocompleteQueryVariables = {
    term: string;
};
export type SettingsEditProfileArtistsYouCollectAutocompleteQueryResponse = {
    readonly searchConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly text: string | null;
                readonly value?: string;
            } | null;
        } | null> | null;
    } | null;
};
export type SettingsEditProfileArtistsYouCollectAutocompleteQuery = {
    readonly response: SettingsEditProfileArtistsYouCollectAutocompleteQueryResponse;
    readonly variables: SettingsEditProfileArtistsYouCollectAutocompleteQueryVariables;
};



/*
query SettingsEditProfileArtistsYouCollectAutocompleteQuery(
  $term: String!
) {
  searchConnection(query: $term, entities: ARTIST, first: 5) {
    edges {
      node {
        __typename
        text: displayLabel
        ... on Artist {
          value: internalID
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
    "value": 5
  },
  {
    "kind": "Variable",
    "name": "query",
    "variableName": "term"
  }
],
v2 = {
  "alias": "text",
  "args": null,
  "kind": "ScalarField",
  "name": "displayLabel",
  "storageKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": "value",
      "args": null,
      "kind": "ScalarField",
      "name": "internalID",
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
    "name": "SettingsEditProfileArtistsYouCollectAutocompleteQuery",
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
    "name": "SettingsEditProfileArtistsYouCollectAutocompleteQuery",
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
    "name": "SettingsEditProfileArtistsYouCollectAutocompleteQuery",
    "operationKind": "query",
    "text": "query SettingsEditProfileArtistsYouCollectAutocompleteQuery(\n  $term: String!\n) {\n  searchConnection(query: $term, entities: ARTIST, first: 5) {\n    edges {\n      node {\n        __typename\n        text: displayLabel\n        ... on Artist {\n          value: internalID\n        }\n        ... on Node {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '860659990c56f6374e2c3ac9f54f1bd2';
export default node;
