/**
 * @generated SignedSource<<41c531b676fbb8c734296c576f49e508>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type RetrospectiveTopArtistsQuery$variables = {
  ids: ReadonlyArray<string>;
};
export type RetrospectiveTopArtistsQuery$data = {
  readonly artists: ReadonlyArray<{
    readonly name: string | null;
    readonly slug: string;
  } | null> | null;
};
export type RetrospectiveTopArtistsQuery = {
  response: RetrospectiveTopArtistsQuery$data;
  variables: RetrospectiveTopArtistsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "ids"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "slugs",
    "variableName": "ids"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "RetrospectiveTopArtistsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artists",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/)
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
    "name": "RetrospectiveTopArtistsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artist",
        "kind": "LinkedField",
        "name": "artists",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
    "cacheID": "2296f55ccd0c35052b7b97d8b40a4f7c",
    "id": null,
    "metadata": {},
    "name": "RetrospectiveTopArtistsQuery",
    "operationKind": "query",
    "text": "query RetrospectiveTopArtistsQuery(\n  $ids: [String!]!\n) {\n  artists(slugs: $ids) {\n    slug\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "d885645035e04d31255f62e71048a482";

export default node;
