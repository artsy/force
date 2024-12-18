/**
 * @generated SignedSource<<a8f84551dd24f0509dd7434c70d6a448>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type AuctionTimer_sale$data = {
  readonly endAt: string | null | undefined
  readonly liveStartAt: string | null | undefined
  readonly " $fragmentType": "AuctionTimer_sale"
}
export type AuctionTimer_sale$key = {
  readonly " $data"?: AuctionTimer_sale$data
  readonly " $fragmentSpreads": FragmentRefs<"AuctionTimer_sale">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "AuctionTimer_sale",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "liveStartAt",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "endAt",
      storageKey: null,
    },
  ],
  type: "Sale",
  abstractKey: null,
}
;(node as any).hash = "3adac1d5d9ff59e38723ddec36f0ab3c"

export default node
