/**
 * @generated SignedSource<<b27ebdc69144db54d053e2b988cddc56>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type artistRoutes_CombinedQuery$variables = {
  artistID: string;
};
export type artistRoutes_CombinedQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCombinedRoute_artist">;
  } | null | undefined;
};
export type artistRoutes_CombinedQuery = {
  response: artistRoutes_CombinedQuery$data;
  variables: artistRoutes_CombinedQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "artistID"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "artistID"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "artistRoutes_CombinedQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ArtistCombinedRoute_artist"
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
    "name": "artistRoutes_CombinedQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "a2bd1af8f0eb6f168398a438c93ee6ce",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_CombinedQuery",
    "operationKind": "query",
    "text": "query artistRoutes_CombinedQuery(\n  $artistID: String!\n) @cacheable {\n  artist(id: $artistID) @principalField {\n    ...ArtistCombinedRoute_artist\n    id\n  }\n}\n\nfragment ArtistCombinedRoute_artist on Artist {\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "2c9fc65a80d1fb575b8bd67838040752";

export default node;
