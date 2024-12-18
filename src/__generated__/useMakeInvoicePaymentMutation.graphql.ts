/**
 * @generated SignedSource<<71d85db2fea55168b689c58459fd5408>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
export type CreateInvoicePaymentInput = {
  amountMinor: number
  clientMutationId?: string | null | undefined
  creditCardToken: string
  invoiceID: string
  invoiceToken: string
  provider: string
}
export type useMakeInvoicePaymentMutation$variables = {
  input: CreateInvoicePaymentInput
}
export type useMakeInvoicePaymentMutation$data = {
  readonly createInvoicePayment:
    | {
        readonly __typename: "CreateInvoicePaymentPayload"
        readonly responseOrError:
          | {
              readonly mutationError?:
                | {
                    readonly message: string
                  }
                | null
                | undefined
            }
          | null
          | undefined
      }
    | null
    | undefined
}
export type useMakeInvoicePaymentMutation = {
  response: useMakeInvoicePaymentMutation$data
  variables: useMakeInvoicePaymentMutation$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        defaultValue: null,
        kind: "LocalArgument",
        name: "input",
      },
    ],
    v1 = [
      {
        kind: "Variable",
        name: "input",
        variableName: "input",
      },
    ],
    v2 = {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "__typename",
      storageKey: null,
    },
    v3 = {
      kind: "InlineFragment",
      selections: [
        {
          alias: null,
          args: null,
          concreteType: "GravityMutationError",
          kind: "LinkedField",
          name: "mutationError",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "message",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      type: "CreateInvoicePaymentFailure",
      abstractKey: null,
    }
  return {
    fragment: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Fragment",
      metadata: null,
      name: "useMakeInvoicePaymentMutation",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "CreateInvoicePaymentPayload",
          kind: "LinkedField",
          name: "createInvoicePayment",
          plural: false,
          selections: [
            v2 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: null,
              kind: "LinkedField",
              name: "responseOrError",
              plural: false,
              selections: [v3 /*: any*/],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      type: "Mutation",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: v0 /*: any*/,
      kind: "Operation",
      name: "useMakeInvoicePaymentMutation",
      selections: [
        {
          alias: null,
          args: v1 /*: any*/,
          concreteType: "CreateInvoicePaymentPayload",
          kind: "LinkedField",
          name: "createInvoicePayment",
          plural: false,
          selections: [
            v2 /*: any*/,
            {
              alias: null,
              args: null,
              concreteType: null,
              kind: "LinkedField",
              name: "responseOrError",
              plural: false,
              selections: [v2 /*: any*/, v3 /*: any*/],
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
    },
    params: {
      cacheID: "76aec82acae55653903cd0d5d009bc36",
      id: null,
      metadata: {},
      name: "useMakeInvoicePaymentMutation",
      operationKind: "mutation",
      text: "mutation useMakeInvoicePaymentMutation(\n  $input: CreateInvoicePaymentInput!\n) {\n  createInvoicePayment(input: $input) {\n    __typename\n    responseOrError {\n      __typename\n      ... on CreateInvoicePaymentFailure {\n        mutationError {\n          message\n        }\n      }\n    }\n  }\n}\n",
    },
  }
})()
;(node as any).hash = "eb46640c0326ab58cf0482b6b1821af5"

export default node
