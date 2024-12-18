/**
 * @generated SignedSource<<30aba058184e5804e5c95973527fd6b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type PollAccountBalance_commerceBankAccountBalance$data = {
  readonly balanceCents: number | null | undefined
  readonly currencyCode: string | null | undefined
  readonly " $fragmentType": "PollAccountBalance_commerceBankAccountBalance"
}
export type PollAccountBalance_commerceBankAccountBalance$key = {
  readonly " $data"?: PollAccountBalance_commerceBankAccountBalance$data
  readonly " $fragmentSpreads": FragmentRefs<"PollAccountBalance_commerceBankAccountBalance">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "PollAccountBalance_commerceBankAccountBalance",
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
  type: "CommerceBankAccountBalance",
  abstractKey: null,
}
;(node as any).hash = "b7a2606227ff11331e639422e5981bce"

export default node
