/**
 * @generated SignedSource<<749ccbffc688ae6bec3940322a121f4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type artistRoutes_ArtistAuctionResultsQuery$variables = {
  artistID: string;
};
export type artistRoutes_ArtistAuctionResultsQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistCombinedRoute_artist">;
  } | null | undefined;
};
export type artistRoutes_ArtistAuctionResultsQuery = {
  response: artistRoutes_ArtistAuctionResultsQuery$data;
  variables: artistRoutes_ArtistAuctionResultsQuery$variables;
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
    "name": "artistRoutes_ArtistAuctionResultsQuery",
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
    "name": "artistRoutes_ArtistAuctionResultsQuery",
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
    "cacheID": "93520d76d73f823c971fcf269aa06063",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_ArtistAuctionResultsQuery",
    "operationKind": "query",
    "text": "query artistRoutes_ArtistAuctionResultsQuery(\n  $artistID: String!\n) @cacheable {\n  artist(id: $artistID) @principalField {\n    ...ArtistCombinedRoute_artist\n    id\n  }\n}\n\nfragment ArtistCombinedRoute_artist on Artist {\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "3436b5956daf79e7f8621e379075a10c";

export default node;
