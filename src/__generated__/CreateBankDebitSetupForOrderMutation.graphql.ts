/**
 * @generated SignedSource<<a78de7c2297083d358b547948122ea43>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type CommerceCreateBankDebitSetupForOrderInput = {
  clientMutationId?: string | null | undefined;
  id: string;
};
export type CreateBankDebitSetupForOrderMutation$variables = {
  input: CommerceCreateBankDebitSetupForOrderInput;
};
export type CreateBankDebitSetupForOrderMutation$data = {
  readonly commerceCreateBankDebitSetupForOrder: {
    readonly actionOrError: {
      readonly __typename: "CommerceOrderRequiresAction";
      readonly actionData: {
        readonly clientSecret: string;
      };
    } | {
      readonly __typename: "CommerceOrderWithMutationFailure";
      readonly error: {
        readonly code: string;
        readonly data: string | null | undefined;
        readonly type: string;
      };
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    };
    readonly setupIntentId: string | null | undefined;
  } | null | undefined;
};
export type CreateBankDebitSetupForOrderMutation = {
  response: CreateBankDebitSetupForOrderMutation$data;
  variables: CreateBankDebitSetupForOrderMutation$variables;
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
    "concreteType": "CommerceCreateBankDebitSetupForOrderPayload",
    "kind": "LinkedField",
    "name": "commerceCreateBankDebitSetupForOrder",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "setupIntentId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": null,
        "kind": "LinkedField",
        "name": "actionOrError",
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
                "concreteType": "CommerceOrderActionData",
                "kind": "LinkedField",
                "name": "actionData",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "clientSecret",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "CommerceOrderRequiresAction",
            "abstractKey": null
          },
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommerceApplicationError",
                "kind": "LinkedField",
                "name": "error",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "code",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "data",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "type",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "type": "CommerceOrderWithMutationFailure",
            "abstractKey": null
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
    "name": "CreateBankDebitSetupForOrderMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateBankDebitSetupForOrderMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8f34ffed44a9952755c0180888b405dd",
    "id": null,
    "metadata": {},
    "name": "CreateBankDebitSetupForOrderMutation",
    "operationKind": "mutation",
    "text": "mutation CreateBankDebitSetupForOrderMutation(\n  $input: CommerceCreateBankDebitSetupForOrderInput!\n) {\n  commerceCreateBankDebitSetupForOrder(input: $input) {\n    setupIntentId\n    actionOrError {\n      __typename\n      ... on CommerceOrderRequiresAction {\n        actionData {\n          clientSecret\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          code\n          data\n          type\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fe44966327915fe7e91f2a05b2070c84";

export default node;
