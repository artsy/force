/**
 * @generated SignedSource<<158d826fb0eb17f09b35a38fa098b37f>>
 * @relayHash 9cf855e663f6b932f59ad675bdfa6d22
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

// @relayRequestID 9cf855e663f6b932f59ad675bdfa6d22

import { ConcreteRequest, Mutation } from 'relay-runtime';
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
    "id": "9cf855e663f6b932f59ad675bdfa6d22",
    "metadata": {},
    "name": "CreateBankDebitSetupForOrderMutation",
    "operationKind": "mutation",
    "text": null
  }
};
})();

(node as any).hash = "88eeaa4f917c312fb836ede4caa58b0f";

export default node;
