/**
 * @generated SignedSource<<e2ae240f2beee20767029321eaba0e96>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type InvoicePaymentRoute_invoice$data = {
  readonly internalID: string
  readonly remaining: string | null | undefined
  readonly remainingMinor: number
  readonly " $fragmentType": "InvoicePaymentRoute_invoice"
}
export type InvoicePaymentRoute_invoice$key = {
  readonly " $data"?: InvoicePaymentRoute_invoice$data
  readonly " $fragmentSpreads": FragmentRefs<"InvoicePaymentRoute_invoice">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "InvoicePaymentRoute_invoice",
  selections: [
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
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "internalID",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "remainingMinor",
      storageKey: null,
    },
  ],
  type: "Invoice",
  abstractKey: null,
}

;(node as any).hash = "dd89c4ffd0c09a71a3e0c18d5128d57c"

export default node
