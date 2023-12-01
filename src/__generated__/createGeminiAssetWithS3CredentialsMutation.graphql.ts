/**
 * @generated SignedSource<<969d332c62328604b806558704c2b21d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CreateGeminiEntryForAssetInput = {
  clientMutationId?: string | null | undefined;
  metadata: any;
  sourceBucket: string;
  sourceKey: string;
  templateKey: string;
};
export type createGeminiAssetWithS3CredentialsMutation$variables = {
  input: CreateGeminiEntryForAssetInput;
};
export type createGeminiAssetWithS3CredentialsMutation$data = {
  readonly createGeminiEntryForAsset: {
    readonly asset: {
      readonly token: string;
    } | null | undefined;
  } | null | undefined;
};
export type createGeminiAssetWithS3CredentialsMutation = {
  response: createGeminiAssetWithS3CredentialsMutation$data;
  variables: createGeminiAssetWithS3CredentialsMutation$variables;
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
    "concreteType": "CreateGeminiEntryForAssetPayload",
    "kind": "LinkedField",
    "name": "createGeminiEntryForAsset",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "GeminiEntry",
        "kind": "LinkedField",
        "name": "asset",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "token",
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
    "name": "createGeminiAssetWithS3CredentialsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "createGeminiAssetWithS3CredentialsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "55a8c7797e0ad70ce3351836d4745c74",
    "id": null,
    "metadata": {},
    "name": "createGeminiAssetWithS3CredentialsMutation",
    "operationKind": "mutation",
    "text": "mutation createGeminiAssetWithS3CredentialsMutation(\n  $input: CreateGeminiEntryForAssetInput!\n) {\n  createGeminiEntryForAsset(input: $input) {\n    asset {\n      token\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e15ca704c55d48b26d15b9be3a699c47";

export default node;
