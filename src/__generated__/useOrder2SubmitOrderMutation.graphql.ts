/**
 * @generated SignedSource<<4263a51de7a6c6d86d159591a3fa4fca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type submitOrderInput = {
  clientMutationId?: string | null | undefined;
  confirmationToken?: string | null | undefined;
  confirmedSetupIntentId?: string | null | undefined;
  id: string;
  offerID?: string | null | undefined;
  oneTimeUse?: boolean | null | undefined;
};
export type useOrder2SubmitOrderMutation$variables = {
  input: submitOrderInput;
};
export type useOrder2SubmitOrderMutation$data = {
  readonly submitOrder: {
    readonly orderOrError: {
      readonly __typename: "OrderMutationActionRequired";
      readonly actionData: {
        readonly clientSecret: string;
      };
    } | {
      readonly __typename: "OrderMutationError";
      readonly mutationError: {
        readonly code: string;
        readonly message: string;
      };
    } | {
      readonly __typename: "OrderMutationSuccess";
      readonly order: {
        readonly internalID: string;
      };
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined;
};
export type useOrder2SubmitOrderMutation = {
  response: useOrder2SubmitOrderMutation$data;
  variables: useOrder2SubmitOrderMutation$variables;
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
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v4 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ExchangeError",
      "kind": "LinkedField",
      "name": "mutationError",
      "plural": false,
      "selections": [
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
          "name": "code",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OrderMutationError",
  "abstractKey": null
},
v5 = {
  "kind": "InlineFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "OrderActionData",
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
  "type": "OrderMutationActionRequired",
  "abstractKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useOrder2SubmitOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "submitOrderPayload",
        "kind": "LinkedField",
        "name": "submitOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Order",
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "type": "OrderMutationSuccess",
                "abstractKey": null
              },
              (v4/*: any*/),
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
    "name": "useOrder2SubmitOrderMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "submitOrderPayload",
        "kind": "LinkedField",
        "name": "submitOrder",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "orderOrError",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Order",
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
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
                "type": "OrderMutationSuccess",
                "abstractKey": null
              },
              (v4/*: any*/),
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
    "cacheID": "2987a4d262234cdc269f9a101164c08f",
    "id": null,
    "metadata": {},
    "name": "useOrder2SubmitOrderMutation",
    "operationKind": "mutation",
    "text": "mutation useOrder2SubmitOrderMutation(\n  $input: submitOrderInput!\n) {\n  submitOrder(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderMutationSuccess {\n        order {\n          internalID\n          id\n        }\n      }\n      ... on OrderMutationError {\n        mutationError {\n          message\n          code\n        }\n      }\n      ... on OrderMutationActionRequired {\n        actionData {\n          clientSecret\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "b455e1f0b80d05a98df3dfd13f10e73d";

export default node;
