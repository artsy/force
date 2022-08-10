/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CommerceSetPaymentByStripeIntentInput = {
    clientMutationId?: string | null | undefined;
    id: string;
    oneTimeUse?: boolean | null | undefined;
    setupIntentId: string;
};
export type SetPaymentByStripeIntentMutationVariables = {
    input: CommerceSetPaymentByStripeIntentInput;
};
export type SetPaymentByStripeIntentMutationResponse = {
    readonly commerceSetPaymentByStripeIntent: {
        readonly orderOrError: {
            readonly order?: {
                readonly id: string;
                readonly " $fragmentRefs": FragmentRefs<"Payment_validation">;
            } | undefined;
            readonly error?: {
                readonly type: string;
                readonly code: string;
                readonly data: string | null;
            } | undefined;
        };
    } | null;
};
export type SetPaymentByStripeIntentMutation = {
    readonly response: SetPaymentByStripeIntentMutationResponse;
    readonly variables: SetPaymentByStripeIntentMutationVariables;
};



/*
mutation SetPaymentByStripeIntentMutation(
  $input: CommerceSetPaymentByStripeIntentInput!
) {
  commerceSetPaymentByStripeIntent(input: $input) {
    orderOrError {
      __typename
      ... on CommerceOrderWithMutationSuccess {
        order {
          __typename
          id
          ...Payment_validation
        }
      }
      ... on CommerceOrderWithMutationFailure {
        error {
          type
          code
          data
        }
      }
    }
  }
}

fragment Payment_validation on CommerceOrder {
  __isCommerceOrder: __typename
  paymentMethod
  paymentMethodDetails {
    __typename
    ... on CreditCard {
      id
    }
    ... on BankAccount {
      id
    }
    ... on WireTransfer {
      isManualPayment
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
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
          "name": "type",
          "storageKey": null
        },
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CommerceOrderWithMutationFailure",
  "abstractKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = [
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SetPaymentByStripeIntentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceSetPaymentByStripeIntentPayload",
        "kind": "LinkedField",
        "name": "commerceSetPaymentByStripeIntent",
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
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "Payment_validation"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              },
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
    "name": "SetPaymentByStripeIntentMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CommerceSetPaymentByStripeIntentPayload",
        "kind": "LinkedField",
        "name": "commerceSetPaymentByStripeIntent",
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
              (v4/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "order",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v2/*: any*/),
                      {
                        "kind": "TypeDiscriminator",
                        "abstractKey": "__isCommerceOrder"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "paymentMethod",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "paymentMethodDetails",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": (v5/*: any*/),
                            "type": "CreditCard",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v5/*: any*/),
                            "type": "BankAccount",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "isManualPayment",
                                "storageKey": null
                              }
                            ],
                            "type": "WireTransfer",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "type": "CommerceOrderWithMutationSuccess",
                "abstractKey": null
              },
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
    "cacheID": "732929de11c49021a9846ce6bfbc78c0",
    "id": null,
    "metadata": {},
    "name": "SetPaymentByStripeIntentMutation",
    "operationKind": "mutation",
    "text": "mutation SetPaymentByStripeIntentMutation(\n  $input: CommerceSetPaymentByStripeIntentInput!\n) {\n  commerceSetPaymentByStripeIntent(input: $input) {\n    orderOrError {\n      __typename\n      ... on CommerceOrderWithMutationSuccess {\n        order {\n          __typename\n          id\n          ...Payment_validation\n        }\n      }\n      ... on CommerceOrderWithMutationFailure {\n        error {\n          type\n          code\n          data\n        }\n      }\n    }\n  }\n}\n\nfragment Payment_validation on CommerceOrder {\n  __isCommerceOrder: __typename\n  paymentMethod\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      id\n    }\n    ... on BankAccount {\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '92e6a53b686286d4982e80ef02da3621';
export default node;
