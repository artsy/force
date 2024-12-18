/**
 * @generated SignedSource<<160d8d88a2f6213fbf04d2b33da98d74>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type FairTiming_fair$data = {
  readonly endAt: string | null | undefined
  readonly exhibitionPeriod: string | null | undefined
  readonly startAt: string | null | undefined
  readonly " $fragmentType": "FairTiming_fair"
}
export type FairTiming_fair$key = {
  readonly " $data"?: FairTiming_fair$data
  readonly " $fragmentSpreads": FragmentRefs<"FairTiming_fair">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "FairTiming_fair",
  selections: [
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "exhibitionPeriod",
      storageKey: null,
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "startAt",
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
  type: "Fair",
  abstractKey: null,
}
;(node as any).hash = "69ccf3ea7b14916f83f88714796d542f"

export default node
