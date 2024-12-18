/**
 * @generated SignedSource<<b53e6de99008069f219946cb809b7a31>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type SubmittedOrderModal_Test_Query$variables = Record<
  PropertyKey,
  never
>
export type SubmittedOrderModal_Test_Query$data = {
  readonly submittedOrder:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"SubmittedOrderModal_submittedOrder">
      }
    | null
    | undefined
}
export type SubmittedOrderModal_Test_Query = {
  response: SubmittedOrderModal_Test_Query$data
  variables: SubmittedOrderModal_Test_Query$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: "Literal",
        name: "id",
        value: "some-id",
      },
    ],
    v1 = {
      enumValues: null,
      nullable: false,
      plural: false,
      type: "String",
    },
    v2 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: "String",
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "SubmittedOrderModal_Test_Query",
      selections: [
        {
          alias: "submittedOrder",
          args: v0 /*: any*/,
          concreteType: null,
          kind: "LinkedField",
          name: "commerceOrder",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "SubmittedOrderModal_submittedOrder",
            },
          ],
          storageKey: 'commerceOrder(id:"some-id")',
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "SubmittedOrderModal_Test_Query",
      selections: [
        {
          alias: "submittedOrder",
          args: v0 /*: any*/,
          concreteType: null,
          kind: "LinkedField",
          name: "commerceOrder",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "__typename",
              storageKey: null,
            },
            {
              kind: "TypeDiscriminator",
              abstractKey: "__isCommerceOrder",
            },
            {
              alias: null,
              args: [
                {
                  kind: "Literal",
                  name: "format",
                  value: "MMM D",
                },
              ],
              kind: "ScalarField",
              name: "stateExpiresAt",
              storageKey: 'stateExpiresAt(format:"MMM D")',
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "impulseConversationId",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "id",
              storageKey: null,
            },
          ],
          storageKey: 'commerceOrder(id:"some-id")',
        },
      ],
    },
    params: {
      cacheID: "9a7919e0cfb8f61f5c6c01819f85cd26",
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          submittedOrder: {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "CommerceOrder",
          },
          "submittedOrder.__isCommerceOrder": v1 /*: any*/,
          "submittedOrder.__typename": v1 /*: any*/,
          "submittedOrder.id": {
            enumValues: null,
            nullable: false,
            plural: false,
            type: "ID",
          },
          "submittedOrder.impulseConversationId": v2 /*: any*/,
          "submittedOrder.stateExpiresAt": v2 /*: any*/,
        },
      },
      name: "SubmittedOrderModal_Test_Query",
      operationKind: "query",
      text: 'query SubmittedOrderModal_Test_Query {\n  submittedOrder: commerceOrder(id: "some-id") {\n    __typename\n    ...SubmittedOrderModal_submittedOrder\n    id\n  }\n}\n\nfragment SubmittedOrderModal_submittedOrder on CommerceOrder {\n  __isCommerceOrder: __typename\n  stateExpiresAt(format: "MMM D")\n  impulseConversationId\n}\n',
    },
  }
})()
;(node as any).hash = "d5c449c2cd5863767bb3df9ed201d46b"

export default node
