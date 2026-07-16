/**
 * @generated SignedSource<<1bfbdce4b75b7ef8d2d3a4ec5848b246>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type SaveArtworkInput = {
  artworkID?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  remove?: boolean | null | undefined;
};
export type useCommandBarActionsSaveMutation$variables = {
  input: SaveArtworkInput;
};
export type useCommandBarActionsSaveMutation$data = {
  readonly saveArtwork: {
    readonly artwork: {
      readonly id: string;
      readonly isSavedToAnyList: boolean;
    } | null | undefined;
  } | null | undefined;
};
export type useCommandBarActionsSaveMutation = {
  response: useCommandBarActionsSaveMutation$data;
  variables: useCommandBarActionsSaveMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SaveArtworkPayload",
    "kind": "LinkedField",
    "name": "saveArtwork",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Artwork",
        "kind": "LinkedField",
        "name": "artwork",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isSavedToAnyList",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCommandBarActionsSaveMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useCommandBarActionsSaveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "789c320cc876ebf487fd667ff7695e3e",
    "id": null,
    "metadata": {},
    "name": "useCommandBarActionsSaveMutation",
    "operationKind": "mutation",
    "text": "mutation useCommandBarActionsSaveMutation(\n  $input: SaveArtworkInput!\n) {\n  saveArtwork(input: $input) {\n    artwork {\n      id\n      isSavedToAnyList\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7f6858a3a27f52061604cc05f84ff7df";

export default node;
