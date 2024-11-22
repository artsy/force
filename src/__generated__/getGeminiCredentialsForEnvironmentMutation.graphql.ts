/**
 * @generated SignedSource<<1a47ec3b893471006c003c88f6ed12a6>>
 * @relayHash 390163a2c0e0d6080e2fc0a6780e2530
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 390163a2c0e0d6080e2fc0a6780e2530

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
    "id": "390163a2c0e0d6080e2fc0a6780e2530",
    "metadata": {},
    "name": "getGeminiCredentialsForEnvironmentMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "a0cc2049b62b05a1c93d0cae69fcda7a";

export default node;
