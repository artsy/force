/**
 * @generated SignedSource<<c864e4620dce157edd464cd7c4b483a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SaveArtworkInput = {
  artworkID?: string | null;
  clientMutationId?: string | null;
  remove?: boolean | null;
};
export type AuthIntentSaveArtworkMutation$variables = {
  input: SaveArtworkInput;
};
export type AuthIntentSaveArtworkMutation$data = {
  readonly saveArtwork: {
    readonly artwork: {
      readonly id: string;
      readonly isSaved: boolean | null;
    } | null;
  } | null;
};
export type AuthIntentSaveArtworkMutation = {
  variables: AuthIntentSaveArtworkMutation$variables;
  response: AuthIntentSaveArtworkMutation$data;
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
            "name": "isSaved",
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
    "name": "AuthIntentSaveArtworkMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuthIntentSaveArtworkMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "06456174a6d2b2cc8130259a6f18b353",
    "id": null,
    "metadata": {},
    "name": "AuthIntentSaveArtworkMutation",
    "operationKind": "mutation",
    "text": "mutation AuthIntentSaveArtworkMutation(\n  $input: SaveArtworkInput!\n) {\n  saveArtwork(input: $input) {\n    artwork {\n      id\n      isSaved\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2f0e4b1d5370a41280441f06178aa7aa";

export default node;
