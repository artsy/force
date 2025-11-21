/**
 * @generated SignedSource<<2c9287f88f6e0fb0f0e2b39ce840564c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Order2PollBankAccountBalanceQuery$variables = {
  id: string;
};
export type Order2PollBankAccountBalanceQuery$data = {
  readonly me: {
    readonly order: {
      readonly __typename: "Order";
      readonly " $fragmentSpreads": FragmentRefs<"Order2PollBankAccountBalance_order">;
    } | null | undefined;
  } | null | undefined;
};
export type Order2PollBankAccountBalanceQuery = {
  response: Order2PollBankAccountBalanceQuery$data;
  variables: Order2PollBankAccountBalanceQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "Order2PollBankAccountBalanceQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "Order2PollBankAccountBalance_order"
              }
            ],
            "storageKey": null
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "Order2PollBankAccountBalanceQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "Order",
            "kind": "LinkedField",
            "name": "order",
            "plural": false,
            "selections": [
              (v2/*: any*/),
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
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          (v3/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ad334c7058d91e62052364cf351ffd4c",
    "id": null,
    "metadata": {},
    "name": "Order2PollBankAccountBalanceQuery",
    "operationKind": "query",
    "text": "query Order2PollBankAccountBalanceQuery(\n  $id: ID!\n) {\n  me {\n    order(id: $id) {\n      __typename\n      ...Order2PollBankAccountBalance_order\n      id\n    }\n    id\n  }\n}\n\nfragment Order2PollBankAccountBalance_order on Order {\n  internalID\n  bankAccountBalanceCheck {\n    result\n    message\n  }\n}\n"
  }
};
})();

(node as any).hash = "de552bbd376484260e147141a8eb7e9a";

export default node;
