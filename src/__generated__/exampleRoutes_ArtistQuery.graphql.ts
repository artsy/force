/**
 * @generated SignedSource<<fa1ff612eef6bf97e8bf8a269bfb3867>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type exampleRoutes_ArtistQuery$variables = {
  slug: string;
};
export type exampleRoutes_ArtistQuery$data = {
  readonly artist: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ExampleArtistRoute_artist">;
  } | null;
};
export type exampleRoutes_ArtistQuery = {
  response: exampleRoutes_ArtistQuery$data;
  variables: exampleRoutes_ArtistQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "slug"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "slug"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "exampleRoutes_ArtistQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ExampleArtistRoute_artist"
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
    "name": "exampleRoutes_ArtistQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "name": "bio",
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8f7d15cd5f0d3bb3949bd45c16f88738",
    "id": null,
    "metadata": {},
    "name": "exampleRoutes_ArtistQuery",
    "operationKind": "query",
    "text": "query exampleRoutes_ArtistQuery(\n  $slug: String!\n) {\n  artist(id: $slug) @principalField {\n    id\n    ...ExampleArtistRoute_artist\n  }\n}\n\nfragment ExampleArtistRoute_artist on Artist {\n  name\n  bio\n  internalID\n  slug\n}\n"
  }
};
})();

(node as any).hash = "f240123309eb71f60ebf184aef275d94";

export default node;
