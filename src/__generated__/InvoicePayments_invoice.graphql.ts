/**
 * @generated SignedSource<<8d76aae1d708cf83a5f80e254c3f036c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type InvoicePayments_invoice$data = {
  readonly payments: ReadonlyArray<{
    readonly amount: string | null | undefined
    readonly createdAt: string | null | undefined
    readonly creditCard:
      | {
          readonly brand: string
          readonly lastDigits: string
        }
      | null
      | undefined
    readonly id: string
    readonly successful: boolean
  }>
  readonly " $fragmentType": "InvoicePayments_invoice"
}
export type InvoicePayments_invoice$key = {
  readonly " $data"?: InvoicePayments_invoice$data
  readonly " $fragmentSpreads": FragmentRefs<"InvoicePayments_invoice">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "InvoicePayments_invoice",
  selections: [
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
          name: "id",
          storageKey: null,
        },
        {
          alias: null,
          args: null,
          kind: "ScalarField",
          name: "successful",
          storageKey: null,
        },
        {
          alias: null,
          args: [
            {
              kind: "Literal",
              name: "format",
              value: "MMM D, YYYY",
            },
          ],
          kind: "ScalarField",
          name: "createdAt",
          storageKey: 'createdAt(format:"MMM D, YYYY")',
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
          name: "amount",
          storageKey: "amount(precision:2)",
        },
        {
          alias: null,
          args: null,
          concreteType: "CreditCard",
          kind: "LinkedField",
          name: "creditCard",
          plural: false,
          selections: [
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "brand",
              storageKey: null,
            },
            {
              alias: null,
              args: null,
              kind: "ScalarField",
              name: "lastDigits",
              storageKey: null,
            },
          ],
          storageKey: null,
        },
      ],
      storageKey: null,
    },
  ],
  type: "Invoice",
  abstractKey: null,
}

;(node as any).hash = "93f07c74b980a580fdba33d0bd598938"

export default node
