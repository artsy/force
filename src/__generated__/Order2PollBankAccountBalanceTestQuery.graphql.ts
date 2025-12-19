/**
 * @generated SignedSource<<d6a9a78f6cbf9f2e3f01c7f0d56dc813>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2PollBankAccountBalanceTestQuery$variables = Record<PropertyKey, never>;
export type Order2PollBankAccountBalanceTestQuery$data = {
  readonly me: {
    readonly order: {
      readonly " $fragmentSpreads": FragmentRefs<"Order2PollBankAccountBalance_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2PollBankAccountBalanceTestQuery = {
  response: Order2PollBankAccountBalanceTestQuery$data;
  variables: Order2PollBankAccountBalanceTestQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "id",
    "value": "order-123"
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2PollBankAccountBalanceTestQuery",
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
                "name": "Order2PollBankAccountBalance_order"
              }
            ],
            "storageKey": "order(id:\"order-123\")"
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
    "name": "Order2PollBankAccountBalanceTestQuery",
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
                "name": "internalID",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "BankAccountBalanceCheck",
                "kind": "LinkedField",
                "name": "bankAccountBalanceCheck",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "result",
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
              },
              (v1/*: any*/)
            ],
            "storageKey": "order(id:\"order-123\")"
          },
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "89cacdda135541f1dbd48883c3bbdd8e",
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
        "me.order.bankAccountBalanceCheck": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "BankAccountBalanceCheck"
        },
        "me.order.bankAccountBalanceCheck.message": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        },
        "me.order.bankAccountBalanceCheck.result": {
          "enumValues": [
            "INSUFFICIENT",
            "INVALID",
            "NOT_SUPPORTED",
            "PENDING",
            "SUFFICIENT"
          ],
          "nullable": false,
          "plural": false,
          "type": "BankAccountBalanceCheckResult"
        },
        "me.order.id": (v2/*: any*/),
        "me.order.internalID": (v2/*: any*/)
      }
    },
    "name": "Order2PollBankAccountBalanceTestQuery",
    "operationKind": "query",
    "text": "query Order2PollBankAccountBalanceTestQuery {\n  me {\n    order(id: \"order-123\") {\n      ...Order2PollBankAccountBalance_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2PollBankAccountBalance_order on Order {\n  internalID\n  bankAccountBalanceCheck {\n    result\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "415c94d26cd50b311123852dfb0e886d";

export default node;
