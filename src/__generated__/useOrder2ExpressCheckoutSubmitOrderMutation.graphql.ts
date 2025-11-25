/**
 * @generated SignedSource<<3534ee1464909f2021615da1616fd2b0>>
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
export type useOrder2ExpressCheckoutSubmitOrderMutation$variables = {
  input: submitOrderInput;
};
export type useOrder2ExpressCheckoutSubmitOrderMutation$data = {
  readonly submitOrder: {
    readonly orderOrError: {
      readonly __typename: "OrderMutationActionRequired";
      readonly actionData: {
        readonly clientSecret: string;
      };
    } | {
      readonly __typename: "OrderMutationError";
      readonly mutationError: {
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
export type useOrder2ExpressCheckoutSubmitOrderMutation = {
  response: useOrder2ExpressCheckoutSubmitOrderMutation$data;
  variables: useOrder2ExpressCheckoutSubmitOrderMutation$variables;
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
    "name": "useOrder2ExpressCheckoutSubmitOrderMutation",
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
    "name": "useOrder2ExpressCheckoutSubmitOrderMutation",
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
    "cacheID": "a344688a6bd3f2c70534d947fa1ffcd4",
    "id": null,
    "metadata": {},
    "name": "useOrder2ExpressCheckoutSubmitOrderMutation",
    "operationKind": "mutation",
    "text": "mutation useOrder2ExpressCheckoutSubmitOrderMutation(\n  $input: submitOrderInput!\n) {\n  submitOrder(input: $input) {\n    orderOrError {\n      __typename\n      ... on OrderMutationSuccess {\n        order {\n          internalID\n          id\n        }\n      }\n      ... on OrderMutationError {\n        mutationError {\n          message\n        }\n      }\n      ... on OrderMutationActionRequired {\n        actionData {\n          clientSecret\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "c8eec210a37ec2fa5c7b93590e49b68c";

export default node;
