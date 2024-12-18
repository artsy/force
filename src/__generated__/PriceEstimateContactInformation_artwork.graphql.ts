/**
 * @generated SignedSource<<d5d1ad9a60af6a8d7f82f91609188940>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime"
import { FragmentRefs } from "relay-runtime"
export type PriceEstimateContactInformation_artwork$data = {
  readonly internalID: string
  readonly slug: string
  readonly " $fragmentType": "PriceEstimateContactInformation_artwork"
}
export type PriceEstimateContactInformation_artwork$key = {
  readonly " $data"?: PriceEstimateContactInformation_artwork$data
  readonly " $fragmentSpreads": FragmentRefs<"PriceEstimateContactInformation_artwork">
}

const node: ReaderFragment = {
  argumentDefinitions: [],
  kind: "Fragment",
  metadata: null,
  name: "PriceEstimateContactInformation_artwork",
  selections: [
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
      name: "slug",
      storageKey: null,
    },
  ],
  type: "Artwork",
  abstractKey: null,
}
;(node as any).hash = "e78a31c33dbb5250a4255917a81de949"

export default node
