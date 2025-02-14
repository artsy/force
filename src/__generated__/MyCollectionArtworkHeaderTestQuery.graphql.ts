/**
 * @generated SignedSource<<17f311b5092a9908c00aacce6049c346>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MyCollectionArtworkHeaderTestQuery$variables = Record<PropertyKey, never>;
export type MyCollectionArtworkHeaderTestQuery$data = {
  readonly artwork: {
    readonly " $fragmentSpreads": FragmentRefs<"MyCollectionArtworkHeader_artwork">;
  } | null | undefined;
};
export type MyCollectionArtworkHeaderTestQuery = {
  response: MyCollectionArtworkHeaderTestQuery$data;
  variables: MyCollectionArtworkHeaderTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "foo"
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
    "name": "MyCollectionArtworkHeaderTestQuery",
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
            "name": "MyCollectionArtworkHeader_artwork"
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MyCollectionArtworkHeaderTestQuery",
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
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artwork(id:\"foo\")"
      }
    ]
  },
  "params": {
    "cacheID": "0ccd6343a0b09e760e3a654cf2dbf13b",
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
        "artwork.slug": (v1/*: any*/)
      }
    },
    "name": "MyCollectionArtworkHeaderTestQuery",
    "operationKind": "query",
    "text": "query MyCollectionArtworkHeaderTestQuery {\n  artwork(id: \"foo\") {\n    ...MyCollectionArtworkHeader_artwork\n    id\n  }\n}\n\nfragment MyCollectionArtworkHeader_artwork on Artwork {\n  internalID\n  slug\n}\n"
  }
};
})();

(node as any).hash = "663c9c35d2464bf5a9611d350e57d0e3";

export default node;
