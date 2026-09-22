/**
 * @generated SignedSource<<753b6cceb09b7e17a219dba8665e9c2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type artistRoutes_ArtistTabQuery$variables = {
  artistID: string;
};
export type artistRoutes_ArtistTabQuery$data = {
  readonly artist: {
    readonly slug: string;
  } | null | undefined;
};
export type artistRoutes_ArtistTabQuery = {
  response: artistRoutes_ArtistTabQuery$data;
  variables: artistRoutes_ArtistTabQuery$variables;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "artistRoutes_ArtistTabQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artist",
        "plural": false,
        "selections": [
          (v2/*: any*/)
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
    "name": "artistRoutes_ArtistTabQuery",
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
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8bc8c4db8d5a0bd0a45789e55af0b9ac",
    "id": null,
    "metadata": {},
    "name": "artistRoutes_ArtistTabQuery",
    "operationKind": "query",
    "text": "query artistRoutes_ArtistTabQuery(\n  $artistID: String!\n) @cacheable {\n  artist(id: $artistID) @principalField {\n    slug\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "258de35c57de1e5ba67d4cd3698a8979";

export default node;
