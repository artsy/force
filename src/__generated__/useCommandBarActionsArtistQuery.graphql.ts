/**
 * @generated SignedSource<<2898ea53c8a38a1324078ab6b9b0070b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useCommandBarActionsArtistQuery$variables = {
  id: string;
};
export type useCommandBarActionsArtistQuery$data = {
  readonly artist: {
    readonly internalID: string;
    readonly isFollowed: boolean | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined;
};
export type useCommandBarActionsArtistQuery = {
  response: useCommandBarActionsArtistQuery$data;
  variables: useCommandBarActionsArtistQuery$variables;
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
  "name": "internalID",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isFollowed",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCommandBarActionsArtistQuery",
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
          (v3/*: any*/),
          (v4/*: any*/)
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
    "name": "useCommandBarActionsArtistQuery",
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
          (v3/*: any*/),
          (v4/*: any*/),
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
    "cacheID": "d360132e64a93e71923b29c728b2596a",
    "id": null,
    "metadata": {},
    "name": "useCommandBarActionsArtistQuery",
    "operationKind": "query",
    "text": "query useCommandBarActionsArtistQuery(\n  $id: String!\n) {\n  artist(id: $id) {\n    internalID\n    name\n    isFollowed\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "add9a5b0d2e2461279f75fe73690b4bc";

export default node;
