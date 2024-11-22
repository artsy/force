/**
 * @generated SignedSource<<c4366b6a89d36e483461cbd5a0a65b69>>
 * @relayHash 79cf86f4361bbb038bc513d96891b75c
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 79cf86f4361bbb038bc513d96891b75c

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SendIdentityVerificationEmailMutationInput = {
  clientMutationId?: string | null | undefined;
  email?: string | null | undefined;
  initiatorID?: string | null | undefined;
  name?: string | null | undefined;
  orderID?: string | null | undefined;
  saleID?: string | null | undefined;
  sendEmail?: boolean | null | undefined;
  userID?: string | null | undefined;
};
export type useVerifyIDMutation$variables = {
  input: SendIdentityVerificationEmailMutationInput;
};
export type useVerifyIDMutation$data = {
  readonly sendIdentityVerificationEmail: {
    readonly confirmationOrError: {
      readonly identityVerification?: {
        readonly internalID: string;
        readonly state: string;
        readonly userID: string | null | undefined;
      } | null | undefined;
      readonly mutationError?: {
        readonly error: string | null | undefined;
        readonly message: string;
      } | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useVerifyIDMutation = {
  response: useVerifyIDMutation$data;
  variables: useVerifyIDMutation$variables;
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
    "name": "useVerifyIDMutation",
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
                    "concreteType": "IdentityVerification",
                    "kind": "LinkedField",
                    "name": "identityVerification",
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
    "name": "useVerifyIDMutation",
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
                    "concreteType": "IdentityVerification",
                    "kind": "LinkedField",
                    "name": "identityVerification",
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
    "id": "79cf86f4361bbb038bc513d96891b75c",
    "metadata": {},
    "name": "useVerifyIDMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "6945d5f34eebe2766a806a9fe46506c9";

export default node;
