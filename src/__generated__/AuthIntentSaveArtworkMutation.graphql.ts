/**
 * @generated SignedSource<<94a05125cc8fc94f599fc258463acbc2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SaveArtworkInput = {
  artworkID?: string | null | undefined;
  clientMutationId?: string | null | undefined;
  remove?: boolean | null | undefined;
};
export type AuthIntentSaveArtworkMutation$variables = {
  input: SaveArtworkInput;
};
export type AuthIntentSaveArtworkMutation$data = {
  readonly saveArtwork: {
    readonly artwork: {
      readonly id: string;
      readonly isSaved: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type AuthIntentSaveArtworkMutation$rawResponse = {
  readonly saveArtwork: {
    readonly artwork: {
      readonly id: string;
      readonly isSaved: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type AuthIntentSaveArtworkMutation = {
  rawResponse: AuthIntentSaveArtworkMutation$rawResponse;
  response: AuthIntentSaveArtworkMutation$data;
  variables: AuthIntentSaveArtworkMutation$variables;
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

(node as any).hash = "e3264dca9c4b2227f5086e1978706c2c";

export default node;
