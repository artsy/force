/**
 * @generated SignedSource<<3bb47a8e10cd7bea2646cb2e46f7f1d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type artistRoutes_ArtistABTestQuery$variables = {
  artistID: string;
};
export type artistRoutes_ArtistABTestQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistABTestRoute_artist">;
  } | null | undefined;
};
export type artistRoutes_ArtistABTestQuery = {
  response: artistRoutes_ArtistABTestQuery$data;
  variables: artistRoutes_ArtistABTestQuery$variables;
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
    "name": "artistRoutes_ArtistABTestQuery",
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
            "name": "ArtistABTestRoute_artist"
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
    "name": "artistRoutes_ArtistABTestQuery",
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e6fee350129e3369ce3402ef92735bc8",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_ArtistABTestQuery",
    "operationKind": "query",
    "text": "query artistRoutes_ArtistABTestQuery(\n  $artistID: String!\n) @cacheable {\n  artist(id: $artistID) @principalField {\n    ...ArtistABTestRoute_artist\n    id\n  }\n}\n\nfragment ArtistABTestRoute_artist on Artist {\n  ...ArtistCombinedRoute_artist\n  internalID\n  slug\n}\n\nfragment ArtistCombinedRoute_artist on Artist {\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "63698ad8f6d170a727f0ec344d81ad06";

export default node;
