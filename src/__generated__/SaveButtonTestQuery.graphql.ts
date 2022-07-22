/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type SaveButtonTestQueryVariables = {};
export type SaveButtonTestQueryResponse = {
    readonly artwork: {
        readonly " $fragmentRefs": FragmentRefs<"SaveButton_artwork">;
    } | null;
};
export type SaveButtonTestQuery = {
    readonly response: SaveButtonTestQueryResponse;
    readonly variables: SaveButtonTestQueryVariables;
};



/*
query SaveButtonTestQuery {
  artwork(id: "example-artwork-id") {
    ...SaveButton_artwork
    id
  }
}

fragment SaveButton_artwork on Artwork {
  id
  internalID
  slug
  is_saved: isSaved
  title
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example-artwork-id"
  }
],
v1 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "SaveButtonTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SaveButton_artwork"
          }
        ],
        "storageKey": "artwork(id:\"example-artwork-id\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "SaveButtonTestQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": "is_saved",
            "args": null,
            "kind": "ScalarField",
            "name": "isSaved",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"example-artwork-id\")"
      }
    ]
  },
  "params": {
    "cacheID": "e1cbe5325f819672486b47a6c3c8326f",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artwork": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artwork"
        },
        "artwork.id": (v1/*: any*/),
        "artwork.internalID": (v1/*: any*/),
        "artwork.is_saved": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Boolean"
        },
        "artwork.slug": (v1/*: any*/),
        "artwork.title": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "SaveButtonTestQuery",
    "operationKind": "query",
    "text": "query SaveButtonTestQuery {\n  artwork(id: \"example-artwork-id\") {\n    ...SaveButton_artwork\n    id\n  }\n}\n\nfragment SaveButton_artwork on Artwork {\n  id\n  internalID\n  slug\n  is_saved: isSaved\n  title\n}\n"
  }
};
})();
(node as any).hash = '4197398aea6751a896b08a6a2465ca4a';
export default node;
