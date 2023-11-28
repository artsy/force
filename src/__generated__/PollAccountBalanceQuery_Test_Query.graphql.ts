/**
 * @generated SignedSource<<ddc60503d11f45fcc2d3d20ef3d93c9a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PollAccountBalanceQuery_Test_Query$variables = {
  setupIntentId: string;
};
export type PollAccountBalanceQuery_Test_Query$data = {
  readonly commerceBankAccountBalance: {
    readonly " $fragmentSpreads": FragmentRefs<"PollAccountBalance_commerceBankAccountBalance">;
  } | null | undefined;
};
export type PollAccountBalanceQuery_Test_Query = {
  response: PollAccountBalanceQuery_Test_Query$data;
  variables: PollAccountBalanceQuery_Test_Query$variables;
};

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
    "name": "PollAccountBalanceQuery_Test_Query",
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
    "name": "PollAccountBalanceQuery_Test_Query",
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
    "cacheID": "7cac8ecb788abbcd2bfed9e1c3a218a8",
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
    "text": "query PollAccountBalanceQuery_Test_Query(\n  $setupIntentId: ID!\n) {\n  commerceBankAccountBalance(setupIntentId: $setupIntentId) {\n    ...PollAccountBalance_commerceBankAccountBalance\n  }\n}\n\nfragment PollAccountBalance_commerceBankAccountBalance on CommerceBankAccountBalance {\n  balanceCents\n  currencyCode\n}\n"
  }
};
})();

(node as any).hash = "2c71e61a47a26210dfa5e439253a64de";

export default node;
