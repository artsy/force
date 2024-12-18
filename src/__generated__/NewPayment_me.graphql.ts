/**
 * @generated SignedSource<<5e6effd3a28d203abbcc72805fe0bb75>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type NewPayment_me$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CreditCardPicker_me">
  readonly " $fragmentType": "NewPayment_me"
}
export type NewPayment_me$key = {
  readonly " $data"?: NewPayment_me$data
  readonly " $fragmentSpreads": FragmentRefs<"NewPayment_me">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "NewPayment_me",
  selections: [
    {
      args: null,
      kind: "FragmentSpread",
      name: "CreditCardPicker_me",
    },
  ],
  type: "Me",
  abstractKey: null,
}
;(node as any).hash = "aa880df7bf9ad52ce276076df1c03ecd"

export default node
