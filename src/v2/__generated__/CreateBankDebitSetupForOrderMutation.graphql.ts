/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type CommerceCreateBankDebitSetupForOrderInput = {
    clientMutationId?: string | null;
    id: string;
};
export type CreateBankDebitSetupForOrderMutationVariables = {
    input: CommerceCreateBankDebitSetupForOrderInput;
};
export type CreateBankDebitSetupForOrderMutationResponse = {
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
                readonly data: string | null;
                readonly type: string;
            };
        } | {
            /*This will never be '%other', but we need some
            value in case none of the concrete values match.*/
            readonly __typename: "%other";
        };
    } | null;
};
export type CreateBankDebitSetupForOrderMutation = {
    readonly response: CreateBankDebitSetupForOrderMutationResponse;
    readonly variables: CreateBankDebitSetupForOrderMutationVariables;
};



/*
mutation CreateBankDebitSetupForOrderMutation(
  $input: CommerceCreateBankDebitSetupForOrderInput!
) {
  commerceCreateBankDebitSetupForOrder(input: $input) {
    actionOrError {
      __typename
      ... on CommerceOrderRequiresAction {
        actionData {
          clientSecret
        }
      }
      ... on CommerceOrderWithMutationFailure {
        error {
          code
          data
          type
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
    "cacheID": "9cf855e663f6b932f59ad675bdfa6d22",
    "id": null,
    "metadata": {},
    "name": "CreateBankDebitSetupForOrderMutation",
    "operationKind": "mutation",
    "text": "mutation CreateBankDebitSetupForOrderMutation(\n  $input: CommerceCreateBankDebitSetupForOrderInput!\n) {\n  commerceCreateBankDebitSetupForOrder(input: $input) {\n    actionOrError {\n      __typename\n      ... on CommerceOrderRequiresAction {\n        actionData {\n          clientSecret\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          code\n          data\n          type\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '88eeaa4f917c312fb836ede4caa58b0f';
export default node;
