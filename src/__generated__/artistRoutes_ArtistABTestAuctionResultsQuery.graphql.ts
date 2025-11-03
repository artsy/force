/**
 * @generated SignedSource<<a63c22a00f80ff81395056226999b911>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type artistRoutes_ArtistABTestAuctionResultsQuery$variables = {
  artistID: string;
};
export type artistRoutes_ArtistABTestAuctionResultsQuery$data = {
  readonly artist: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistABTestRoute_artist">;
  } | null | undefined;
};
export type artistRoutes_ArtistABTestAuctionResultsQuery = {
  response: artistRoutes_ArtistABTestAuctionResultsQuery$data;
  variables: artistRoutes_ArtistABTestAuctionResultsQuery$variables;
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
    "name": "artistRoutes_ArtistABTestAuctionResultsQuery",
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
    "name": "artistRoutes_ArtistABTestAuctionResultsQuery",
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
    "cacheID": "5fc3a77f1a0049186e85e4731cad016b",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_ArtistABTestAuctionResultsQuery",
    "operationKind": "query",
    "text": "query artistRoutes_ArtistABTestAuctionResultsQuery(\n  $artistID: String!\n) @cacheable {\n  artist(id: $artistID) @principalField {\n    ...ArtistABTestRoute_artist\n    id\n  }\n}\n\nfragment ArtistABTestRoute_artist on Artist {\n  ...ArtistCombinedRoute_artist\n  internalID\n  slug\n}\n\nfragment ArtistCombinedRoute_artist on Artist {\n  internalID\n}\n"
  }
};
})();

(node as any).hash = "bea02c58beeeac6d5caf44f6740f3af4";

export default node;
