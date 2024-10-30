/**
 * @generated SignedSource<<14187c0dc821dd6eb05c9e43db7099c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type useSaveArtworkToListsCustomListsQuery$variables = {
  id: string;
};
export type useSaveArtworkToListsCustomListsQuery$data = {
  readonly artwork: {
    readonly isSavedToList: boolean;
  } | null | undefined;
};
export type useSaveArtworkToListsCustomListsQuery = {
  response: useSaveArtworkToListsCustomListsQuery$data;
  variables: useSaveArtworkToListsCustomListsQuery$variables;
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
  "args": [
    {
      "kind": "Literal",
      "name": "default",
      "value": false
    }
  ],
  "kind": "ScalarField",
  "name": "isSavedToList",
  "storageKey": "isSavedToList(default:false)"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useSaveArtworkToListsCustomListsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
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
    "name": "useSaveArtworkToListsCustomListsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
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
    "cacheID": "0f9a401227def7164ac4a67698b56ad4",
    "id": null,
    "metadata": {},
    "name": "useSaveArtworkToListsCustomListsQuery",
    "operationKind": "query",
    "text": "query useSaveArtworkToListsCustomListsQuery(\n  $id: String!\n) {\n  artwork(id: $id) {\n    isSavedToList(default: false)\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f34eb087858fe31f120512c816e3c578";

export default node;
