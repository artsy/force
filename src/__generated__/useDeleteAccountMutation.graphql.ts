/**
 * @generated SignedSource<<ad3335bcb996d019411ba1e834c4f4f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteAccountInput = {
  clientMutationId?: string | null | undefined;
  explanation?: string | null | undefined;
  password?: string | null | undefined;
  url?: string | null | undefined;
};
export type useDeleteAccountMutation$variables = {
  input: DeleteAccountInput;
};
export type useDeleteAccountMutation$data = {
  readonly deleteMyAccountMutation: {
    readonly userAccountOrError: {
      readonly mutationError?: {
        readonly detail: string | null | undefined;
        readonly message: string;
        readonly type: string | null | undefined;
      } | null | undefined;
      readonly success?: boolean | null | undefined;
    } | null | undefined;
  } | null | undefined;
};
export type useDeleteAccountMutation = {
  response: useDeleteAccountMutation$data;
  variables: useDeleteAccountMutation$variables;
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
      "name": "success",
      "storageKey": null
    }
  ],
  "type": "AccountMutationSuccess",
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
          "name": "type",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "message",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "detail",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AccountMutationFailure",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useDeleteAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteAccountPayload",
        "kind": "LinkedField",
        "name": "deleteMyAccountMutation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "userAccountOrError",
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
    "name": "useDeleteAccountMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "DeleteAccountPayload",
        "kind": "LinkedField",
        "name": "deleteMyAccountMutation",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "userAccountOrError",
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
    "cacheID": "c5558559415a9d7bab2a700b4f47826f",
    "id": null,
    "metadata": {},
    "name": "useDeleteAccountMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteAccountMutation(\n  $input: DeleteAccountInput!\n) {\n  deleteMyAccountMutation(input: $input) {\n    userAccountOrError {\n      __typename\n      ... on AccountMutationSuccess {\n        success\n      }\n      ... on AccountMutationFailure {\n        mutationError {\n          type\n          message\n          detail\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b0ae491406ec68a04c85c5772175b2de";

export default node;
