/**
 * @generated SignedSource<<0ce6f2c67876103c2cfc4964316ffe41>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OrderDetailsPaymentInfo_TestQuery$variables = Record<PropertyKey, never>;
export type OrderDetailsPaymentInfo_TestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"OrderDetailsPaymentInfo_order">;
    } | null | undefined;
  } | null | undefined;
};
export type OrderDetailsPaymentInfo_TestQuery = {
  response: OrderDetailsPaymentInfo_TestQuery$data;
  variables: OrderDetailsPaymentInfo_TestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "order-id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "ID"
},
v3 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "String"
},
v4 = {
  "enumValues": null,
  "nullable": false,
  "plural": false,
  "type": "Int"
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "OrderDetailsPaymentInfo_TestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "OrderDetailsPaymentInfo_order"
              }
            ],
            "storageKey": "order(id:\"order-id\")"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "OrderDetailsPaymentInfo_TestQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Me",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v0/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "creditCardWalletType",
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
                        "kind": "ScalarField",
                        "name": "brand",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "lastDigits",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expirationYear",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expirationMonth",
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "type": "CreditCard",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "last4",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "bankName",
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
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
              },
              (v1/*: any*/)
            ],
            "storageKey": "order(id:\"order-id\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "dfa79a8a651d1593835ac1d07130b7ba",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "me": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Me"
        },
        "me.id": (v2/*: any*/),
        "me.order": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Order"
        },
        "me.order.creditCardWalletType": {
          "enumValues": [
            "APPLE_PAY",
            "GOOGLE_PAY"
          ],
          "nullable": true,
          "plural": false,
          "type": "OrderCreditCardWalletTypeEnum"
        },
        "me.order.id": (v2/*: any*/),
        "me.order.paymentMethodDetails": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "PaymentMethodUnion"
        },
        "me.order.paymentMethodDetails.__typename": (v3/*: any*/),
        "me.order.paymentMethodDetails.bankName": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "me.order.paymentMethodDetails.brand": (v3/*: any*/),
        "me.order.paymentMethodDetails.expirationMonth": (v4/*: any*/),
        "me.order.paymentMethodDetails.expirationYear": (v4/*: any*/),
        "me.order.paymentMethodDetails.id": (v2/*: any*/),
        "me.order.paymentMethodDetails.isManualPayment": {
          "enumValues": null,
          "nullable": false,
          "plural": false,
          "type": "Boolean"
        },
        "me.order.paymentMethodDetails.last4": (v3/*: any*/),
        "me.order.paymentMethodDetails.lastDigits": (v3/*: any*/)
      }
    },
    "name": "OrderDetailsPaymentInfo_TestQuery",
    "operationKind": "query",
    "text": "query OrderDetailsPaymentInfo_TestQuery {\n  me {\n    order(id: \"order-id\") {\n      ...OrderDetailsPaymentInfo_order\n      id\n    }\n    id\n  }\n}\n\nfragment OrderDetailsPaymentInfo_order on Order {\n  creditCardWalletType\n  paymentMethodDetails {\n    __typename\n    ... on CreditCard {\n      brand\n      lastDigits\n      expirationYear\n      expirationMonth\n      id\n    }\n    ... on BankAccount {\n      last4\n      bankName\n      id\n    }\n    ... on WireTransfer {\n      isManualPayment\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "831169a7ece562f7a3b6c35c898f81a5";

export default node;
