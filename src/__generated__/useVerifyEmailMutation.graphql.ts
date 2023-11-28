/**
 * @generated SignedSource<<a60a0a15bcf894fd641e676a124f7740>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SendConfirmationEmailMutationInput = {
  clientMutationId?: string | null | undefined;
};
export type useVerifyEmailMutation$variables = {
  input: SendConfirmationEmailMutationInput;
};
export type useVerifyEmailMutation$data = {
  readonly sendConfirmationEmail: {
    readonly confirmationOrError: {
      readonly mutationError?: {
        readonly error: string | null | undefined;
        readonly message: string;
      } | null | undefined;
      readonly unconfirmedEmail?: string | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useVerifyEmailMutation = {
  response: useVerifyEmailMutation$data;
  variables: useVerifyEmailMutation$variables;
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
      "name": "unconfirmedEmail",
      "storageKey": null
    }
  ],
  "type": "SendConfirmationEmailMutationSuccess",
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
  "type": "SendConfirmationEmailMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useVerifyEmailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendConfirmationEmailMutationPayload",
        "kind": "LinkedField",
        "name": "sendConfirmationEmail",
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
    "name": "useVerifyEmailMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "SendConfirmationEmailMutationPayload",
        "kind": "LinkedField",
        "name": "sendConfirmationEmail",
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
    "cacheID": "c9b6ddcdfec6bdb286b6ddfb676fbb62",
    "id": null,
    "metadata": {},
    "name": "useVerifyEmailMutation",
    "operationKind": "mutation",
    "text": "mutation useVerifyEmailMutation(\n  $input: SendConfirmationEmailMutationInput!\n) {\n  sendConfirmationEmail(input: $input) {\n    confirmationOrError {\n      __typename\n      ... on SendConfirmationEmailMutationSuccess {\n        unconfirmedEmail\n      }\n      ... on SendConfirmationEmailMutationFailure {\n        mutationError {\n          error\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2c62c4d9118b4a117a619d01661052e3";

export default node;
