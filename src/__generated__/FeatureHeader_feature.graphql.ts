/**
 * @generated SignedSource<<9d4073fea643e6f8d5c6382fbe208343>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
export type FeatureLayouts = "DEFAULT" | "FULL" | "%future added value"
import { FragmentRefs } from "relay-runtime"
export type FeatureHeader_feature$data = {
  readonly layout: FeatureLayouts
  readonly " $fragmentSpreads": FragmentRefs<
    "FeatureHeaderDefault_feature" | "FeatureHeaderFull_feature"
  >
  readonly " $fragmentType": "FeatureHeader_feature"
}
export type FeatureHeader_feature$key = {
  readonly " $data"?: FeatureHeader_feature$data
  readonly " $fragmentSpreads": FragmentRefs<"FeatureHeader_feature">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "FeatureHeader_feature",
  selections: [
    {
      args: null,
      kind: "FragmentSpread",
      name: "FeatureHeaderDefault_feature",
    },
    {
      args: null,
      kind: "FragmentSpread",
      name: "FeatureHeaderFull_feature",
    },
    {
      alias: null,
      args: null,
      kind: "ScalarField",
      name: "layout",
      storageKey: null,
    },
  ],
  type: "Feature",
  abstractKey: null,
}

;(node as any).hash = "410eddfc25f11a9687c26ed516418f0e"

export default node
