/**
 * @generated SignedSource<<c273ccf6af48ed5133d2ae5ac064484c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type PollAccountBalanceQuery$variables = {
  bankAccountId?: string | null | undefined
  setupIntentId?: string | null | undefined
}
export type PollAccountBalanceQuery$data = {
  readonly commerceBankAccountBalance:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"PollAccountBalance_commerceBankAccountBalance">
      }
    | null
    | undefined
}
export type PollAccountBalanceQuery = {
  response: PollAccountBalanceQuery$data
  variables: PollAccountBalanceQuery$variables
}

const node: ConcreteRequest = (function () {
  var v0 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "bankAccountId",
    },
    v1 = {
      defaultValue: null,
      kind: "LocalArgument",
      name: "setupIntentId",
    },
    v2 = [
      {
        kind: "Variable",
        name: "bankAccountId",
        variableName: "bankAccountId",
      },
      {
        kind: "Variable",
        name: "setupIntentId",
        variableName: "setupIntentId",
      },
    ]
  return {
    fragment: {
      argumentDefinitions: [v0 /*: any*/, v1 /*: any*/],
      kind: "Fragment",
      metadata: null,
      name: "PollAccountBalanceQuery",
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: "CommerceBankAccountBalance",
          kind: "LinkedField",
          name: "commerceBankAccountBalance",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "PollAccountBalance_commerceBankAccountBalance",
            },
          ],
          storageKey: null,
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [v1 /*: any*/, v0 /*: any*/],
      kind: "Operation",
      name: "PollAccountBalanceQuery",
      selections: [
        {
          alias: null,
          args: v2 /*: any*/,
          concreteType: "CommerceBankAccountBalance",
          kind: "LinkedField",
          name: "commerceBankAccountBalance",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "balanceCents",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "currencyCode",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "f7043ed6843b7da9f448a5954e791b08",
      id: null,
      metadata: {},
      name: "PollAccountBalanceQuery",
      operationKind: "query",
      text: "query PollAccountBalanceQuery(\n  $setupIntentId: ID\n  $bankAccountId: ID\n) {\n  commerceBankAccountBalance(setupIntentId: $setupIntentId, bankAccountId: $bankAccountId) {\n    ...PollAccountBalance_commerceBankAccountBalance\n  }\n}\n\nfragment PollAccountBalance_commerceBankAccountBalance on CommerceBankAccountBalance {\n  balanceCents\n  currencyCode\n}\n",
    },
  }
})()

;(node as any).hash = "b689bbfa9a6c58e6d8d5e10418240c6a"

export default node
