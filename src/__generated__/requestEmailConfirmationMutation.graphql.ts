/**
 * @generated SignedSource<<cff46f7c0a011951b5dc29feca89dfb1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type requestEmailConfirmationMutation$variables = Record<PropertyKey, never>;
export type requestEmailConfirmationMutation$data = {
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
export type requestEmailConfirmationMutation = {
  response: requestEmailConfirmationMutation$data;
  variables: requestEmailConfirmationMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "input",
    "value": {}
  }
],
v1 = {
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
v2 = {
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "requestEmailConfirmationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "sendConfirmationEmail(input:{})"
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "requestEmailConfirmationMutation",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
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
              (v1/*: any*/),
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": "sendConfirmationEmail(input:{})"
      }
    ]
  },
  "params": {
    "cacheID": "3f27fd254bd0e8266181e52a8da62776",
    "id": null,
    "metadata": {},
    "name": "requestEmailConfirmationMutation",
    "operationKind": "mutation",
    "text": "mutation requestEmailConfirmationMutation {\n  sendConfirmationEmail(input: {}) {\n    confirmationOrError {\n      __typename\n      ... on SendConfirmationEmailMutationSuccess {\n        unconfirmedEmail\n      }\n      ... on SendConfirmationEmailMutationFailure {\n        mutationError {\n          error\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4b0a1029678628b4e7d8f1af73795e3e";

export default node;
