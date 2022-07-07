/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type PollAccountBalanceQueryVariables = {
    setupIntentId: string;
};
export type PollAccountBalanceQueryResponse = {
    readonly commerceBankAccountBalance: {
        readonly " $fragmentRefs": FragmentRefs<"PollAccountBalance_commerceBankAccountBalance">;
    } | null;
};
export type PollAccountBalanceQuery = {
    readonly response: PollAccountBalanceQueryResponse;
    readonly variables: PollAccountBalanceQueryVariables;
};



/*
query PollAccountBalanceQuery(
  $setupIntentId: ID!
) {
  commerceBankAccountBalance(setupIntentId: $setupIntentId) {
    ...PollAccountBalance_commerceBankAccountBalance
  }
}

fragment PollAccountBalance_commerceBankAccountBalance on CommerceBankAccountBalance {
  balanceCents
  currencyCode
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "setupIntentId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "setupIntentId",
    "variableName": "setupIntentId"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PollAccountBalanceQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PollAccountBalanceQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
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
    "cacheID": "f9e1152debf7dc348f02db8b30fcd4c9",
    "id": null,
    "metadata": {},
    "name": "PollAccountBalanceQuery",
    "operationKind": "query",
    "text": "query PollAccountBalanceQuery(\n  $setupIntentId: ID!\n) {\n  commerceBankAccountBalance(setupIntentId: $setupIntentId) {\n    ...PollAccountBalance_commerceBankAccountBalance\n  }\n}\n\nfragment PollAccountBalance_commerceBankAccountBalance on CommerceBankAccountBalance {\n  balanceCents\n  currencyCode\n}\n"
  }
};
})();
(node as any).hash = '982bcadd9eaffde3452567a024dee280';
export default node;
