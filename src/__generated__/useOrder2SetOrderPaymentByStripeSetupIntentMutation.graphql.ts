/**
 * @generated SignedSource<<a2bda646d51a1d68ece1c25a23dd17ee>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
export type setOrderPaymentByStripeSetupIntentInput = {
  clientMutationId?: string | null | undefined;
  id: string;
  oneTimeUse?: boolean | null | undefined;
  setupIntentId: string;
};
export type useOrder2SetOrderPaymentByStripeSetupIntentMutation$variables = {
  input: setOrderPaymentByStripeSetupIntentInput;
};
export type useOrder2SetOrderPaymentByStripeSetupIntentMutation$data = {
  readonly setOrderPaymentByStripeSetupIntent: {
    readonly orderOrError: {
      readonly __typename: "OrderMutationError";
      readonly mutationError: {
        readonly code: string;
        readonly message: string;
      };
    } | {
      readonly __typename: "OrderMutationSuccess";
      readonly order: {
        readonly id: string;
      };
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    } | null | undefined;
  } | null | undefined;
};
export type useOrder2SetOrderPaymentByStripeSetupIntentMutation = {
  response: useOrder2SetOrderPaymentByStripeSetupIntentMutation$data;
  variables: useOrder2SetOrderPaymentByStripeSetupIntentMutation$variables;
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
    "concreteType": "setOrderPaymentByStripeSetupIntentPayload",
    "kind": "LinkedField",
    "name": "setOrderPaymentByStripeSetupIntent",
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
                "concreteType": "Order",
                "kind": "LinkedField",
                "name": "order",
                "plural": false,
                "selections": [
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
          {
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
                    "name": "code",
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
            "type": "OrderMutationError",
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
    "name": "useOrder2SetOrderPaymentByStripeSetupIntentMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useOrder2SetOrderPaymentByStripeSetupIntentMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3b8010ce91f743b2c8419baeae2417e5",
    "id": null,
    "metadata": {},
    "name": "useOrder2SetOrderPaymentByStripeSetupIntentMutation",
    "operationKind": "mutation",
    "text": "mutation useOrder2SetOrderPaymentByStripeSetupIntentMutation(\n  $input: setOrderPaymentByStripeSetupIntentInput!\n) {\n  setOrderPaymentByStripeSetupIntent(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderMutationSuccess {\n        order {\n          id\n        }\n      }\n      ... on OrderMutationError {\n        mutationError {\n          code\n          message\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2b0d95ae41c490331db2272693ad79e0";

export default node;
