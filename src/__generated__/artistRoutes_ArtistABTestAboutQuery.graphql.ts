/**
 * @generated SignedSource<<137849091aac7458a894354d6608658f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type artistRoutes_ArtistABTestAboutQuery$variables = {
  artistID: string;
};
export type artistRoutes_ArtistABTestAboutQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistABTestRoute_artist">;
  } | null | undefined;
};
export type artistRoutes_ArtistABTestAboutQuery = {
  response: artistRoutes_ArtistABTestAboutQuery$data;
  variables: artistRoutes_ArtistABTestAboutQuery$variables;
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
    "name": "artistRoutes_ArtistABTestAboutQuery",
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
    "name": "artistRoutes_ArtistABTestAboutQuery",
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
    "cacheID": "92a3ac83f1593b28b045fbac33831867",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_ArtistABTestAboutQuery",
    "operationKind": "query",
    "text": "query artistRoutes_ArtistABTestAboutQuery(\n  $artistID: String!\n) @cacheable {\n  artist(id: $artistID) @principalField {\n    ...ArtistABTestRoute_artist\n    id\n  }\n}\n\nfragment ArtistABTestRoute_artist on Artist {\n  ...ArtistCombinedRoute_artist\n  internalID\n  slug\n}\n\nfragment ArtistCombinedRoute_artist on Artist {\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "dbfebf63e3970d6f73d94416d9019fd8";

export default node;
