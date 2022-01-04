/* tslint:disable */
/* eslint-disable */

import { ConcreteRequest } from "relay-runtime";
export type RequestCredentialsForAssetUploadInput = {
    acl: string;
    clientMutationId?: string | null;
    name: string;
};
export type getGeminiCredentialsForEnvironmentMutationVariables = {
    input: RequestCredentialsForAssetUploadInput;
};
export type getGeminiCredentialsForEnvironmentMutationResponse = {
    readonly requestCredentialsForAssetUpload: {
        readonly asset: {
            readonly signature: string;
            readonly credentials: string;
            readonly policyEncoded: string;
            readonly policyDocument: {
                readonly expiration: string;
                readonly conditions: {
                    readonly acl: string;
                    readonly bucket: string;
                    readonly geminiKey: string;
                    readonly successActionStatus: string;
                };
            };
        } | null;
    } | null;
};
export type getGeminiCredentialsForEnvironmentMutation = {
    readonly response: getGeminiCredentialsForEnvironmentMutationResponse;
    readonly variables: getGeminiCredentialsForEnvironmentMutationVariables;
};



/*
mutation getGeminiCredentialsForEnvironmentMutation(
  $input: RequestCredentialsForAssetUploadInput!
) {
  requestCredentialsForAssetUpload(input: $input) {
    asset {
      signature
      credentials
      policyEncoded
      policyDocument {
        expiration
        conditions {
          acl
          bucket
          geminiKey
          successActionStatus
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input",
    "type": "RequestCredentialsForAssetUploadInput!"
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
    "type": "Mutation"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "getGeminiCredentialsForEnvironmentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "id": null,
    "metadata": {},
    "name": "getGeminiCredentialsForEnvironmentMutation",
    "operationKind": "mutation",
    "text": "mutation getGeminiCredentialsForEnvironmentMutation(\n  $input: RequestCredentialsForAssetUploadInput!\n) {\n  requestCredentialsForAssetUpload(input: $input) {\n    asset {\n      signature\n      credentials\n      policyEncoded\n      policyDocument {\n        expiration\n        conditions {\n          acl\n          bucket\n          geminiKey\n          successActionStatus\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'a0cc2049b62b05a1c93d0cae69fcda7a';
export default node;
