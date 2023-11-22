/**
 * @generated SignedSource<<2eea8aff1e645cb716968a068c3d2ce4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistBackLink_Test_Query$variables = Record<PropertyKey, never>;
export type ArtistBackLink_Test_Query$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistBackLink_artist">;
  } | null | undefined;
};
export type ArtistBackLink_Test_Query = {
  response: ArtistBackLink_Test_Query$data;
  variables: ArtistBackLink_Test_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "example"
  }
],
v1 = {
  "enumValues": null,
  "nullable": true,
  "plural": false,
  "type": "String"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ArtistBackLink_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistBackLink_artist"
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ArtistBackLink_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": "artist(id:\"example\")"
      }
    ]
  },
  "params": {
    "cacheID": "5ade48a7aa33e616a8376819974ac54d",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "artist": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Artist"
        },
        "artist.href": (v1/*: any*/),
        "artist.id": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "ID"
        },
        "artist.name": (v1/*: any*/)
      }
    },
    "name": "ArtistBackLink_Test_Query",
    "operationKind": "query",
    "text": "query ArtistBackLink_Test_Query {\n  artist(id: \"example\") {\n    ...ArtistBackLink_artist\n    id\n  }\n}\n\nfragment ArtistBackLink_artist on Artist {\n  name\n  href\n}\n"
  }
};
})();

(node as any).hash = "1beef9eca30fe0c2750e64507f70a0cf";

export default node;
