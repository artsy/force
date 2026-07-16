/**
 * @generated SignedSource<<79e90ffd3aeee066983228842e088412>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type useCommandBarActionsArtworkQuery$variables = {
  id: string;
};
export type useCommandBarActionsArtworkQuery$data = {
  readonly artwork: {
    readonly internalID: string;
    readonly isSavedToAnyList: boolean;
    readonly title: string | null | undefined;
  } | null | undefined;
};
export type useCommandBarActionsArtworkQuery = {
  response: useCommandBarActionsArtworkQuery$data;
  variables: useCommandBarActionsArtworkQuery$variables;
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
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isSavedToAnyList",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCommandBarActionsArtworkQuery",
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
    "name": "useCommandBarActionsArtworkQuery",
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
    "cacheID": "cec68001eb77c1382b979e608bbe2342",
    "id": null,
    "metadata": {},
    "name": "useCommandBarActionsArtworkQuery",
    "operationKind": "query",
    "text": "query useCommandBarActionsArtworkQuery(\n  $id: String!\n) {\n  artwork(id: $id) {\n    internalID\n    title\n    isSavedToAnyList\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "3af07de087968df3c72efc3819e865d8";

export default node;
