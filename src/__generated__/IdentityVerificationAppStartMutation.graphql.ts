/**
 * @generated SignedSource<<3818543a2c52c41f4a4198d8ca7d3167>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type startIdentityVerificationMutationInput = {
  clientMutationId?: string | null | undefined;
  identityVerificationId: string;
};
export type IdentityVerificationAppStartMutation$variables = {
  input: startIdentityVerificationMutationInput;
};
export type IdentityVerificationAppStartMutation$data = {
  readonly startIdentityVerification: {
    readonly startIdentityVerificationResponseOrError: {
      readonly identityVerificationFlowUrl?: string | null | undefined;
      readonly mutationError?: {
        readonly detail: string | null | undefined;
        readonly error: string | null | undefined;
        readonly message: string;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type IdentityVerificationAppStartMutation = {
  response: IdentityVerificationAppStartMutation$data;
  variables: IdentityVerificationAppStartMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "identityVerificationFlowUrl",
      "storageKey": null
    }
  ],
  "type": "StartIdentityVerificationSuccess",
  "abstractKey": null
},
v3 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GravityMutationError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "detail",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "error",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "StartIdentityVerificationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "IdentityVerificationAppStartMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "startIdentityVerificationMutationPayload",
        "kind": "LinkedField",
        "name": "startIdentityVerification",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "startIdentityVerificationResponseOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "IdentityVerificationAppStartMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "startIdentityVerificationMutationPayload",
        "kind": "LinkedField",
        "name": "startIdentityVerification",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "startIdentityVerificationResponseOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2f05867d8850e6b7dd5b60bc193f489e",
    "id": null,
    "metadata": {},
    "name": "IdentityVerificationAppStartMutation",
    "operationKind": "mutation",
    "text": "mutation IdentityVerificationAppStartMutation(\n  $input: startIdentityVerificationMutationInput!\n) {\n  startIdentityVerification(input: $input) {\n    startIdentityVerificationResponseOrError {\n      __typename\n      ... on StartIdentityVerificationSuccess {\n        identityVerificationFlowUrl\n      }\n      ... on StartIdentityVerificationFailure {\n        mutationError {\n          detail\n          error\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5fb8327f4b811236854bf71ccdb299bd";

export default node;
