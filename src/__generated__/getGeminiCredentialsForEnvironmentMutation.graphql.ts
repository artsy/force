/**
 * @generated SignedSource<<2c2684939f5d5be10d33318dec17bf53>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RequestCredentialsForAssetUploadInput = {
  acl: string;
  clientMutationId?: string | null | undefined;
  name: string;
};
export type getGeminiCredentialsForEnvironmentMutation$variables = {
  input: RequestCredentialsForAssetUploadInput;
};
export type getGeminiCredentialsForEnvironmentMutation$data = {
  readonly requestCredentialsForAssetUpload: {
    readonly asset: {
      readonly credentials: string;
      readonly policyDocument: {
        readonly conditions: {
          readonly acl: string;
          readonly bucket: string;
          readonly geminiKey: string;
          readonly successActionStatus: string;
        };
        readonly expiration: string;
      };
      readonly policyEncoded: string;
      readonly signature: string;
    } | null | undefined;
  } | null | undefined;
};
export type getGeminiCredentialsForEnvironmentMutation = {
  response: getGeminiCredentialsForEnvironmentMutation$data;
  variables: getGeminiCredentialsForEnvironmentMutation$variables;
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
    "concreteType": "RequestCredentialsForAssetUploadPayload",
    "kind": "LinkedField",
    "name": "requestCredentialsForAssetUpload",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Credentials",
        "kind": "LinkedField",
        "name": "asset",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "signature",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "credentials",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "policyEncoded",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "S3PolicyDocumentType",
            "kind": "LinkedField",
            "name": "policyDocument",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "expiration",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "S3PolicyConditionsType",
                "kind": "LinkedField",
                "name": "conditions",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "acl",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "bucket",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "geminiKey",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "successActionStatus",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
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
    "name": "getGeminiCredentialsForEnvironmentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "getGeminiCredentialsForEnvironmentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "390163a2c0e0d6080e2fc0a6780e2530",
    "id": null,
    "metadata": {},
    "name": "getGeminiCredentialsForEnvironmentMutation",
    "operationKind": "mutation",
    "text": "mutation getGeminiCredentialsForEnvironmentMutation(\n  $input: RequestCredentialsForAssetUploadInput!\n) {\n  requestCredentialsForAssetUpload(input: $input) {\n    asset {\n      signature\n      credentials\n      policyEncoded\n      policyDocument {\n        expiration\n        conditions {\n          acl\n          bucket\n          geminiKey\n          successActionStatus\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a0cc2049b62b05a1c93d0cae69fcda7a";

export default node;
