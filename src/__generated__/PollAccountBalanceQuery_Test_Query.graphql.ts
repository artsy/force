/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PollAccountBalanceQuery_Test_QueryVariables = {
    setupIntentId?: string | null | undefined;
    bankAccountId?: string | null | undefined;
};
export type PollAccountBalanceQuery_Test_QueryResponse = {
    readonly commerceBankAccountBalance: {
        readonly " $fragmentRefs": FragmentRefs<"PollAccountBalance_commerceBankAccountBalance">;
    } | null;
};
export type PollAccountBalanceQuery_Test_Query = {
    readonly response: PollAccountBalanceQuery_Test_QueryResponse;
    readonly variables: PollAccountBalanceQuery_Test_QueryVariables;
};



/*
query PollAccountBalanceQuery_Test_Query(
  $setupIntentId: ID
  $bankAccountId: ID
) {
  commerceBankAccountBalance(setupIntentId: $setupIntentId, bankAccountId: $bankAccountId) {
    ...PollAccountBalance_commerceBankAccountBalance
  }
}

fragment PollAccountBalance_commerceBankAccountBalance on CommerceBankAccountBalance {
  balanceCents
  currencyCode
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "bankAccountId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "setupIntentId"
},
v2 = [
  {
    "kind": "Variable",
    "name": "bankAccountId",
    "variableName": "bankAccountId"
  },
  {
    "kind": "Variable",
    "name": "setupIntentId",
    "variableName": "setupIntentId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "PollAccountBalanceQuery_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CommerceBankAccountBalance",
        "kind": "LinkedField",
        "name": "commerceBankAccountBalance",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PollAccountBalance_commerceBankAccountBalance"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "PollAccountBalanceQuery_Test_Query",
    "selections": [
      {
        "alias": null,
        "args": (v2/*: any*/),
        "concreteType": "CommerceBankAccountBalance",
        "kind": "LinkedField",
        "name": "commerceBankAccountBalance",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "balanceCents",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "currencyCode",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f9fe410dc58f3674ff56c85387bd69b3",
    "id": null,
    "metadata": {
      "relayTestingSelectionTypeInfo": {
        "commerceBankAccountBalance": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "CommerceBankAccountBalance"
        },
        "commerceBankAccountBalance.balanceCents": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "Int"
        },
        "commerceBankAccountBalance.currencyCode": {
          "enumValues": null,
          "nullable": true,
          "plural": false,
          "type": "String"
        }
      }
    },
    "name": "PollAccountBalanceQuery_Test_Query",
    "operationKind": "query",
    "text": "query PollAccountBalanceQuery_Test_Query(\n  $setupIntentId: ID\n  $bankAccountId: ID\n) {\n  commerceBankAccountBalance(setupIntentId: $setupIntentId, bankAccountId: $bankAccountId) {\n    ...PollAccountBalance_commerceBankAccountBalance\n  }\n}\n\nfragment PollAccountBalance_commerceBankAccountBalance on CommerceBankAccountBalance {\n  balanceCents\n  currencyCode\n}\n"
  }
};
})();
(node as any).hash = '565e6c4afc9eb9f61d6f0c05ae18dfe1';
export default node;
