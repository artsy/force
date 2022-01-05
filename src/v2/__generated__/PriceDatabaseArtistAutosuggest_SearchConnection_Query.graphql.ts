/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type PriceDatabaseArtistAutosuggest_SearchConnection_QueryVariables = {
    searchQuery: string;
};
export type PriceDatabaseArtistAutosuggest_SearchConnection_QueryResponse = {
    readonly searchConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly displayLabel: string | null;
                readonly slug?: string;
                readonly internalID?: string;
                readonly imageUrl?: string | null;
                readonly counts?: {
                    readonly auctionResults: number | null;
                } | null;
            } | null;
        } | null> | null;
    } | null;
};
export type PriceDatabaseArtistAutosuggest_SearchConnection_Query = {
    readonly response: PriceDatabaseArtistAutosuggest_SearchConnection_QueryResponse;
    readonly variables: PriceDatabaseArtistAutosuggest_SearchConnection_QueryVariables;
};



/*
query PriceDatabaseArtistAutosuggest_SearchConnection_Query(
  $searchQuery: String!
) {
  searchConnection(query: $searchQuery, entities: ARTIST, mode: AUTOSUGGEST, first: 20) {
    edges {
      node {
        __typename
        displayLabel
        ... on Artist {
          slug
          internalID
          imageUrl
          counts {
            auctionResults
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
    "value": 20
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
      "name": "imageUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "ArtistCounts",
      "kind": "LinkedField",
      "name": "counts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "auctionResults",
          "storageKey": null
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
    "name": "PriceDatabaseArtistAutosuggest_SearchConnection_Query",
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
    "name": "PriceDatabaseArtistAutosuggest_SearchConnection_Query",
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
    "name": "PriceDatabaseArtistAutosuggest_SearchConnection_Query",
    "operationKind": "query",
    "text": "query PriceDatabaseArtistAutosuggest_SearchConnection_Query(\n  $searchQuery: String!\n) {\n  searchConnection(query: $searchQuery, entities: ARTIST, mode: AUTOSUGGEST, first: 20) {\n    edges {\n      node {\n        __typename\n        displayLabel\n        ... on Artist {\n          slug\n          internalID\n          imageUrl\n          counts {\n            auctionResults\n          }\n        }\n        ... on Node {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '8a851530fab5a0af6e9a488810593843';
export default node;
