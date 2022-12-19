/**
 * @generated SignedSource<<9443e538516cf50793992ee582e88c10>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SendIdentityVerificationEmailMutationInput = {
  clientMutationId?: string | null;
  email?: string | null;
  name?: string | null;
  userID?: string | null;
};
export type verifyIDMutation$variables = {
  input: SendIdentityVerificationEmailMutationInput;
};
export type verifyIDMutation$data = {
  readonly sendIdentityVerificationEmail: {
    readonly confirmationOrError: {
      readonly identityVerificationEmail?: {
        readonly internalID: string;
        readonly state: string;
        readonly userID: string | null;
      } | null;
      readonly mutationError?: {
        readonly error: string | null;
        readonly message: string;
      } | null;
    } | null;
  } | null;
};
export type verifyIDMutation = {
  response: verifyIDMutation$data;
  variables: verifyIDMutation$variables;
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
  "name": "state",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "userID",
  "storageKey": null
},
v5 = {
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
  "type": "IdentityVerificationEmailMutationFailureType",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "verifyIDMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendIdentityVerificationEmailMutationPayload",
        "kind": "LinkedField",
        "name": "sendIdentityVerificationEmail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "confirmationOrError",
            "plural": false,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "IdentityVerificationEmail",
                    "kind": "LinkedField",
                    "name": "identityVerificationEmail",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "IdentityVerificationEmailMutationSuccessType",
                "abstractKey": null
              },
              (v5/*: any*/)
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
    "name": "verifyIDMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendIdentityVerificationEmailMutationPayload",
        "kind": "LinkedField",
        "name": "sendIdentityVerificationEmail",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "confirmationOrError",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "__typename",
                "storageKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "IdentityVerificationEmail",
                    "kind": "LinkedField",
                    "name": "identityVerificationEmail",
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
                ],
                "type": "IdentityVerificationEmailMutationSuccessType",
                "abstractKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "2e3e1d90294963b6fa0a0fa3b10cabbc",
    "id": null,
    "metadata": {},
    "name": "verifyIDMutation",
    "operationKind": "mutation",
    "text": "mutation verifyIDMutation(\n  $input: SendIdentityVerificationEmailMutationInput!\n) {\n  sendIdentityVerificationEmail(input: $input) {\n    confirmationOrError {\n      __typename\n      ... on IdentityVerificationEmailMutationSuccessType {\n        identityVerificationEmail {\n          internalID\n          state\n          userID\n          id\n        }\n      }\n      ... on IdentityVerificationEmailMutationFailureType {\n        mutationError {\n          error\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d2524c7f23c0abbefdf4c88d37d789cf";

export default node;
