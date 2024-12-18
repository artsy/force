/**
 * @generated SignedSource<<3d4bdcc23e16d2b32274a64fdcbd6482>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type EndingSoonAuctions_viewer$data = {
  readonly " $fragmentSpreads": FragmentRefs<"EndingSoonAuctionsGrid_viewer">
  readonly " $fragmentType": "EndingSoonAuctions_viewer"
}
export type EndingSoonAuctions_viewer$key = {
  readonly " $data"?: EndingSoonAuctions_viewer$data
  readonly " $fragmentSpreads": FragmentRefs<"EndingSoonAuctions_viewer">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "EndingSoonAuctions_viewer",
  selections: [
    {
      args: null,
      kind: "FragmentSpread",
      name: "EndingSoonAuctionsGrid_viewer",
    },
  ],
  type: "Viewer",
  abstractKey: null,
}
;(node as any).hash = "b0531722577445b9bec32d24fb7d49c7"

export default node
