/**
 * @generated SignedSource<<fce06f2a6f6c1e84213a64042fd53efd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type AuctionInfoSidebar_sale$data = {
  readonly liveStartAt: string | null | undefined
  readonly " $fragmentType": "AuctionInfoSidebar_sale"
}
export type AuctionInfoSidebar_sale$key = {
  readonly " $data"?: AuctionInfoSidebar_sale$data
  readonly " $fragmentSpreads": FragmentRefs<"AuctionInfoSidebar_sale">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "AuctionInfoSidebar_sale",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "liveStartAt",
      storageKey: null,
    },
  ],
  type: "Sale",
  abstractKey: null,
}
;(node as any).hash = "9fc008c7640af944287dfaddc126d163"

export default node
