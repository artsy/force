/**
 * @generated SignedSource<<65d0674da4348623ef35b2ae4d2769f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useScrollToOpenArtistAuthModalQuery$variables = {
  id: string;
};
export type useScrollToOpenArtistAuthModalQuery$data = {
  readonly artist: {
    readonly name: string | null;
  } | null;
};
export type useScrollToOpenArtistAuthModalQuery = {
  response: useScrollToOpenArtistAuthModalQuery$data;
  variables: useScrollToOpenArtistAuthModalQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
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
    "name": "useScrollToOpenArtistAuthModalQuery",
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
    "name": "useScrollToOpenArtistAuthModalQuery",
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
    "cacheID": "25f6e6ddcb4100a9bed0650f5fbc0a1e",
    "id": null,
    "metadata": {},
    "name": "useScrollToOpenArtistAuthModalQuery",
    "operationKind": "query",
    "text": "query useScrollToOpenArtistAuthModalQuery(\n  $id: String!\n) {\n  artist(id: $id) {\n    name\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6fbffdc701cb2ba2346023dfa44938a0";

export default node;
