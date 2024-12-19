/**
 * @generated SignedSource<<e417b4d4275b7064010959b75e8ad1fb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type CascadingEndTimesBanner_Test_Query$variables = Record<
  PropertyKey,
  never
>
export type CascadingEndTimesBanner_Test_Query$data = {
  readonly sale:
    | {
        readonly " $fragmentSpreads": FragmentRefs<"CascadingEndTimesBanner_sale">
      }
    | null
    | undefined
}
export type CascadingEndTimesBanner_Test_Query = {
  response: CascadingEndTimesBanner_Test_Query$data
  variables: CascadingEndTimesBanner_Test_Query$variables
}

const node: ConcreteRequest = (function () {
  var v0 = [
      {
        kind: "Literal",
        name: "id",
        value: "example",
      },
    ],
    v1 = {
      enumValues: null,
      nullable: true,
      plural: false,
      type: "Int",
    }
  return {
    fragment: {
      argumentDefinitions: [],
      kind: "Fragment",
      metadata: null,
      name: "CascadingEndTimesBanner_Test_Query",
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
          concreteType: "Sale",
          kind: "LinkedField",
          name: "sale",
          plural: false,
          selections: [
            {
              args: null,
              kind: "FragmentSpread",
              name: "CascadingEndTimesBanner_sale",
            },
          ],
          storageKey: 'sale(id:"example")',
        },
      ],
      type: "Query",
      abstractKey: null,
    },
    kind: "Request",
    operation: {
      argumentDefinitions: [],
      kind: "Operation",
      name: "CascadingEndTimesBanner_Test_Query",
      selections: [
        {
          alias: null,
          args: v0 /*: any*/,
          concreteType: "Sale",
          kind: "LinkedField",
          name: "sale",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "isClosed",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "cascadingEndTimeIntervalMinutes",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "extendedBiddingIntervalMinutes",
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
          storageKey: 'sale(id:"example")',
        },
      ],
    },
    params: {
      cacheID: "ac4e8ea83b1919f377d03b343775254f",
      id: null,
      metadata: {
        relayTestingSelectionTypeInfo: {
          sale: {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "Sale",
          },
          "sale.cascadingEndTimeIntervalMinutes": v1 /*: any*/,
          "sale.extendedBiddingIntervalMinutes": v1 /*: any*/,
          "sale.id": {
            enumValues: null,
            nullable: false,
            plural: false,
            type: "ID",
          },
          "sale.isClosed": {
            enumValues: null,
            nullable: true,
            plural: false,
            type: "Boolean",
          },
        },
      },
      name: "CascadingEndTimesBanner_Test_Query",
      operationKind: "query",
      text: 'query CascadingEndTimesBanner_Test_Query {\n  sale(id: "example") {\n    ...CascadingEndTimesBanner_sale\n    id\n  }\n}\n\nfragment CascadingEndTimesBanner_sale on Sale {\n  isClosed\n  cascadingEndTimeIntervalMinutes\n  extendedBiddingIntervalMinutes\n}\n',
    },
  }
})()

;(node as any).hash = "b360f718b6b9e0a8aa5cff8fed562039"

export default node
