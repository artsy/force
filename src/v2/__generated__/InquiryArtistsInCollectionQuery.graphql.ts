/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type InquiryArtistsInCollectionQueryVariables = {
    term: string;
};
export type InquiryArtistsInCollectionQueryResponse = {
    readonly searchConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly text: string | null;
                readonly value?: string;
            } | null;
        } | null> | null;
    } | null;
};
export type InquiryArtistsInCollectionQuery = {
    readonly response: InquiryArtistsInCollectionQueryResponse;
    readonly variables: InquiryArtistsInCollectionQueryVariables;
};



/*
query InquiryArtistsInCollectionQuery(
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
  "type": "Artist",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InquiryArtistsInCollectionQuery",
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
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InquiryArtistsInCollectionQuery",
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
                  (v3/*: any*/),
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
  "params": {
    "cacheID": "26e888c7a6ea2fe5851d32dc369b3ac6",
    "id": null,
    "metadata": {},
    "name": "InquiryArtistsInCollectionQuery",
    "operationKind": "query",
    "text": "query InquiryArtistsInCollectionQuery(\n  $term: String!\n) {\n  searchConnection(query: $term, entities: ARTIST, first: 5) {\n    edges {\n      node {\n        __typename\n        text: displayLabel\n        ... on Artist {\n          value: internalID\n        }\n        ... on Node {\n          __isNode: __typename\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'b836c39f1fefe145be04e985afbab81d';
export default node;
