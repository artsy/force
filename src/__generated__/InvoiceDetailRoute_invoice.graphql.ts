/**
 * @generated SignedSource<<cbe775f8a0f6b31e5c1982ee82bf3732>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
export type InvoiceState =
  | "CANCELED"
  | "DRAFT"
  | "PAID"
  | "READY"
  | "%future added value"
import { FragmentRefs } from "relay-runtime"
export type InvoiceDetailRoute_invoice$data = {
  readonly email: string | null | undefined
  readonly externalNote: string | null | undefined
  readonly name: string | null | undefined
  readonly payments: ReadonlyArray<{
    readonly successful: boolean
  }>
  readonly remaining: string | null | undefined
  readonly state: InvoiceState
  readonly " $fragmentSpreads": FragmentRefs<
    "InvoiceLineItems_invoice" | "InvoicePayments_invoice"
  >
  readonly " $fragmentType": "InvoiceDetailRoute_invoice"
}
export type InvoiceDetailRoute_invoice$key = {
  readonly " $data"?: InvoiceDetailRoute_invoice$data
  readonly " $fragmentSpreads": FragmentRefs<"InvoiceDetailRoute_invoice">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "InvoiceDetailRoute_invoice",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "name",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "email",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "state",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      concreteType: "InvoicePayment",
      kind: "LinkedField",
      name: "payments",
      plural: true,
      selections: [
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "successful",
          storageKey: null,
        },
      ],
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "externalNote",
      storageKey: null,
    },
    {
      alias: null,
      args: [
        {
          kind: "Literal",
          name: "precision",
          value: 2,
        },
      ],
      kind: "ScalarField",
      name: "remaining",
      storageKey: "remaining(precision:2)",
    },
    {
      args: null,
      kind: "FragmentSpread",
      name: "InvoiceLineItems_invoice",
    },
    {
      args: null,
      kind: "FragmentSpread",
      name: "InvoicePayments_invoice",
    },
  ],
  type: "Invoice",
  abstractKey: null,
}

;(node as any).hash = "213d0a23e701bdfdd8ef4ffb3293313d"

export default node
